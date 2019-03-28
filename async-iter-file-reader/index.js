const asyncLineReader = require("./asyncLineReader.js");
const Big = require("big.js");
const fs = require("fs");
(async function() {
	let headers = [];
	class Item {
		constructor(...args) {
			for (let header of headers) {
				this[header] = args.shift();
			}
		}
	}
	let maxIncrease = Number.MIN_VALUE,
		stockNameWithMaxIncrease,
		cache = new Map(); // cache map for new version
	// cache1 = new Map();// cache map for old version

	for await (let line of asyncLineReader("./values.csv")) {
		if (!headers.length) {
			headers = line.split(",");
		}
		if (/CREASED/gi.test(line)) {
			let values = new Item(...line.split(","));
			let { Value, Name, Change } = values;
			if (!cache.has(Name)) {
				cache.set(Name, new Big(0));
			}
			let summayOfStock = cache.get(Name);

			let change = summayOfStock[/de/gi.test(Change) ? "minus" : "add"](Value);
			if (change.gte(maxIncrease)) {
				maxIncrease = change;
				stockNameWithMaxIncrease = Name;
			}
			cache.set(Name, change);

			// cache1.has(values.Name) ? cache1.get(values.Name).push(values) : cache1.set(values.Name, [values]);
		}
	}

	console.log(
		`the stock with largest increase from it's first record is ${stockNameWithMaxIncrease}
		the increase is ${maxIncrease}
				`
	); // print result for new version

	// maxIncrease = Number.MIN_VALUE;
	// for (let stock of cache1) {
	// 	let [stockName, data] = stock;
	// 	data.sort((a, b) => new Date(a.Date) - new Date(b.Date));
	// 	let summary = Array.prototype.reduce.apply(data, [
	// 		(acc, cur) => {
	// 			let { Change, Value } = cur;
	// 			Value = new Big(Value);
	// 			acc = acc[/de/gi.test(Change) ? "minus" : "add"](Value);
	// 			return acc;
	// 		},
	// 		new Big(0)
	// 	]);
	// 	let inComingValue = parseFloat(summary.valueOf());
	// 	if (maxIncrease < inComingValue) {
	// 		maxIncrease = inComingValue;
	// 		stockNameWithMaxIncrease = stockName;
	// 	}
	// }
	// console.log(
	// 	`the stock with largest increase from it's first record is ${stockNameWithMaxIncrease}
	// the increase is ${maxIncrease}
	// the start record is on ${cache1.get(stockNameWithMaxIncrease)[0].Date}
	// the last record is on ${cache1.get(stockNameWithMaxIncrease).slice(-1)[0].Date}
	// 		`
	// );
})();
