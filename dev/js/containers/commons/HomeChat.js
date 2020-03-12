import React from 'react';
import { connect } from 'react-redux';

import { clearAllTests, toggleOPDCriteria, toggleDiagnosisCriteria, resetFilters, getUserProfile, fetchArticles, fetchHeatlhTip, loadOPDCommonCriteria, loadLabCommonCriterias, clearExtraTests, getSpecialityFooterData, selectSearchType, getOfferList, setPackageId, getUpComingAppointment, resetPkgCompare, toggleIPDCriteria, loadOPDInsurance, clearVipSelectedPlan } from '../../actions/index.js'

import STORAGE from '../../helpers/storage'
import HomeChatView from '../../components/commons/Home/HomeChatView.js';

class HomeChat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mergeState: false
        }
    }

    static loadData(store, match) {
        return new Promise((resolve, reject) => {
            Promise.all([store.dispatch(loadOPDCommonCriteria()), store.dispatch(loadLabCommonCriterias())]).then(() => {
                resolve({ })
            }).catch((e) => {
                reject()
            })
        })
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        if (STORAGE.checkAuth()) {
            this.props.getUserProfile()
            this.props.getUpComingAppointment()
        }

        // this.props.fetchHeatlhTip()
        // this.props.fetchArticles()
        if (!this.props.common_tests.length || !this.props.common_package.length || !this.props.specializations.length || (this.props.selectedLocation && this.props.selectedLocation.locality)) {

            this.props.loadLabCommonCriterias()
            // this.props.loadOPDInsurance(this.props.selectedLocation)
        }
        this.props.loadOPDCommonCriteria(this.props.selectedLocation)

        this.props.resetFilters()
        this.props.clearExtraTests()
        setTimeout(() => {
            this.setState({ mergeState: true })
        }, 100)
    }

    render() {
        return (
            <HomeChatView {...this.props} {...this.state} />
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
        profiles, selectedProfile, newNotification, notifications, articles, healthTips, device_info, offerList, upcoming_appointments, is_ipd_form_submitted
    } = state.USER

    const {
        LOADED_SEARCH_CRITERIA_LAB,
        common_tests,
        common_package,
        selectedLocation,
        compare_packages
    } = state.SEARCH_CRITERIA_LABS
    let filterCriteria_lab = state.SEARCH_CRITERIA_LABS.filterCriteria

    const {
        LOADED_SEARCH_CRITERIA_OPD,
        specializations,
        ipd_procedures,
        top_hospitals,
        common_settings
    } = state.SEARCH_CRITERIA_OPD

    let filterCriteria_opd = state.SEARCH_CRITERIA_OPD.filterCriteria

    let {
        static_footer_data
    } = state.DOCTOR_SEARCH

    return {
        profiles, selectedProfile, newNotification, notifications, articles, healthTips, common_tests: common_tests || [], specializations: specializations || [], selectedLocation, filterCriteria_lab, filterCriteria_opd, device_info, common_package: common_package || [], initialServerData, offerList, upcoming_appointments, compare_packages, ipd_procedures, top_hospitals, common_settings, is_ipd_form_submitted, static_footer_data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadLabCommonCriterias: () => dispatch(loadLabCommonCriterias()),
        loadOPDCommonCriteria: (city) => dispatch(loadOPDCommonCriteria(city)),
        toggleOPDCriteria: (type, criteria, forceAdd, filters) => dispatch(toggleOPDCriteria(type, criteria, forceAdd, filters)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd, filters) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd, filters)),
        getUserProfile: () => dispatch(getUserProfile()),
        fetchHeatlhTip: () => dispatch(fetchHeatlhTip()),
        fetchArticles: () => dispatch(fetchArticles()),
        resetFilters: () => dispatch(resetFilters()),
        clearExtraTests: () => dispatch(clearExtraTests()),
        getSpecialityFooterData: (cb) => dispatch(getSpecialityFooterData(cb)),
        selectSearchType: (type) => dispatch(selectSearchType(type)),
        getOfferList: (lat, long) => dispatch(getOfferList(lat, long)),
        clearAllTests: () => dispatch(clearAllTests()),
        setPackageId: (package_id, isHomePage) => dispatch(setPackageId(package_id, isHomePage)),
        getUpComingAppointment: () => dispatch(getUpComingAppointment()),
        resetPkgCompare: () => dispatch(resetPkgCompare()),
        toggleIPDCriteria: (criteria, forceAdd) => dispatch(toggleIPDCriteria(criteria, forceAdd)),
        loadOPDInsurance: (city) => dispatch(loadOPDInsurance(city)),
        clearVipSelectedPlan:() => dispatch(clearVipSelectedPlan())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeChat);
