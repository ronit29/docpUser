import React from 'react';
import { connect } from 'react-redux';

import { getUserProfile, fetchArticles } from '../../actions/index.js'

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
        this.props.fetchArticles()
    }

    render() {

        return (
            <HomeView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    let {
        profiles, selectedProfile, newNotification, notifications, articles
    } = state.USER

    return {
        profiles, selectedProfile, newNotification, notifications, articles
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: () => dispatch(getUserProfile()),
        fetchArticles: () => dispatch(fetchArticles())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
