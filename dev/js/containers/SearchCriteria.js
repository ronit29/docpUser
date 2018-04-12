import React from 'react';
import { connect } from 'react-redux';

import { toggleCondition, toggleSpeciality, toggleCriteria } from '../actions/index.js'
import SearchCriteriaView from '../components/searchCriteria/index.js'

class SearchCriteria extends React.Component {
    constructor(props) {
        super(props)
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
        commonlySearchedConditions,
        selectedConditions,
        commonlySearchedSpecialities,
        selectedSpecialities,
        selectedLocation,
        selectedCriteria
    } = state.SEARCH_CRITERIA

    return {
        commonlySearchedConditions,
        selectedConditions,
        commonlySearchedSpecialities,
        selectedSpecialities,
        selectedLocation,
        selectedCriteria
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleCondition: (id) => dispatch(toggleCondition(id)),
        toggleSpeciality: (id) => dispatch(toggleSpeciality(id)),
        toggleCriteria : (criteria) => dispatch(toggleCriteria(criteria))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchCriteria);
