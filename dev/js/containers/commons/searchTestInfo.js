import React from 'react';
import { connect } from 'react-redux';

import { searchTestData, selectedCriterias, searchTestInfoData, toggleDiagnosisCriteria, setLabSearchId, clearExtraTests, mergeLABState, clearAllTests, selectLabTimeSLot, selectLabAppointmentType, setPackageId, postComment } from '../../actions/index.js'

import SearchTestView from '../../components/commons/search/searchTestInfo.js'

class searchTestInfo extends React.Component {

    constructor(props) {
        super(props)
    }

    static loadData(store, match, query) {
        let seo_url = ""
        let searchById = match.url.includes("search/testinfo")

        if (!searchById) {
            seo_url = match.url.split("/")[1]
        }

        return new Promise((resolve, reject) => {
            store.dispatch(searchTestData(query.test_ids || '', seo_url, query.lab_id || '', {}, false, (data) => { // get selected test/package details
                resolve({})
            }))
        })
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    render() {
        return (
            <SearchTestView {...this.props} hideHeaderOnMobile={true} />
        )
    }
}

const mapStateToProps = (state) => {
    let { selectedCriterias, searchTestInfoData, search_id_data, selectedLocation, locationType, currentSearchedCriterias, filterCriteria } = state.SEARCH_CRITERIA_LABS
    return {
        selectedCriterias, searchTestInfoData, search_id_data, selectedLocation, locationType, currentSearchedCriterias, filterCriteria
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        searchTestData: (test_ids, test_url, lab_id, state, no_labs, callback) => dispatch(searchTestData(test_ids, test_url, lab_id, state, no_labs, callback)),
        clearExtraTests: () => dispatch(clearExtraTests()),
        toggleDiagnosisCriteria: (type, criteria, forceAdd) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd)),
        setLabSearchId: (searchId, filters, setDefault) => dispatch(setLabSearchId(searchId, filters, setDefault)),
        mergeLABState: (state, fetchNewResults) => dispatch(mergeLABState(state, fetchNewResults)),
        clearAllTests: () => dispatch(clearAllTests()),
        selectLabTimeSLot: (slot, reschedule) => dispatch(selectLabTimeSLot(slot, reschedule)),
        selectLabAppointmentType: (type) => dispatch(selectLabAppointmentType(type)),
        setPackageId: (package_id, isHomePage) => dispatch(setPackageId(package_id, isHomePage)),
        postComment: (comment, cb) => dispatch(postComment(comment, cb))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(searchTestInfo);
