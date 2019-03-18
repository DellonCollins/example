import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import logo from './logo.svg';
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import Plot from './Plot/components/plot'
import './App.css';
import './animation.css';

class App extends Component {
  render() {
    return (
        <Fragment>
          <NavBar></NavBar>
          <BrowserRouter>
            <Switch>
                <Route exact path="/"><Redirect to="/home"/></Route>
                <Route path='/home' component={Home}/>
                <Route path='/plot' component={Plot}/>
            </Switch>
          </BrowserRouter>
        </Fragment>
    );
  }
}

export default App;
