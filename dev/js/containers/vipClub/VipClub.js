import React from 'react'
import {connect} from 'react-redux'

import { sendOTP, submitOTP, resetAuth, getUserProfile, getVipList, selectVipClubPlan, generateVipClubLead
 } from '../../actions/index.js'
import VipClubView from '../../components/vipClub/vipClubView.js'
import Loader from '../../components/commons/Loader'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import STORAGE from '../../helpers/storage'
const queryString = require('query-string');

class VipClub extends React.Component{

    constructor(props) {
        super(props)
        this.state={
            showInsuranceView:false
        }
    }

    componentDidMount() {
        
        if (STORAGE.checkAuth()) {
            this.props.getUserProfile()
        }
        if (window) {
            window.scrollTo(0, 0)
        }

        this.props.getVipList(false,this.props.selectedLocation)

    }
    render(){
        if(this.props.LOAD_VIP_CLUB){
            return(
                <VipClubView {...this.props}/>
            )
        }else{
            if(this.props.vipClubList.certificate && STORAGE.checkAuth()){
                this.props.history.push('/vip-club-activated-details')
            }
            return(
            <div className="profile-body-wrap">
                <ProfileHeader showPackageStrip={true}/>
                <Loader />
            </div>
                )
        }
    }
}

const mapStateToProps = (state) => {
    const USER = state.USER
    let { LOAD_VIP_CLUB, vipClubList, selected_vip_plan } = state.VIPCLUB
    const {
        selectedLocation

    } = state.SEARCH_CRITERIA_OPD
    return {
        USER, selectedLocation,LOAD_VIP_CLUB, vipClubList, selected_vip_plan
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getVipList: (is_endorsement,selectedLocation,callback) => dispatch(getVipList(is_endorsement,selectedLocation,callback)),
        selectVipClubPlan: (plan,criteria, callback) => dispatch(selectVipClubPlan(plan,criteria, callback)),
        getUserProfile: () => dispatch(getUserProfile()),
        generateVipClubLead:(selectedPlan,number,lead_data,user_name,cb) =>dispatch(generateVipClubLead(selectedPlan,number,lead_data,user_name,cb)),
        sendOTP: (number,viaSms,viaWhatsapp,message_type, cb) => dispatch(sendOTP(number,viaSms,viaWhatsapp,message_type, cb)),
        submitOTP: (number, otp, cb) => dispatch(submitOTP(number, otp, cb)),
        resetAuth: () => dispatch(resetAuth())
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(VipClub)