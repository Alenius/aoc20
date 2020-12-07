const { readFile, parseNewlineSeparated } = require('../utils/parsing')
const { printMatrix } = require('../utils')
const { prop, sort } = require('ramda')

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

function findCorrectPlace(lookingForRow, splitInstruction) {
  const instruction = lookingForRow
    ? splitInstruction.slice(0, 7)
    : splitInstruction.slice(-3)
  let minRow = 0
  let max = lookingForRow ? 127 : 7
  let correct = 0
  instruction.forEach((instruction) => {
    const lowerInstruction = lookingForRow ? 'F' : 'L'
    const shouldKeepLower = instruction === lowerInstruction
    const diff = max - minRow
    const mid = Math.ceil(diff / 2) // find the midpoint
    shouldKeepLower ? (max -= mid) : (minRow += mid)

    if (diff === 1) {
      correct = shouldKeepLower ? minRow : max
    }
  })

  return correct
}

function getSeatInfo(data) {
  const seatingInfo = []
  data.forEach((instruction) => {
    const splitInstruction = instruction.split('')
    // find row info
    const correctRow = findCorrectPlace(true, splitInstruction)
    // check for column info
    const correctColumn = findCorrectPlace(false, splitInstruction)
    const seatId = correctRow * 8 + correctColumn
    seatingInfo.push({ correctRow, correctColumn, seatId })
  })

  return seatingInfo
}

function solver(data) {
  const seatInfo = getSeatInfo(data)
  const seatIds = seatInfo.map(prop('seatId'))

  // pt1
  let highestId = -Infinity
  seatIds.forEach((id) => {
    if (id > highestId) highestId = id
  })
  console.log({ highestId })

  // pt2
  const sortedSeatIds = sort((a, b) => a - b, seatIds)
  let missingId
  // the seat ids are in order so just check which one isn't consecutive
  sortedSeatIds.forEach((id, ix) => {
    if (ix === sortedSeatIds.length - 1) return //don't check last seat
    const nextId = sortedSeatIds[ix + 1]
    if (Math.abs(id - nextId) !== 1) missingId = id + 1
  })

  return { pt1: highestId, pt2: missingId }
}

async function day5() {
  const rawData = await readFile('day5/input.txt')
  const data = parseNewlineSeparated(rawData)
  const { pt1, pt2 } = solver(data)
  console.log({ pt1 })
}

module.exports = day5
