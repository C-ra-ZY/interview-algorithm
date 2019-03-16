let arr = require("./originArr");

let counter = new Array();
let res = [];
for (let item of arr) {
	counter[item] = (counter[item] || 0) + 1;
}
counter.forEach((e, index) => {
	if (e) {
		res = res.concat(new Array(e).fill(index));
	}
});

console.log(JSON.stringify(res));

//time O(2n)
//space O(2n)