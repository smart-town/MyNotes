exports.done = false;
var a = require("./circle1");
console.log(`[circle2], a.done = ${a.done}`);
exports.done = true;
console.log(`[circle2] complete!`);