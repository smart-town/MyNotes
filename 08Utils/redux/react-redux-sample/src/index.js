import React from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux'
import Header from './components/Header'
import store from './unionState/store'
import { Footer } from './components/Footer/Footer';
import SetEntry from './components/SetEntry/SetEntry';
// export const ThemeContext = React.createContext({ theme: "dark" });
let App = (props) => {
    console.log(`[index] ${JSON.stringify(props)}`)
    return (
        <div>
            {props.name ? props.name : 'defaultName'}<br />
            <Header title={props.header}></Header>
            <SetEntry/>
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

const MYAPP = connect(mapStateToProps)(App);
render(
    <Provider store={store}>
        <MYAPP />
    </Provider>,
    document.getElementById("root")
);