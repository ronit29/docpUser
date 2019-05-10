import React from 'react'
import {connect} from 'react-redux'

import {userData,insurancePay, resetSelectedInsuranceMembers, retrieveUserData, sendAgentBookingURL, resetUserInsuredData, getInsurance,retrieveEndorsedData} from '../../actions/index.js'
import InsuranceReviewView from '../../components/insurance/insuranceReview.js'
import Loader from '../../components/commons/Loader'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
const queryString = require('query-string');

class InsuranceReview extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    }
    componentDidMount() {
        let self = this
        let parsed = queryString.parse(this.props.location.search)
        if(parsed.is_endorsement){
            this.props.getInsurance(true,(response)=>{
                if(!response.certificate){
                    this.props.retrieveEndorsedData((resp)=>{
                        this.setState({data:resp.data})
                    })
                }
            })
        }else{
            this.props.getInsurance(false,(response)=>{
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
    }
	render(){
        if(this.props.LOAD_INSURANCE && this.state.data){
            return(
            <InsuranceReviewView {...this.props} data={this.state.data}/>
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
    let { insurnaceData, LOAD_INSURANCE, selected_plan,self_data_values,create_payment_resp, currentSelectedInsuredMembersId} = state.INSURANCE
    return {
        insurnaceData,LOAD_INSURANCE,selected_plan,USER,self_data_values,create_payment_resp, currentSelectedInsuredMembersId
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
        sendAgentBookingURL: (orderId, type, purchase_type, cb) => dispatch(sendAgentBookingURL(orderId, type, purchase_type, cb)),
        resetUserInsuredData:(criteria) =>dispatch(resetUserInsuredData(criteria)),
        retrieveEndorsedData:(cb) =>dispatch(retrieveEndorsedData(cb))
        
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(InsuranceReview)