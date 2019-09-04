var ejs = require('ejs');
var fs = require('fs');
people = ['geddy', 'neil', 'alex'];

html = ejs.render('<%= people.join(", "); %>', { people: people });

html = ejs.renderFile("test.ejs", {a: 2});

html.then((value)=>{
    fs.writeFileSync("test.html",value);
}).catch((e)=>{
    console.error("解析错误",e);
})