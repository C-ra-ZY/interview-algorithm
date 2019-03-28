class BaseBuilder {
	// constructor(params) {
	// 	this.prop1 = "";
	// 	this.prop2 = "";
	// 	this.prop3 = "";
	// }

	init() {
		Object.keys(this).forEach((e) => {
			this["set" + e[0].toUpperCase() + e.slice(1)] = (value) => {
				this[e] = value;
				return this;
			};
		});
	}

	build() {
		return Object.keys(this).filter((e) => !Function.prototype.isPrototypeOf(this[e])).reduce((acc, cur) => {
			Object.assign(acc, { [cur]: this[cur] });
			return acc;
		}, {});
	}
}
class BookBuilder extends BaseBuilder {
	constructor() {
		super();
		this.name = "";
		this.author = "";
		this.price = 0;
		this.category = "";
		this.init();
	}
}

const book = new BookBuilder();
var dd = book.setName("ab").setAuthor("ccd").setPrice(51).setCategory("eew").build();
exports.dd = dd;
