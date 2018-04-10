import React from 'react';
import { connect } from 'react-redux';

import { toggleCondition, toggleSpeciality } from '../actions/index.js'
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
        selectedLocation
    } = state.SEARCH_CRITERIA

    return {
        commonlySearchedConditions,
        selectedConditions,
        commonlySearchedSpecialities,
        selectedSpecialities,
        selectedLocation
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleCondition: (id) => dispatch(toggleCondition(id)),
        toggleSpeciality: (id) => dispatch(toggleSpeciality(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchCriteria);
