var events = require("events");
var enhancer = require("event-emitter-enhancer");
var eventEmitter = new events.EventEmitter();

eventEmitter.on("A-EVENT",AHandler);
eventEmitter.on("A-EVENT",AEnhanceHandler);
function AHandler(){
	console.log("A HANDLER...");
}
function AEnhanceHandler(param){
	console.log("Enhance A Handler:"+param);
}

eventEmitter.emit("A-EVENT","JUNE");



var EnhanceEmitter =  enhancer.extend(events.EventEmitter);
var enhancedEmitter = new EnhanceEmitter();
enhancedEmitter.on("A-EVENT",AHandler);
enhancedEmitter.emit("A-EVENT","JUNE");
enhancedEmitter.else(AEnhanceHandler);

enhancedEmitter.emit("JUNE",1);
enhancedEmitter.emit("Cherry","cherry is hhgs darling");