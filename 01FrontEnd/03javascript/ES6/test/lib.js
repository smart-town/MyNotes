var value={counter:1}
function incCounter(){
    value.counter++;
}
function getCounter(){
    return value.counter;
}
module.exports = {
    counter: value.counter,
    incCounter: incCounter,
    getCounter: getCounter,
    value
}