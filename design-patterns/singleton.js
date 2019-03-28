class Singleton {
	constructor(...args) {
		Object.assign(this, { ...args });
		if (!Singleton.instance) {
			Singleton.instance = this;
		}
		return Singleton.instance;
	}

	static getInstance(...args) {
		if (!Singleton.instance) {
			Singleton.instance = new Singleton(args);
		}
		return Singleton.instance;
	}
}

module.exports = Singleton;
