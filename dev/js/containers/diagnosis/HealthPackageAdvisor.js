import React from 'react';
import { connect } from 'react-redux';

import {getUserProfile,toggleDiagnosisCriteria,mergeLABState} from '../../actions/index.js'
import HealthPackageAdvisorView from '../../components/diagnosis/healthPackageAdvisor/HealthPackageAdvisorView.js'
import STORAGE from '../../helpers/storage'

class HealthPackageAdvisor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        if (STORAGE.checkAuth()) {
            this.props.getUserProfile()
        }
    }
    render() {
        return (
            <HealthPackageAdvisorView {...this.props} />
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
        profiles, selectedProfile, newNotification, notifications, articles, healthTips, device_info, offerList
    } = state.USER

    const {
        LOADED_SEARCH_CRITERIA_LAB,
        common_tests,
        common_package,
        selectedLocation,
        recommended_package
    } = state.SEARCH_CRITERIA_LABS
    let filterCriteria_lab = state.SEARCH_CRITERIA_LABS.filterCriteria
    let filterCriteriaPackages = state.SEARCH_CRITERIA_LABS.filterCriteriaPackages

    const {
        LOADED_SEARCH_CRITERIA_OPD,
        specializations
    } = state.SEARCH_CRITERIA_OPD
    let filterCriteria_opd = state.SEARCH_CRITERIA_OPD.filterCriteria

    return {
        profiles, selectedProfile, newNotification, notifications, articles, healthTips, common_tests: common_tests || [], specializations: specializations || [], selectedLocation, filterCriteria_lab, filterCriteria_opd, device_info, common_package: common_package || [], initialServerData, offerList, recommended_package:recommended_package || [], filterCriteriaPackages
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: () => dispatch(getUserProfile()),
        toggleDiagnosisCriteria: (type, test, forceAdd) => dispatch(toggleDiagnosisCriteria(type, test, forceAdd)),
        mergeLABState: (state, fetchNewResults) => dispatch(mergeLABState(state, fetchNewResults)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HealthPackageAdvisor);