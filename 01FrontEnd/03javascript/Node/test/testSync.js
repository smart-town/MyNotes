var fs = require("fs");
var path = require("path");
console.log(require.resolve("./justModule"));
/* let app = __dirname.split(path.sep).slice(0,-1).join(path.sep);
app = path.join(app,"App.js");
console.log(app);
let s = fs.readFileSync(app);
console.log(s.toString()); */