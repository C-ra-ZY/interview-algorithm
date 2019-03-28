const { EventEmitter } = require("events");
const myEmitter = new EventEmitter();
console.log(1);
process.nextTick(() => {
	console.log(2);
});
// myEmitter.on("removeListener", function(...args) {
// 	console.log(JSON.stringify(args));
// });
// myEmitter.once("newListener", test);
myEmitter.on("event", (a, b) => {
	console.log(3);
	setImmediate(() => {
		console.log(4);
	});
});
myEmitter.on("event", (a, b) => {
	console.log(5);
	setTimeout(() => {
		console.log(6);
	}, 0);
	process.nextTick(() => {
		console.log(7);
	});
});
// function test(...args) {
// 	console.log(JSON.stringify(args));
// }
// myEmitter.off("newListener", test);

myEmitter.emit("event", "a", "b");
console.log(8);

//13582764
