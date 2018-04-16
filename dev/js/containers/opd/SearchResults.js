import React from 'react';
import { connect } from 'react-redux';

import { getDoctors } from '../../actions/index.js'

import SearchResultsView from '../../components/opd/searchResults/index.js'

class SearchResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        return (
            <SearchResultsView { ...this.props } />
        );
    }
}

const mapStateToProps = (state) => {
    let DOCTORS = state.DOCTORS
    let { doctorList, LOADING, ERROR } = state.DOCTOR_SEARCH
    return {
        DOCTORS, doctorList, LOADING, ERROR
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctors: (searchState,filterState) => dispatch(getDoctors(searchState,filterState))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
