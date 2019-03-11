let arr = require("./originArr");
let swap = require("./swap");

for (let index = 0; index < arr.length; index++) {
	for (let index2 = index + 1; index2 < arr.length; index2++) {
		if (arr[index] > arr[index2]) {
			let [a, b] = swap(arr[index], arr[index2]);
			arr[index] = a;
			arr[index2] = b;
		}
	}
}
console.log(JSON.stringify(arr));
