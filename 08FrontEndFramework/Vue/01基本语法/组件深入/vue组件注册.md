# 组件注册

## 组件名

注册组件的时候，始终需要给它一个名字。你给予组件的名称可能依赖于你打算拿它来做什么，当直接在 DOM 中使用一个组件（而不是在字符串模板或单文件组件）的时候，强烈推荐遵循 w3c 规范中的自定义组件名（字母全小写且必须包含一个连字符），这会帮助你避免和当前以及未来的 HTML 元素冲突。

### 组件名大小写

定义组件名的方式有两种：**keybab-case** 和 **PascalCase** 

keybab-case: `my-component-name`，此种方式定义一个组件，必须在引用这个自定义元素时使用`keybab-case`，如`<my-component-name>`

PascalCase: `MyComponentName`，使用 PascalCase 定义一个组件时，引用自定义元素时两种命名方法都可以，即`<my-component-name>`和`<MyComponentName>`都是可以接受的。

**注意**: 尽管如此，直接在 DOM（即非字符串的模板）中使用时只有**keybab-case 是有效的**

## 全局注册

`Vue.component()`，这样注册的组件是全局的，也就是说，它们在注册之后可以用在任何新创建的 Vue 根实例的模板中。

## 局部注册

全局注册往往是不够理想的，比如，如果你使用了 webpack 这样的构建系统，全局注册所有的组件意味着即使你已经不再使用一个组件了，它仍然会被包含在你最终的构建结果中。这造成了用户下载的 JavaScript 的无谓增加。

这些情况下，你可以通过一个普通的 JavaScript 对象定义组件。如`var ComA = {...}； var ComB={...}`

然后在`components`选项中定义你想要使用的组件：
```js
new Vue({
    el: "#app",
    components:{
        'component-a': ComA,
        'component-b': ComB,
    }
})
```
对于`components`对象中的每个属性来说，其属性名就是自定义元素的名字，其属性值就是这个组件的选项对象。

注意**局部注册的组件在其子组件中不可用**，如，如果你希望`ComA`在`ComB`中可用，则需要这样写：
```js
var ComA = {/*...*/};

var ComB = {
    components: {
        'component-a': ComA
    }
}
```

或者如果通过 Babel 和 webpack 使用 ES2015,那么代码就像这样：
```js
import ComponentA from './ComponentA.vue'

export default {
    components: {
        componentA
    }
}
```

## 模块系统

### 在模块系统中局部注册

如果你使用诸如 Babel 和 webpack 的模块系统，这种情况下，推荐创建一个`components`目录，并将每个组件放置在其各自的文件中，然后你需要在局部注册之前导入每个你想使用的组件。如`import ComponentA from './ComponentA'`

### 基础组件的自动化全局注册

可能你的许多组件只是包裹在一个输入框或者按钮之类的元素中，是相对通用的，我们有时候会将其称为基础组件，它们会在各个组件中被频繁用到。

所以会导致很多组件都有一个包含基础组件的长列表.

如果使用了 webpack 或在内部使用了 webpack 的 vue-cli，那么就可以使用`require.context`只全局注册这些非常通用的基础组件，如：

```js
const requireComponents = require.context(
    // 其组件目录的相对路径
    './components',
    // 是否查询子目录
    false,
    // 匹配基础组件名称的正则表达式
    /Base[A-Z]\w+\.(vue|js)$/
)

requireComponents.keys().forEach(fileName=>{
    //获取配置
    const config = requireComponents(fileName)

    //获取组件 PascalCase 命名：
    const name = upperFirst(camelCase(fileName.split('/').pop().replace(/\.\w+$),''))
})

```

记住**全局注册行为必须在根 Vue 实例(new Vue)创建之前发生**