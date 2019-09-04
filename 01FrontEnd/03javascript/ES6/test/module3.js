let lib = require('./lib');

function module3(){
    console.log(`\nmodule3`);
    console.log(`lib.incCounter(),initial:${lib.counter}`)
    lib.incCounter();
}
module.exports = {module3};
