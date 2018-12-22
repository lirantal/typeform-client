const path = require('path')
const formResponseAnswersAdapters = require(path.resolve(
  './src/Form/Adapters/formResponsesAnswersAdapters'
))
const formFieldsAdapters = require(path.resolve('./src/Form/Adapters/formFieldsAdapters'))

describe('Adapters', () => {
  describe('Forms fields', () => {
    it('Opinion scale geneates correct options array starting from 0', () => {
      const formFieldsAdapter = formFieldsAdapters.get('opinion_scale')
      const mockQuestionField = {
        properties: {
          start_at_one: 1,
          steps: 5
        }
      }

      const scaleOptions = formFieldsAdapter(mockQuestionField)
      expect(scaleOptions).toMatchObject({
        '1': [],
        '2': [],
        '3': [],
        '4': [],
        '5': []
      })
    })
  })

  describe('Response Answers', () => {
    it('Multiple choice adapter handles other option as a choice', () => {
      const multipleChoiceAdapter = formResponseAnswersAdapters.get('multiple_choice')

      const mockSubmission = {}
      const mockAnswer = {
        choice: {
          other: 'Some other answer'
        }
      }

      const answerObject = multipleChoiceAdapter(mockSubmission, mockAnswer)

      expect(answerObject).toHaveProperty('answerLabel', 'other')
      expect(answerObject).toHaveProperty('answerData.data', mockAnswer.choice.other)
    })
  })
})
