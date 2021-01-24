const { readFile, parseNewlineSeparated } = require('../utils/parsing')

async function day8() {
  const rawData = await readFile()
  const lines = parseNewlineSeparated(rawData)
  solver(lines)
}

function solver(instructions) {
  // global value
  let glob_val = 0
  let instr_ix = 0 // instruction index
  let running = true
  const instructionObject = {}

  while (running) {
    const [op_code, val] = parse_instruction(instructions[instr_ix])
    const ran_before = instructionObject[`${instr_ix}`]
    // check if this has been run before
    if (ran_before) {
      console.log({ last: instr_ix })
      running = false
      break
    }

    console.log({ curr: instr_ix })

    instructionObject[`${instr_ix}`] = true

    switch (op_code) {
      case 'nop':
        instr_ix += 1
        break
      case 'acc':
        glob_val += val
        instr_ix += 1
        break
      case 'jmp':
        instr_ix += val
        break
      default:
        throw new Error('oops not recognized op_code', { op_code })
    }
  }

  // this means the program terminates
  if (instr_ix === instructions.length) {
    console.log('terminated')
    running = false
    break
  }

  console.log({ glob_val })
}

function parse_instruction(instruction) {
  // format: "nop +0"
  const split_ins = instruction.split(' ')
  let [op_code, value] = split_ins
  return [op_code, parseInt(value)]
}

module.exports = day8
