const path = require('path')
const formResponseAnswersAdapters = require(path.resolve(
  './src/Form/Adapters/formResponsesAnswersAdapters'
))
const formFieldsAdapters = require(path.resolve('./src/Form/Adapters/formFieldsAdapters'))
const questionStatisticsAdapters = require(path.resolve(
  './src/Form/Adapters/questionStatisticsAdapters'
))

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

  describe('Fields statistics', () => {
    it('Opinion scale calculates correct median and average', () => {
      const mockQuestion1 = {
        1: Array(6),
        2: Array(4),
        3: Array(2),
        4: Array(9)
      }

      const mockQuestion2 = {
        1: Array(6),
        2: Array(12),
        3: Array(3),
        4: Array(6)
      }

      const questionStatisticAdapter = questionStatisticsAdapters.get('opinion_scale')
      const adaptorResponse1 = questionStatisticAdapter(mockQuestion1)
      const adaptorResponse2 = questionStatisticAdapter(mockQuestion2)

      expect(adaptorResponse1).toMatchObject({
        median: 3,
        average: 2.67
      })
      expect(adaptorResponse2).toMatchObject({
        median: 2,
        average: 2.33
      })
    })
  })
})
