import React from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux'
import Header from './components/Header'
import store from './unionState/store'
import { Footer } from './components/Footer/Footer';
import SetEntry from './components/SetEntry/SetEntry';
import { setHeader, setTitle} from './unionState/actions'
// export const ThemeContext = React.createContext({ theme: "dark" });
let App = (props) => {
    console.log(`[index] ${JSON.stringify(props)}`)
    return (
        <div>
            {props.header ? props.header : 'defaultName'}<br />
            <Header title={props.header}></Header>
            <SetEntry {...props}/>
            <Footer title={props.footer}/>
        </div>
    )
}

const mapStateToProps = state => {
    let header = state.header;
    let footer = state.footer;
    if (state.header === "cherry") { header = '🍒' }
    return {
        header: header,
        footer: footer,
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        setHeader: title=>{
            dispatch(setHeader(title));
        },
        setTitle: title=>{
            dispatch(setTitle(title))
        }
    }
}

const MYAPP = connect(mapStateToProps, mapDispatchToProps)(App);
render(
    <Provider store={store}>
        <MYAPP />
    </Provider>,
    document.getElementById("root")
);