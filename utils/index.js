const createBaseMatrix = (width, height) => {
  const appendDot = append('.')
  const base = [[], []]
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      base[i] = appendDot(base[i])
    }
  }
  return base
}

const printMatrix = (matrix) => {
  forEach((row) => console.log(join('', row)), matrix)
}

const prettyPrintArr = (arr) => {
  console.log(join('', arr))
}

module.exports = { printMatrix }
