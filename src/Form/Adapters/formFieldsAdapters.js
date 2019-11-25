'use strict'

const formFieldsAnswersAdapters = new Map()
formFieldsAnswersAdapters.set('yes_no', () => {
  return {
    yes: [],
    no: []
  }
})

formFieldsAnswersAdapters.set('opinion_scale', questionField => {
  const countStart = questionField.properties.start_at_one ? 1 : 0
  const countFinish = questionField.properties.steps

  const scaleOptions = {}
  for (let i = countStart; i <= countFinish; i++) {
    scaleOptions[i] = []
  }

  return scaleOptions
})

formFieldsAnswersAdapters.set('multiple_choice', questionField => {
  const answers = {}

  questionField.properties.choices.forEach(choiceField => {
    answers[choiceField.label] = []
  })

  if (questionField.properties.allow_other_choice) {
    answers['other'] = []
  }

  return answers
})

formFieldsAnswersAdapters.set('short_text', questionField => {
  return {}
})

module.exports = formFieldsAnswersAdapters
