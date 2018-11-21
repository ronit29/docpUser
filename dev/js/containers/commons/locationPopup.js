import React from 'react';
import { connect } from 'react-redux';

import { selectLocation } from '../../actions/index.js'
import LocationPopupView from '../../components/commons/locationPopup/index.js'

class LocationPopupContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <LocationPopupView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    const {
        selectedLocation,
        locationType
    } = state.SEARCH_CRITERIA_OPD

    return {
        selectedLocation,
        locationType
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectLocation: (location, type) => dispatch(selectLocation(location, type))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LocationPopupContainer);
