const { Writable, Readable } = require("stream");

let ws = new Writable({
	write: function(chunk, encoding, next) {
		console.log(`in writable:${chunk.toString()}`);
		next();
	},
	highWaterMark: 1
});
ws.write("-2");
ws.write("-1");
let index = 0;
let rs = new Readable({
	read: function(size) {
		if (index > 100) {
			this.push(null);
		} else {
			console.log(`in readable:${index}`);
			// process.nextTick(() => {
			this.push(`${index}`);
			index++;
			// });
		}
	},
	highWaterMark: 20
});
rs.on("data", function(chunk) {
	if (ws.writable) {
		// process.nextTick(() => {
		let ret = ws.write(chunk);
		if (!ret) {
			rs.pause();
		}
		// });
	} else {
		rs.pause();
	}
});

rs.on("end", function() {
	ws.end();
});
ws.on("finish", function() {
	ws.destroy();
	rs.destroy();
});
ws.on("drain", function() {
	rs.resume();
});
