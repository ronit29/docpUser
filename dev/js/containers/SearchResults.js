import React from 'react';
import { connect } from 'react-redux';

import { getDoctors } from '../actions/index.js'

import SearchResultsView from '../components/searchResults/index.js'

class SearchResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        return (
            <SearchResultsView
                getDoctors={this.props.getDoctors.bind(this)}
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
        getDoctors: () => dispatch(getDoctors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
