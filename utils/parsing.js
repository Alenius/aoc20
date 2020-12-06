const fs = require('fs')
const { split, map, reduce, last, indexOf } = require('ramda')

async function readFile(filename) {
  const data = await fs.promises.readFile(filename, 'utf8')
  return data
}

const parseNewlineSeparated = split('\n')
const castStringArrToInt = map(parseInt)

module.exports = {
  readFile,
  parseNewlineSeparated,
  castStringArrToInt,
}
