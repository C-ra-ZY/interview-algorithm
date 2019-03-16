module.exports = {
	min: function(arr) {
		return Array.prototype.findIndex.apply(arr, [
			(e) => {
				return e == Math.min.apply(null, arr);
			}
		]);
	},
	max: function(arr) {
		return Array.prototype.findIndex.apply(arr, [
			(e) => {
				return e == Math.max.apply(null, arr);
			}
		]);
	}
};
