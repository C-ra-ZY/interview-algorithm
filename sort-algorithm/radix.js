let arr = require("./originArr");

let max = Math.max.apply(null, arr);

let radix = max.toString().length;
console.log(radix);
let tempArr = arr.map((e) => {
	let radixArr = [];
	let dev = 1;
	let tempRadix = radix;
	while (tempRadix > 0) {
		dev *= 10;
		radixArr.push(Math.floor(e / dev));
		tempRadix--;
	}
	console.log(JSON.stringify(radixArr));

	return { value: e, radixArr };
});

for (let iter = 0; iter < radix; iter++) {
	tempArr.sort((a, b) => {
		return a.radixArr[iter] - b.radixArr[iter];
	});
}

console.log(JSON.stringify(tempArr.map((e) => e.value)));
