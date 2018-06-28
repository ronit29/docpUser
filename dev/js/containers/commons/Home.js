import React from 'react';
import { connect } from 'react-redux';

import { getUserProfile } from '../../actions/index.js'

import HomeView from '../../components/commons/Home'
import STORAGE from '../../helpers/storage'

class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        if (STORAGE.checkAuth()) {
            this.props.getUserProfile()
        }
    }

    render() {

        return (
            <HomeView {...this.props}/>
        );
    }
}

const mapStateToProps = (state) => {
    let {
        profiles, selectedProfile, newNotification, notifications
    } = state.USER

    return {
        profiles, selectedProfile, newNotification, notifications
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile : () => dispatch(getUserProfile())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
