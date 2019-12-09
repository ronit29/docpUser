import React from 'react'
import SnackBar from 'node-snackbar'


class NonIpdPopupView extends React.Component {

	constructor(props) {
        super(props)
        this.state = {
            phone_number:null
        }
    }

	componentDidMount() {

		
	}

	onChangeHandler(event){
		this.setState({phone_number:event.target.value})
	}

	submitLead(){
		if(this.state.phone_number){
			if(this.state.phone_number.length <10){
				SnackBar.show({ pos: 'bottom-center', text: "Please Enter Valid phone number" })
				return
			}else if(this.state.phone_number.length >10){
				SnackBar.show({ pos: 'bottom-center', text: "Please Enter Valid phone number" })
				return
			}else{
				this.props.nonIpdLeads(this.state.phone_number)
				SnackBar.show({ pos: 'bottom-center', text: "Your request has been submited" })	
			}
		}else{
			SnackBar.show({ pos: 'bottom-center', text: "Please Enter phone number" })
		}	
	}

	getCriteriaString(selectedCriterias) {
        if (selectedCriterias && selectedCriterias.length) {
            return selectedCriterias.reduce((final, curr, i) => {
                if (i != 0) {
                    final += ', '
                }
                final += `${curr.name}`
                return final
            }, "")
        }
    }

	render() {
		let criteriaStr = 'Health Packages'
		if(this.props.is_lab){
			if(this.props.currentSearchedCriterias && this.props.currentSearchedCriterias.length >0){
				criteriaStr = this.getCriteriaString(this.props.currentSearchedCriterias)
			}
			// else if(this.props.selectedCriterias && this.props.selectedCriterias.length>0){
			// 	criteriaStr = this.getCriteriaString(this.props.selectedCriterias)
			// }
		}
			return (

				<div className="booking-help-modal">
					<div className="cancel-overlay"></div>
					<div className="widget cancel-appointment-div cancel-popup">
						<div className="widget-header text-center action-screen-header">
							<p className="fw-500 cancel-appointment-head">Need help in booking <br/>
								<span className="fw-500 text-capitalize"> {criteriaStr}?</span>
							</p>
							{
								this.props.is_force == 1?
									<a href="#" onClick={this.props.closeIpdLeadPopup.bind(this,true)} className="close-times-icon">&times;</a>
								:''
							}
						</div>
						<div className="col-sm-12 pd-10 d-flex justify-content-center align-item-center flex-column" style={{margin:"15px 0 20px"}}>
							<h4 className="fw-500">Get a free call back from our Health Advisor!</h4>
							<form className="col-sm-12 pd-0">
								<div className="labelWrap mb-0">
									<input type="number" placeholder="Enter your mobile number" onChange={this.onChangeHandler.bind(this)}/>
								</div>
							</form>
						</div>

						<div className="payment-content-btn text-center m-0 pd-10">
							<button className="fw-500 text-white" style={{backgroundImage: "linear-gradient(to top, #f78631, #ff6d00)"}} onClick={this.submitLead.bind(this)}>Submit</button>
						</div>
					</div>
				</div>
			)
	}
}

export default NonIpdPopupView