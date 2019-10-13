# 组件

组件是可复用的 Vue 实例，且带有一个名字。因为组件是 Vue 实例，所以与 `new Vue`接受相同的选项。

组件Component是vue最强大的功能之一。组件可以扩展HTML元素封装可重用的代码。组件系统让我们可以用独立可复用的小组件来构建大型应用，几乎任意类型的应用的界面都可以抽象为一个组件树。

注册一个全局组件语法格式如下：

```html
Vue.component(tagName, options)
```

`tagName`为组件名，`options`为配置选项，注册后，我们可以使用以下的方式调用组件`<tagName></tagName>`

**一个组件的 data 选项必须是一个函数**，因此每个实例可以维护一份被返回对象的独立的拷贝。

```js
data: function(){
    return {
        count: 0
    }
}
```

## 全局组件

所有实例都能使用全局组件

```html
<div id="app">
    <runoob></runoob>
</div>

<script>
    //注册
    Vue.component("runoob", {
        template: "<h1>自定义组件</h1>"
    }) ;
    //创建根实例
    new Vue(
        el:"#app"
    );
</script>
```

## 局部组件’

我们也可以在实例选项中注册局部组件，这样组件只能在这个实例中使用。

```html
<div id="app">
    <runoob></runoob>
</div>
<script>
    var Child = {
        template: "<h1>自定义组件</h1>"
    }

    new Vue({
        el: "#app",
        components: {
            //<runoob>只能在父模板中使用
            "runoob": Child
        }
    });
</script>
```

## Prop

`prop`是父组件用来传递数据的一个自定义属性。父组件的数据需要通过props将数据传递给子组件，子组件需要显式地调用props选项声明"prop".

Prop 是你可以在组件上注册的一些自定义特性，当一个值传递给一个 prop 特性的时候，它就变成了那个组件实例的一个属性。一个组件默认可以有任意数量的prop，任何值都可以传递给prop。一个prop被注册后，就可以像这样将数据作为自定义特性传递进来：

`<component prop1="data data data"></component>`

```html
<div id="app">
    <child message="hello!"></child>
</div>
<script>
    Vue.component("child", {
        props: ["message"],
        template: "<span>{{message}}</span>"
    })

    new Vue({
        el: "#app"
    });
</script>
```

### 动态 prop

类似于用 v-bind 绑定 HTML 特性到一个表达式，也可以用v-bind动态绑定props的值到父组件的数据中。每当父组件的数据变化时，该变化也会传递个子组件。

```html
<div id="app">
    <div>
        <input v-model="parentMsg">
        <br>
        <child v-bind:message="parentMsg"></child>
    </div>
</div>

<script>
    Vue.component("child", {
        props: ["message"],
        template: "<span>{{message}}</span>"
    });

    new Vue({
        el: "#app",
        data: {
            parentMsg: '父组件内容'
        }
    });
</script>
```

【注意】prop是单向绑定的，当父组件的属性发生变化时，将传导给子组件，但是不会反过来。


### 单个根元素

当构建一个组件的时候，可能模板会有多个标签：

```html
<h4>{{title}}</h4>
<div v-html="content"></div>
```

然而如果你在模板中这样书写，Vue会显示一个错误。并会解释**每个组件只能有一个根元素**，你可以将模板的内容包含到一个父元素内，来修复这个问题。

```html
<div>
<h4>{{title}}</h4>
<div v-html="content"></div>
</div>
```

### prop 验证

组件可以为props指定验证要求，prop是一个对象而不是字符串数组时，包含验证要求：

```js
Vue.component("example",{
    props: {
        //基础类型检测
        propA: Number,
        //多种类型检测
        propB: [String,Number]

        //必传且是字符串
        propC: {
            type: String,
            required: true
        },
        //数字，有默认值
        propD: {
            type: Number,
            defalut: 100
        },
        ...
    }
})
```

type可以是：String、Number、Boolean、Function、Object、Array。type也可以是一个自定义构造器，使用instanceof检测

## 自定义事件

父组件是使用 props 传递数据给子组件但是如果子组件要将数据传递回去，就要使用自定义事件！我们可以使用`v-on`绑定自定义事件，每个vue实例都实现了事件接口。即：

- 使用`$on(eventName)`监听事件
- 使用`$emit(eventName)`触发事件

另外，父组件可以在使用子组件的地方直接用`v-on`来监听子组件触发的事件。下面的例子中子组件完全和它的外部解耦了，它所做的只是触发一个父组件关心的内部事件

```js
<div id="app">
    <div id="counter-event-example">
        <p>{{total}}</p>
        <button-counter v-on:increment="incrementTotal"></button-counter>
    </div>
</div>

<script>
    Vue.component("button-counter", {
        template: "<button v-on:click='incrementHandler'>{{counter}}</button>",
        data: function(){
            return {
                counter: 0
            }
        }.
        methods: {
            incrementHandler: function(){
                this.counter += 1 ;
                this.$emit("increment") ;
            }
        }
    }) ;
    new Vue({
        el: "#counter-event-example",
        data: {
            total: 0
        },
        methods: {
            incrementTotal: function(){
                this.total += 1
            }
        }
    });
</script>
```

!!!!【Attention】好像事件名称不能用包含大写的。。。？？？？？？？？用了它好像不识别。。。有毒

## 使用事件抛出一个值

有时候使用一个事件抛出一个特定的值是非常有用的，使用`$emit`的第二个参数来提供这个值，然后当父级组件监听这个事件的时候，我们可以通过`$event`来访问到被抛出的这个值。

```html
<button v-on:click="$emit('charge',0.1)">Enlarge</button>

<blog-post v-on:charge="fontSize += $event"></blog-post>
```

或者如果这个事件处理函数是一个方法，那么这个值将作为第一个参数传入这个方法：

```html
<blog-post v-on:charge="onChage"></blog-post>

methods:{
    onChage: function(chargeAmout){
        this.fontSize += chargeAmout;
    }
}

```

## 动态组件

有的时候，在不同组件之间进行动态切换是非常有用的。比如在一个多标签的页面中。

vue 通常通过给`<component>`元素加上一个特殊的`is`特性来实现。`<component v-bind:is="currentTabComponent"></component>`。

组件会在 currentTabComponent 改变时发生改变。

`currentTabComponent`可以包括：已经注册的组件名字、一个组件的选项对象。

## 注意事项

有些HTML元素，诸如`<ul>`、`<ol>`、`<table>`和`<select>`，对于哪些元素可以出现在其内部是有严格限制的。而有些元素如`<li>`、`<tr>`只能出现在其他某些特定的元素内部。

这会导致我们使用这些有约束条件的元素时遇到一些问题。如：

```html
<table>
    <blog-post-row></blog-post-row>
</table>
```

这个自定义组件`<blog-post-row>`会被视作无效的内容提升到外部。并且导致最终的渲染结果出错。还好有`is`属性给了我们一个变通的方法。。。

