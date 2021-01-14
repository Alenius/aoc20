function main() {
  const dayNo = process.env.DAY || 1
  const func = require(`./day${dayNo}`)
  func()
}

main()
