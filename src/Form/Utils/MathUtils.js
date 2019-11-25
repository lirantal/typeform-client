'use strict'

const median = arr => {
  const mid = Math.floor(arr.length / 2)
  const nums = [...arr].sort()
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2
}
const average = arr => arr.reduce((sum, current) => sum + current, 0) / arr.length

const roundTo = (number, precision) => Number(number.toFixed(precision))

module.exports = {
  median,
  average,
  roundTo
}
