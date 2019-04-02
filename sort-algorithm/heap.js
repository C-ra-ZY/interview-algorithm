let arr = require("./originArr");
let swap = require("./swap");

function heap(i) {
	let leftIndex = 2 * i + 1;
	let rightIndex = 2 * i + 2;
	if (arr[i]) {
		if (!arr[leftIndex]) {
			return arr[i];
		} else {
			let left = heap(leftIndex);
			let right = heap(rightIndex);
			if (left > arr[i]) {
				let [a, b] = swap(arr[i], left);
				arr[i] = a;
				arr[leftIndex] = b;
			}
			if (right > arr[i]) {
				let [a, b] = swap(arr[i], right);
				arr[i] = a;
				arr[rightIndex] = b;
			}
			return arr[i];
		}
	} else {
		return Number.NEGATIVE_INFINITY;
	}
}
let res = [];
do {
	res.push(heap(0));
	arr.shift();
} while (arr.length);
console.log(JSON.stringify(res));
