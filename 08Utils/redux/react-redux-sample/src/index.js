import React from 'react';
import {render} from 'react-dom';
let App = (props)=>{
    return (<div>
        {props.name ? props.name : 'defaultName'}
    </div>)
}

render(<App name="cherry"/>,document.getElementById("root"));