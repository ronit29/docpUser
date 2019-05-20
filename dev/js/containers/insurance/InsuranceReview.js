import React from 'react'
import {connect} from 'react-redux'

import {userData,insurancePay, resetSelectedInsuranceMembers, retrieveUserData, sendAgentBookingURL, resetUserInsuredData, getInsurance} from '../../actions/index.js'
import InsuranceReviewView from '../../components/insurance/insuranceReview.js'
import Loader from '../../components/commons/Loader'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import STORAGE from '../../helpers/storage'

class InsuranceReview extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    }
    componentDidMount() {
        let self = this
            this.props.getInsurance((response)=>{
                if(!response.certificate){
                    this.props.retrieveUserData((resp)=>{
                        if(resp && !resp.error){
                            this.props.resetUserInsuredData(resp.data)
                            this.setState({data:resp.data})
                        }
                    })
                }
            })
    }
	render(){
        if(this.props.LOAD_INSURANCE && this.state.data){
            return(
            <InsuranceReviewView {...this.props} data={this.state.data}/>
            )
        }else{
            if(this.props.insurnaceData.certificate && STORAGE.checkAuth()){
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
    let { insurnaceData, LOAD_INSURANCE, selected_plan,self_data_values,create_payment_resp, currentSelectedInsuredMembersId} = state.INSURANCE
    return {
        insurnaceData,LOAD_INSURANCE,selected_plan,USER,self_data_values,create_payment_resp, currentSelectedInsuredMembersId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInsurance: (callback) => dispatch(getInsurance(callback)),
        // getUserProfile: () => dispatch(getUserProfile()),
        // selectInsurancePlan: (plan,criteria,forceadd) => dispatch(selectInsurancePlan(plan,criteria,forceadd)),
        // userData :(self_data,criteria,forceadd) => dispatch(userData(self_data,criteria,forceadd)),
        insurancePay :(criteria,callback) => dispatch(insurancePay(criteria,callback)),
        resetSelectedInsuranceMembers: () => dispatch(resetSelectedInsuranceMembers()),
        retrieveUserData:(cb) =>dispatch(retrieveUserData(cb)),
        sendAgentBookingURL: (orderId, type, purchase_type, cb) => dispatch(sendAgentBookingURL(orderId, type, purchase_type, cb)),
        resetUserInsuredData:(criteria) =>dispatch(resetUserInsuredData(criteria)),
        
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(InsuranceReview)