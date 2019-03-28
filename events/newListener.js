const { EventEmitter } = require("events");

let emitter = new EventEmitter();
// emitter.on("newListener", function(event, listener) {
// 	console.log(event, listener);
// });
// emitter.on("events", function(event, listener) {
// 	console.log(event, listener);
// });

// emitter.on("newListener", function(event, listener) {
// 	console.log(event, listener);
// });

emitter.on("removeListener", function(...args) {
	console.log(JSON.stringify(args));
});
emitter.once("newListener", test);

emitter.on("events", function(event, listener) {
	console.log(event, listener);
});
function test(...args) {
	console.log(JSON.stringify(args));
}
