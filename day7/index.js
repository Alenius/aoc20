const { readFile, parseNewlineSeparated } = require('../utils/parsing')
const { head, tail, contains, uniq } = require('ramda')

async function day7() {
  const rawData = await readFile()
  const lines = parseNewlineSeparated(rawData)
  solver(lines)
}

function solver(lines) {
  const bagObject = buildBagObject(lines)

  // bags that contain gold directly
  let tot = []
  function recursiveFind(colorToFind, containers) {
    const found = findContained(bagObject, colorToFind)
    if (found.length) {
      found.forEach((it) => {
        tot.push(it)
        recursiveFind(it, containers)
      })
    } else {
      return
    }
  }
  recursiveFind('shiny gold', [])

  // let totNoOfBags = 0
  // function treeTraversing(color) {
  //   const containing = bagObject[color]
  //   Object.keys(containing).forEach((colorName) => {
  //     numberOfSubBags = treeTraversing(colorName)
  //     const noOfDirectSubBags = parseInt(containing[colorName])
  //     console.log({ colorName, numberOfSubBags, numberOfSubBags })
  //     return
  //     totNoOfBags += noOfDirectSubBags + noOfDirectSubBags * numberOfSubBags
  //   })
  //   return 0
  // }
  // treeTraversing('shiny gold')
  let totBags = 0
  function treeDiver(color) {
    const bagInQuestion = bagObject[color]
    const subBags = Object.keys(bagObject[color])

    // if a bag doesn't contain any bags in it, it's only one
    if (!subBags.length) return 1

    // if a bag has bags in it
    let subBagNumber = 0
    subBags.forEach((subBagColor) => {
      // this gets the number of cotained bags of the sub bag color
      const numberOfSubBags = parseInt(bagInQuestion[subBagColor])
      // dive into that particular bag and see how many it contains
      const bagDiveNumber = treeDiver(subBagColor)
      // add the number of bags the subbag contained with how many
      // of the subbag
      subBagNumber += numberOfSubBags * bagDiveNumber
    })
    return 1 + subBagNumber
  }

  // off by one error since the shiny gold bag is counted twice
  const res = treeDiver('shiny gold') - 1

  console.log({ pt1: uniq(tot).length, totBags, res })
}

function findContained(bagObject, colorToFind) {
  let dir = []
  Object.keys(bagObject).forEach((bag) => {
    const equalsShinyGold = (bag) => bag === colorToFind
    const match = Object.keys(bagObject[bag]).filter(equalsShinyGold)
    if (match.length) dir.push(bag)
  })
  return dir
}

function buildBagObject(lines) {
  const bagObject = {}
  lines.forEach((it) => {
    const patternFirst = /(^|\d\s)\w*\s\w*/g
    // matches can look like this
    // [ 'vibrant plum', '5 faded blue', '6 dotted black' ]
    // or just contain the first, or the first and second element
    const matches = it.match(patternFirst)
    const base = head(matches)
    const rest = tail(matches)

    bagObject[base] = {}

    rest.forEach((match) => {
      const number = head(match).trim()
      const color = tail(match).trim()
      bagObject[base] = { ...bagObject[base], [color]: number }
    })
  })

  return bagObject
}

module.exports = day7
