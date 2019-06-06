import React from 'react';
import { connect } from 'react-redux';

import { mergeOPDState, resetFilters, getOPDCriteriaResults, toggleOPDCriteria, loadOPDCommonCriteria, cloneCommonSelectedCriterias } from '../../actions/index.js'
import SearchCriteriaView from '../../components/opd/searchCriteria/index.js'

class SearchCriteria extends React.Component {
    constructor(props) {
        super(props)
    }

    // static loadData(store) {
    //     return store.dispatch(loadOPDCommonCriteria())
    // }

    componentDidMount() {
        this.props.loadOPDCommonCriteria(this.props.selectedLocation)
        this.props.resetFilters()
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <SearchCriteriaView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {

    const {
        LOADED_SEARCH_CRITERIA_OPD,
        specializations,
        conditions,
        selectedCriterias,
        selectedLocation,
        filterCriteria,
        locationType,
        procedure_categories
    } = state.SEARCH_CRITERIA_OPD

    const {
        is_login_user_insured,
        insurance_status
    } = state.USER

    return {
        LOADED_SEARCH_CRITERIA_OPD,
        specializations,
        conditions,
        selectedCriterias,
        selectedLocation,
        filterCriteria,
        locationType,
        procedure_categories,
        is_login_user_insured,
        insurance_status
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadOPDCommonCriteria: (selectedLocation) => dispatch(loadOPDCommonCriteria(selectedLocation)),
        toggleOPDCriteria: (type, criteria) => dispatch(toggleOPDCriteria(type, criteria)),
        getOPDCriteriaResults: (searchString, callback) => dispatch(getOPDCriteriaResults(searchString, callback)),
        resetFilters: () => dispatch(resetFilters()),
        mergeOPDState: (state, fetchNewResults) => dispatch(mergeOPDState(state, fetchNewResults)),
        cloneCommonSelectedCriterias: (selectedCriterias) => dispatch(cloneCommonSelectedCriterias(selectedCriterias))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchCriteria);
