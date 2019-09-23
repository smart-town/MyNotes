# Fragments节点

React 中一个常见的模式是为一个组件返回多个元素，Fragments 可以让你聚合一个子元素列表并且不必在 DOM 中增加额外地节点。

```js
render(){
    return(
    <>
    <childA/>
    <childB/>
    </>);
}
```

或 

```jsx
render(){
    return(
        <React.Fragment key="">
            <td>Hello</td>
            <td>WOrldk</td>
        </React.Fragment>
    );
}
```