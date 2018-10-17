import React from 'react';
import { connect } from 'react-redux';

import { toggleOPDCriteria, toggleDiagnosisCriteria, resetFilters, getUserProfile, fetchArticles, fetchHeatlhTip, loadOPDCommonCriteria, loadLabCommonCriterias } from '../../actions/index.js'

import HomeView from '../../components/commons/Home'
import STORAGE from '../../helpers/storage'

class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    static loadData(store, match) {
        return Promise.all([store.dispatch(loadOPDCommonCriteria()), store.dispatch(loadLabCommonCriterias())])
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
        this.props.resetFilters()
    }

    render() {

        return (
            <HomeView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    let {
        profiles, selectedProfile, newNotification, notifications, articles, healthTips, device_info
    } = state.USER

    const {
        LOADED_SEARCH_CRITERIA_LAB,
        common_tests,
        common_package,
        selectedLocation
    } = state.SEARCH_CRITERIA_LABS
    let filterCriteria_lab = state.SEARCH_CRITERIA_LABS.filterCriteria

    const {
        LOADED_SEARCH_CRITERIA_OPD,
        specializations
    } = state.SEARCH_CRITERIA_OPD
    let filterCriteria_opd = state.SEARCH_CRITERIA_OPD.filterCriteria

    return {
        profiles, selectedProfile, newNotification, notifications, articles, healthTips, common_tests: common_tests || [], specializations: specializations || [], selectedLocation, filterCriteria_lab, filterCriteria_opd, device_info, common_package: common_package || []
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadLabCommonCriterias: () => dispatch(loadLabCommonCriterias()),
        loadOPDCommonCriteria: () => dispatch(loadOPDCommonCriteria()),
        toggleOPDCriteria: (type, criteria, forceAdd) => dispatch(toggleOPDCriteria(type, criteria, forceAdd)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd)),
        getUserProfile: () => dispatch(getUserProfile()),
        fetchHeatlhTip: () => dispatch(fetchHeatlhTip()),
        fetchArticles: () => dispatch(fetchArticles()),
        resetFilters: () => dispatch(resetFilters()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
