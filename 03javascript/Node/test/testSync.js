var fs = require("fs");
var path = require("path");
let app = __dirname.split(path.sep).slice(0,-1).join(path.sep);
app = path.join(app,"App.js");
console.log(app);
let s = fs.readFileSync(app);
console.log(s.toString());