import React from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';
import './App.css';
import Nav from './component/Nav';
import Welcome from './component/Welcome';
import UserTips from './component/UserTips';
let Html = ()=>{
  return(
    <div>HTML Content 📜</div>
  )
}
let Css = ()=>{
  return(
    <div>CSS Content 💥</div>
  )
}
let Js = ()=>{
  return(
    <div>JavaScript Content 👣</div>
  )
}
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Nav}>
          <IndexRoute component={Welcome}/>
          <Route path="/html" component={Html}/>
          <Route path="/css" component={Css}/>
          <Route path="/javascript" component={Js}/>
          <Route path="/usertips(/:id)" component={UserTips}/>
        </Route>
      </Router>
      // <Nav/>
    )
  }
}
