import React, { Component, Fragment } from 'react';
import { Route, HashRouter, Redirect, Switch } from 'react-router-dom';

import NavBar from './Components/NavBar'

import Home from './Components/Home'
import GalleryRouter from './Components/GalleryRouter'
import Contact from './Components/Contact'
import Canvas from './Processing/p5Wrapper'

import './App.css';
import './animation.css';

class App extends Component {
  
  componentDidMount(){
    console.log(process.env.PUBLIC_URL)
  }
  render() {
    return (
        <div>
          <HashRouter>
            <Canvas></Canvas>
            <div className='content'>
              <NavBar path={window.location.hash}></NavBar>
              <Switch>
                <Route exact path="/#/"><Redirect to="/home"/></Route>
                <Route path='/home' component={Home}></Route>
                <Route path='/gallery' component={GalleryRouter}></Route>
                <Route path='/contact' component={Contact}></Route>
              </Switch>
            </div>
          </HashRouter>
        </div>
    );
  }
}

export default App;
