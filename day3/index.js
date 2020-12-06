const { readFile, parseNewlineSeparated } = require('../utils/parsing')
const { multiply } = require('ramda')

function down1Right3(data) {
  // the width decides where the input pattern starts repeating
  // e.g. data[0] is the same as data[width]
  const widthOfSlope = data[0].length
  let verticalIndex = 0
  let horizontalIndex = 0

  let numberOfTrees = 0
  data.forEach((row) => {
    verticalIndex += 1
    if (verticalIndex == 1) return // skip first row
    horizontalIndex += 3
    const horizontalPosition = horizontalIndex % widthOfSlope // since slope is repeating use modulo
    // # represent trees
    if (row[horizontalPosition] === '#') numberOfTrees++
  })

  return numberOfTrees
}

// same as pt1 but generalized
function downRightGeneralized(data, downOffset, rightOffset) {
  // the width decides where the input pattern starts repeating
  // e.g. data[0] is the same as data[width]
  const widthOfSlope = data[0].length
  const lengthOfSlope = data.length
  let verticalIndex = 0
  let horizontalIndex = 0
  let numberOfTrees = 0
  // rewrite the for each to handle the case where downOffset is more than 1
  while (verticalIndex < lengthOfSlope - 1) {
    verticalIndex += downOffset
    if (verticalIndex == 0) return // skip first row
    horizontalIndex += rightOffset
    const horizontalPosition = horizontalIndex % widthOfSlope // since slope is repeating use modulo

    const row = data[verticalIndex]
    // # represent trees
    if (row[horizontalPosition] === '#') numberOfTrees++
  }

  return numberOfTrees
}

function pt2(data) {
  const offsetTuples = [
    { down: 1, right: 1 },
    { down: 1, right: 3 },
    { down: 1, right: 5 },
    { down: 1, right: 7 },
    { down: 2, right: 1 },
  ]
  let totTrees = []
  offsetTuples.forEach((tuple) => {
    const { down, right } = tuple
    const noOfTrees = downRightGeneralized(data, down, right)
    totTrees.push(noOfTrees)
  })

  return totTrees.reduce(multiply)
}
async function day3() {
  const rawData = await readFile('day3/input.txt')

  const data = parseNewlineSeparated(rawData)
  console.log({ pt1: down1Right3(data), pt2: pt2(data) })
}

module.exports = day3
