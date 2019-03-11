let arr = require("./originArr");
let res = [Number.NEGATIVE_INFINITY, arr[0], Number.POSITIVE_INFINITY];
for (let index = 1; index < arr.length; index++) {
	res = insert(res, arr[index]);
}

function insert(arr, target) {
	for (let index = 0; index < arr.length - 1; index++) {
		if (arr[index] < target && arr[index + 1] >= target) {
			let after = arr.splice(index + 1);
			arr = arr.concat(target).concat(after);
		}
	}
	return arr;
}
res.shift();
res.pop();
console.log(JSON.stringify(res));
