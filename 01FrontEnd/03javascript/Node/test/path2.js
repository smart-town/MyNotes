let a = "file:///c%3A/Users/luhha/Desktop/TTT"
let b = "Ok";
var path = require("path") ;
console.log(path.join(a,b));
console.log(a.replace(/file:[/]*(.)*%3A/,"$1:"))
console.log(path.resolve(a.replace(/file:[/]*(.)*%3A/, "$1:"),"aa"))
console.log(path.resolve(a,"aa"))