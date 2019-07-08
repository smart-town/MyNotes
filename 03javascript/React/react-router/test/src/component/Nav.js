import React from 'react';
import {Link} from 'react-router';
export default class Nav extends React.Component {
    /* constructor(props){
        super(props);
    } */
    render(){
        let id = Math.round(Math.random()*100)
        return(
            <div>
                <ul>
                    <li><Link to="/html">HTML</Link></li>
                    <li><Link to="/css">CSS</Link></li>
                    <li><Link to="/javascript">JavaScript</Link></li>
                    <li><Link to={"/usertips/"+id}>AboutYou💗</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
    
}