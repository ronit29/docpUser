import React from 'react';
import { connect } from 'react-redux';


import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';

import { } from '../actions/index.js'

import SearchResultsFilterView from '../components/searchResultsFilter/index.js'

class SearchResultsFilter extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <SearchResultsFilterView />
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


export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsFilter);
