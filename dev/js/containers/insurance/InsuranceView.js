import React from 'react'
import {connect} from 'react-redux'

import { getInsurance, selectInsurancePlan , saveCurrentSelectedMembers,resetSelectedInsuranceMembers,resetSelectedPlans,sendOTP, submitOTP, resetAuth, getUserProfile, userData, generateInsuranceLead } from '../../actions/index.js'
import InsuranceComponent from '../../components/insurance/insuranceView.js'
import Loader from '../../components/commons/Loader'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import STORAGE from '../../helpers/storage'

class Insurance extends React.Component{

    constructor(props) {
        super(props)
        this.state={
            showInsuranceView:false
        }
    }

    componentDidMount() {
        this.props.getInsurance()
        if (STORAGE.checkAuth()) {
            this.props.getUserProfile()
        }
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
        generateInsuranceLead:(selectedPlan, cb) => dispatch(generateInsuranceLead(selectedPlan,cb))
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(Insurance)