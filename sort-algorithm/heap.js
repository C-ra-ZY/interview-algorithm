let arr = require("./originArr");
arr.push(101);
function heapSort(array) {
	var heapSize = array.length,
		temp;

	for (var i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
		heap(array, i, heapSize);
	}

	for (var j = heapSize - 1; j >= 1; j--) {
		console.log(array,j);
		temp = array[0];

		array[0] = array[j];

		array[j] = temp;

		heap(array, 0, --heapSize);
	}

	return array;
}

function heap(arr, x, len) {
	var l = 2 * x + 1,
		r = 2 * x + 2,
		largest = x,
		temp;

	if (l < len && arr[l] > arr[largest]) {
		largest = l;
	}

	if (r < len && arr[r] > arr[largest]) {
		largest = r;
	}

	if (largest != x) {
		temp = arr[x];

		arr[x] = arr[largest];

		arr[largest] = temp;

		heap(arr, largest, len);
	}
}

console.log(heapSort(arr));
