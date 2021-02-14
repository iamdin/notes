# JavaScript 原理代码

## 浅拷贝 ( shallow copy )

浅拷贝意味着只复制实际对象。如果复制的对象包含嵌套对象，则不会克隆这些嵌套对象。

1. spread

```js
const cloned = { ...object };
```

2. rest

```js
const { ...cloned } = object;
```

3. $Object.assign()$

```js
const cloned = Object.assign({}, object);
```

## 深拷贝

```js
const deepClone = (obj) => {
  if (!obj || typeof obj !== "object") return obj;
  let ans;
  if (obj instanceof Array) ans = [];
  else ans = {};
  for (let k in obj) {
    if (obj.hasOwnProperty(k)) {
      ans[k] = deepClone(obj[k]);
    }
  }
  return ans;
};
```

## 实现 bind 函数

函数提供了一个内建方法 [bind](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)，它可以绑定 `this`。

基本的语法是：

```javascript
let boundFunc = func.bind(context);
```

`func.bind(context)` 的结果是一个特殊的类似于函数的“外来对象（exotic object）”，它可以像函数一样被调用，并且透明地（transparently）将调用传递给 `func` 并设定 `this=context`。

换句话说，`boundFunc` 调用就像绑定了 `this` 的 `func`。

**基本实现**

```js
Function.prototype._bind = function() {
  const args = Array.from(arguments);
  const t = args.shift();
  const self = this;
  return function() {
    return self.apply(t, args);
  };
};

Function.prototype._bind = function() {
  const args = Array.from(arguments);
  const obj = args.shift();
  return () => this.apply(obj, args);
};

Function.prototype._bind = function(obj, ...args) {
  return () => this.apply(obj, args);
};
```

> 后两种写法分别使用箭头函数和 Rest 参数对象简化第一种写法

**柯里化**

```js
Function.prototype._bind = function(obj, ...args) {
  return (...params) => this.call(obj, ...args, ...params);
};
```

**参考文章**

- [现代 JavaScript 教程 - call/apply](https://zh.javascript.info/call-apply-decorators), [现代 JavaScript 教程 - bind](https://zh.javascript.info/bind), [现代 JavaScript 教程 - 柯里化（Currying）](https://zh.javascript.info/currying-partials)
- [js 手动实现 bind 方法，超详细思路分析！](https://www.cnblogs.com/echolun/p/12178655.html)

## 实现 `new`

## 实现 `instanceof`

## 实现 `Promise.all()`