import React from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import ArrowBack from 'material-ui-icons/ArrowBack';
import { withStyles } from 'material-ui/styles';


import { } from '../../actions/index.js'

class TopBar extends React.Component {

    constructor(props) {
        super(props)
    }

    goBack(){
        window.history.go(-1)
    }

    render() {

        return (
            <AppBar position="static" color="default">
                <Toolbar>
                    <ArrowBack onClick={this.goBack.bind(this)}/>
                </Toolbar>
            </AppBar>
        );
    }
}


export default withStyles()(TopBar)
