import React from 'react';
import { connect } from 'react-redux';

import { mergeOPDState, resetFilters, getOPDCriteriaResults, toggleOPDCriteria, loadOPDCommonCriteria, cloneCommonSelectedCriterias,loadOPDInsurance } from '../../actions/index.js'
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
        // this.props.loadOPDInsurance(this.props.selectedLocation)
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
        procedure_categories,
        common_settings
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
        insurance_status,
        common_settings
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadOPDCommonCriteria: (selectedLocation) => dispatch(loadOPDCommonCriteria(selectedLocation)),
        toggleOPDCriteria: (type, criteria) => dispatch(toggleOPDCriteria(type, criteria)),
        getOPDCriteriaResults: (searchString, callback) => dispatch(getOPDCriteriaResults(searchString, callback)),
        resetFilters: () => dispatch(resetFilters()),
        mergeOPDState: (state, fetchNewResults) => dispatch(mergeOPDState(state, fetchNewResults)),
        cloneCommonSelectedCriterias: (selectedCriterias) => dispatch(cloneCommonSelectedCriterias(selectedCriterias)),
        loadOPDInsurance: (city) => dispatch(loadOPDInsurance(city))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchCriteria);
