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
