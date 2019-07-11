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
			otpValue:''
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
					this.props.handleSubmit(false)
				} else {
					this.setState({VerifyEmails:false})
					SnackBar.show({ pos: 'bottom-center', text: "Please Enter valid Email" });
				}
			}
		})
	}

	VerifyEmail(){
        this.setState({ showOtp: true, otpTimeout: false })
        setTimeout(() => {
            this.setState({ otpTimeout: true })
        }, 10000)

		//this.props.sendEmailOtp(this.state.email, (error) => {
            // if (error) {
            //     // this.setState({ validationError: "Could not generate OTP." })
            // } else {
            //     this.setState({ showOTP: true, otpTimeout: false })
            //     setTimeout(() => {
            //         this.setState({ otpTimeout: true })
            //     }, 10000)
            // }
        // })
	}

	setOtp(event){
		this.setState({otpValue: event.target.value})
	}
	submitOtp(){
		this.props.submitEmailOTP(this.state.otpValue,(error) =>{
			if(error){

			}else{
				this.props.verifyEndorsementEmail()
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
								<span className="vrfy-edit" onClick={this.VerifyEmail.bind(this, 'email')}>Verify now</span>
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
									this.state.otpValue.length >=5?
										<button onClick={this.submitOtp.bind(this)}>Submit</button>
									:''
								}
							</div>
							{
								this.state.otpTimeout?
								<span className="rdsn-ipt-md">Resend</span>
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