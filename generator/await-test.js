async function asyncFunc1() {
	return Promise.resolve(1);
}

async function asyncFunc2() {
	return Promise.resolve(2);
}

// await

// (async function test() {
// 	let res = await asyncFunc1();
// 	res += await asyncFunc2();
// 	console.log(res);
// })();

//  generator

function spawn(func) {
	return new Promise((resolve, reject) => {
		let iter = func();
		(function next(step) {
			if (step.done) {
				return Promise.resolve(step.value);
			}
			Promise.resolve(step.value)
				.then(function(res) {
					next(iter.next(res));
				})
				.catch(function(err) {
					next(iter.throw(err));
				});
		})(iter.next(undefined));
	});
}

function* test() {
	let res = yield asyncFunc1();
	res += yield asyncFunc2();
	return res;
}
spawn(function*() {
	let dd = yield* test();
	console.log(dd);
});

// let gen = test();
// let step1 = gen.next();
// let step2, step3;
// step1.value
// 	.then((v) => {
// 		step2 = gen.next(v);
// 		return step2.value;
// 	})
// 	.catch((err) => {
// 		step2 = gen.throw(err);
// 		return step2.value;
// 	})
// 	.then((v) => {
// 		step3 = gen.next(v);
// 		return step3.value;
// 	})
// 	.catch((err) => {
// 		step3 = gen.throw(err);
// 		return step3.value;
// 	});
