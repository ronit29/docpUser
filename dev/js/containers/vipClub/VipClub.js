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
        const parsed = queryString.parse(this.props.location.search)
        this.state={
            isSalesAgent:parsed.utm_source,
            isAgent:parsed.is_agent
        }
    }

    componentDidMount() {
        
        if (STORAGE.checkAuth()) {
            this.props.getUserProfile()
        }
        if (window) {
            window.scrollTo(0, 0)
        }

        this.props.getVipList(false,this.props.selectedLocation,this.state.isSalesAgent,this.state.isAgent)

    }
    render(){
        if(this.props.LOAD_VIP_CLUB){
            return(
                <VipClubView {...this.props} isSalesAgent={this.state.isSalesAgent} isAgent={this.state.isAgent}/>
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
        getVipList: (is_endorsement,selectedLocation,isSalesAgent,isAgent,callback) => dispatch(getVipList(is_endorsement,selectedLocation,isSalesAgent,isAgent,callback)),
        selectVipClubPlan: (plan,criteria, callback) => dispatch(selectVipClubPlan(plan,criteria, callback)),
        getUserProfile: () => dispatch(getUserProfile()),
        generateVipClubLead:(selectedPlan,number,lead_data,user_name,cb) =>dispatch(generateVipClubLead(selectedPlan,number,lead_data,user_name,cb)),
        sendOTP: (number,viaSms,viaWhatsapp,message_type, cb) => dispatch(sendOTP(number,viaSms,viaWhatsapp,message_type, cb)),
        submitOTP: (number, otp, cb) => dispatch(submitOTP(number, otp, cb)),
        resetAuth: () => dispatch(resetAuth())
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(VipClub)