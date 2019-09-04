function f(){
	console.log("QaQ-OUT");
}
(function(){
	if(true){
		function f(){
			console.log("^_^-INSIDE");
		}
	}
	f();
})();