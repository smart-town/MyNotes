let data = [12,13,14,15,16,17,18];

//console.log(a.slice(1,3));
let TOTAL = 6;
let NUM =2;
function getPageData(current,direction){
	let a;
	if(direction==="next") {
		current+=1;
		if(current>TOTAL) {
			current=TOTAL;
		}
	} else {
		current-=1;
		if(current<0){
			current=0;
		}
	}
	let currentBegin = current===0? 0:(current-1)*NUM;
	let currentEnd = currentBegin+NUM;
	console.log(`${currentBegin}---${currentEnd}`)
	a = data.slice(currentBegin,currentEnd);
	return a;
}
console.log(getPageData(3,"next"));