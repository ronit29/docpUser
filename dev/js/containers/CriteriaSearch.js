import React from 'react';
import { connect } from 'react-redux';

import { } from '../actions/index.js'
import CriteriaSearchView from '../components/criteriaSearch/index.js'

class CriteriaSearch extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <CriteriaSearchView

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

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CriteriaSearch);
