'use strict'
const mathUtils = require('../Utils/MathUtils')

const questionStatisticsAdapters = new Map()
questionStatisticsAdapters.set('opinion_scale', answers => {
  const answersArr = Object.keys(answers).reduce((result, key) => {
    const amount = answers[key].length
    if (amount) {
      const number = parseInt(key)
      result = result.concat(Array(amount).fill(number))
    }
    return result
  }, [])

  const median = mathUtils.median(answersArr)
  const average = mathUtils.average(answersArr)

  return {
    median,
    average: mathUtils.roundTo(average, 2)
  }
})

module.exports = questionStatisticsAdapters
