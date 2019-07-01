let test = require("../Node/test/justModule")
console.log(`current ${__filename}, __dirname:${__dirname}`)
console.log(`call other directory justModule.test:`)
test.test();