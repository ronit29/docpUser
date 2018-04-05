import React from 'react';
import { connect } from 'react-redux';

import Home_View from '../components/home_view.js'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentWillMount() {

    }

    render() {

        return (
            <Home_View/>
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


export default connect(mapStateToProps, mapDispatchToProps)(Home);
