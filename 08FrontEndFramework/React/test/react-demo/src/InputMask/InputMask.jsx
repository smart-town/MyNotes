import React from 'react';
import {Link} from 'react-router-dom'
export default class InputMask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        }
    }
    addClick = () => {
        this.setState({count: ++this.state.count})
    }
    render() {
        return (<div>
            <Link to="/">Back</Link><br/>
            COUNT:{this.state.count} <button onClick={this.addClick}>add</button>
        </div>)
    }
}