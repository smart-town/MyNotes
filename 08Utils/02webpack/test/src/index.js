import React from 'react';
import ReactDOM from 'react-dom';
import Header from './component/header/Header'

let rootEle = document.getElementById("rootEle") ;
if(!rootEle){
    rootEle = document.createElement("div");
    rootEle.id = "rootEle";
    document.body.append(rootEle);
}

class One extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return <div>👀</div>
    }
}

ReactDOM.render(<Header/>,rootEle);