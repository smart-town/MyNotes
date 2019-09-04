import React from 'react';
// import navigator from 'cordova-plugin-dialogs';
export default class Header extends React.Component {
    constructor(props){
        super(props);
        this.test = this.test.bind(this);
    }
    test() {
        alert("test")   
    }
    render(){

        return(<div>
            <h1>Header</h1>
            <h2>🍒</h2>
            <button onClick={this.test}>ok</button>
        </div>)
    }
    
} 