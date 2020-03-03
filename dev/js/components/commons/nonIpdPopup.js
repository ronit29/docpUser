import React from 'react'
import SnackBar from 'node-snackbar'
import InitialsPicture from '../commons/initialsPicture'


class NonIpdPopupView extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			phone_number: null
		}
	}

	componentDidMount() {


	}

	onChangeHandler(event) {
		this.setState({ phone_number: event.target.value })
	}

	submitLead() {
		if (this.state.phone_number) {
			if (this.state.phone_number.length < 10) {
				SnackBar.show({ pos: 'bottom-center', text: "Please Enter Valid phone number" })
				return
			} else if (this.state.phone_number.length > 10) {
				SnackBar.show({ pos: 'bottom-center', text: "Please Enter Valid phone number" })
				return
			} else {
				this.props.nonIpdLeads(this.state.phone_number)
				SnackBar.show({ pos: 'bottom-center', text: "Your request has been submited" })
				if(this.props.is_organic){
					let callBackUrl = this.props.history.location.pathname + '/booking'+this.props.history.location.search +'&doctor_id='+this.props.doctor_id+'&hospital_id='+this.props.hospital_id
					this.props.history.push('/vip-gold-details?is_gold=true&source=desktop-submenu-gold-clicked&lead_source=Docprime&fromOrganic=true&callBackUrl='+callBackUrl)
				}
			}
		} else {
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
		var thumbnail = null;
		let is_license_verified = false;

		let common_msg = <p style={{ fontWeight: 'bold' ,textAlign:'center'}} className="cancel-appointment-head">Book
										<span className="fw-500 text-capitalize"> {criteriaStr}</span> <br />
			at the Lowest Prices!
									</p>
		if (this.props.is_lab) {
			if (this.props.currentSearchedCriterias && this.props.currentSearchedCriterias.length > 0) {
				criteriaStr = this.getCriteriaString(this.props.currentSearchedCriterias)
			}
			common_msg = <p style={{ fontWeight: 'bold',textAlign:'center' }} className="cancel-appointment-head">Book
						<span className="fw-500 text-capitalize"> {criteriaStr}</span> <br />
				at the Lowest Prices!
					</p>
			// else if(this.props.selectedCriterias && this.props.selectedCriterias.length>0){
			// 	criteriaStr = this.getCriteriaString(this.props.selectedCriterias)
			// }
		} else if (this.props.is_opd) {
			if (this.props.commonSelectedCriterias && this.props.commonSelectedCriterias.length > 0) {
				criteriaStr = this.getDocCriteriaString(this.props.commonSelectedCriterias)
			}
			common_msg = <p style={{ fontWeight: 'bold',textAlign:'center' }} className="cancel-appointment-head">Book Appointment with <br />
				<span className="fw-500 text-capitalize"> {criteriaStr}</span>
			</p>
		} else if (this.props.is_dpp || this.props.is_booking || this.props.is_organic) {
			if (this.props && this.props.DOCTORS && Object.keys(this.props.DOCTORS).length && this.props.doctor_id) {
				criteriaStr = this.props.DOCTORS[this.props.doctor_id].display_name
				thumbnail = this.props.DOCTORS[this.props.doctor_id].thumbnail
				is_license_verified = this.props.DOCTORS[this.props.doctor_id].is_license_verified
			}
			common_msg = <div className="docImg-Popup">
				{/*	<div className="fltr-crd-img text-center doc-img-popupSection">
					<div>
						<img src={thumbnail} alt="" />
					</div>
					<span className="fltr-rtng">Verified</span>
				</div>*/}
				{
					thumbnail ?
						<div className="doc-img-popupSection">
							<InitialsPicture name={criteriaStr} has_image={!!thumbnail} className="initialsPicture-dp ">
								<img src={thumbnail} className="img-fluid img-round" alt={`${criteriaStr}`} title={criteriaStr} />
							</InitialsPicture>
							{is_license_verified ? <span className="fltr-rtng">Verified</span> : ''}
						</div>
						: ''}						
				{
					this.props.is_organic?<p style={{ fontWeight: 'bold' }} className="cancel-appointment-head">
						Book Appointment with
						<br />
						{criteriaStr}
						{/* <span className="fw-500 text-capitalize"> India’s Best Healthcare Membership</span> */}
					</p>
					:<p style={{ fontWeight: 'bold' }} className="cancel-appointment-head">Book Appointment with <br />
						<span className="fw-500 text-capitalize"> {criteriaStr}</span>
					</p>

				}
			</div>
		} else if (this.props.is_hpp) {
			let { hospital_data } = this.props
			if (hospital_data) {
				criteriaStr = hospital_data.name
			}
			common_msg = <p style={{ fontWeight: 'bold',textAlign:'center' }} className="cancel-appointment-head">Book Appointment at <br />
				<span className="fw-500 text-capitalize"> {criteriaStr}</span>
			</p>
		}else if(this.props.is_package){
			if(this.props.packagesList && this.props.packagesList.result && this.props.packagesList.result.length == 1){
				criteriaStr = this.props.packagesList.result[0].name
	        }
	        common_msg = <p style={{ fontWeight: 'bold' ,textAlign:'center'}} className="cancel-appointment-head">Book
										<span className="fw-500 text-capitalize"> {criteriaStr}</span> <br /> at the Lowest Prices!
						</p>
		}
		return (

			<div className="booking-help-modal">
				<div className="cancel-overlay"></div>
				<div className="widget cancel-appointment-div cancel-popup">
					<div className="widget-header text-center action-screen-header">
						{common_msg}
						{
							this.props.is_force == 1  /*|| this.props.is_organic*/?
								<a href="#" onClick={this.props.closeIpdLeadPopup.bind(this, true)} className="close-times-icon">&times;</a>
								: ''
						}
					</div>
					{
						this.props.is_organic?
						<div className="gold-wdgt-text-strip">
							<p>Save 6000+/yr by availing exclusive benefits with Docprime Gold </p>
						</div>
						:''
					}
					<div className="col-sm-12 pd-10">
						{
							this.props.is_opd || this.props.is_dpp || this.props.is_hpp || this.props.is_booking?
								<React.Fragment>
									<p className="fw-500 d-flex align-item-center mb-2" style={{ fontSize: 14 }}>
										<img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'} />
										<span>Save up to 50% on Fees</span>
									</p>
									<p className="fw-500 d-flex align-item-center mb-2" style={{ fontSize: 14 }}>
										<img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'} />
										<span>Instant Confirmation for Free</span>
									</p>
									<p className="fw-500 d-flex align-item-center mb-2" style={{ fontSize: 14 }}>
										<img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'} />
										<span>View Doctor Availability</span>
									</p>
									{/* <p className="fw-500 d-flex align-item-center mb-2" style={{ fontSize: 14 }}>
										<img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'} />
										<span>Free Cancellation</span>
									</p> */}
								</React.Fragment>
								:this.props.is_organic?
								<React.Fragment>
									<p className="fw-500 d-flex align-item-center mb-2" style={{ fontSize: 14 }}>
										<img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'} />
										<span>Special Prices on Doctor and Lab Tests</span>
									</p>
									<p className="fw-500 d-flex align-item-center mb-2" style={{ fontSize: 14 }}>
										<img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'} />
										<span>23% OFF on Medicines</span>
									</p>
									<p className="fw-500 d-flex align-item-center mb-2" style={{ fontSize: 14 }}>
										<img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'} />
										<span>Covers Full Family of 6 Members</span>
									</p>
								</React.Fragment>
								: <React.Fragment>
									<p className="fw-500 d-flex align-item-center mb-2" style={{ fontSize: 14 }}>
										<img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'} />
										<span>Free  Lab Report Review from Doctors</span>
									</p>
									<p className="fw-500 d-flex align-item-center mb-2" style={{ fontSize: 14 }}>
										<img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'} />
										<span>Lowest Price Guarantee</span>
									</p>
									<p className="fw-500 d-flex align-item-center mb-2" style={{ fontSize: 14 }}>
										<img className="ipd-pop-tick" src={ASSETS_BASE_URL + '/images/tick.png'} />
										<span>Free Home Sample Collection</span>
									</p>
								</React.Fragment>
						}
					</div>
					<div className="clearfix"></div>
					<div className="col-sm-12 pd-10 d-flex justify-content-center align-item-center flex-column" style={{ margin: "0px 0px 6px" }}>
						<form className="col-sm-12 pd-0">
							<div className="labelWrap mb-0">
								<input className="fs-12" type="number" placeholder="Please enter your mobile number to continue" onChange={this.onChangeHandler.bind(this)} />
							</div>
						</form>
						<p className="fw-500 col-sm-12 p-0 mr-t-5" style={{ fontSize: 11, fontStyle: 'italic' }}>*Your booking details will be sent to this number</p>
					</div>
					<div className="payment-content-btn text-center m-0 pd-10 pt-0">
						<button className="fw-500 text-white pop-subText" onClick={this.submitLead.bind(this)}><p className="fw-500">{`${this.props.is_organic?'Book Appointment at Discounted Price':'Book Appointment'}`}</p>
							{this.props.is_organic?'':<span >No Service Fee</span>}
						</button>
					</div>
					<div className="popUp-whtsappEnable">
						<div className="whtsappEnable-container">
							<p className="wtsapp-chk-txt"><img className="img-fluid" src={ASSETS_BASE_URL + '/img/customer-icons/tick.svg'}/> Enable Whatsapp for seamless communication</p>
							<p className="text-center fw-500" style={{ fontSize: 9, color: '#8a8a8a' }} >By proceeding, you hereby agree to the <a href="/terms" target="_blank" style={{ color: `var(--text--primary--color)` }} >End User Agreement</a> and <a href="/privacy" target="_blank" style={{ color: `var(--text--primary--color)` }} >Privacy Policy.</a></p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default NonIpdPopupView