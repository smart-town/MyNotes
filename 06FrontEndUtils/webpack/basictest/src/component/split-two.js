import _ from 'loadsh';

function doFill(arr, value) {
    _.fill(arr, value, 0, 4);
}

let arr = [1,1,1,1];
doFill(arr, 'temp');
export default arr;