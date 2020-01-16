import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import CacheRoute,{CacheSwitch} from 'react-router-cache-route';
import Hoc from './Hoc/Hoc';
import InputMask from './InputMask/InputMask';

function Home() {
  return(<div>
    <ul>
      <li><Link to="/inputMask">Go to InputMask</Link></li>
      <li><Link to="/hoc">Go to HocTest</Link></li>
    </ul>
  </div>
  )
}
function App() {
  return (
    <Router>
      <CacheSwitch>
        <Route path="/hoc" component={Hoc}></Route>
        <CacheRoute path="/inputMask" component={InputMask}/>
        <Route path="/" component={Home}/>
      </CacheSwitch>
    </Router>
  );
}

export default App;
