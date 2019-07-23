import React from 'react'
import SnackBar from 'node-snackbar'

class VerifyEmail extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
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
			this.setState({email:this.props.email,oldEmail:this.props.email, initialStage:false})	
		}
	}

	componentDidMount(){
		if(this.state.initialStage && this.props.email !=''){
			this.setState({email:this.props.email,oldEmail:this.props.email, initialStage:false})	
		}	
	}
	
	handleEndoresmentEmail(event) {
		let oldEmail
		if (this.props.is_endorsement && this.props.user_data && this.props.user_data.length > 0) {
			oldEmail = this.props.user_data[0].email
		}else{
			oldEmail = this.state.oldEmail
		}
		this.setState({email:event.target.value},()=>{
			if(oldEmail !== this.state.email){
				let validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				validEmail = validEmail.test(this.state.email)
				if (validEmail) {	
					this.setState({VerifyEmails:true})
					if(this.props.is_endorsement){
						this.props.handleSubmit(false,true)
					}else{
						this.props.verifyEndorsementEmail(this.state.email,false,true)
					}
				}
			}else{
				this.props.verifyEndorsementEmail(this.state.email,false,false)
				this.setState({VerifyEmails:false})
			}
			if(this.state.email == ''){
				this.setState({VerifyEmails:false})
				if(this.props.is_endorsement){
					this.props.handleSubmit(false,true)	
				}else{
					this.props.verifyEndorsementEmail(this.state.email,false,true)
				}
			}
		})
	}

	VerifyEmail(resendFlag){
		if(resendFlag){
			this.setState({otpTimeout:false,otpValue:'' })
		}
		let data={}
        if (this.props.is_endorsement && this.props.user_data && this.props.user_data.length > 0) {
			data.profile = this.props.user_data[0].profile
		}else{
			data.profile = this.props.member_id.id
		}
		let validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (this.state.email != '') {			
			validEmail = validEmail.test(this.state.email)
			if (validEmail) {
				data.email= this.state.email	
				this.props.sendOtpOnEmail(data, (resp) => {        
	            	if(resp && resp.id){
		            	this.setState({emailSuccessId:resp.id, showOtp: true, otpTimeout: false })
		            	if(this.props.is_endorsement){
		            		this.props.handleSubmit(false,true)
		            	}
		                setTimeout(() => {
		                    this.setState({ otpTimeout: true })
		                }, 10000)
		                SnackBar.show({ pos: 'bottom-center', text: "OTP has been sent successfuly to your new email."})
		            }else {
		            	this.setState({showOtp: false, otpTimeout: false })
		            	SnackBar.show({ pos: 'bottom-center', text: resp.message })
		            }
		        })
			} else {
				this.setState({VerifyEmails:false})
				if(!this.props.is_endorsement){
					this.props.verifyEndorsementEmail(this.state.email,false,true)
				}
				SnackBar.show({ pos: 'bottom-center', text: "Please Enter valid Email" });
			}
		}else {
				this.setState({VerifyEmails:false})
				SnackBar.show({ pos: 'bottom-center', text: "Please Enter valid Email" });
		}
	}

	setOtp(event){
		this.setState({otpValue: event.target.value})
	}
	submitOtp(){
		let data={}
		data.id = this.state.emailSuccessId
		if (this.props.is_endorsement && this.props.user_data && this.props.user_data.length > 0) {
			data.profile = this.props.user_data[0].profile
		}else{
			data.profile = this.props.member_id.id
		}
		data.otp = parseInt(this.state.otpValue)
		if(this.props.is_endorsement){
			data.process_immediately = false
		}else{
			data.process_immediately = true
		}
		this.props.submitEmailOTP(data,(resp, error) =>{
			if(resp){
		        this.props.verifyEndorsementEmail(this.state.email,true,false)
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
			<div className={`col-12 mrt-10 ${this.props.is_endorsement?'': 'ins-fmpage-input'}`} onClick={(e)=>{e.stopPropagation()
				e.preventDefault()
			}}>
				<div className={this.state.showOtp?'ins-email-cont':''}>
					<div className={`ins-form-group ${this.state.showOtp?'mb-0':''}`}>
						<input 
							type="text" 
							id={`emails_${this.props.member_id.id}`} 
							className={`form-control ins-form-control ${this.props.validateErrors && this.props.is_endorsement && this.props.validateErrors.indexOf('email') > -1 ? 'fill-error': ''} ${this.props.isEmailError?'errorColorBorder':''}`} required 
							autoComplete="email" 
							name="email" 
							data-param='email' 
							value={this.state.email} 
							onChange={this.handleEndoresmentEmail.bind(this)} 
							onBlur={this.handleEndoresmentEmail.bind(this)} 
						/>
						<label className="form-control-placeholder datePickerLabel" htmlFor="statick"><span className="labelDot"></span>Email</label>
						<img src={ASSETS_BASE_URL + "/img/mail-01.svg"} />
						{
							this.state.VerifyEmails?
								<span className="vrfy-edit" onClick={this.VerifyEmail.bind(this, false)}>Verify now</span>
							:''
						}
					</div>
					{
						this.state.showOtp && this.state.VerifyEmails?
						<div className="ins-otp-mail-cont">
							<p className="ins-em-otp">An OTP has been sent to your email address</p>
							<div className="em-ins-inp-cont">
								<input type="number" className="em-ins-inpu" placeholder="Enter OTP" onChange={this.setOtp.bind(this)} value={this.state.otpValue} />
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