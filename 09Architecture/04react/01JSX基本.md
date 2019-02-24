# JSX

`const element = <h1>Hello</h1>`

观察该声明的变量可以发现该语法既不是字符串也不是 HTML。这就是 JSX，javascript 语法的一种扩展。推荐在 React 中使用 JSX 来描述用户页面。其完全是在 JavaScript 内部实现的。

JSX 用来声明 React 当中的元素。

## 在 JSX 中使用表达式

可以任意在 JSX 中使用 JavaScript 表达式。不过要包含在**大括号**中。`<h1>{formatName(user)}</h1>`.

## JSX 本身也是一种表达式

在编译之后，JSX 其实会被转换为普通的 JS 对象。

## JSX 属性

可以用引号定义以字符串为值的属性。也可以使用大括号定义以 JavaScript 表达式为值的属性。但是注意使用表达式时大括号外不能再用引号了。。

## JSX 标签嵌套

## JSX 代表 Objects

Babel 编译器会将 JSX 转换为一个名为`React.createElement()`的方法调用。即：

```js
const element = (<h1>aa</h1>);
```

与

```js
const element = React.createElement('h1','aa');
```

是相同的。

`React.createElement()`会进行一些避免 bug 的检查，之后会返回一个类似下面的对象：

```js

//注意石建华的
const element = {
    type= "h1",
    props: {
        children: "aa"
    }
}
```

这样的对象被称为 React 元素。其代表你在屏幕上看到的东西，React 通过读取这些对象来构建 DOM 并保持数据一致。


=====================================

## 深入 JSX

### 指定 React 元素类型

JSX 标签名决定了 React 元素的类型，大写开头的 JSX 表示一个 React 组件，这些标签会被编译为同名变量并被引用，所以如果使用了`<Foo/>`则必须先声明`Foo`变量。

#### React 必须声明

由于编译后会调用`React.createElement`方法所以必须引入`import React from 'react'`

#### 点表示法

可以从一个模块中导出许多有用的组件`<MyComponents.DatePicker color="blue"/>`

#### 首字母大写

当元素类型以小写字母开头时，它表示一个内置的组件。如`<div>`，并将`div`传递给`React.createElement`。

建议用大写开头命名组件，如果组件以小写开头，在 JSX 中使用之前将其赋值给大写开头的变量：

#### 在运行时选择类型

不能使用表达式来作为 React 元素的标签，如果的确想通过表达式来确定`React`元素的类型，请先将其赋值给大写开头的变量：

```js
import ...;
const components ={
    photo: PhotoStory,
    video: VideoStory
};

function Story(props){
    //!!!错误
    return <components[props.storyType] sotry={props.story}/> 

    //正确
    const Specific = components[props.storyType] ;
    return <Specific story={props.story}/>
}
```

### 子代

在包含开始和结束标签的 JSX 中，标记之间的内容作为特殊的参数传递：`props.children`。有几种不同的方法传递子代

#### 字符串常量

如`<MyComponent>Hello</MyComponent>`，则`props.children`表示字符串。这对于许多内置的 HTML 元素很有用

#### JSX

即组件相互嵌套

### JavaScript 表达式

可以将任意包裹在`{}`中的 js 表达式作为子代传递。如`<MyComponent>{'foo'}</MyComponent>`

这对于渲染任意长度的 JSX 表达式列表很有用：

```js
function Item(props){
    return <li>{props.message}</li>;
}
function TodoList(){
    const todos = ['finsh doc', 'submit pr'];
    return(
        <ul>
            {todos.map((message)=><Item key={message} message={message}/>)}
        </ul>
    );
}
```

#### 函数

通常情况下，插入 JSX 中的