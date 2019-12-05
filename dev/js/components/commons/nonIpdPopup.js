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
			}
		}else{
			SnackBar.show({ pos: 'bottom-center', text: "Please Enter phone number" })
		}	
	}

	render() {

			return (

				<div className="booking-help-modal">
					<div className="cancel-overlay" onClick={this.props.closeIpdLeadPopup.bind(this,this.props.is_force == 1?true:false)}></div>
					<div className="widget cancel-appointment-div cancel-popup">
						<div className="widget-header text-center action-screen-header">
							<p className="fw-500 cancel-appointment-head">Need help in booking <br/>
								<span className="text-capitalize" style={{fontWeight:400}}> Dynamic test name goes here ?</span>
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