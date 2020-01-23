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

    getDocCriteriaString(selectedCriterias) {
        if (selectedCriterias && selectedCriterias.length) {
            let is_group_ids_exist = selectedCriterias.filter(x => x.type == 'group_ids')
            let selectedDataView = is_group_ids_exist.length ? is_group_ids_exist : selectedCriterias

            return selectedDataView.reduce((final, curr, i) => {
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
		let common_msg = <p style={{fontWeight:'bold'}} className="cancel-appointment-head">Book
										<span className="fw-500 text-capitalize"> {criteriaStr}</span> <br/>
										at the Lowest Prices!
									</p>
		if(this.props.is_lab){
			if(this.props.currentSearchedCriterias && this.props.currentSearchedCriterias.length >0){
				criteriaStr = this.getCriteriaString(this.props.currentSearchedCriterias)
			}
			common_msg = <p style={{fontWeight:'bold'}} className="cancel-appointment-head">Book
						<span className="fw-500 text-capitalize"> {criteriaStr}</span> <br/>
						at the Lowest Prices!
					</p>
			// else if(this.props.selectedCriterias && this.props.selectedCriterias.length>0){
			// 	criteriaStr = this.getCriteriaString(this.props.selectedCriterias)
			// }
		}else if(this.props.is_opd){
			if(this.props.commonSelectedCriterias && this.props.commonSelectedCriterias.length >0){
				criteriaStr = this.getDocCriteriaString(this.props.commonSelectedCriterias)
			}
			common_msg = <p style={{fontWeight:'bold'}} className="cancel-appointment-head">Book
						<span className="fw-500 text-capitalize"> {criteriaStr}</span> <br/>
						appointment at the Lowest Prices!
					</p>
		}else if(this.props.is_dpp){
			criteriaStr = this.props.DOCTORS[this.props.doctor_id].display_name
			common_msg = <p style={{fontWeight:'bold'}} className="cancel-appointment-head">Appointment at
						<span className="fw-500 text-capitalize"> {criteriaStr}</span> <br/>
						at the Lowest Price!
					</p>
		}else if(this.props.is_hpp){
			let { hospital_data } = this.props
		    if(hospital_data) {
		    	criteriaStr = hospital_data.name
		    }
		    common_msg = <p style={{fontWeight:'bold'}} className="cancel-appointment-head">Appointment with
						<span className="fw-500 text-capitalize"> {criteriaStr}</span> <br/>
						at the Lowest Price!
					</p>
		}
			return (

				<div className="booking-help-modal">
					<div className="cancel-overlay"></div>
					<div className="widget cancel-appointment-div cancel-popup">
						<div className="widget-header text-center action-screen-header">
							{common_msg}
							{
								this.props.is_force == 1?
									<a href="#" onClick={this.props.closeIpdLeadPopup.bind(this,true)} className="close-times-icon">&times;</a>
								:''
							}
						</div>
						<div className="col-sm-12 pd-10">
							{
							this.props.is_opd || this.props.is_dpp || this.props.is_hpp? 
							<React.Fragment>
								<p className="fw-500 d-flex align-item-center mb-2" style={{fontSize:14}}>
									<img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'}/> 
									<span>Lowest Price Guarantee</span>
								</p>
								<p className="fw-500 d-flex align-item-center mb-2" style={{fontSize:14}}>
									<img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'}/> 
									<span>Hassle Free Appointment</span>
								</p>
								<p className="fw-500 d-flex align-item-center mb-2" style={{fontSize:14}}>
									<img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'}/> 
									<span>No Registration Fee</span>
								</p>
								<p className="fw-500 d-flex align-item-center mb-2" style={{fontSize:14}}>
									<img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'}/> 
									<span>Free Cancellation</span>
								</p>
							</React.Fragment>
							:<React.Fragment>
								<p className="fw-500 d-flex align-item-center mb-2" style={{fontSize:14}}>
									<img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'}/> 
									<span>Free  Lab Report Review from Doctors</span>
								</p>
								<p className="fw-500 d-flex align-item-center mb-2" style={{fontSize:14}}>
									<img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'}/> 
									<span>Lowest Price Guarantee</span>
								</p>
								<p className="fw-500 d-flex align-item-center mb-2" style={{fontSize:14}}>
									<img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'}/> 
									<span>Free Home Sample Collection</span>
								</p>
							</React.Fragment>
							}
						</div>
						<div className="clearfix"></div>	
						<div className="col-sm-12 pd-10 d-flex justify-content-center align-item-center flex-column" style={{margin:"0px 0px 6px"}}>
							<form className="col-sm-12 pd-0">
								<div className="labelWrap mb-0">
									<input type="number" placeholder="Enter your mobile number" onChange={this.onChangeHandler.bind(this)}/>
								</div>
							</form>
							<p className="fw-500 col-sm-12 p-0 mr-t-5" style={{fontSize:11, fontStyle:'italic'}}>*Your booking details will be sent to this number</p>
						</div>
						<div className="payment-content-btn text-center m-0 pd-10 pt-0">
							<button className="fw-500 text-white" style={{backgroundImage: "linear-gradient(to top, #f78631, #ff6d00)"}} onClick={this.submitLead.bind(this)}>Submit</button>
						</div>
					</div>
				</div>
			)
	}
}

export default NonIpdPopupView