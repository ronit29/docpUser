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
        let phoneNumber = ''
        
        if (STORAGE.checkAuth()) {
            this.props.getUserProfile()
        }

        if (STORAGE.checkAuth() && this.props.USER && this.props.USER.primaryMobile != '') {
            phoneNumber = this.props.USER.primaryMobile
        }
        let lead_data = queryString.parse(this.props.location.search)
        this.props.getInsurance(resp=>{
            if(!resp.certificate){
                this.props.generateInsuranceLead('',phoneNumber,lead_data)
            }
        })
    }
	render(){
        if(this.props.LOAD_INSURANCE){
            return(
                <InsuranceComponent {...this.props}/>
            )
        }else{
            if(this.props.insurnaceData.certificate){
                this.props.history.push('/insurance/certificate')
            }
            return(
            <div className="profile-body-wrap">
                <ProfileHeader />
                <Loader />
            </div>
                )
        }
	}
}

const mapStateToProps = (state) => {
    const USER = state.USER
    let { insurnaceData, LOAD_INSURANCE, selected_plan,self_data_values} = state.INSURANCE
    return {
        insurnaceData,LOAD_INSURANCE,selected_plan,self_data_values,USER
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInsurance: (callback) => dispatch(getInsurance(callback)),
        getUserProfile: () => dispatch(getUserProfile()),
        selectInsurancePlan: (plan,criteria) => dispatch(selectInsurancePlan(plan,criteria)),
        // saveCurrentSelectedMembers: (membersId) => dispatch(saveCurrentSelectedMembers(membersId)),
        resetSelectedPlans: () => dispatch(resetSelectedPlans()),
        sendOTP: (number, cb) => dispatch(sendOTP(number, cb)),
        submitOTP: (number, otp, cb) => dispatch(submitOTP(number, otp, cb)),
        resetAuth: () => dispatch(resetAuth()),
        userData :(self_data,criteria,forceadd) => dispatch(userData(self_data,criteria,forceadd)),
        generateInsuranceLead:(selectedPlan,number,lead_data,cb) => dispatch(generateInsuranceLead(selectedPlan,number,lead_data,cb)),
        urlShortner: (url, cb) => dispatch(urlShortner(url, cb)),
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(Insurance)