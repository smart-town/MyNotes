var counter = 1;
function incCounter(){
    counter++;
}
function getCounter(){
    return counter;
}
module.exports = {
    counter: counter,
    incCounter: incCounter,
    getCounter: getCounter
}