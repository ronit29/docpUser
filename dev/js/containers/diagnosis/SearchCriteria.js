import React from 'react';
import { connect } from 'react-redux';

import { toggleTest, toggleDiagnosisCriteria, loadLabSearchCriteria } from '../../actions/index.js'
import SearchCriteriaView from '../../components/diagnosis/searchCriteria/index.js'

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
        commonlySearchedTests,
        selectedTests,
        selectedLocation,
        selectedDiagnosisCriteria
    } = state.SEARCH_CRITERIA_LABS

    return {
        commonlySearchedTests,
        selectedTests,
        selectedLocation,
        selectedDiagnosisCriteria
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadLabSearchCriteria : () => dispatch(loadLabSearchCriteria()),
        toggleTest: (id) => dispatch(toggleTest(id)),
        toggleDiagnosisCriteria : (criteria) => dispatch(toggleDiagnosisCriteria(criteria))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchCriteria);
