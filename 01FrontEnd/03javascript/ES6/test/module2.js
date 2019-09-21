let lib = require('./lib.js');

function module2 () {
    console.log("\nmodule2");
    console.log(`when module3 have inc: getCounter:${lib.getCounter()},but counter=${lib.counter}`)
    console.log(`when i export object: lib.value.counter=${lib.value.counter}`)
}

module.exports = {module2}