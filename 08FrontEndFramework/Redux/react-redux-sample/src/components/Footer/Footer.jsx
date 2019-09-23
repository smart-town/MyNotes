import React from 'react';
import "./Footer.css";
export function Footer(props){
    let style={color: "lightblue", background: "white"};
    if(props.theme === "dark") {
        style={color: "white", background: "lightblue"};
    }
    return <div style={style} className="my-footer">
        {props.title ? props.title : "default footer"}
    </div>
}