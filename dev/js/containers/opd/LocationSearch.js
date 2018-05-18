import React from 'react';
import { connect } from 'react-redux';

import { selectLocation } from '../../actions/index.js'
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

    return {
        selectedLocation
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectLocation: (location) => dispatch(selectLocation(location))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LocationSearch);
