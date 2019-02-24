# Context

Context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性。

在一个典型的 React 应用中，数据是通过 props 属性由上到下进行传递的，但是这对于某些类型的属性是极其繁琐的，如 UI 主题。这是应用程序中许多组件都需要的。Context 提供了一种在组件之间共享此类值的方式。而不必通过组件树的每个层级显式传递`props`

## 何时使用

Context 设计的目的是为了共享那些被认为一个组件树而言是全局的数据，例如当前认证的用户、主题、首选语言。

使用 Context 可以避免通过中间元素传递`props`

## 使用

### `React.createContext`.

`const {Provider, Consumer} = React.createContext(defaultValue)`

创建一对`{Provider,Consumer}`当 React 渲染 context 组件 Consumer 时，它将从组件树最上层中最接近的匹配的`Provider`读取当前的`context`值。

如果上层的组件树没有一个匹配的`Provider`，而此时你需要渲染一个 Consuemr 组件，那么可以用到`defaultValue`，这有助于不封装它们的情况下对组件进行测试

### `Provider`

`Provider value={/*somevalue*/}`

React 组件允许 Consumer 订阅 context 的改变。接收一个`value`属性传递给`Provider`的后代Consumer，一个`Provider`可以联系到多个`Consumer`。

### `Consumer`

`<Consumer>{value => /*render something based on the context value*/}</Consumer>`

一个可以订阅 context 变化的 React 组件

接收一个**函数作为子节点**，函数接收当前 context 值并返回一个 react 节点。传递给函数的 value 将等于组件树中上层 context 的最近的 Provider 的 value 属性。如果 context 没有 Provider，那么 value 属性将会等于被传递给 createContext() 的 defaultValue

每当 Provider 的值发生改变时，作为 Provider 后代的所有 Consumer 都会重新渲染。

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