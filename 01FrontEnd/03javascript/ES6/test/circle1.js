exports.done = false;
var  b = require("./circle2");
console.log(`[circle1], b.done = ${b.done}`);
exports.done = true;
console.log(`[circle1] complete!`);