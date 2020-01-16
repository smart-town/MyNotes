import React from 'react';
import {Link} from 'react-router-dom'
export default class Hoc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 0};
    }
    doAdd = () => {
        this.setState({count: ++this.state.count})
    }
    render() {
        return (<div>
            <Link to="/">Back</Link><br/>
            Hoc:{this.state.count}<button onClick={this.doAdd}>ADD</button>
        </div>);
    }
}