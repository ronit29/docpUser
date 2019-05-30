import React from 'react'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import ChatPanel from '../../components/commons/ChatPanel'
import Loader from '../commons/Loader'
const Compress = require('compress.js')
import SnackBar from 'node-snackbar'

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
			err:'',
			img_url:null,
			img_id:null,
			isLoading:false,
			policy_number:null
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
        	if(!this.state.img_url){
        		SnackBar.show({ pos: 'bottom-center', text: "Please upload required documents." });
        	}else{
        		let data={}
        		data.bank_name = this.state.bankName
				data.account_number = this.state.accountNumber
				data.account_holder_name = this.state.name
				data.ifsc_code = this.state.ifscCode
				data.bank_address = this.state.address
				data.image_ids = [{'document_image':this.state.img_id}]
	        	this.props.cancelInsurance(data,(resp)=> {
					if (resp.success) {
						this.setState({ policy_number:resp.policy_number,showCancelSection:false })
					}
				})
	        }
        }
    }

    handleEnterPress(e) {
        if (e.key === 'Enter') {
            this.submitForm();
        }
    }

    pickFile(e) {
        if (e.target.files && e.target.files[0]) {
            let file = e.target.files[0]
            if (e.target.files[0] && e.target.files[0].name.includes('.pdf')) {
                this.finishCrop(null, file)
            } else {
                const compress = new Compress()
                compress.compress([file], {
                    quality: 1,
                    maxWidth: 1000,
                    maxHeight: 1000,
                }).then((results) => {
                    const img1 = results[0]
                    const base64str = img1.data
                    const imgExt = img1.ext
                    const file = Compress.convertBase64ToFile(base64str, imgExt)
                    this.getBase64(file, (dataUrl) => {
                        this.finishCrop(dataUrl,null)
                        this.setState({ dataUrl })
                    })
                }).catch((e) => {
                    SnackBar.show({ pos: 'bottom-center', text: "Error uploading image." });
                })
            }
        }
    }

    getBase64(file, cb) {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
            cb(reader.result)
        }
        reader.onerror = function (error) {
            console.log('Error: ', error)
        }
    }

    finishCrop(dataUrl, member_id, file) {
        let file_blob_data
        if (dataUrl) {
            file_blob_data = this.dataURItoBlob(dataUrl)
        }
        let mem_data = {}
        let existingData
        let img_tag = "document_image"
        this.setState({
            dataUrl: null,isLoading:true
        }, () => {
            let form_data = new FormData()
            if (file) {
                form_data.append(img_tag, file, "imageFilename.pdf")
            } else {
                form_data.append(img_tag, file_blob_data, "imageFilename.jpeg")
            }
            this.props.uploadBankProof(form_data,'image', (data, err) => {
                if (data) {
                	this.setState({img_url:data.data.document_image,img_id:data.id,isLoading:false},()=>{
                		this.props.saveUserBankDetails(this.state)
                	})
                }
            })
        })
    }

    dataURItoBlob(dataURI) {
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
    }
    
    removeImage(img){
        this.setState({img_url:null,img_id:null},()=>{
        	this.props.saveUserBankDetails(this.state)
        })
    }

    handleSubmit(){
    	this.props.saveUserBankDetails(this.state)
    }
    
	render() {
		return <div className="profile-body-wrap" style={{ paddingBottom: 80 }} >
			<ProfileHeader />
			{this.state.showCancelSection?
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

											<textarea className="ins-cn-textarea" name="address" placeholder="Bank address" onChange={this.inputHandler.bind(this)} value={this.state.address} required ref="address" onKeyPress={this.handleEnterPress.bind(this)} onBlur={this.handleSubmit.bind(this)} style={{'textTransform': 'capitalize'}}></textarea>

											<input className="ins-cn-inp" type="number" name="accountNumber" placeholder="Account Number" onChange={this.inputHandler.bind(this)} value={this.state.accountNumber} required ref="accountNumber" onKeyPress={this.handleEnterPress.bind(this)} onBlur={this.handleSubmit.bind(this)}  />

											<input className="ins-cn-inp" type="text" name="ifscCode" placeholder="IFSC Code" onChange={this.inputHandler.bind(this)} value={this.state.ifscCode} required ref="ifscCode" onKeyPress={this.handleEnterPress.bind(this)} onBlur={this.handleSubmit.bind(this)} style={{'textTransform': 'capitalize'}} pattern="[a-z]{1,15}"/>
										</div>
										{this.state.img_url && this.state.img_id?
											<div className="ins-prf-img-grd">
		                                        <img className="img-fluid ins-up-img-ic" src={this.state.img_url} />
		                                        <img className="ins-prf-cls" onClick={this.removeImage.bind(this,this.state.img_url)} src="https://cdn.docprime.com/cp/assets/img/icons/close.png" />
		                                    </div>
										:<React.Fragment>
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
										</React.Fragment>
					                    }
									</div>
								</div>
							</section>
							<button className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg static-btn" onClick={this.submitForm.bind(this)}>Submit</button>
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
										Your Policy {this.state.policy_number} cancellation request has been initiated
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

	}
}

export default InsuranceCancellationView    