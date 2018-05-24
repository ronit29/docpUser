import React from 'react';
import { connect } from 'react-redux';

import { } from '../../actions/index.js'

import HomeView from '../../components/commons/Home'


class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <HomeView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    let {

    } = state.AUTH

    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
