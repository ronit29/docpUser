import React from 'react'
import SnackBar from 'node-snackbar'

class VerifyEmail extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: this.props.email,
			oldEmail:'',
			VerifyEmails:false,
			showOtp:false,
			otpTimeout:false,
			initialStage:true,
			otpValue:'',
			emailSuccessId:''
		}
	}
	
	componentWillReceiveProps(props) {
		if(this.state.initialStage && this.props.email !=''){
			this.setState({email:this.props.email, initialStage:false})	
		}
	}

	handleEndoresmentEmail(event) {
		let oldEmail
		if (this.props.user_data && this.props.user_data.length > 0) {
			oldEmail = this.props.user_data[0].email
		}
		this.setState({'email':event.target.value},()=>{

			if (this.state.email != '') {
				let validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				validEmail = validEmail.test(this.state.email);
				if (validEmail) {
					if(oldEmail !== this.state.email){
						this.setState({VerifyEmails:true})
					}	
					this.props.handleSubmit(false,true)
				} else {
					this.setState({VerifyEmails:false})
					SnackBar.show({ pos: 'bottom-center', text: "Please Enter valid Email" });
				}
			}
		})
	}

	VerifyEmail(resendFlag){
		if(resendFlag){
			this.setState({otpTimeout:false,otpValue:'' })
		}
        let data={}
        if (this.props.user_data && this.props.user_data.length > 0) {
			data.profile = this.props.user_data[0].profile
		}
		data.email= this.state.email
		this.props.sendOtpOnEmail(data, (resp) => {
            if (!resp) {
                this.setState({ validationError: "Could not generate OTP." })
            } else {
            	if(resp && resp.id){
	            	this.setState({emailSuccessId:resp.id, showOtp: true, otpTimeout: false })
	                setTimeout(() => {
	                    this.setState({ otpTimeout: true })
	                }, 10000)
	            }
            }
        })
	}

	setOtp(event){
		this.setState({otpValue: event.target.value})
	}
	submitOtp(){
		let data={}
		data.id = this.state.emailSuccessId
		if (this.props.user_data && this.props.user_data.length > 0) {
			data.profile = this.props.user_data[0].profile
		}
		data.otp = this.state.otpValue
		data.process_immediately = false
		this.props.submitEmailOTP(data,(resp) =>{
			if(resp && resp.success){
				this.props.verifyEndorsementEmail()
				this.setState({VerifyEmails:false,showOtp:false,otpTimeout:false,otpValue:'',emailSuccessId:''})
				SnackBar.show({ pos: 'bottom-center', text: resp.message });
			}else{
				SnackBar.show({ pos: 'bottom-center', text: resp.message });
			}
		})
	}
	render() {
		let self = this
		
		return (
			<div className="col-12 mrt-10">
				<div className="ins-email-cont">
					<div className="ins-form-group mb-0">
						<input type="text" id="statick" id={`emails_${this.props.member_id}`} className={`form-control ins-form-control ${this.props.validateErrors.indexOf('email') > -1 ? 'fill-error' : ''}`} required autoComplete="email" name="email" data-param='email' value={this.state.email} onChange={this.handleEndoresmentEmail.bind(this)} onBlur={this.handleEndoresmentEmail.bind(this)} />
						<label className="form-control-placeholder datePickerLabel" htmlFor="statick"><span className="labelDot"></span>Email</label>
						<img src={ASSETS_BASE_URL + "/img/mail-01.svg"} />
						{
							this.state.VerifyEmails?
								<span className="vrfy-edit" onClick={this.VerifyEmail.bind(this, false)}>Verify now</span>
							:''
						}
					</div>
					{
						this.state.showOtp?
						<div className="ins-otp-mail-cont">
							<p className="ins-em-otp">An OTP has been sent to your email address</p>
							<div className="em-ins-inp-cont">
								<input className="em-ins-inpu" onChange={this.setOtp.bind(this)} value={this.state.otpValue} />
								{
									this.state.otpValue.length ==6?
										<button onClick={this.submitOtp.bind(this)}>Submit</button>
									:''
								}
							</div>
							{
								this.state.otpTimeout?
								<span className="rdsn-ipt-md" onClick={this.VerifyEmail.bind(this,true)}>Resend</span>
								:''
							}
							
						</div>
						:''
					}
				</div>
			</div>
		)
	}

}

export default VerifyEmail