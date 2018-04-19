import React from 'react';
import { connect } from 'react-redux';

import { getLabBookingSummary } from '../../actions/index.js'

import BookingSummaryView from '../../components/diagnosis/bookingSummary/index.js'

class BookingSummary extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <BookingSummaryView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {

    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLabBookingSummary : (bookingId, callback) => dispatch(getLabBookingSummary(bookingId, callback))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BookingSummary);
