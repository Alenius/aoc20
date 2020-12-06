const { readFile, parseNewlineSeparated } = require('../utils/parsing')
const { equals } = require('ramda')

function parseInput(lines) {
  let splitArr = []
  lines.forEach((line) => {
    splitArr.push(line.split(' '))
  })

  let parsedArr = [[]]
  splitArr.forEach((line) => {
    // check if blank line, and if it is we know it's a new
    // person coming so create that
    if (line.length === 1 && line[0] === '') return parsedArr.push([])

    const lastIndex = parsedArr.length - 1
    const persona = [...parsedArr[lastIndex], ...line]
    parsedArr[lastIndex] = persona
  })

  // create objects of every person
  const personaArr = parsedArr.reduce((acc, arr) => {
    const obj = {}
    arr.forEach((prop) => {
      const [name, value] = prop.split(':')
      obj[name] = value
    })
    return [...acc, obj]
  }, [])

  return personaArr
}

function pt1(passports) {
  let fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid']
  let fullPassports = 0
  let missingCidOnly = 0
  passports.forEach((passport) => {
    let missingValues = []
    fields.forEach((field) => {
      // check if the passport is missing current field
      if (!passport.hasOwnProperty(field)) missingValues.push(field)
    })

    const missingNone = missingValues.length === 0
    const missingCidButValid =
      missingValues.length === 1 && missingValues[0] === 'cid'
    if (missingNone) fullPassports++
    if (missingCidButValid) missingCidOnly++
  })

  return fullPassports + missingCidOnly
}

function pt2(passports) {
  let validPassports = 0
  passports.forEach((passport) => {
    // if missing more than cid and something else, toss it
    if (Object.keys(passport).length < 7) return
    // if it's missing something that isn't cid, toss it
    if (Object.keys(passport).length === 7 && passport.hasOwnProperty('cid')) {
      return
    }

    const { byr, iyr, eyr, hgt, hcl, ecl, pid } = passport

    // check birth year
    if (byr.length !== 4) return
    if (byr < 1920) return
    if (byr > 2002) return

    // check issue year
    if (iyr.length !== 4) return
    if (iyr < 2010) return
    if (iyr > 2020) return

    // check expiration year
    if (eyr.length !== 4) return
    if (eyr < 2020) return
    if (eyr > 2030) return

    // check height
    const unit = hgt.slice(-2)
    if (unit !== 'cm' && unit !== 'in') return
    if (unit === 'cm') {
      const value = hgt.split('cm')[0]
      if (value < 150) return
      if (value > 193) return
    }
    if (unit === 'in') {
      const value = hgt.split('in')[0]
      if (value < 59) return
      if (value > 76) return
    }

    // check hair color
    const validHcl = hcl.match(/^#[0-9a-fA-F]{6}/)
    if (!validHcl) return

    // check eye color
    const validEcl = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].filter(
      equals(ecl)
    )
    if (!validEcl.length) return

    //check passportid
    if (pid.length !== 9) return

    // all checks ok, count that passport
    validPassports++
  })

  return validPassports
}

async function day4() {
  const rawData = await readFile('day4/input.txt')
  const lines = parseNewlineSeparated(rawData)
  const passports = parseInput(lines)

  console.log({ pt1: pt1(passports), pt2: pt2(passports) })
}

module.exports = day4
