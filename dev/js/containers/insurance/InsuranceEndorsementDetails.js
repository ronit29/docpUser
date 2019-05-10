import React from 'react'
import {connect} from 'react-redux'
import Loader from '../../components/commons/Loader'

import { userData,selectInsuranceProfile, saveCurrentSelectedMembers, pushUserData, resetSelectedInsuranceMembers, getInsurance, getEndorsedMemberList, pushUserEndorsedData, selectInsurancePlan} from '../../actions/index.js'
import InsuranceComponentView from '../../components/insurance/insuranceEndorsementDetailsView.js'

class InsuranceEndorsementDetails extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            insurance_data:null,
            members_data:null    
        }
    }
    componentDidMount() {
        let self = this
        this.props.getEndorsedMemberList((mem_resp)=>{
            if(mem_resp){
                this.props.getInsurance(true,(resp)=>{
                    if(resp && resp.insurance){
                        let plan = resp.insurance[0].plans.filter(x=>x.id == mem_resp.insurance_plan)[0]
                        this.props.selectInsurancePlan('plan', plan)
                        this.setState({members_data:mem_resp , insurance_data:resp})
                    }
                })
            }
        }) 
    }
	render(){
        if(this.state.members_data && this.state.insurance_data){
    		return(
    			<InsuranceComponentView {...this.props} endorseData={this.state.members_data}/>
    		)
        }else{
            return <div className="profile-body-wrap" style={{ paddingBottom: 80 }} >
                
                <Loader/>
            </div>
        }
	}
}

const mapStateToProps = (state) => {
    const USER = state.USER
    let { insurnaceData, LOAD_INSURANCE, selected_plan,self_data_values,saveCurrentSelectedMembers,selectedProfile, currentSelectedInsuredMembersId,create_payment_resp, endorsed_member_data} = state.INSURANCE
    return {
        insurnaceData,LOAD_INSURANCE,selected_plan,USER,self_data_values,saveCurrentSelectedMembers,selectedProfile, currentSelectedInsuredMembersId, create_payment_resp,endorsed_member_data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInsurance: (is_endorsement,callback) => dispatch(getInsurance(is_endorsement,callback)),
        userData :(self_data,criteria,forceadd) => dispatch(userData(self_data,criteria,forceadd)),
        selectInsuranceProfile :(newProfileid,member_id,newProfile,param_id) => dispatch(selectInsuranceProfile(newProfileid,member_id,newProfile,param_id)),
        saveCurrentSelectedMembers: (membersId) => dispatch(saveCurrentSelectedMembers(membersId)),
        pushUserData :(criteria,callback) => dispatch(pushUserData(criteria,callback)),
        resetSelectedInsuranceMembers: () => dispatch(resetSelectedInsuranceMembers()),
        getEndorsedMemberList:(callback) => dispatch(getEndorsedMemberList(callback)),
        pushUserEndorsedData :(criteria,callback) => dispatch(pushUserEndorsedData(criteria,callback)),
        selectInsurancePlan: (plan,criteria) => dispatch(selectInsurancePlan(plan,criteria)),        
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(InsuranceEndorsementDetails)