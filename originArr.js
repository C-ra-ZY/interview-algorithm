let arr = new Array();
arr.length = 10;
for (let index = 0; index < arr.length; index++) {
	arr[index] = Math.round(Math.random() * 100, 2) + 1;
}
console.log(JSON.stringify(arr));
module.exports = arr;
