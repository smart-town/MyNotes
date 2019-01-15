# 列表和 Keys

在 javascript 中转化列表，通常是使用`map()`函数让数组中的每一项翻倍，得到新的一个数列。如`numbers=[1,2,3,4].map((n)=>n*2);`

在 React 中将数组转换为数列**元素**是相似的。

## 渲染多个组件

可以通过使用`{}`在JSX中构建一个元素集合。

```js
const numbers = [1,2,3,4,5];
const listItems = numbers.map((number) => <li>{number}</li>) ;
```

将 `listItems` 插入到 `ul` 元素中：

```js
ReactDOM.render(<ul>{listItems}</ul>, document.getElementById("root"));
```

这将会生成 1 到 5 的数字列表。

## 基础列表组件

通常需要渲染一个列表到组件中。

```jsx
function NumberList(props){
    const numbers = props.numbers;
    const listItems = numbers.map((n) => <li>{n}</li>) ;
    return (<ul>{listItems}</ul>);
}
const numbers = [1,2,3,4,5];
ReactDOM.render(<NumberList numbers={numbers}/>, document.getElementById("root"));
```

运行该段代码时将出现警告`a key should be provided`，意思是当创建一个元素时，必须包括一个特殊的`key`属性。

## Keys

Keys 可以在 DOM 中的某些元素被增加或者删除的时候帮助 React 识别哪些元素已经发生了变化。因此需要适当地给数组中的每一个元素赋予一个确定的标识。

一个元素的 key 最好是这个元素在这个列表中独一无二的字符串。通常使用来自数据的 id 作为 key。

```jsx
const toItems = todos.map((todo) => <li key={todo.id}>{todo.text}</li>) ;
```

### 用 key 提取组件

元素的 key 只有在它和它的兄弟节点对比才有意义。比如说，如果你提取出一个 ListItem 组件，应将 key 保存在数组中的这个 `<ListItem/>`元素上，而不是放在`ListItem`中。

`key`会作为给 React 的提示，但是不会传递给你的组件。如果组件中需要使用和`key`相同的值，应将其作为属性传递。

```jsx
<Post key={post.id} id={post.id} title={post.title}/>
```

