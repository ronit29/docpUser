import React from 'react'
import {connect} from 'react-redux'

import { getInsurance, selectInsurancePlan , saveCurrentSelectedMembers,resetSelectedInsuranceMembers,resetSelectedPlans,sendOTP, submitOTP, resetAuth, getUserProfile, userData, generateInsuranceLead, urlShortner,


getVipList, selectVipClubPlan, getVipDashboardList, resetVipData
 } from '../../actions/index.js'
import VipClubView from '../../components/vipClub/vipClubActivatesView.js'
import Loader from '../../components/commons/Loader'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import STORAGE from '../../helpers/storage'
const queryString = require('query-string');

class VipClubActivatedDetails extends React.Component{

    constructor(props) {
        super(props)
        this.state={
        }
    }

    componentDidMount() {
        
        if (STORAGE.checkAuth()) {
            this.props.getUserProfile()
        }
        if (window) {
            window.scrollTo(0, 0)
        }

        var url_string = window.location.href;
        var url = new URL(url_string);
        var member_list_id = url.searchParams.get("id");
        if (member_list_id !== null) {
            this.props.resetVipData()
            this.props.getVipDashboardList(member_list_id,(resp)=>{
                console.log(resp)
            })
        }

        // this.props.getInsurance(false)
        // this.props.getVipList(false)

    }
    render(){
        if(this.props.LOAD_VIP_CLUB_DASHBOARD){
            return(
                <VipClubView {...this.props}/>
            )
        }else{
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
    let { insurnaceData, LOAD_INSURANCE, selected_plan,self_data_values} = state.INSURANCE
    let { LOAD_VIP_CLUB, vipClubList, selected_vip_plan, LOAD_VIP_CLUB_DASHBOARD, vip_club_db_data } = state.VIPCLUB
    const {
        selectedLocation

    } = state.SEARCH_CRITERIA_OPD
    return {
        insurnaceData,LOAD_INSURANCE,selected_plan,self_data_values,USER, selectedLocation,LOAD_VIP_CLUB, vipClubList, selected_vip_plan, vip_club_db_data, LOAD_VIP_CLUB_DASHBOARD
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetVipData:() => dispatch(resetVipData()),
        getVipList: (is_endorsement,callback) => dispatch(getVipList(is_endorsement,callback)),
        selectVipClubPlan: (plan,criteria, callback) => dispatch(selectVipClubPlan(plan,criteria, callback)),
        getUserProfile: () => dispatch(getUserProfile()),
        getInsurance: (is_endorsement,callback) => dispatch(getInsurance(is_endorsement,callback)), 
        getVipDashboardList:(user_id,callback) => dispatch(getVipDashboardList(user_id,callback)),       

        selectInsurancePlan: (plan,criteria) => dispatch(selectInsurancePlan(plan,criteria)),
        // saveCurrentSelectedMembers: (membersId) => dispatch(saveCurrentSelectedMembers(membersId)),
        resetSelectedPlans: () => dispatch(resetSelectedPlans()),
        sendOTP: (number,viaSms,viaWhatsapp,message_type, cb) => dispatch(sendOTP(number,viaSms,viaWhatsapp,message_type, cb)),
        submitOTP: (number, otp, cb) => dispatch(submitOTP(number, otp, cb)),
        resetAuth: () => dispatch(resetAuth()),
        userData :(self_data,criteria,forceadd) => dispatch(userData(self_data,criteria,forceadd)),
        generateInsuranceLead:(selectedPlan,number,lead_data,cb) => dispatch(generateInsuranceLead(selectedPlan,number,lead_data,cb)),
        urlShortner: (url, cb) => dispatch(urlShortner(url, cb))
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(VipClubActivatedDetails)