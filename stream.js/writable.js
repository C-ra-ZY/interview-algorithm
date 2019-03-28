const { Writable } = require("stream");

class myWritable extends Writable {
	_write() {}

	_writev() {}
}

// let assert = require("assert");

// assert.equal
