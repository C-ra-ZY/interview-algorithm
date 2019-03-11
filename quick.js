let arr = require("./originArr");

function quickSort(arr) {
	if (arr.length > 1) {
		let pivotIndex = Math.floor(arr.length / 2);

		let after = arr.filter((e) => e > arr[pivotIndex]);
		let before = arr.filter((e) => e < arr[pivotIndex]);
		let middle = arr.filter((e) => e == arr[pivotIndex]);
		return [...quickSort(before), ...middle, ...quickSort(after)];
	} else {
		return arr;
	}
}

console.log(JSON.stringify(quickSort(arr)));
