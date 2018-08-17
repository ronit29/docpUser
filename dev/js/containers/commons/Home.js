import React from 'react';
import { connect } from 'react-redux';

import { getUserProfile, fetchArticles, fetchHeatlhTip, loadOPDCommonCriteria, loadLabCommonCriterias } from '../../actions/index.js'

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
        // this.props.fetchArticles()
        this.props.loadOPDCommonCriteria()
        this.props.loadLabCommonCriterias()
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

    const {
        LOADED_SEARCH_CRITERIA_LAB,
        common_tests,
        selectedLocation
    } = state.SEARCH_CRITERIA_LABS
    let filterCriteria_lab = state.SEARCH_CRITERIA_LABS.filterCriteria

    const {
        LOADED_SEARCH_CRITERIA_OPD,
        specializations
    } = state.SEARCH_CRITERIA_OPD
    let filterCriteria_opd = state.SEARCH_CRITERIA_OPD.filterCriteria

    return {
        profiles, selectedProfile, newNotification, notifications, articles, healthTips, common_tests: common_tests || [], specializations: specializations || [], selectedLocation, filterCriteria_lab, filterCriteria_opd
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadLabCommonCriterias: () => dispatch(loadLabCommonCriterias()),
        loadOPDCommonCriteria: () => dispatch(loadOPDCommonCriteria()),
        getUserProfile: () => dispatch(getUserProfile()),
        fetchHeatlhTip: () => dispatch(fetchHeatlhTip()),
        fetchArticles: () => dispatch(fetchArticles())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
