import React from 'react'
import {connect} from 'react-redux'

import { getInsuredProfile, clearInsurance, clearAvailNowInsurance} from '../../actions/index.js'
import InsuranceCertificateView from '../../components/insurance/insuranceCertificate.js'

class InsuranceCertificate extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            showBtn:false
        }
    }

    componentDidMount(){
        this.props.getInsuredProfile() // to get insured members data and certification details
        // this.props.getInsuredProfile((resp)=>{
        //     if(resp && resp.coi_url !=''){
        //         this.setState({showBtn:false})
        //     }else{
        //         setTimeout(() => {
        //             this.props.getInsuredProfile()
        //         }, 500)
        //     }
        // } )      
    }
	render(){
		return(
			<InsuranceCertificateView {...this.props} showBtn={this.state.showBtn}/>
			)
	}
}

const mapStateToProps = (state) => {
    const USER = state.USER
    let { insurnaceData, LOAD_INSURANCE, selected_plan,self_data_values,insured_member_list,get_insured_profile, avail_now_data} = state.INSURANCE
    return {
        insurnaceData,LOAD_INSURANCE,selected_plan,USER,self_data_values,insured_member_list,get_insured_profile, avail_now_data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        getInsuredProfile :(cb) => dispatch(getInsuredProfile(cb)),
        clearInsurance:()=>dispatch(clearInsurance()),
        clearAvailNowInsurance:()=>dispatch(clearAvailNowInsurance())
        
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(InsuranceCertificate)