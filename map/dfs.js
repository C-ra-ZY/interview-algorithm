class Vector {
	constructor(name) {
		this.name = name;
		this.adjs = new Set();
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
function dfsShortest(path = [], vectorTo) {
	if (path.includes(vectorTo)) {
		return path.slice(0, path.findIndex((e) => e == vectorTo) + 1);
	}
	let last = path[path.length - 1];
	let secondLast = path.length > 1 ? path[path.length - 2] : null;
	let { adjs } = last;
	let paths = [...adjs]
		.filter((adj) => {
			return !path.includes(adj) && (!!secondLast ? ![...secondLast.adjs].includes(adj) : true);
		})
		.map((adj) => {
			return dfsShortest([...path, adj], vectorTo);
		})
		.filter((e) => e && e.length);
	let shortest = Math.min.apply(null, paths.map((e) => e.length)) || -1;
	for (let sp of paths.filter((e) => e && e.length == shortest)) {
		console.log(sp.map((e) => e.name).join("-"));
		return sp;
	}
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
A.addAdj(B);
A.addAdj(C);
A.addAdj(D);
B.addAdj(E);
B.addAdj(F);
C.addAdj(D);
C.addAdj(G);
D.addAdj(G);
D.addAdj(H);
E.addAdj(I);
E.addAdj(H);
I.addAdj(C);
console.log(`the shortest path is: ${dfsShortest([B], H).join("-")}`);
