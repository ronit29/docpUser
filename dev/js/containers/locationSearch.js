import React from 'react';
import { connect } from 'react-redux';

import { selectLocation } from '../actions/index.js'
import LocationSearchView from '../components/locationSearch/index.js'

class LocationSearch extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <LocationSearchView
                selectedLocation={this.props.selectedLocation}
                selectLocation={this.props.selectLocation.bind(this)}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const {
        selectedLocation
    } = state.SEARCH_CRITERIA

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
