import React from 'react';
import { connect } from 'react-redux';

import { getCriteriaResults, toggleCriteria } from '../actions/index.js'
import CriteriaSearchView from '../components/criteriaSearch/index.js'

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
        getCriteriaResults : (searchString,cb) => dispatch(getCriteriaResults(searchString,cb)),
        toggleCriteria : (criteria) => dispatch(toggleCriteria(criteria))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CriteriaSearch);
