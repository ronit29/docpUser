import React from 'react';
import { connect } from 'react-redux';

import { setOPDFilters } from '../../actions/index.js'

import SearchResultsFilterView from '../../components/opd/searchResultsFilter/index.js'

class SearchResultsFilter extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <SearchResultsFilterView {...this.props}/>
        );
    }
}

const mapStateToProps = (state) => {

    const {
        filterCriteria
    } = state.SEARCH_CRITERIA_OPD

    return {
        filterCriteria
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setOPDFilters : (filterData) => dispatch(setOPDFilters(filterData))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsFilter);
