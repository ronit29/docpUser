import React from 'react';
import { connect } from 'react-redux';

import { getCareDetails, submitOTP, sendOTP, resetAuth, createProfile, getUserProfile, createCareBooking } from '../../actions/index.js'

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

        this.props.getCareDetails((resp)=>{ // get care plans
            let feature_detail = resp.plans.filter(x => x.id == parsed.plan_id)
            feature_detail[0].feature_details = resp.feature_details
            this.setState({data:feature_detail})
        })
        if (window) {
            window.scrollTo(0, 0)
        }
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
        sendOTP: (number,viaSms,viaWhatsapp,message_type, cb) => dispatch(sendOTP(number,viaSms,viaWhatsapp,message_type, cb)),
        submitOTP: (number, otp, extraParamsData, cb) => dispatch(submitOTP(number, otp, extraParamsData, cb)),
        resetAuth: () => dispatch(resetAuth()),
        createProfile: (postData, cb) => dispatch(createProfile(postData, cb)),
        getUserProfile: () => dispatch(getUserProfile()),
        createCareBooking:(selectedPlan, cb) => dispatch(createCareBooking(selectedPlan,cb))
        
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(primeCareBooking);
