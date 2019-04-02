function maxCommonDivisior(x, y) {
	while (x != y) {
		if (x < y) {
			y = y - x;
		}
		if (x > y) {
			x = x - y;
		}
	}
	return x;
}


function Euclidean(x, y) {
	while (x * y) {
		if (x > y) {
			x %= y;
		}
		if (x < y) {
			y %= x;
		}
	}
	return Math.max(x, y);
}
