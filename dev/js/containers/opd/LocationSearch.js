import React from 'react';
import { connect } from 'react-redux';

import { selectLocation, fetchTestList, toggleDiagnosisCriteria } from '../../actions/index.js'
import LocationSearchView from '../../components/opd/locationSearch/index.js'

class LocationSearch extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <LocationSearchView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    const {
        selectedLocation
    } = state.SEARCH_CRITERIA_OPD

    const {
        testList
    } = state.USER

    return {
        selectedLocation, testList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectLocation: (location, type) => dispatch(selectLocation(location, type)),
        fetchTestList: (testIds) => dispatch(fetchTestList(testIds)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LocationSearch);
