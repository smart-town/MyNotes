import React from 'react';
import "./SetEntry.css"
export default class SetEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header: '',
            footer: '',
        }

        this.setValue = this.setValue.bind(this);
        this.emit = this.emit.bind(this);
    }
    setValue(event){
        // console.log(event.target.value);
        // console.log(event.target.id);
        this.setState({[event.target.id]:event.target.value})
    }
    emit(){
        console.log(this.state.footer)
    }
    render() {
        return (
            <div>
                <label className="my-label">header:</label><input id="header" value={this.state.header} onChange={this.setValue}/><br />
                <label className="my-label">footer:</label><input id="footer" value={this.state.footer} onChange={this.setValue}/><br />
                <button onClick={this.emit}>emit</button>
            </div>
        )
    }
}