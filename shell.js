let arr = require("./originArr");
let swap = require("./swap");

let initGap = Math.ceil(arr.length / 2);
while (initGap >= 1) {
	for (let index = 0; index + initGap < arr.length; index++) {
		if (arr[index] > arr[index + initGap]) {
			let [a, b] = swap(arr[index], arr[index + initGap]);
			arr[index] = a;
			arr[index + initGap] = b;
		}
	}
	initGap -= 2;
}
console.log(JSON.stringify(arr));


//time O(nlogn)