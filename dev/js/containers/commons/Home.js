import React from 'react';
import { connect } from 'react-redux';

import { toggleOPDCriteria, toggleDiagnosisCriteria, resetFilters, getUserProfile, fetchArticles, fetchHeatlhTip, loadOPDCommonCriteria, loadLabCommonCriterias, clearExtraTests, getSpecialityFooterData, selectSearchType } from '../../actions/index.js'

import HomeView from '../../components/commons/Home'
import STORAGE from '../../helpers/storage'

class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    static loadData(store, match) {
        return new Promise((resolve, reject) => {
            getSpecialityFooterData((footerData) => {
                Promise.all([store.dispatch(loadOPDCommonCriteria()), store.dispatch(loadLabCommonCriterias())]).then(() => {
                    resolve({ footerData: (footerData || null) })
                }).catch((e) => {
                    reject()
                })
            })()
        })
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
        this.props.clearExtraTests()
    }

    render() {
        return (
            <HomeView {...this.props} />
        );
    }
}

const mapStateToProps = (state, passedProps) => {
    /**
     * initialServerData is server rendered async data required build html on server. 
     */
    let initialServerData = null
    let { staticContext } = passedProps
    if (staticContext && staticContext.data) {
        initialServerData = staticContext.data
    }

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
        profiles, selectedProfile, newNotification, notifications, articles, healthTips, common_tests: common_tests || [], specializations: specializations || [], selectedLocation, filterCriteria_lab, filterCriteria_opd, device_info, common_package: common_package || [], initialServerData
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
        clearExtraTests: () => dispatch(clearExtraTests()),
        getSpecialityFooterData: (cb) => dispatch(getSpecialityFooterData(cb)),
        selectSearchType: (type) => dispatch(selectSearchType(type))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
