//color output
const chalk = require("chalk");
function colorOutput(color,message){
    if(typeof message === 'string'){
        console.log(chalk[color](message));
    }else{
        console.log(chalk[color](JSON.stringify(message)));
    }
}
function error(message){
    colorOutput("red",message);
}
function log(message){
    colorOutput("green",message);
}
function warn(message){
    colorOutput("yellow",message);
}
module.exports = {
    error,
    log,
    warn,
}
