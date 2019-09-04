import React from 'react';
export default class UserTips extends React.Component {
    // constructor(props){
    //     super(props);
    // }
    render(){
        return(
            <div>
                Hello!{this.props.params.id}
            </div>
        )
    }
}