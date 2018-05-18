import React from 'react';
import { connect } from 'react-redux';

import { loadLabCommonCriterias, toggleDiagnosisCriteria, getDiagnosisCriteriaResults } from '../../actions/index.js'
import SearchCriteriaView from '../../components/diagnosis/searchCriteria/index.js'

class SearchCriteria extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.loadLabCommonCriterias()
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        if (this.props.LOADED_SEARCH_CRITERIA_LAB) {
            return (
                <SearchCriteriaView {...this.props} />
            );
        } else {
            return ""
        }
    }
}

const mapStateToProps = (state) => {

    const {
        LOADED_SEARCH_CRITERIA_LAB,
        common_tests,
        common_conditions,
        preferred_labs,
        selectedCriterias,
        selectedLocation,
        filterCriteria
    } = state.SEARCH_CRITERIA_LABS

    return {
        LOADED_SEARCH_CRITERIA_LAB,
        common_tests,
        common_conditions,
        preferred_labs,
        selectedCriterias,
        selectedLocation,
        filterCriteria
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadLabCommonCriterias: () => dispatch(loadLabCommonCriterias()),
        toggleDiagnosisCriteria: (type, criteria) => dispatch(toggleDiagnosisCriteria(type, criteria)),
        getDiagnosisCriteriaResults: (searchString, callback) => dispatch(getDiagnosisCriteriaResults(searchString, callback))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchCriteria);
