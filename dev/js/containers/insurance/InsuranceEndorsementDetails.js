import React from 'react'
import {connect} from 'react-redux'
import Loader from '../../components/commons/Loader'

import { userData,selectInsuranceProfile, saveCurrentSelectedMembers, pushUserData, resetSelectedInsuranceMembers, getInsurance} from '../../actions/index.js'
import InsuranceComponentView from '../../components/insurance/insuranceEndorsementDetailsView.js'

class InsuranceEndorsementDetails extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            data:null    
        }
    }
    componentDidMount() {
        //this.props.getUserProfile()
        this.props.getInsurance(true,(resp)=>{
            // console.log(resp)
            if(resp){
                this.setState({data:resp})
            }
            // alert('s')
        })
    }
	render(){
        let abc = [{'relation':'self','id':'0000'},{'relation':'spouse','id':'1111'},{'relation':'child','id':'22222'},{'relation':'child','id':'3222'}]
        if(this.state.data){
    		return(
    			<InsuranceComponentView {...this.props} endorseData={abc}/>
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
    let { insurnaceData, LOAD_INSURANCE, selected_plan,self_data_values,saveCurrentSelectedMembers,selectedProfile, currentSelectedInsuredMembersId,create_payment_resp} = state.INSURANCE
    return {
        insurnaceData,LOAD_INSURANCE,selected_plan,USER,self_data_values,saveCurrentSelectedMembers,selectedProfile, currentSelectedInsuredMembersId, create_payment_resp
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInsurance: (is_endorsement,callback) => dispatch(getInsurance(is_endorsement,callback)),
        userData :(self_data,criteria,forceadd) => dispatch(userData(self_data,criteria,forceadd)),
        selectInsuranceProfile :(newProfileid,member_id,newProfile,param_id) => dispatch(selectInsuranceProfile(newProfileid,member_id,newProfile,param_id)),
        saveCurrentSelectedMembers: (membersId) => dispatch(saveCurrentSelectedMembers(membersId)),
        pushUserData :(criteria,callback) => dispatch(pushUserData(criteria,callback)),
        resetSelectedInsuranceMembers: () => dispatch(resetSelectedInsuranceMembers())
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(InsuranceEndorsementDetails)