# 组件

组件是可复用的 Vue 实例，且带有一个名字。可以在一个通过`new Vue`创建的 Vue 根实例中，将这个组件作为自定义元素来使用。

## data 必须是一个函数

**一个组件的 data 选项必须是一个函数**，因此每个实例可以维护一份被返回对象的独立的拷贝。如果没有这一规则那么会影响到其他相同组件实例。

## 组件组织

通常一个应用会以一颗嵌套的组件树形式来组织。如可能有页头、侧边栏、内容区等组件，每个组件中又包含了其他像导航链接、博文之类的组件。为了能够在模板中使用，这些组件必须先注册以便 Vue 能够识别，有两种组件的注册类型:**全局注册**和**局部注册**。

全局注册是以`Vue.component('my-component-name',{options})`进行注册的。全局注册的组件可以用在其被注册后任何新创建的 Vue 根实例中，也包括组件树中所有子组件的模板中。

关于更多[组件注册](./vue组件注册.md)

## prop

通过 Prop 向子组件传递数据，Prop 是你可以在组件上注册的一些自定义特性。当一个值传递给 prop 特性的时候，它就变成了那个组件实例的一个属性。

一个组件默认可以拥有任意数量的`prop`，任何值都可以传递给任何`prop`，我们在组件实例中访问`prop`就像访问`data`中的值一样。

注册：`Vue.component('blog-post',{props:['title'],template: '<h3>{{title}}</h3>'})`

一个 prop 注册之后可以这样使用：`<blog-post title="Mytitle"></blog-post>`。我们也可以通过`v-bind`动态传递`prop`。

关于更多[prop](./Prop.md)

## 单个根元素

构建一个组件时，**组件必须只有一个根元素**。

## 监听子组件事件

开发组件时，它的一些功能可能要求我们和父级组件沟通。Vue 实例提供了一个**自定义的事件系统**来解决这个问题。

父级组件可以像处理 native DOM 事件一样通过`v-on`监听子组件实例的任意事件：
```jsx
<blog-post
    ...
    v-on:enlarge-text="postFontSize += 0.1"
></blog-post>
```
同时子组件内可以通过调用内建的`$emit()`方法并传入事件名来触发一个事件：
```js
<button v-on:click="$emit('enlarge-text')">
Enlarge Text
</button>
```
有了`v-on:enlarge-text="..."`这个监听器，父级组件就会接收该事件并且更新`postFontSize`值。

### 使用事件抛出一个值

有时候使用一个事件来抛出一个特定的值是非常有用的，这时候可以使用`$emit()`的第二个参数来提供这个值。当父级组件监听对应事件时，可以通过`$event`访问到被抛出的值：`v-on:enlarge-text="postFontSize += $event"` 

或者事件处理函数是一个方法：
```js
<blog-post v-on:enlarge-text="enlarge"></blog-post>

methods:{
    enlarge:function(enlargeAmount){
        this.postFontSize += enlargeAmount;
    }
}
```

### 组件上使用 v-model

自定义事件也可以用与创建支持`v-model`的自定义输入组件

`v-model="searchText"`等价于`v-bind:value="searchText" v-on:input="searchText = $event.target.value"`

当它用在组件上时，`v-model`则会这样：
```js
<custom-input
    v-bind:value="searchText"
    v-on:input="searchText = $event"
>
</custom>
```

为了让它正常工作，这个组件内的`<input>`必须：
- 将其`value`属性绑定在一个名叫`value`的`prop`上
- 在其`input`事件被触发时，将新定义的值通过自定义的`input`事件抛出。

更多关于[自定义事件][2]

## 通过插槽分发内容

和 HTML 一样，我们经常需要向一个组件传递内容：`<alert-box>Something</alert-box>`

Vue 自定义的`<slot>`元素让这变得非常简单：
```js
Vue.component('alert-box',{
    template:`
        <div class="demo">
            <strong>Error!<strong>
            <slot></slot>
        </div>
    `
})
```
我们只需要在需要的地方加入插槽就可以了。

更多关于[插槽][3]

## 动态组件

有时候，在不同的组件之间切换是非常有用的，如在一个多标签的界面中点击不同的标签切换不同的组件。

Vue 可以通过`<component>`元素加上特殊的`is`特性来实现：
```js
<!-- 组件会在 currentTabCompnent 改变时改变 -->
<component v-bind:is="currentTabComponent"></component>
```
上面的例子中，`currentTabComponent`可以包括：
- 已注册的组件名字
- 一个组件的选项对象

更多关于 [动态组件和异步组件][4]

## 解析 DOM 时需要注意的事项

有些 HTML 元素，如`<ul>`、`<ol>`、`<table>`，对于哪些元素可以出现在其内部是有严格限制的，而有些元素如`<li>`只能出现在其他某些特定的元素内部。

这会导致我们使用这些有约束的元素时遇到一些问题，如：
```js
<table>
    <blog-post-row></blog-post-row>
</table>
```
这个自定义组件`<blog-post-row>`会被视为无效内容提升到外部，并导致最终渲染结果出错。幸好特殊字符`is`给我们提供一个变通的方法：
```js
<table>
    <tr is="blog-post-row"></tr>
</table>
```

需要**注意的是**，**如果我们从以下来源使用模板的时候，这条限制是不存在的**:

- 单字符串，如`template: '...'`
- 单文件组件：`.vue`
- `<script type="text/x-template>`



[2]:./自定义事件.md
[3]:https://www.baidu.com
[4]:./动态组件和异步组件