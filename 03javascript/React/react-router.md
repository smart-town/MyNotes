# React Router 

- `Static Routing`
    *如 Rails、Express、Angular等都是静态路由，其都需要将路由声明为初始化时的一部分配置，在重新渲染时使用*
- `Dynamic Routing`
    路由取代了应用渲染，而不是在运行之外的配置中。意味着所有的东西都是 React Router 中的一个组件

## 基本使用

### 代替`<a href="/">`

```jsx
<Link to="/">Home</Link>
<Link to="/about/">About</Link>
<Route path="/" component={Index}/>
<Route path="/about/" component={About}/>
```

### Nested

## 基本组件

React Router 中有三种类型的组件：`router components`，`route matching components`,`navigation components`，这些组件都应该从`react-router-dom`中引入

### Routers

每个 React Router 应用程序的核心，即路由器组件。对于 web 项目而言，`react-router-dom`提供`<BrowserRouter>`和`<HashRouter>`。这两个都用来创建历史对象，一般来说，如果你有一个用于响应请求的服务器，则应该使用`<BrowserRouter>`，如果使用静态文件服务器，则应该使用`<HashRouter>`

### Route Matching

有两个路由匹配组件：`<Route>`和`<Switch>`

路由匹配通过比较`<Route>`的`path`属性和当前的`location`的`pathname`来确定要渲染的组件。当不匹配时渲染`null`，当一个`<Route>`没有`path`属性时将会总是展示。

你可以在任意一个地方使用`<Route>`来渲染你想要基于路径而渲染的内容。`<Switch>`则是用来将`<Route>`进行分组的。

`<Switch>`并不是必要的，但它非常有用。 `<Switch>`将迭代其所有子`<Route>`元素，并仅渲染与当前位置匹配的第一个子元素。 当多个路径的路径匹配相同的路径名，动画路由之间的转换，以及识别何时没有路径与当前位置匹配时（这样您可以渲染“404”组件），`<Switch>`将十分有用😊

