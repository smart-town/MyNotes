function m1() {
	console.log('this is m1 function')
}
function m2() {
	console.log('this is m2 function')
}

var module1 = new Object({
	_count: 0,
	m1: function () {
		console.log('this is module1.m1 Function')
	},
	m2: function () {
		console.log('this is module1.m2 Function')
	},
});

var module2 = (function(){
	var _count = 0;
	var m1 = function() {
		console.log('this is module2.m1 Func')
	}
	var m2 = function() {
		console.log('this is module2.m2 Func')
	}
})()

var module3 = (function(mod) {
	mod.m3 = function() {
		console.log('this is module3.m3 Func')
	}
})()

