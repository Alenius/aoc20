const { readFile, parseNewlineSeparated } = require('../utils/parsing')
const { printMatrix } = require('../utils')
const { split } = require('ramda')

function createBaseChart(noOfColumns, noOfRows) {
  const base = []
  for (let column = 0; column < noOfColumns; column++) {
    base.push([]) // create new column
    for (let row = 0; row < noOfRows; row++) {
      base[column].push([]) // create new row
      const seatId = row * 8 + column
      base[column][row] = [{ row, column, seatId }]
    }
  }
  return base
}

function pt1(data) {
  let seatIds = []

  data.forEach((instruction) => {
    const splitInstruction = instruction.split('')

    // find row info
    const rowInstruction = splitInstruction.slice(0, 7)
    let minRow = 0
    let maxRow = 127
    let correctRow = 0
    rowInstruction.forEach((instruction) => {
      const shouldKeepLower = instruction === 'F'
      const diff = maxRow - minRow
      const mid = Math.ceil(diff / 2) // find the midpoint
      shouldKeepLower ? (maxRow -= mid) : (minRow += mid)

      if (diff === 1) {
        correctRow = shouldKeepLower ? minRow : maxRow
      }
    })

    // check for column info
    const columnInfo = splitInstruction.slice(-3)
    let minColumn = 0
    let maxColumn = 7
    let correctColumn

    columnInfo.forEach((instruction) => {
      const shouldKeepLower = instruction === 'L'
      const diff = maxColumn - minColumn
      const mid = Math.ceil(diff / 2) // find the midpoint
      shouldKeepLower ? (maxColumn -= mid) : (minColumn += mid)

      if (diff === 1) {
        correctColumn = shouldKeepLower ? minColumn : maxColumn
      }
    })

    const seatId = correctRow * 8 + correctColumn
    seatIds.push(seatId)
  })

  let highestId = -Infinity
  seatIds.forEach((id) => {
    if (id > highestId) highestId = id
  })

  return highestId
}

async function day5() {
  const rawData = await readFile('day5/input.txt')
  const data = parseNewlineSeparated(rawData)
  console.log({ pt1: pt1(data) })
}

module.exports = day5
