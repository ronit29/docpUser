import React from 'react'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import ChatPanel from '../../components/commons/ChatPanel'
import Loader from '../commons/Loader'

class InsuranceCancellationView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showCancelPopup: false,
			showCancelSection: true,
			name:'',
			bankName:'',
			address:'',
			accountNumber:'',
			ifscCode:'',
			err:''
		}
	}

	componentDidMount() {
        this.setState({ ...this.props.insurer_bank_details })
    }

	getGetOrdinal(n) {
		var s = ["th", "st", "nd", "rd"],
			v = n % 100;
		return n + (s[(v - 20) % 10] || s[v] || s[0]);
	}

	cancelPolicy() {
		this.setState({ showCancelPopup: true })
	}

	clickPopUp(type) {
		if (type == 1) {
			this.props.history.push('/insurance/canceldetails')
			// this.props.cancelInsurance(resp => {
			// 	if (resp.success) {
			// 		this.setState({ showCancelPopup: false, showCancelSection:false })
			// 	} else {
			// 		this.setState({ showCancelPopup: false })
			// 	}
			// })
		} else {
			this.setState({ showCancelPopup: false })
		}
	}

	inputHandler(e) {
        this.setState({ [e.target.name]: e.target.value })

    }

	submitForm() {
        this.setState({ err: "" })
        // validate
        let register = true
        Object.keys(this.refs).forEach((prp, i) => {
            let validated = false
            switch (this.refs[prp].name) {
                case "name": {
                	console.log(this.refs[prp].value)
                    if (!this.refs[prp].value) {
                        validated = false
                    } else {
                        validated = !/[^a-zA-Z ]/.test(this.refs[prp].value)
                    }
                    break
                }
                case "accountNumber": {
                    if (!this.refs[prp].value) {
                        validated = this.refs[prp].value.match(/^[56789]{1}[0-9]{9}$/)
                    } else {
                        validated = true
                    }
                    break
                }
                case "ifscCode": {
                    if (!this.refs[prp].value) {
                        validated = this.refs[prp].value.match(/^[56789]{1}[0-9]{9}$/)
                    } else {
                        validated = true
                    }
                    break
                }
                case "bankName": {
                    if (!this.refs[prp].value) {
                        validated = false
                    } else {
                        validated = !/[^a-zA-Z ]/.test(this.refs[prp].value)
                    }
                    break
                }
                case "address": {
                    if (!this.refs[prp].value) {
                        validated = false
                    } else {
                        validated = !/[^a-zA-Z ]/.test(this.refs[prp].value)
                    }
                    break
                }
                default: {
                    validated = true
                    break
                }
            }
            if (validated) {
                this.refs[prp].style.border = ''
            } else {
                this.refs[prp].style.border = '1px solid red'
                register = false
            }
        })
        

        if(register){
        	alert('a')
        }
    }

    handleEnterPress(e) {
        if (e.key === 'Enter') {
            this.submitForm();
        }
    }

    pickFile(){
    	
    }

    handleSubmit(){
    	this.props.saveUserBankDetails(this.state)
    }
    
	render() {
		return <div className="profile-body-wrap" style={{ paddingBottom: 80 }} >
			<ProfileHeader />
			<section className="container parent-section book-appointment-section container-top-margin">
				<div className="row main-row parent-section-row">
					<div className="col-12 col-md-7 col-lg-7">
						<section className="profile-book-screen">
							<div className="widget">
								<div className="widget-content">
									<h1 className="ins-cancl-heading">We need bank account details to proceed with your cancellation</h1>
									<div className="ins-cancl-container">

										<input className="ins-cn-inp" type="text" name="name" placeholder="Account Holder Name" onChange={this.inputHandler.bind(this)} value={this.state.name} required ref="name" onKeyPress={this.handleEnterPress.bind(this)}  onBlur={this.handleSubmit.bind(this)} style={{'textTransform': 'capitalize'}} />

										<input className="ins-cn-inp" type="text" name="bankName" placeholder="Bank Name" onChange={this.inputHandler.bind(this)} value={this.state.bankName} required ref="bankName" onKeyPress={this.handleEnterPress.bind(this)} onBlur={this.handleSubmit.bind(this)} style={{'textTransform': 'capitalize'}}/>

										<textarea className="ins-cn-textarea" name="address" placeholder="Address" onChange={this.inputHandler.bind(this)} value={this.state.address} required ref="address" onKeyPress={this.handleEnterPress.bind(this)} onBlur={this.handleSubmit.bind(this)} style={{'textTransform': 'capitalize'}}></textarea>

										<input className="ins-cn-inp" type="number" name="accountNumber" placeholder="Account Number" onChange={this.inputHandler.bind(this)} value={this.state.accountNumber} required ref="accountNumber" onKeyPress={this.handleEnterPress.bind(this)} onBlur={this.handleSubmit.bind(this)}  />

										<input className="ins-cn-inp" type="text" name="ifscCode" placeholder="IFSC Code" onChange={this.inputHandler.bind(this)} value={this.state.ifscCode} required ref="ifscCode" onKeyPress={this.handleEnterPress.bind(this)} onBlur={this.handleSubmit.bind(this)} style={{'textTransform': 'capitalize'}} pattern="[a-z]{1,15}"/>
									</div>
									<p className="ins-cancl-para">We need to confirm if this account belongs to you. Please fill more details below </p>
									<span className="ins-proof-upload-btn" onClick={() => {
				                        document.getElementById('imageFilePicker_').click()
				                        document.getElementById('imageFilePicker_').value = "" }}>
				                    	<img src={ASSETS_BASE_URL + "/img/ins-up-ico.svg"}/> Upload
				                        	<input type="file" style={{ display: 'none' }} id={`imageFilePicker_`} onChange={this.pickFile.bind(this)} accept="image/*"/>
				                    </span>
				                    <p className="ins-cancl-para">OR</p>
				                    <span className="ins-proof-upload-btn" onClick={() => {
				                        document.getElementById('imageFilePicker_').click()
				                        document.getElementById('imageFilePicker_').value = "" }}>
				                    	<img src={ASSETS_BASE_URL + "/img/ins-up-ico.svg"}/> Upload
				                        	<input type="file" style={{ display: 'none' }} id={`imageFilePicker_`} onChange={this.pickFile.bind(this)} accept="image/*"/>
				                    </span>
									{/*<p className="ins-cancl-para">We need to confirm if this account belongs to you. Please fill more details below </p>
									<button className="ins-cn-btn"><img src={ASSETS_BASE_URL + '/img/upld.png'} />Upload Cancelled Cheque</button>
									<p className="ins-cancl-para">OR</p>
									<button className="ins-cn-btn"><img src={ASSETS_BASE_URL + '/img/upld.png'} />Upload Account Statement</button>*/}
								</div>
							</div>
						</section>
						<button className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg static-btn" onClick={this.submitForm.bind(this)}>Submit</button>
					</div>
					<ChatPanel />
				</div>
			</section>
		</div>

	}
}

export default InsuranceCancellationView    