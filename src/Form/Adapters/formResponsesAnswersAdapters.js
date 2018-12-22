'use strict'

const formResponseAnswersAdapters = new Map()
formResponseAnswersAdapters.set('yes_no', (submission, answer) => {
  const answerSubmission = {
    response_id: submission.response_id,
    submitted_at: submission.submitted_at,
    metadata: submission.metadata
  }

  const answerLabel = answer.boolean ? 'yes' : 'no'

  return {
    answerLabel: answerLabel,
    answerData: answerSubmission
  }
})

formResponseAnswersAdapters.set('opinion_scale', (submission, answer) => {
  const answerSubmission = {
    response_id: submission.response_id,
    submitted_at: submission.submitted_at,
    metadata: submission.metadata
  }

  const answerLabel = answer.number

  return {
    answerLabel: answerLabel,
    answerData: answerSubmission
  }
})

formResponseAnswersAdapters.set('multiple_choice', (submission, answer) => {
  const answerSubmission = {
    response_id: submission.response_id,
    submitted_at: submission.submitted_at,
    metadata: submission.metadata
  }

  // handle multiple options with single choice chosen by the user
  if (answer.choice) {
    if ('label' in answer.choice) {
      return {
        answerLabel: answer.choice.label,
        answerData: answerSubmission
      }
    }

    if ('other' in answer.choice) {
      return {
        answerLabel: 'other',
        answerData: Object.assign({}, answerSubmission, {data: answer.choice.other})
      }
    }
  }

  // handle multiple options with multiple choices selected
  let multipleAnswersSubmissions = []
  if (answer.choices) {
    if (answer.choices.labels) {
      multipleAnswersSubmissions = answer.choices.labels.map(answerLabel => {
        return {
          answerLabel: answerLabel,
          answerData: answerSubmission
        }
      })
    }

    // handle other specified in multiple options
    if (answer.choices.other) {
      multipleAnswersSubmissions.push({
        answerLabel: 'other',
        answerData: Object.assign({}, answerSubmission, {data: answer.choices.other})
      })
    }

    return multipleAnswersSubmissions
  }
})

module.exports = formResponseAnswersAdapters
