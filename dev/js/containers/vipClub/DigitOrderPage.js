import React from 'react'
import {connect} from 'react-redux'

import { sendOTP, submitOTP, resetAuth, getUserProfile, retrieveDigitInsuranceData } from '../../actions/index.js'
import DigitOrderView from '../../components/vipClub/digitOrderView.js'
import Loader from '../../components/commons/Loader'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import STORAGE from '../../helpers/storage'
const queryString = require('query-string');

class DigitOrderPage extends React.Component{

    constructor(props) {    
        super(props)
        const parsed = queryString.parse(this.props.location.search)
        this.state={
            data:null, 
            source:parsed.source,
            is_from_organic:parsed.fromOrganic,
            is_pb:parsed.utm_source?parsed.utm_source && parsed.utm_source.includes('policybazaar.com'):false
        }
    }

    componentDidMount() {
        
        if (STORAGE.checkAuth()) {
            this.props.getUserProfile() // to get loggedIn user profile
        }
        if (window) {
            window.scrollTo(0, 0)
        }
        let dataParams = {
            id: this.props.match.params.id
        }
        console.log(dataParams);
        this.props.retrieveDigitInsuranceData(dataParams, (err, data,) => {
            if (!err && data) {
                this.setState({ data })
            }
        });
    }

    render(){
        return (
            <DigitOrderView {...this.props} orderdata={this.state.data} />
        );
    }
}

const mapStateToProps = (state) => {
    const USER = state.USER
    let { common_utm_tags, user_loggedIn_number } = state.USER
    // let {  digitPlans,selected_digit_plan } = state.VIPCLUB

    return {
        USER, common_utm_tags, user_loggedIn_number
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
        getUserProfile: () => dispatch(getUserProfile()),
        sendOTP: (number,viaSms,viaWhatsapp,message_type, cb) => dispatch(sendOTP(number,viaSms,viaWhatsapp,message_type, cb)),
        submitOTP: (number, otp, extraParamsData,cb) => dispatch(submitOTP(number, otp,extraParamsData, cb)),
        resetAuth: () => dispatch(resetAuth()),
        retrieveDigitInsuranceData: (dataParams,cb) => dispatch(retrieveDigitInsuranceData(dataParams, cb)),
        // selectDigitPlan :(data,cb) => dispatch(selectDigitPlan(data,cb))
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(DigitOrderPage)