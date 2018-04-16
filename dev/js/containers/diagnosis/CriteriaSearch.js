import React from 'react';
import { connect } from 'react-redux';

import { getDiagnosisCriteriaResults, toggleDiagnosisCriteria } from '../../actions/index.js'
import CriteriaSearchView from '../../components/diagnosis/criteriaSearch/index.js'

class CriteriaSearch extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <CriteriaSearchView
                { ...this.props }
            />
        );
    }
}

const mapStateToProps = (state) => {

    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDiagnosisCriteriaResults : (searchString,cb) => dispatch(getDiagnosisCriteriaResults(searchString,cb)),
        toggleDiagnosisCriteria : (criteria) => dispatch(toggleDiagnosisCriteria(criteria))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CriteriaSearch);
