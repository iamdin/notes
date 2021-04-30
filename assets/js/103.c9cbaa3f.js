(window.webpackJsonp=window.webpackJsonp||[]).push([[103],{521:function(e,v,t){"use strict";t.r(v);var _=t(18),r=Object(_.a)({},(function(){var e=this,v=e.$createElement,t=e._self._c||v;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"面试问题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#面试问题"}},[e._v("#")]),e._v(" 面试问题")]),e._v(" "),t("h2",{attrs:{id:"vue-双向绑定原理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#vue-双向绑定原理"}},[e._v("#")]),e._v(" vue 双向绑定原理")]),e._v(" "),t("p",[t("a",{attrs:{href:"https://www.cnblogs.com/kidney/p/6052935.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Vue.js 双向绑定的实现原理"),t("OutboundLink")],1)]),e._v(" "),t("h2",{attrs:{id:"virtual-dom"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#virtual-dom"}},[e._v("#")]),e._v(" Virtual DOM")]),e._v(" "),t("p",[e._v("Virtual DOM 实质上是就是一个 JavaScript 对象树，首先对将要插入到文档中的 DOM 树结构进行分析，使用 js 对象将其表示出来，比如一个元素对象，包含 TagName、props 和 Children 这些属性。然后我们将这个 js 对象树给保存下来，最后再将 DOM 片段插入到文档中。")]),e._v(" "),t("p",[e._v("当页面的状态发生改变，需要对页面的 DOM 的结构进行调整，首先根据变更的状态，重新构建起一棵对象树，然后将这棵新的对象树和旧的对象树进行比较，记录下两棵树的的差异。")]),e._v(" "),t("p",[e._v("最后将记录的有差异的地方应用到真正的 DOM 树中去，这样视图就更新了。")]),e._v(" "),t("p",[t("strong",[e._v("Virtual DOM 的优势在哪里？")])]),e._v(" "),t("p",[e._v("首先要知道，DOM 引擎，JS 引擎相互独立，但又工作在同一线程（主线程），JS 代码调用 DOM API 后必须挂起 JS 引擎、转换参数数据、激活 DOM 引擎，DOM 重绘后在转换肯能的返回值，最后激活 JS 引擎并继续执行。如果有频繁的 DOM API 调用，且浏览器厂商不做 “批处理” 优化，引擎间切换会消耗资源，且如果 DOM 操作伴随着有重绘和回流会引起更大的性能消耗。")]),e._v(" "),t("ul",[t("li",[e._v("虚拟 DOM 不会立刻进行排版和重绘操作；")]),e._v(" "),t("li",[e._v("虚拟 DOM 进行频繁的修改，然后一次性比较并修改真实 DOM 中需要改的部分，最后在真实 DOM 中进行排版和重绘。")]),e._v(" "),t("li",[e._v("虚拟 DOM 通过 Diff 算法找出最小差异范围，减少 DOM 操作带来的回流和重绘。")])]),e._v(" "),t("p",[e._v("所以说 Virtual DOM 这种方法状态变化更新视图的解决方案对于需要有大量的 DOM 操作的时候，能够很好的提高我们的操作效率，通过在操作前确定需要做的最小修改，尽可能的减少 DOM 操作带来的回流和重绘的影响。")]),e._v(" "),t("p",[e._v("其实 Virtual DOM 并不一定比我们真实的操作 DOM 要快，这种方法的目的是为了提高我们开发时的可维护性，在任意的情况下，都能保证一个尽量小的性能消耗去进行操作。")]),e._v(" "),t("p",[t("a",{attrs:{href:"https://github.com/y8n/blog/issues/5",target:"_blank",rel:"noopener noreferrer"}},[e._v("理解 Virtual DOM"),t("OutboundLink")],1)]),e._v(" "),t("h2",{attrs:{id:"生命周期"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#生命周期"}},[e._v("#")]),e._v(" 生命周期")]),e._v(" "),t("p",[e._v("Vue 的生命周期指的是组件从创建到销毁的一系列的过程，被称为 Vue 的生命周期。通过提供的 Vue 在生命周期各个阶段的钩子函数，我们可以很好的在 Vue 的各个生命阶段实现一些操作。")]),e._v(" "),t("ul",[t("li",[t("code",[e._v("beforeCreate")])]),e._v(" "),t("li",[t("code",[e._v("created")])]),e._v(" "),t("li",[t("code",[e._v("beforeMount")])]),e._v(" "),t("li",[t("code",[e._v("mounted")])]),e._v(" "),t("li",[t("code",[e._v("beforeUpdate")])]),e._v(" "),t("li",[t("code",[e._v("updated")])]),e._v(" "),t("li",[t("code",[e._v("beforeDestory")])]),e._v(" "),t("li",[t("code",[e._v("destoryed")])])]),e._v(" "),t("h2",{attrs:{id:"组件通信"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#组件通信"}},[e._v("#")]),e._v(" 组件通信")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("父子组件")]),e._v(" "),t("ul",[t("li",[e._v("子组件通过 "),t("code",[e._v("props")]),e._v(" 属性接受父组件数据；父组件在子组件上注册事件监听，子组件通过 "),t("code",[e._v("$emit")]),e._v(" 触发事件向父组件通信；")]),e._v(" "),t("li",[t("code",[e._v("ref")]),e._v(" 属性，父组件通过 "),t("code",[e._v("$refs")]),e._v(" 获取子组件，子组件通过"),t("code",[e._v("$parent")]),e._v(" 获取父组件；")]),e._v(" "),t("li",[t("code",[e._v("provider")]),e._v("/"),t("code",[e._v("inject")]),e._v(" ，父组件通过 "),t("code",[e._v("provider")]),e._v(" 提供变量，子组件通过 "),t("code",[e._v("inject")]),e._v(" 将变量注入组件，不论子组件多深。")])])]),e._v(" "),t("li",[t("p",[e._v("兄弟组件")]),e._v(" "),t("ul",[t("li",[t("code",[e._v("eventBus")]),e._v("，通过创建一个 Vue 实例来作为消息传递的对象，通信的组件引入这个实例，通信组件同构在这个实例上监听和触发事件来实现消息的传递；")]),e._v(" "),t("li",[t("code",[e._v("$parent.$refs")])])])]),e._v(" "),t("li",[t("p",[e._v("任意组件之间")]),e._v(" "),t("ul",[t("li",[t("code",[e._v("eventBus")]),e._v("，创建一个事件中心；")]),e._v(" "),t("li",[e._v("Vuex 全局状态管理")])])])]),e._v(" "),t("h2",{attrs:{id:"diff-算法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#diff-算法"}},[e._v("#")]),e._v(" Diff 算法")]),e._v(" "),t("p",[e._v("diff")]),e._v(" "),t("h2",{attrs:{id:"vuejs-scoped-css-实现原理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#vuejs-scoped-css-实现原理"}},[e._v("#")]),e._v(" VueJS Scoped CSS 实现原理")]),e._v(" "),t("p",[e._v("哈哈")]),e._v(" "),t("h2",{attrs:{id:"相关文章"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#相关文章"}},[e._v("#")]),e._v(" 相关文章")]),e._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://juejin.cn/post/6844903918753808398",target:"_blank",rel:"noopener noreferrer"}},[e._v("30 道 Vue 面试题，内含详细讲解（涵盖入门到精通，自测 Vue 掌握程度"),t("OutboundLink")],1)])])])}),[],!1,null,null,null);v.default=r.exports}}]);