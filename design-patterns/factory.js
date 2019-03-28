/* SimpleFactory */
() => {
	class User {
		constructor(...params) {
			Object.assign(this, { ...params });
		}

		static getInstance(...params) {
			switch (params.role) {
				case "role1":
					return new SimpleFactory(params, { Views: [1, 2, 3] });
					break;
				case "role2":
					return new SimpleFactory(params, { Views: [1, 3] });
					break;
				default:
					throw new Error("wrong params");
			}
		}
	}
};

/* factory function along with abstract class */
() => {
	class User {
		constructor(...args) {
			if (new.target === FactoryFunction) {
				//mock the effect of abstract class
				throw new Error("this Class is an abstract class");
			}
			Object.assign(this, { ...args });
		}
	}

	class UserType1 extends User {}

	class UserType2 extends User {}
	class UserType3 extends User {}

	function Factory(type) {
		switch (type) {
			case "type1":
				return UserType1;
				break;
			case "type2":
				return UserType2;
				break;
			case "type3":
				return UserType3;
				break;
			default:
				throw new Error("wrong params");
		}
	}
};
