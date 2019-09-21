export let counter = 1;
function incCounter() {
    counter++;
}
function getCounter() {
    return counter;
}


export default {
    counter,
    incCounter: incCounter,
    getCounter: getCounter
}