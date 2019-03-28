const fs = require("fs"),
	pathUtil = require("path");
module.exports = async function* readLines(path) {
	let file = fs.createReadStream(pathUtil.resolve(__dirname, path));
	let storedChunks = [],
		size = 0;
	for await (let chunk of file) {
		let lineBreakIndex;
		while ((lineBreakIndex = chunk.indexOf("\n")) > -1) {
			let toStoredChunk = chunk.slice(0, lineBreakIndex);
			storedChunks.push(toStoredChunk);
			size += toStoredChunk.length;
			let lineBuf = Buffer.concat(storedChunks, size);
			chunk = chunk.slice(lineBreakIndex + 1);
			storedChunks = [];
			size = 0;
			yield lineBuf.toString().trim();
		}
		storedChunks.push(chunk);
		size += chunk.length;
	}
	file.close();
};
