'use strict'

const {createClient} = require('@typeform/api-client')
const formFieldAdapters = require('./Adapters/formFieldsAdapters')
const formResponseAnswersAdapters = require('./Adapters/formResponsesAnswersAdapters')

module.exports = class Form {
  constructor({apiKey} = {}) {
    this.apiKey = apiKey || process.env.TYPEFORM_API_KEY
    this.client = createClient({token: this.apiKey})
  }

  async _fetchForm(formId) {
    const form = {}
    const formResult = await this.client.forms.get({uid: formId})

    if (formResult.code && formResult.code === 'FORM_NOT_FOUND') {
      throw new Error('Form not found, check the provided credentials')
    }

    form.id = formResult.id
    form.title = formResult.title
    form.workspace = formResult.workspace

    form.fields = this._getFormQuestions(formResult)

    return form
  }

  _getFormQuestions(form) {
    const formTypesWhitelist = ['yes_no', 'opinion_scale', 'multiple_choice']
    let formQuestions = {}

    formQuestions = form.fields
      .filter(questionField => {
        // skip fields we don't handle as questions
        return !!formTypesWhitelist.includes(questionField.type)
      })
      .reduce((questionObjects, questionField) => {
        const fieldReference = questionField.ref

        questionObjects[fieldReference] = {
          id: questionField.id,
          title: questionField.title,
          ref: questionField.ref,
          type: questionField.type,
          properties: questionField.properties,
          answers: {}
        }

        const questionAnswerAdaptor = formFieldAdapters.get(questionField.type)
        if (questionAnswerAdaptor) {
          questionObjects[fieldReference].answers = questionAnswerAdaptor(questionField)
        } else {
          questionObjects[fieldReference].answers = {}
        }

        return questionObjects
      }, {})

    return formQuestions
  }

  async _fetchResponses(formId) {
    let apiResult
    let tokenValue
    let totalRespondents = 0
    let submissionAnswers = []

    const typeformRequestOptions = {
      uid: formId,
      pageSize: 1000,
      completed: true,
      sort: 'submitted_at,asc'
    }

    for (;;) {
      if (tokenValue) {
        typeformRequestOptions['after'] = tokenValue
      }

      apiResult = await this.client.responses.list(typeformRequestOptions)
      submissionAnswers = submissionAnswers.concat(apiResult.items)

      if (!totalRespondents) {
        totalRespondents = apiResult.total_items
      }

      if (apiResult.page_count === 1) {
        break
      } else {
        const len = apiResult.items.length
        const lastItem = apiResult.items[len - 1]
        tokenValue = lastItem.token
      }
    }

    return {
      submissionAnswers,
      totalRespondents
    }
  }

  async fetchFormResponses(formId) {
    const form = await this._fetchForm(formId)
    const {totalRespondents, submissionAnswers} = await this._fetchResponses(formId)

    form.totalRespondents = totalRespondents

    // fs.writeFileSync('./formResponsesOriginal.json', JSON.stringify(submissionAnswers, null, 2))

    // @TODO fix to also filter the same whitelist questions as before
    submissionAnswers.forEach(submission => {
      submission.answers &&
        submission.answers.forEach(answer => {
          const fieldReference = answer.field.ref

          if (form.fields[fieldReference].totalRespondents) {
            form.fields[fieldReference].totalRespondents++
          } else {
            form.fields[fieldReference].totalRespondents = 1
          }

          const responseAnswerAdaptor = formResponseAnswersAdapters.get(answer.field.type)
          if (responseAnswerAdaptor) {
            const adaptorResponse = responseAnswerAdaptor(submission, answer)

            if (Array.isArray(adaptorResponse)) {
              adaptorResponse.forEach(({answerLabel, answerData}) => {
                const newAnswersList = form.fields[fieldReference].answers[answerLabel].concat(
                  answerData
                )
                form.fields[fieldReference].answers[answerLabel] = newAnswersList
              })
            } else if (typeof adaptorResponse === 'object') {
              let {answerLabel, answerData} = adaptorResponse

              if (form.fields[fieldReference].answers[answerLabel] === undefined) {
                answerLabel = 'other'
                form.fields[fieldReference].answers[answerLabel] = []
              }

              const newAnswersList = form.fields[fieldReference].answers[answerLabel].concat(
                answerData
              )
              form.fields[fieldReference].answers[answerLabel] = newAnswersList
            }
          }
        })
    })

    return form
  }
}
