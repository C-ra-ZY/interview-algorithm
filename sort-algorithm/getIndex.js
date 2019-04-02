module.exports = {
	min: function(arr) {
		let min = Math.min.apply(null, arr);
		return Array.prototype.findIndex.apply(arr, [
			(e) => {
				return e == min;
			}
		]);
	},
	max: function(arr) {
		let max = Math.max.apply(null, arr);
		return Array.prototype.findIndex.apply(arr, [
			(e) => {
				return e == max;
			}
		]);
	}
};
