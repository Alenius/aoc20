const {
  readFile,
  parseNewlineSeparated,
  castStringArrToInt,
} = require('../utils/parsing')

// find the two entries that sum to 2020
function findEntriesSum2020(arr) {
  let answer1
  let answer2
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      const arg1 = arr[i]
      const arg2 = arr[j]
      const res = arg1 + arg2
      console.log(res)
      if (res === 2020) {
        answer1 = arg1 * arg2
      }
      for (let k = 0; k < arr.length; k++) {
        const arg3 = arr[k]
        const res = arg1 + arg2 + arg3
        if (res === 2020) {
          ans2Tuple = [arg1, arg2, arg3]
          answer2 = arg1 * arg2 * arg3
        }
      }
    }
  }
  return { answer1, answer2 }
}
async function day1() {
  const fileContent = await readFile('day1/input.txt')
  const dataStringified = parseNewlineSeparated(fileContent)
  const data = castStringArrToInt(dataStringified)

  const { answer1, answer2 } = findEntriesSum2020(data)

  console.log({ answer1, answer2 })
}

module.exports = day1
