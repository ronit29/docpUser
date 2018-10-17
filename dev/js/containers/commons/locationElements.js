import React from 'react';
import { connect } from 'react-redux';

import { selectLocation, userPhoneNumber } from '../../actions/index.js'
import LocationElementView from '../../components/commons/locationElements/index.js'

class LocationElemContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <LocationElementView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    const {
        selectedLocation,
        locationType
    } = state.SEARCH_CRITERIA_OPD

    const {
        userPhoneNo
    } = state.USER

    return {
        selectedLocation,
        locationType,
        userPhoneNo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userPhoneNumber: (phone_number) => dispatch(userPhoneNumber(phone_number)),
        selectLocation: (location, type) => dispatch(selectLocation(location, type))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LocationElemContainer);
