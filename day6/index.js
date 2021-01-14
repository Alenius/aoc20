const { readFile, parseNewlineSeparated } = require('../utils/parsing')
const { has, keys, drop } = require('ramda')

function solver(lines) {
  let parsedArr = [{}]
  lines.forEach((line) => {
    // check if blank line, and if it is we know it's a new
    // person coming so create that
    if (line.length === 0) return parsedArr.push({}) // push empty answerObj

    const lastIndex = parsedArr.length - 1
    const answers = line.split('') // get all answers
    let ansObj = parsedArr[lastIndex]
    answers.forEach((answer) => {
      ansObj[answer] = true
    })

    parsedArr[lastIndex] = ansObj
  })

  let ansPerGroup = 0
  parsedArr.forEach((groupAns) => {
    ansPerGroup += Object.keys(groupAns).length
  })

  // pt2

  let parsedArr2 = [{}]
  lines.forEach((line) => {
    // check if blank line, and if it is we know it's a new
    // person coming so create that
    if (line.length === 0) return parsedArr2.push({}) // push empty answerObj

    const lastIndex = parsedArr2.length - 1
    let ansObj = parsedArr2[lastIndex]
    const answers = line.split('') // get all answers
    ansObj.numberOfAnswers = Object.keys(ansObj).length
      ? ansObj.numberOfAnswers + 1
      : 1

    answers.forEach((ans) => {
      ansObj[ans] = has(ans, ansObj) ? ansObj[ans] + 1 : 1
    })
  })

  let count = 0
  parsedArr2.forEach((ansObj) => {
    const noOfAnswerees = ansObj.numberOfAnswers
    const ansKeys = drop(1, keys(ansObj)) // drop numberofanswers
    let allAnswers = 0
    ansKeys.forEach((key) => {
      const noOfAnswers = ansObj[key]
      noOfAnswers === noOfAnswerees && allAnswers++
    })

    count += allAnswers
  })

  return [ansPerGroup, count]
}

async function day6() {
  const rawData = await readFile()
  const lines = parseNewlineSeparated(rawData)
  const solve = solver(lines)
  console.log({ pt1: solve[0], pt2: solve[1] })
}

module.exports = day6
