const { readFile, parseNewlineSeparated } = require('../utils/parsing')
const { split, equals } = require('ramda')

function parseTuple(tuple) {
  const constraint = tuple[0] // format "1-3"
  const [firstConstraint, secondConstraint] = constraint.split('-')
  const letterToFind = tuple[1].split(':')[0] // remove the colon
  const password = tuple[2]
  return {
    constraint,
    firstConstraint,
    secondConstraint,
    letterToFind,
    password,
  }
}

function findValidTuples1(data) {
  let validTuples = []
  data.forEach((tuple) => {
    const {
      firstConstraint: minTimes,
      secondConstraint: maxTimes,
      letterToFind,
      password,
    } = parseTuple(tuple)
    const pwArr = password.split('')
    const numberOfLetters = pwArr.filter(equals(letterToFind)).length

    if (minTimes <= numberOfLetters && numberOfLetters <= maxTimes) {
      validTuples.push(password)
    }
  })

  return validTuples.length
}

function findValidTuples2(data) {
  let validTuples = []
  data.forEach((tuple) => {
    const {
      firstConstraint: firstPosition,
      secondConstraint: secondPosition,
      letterToFind,
      password,
    } = parseTuple(tuple)
    const pwArr = password.split('')
    const firstValid = pwArr[firstPosition - 1] === letterToFind
    const secondValid = pwArr[secondPosition - 1] === letterToFind
    // xor
    if (firstValid ? !secondValid : secondValid) {
      validTuples.push(password)
    }
  })

  return validTuples.length
}

async function day2() {
  const rawData = await readFile('day2/input.txt')
  const dataArr = parseNewlineSeparated(rawData)
  // tuple format:  [ '1-3', 'a:', 'abcde' ]
  const data = dataArr.map(split(' '))

  const noOfValidTuples1 = findValidTuples1(data)
  const noOfValidTuples2 = findValidTuples2(data)
  console.log({ pt1: noOfValidTuples1, pt2: noOfValidTuples2 })
}

module.exports = day2
