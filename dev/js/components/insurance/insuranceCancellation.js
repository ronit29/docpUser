import React from 'react'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import ChatPanel from '../../components/commons/ChatPanel'
import Loader from '../commons/Loader'
import SnackBar from 'node-snackbar'

class InsuranceCancellationView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showCancelPopup: false,
			showCancelSection:true,
			cancelReason:'',
			otp: "",
			opt_verified:false,
			phoneNumber:'',
			validationError:'',
			error_message:'',
			isOtpEdit:true
		}
	}

	getGetOrdinal(n) {
		var s = ["th", "st", "nd", "rd"],
			v = n % 100;
		return n + (s[(v - 20) % 10] || s[v] || s[0]);
	}

	cancelPolicy() {
		this.submitOTPRequest(this.props,true,false) // to submit otp request
		this.setState({ showCancelPopup: true })
	}

	submitOTPRequest(props,viaSms,viaWhatsapp) {
		let number
		if(props.data){
			number = props.data.phone_number
		}
        if (number && number.match(/^[56789]{1}[0-9]{9}$/)) {
            this.setState({ validationError: "" ,phoneNumber:number})
            this.props.sendOTP(number,viaSms,viaWhatsapp,'insurance-cancel', (error) => { // to submit otp request
                if (error) {
                    this.setState({ validationError: "Could not generate OTP." })
                } else {
                    // let data = {'Category': 'ConsumerApp', 'Action': 'InsuranceLoginPopupContinue', 'CustomerID': GTM.getUserId() || '', 'event': 'Insurance-login-popup-continue-click', 'mode':viaSms?'viaSms':viaWhatsapp?'viaWhatsapp':'', 'mobileNo':this.state.phoneNumber 
                    //     }
                    // GTM.sendEvent({ data: data })
                    this.setState({ showOTP: true})
                    // this.setState({ showOTP: true, otpTimeout: true,smsBtnType:viaSms?true:false })
                    // setTimeout(() => {
                    //     this.setState({ otpTimeout: false })
                    // }, 10000)
                }
            })
        } else {
            this.setState({ validationError: "Please provide a valid number (10 digits)" })
        }
    }

    handleChange(event) {
		this.setState({otp : event.target.value},()=>{
			if(this.state.otp.length == 6){
				this.setState({isOtpEdit:false})
				this.verifyOTP() // to verify user entered otp
			}
		})
  	}

    verifyOTP() {
        let self = this
        if (this.state.phoneNumber.match(/^[56789]{1}[0-9]{9}$/)) {
			this.setState({ validationError: "" })
			let extraParamsData = {}
            this.props.submitOTP(this.state.phoneNumber, this.state.otp, extraParamsData, (exists) => { // to verify user entered otp
                if(exists.code == 'invalid'){
                    this.setState({error_message:exists.message,otp:'',isOtpEdit:true})
                    SnackBar.show({ pos: 'bottom-center', text: exists.message})
                }else{
                    // let data = {'Category': 'ConsumerApp', 'Action': 'InsuranceLoginPopupOptVerified', 'CustomerID': GTM.getUserId() || '', 'event': 'Insurance-login-popup-opt-verified'
                    //     }
                    // GTM.sendEvent({ data: data })
                      this.setState({opt_verified:true})                  
                }    
                   
            })
        } else {
            this.setState({ validationError: "Please provide a valid number (10 digits)" })
        }
    }

	clickPopUp(type) {
		if (type == 1) {
			if(this.state.cancelReason != '' && this.state.opt_verified){
				this.props.cancelReason(this.state.cancelReason) // ask cancellation reason
				this.props.history.push('/insurance/canceldetails')
			}else{
				if(this.state.cancelReason == ''){
					SnackBar.show({ pos: 'bottom-center', text: "Please provide cancel Reason" });
				}else if(!this.state.opt_verified){
					SnackBar.show({ pos: 'bottom-center', text: "Please enter otp" });
				}
			}
			// this.props.cancelInsurance(resp => {
			// 	if (resp.success) {
			// 		this.setState({ showCancelPopup: false, showCancelSection:false })
			// 	} else {
			// 		this.setState({ showCancelPopup: false })
			// 	}
			// })
		} else {
			this.setState({otp: "",opt_verified:false,phoneNumber:'',validationError:'',error_message:'',isOtpEdit:true})
			this.setState({ showCancelPopup: false})
		}
	}

	inputHandler(e) {
        this.setState({ cancelReason: e.target.value })

    }

	render() {	
		if (this.props.data) {
			var purchase_date = new Date(this.props.data.purchase_date)
			let purchase_time = purchase_date.toTimeString()
			let purchaseTime = purchase_time.split(" ")
			purchase_date = purchase_date.toDateString()
			let purchaseDate = purchase_date.split(" ")
			let expiry_date = new Date(this.props.data.expiry_date)
			let expiry_time = expiry_date.toTimeString()
			let expiryTime = expiry_time.split(" ")
			expiry_date = expiry_date.toDateString()
			let expiryDate = expiry_date.split(" ")
			return <div className="profile-body-wrap" style={{ paddingBottom: 80 }} >
				<ProfileHeader showPackageStrip={true}/>
				{this.state.showCancelPopup ?
					<div className="search-el-popup-overlay " >
						<div className="search-el-popup">
							<div className="widget">
								<div className="widget-content padiing-srch-el">
									<p className="srch-el-conent">Are you sure you want to cancel your policy?</p>
									<form className="go-bottom mrt-20" style={{padding:'0 15px'}}>
										<p className="digi-heading">Enter 6 digit OTP sent to your mobile number ending with xxxxxxx{this.props.data && this.props.data.phone_number?this.props.data.phone_number.slice(7, 10):''}</p>
										<div className="cancel-input-num">
											<input placeholder="Enter OTP" onChange={this.handleChange.bind(this)} value={this.state.otp} type="number" disabled={this.state.otp.length == 6?true:false} style={{border:this.state.error_message !=''?'1px solid #ff0000':'none'}}/>
											{
											this.state.isOtpEdit?
											<React.Fragment>
												<span className="vrfy-via-num" onClick={this.submitOTPRequest.bind(this,this.props,false,true)}>Verify via WhatsApp</span>
												<span className="cancl-rsnd-clk" onClick={this.submitOTPRequest.bind(this,this.props,true,false)}>Resend</span>
											</React.Fragment>
												:''
											}
										</div>
										<div className="labelWrap" style={{marginBottom:0}}>
											<textarea id="Accname" name="name" type="text" onChange={this.inputHandler.bind(this)} value={this.state.cancelReason} required ref="name" style={{backgroundColor:'#f7f7f7'}} autoComplete="first_name" rows="3" className="insurance-textarea" placeholder="Write a reason for cancellation">
											</textarea>
										</div>
									</form>
									<div className="search-el-btn-container">
										<button onClick={this.clickPopUp.bind(this, 1)}>Yes</button>
										{/* <span className="src-el-btn-border"></span> */}
										<button onClick={this.clickPopUp.bind(this, 2)}>No</button>
									</div>
								</div>
							</div>

						</div>

					</div>
					: ''
				}
				{this.state.showCancelSection?
					<section className="container parent-section book-appointment-section container-top-margin">
					<div className="row main-row parent-section-row">
						<div className="col-12 col-md-7 col-lg-7">
							<section className="profile-book-screen">
								<div className="widget">
									<div className="widget-content">
										<div className="ins-flex mrb-20">
											<img width="100" src="https://qacdn.docprime.com/media/insurer/images/apllogo.png" />
											<p className="fw-500">Group Out-patient Insurance</p>
											<div style={{ flexGrow: '0', flexShrink: '0' }}>
												<img width="30" src={ASSETS_BASE_URL + "/img/chk-green.svg"} style={{ verticalAlign: '-31px' }} />
												<span className="fw-500" style={{ color: '#4fc243', verticalAlign: '-21px' }} >Active</span>
											</div>
										</div>
									</div>
									<div className="ins-flex justify-content-between ins-date-row mrb-0">
										<div className="ins-date text-center">
											<p className="fw-500 mrb-5">Policy issue Date</p>
											<p className="fw-700">{`${this.getGetOrdinal(purchaseDate[2])} ${purchaseDate[1]} ${purchaseDate[3]}`}</p> 
										</div>
										<div className="ins-date text-center">
											<p className="fw-500 mrb-5">Policy expiry Date</p>
											<p className="fw-700">{`${this.getGetOrdinal(expiryDate[2])} ${expiryDate[1]} ${expiryDate[3]}`}</p>
										</div>
										<div className="ins-date text-center">
											<p className="fw-500 mrb-5">Policy Number</p>
											<p className="fw-700">{this.props.data.policy_number}</p>
										</div>
									</div>
									<div className="widget-content">
										<h5 className="fw-500">Cancellation policy</h5>
										<div className="ins-cancel-table">
											<table className="table">
												<tbody>
													{this.props.data.cancel_master && this.props.data.cancel_master.length >0?
														Object.entries(this.props.data.cancel_master).map(function ([key, value]) {
															return <tr>
																	<td >{value.refund_percentage}% Refund</td>
																	<td className="fw-500">{value.max_days} days from Policy date</td>
																</tr>
														})
														:''
													}
													<tr>
														<td >No Refund</td>
														<td className="fw-500">Atleast 1 completed Claim</td>
													</tr>
												</tbody>
											</table>
										</div>
										<p>On cancellation of policy all your active appointments will also be cancelled</p>
									</div>
								</div>
							</section>
							<a className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn text-center" style={{ color: "#ffffff" }} onClick={this.cancelPolicy.bind(this)}>Cancel Policy
								</a>
						</div>
						<ChatPanel />
					</div>
					</section>
				:
					<section className="container parent-section book-appointment-section container-top-margin">
						<div className="row main-row parent-section-row">
							<div className="col-12 col-md-7 col-lg-7">
								<section className="profile-book-screen">
									<div className="widget-content mrb-10">
										<p className="fw-500 text-center">
											Your Policy DPHEALTHOPD12345 cancellation request has been initiated
										</p>
									</div>
									<div className="widget mrb-10">
										<div className="widget-content">
											<p className="mrb-10">Our team will get in touch with you shortly</p>
											<p> An email and sms has been sent to your registered email id and mobile number regarding the same </p>
										</div>
									</div>
									<div className="widget mrb-10">
										<div className="widget-content">
											<p> For any other query you contact us at </p>
											<p className="fw-500">1800-123-9419 </p>
											<p className="fw-500"> customercare@docprime.com</p>
										</div>
									</div>
								</section>
							</div>
						</div>
					</section>
				}
			</div>
		} else {
			return <div className="profile-body-wrap" style={{ paddingBottom: 80 }} >
				<ProfileHeader showPackageStrip={true}/>
				<Loader />
			</div>
		}

	}
}

export default InsuranceCancellationView    