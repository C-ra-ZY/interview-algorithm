const { EventEmitter } = require("events");

let emitter = new EventEmitter();

emitter.on("removeListener", test);
emitter.on("removeListener", test);
emitter.removeListener("removeListener", test);
function test(...args) {
	console.log(JSON.stringify(args));
}
