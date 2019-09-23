# Context

Context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性。

在一个典型的 React 应用中，数据是通过 props 属性由上到下进行传递的，但是这对于某些类型的属性是极其繁琐的，如 UI 主题。这是应用程序中许多组件都需要的。Context 提供了一种在组件之间共享此类值的方式。而不必通过组件树的每个层级显式传递`props`

## 何时使用

Context 设计的目的是为了共享那些被认为一个组件树而言是全局的数据，例如当前认证的用户、主题、首选语言。

使用 Context 可以避免通过中间元素传递`props`

## 使用

### 使用 context 之前的考虑

Context 主要的应用场景在于很多不同层级的组件需要访问同样一些数据，请**谨慎使用**，因为这会使得组件的**复用性变差**。

**如果只是想避免层层传递一些属性，组件组合有时候是一个比 context 更好的方案**

### `React.createContext`.

`const MyContext  = React.createContext(defaultValue)`

创建一个 Context 对象，当 React 渲染一个订阅了这个 Context 对象的组件时，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值。

**只有**当组件所处的树中**没有**匹配到 `Provider`时，其`defaultValue`才会生效。这有助于在不使用 `Provider`包装组件的情况下对组件进行测试。

### `Provider`

`Provider value={/*somevalue*/}`

每个`Context`都会返回一个`Provider`组件，它允许消费组件订阅`context`的变化。`Provider`接收一个`value`属性，传递给消费组件。一个`Provider`可以和多个消费组件有对应关系，多个`Provider`也可以嵌套使用，里层的会覆盖外层的数据。

### Class.contextType

挂载在 class 上的`contextType`属性需要被赋值为一个由`React.createContext()`创建的 Context 对象。这能让你用`this.context`消费最近的 Context 上的那个值。你可以在任意生命周期中访问，包括`render`

**注意**通过该 API 只能订阅单一 context

### Context.Consumer
```jsx
<MyContext.Consumer>
    {value => /*基于 context 渲染*/}
</MyContext.Consumer>
```
这让你能够在**函数式组件**中完成订阅 context。

这需要**函数作为子元素**这种做法。这个函数接收当前的 context 值，返回一个节点。传递给函数的 `value`值等同于往上组件树离这个 context 最近的 Provider 提供的 value 值。

## 例子

### 动态 Context

```js
//theme-context.js
export const themes = {
    light: {
        foreground: "#ffffff",
        background: "#222222",
    },
    dark: {
        foreground: "#000000",
        background: "#eeeeee",
    }
};

export const ThemeContext = React.createContext(themes.dark) ;

```

```js
//themed-button.js
import {ThemeContext} from "./theme-context";

function ThemedButton(props){
    return(
        <ThemeContext.Consumer>
            {theme => (
                <button {...props} style={{backgroundColor: theme.background}}/>
            )}
        </ThemeContext.Consumer>
    );
}

```

```js
//app.js
function Toolbar(props){
    return(
        <ThemedButton onClick={props.changeTheme}>Change</ThemedButton>
    );
}

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {theme: themes.light,};

        this.toggleTheme = ()=>{
            this.setState(state => ({
                theme: state.theme === themes.dark ? themes.light : theme.dark,
            }));
        }
    }

    render(){
        return(
            <Page>
                <ThemeContext.Provider value={this.state.theme}>
                    <ToolBar changeTheme={this.toggleTheme}/>
                </ThemeContext.Provider>

                <Section>
                    <ThemedButton/>
                </Section>
            </Page>
        );
    }
     
}
```