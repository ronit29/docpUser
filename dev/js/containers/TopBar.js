import React from 'react';
import { connect } from 'react-redux';

import TopBarView from '../components/topBar/index.js'

class TopBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentWillMount() {

    }

    render() {

        return (
            <TopBarView/>
        );
    }
}

const mapStateToProps = (state) => {

    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
