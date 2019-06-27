var events = require("events");
var enhancer = require("event-emitter-enhancer");
var events2 = require("eventemitter2");
var eventEmitter = new events.EventEmitter();
var eventEmitter2 = new events2.EventEmitter2();
/*eventEmitter.on("A-EVENT",AHandler);
eventEmitter.on("A-EVENT",AEnhanceHandler);

eventEmitter.emit("A-EVENT","JUNE");
*/
function AHandler(){
	console.log("A HANDLER..."+arguments[0]);
}
function AEnhanceHandler(param){
	console.log("Enhance A Handler:"+param);
}





var EnhanceEmitter =  enhancer.extend(events.EventEmitter);
var enhancedEmitter = new EnhanceEmitter();
enhancedEmitter.on("A-EVENT",AHandler);
enhancedEmitter.emit("A-EVENT","JUNE");
enhancedEmitter.else(AEnhanceHandler);

enhancedEmitter.emit("JUNE",1);
enhancedEmitter.emit("Cherry","cherry is hhgs darling");

enhancer.modifyInstance(eventEmitter2);
eventEmitter2.else(AHandler);
enhancedEmitter.emit("Cherry2");
eventEmitter2.emit("cherry");
