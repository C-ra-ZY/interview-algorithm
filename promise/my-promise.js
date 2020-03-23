class MyPromise {
  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  constructor(executor) {
    this.status = "pending";
    this.resolveValue;
    this.rejectReason;
    this.onfulfilledArr = [];
    this.onrejectedArr = [];
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (err) {
      this.reject(err);
    }
  }

  set status(newStatus) {
    if (this.status && this.status != "pending") {
      throw Error(`you can't change a ${this.status} promise's status.`);
    }
    Reflect.defineProperty(
      this,
      "status",
      Object.assign(
        {},
        Reflect.getOwnPropertyDescriptor(this, "status"),
        {
          value: newStatus,
          configurable: false,
          writable: false
        },
        newStatus != "pending"
          ? {
              configurable: false,
              writable: false
            }
          : {
              configurable: true,
              writable: true
            }
      )
    );
  }

  resolve(value) {
    this.status = "fulfilled";
    this.resolveValue = value;
    this.onfulfilledArr.forEach(e => e && e.apply(null, [this.resolveValue]));
  }

  reject(err) {
    this.status = "rejected";
    this.rejectReason = err;
    this.onrejectedArr.forEach(e => e && e.apply(null, [this.rejectReason]));
  }

  then(onfulfilled, onrejected) {
    switch (this.status) {
      case "fulfilled":
        let res;
        try {
          res = onfulfilled(this.resolveValue);
          return MyPromise.resolve(res || this.resolveValue);
        } catch (err) {
          return MyPromise.reject(err);
        }
      case "rejected":
        return MyPromise.reject(onrejected ? onrejected(this.rejectReason) || this.rejectReason : this.rejectReason);
      default:
        onfulfilled && this.onfulfilledArr.push(onfulfilled);
        onrejected && this.onrejectedArr.push(onrejected);
        return this;
    }
  }
  catch(onrejected) {
    switch (this.status) {
      case "pending":
        this.onrejectedArr.push(onrejected);
        return this;
      default:
        return MyPromise.reject(onrejected(this.rejectReason) || this.rejectReason);
    }
  }
}

let dd = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

dd.then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});
setTimeout(function() {
  let ee = dd.then(res => {
    throw Error('"test catch"');
  });
  let ff = ee
    .catch(err => {
      console.log(`record error ${err} at first time`);
    })
    .catch(err => {
      console.log(`record error ${err} at second time`);
    });
}, 2000);
