import React from 'react'
import { Route, HashRouter, Switch} from 'react-router-dom';

import Gallery from './Gallery'
import Plot from '../Plot/components/plot'
import MyChart from '../Chart/MyChart';


class GalleryRouter extends React.Component{
    render(){
        return (
            <React.Fragment>
              <HashRouter basename='/gallery'>
                <Switch>
                    <Route path='/plot' component={Plot}></Route>
                    <Route path='/chart' component={MyChart}></Route>
                    <Route path='' component={Gallery}></Route>
                </Switch>
              </HashRouter>
            </React.Fragment>
        );
    }
}

export default GalleryRouter