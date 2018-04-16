import React from 'react';
import { connect } from 'react-redux';

import { } from '../../actions/index.js'

import BookingView from '../../components/opd/booking/BookingView.js'

class Booking extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <BookingView {...this.props} />
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


export default connect(mapStateToProps, mapDispatchToProps)(Booking);
