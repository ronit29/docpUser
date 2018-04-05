import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable';

const Home = Loadable({
    loader : () => import('./containers/home.js'),
    loading : () => {
        return ''
    }
})

class RouterConfig extends Component {

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={ Home } />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }

}


export default RouterConfig

