# 面试问题

[[toc]]

## JS 为什么是单线程的？

:::details
这主要与 JavaScript 的用途有关，JavaScript 作为浏览器的脚本语言，主要是实现用户与浏览器的交互以及操作 DOM；这就决定了它只能是单线程，否则会带来很复杂的同步问题。例如：JS 被设计为多线程，一个线程要修改 DOM 原始，另一个线程要删除这个 DOM 元素，此时浏览器无法确定以那个为准。对于响应事件的异步处理，会加入到事件队列中，事件循环也是在单线程中进行的。

:::

## Promise

### 如何中断 Promise 链

返回一个 `pending` 状态的 `Promise` 对象

```js
const p = new Promise((resolve) => {
  setTimeout(() => resolve('ok'))
})

p.then(() => {
  console.log(1)
})
  .then(() => {
    return new Promise(() => {})
  })
  .then(() => {
    console.log(3)
  })
  .then(() => {
    console.log(4)
  })
```
