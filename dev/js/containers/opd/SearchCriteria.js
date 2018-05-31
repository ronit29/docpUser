import React from 'react';
import { connect } from 'react-redux';

import { getOPDCriteriaResults, toggleOPDCriteria, loadOPDCommonCriteria } from '../../actions/index.js'
import SearchCriteriaView from '../../components/opd/searchCriteria/index.js'

class SearchCriteria extends React.Component {
    constructor(props) {
        super(props)
    }

    // static loadData(store) {
    //     return store.dispatch(loadOPDCommonCriteria())
    // }

    componentDidMount() {
        this.props.loadOPDCommonCriteria()
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
        filterCriteria
    } = state.SEARCH_CRITERIA_OPD

    return {
        LOADED_SEARCH_CRITERIA_OPD,
        specializations,
        conditions,
        selectedCriterias,
        selectedLocation,
        filterCriteria
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadOPDCommonCriteria: () => dispatch(loadOPDCommonCriteria()),
        toggleOPDCriteria: (type, criteria) => dispatch(toggleOPDCriteria(type, criteria)),
        getOPDCriteriaResults: (searchString, callback) => dispatch(getOPDCriteriaResults(searchString, callback))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchCriteria);
