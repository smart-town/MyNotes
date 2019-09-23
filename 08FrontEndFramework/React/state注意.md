# State

`setState()`方法应当尽量避免在`componentDidUpdate()`、`componentDidMount()`这些方法中出现，其会导致额外渲染，一定要使用时注意**必须包裹在一个条件语句中**，否则会导致死循环。
