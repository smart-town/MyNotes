# 搭配 React

React 和 Redux 之间并没有关系。Redux 支持 React、Angular、Ember、jQuery 甚至纯 JavaScript

尽管如此，Redux 还是和 React 和 Deku 这类库搭配起来用最好，因为这类库允许你以 state 函数的形式来描述界面，Redux 通过 action 的形式来发起 state 的变化。

## 安装

`npm install --save react-redux`。Redux 默认不包含 React 绑定库

## 容器组件和展示组件

Redux 和 React 绑定库是基于 [容器组件和展示组件相分离](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) 的开发思想。不同点：
- | 展示组件 | 容器组件
---- | ----- | -----
作用 | 描述如何展现（骨架，样式） | 描述如何运行（数据获取，状态更新）
直接使用 Redux | 否 | 是
数据来源 | props | 监听 Redux state
数据修改 | 从 props 调用回调函数 | 向 Redux 派发 actions
调用方式 | 手动 | 通常由 React Redux 生成

大部分的组件应该都是展示型的，但是一般需要少数几个容器组件将它们和 Redux store 连接起来。这和下面的设计简介并不意味着容器组件必须位于组件树的最高层，如果一个容器组件变得太复杂，那么在组件树中引入另一个容器。

技术上讲可以直接使用`store.subscribe()`来编写容器组件，但是不建议这样做的原因是无法使用 React Redux 带来的性能优化，因此不要手写容器组件，而使用 React Redux 的 connect() 方法来生成。

## 设计组件层次结构

概要设计很简单，我们想要显示一个 todo 项列表，一个 todo 项被点击后会增加一条删除线并标记 completed,我们会显示用户新增一个 todo 字段，在 footer 中显示一个选择条件。

### 展示组件
- TodoList
- Todo
- Link
- Footer
- App

这些组件只定义外观并不关心数据来源和如何改变，传入什么就渲染什么。如果你将代码从 Redux 迁移到别的架构，这些组件可以不做任何改动直接使用。它们并不依赖于 Redux。

### 容器组件

还需要一些容器组件来把展示组件连接到 Redux。例如，展示型的 TodoList 组件需要一个类似`VisualTodoList`的容器来监听 Redux store 变化并处理如何过滤出要显示的数据，为了实现状态过滤，需要实现`FilterLink`容器渲染组件来渲染 Link 并在点击时触发相应的 action。

- VisibleTodoList: 根据当前显示的状态来对 todo 列表进行过滤，并渲染 TodoList
- FilterLink: 得到当前过滤器并渲染 Link。

### 其他组件

有时候很难分清楚到底该使用容器组件还是展示组件，如有时候表单和函数严重耦合在一起。如：`AddTodo`组件，含有`Add`按钮的输入框。技术上讲可以将它分成两个组件，但是一开始这么做有点早。在一些非常小的组件中混用容器和展示是可以的。当业务变复杂之后，如何拆分就会很明显。

## 实现组件

### 实现容器组件

技术上讲，容器组件就是使用`store.subscribe()`从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。你可以手工开发容器组件，但是建议使用 React Redux 中的`connect()`方法来生成，这个方法做了性能优化来避免很多不必要的重复渲染。

使用`connect()`之前，需要先定义`mapStateToProps()`这个函数来指定如何将当前 Redux store state 映射到展示组件中的 props 上。