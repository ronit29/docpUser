import React from 'react'
import {connect} from 'react-redux'

import {userData,insurancePay, resetSelectedInsuranceMembers, retrieveUserData, sendAgentBookingURL, resetUserInsuredData, getInsurance,retrieveEndorsedData, createEndorsementData} from '../../actions/index.js'
import InsuranceReviewView from '../../components/insurance/insuranceReview.js'
import Loader from '../../components/commons/Loader'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
const queryString = require('query-string');
import STORAGE from '../../helpers/storage'

class InsuranceReview extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            is_endorsement:false,
            isAgent:false
        }
    }
    componentDidMount() {
        let self = this
        let parsed = queryString.parse(this.props.location.search)
        if(parsed.is_endorsement){
            this.props.getInsurance(true,(response)=>{ // to get insurance plans
                if(!response.certificate){
                    this.props.retrieveEndorsedData((resp)=>{ // to retrieve user endorsement data (if user want's to update any of details in there policy details)
                        this.setState({data:resp.data,is_endorsement:true, isAgent:parsed.isAgent})
                    })
                }
            })
        }else{
            this.props.getInsurance(false,(response)=>{
                if(!response.certificate){
                    this.props.retrieveUserData((resp)=>{ // to retrieve user data in case of agent has loggedin instead of user 
                        if(resp && !resp.error){
                            this.props.resetUserInsuredData(resp.data) // to reset the insurance store to initial state
                            this.setState({data:resp.data})
                        }
                    })
                }
            })
        }
    }
	render(){
        if(this.props.LOAD_INSURANCE && this.state.data){
            return(
            <InsuranceReviewView {...this.props} data={this.state.data} is_endorsement={this.state.is_endorsement} isAgent={this.state.isAgent}/>
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
		
	}
}

const mapStateToProps = (state) => {
    const USER = state.USER
    let { insurnaceData, LOAD_INSURANCE, selected_plan,self_data_values,create_payment_resp, currentSelectedInsuredMembersId, members_proofs} = state.INSURANCE
    return {
        insurnaceData,LOAD_INSURANCE,selected_plan,USER,self_data_values,create_payment_resp, currentSelectedInsuredMembersId, members_proofs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInsurance: (is_endorsement,callback) => dispatch(getInsurance(is_endorsement,callback)),
        // getUserProfile: () => dispatch(getUserProfile()),
        // selectInsurancePlan: (plan,criteria,forceadd) => dispatch(selectInsurancePlan(plan,criteria,forceadd)),
        // userData :(self_data,criteria,forceadd) => dispatch(userData(self_data,criteria,forceadd)),
        insurancePay :(criteria,callback) => dispatch(insurancePay(criteria,callback)),
        resetSelectedInsuranceMembers: () => dispatch(resetSelectedInsuranceMembers()),
        retrieveUserData:(cb) =>dispatch(retrieveUserData(cb)),
        sendAgentBookingURL: (orderId, type, purchase_type,query_data, extraParams, cb) => dispatch(sendAgentBookingURL(orderId, type,purchase_type,query_data,extraParams, cb)),
        resetUserInsuredData:(criteria) =>dispatch(resetUserInsuredData(criteria)),
        retrieveEndorsedData:(cb) =>dispatch(retrieveEndorsedData(cb)),
        createEndorsementData:(insurance_pay,cb) =>dispatch(createEndorsementData(insurance_pay,cb))
        
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(InsuranceReview)