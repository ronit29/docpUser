import React from 'react'
import {connect} from 'react-redux'

import { getInsurance, selectInsurancePlan , saveCurrentSelectedMembers,resetSelectedInsuranceMembers,resetSelectedPlans,sendOTP, submitOTP, resetAuth, getUserProfile, userData, generateInsuranceLead, urlShortner,


selectVipClubPlan, getVipDashboardList, resetVipData, selectSearchType
 } from '../../actions/index.js'
import VipClubView from '../../components/vipClub/vipClubActivatesView.js'
import Loader from '../../components/commons/Loader'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import STORAGE from '../../helpers/storage'
import GTM from '../../helpers/gtm'
const queryString = require('query-string');

class VipClubActivatedDetails extends React.Component{

    constructor(props) {
        super(props)
        this.state={
            data:null,
            is_gold:false
        }
    }

    componentDidMount() {
        
        if (STORAGE.checkAuth()) {
            this.props.getUserProfile() // to get loggedIn user profile
        }
        if (window) {
            window.scrollTo(0, 0)
        }

        var url_string = window.location.href;
        var url = new URL(url_string);
        let primary_member_id = null
        var member_list_id = url.searchParams.get("id");
        if (member_list_id !== null) { // in case after successfull payment.
            this.props.resetVipData() // to set vip or gold sotre to initial state
            this.props.getVipDashboardList(member_list_id,false,(resp)=>{ // to retrive vip or gold dashboard data
                if(resp && Object.keys(resp.data).length >0){
                    if(resp.data.user && Object.keys(resp.data.user).length > 0 ){
                        primary_member_id =   resp.data.user.user
                    }
                    let gtmData = {
                            'Category': 'ConsumerApp', 'Action': 'vipbooked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'vipbooked', 'user_id': primary_member_id
                        }
                        GTM.sendEvent({ data: gtmData })
                    this.setState({data:resp.data,is_gold:resp.data.plan[0].is_gold})
                }
            })
        }else{
            this.props.resetVipData() // to set vip or gold sotre to initial state
            this.props.getVipDashboardList(member_list_id,true,(resp)=>{ // to retrive vip or gold dashboard data
                if(resp && Object.keys(resp.data).length >0){
                    this.setState({data:resp.data,is_gold:resp.data.plan[0].is_gold})
                }
            })
        }

    }
    render(){
        if(this.props.LOAD_VIP_CLUB_DASHBOARD && this.state.data){
            return(
                <VipClubView {...this.props} data={this.state.data} is_gold={this.state.is_gold}/>
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
    let { LOAD_VIP_CLUB, vipClubList, selected_vip_plan, LOAD_VIP_CLUB_DASHBOARD, vip_club_db_data } = state.VIPCLUB
    const {
        selectedLocation

    } = state.SEARCH_CRITERIA_OPD
    return {
       USER, selectedLocation,LOAD_VIP_CLUB, vipClubList, selected_vip_plan, vip_club_db_data, LOAD_VIP_CLUB_DASHBOARD
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetVipData:() => dispatch(resetVipData()),
        selectVipClubPlan: (plan,criteria, callback) => dispatch(selectVipClubPlan(plan,criteria, callback)),
        getUserProfile: () => dispatch(getUserProfile()),
        getInsurance: (is_endorsement,callback) => dispatch(getInsurance(is_endorsement,callback)), 
        getVipDashboardList:(user_id,is_dashboard,callback) => dispatch(getVipDashboardList(user_id,is_dashboard,callback)),       

        selectInsurancePlan: (plan,criteria) => dispatch(selectInsurancePlan(plan,criteria)),
        // saveCurrentSelectedMembers: (membersId) => dispatch(saveCurrentSelectedMembers(membersId)),
        resetSelectedPlans: () => dispatch(resetSelectedPlans()),
        sendOTP: (number,viaSms,viaWhatsapp,message_type, cb) => dispatch(sendOTP(number,viaSms,viaWhatsapp,message_type, cb)),
        submitOTP: (number, otp, extraParamsData,cb) => dispatch(submitOTP(number, otp, extraParamsData,cb)),
        resetAuth: () => dispatch(resetAuth()),
        userData :(self_data,criteria,forceadd) => dispatch(userData(self_data,criteria,forceadd)),
        generateInsuranceLead:(selectedPlan,number,lead_data,cb) => dispatch(generateInsuranceLead(selectedPlan,number,lead_data,cb)),
        urlShortner: (url, cb) => dispatch(urlShortner(url, cb)),
        selectSearchType: (type) => dispatch(selectSearchType(type)),
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(VipClubActivatedDetails)