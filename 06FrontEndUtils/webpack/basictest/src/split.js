import _ from 'loadsh'
import twoArr from './component/split-two'

console.log(twoArr);
function component() {
	let element = document.createElement('pre')
	element.innerText = JSON.stringify(_.chunk(twoArr, 2), null ,4)
	return element
}

document.body.appendChild(component());