import React from 'react';
import { connect } from 'react-redux';

import { getUserReviews, getRatingCompliments, updateAppointmentRating, OTTLogin } from '../../actions/index.js'

import UserReview from '../../components/commons/userProfile/userReviews'


class MyRatings extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    render() {
        return (
            <UserReview {...this.props} />
        );
    }
}

const mapStateToProps = (state, passedProps) => {
    /**
     * initialServerData is server rendered async data required build html on server. 
     */
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserReviews: (cb) => dispatch(getUserReviews(cb)),
        getRatingCompliments: (callback) => dispatch(getRatingCompliments(callback)),
        updateAppointmentRating: (ratingData, callback) => dispatch(updateAppointmentRating(ratingData, callback)),
        OTTLogin: (ott,user_id) => dispatch(OTTLogin(ott,user_id)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MyRatings);
