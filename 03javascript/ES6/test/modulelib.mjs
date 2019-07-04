let counter = 1;
function incCounter() {
    counter++;
}
function getCounter() {
    return counter;
}
export default {
    counter: counter,
    incCounter: incCounter,
    getCounter: getCounter
}