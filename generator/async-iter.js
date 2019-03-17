let fs = require("fs"),
	path = require("path");
async function* readLines(path) {
	let file = fs.createReadStream(path, { highWaterMark: 4 });
	let storedChunks = [],
		size = 0;
	for await (let chunk of file) {
		let lineBreakIndex = chunk.indexOf("\n");
		if (lineBreakIndex > -1) {
			let toStoredChunk = chunk.slice(0, lineBreakIndex);
			storedChunks.push(toStoredChunk);
			size += toStoredChunk.length;
			let lineBuf = Buffer.concat(storedChunks, size);
			let remainChunk = chunk.slice(lineBreakIndex + 1);
			storedChunks = [];
			size = 0;
			storedChunks.push(remainChunk);
			size += remainChunk.length;
			yield lineBuf.toString();
		} else {
			storedChunks.push(chunk);
			size += chunk.length;
		}
	}
	file.close();
}

(async function() {
	console.log("test");
	for await (const line of readLines(path.resolve(__dirname, "./await-test.js"))) {
		console.log(line);
	}
})();
