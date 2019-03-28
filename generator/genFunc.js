let index = 0;
function* demo() {
	foo(yield "a", yield "b"); // OK
	let input = yield "c"; // OK
	console.log(input);
}

function foo(a, b) {
	console.log(index);
	console.log(a, b);
}

let dd = demo();
let res = dd.next();
while (!res.done) {
	res = dd.next(++index);
}

let dd = 0;
function* numbers() {
	yield 1;
	yield 6;
	dd = yield 7;
}

let fs = require("fs");
function* genReader() {
	fs.readFile("./EasyBackup.zip", function*(err, res) {
		yield res;
	});
	yield "done";
}

let dd = genReader();
let res = dd.next();
res = dd.next();
