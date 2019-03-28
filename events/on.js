const { EventEmitter } = require("events");

let emitter = new EventEmitter();

emitter.on("events", test);
emitter.on("events", test);
emitter.once("events", test);
// emitter.removeListener("events", test);

emitter.emit("events", 1, 2, 3);

console.log(JSON.stringify(emitter.listeners("events")));

function test(...args) {
	console.log(JSON.stringify(args));
}
