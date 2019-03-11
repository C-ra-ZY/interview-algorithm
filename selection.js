let arr = require("./originArr");
let swap = require("./swap");
let getIndex = require("./getIndex");
console.log(JSON.stringify(arr));

for (let index = 0; index < arr.length; index++) {
	for (let index2 = index + 1; index2 < arr.length; index2++) {
		let remaining = Array.from(arr).splice(index2);
		let minIndexInRemaining = index + 1 + getIndex.min(remaining);
		if (arr[index] > arr[minIndexInRemaining]) {
			let [a, b] = swap(arr[index], arr[minIndexInRemaining]);
			arr[index] = a;
			arr[minIndexInRemaining] = b;
		}
	}
}
console.log(JSON.stringify(arr));
