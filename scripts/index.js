const scriptName = process.argv.slice(2).shift()
require(`./${scriptName}`).main()
