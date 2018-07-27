import React from 'react';
import { connect } from 'react-redux';

import { getUserProfile, fetchArticles, fetchHeatlhTip } from '../../actions/index.js'

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
        // this.props.fetchHeatlhTip()
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
        profiles, selectedProfile, newNotification, notifications, articles, healthTips
    } = state.USER

    return {
        profiles, selectedProfile, newNotification, notifications, articles, healthTips
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: () => dispatch(getUserProfile()),
        fetchHeatlhTip: () => dispatch(fetchHeatlhTip()),
        fetchArticles: () => dispatch(fetchArticles())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
