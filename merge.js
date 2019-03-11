let arr = require("./originArr");

function merge(arr) {
	if (arr.length > 1) {
		let first = merge(arr.splice(0, Math.floor(arr.length / 2))),
			second = merge(arr),
			temp = [];
		while (Math.min(first.length, second.length) > 0) {
			if (first[0] > second[0]) {
				temp.push(second.shift());
			} else {
				temp.push(first.shift());
			}
		}
		return temp.concat(first).concat(second);
	} else {
		return arr;
	}
}

console.log(JSON.stringify(merge(arr)));
