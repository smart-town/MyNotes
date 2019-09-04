let lib = require('./lib.js');

function module2 () {
    console.log("\nmodule2");
    console.log(`when module3 have inc: getCounter:${lib.getCounter()},but counter=${lib.counter}`)
}

module.exports = {module2}