import React from 'react';
import { connect } from 'react-redux';

import { getCareDetails, submitOTP, sendOTP, resetAuth, createProfile, getUserProfile } from '../../actions/index.js'

import PrimeCareBookingView from '../../components/commons/primeCare/primeCareBookingView.js'

const queryString = require('query-string');

class primeCareBooking extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            data:''
        }
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search)

        this.props.getCareDetails((resp)=>{
            let feature_detail = resp.plans.filter(x => x.id == parsed.plan_id)
            feature_detail[0].feature_details = resp.feature_details
            this.setState({data:feature_detail})
        })
    }

    render() {
        return (
            <PrimeCareBookingView {...this.props} data={this.state.data}/>
        );
    }
}

const mapStateToProps = (state) => {
    const USER = state.USER

    return {
        USER
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCareDetails: (callback) => dispatch(getCareDetails(callback)),
        sendOTP: (number, cb) => dispatch(sendOTP(number, cb)),
        submitOTP: (number, otp, cb) => dispatch(submitOTP(number, otp, cb)),
        resetAuth: () => dispatch(resetAuth()),
        createProfile: (postData, cb) => dispatch(createProfile(postData, cb)),
        getUserProfile: () => dispatch(getUserProfile()),
        
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(primeCareBooking);
