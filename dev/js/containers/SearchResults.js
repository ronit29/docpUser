import React from 'react';
import { connect } from 'react-redux';

import { getDoctors, selectDoctor } from '../actions/index.js'

import SearchResultsView from '../components/searchResults/index.js'

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
        getDoctors: (searchState,filterState) => dispatch(getDoctors(searchState,filterState)),
        selectDoctor : (doctorId) => dispatch(selectDoctor(doctorId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
