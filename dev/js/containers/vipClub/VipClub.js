import React from 'react'
import {connect} from 'react-redux'

import { getInsurance, selectInsurancePlan , saveCurrentSelectedMembers,resetSelectedInsuranceMembers,resetSelectedPlans,sendOTP, submitOTP, resetAuth, getUserProfile, userData, generateInsuranceLead, urlShortner,


getVipList, selectVipClubPlan, generateVipClubLead
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

        // this.props.getInsurance(false)
        this.props.getVipList(false)

    }
    render(){
        if(this.props.LOAD_VIP_CLUB){
            return(
                <VipClubView {...this.props}/>
            )
        }else{
            // if(this.props.insurnaceData.certificate && STORAGE.checkAuth()){
            //     this.props.history.push('/insurance/certificate')
            // }
            return(
            <div className="profile-body-wrap">
                <ProfileHeader showPackageStrip={true}/>
                <Loader />
            </div>
                )
        }
        // return(
        //         <InsuranceComponent {...this.props}/>
        //     )
    }
}

const mapStateToProps = (state) => {
    const USER = state.USER
    // let { insurnaceData, LOAD_INSURANCE, selected_plan,self_data_values} = state.INSURANCE
    let { LOAD_VIP_CLUB, vipClubList, selected_vip_plan } = state.VIPCLUB
    const {
        selectedLocation

    } = state.SEARCH_CRITERIA_OPD
    return {
        //insurnaceData,LOAD_INSURANCE,selected_plan,self_data_values,
        USER, selectedLocation,LOAD_VIP_CLUB, vipClubList, selected_vip_plan
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getVipList: (is_endorsement,callback) => dispatch(getVipList(is_endorsement,callback)),
        selectVipClubPlan: (plan,criteria, callback) => dispatch(selectVipClubPlan(plan,criteria, callback)),
        getUserProfile: () => dispatch(getUserProfile()),
        generateVipClubLead:(selectedPlan,number,lead_data,user_name,cb) =>dispatch(generateVipClubLead(selectedPlan,number,lead_data,user_name,cb)),
        sendOTP: (number,viaSms,viaWhatsapp,message_type, cb) => dispatch(sendOTP(number,viaSms,viaWhatsapp,message_type, cb)),
        submitOTP: (number, otp, cb) => dispatch(submitOTP(number, otp, cb)),

        
        getInsurance: (is_endorsement,callback) => dispatch(getInsurance(is_endorsement,callback)),
        selectInsurancePlan: (plan,criteria) => dispatch(selectInsurancePlan(plan,criteria)),
        // saveCurrentSelectedMembers: (membersId) => dispatch(saveCurrentSelectedMembers(membersId)),
        resetSelectedPlans: () => dispatch(resetSelectedPlans()), 
        resetAuth: () => dispatch(resetAuth()),
        userData :(self_data,criteria,forceadd) => dispatch(userData(self_data,criteria,forceadd)),
        generateInsuranceLead:(selectedPlan,number,lead_data,cb) => dispatch(generateInsuranceLead(selectedPlan,number,lead_data,cb)),
        urlShortner: (url, cb) => dispatch(urlShortner(url, cb))
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(VipClub)