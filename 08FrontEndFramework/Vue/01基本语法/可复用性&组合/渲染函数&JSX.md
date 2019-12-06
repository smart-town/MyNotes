# 渲染函数&JSX

## 基础

Vue 推荐在绝大多数情况下使用模板来创建你的 HTML，然而一些情况下你可能还是需要 JavaScript 的完全编程能力，这时候可以使用**渲染函数**，它比模板更接近编译器。

一个简单的例子：

假设要生成一些带锚点的标题：`<h1><a name="hello-world" href="#hello-word">HelloWorld</a></h1>`

对于上面的标题，假设你要这样定义接口：`<anchored-heading :level="1">HelloWorld</anchored-heading>`

你可能很快想到这样的实现：
```html
<script type="text/x-template" id="anchored-heading-template">
    <h1 v-if="level === 1"><slot></slot></h1>
    <h2 v-if-else="level === 2"><slot></slot></h2>
    <h3 ...>
</script>

<script>
    Vue.component("anchored-heading", {
        template: "#anchored-heading-template",
        props: {
            level: {
                type: Number, required: true
            }
        }
    })
</script>
```
这里使用模板并不是最好的选择，不但代码冗长，还在每个标题中重复书写 `slot`，在要插入锚点元素时还要再次重复。尝试使用`render`:

```js
Vue.component("anchored-heading", {
    render: function(createElement) {
        return createElement(
            'h' + this.level,
            this.$slots.default
        )
    },
    props: {
        level: {
            type: Number,
            required: true
        }
    }
})
```

这样看起来简单多了，代码精简很多，但是需要非常熟悉 Vue 的实例属性，上面的例子中，需要知道向组件中传递不带`v-slot`的指令子节点时，这些子节点被存储在组件实例的`$slots.default`中

## 节点、树、虚拟 DOM

深入渲染函数之前，了解一些浏览器的工作原理是很有必要的。

当浏览器阅读 HTML 源码时，会建立一个“DOM 树”来保持所追踪的内容。每个元素都是一个节点，每段文字也是一个节点，甚至注释也是一个节点，一个节点就是页面的一部分。每个节点也都可以有子节点。

高效地更新所有这些节点是比较困难的，不过所幸你不必手动完成这个工作。你只需要告诉 Vue 你希望页面上的 HTML 是什么，这可以是在一个模板里：`<h1>{{blogTitle}}</h1>`，也可以是在一个渲染函数中：`render: function(createElement){return createElement(...)}`

这两种情况下，Vue 都会自动保持页面的更新。

### 虚拟 DOM

Vue 会通过建立一个**虚拟 DOM**来追踪自己要如何改变真实 DOM，`createElement`到底会返回什么呢？其实不是一个实际的 DOM 元素，它更准确的名字应该是`createNodeDescription`，因为它所包含的信息会告诉 Vue 页面上需要渲染什么样子的节点，包括及其子节点的描述信息。我们把这样的节点描述称为**虚拟节点**(virtual node),也常简写为`VNode`，虚拟 DOM 是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼。

## createElement

`createElement`的参数：
```js
// @returns VNode
createElement {
    // {String | Object | Function}
    // 一个 HTML 标签名、组件选项对象、或者 resolve 了上述任何一种的一个 async 函数
    'div',

    // {Object}
    // 一个与模板中属性对应的数据对象，可选，详情下述
    {},

    // {String | Array}
    // 子级虚拟节点(VNodes)，由`createElement`构建而成，也可以使用字符串来生成”文本虚拟节点“。可选
    [
        'some text',
        createElement('h1','~~Header')
    ]
}
```

### 深入数据对象

需要注意：正如`v-bind:class`和`v-bind:style`在模板语法中会被特殊对待一样，它们在 VNode 数据对象中也有对应的顶层字段。该对象也允许你绑定普通的 HTML 特性，也允许绑定如`innerHTML`这样的 DOM 属性。   
```js
{
    // 与 v-bind:class Api 相同，接收一个字符串、对象或字符串和对象组成的数组
    'class': {
        foo: true,
        bar: false
    }
}
```