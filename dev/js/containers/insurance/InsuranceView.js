import React from 'react'
import {connect} from 'react-redux'

import { getInsurance, selectInsurancePlan , saveCurrentSelectedMembers,resetSelectedInsuranceMembers,resetSelectedPlans,sendOTP, submitOTP, resetAuth, getUserProfile, userData, generateInsuranceLead, urlShortner } from '../../actions/index.js'
import InsuranceComponent from '../../components/insurance/insuranceView.js'
import Loader from '../../components/commons/Loader'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import STORAGE from '../../helpers/storage'
const queryString = require('query-string');

class Insurance extends React.Component{

    constructor(props) {
        super(props)
        this.state={
            showInsuranceView:false
        }
    }

    componentDidMount() {
        
        if (STORAGE.checkAuth()) {
            this.props.getUserProfile() // to get loggedIn user profile
        }
        /*this.props.getInsurance(resp=>{
            if(!resp.certificate){
                this.props.generateInsuranceLead('',phoneNumber,lead_data)
            }
        })*/
        if (window) {
            window.scrollTo(0, 0)
        }
        this.props.getInsurance(false) // to get insurance plans
    }
	render(){
        if(this.props.LOAD_INSURANCE){
            return(
                <InsuranceComponent {...this.props}/>
            )
        }else{
            if(this.props.insurnaceData.certificate && STORAGE.checkAuth()){ // if user is already an insurance customer so redirect on insured dashboard page
                this.props.history.push('/insurance/certificate')
            }
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
    let { insurnaceData, LOAD_INSURANCE, selected_plan,self_data_values} = state.INSURANCE
    const {
        selectedLocation

    } = state.SEARCH_CRITERIA_OPD
    return {
        insurnaceData,LOAD_INSURANCE,selected_plan,self_data_values,USER, selectedLocation
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInsurance: (is_endorsement,callback) => dispatch(getInsurance(is_endorsement,callback)),
        getUserProfile: () => dispatch(getUserProfile()),
        selectInsurancePlan: (plan,criteria) => dispatch(selectInsurancePlan(plan,criteria)),
        // saveCurrentSelectedMembers: (membersId) => dispatch(saveCurrentSelectedMembers(membersId)),
        resetSelectedPlans: () => dispatch(resetSelectedPlans()),
        sendOTP: (number,viaSms,viaWhatsapp,message_type, cb) => dispatch(sendOTP(number,viaSms,viaWhatsapp,message_type, cb)),
        submitOTP: (number, otp, extraParamsData, cb) => dispatch(submitOTP(number, otp, extraParamsData, cb)),
        resetAuth: () => dispatch(resetAuth()),
        userData :(self_data,criteria,forceadd) => dispatch(userData(self_data,criteria,forceadd)),
        generateInsuranceLead:(selectedPlan,number,lead_data,cb) => dispatch(generateInsuranceLead(selectedPlan,number,lead_data,cb)),
        urlShortner: (url, cb) => dispatch(urlShortner(url, cb)),
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(Insurance)