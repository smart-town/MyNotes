import React from 'react';
import "./Header.css";
export default function Header(props){
    let title = props.title ? props.title : 'default header';
    return(
        <div className="my-header">{title}</div>
    )
}