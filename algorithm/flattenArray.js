function *flatten2(arr) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    /* yield* 的使用可以大大简化程序编写 */
    Array.isArray(item) ? yield* flatten2(item) : yield item;
  }
}

/* 用 flatten2 来完成 flatten 也是很方便的 */
// const flatten = (arr) => [...flatten2(arr)]
