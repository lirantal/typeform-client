[![Security Responsible Disclosure](https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg)](https://github.com/nodejs/security-wg/blob/master/processes/responsible_disclosure_template.md)

# About

`@lirantal/typeform-client` provides a friendlier access to pulling form data out of Typeform through their API. The official Typeform API client provides only raw access to the API and it is upon the consumer of their SDK to stich all the data. Some of the benefits that this friendlier interface to interface provides are:

- Looping through all the form survey results with the continuation token
- De-normalizing all the data such as form questions, and their responses, so everything is accessible from an aggregated interface.

# Install

```bash
npm install --save @lirantal/typeform-client
```

# Example

```js
const {Form} = require('@lirantal/typeform-client')

// don't hard-code API keys inside the code. Load it via configuration
// management or another secure form. For convenience only this library
// also supports falling back to reading the API key from a TYPEFORM_API_KEY
// environment variable.
// (note: SECRETS IN ENVIRONMENT VARIABLES ARE HIGHLY DISCOURAGED)
const apiKey = config.apiKey
// provide the form id for the typeform survey, which is present as part
// of a URL resource
const formId = config.formId

const typeform = new Form({apiKey: apiKey})
const form = await typeform.fetchFormResponses(formId)

// form is an object with all the form responses, and each question field is
// populated with all the answers collected from the survey
```

## Supported fields

The following form fields are currently supported to extract:

- Yes/No questions (`yes_no`)
- Opinion scale questions (`opinion_scale`)
- All variants of multiple choice questions, including an 'other' field, and single vs multiple answers (`multiple_choice`)

## Unsupported fields

- Free text questions (`short_text`)


# Contributing

## Commit Guidelines

The project uses the commitizen tool for standardizing changelog style commit
messages so you should follow it as so:

```bash
git add .           # add files to staging
npm run commit      # use the wizard for the commit message
```

# Related 

[typeform-export-excel](https://github.com/lirantal/typeform-export-excel) - Export a Typeform survey questionnaire to an Excel format

# Author
Liran Tal <liran.tal@gmail.com>
