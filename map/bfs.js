class Vector {
	constructor(name) {
		this.name = name;
		this.adjs = new Set();
		this.searchedFrom = undefined;
	}
	addAdj(vector) {
		if (vector instanceof Vector && vector.name != this.name && !this.adjs.has(vector)) {
			this.adjs.add(vector);
			vector.addAdj(this);
			return true;
		}
		return false;
	}
	valueOf() {
		return this.name;
	}
	toString() {
		return this.valueOf();
	}
}

function bfsShortest(vectorFrom, vectorTo) {
	vectorFrom.searchedFrom = undefined;
	let searchedPool = new Set();
	let toSearchPool = new Set();
	toSearchPool.add(vectorFrom);
	let target = null;
	do {
		let tempPool = [];
		for (let vector of [...toSearchPool].filter((e) => !searchedPool.has(e))) {
			searchedPool.add(vector);
			if (vector == vectorTo) {
				target = vector;
				toSearchPool = new Set();
				break;
			} else {
				tempPool = [
					...tempPool,
					...[...vector.adjs]
						.filter((e) => {
							return (
								!searchedPool.has(e) && (!vector.searchedFrom ? true : !vector.searchedFrom.adjs.has(e))
							);
						})
						.map((e) => {
							if (!e.searchedFrom) {
								e.searchedFrom = vector;
							}
							return e;
						})
				];
			}
		}
		toSearchPool = new Set(tempPool);
	} while (toSearchPool.size);
	return target;
}

let A = new Vector("A"),
	B = new Vector("B"),
	C = new Vector("C"),
	D = new Vector("D"),
	E = new Vector("E"),
	F = new Vector("F"),
	G = new Vector("G"),
	H = new Vector("H"),
	I = new Vector("I");

I.addAdj(C);
E.addAdj(H);
B.addAdj(E);
B.addAdj(F);
C.addAdj(D);
C.addAdj(G);
D.addAdj(G);
D.addAdj(H);
E.addAdj(I);
A.addAdj(B);
A.addAdj(C);
A.addAdj(D);
let result = bfsShortest(E, G);
let str = `${result.name}`;
while (result.searchedFrom) {
	result = result.searchedFrom;
	str += `-${result.name}`;
}

console.log([...str].reverse().join(""));
