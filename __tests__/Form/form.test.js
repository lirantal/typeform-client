const path = require('path')
const {Form} = require(path.resolve('./index.js'))

describe('Form', () => {
  const mockToken = 1
  const mockFormId = 1

  describe('Form constructor', () => {
    test('Take API key from environment variables', () => {
      const mockFormApiKey = '1234'
      process.env.TYPEFORM_API_KEY = mockFormApiKey

      const form = new Form()
      expect(form.apiKey).toEqual(mockFormApiKey)
    })
  })

  describe('Form Questions', () => {
    test('form questions are structured in normalized way', () => {
      const mockFormResult = require('./__fixtures__/formResult.json')

      const form = new Form({apiKey: mockToken})
      const formattedForm = form._getFormQuestions(mockFormResult)

      for (const [questionKey, questionField] of Object.entries(formattedForm)) {
        expect(questionKey).toEqual(questionField.ref)
        expect(formattedForm[questionKey]).toHaveProperty('id')
        expect(formattedForm[questionKey]).toHaveProperty('title')
        expect(formattedForm[questionKey]).toHaveProperty('ref')
        expect(formattedForm[questionKey]).toHaveProperty('type')
        expect(formattedForm[questionKey]).toHaveProperty('properties')
        expect(formattedForm[questionKey]['ref']).toEqual(questionKey)
      }
    })

    test('form questions are skipping normalizations for question types not in whitelist', () => {
      const mockFormResult = require('./__fixtures__/formResult.json')

      const form = new Form({apiKey: mockToken})

      const mockUnsupportedField = {
        id: 'dyadi141naA',
        title: 'Thank you for starting the survey!',
        ref: 'c1c1c1-c1c1-c1c1-c1c1-c1c4523a1c12e',
        properties: {
          hide_marks: false,
          button_text: 'Continue'
        },
        attachment: {
          type: 'image',
          href: 'https://images.typeform.com/images/DDjki61a1A'
        },
        type: 'statement'
      }

      mockFormResult.fields.push(mockUnsupportedField)

      const formattedForm = form._getFormQuestions(mockFormResult)
      expect(formattedForm).not.toHaveProperty(mockUnsupportedField.ref)
    })
  })

  describe('Fetch', () => {
    test('fetchForm is formatting correctly from original typeform result', async () => {
      const mockFormResult = require('./__fixtures__/formResult.json')
      const form = new Form({apiKey: mockToken})

      form._getFormQuestions = jest.fn(() => {
        return {}
      })

      form.client = {
        forms: {
          get: jest.fn(() => {
            return mockFormResult
          })
        }
      }

      const formResponse = await form._fetchForm(mockFormId)
      expect(formResponse.id).toBe(mockFormResult.id)
      expect(formResponse.title).toBe(mockFormResult.title)
      expect(formResponse.workspace).toBe(mockFormResult.workspace)
      expect(formResponse.fields).toEqual({})
    })

    test('throws rrror on form not found', async () => {
      const form = new Form({apiKey: mockToken})
      form.client = {
        forms: {
          get: jest.fn(() => {
            return {
              code: 'FORM_NOT_FOUND',
              description: 'form not found'
            }
          })
        }
      }

      await expect(form._fetchForm(mockFormId)).rejects.toThrowError(
        'Typeform API returned an error: form not found'
      )
    })
  })

  describe('Fetch Form Responses', () => {
    test('Form responses full structure is normalized', async () => {
      const mockFormResult = require('./__fixtures__/formResult.json')
      const mockFormResponses = require('./__fixtures__/formResponsesResult.json')
      const form = new Form({apiKey: mockToken})

      form.client = {
        forms: {
          get: jest.fn(() => {
            return mockFormResult
          })
        },
        responses: {
          list: jest.fn(() => {
            return mockFormResponses
          })
        }
      }

      const formResponses = await form.fetchFormResponses(mockFormId)
      expect(formResponses).toMatchSnapshot()
    })
  })
})
