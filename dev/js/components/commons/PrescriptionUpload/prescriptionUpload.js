import React from 'react'
import CommonPopup from '../commonFixedPopup/commonFixedPopup.js'
import SnackBar from 'node-snackbar'
import LoginPopup from '../../../containers/commons/loginPopup.js'
import STORAGE from '../../../helpers/storage'
const Compress = require('compress.js')
const queryString = require('query-string');
import GTM from '../../../helpers/gtm'


/*To Reuse the component make sure to pass these methods from parent component
1) This is pure component so please dont't do this (...this.props) , only props you need in the component use only those.
2) historyObj= {this.props.history}, locationObj = {this.props.location}
3) method name ==> afterUserLogin()
*/

class PrescriptionView extends React.PureComponent {

	constructor(props) {
		super(props)
		this.state = {
			show_error: false,
			open_popup_overlay: false,
			selected_file: '',
            showLoginView: false,
            isLoading: false,
            selected_file_name: null,
            uploadFileData:{}
		}
	}

	upload = (event, type=0)=>{

        if(type) {
            this.setState({showLoginView: STORAGE.checkAuth()?false:true, open_popup_overlay: true})
        }else {
            if(event && event.target && event.target.files && event.target.files.length && event.target.files[0].name) {
                let file = event.target.files[0]
                let fileName = file.name
                if(/(.png|.jpeg|.jpg|.pdf)/.test(fileName) ) {
                    let fileSize = (file.size)/(1024*1024);

                    if(Math.round(fileSize)<=5){

                        if(fileName.includes('.pdf')){
                            let file_pdf = ASSETS_BASE_URL + "/img/pdf-loading.png"
                            this.setState({selected_file: file_pdf, selected_file_name: fileName, uploadFileData: {dataUrl: null, file: file} })
                            //this.finishCrop(null, file)
                        }else{

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
                                    this.setState({selected_file: dataUrl, selected_file_name: fileName, uploadFileData: {dataUrl: dataUrl, file: null} })
                                    //this.finishCrop(dataUrl, null)
                                })
                            }).catch((e) => {
                                SnackBar.show({ pos: 'bottom-center', text: "Error uploading image." });
                            })

                        }
                        this.setState({show_error: false});

                    }else{
                        this.setState({show_error: 'Please upload file less than 5MB'})
                    }
                }else{
                    this.setState({show_error: 'Invalid Format',selected_file_name: null,selected_file:null });
                }
                this.setState({ open_popup_overlay: true })
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

    finishCrop() {
        let dataUrl = this.state.uploadFileData.dataUrl;
        let file = this.state.uploadFileData.file;
        let file_blob_data
        if (dataUrl) {
            file_blob_data = this.dataURItoBlob(dataUrl)
        }
        // if(file) {
        //     file = this.dataURItoBlob(file)
        // }
        let mem_data = {}
        let existingData
        let img_tag = "file"
        this.setState({
            isLoading: true
        }, () => {
            let form_data = new FormData()
            if (file) {
                form_data.append(img_tag, file, "imageFilename.pdf")
            } else {
                form_data.append(img_tag, file_blob_data, "imageFilename.jpeg")
            }
            this.props.uploadCommonPrescription(form_data, (dataResp, err) => {
                if (dataResp) {
                    let user_no = this.props.primaryMobile?this.props.primaryMobile:this.props.user_loggedIn_number
                    if(user_no){
                        user_no = Number(user_no)
                    }
                    const parsed = queryString.parse(this.props.locationObj.search)
                    let data = {
                        phone_number:user_no,lead_source:'Prescriptions',source:parsed,lead_type:'PRESCRIPTIONS',doctor_name:'',exitpoint_url:dataResp.file_url ,doctor_id:null,hospital_id:null,hospital_name:null
                    }
                    let gtm_data = {'Category': 'ConsumerApp', 'Action': 'PrescriptionSubmitted', 'CustomerID': GTM.getUserId() || '', 'event': 'prescription-submitted'}
                    GTM.sendEvent({ data: gtm_data })
                    this.props.NonIpdBookingLead(data)  

                    setTimeout(() => {
                        this.setState({showSuccess: true,open_popup_overlay: false, uploadFileData: {} })
                        SnackBar.show({ pos: 'bottom-center', text: "Prescription Uploaded Successfully" })
                    }, 500)

                }else{
                    setTimeout(() => {
                        SnackBar.show({ pos: 'bottom-center', text: "Prescription upload failure,please try after some time" })
                    }, 500)
                    this.setState({ selected_file: null , selected_file_name: null})
                }
                this.setState({ isLoading: false })
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

    cancelOverlay = (val) => {
        this.setState({open_popup_overlay: false, selected_file: null, selected_file_name: null, showSuccess: false});
    }

    submit = ()=>{
        if(this.state.selected_file){
            this.finishCrop()
        }else{
            this.setState({ uploadFileData: {} })
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Please upload valid file" })
            }, 500)
        }
    }

    afterUserLogin = ()=>{
        this.setState({showLoginView: false});
        if(this.props.afterUserLogin){
            this.props.afterUserLogin();
        }
    }

    doneClicked = ()=>{
        this.setState({ selected_file: null, open_popup_overlay: false, selected_file_name: null, showSuccess: false })
    }

	render(){
		return(
			<React.Fragment>
				{
					this.props.is_home_page ?
                    <div className={` ${this.props.labWidget?'slider-card-column upload-lab-widget':'widget mb-3 align-item-center justify-content-between upload-prescription-widget mbl-view-presc-section'}`}>
                        <div className="d-flex align-item-center">
                            <img width="47" src={ASSETS_BASE_URL + "/img/lab-test-pres.png"} />
                            <h6 className="fw-500 ml-2">Book Test from Prescription!</h6>
                        </div>

                        <button className="m-0 cstm-book-btn fw-500" onClick = {(e)=>this.upload(e, 1)}>Upload</button>
                    </div>
                    :''
				}

				{
					this.props.search_lab && !this.state.open_popup_overlay?
					<div className="widget mb-3 d-flex align-item-center justify-content-between upload-prescription-widget">
                        <div className="d-flex align-item-center">
                            <img width="47" src={ASSETS_BASE_URL + "/img/lab-test-pres.png"} />
                            <h6 className="fw-500 ml-2">Book Test <br/> from Prescription!</h6>
                        </div>
                        <button className="m-0 cstm-book-btn fw-500" onClick = {(e)=>this.upload(e, 1)}>Upload</button>
                    </div>
                    :''
				}
                {
                    this.state.showSuccess?
                    <div className="rcvd-section">
                        <div className="received-prescription-section p-5 d-flex justify-content-center align-items-center flex-column d-none">
                            <img width="57" src={ASSETS_BASE_URL + "/img/success-checked.svg"} />
                            <p>We have received your prescription. Our medical representative will call you for assistance</p>
                            <button className="cstm-book-btn fw-700" style={{width:120}} onClick={this.doneClicked}>Done</button>
                        </div>
                    </div>
                    :''
                }    
				{
					this.state.open_popup_overlay?
                    <CommonPopup cancelOverlay={(a)=>this.cancelOverlay(a)}>
                        {
                            this.state.showLoginView?<LoginPopup afterUserLogin={this.afterUserLogin} locationObj={this.props.locationObj} historyObj= {this.props.historyObj} closePopup={this.cancelOverlay}/>
        					:
                            <React.Fragment>
                                <div className="upload-prescription">
                                    {
                                        !this.state.showSuccess?
                                        <React.Fragment>
                                            <div className="widget-header text-center mv-header p-3">
                                                <h4 className="fw-700 text-md">Upload Prescription</h4>
                                                <a className="cross-presc-modal"  onClick={()=>this.setState({abc: true}) /*this.props.hideLoginPopup.bind(this)*/}>
                                                    <span onClick={()=>this.cancelOverlay(1)}>&times;</span>
                                                </a>
                                            </div>
                                            <div className={`upload-prescription-column d-flex align-item-center justify-content-center flex-column ${this.state.show_error?'error-border-color':''}`} style={{position:'relative'}}>
                                                {
                                                    this.state.isLoading?
                                                        <div className="ins-prf-img-grd d-block upload-presc-loading-pdf d-flex align-item-center justify-content-center">
                                                            <div className="loader-for-chat-div mt-0">
                                                                <div className='loader-for-chat mb-0'>
                                                                    <span></span>
                                                                    <span></span>
                                                                    <span></span>
                                                                    <span></span>
                                                                    <span></span>
                                                                    <span></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        : ''
                                                }
                                                <img className={this.state.selected_file ? 'prescription-uploaded-img' : 'prescription-uploaded'} width={!this.state.selected_file ? '70px':''} src={this.state.selected_file?this.state.selected_file:ASSETS_BASE_URL + "/img/presc-icon.png"} />
                                                {
                                                    this.state.selected_file_name?
                                                    <h6 className="fw-500 text-center" style={{fontSize:11}}>{this.state.selected_file_name}</h6>
                                                    :''
                                                }
                                                {
                                                    this.state.show_error?
                                                    <React.Fragment>
                                                        <img className="prescription-uploaded-img" src={this.state.selected_file} /> 
                                                        <h6 className="error-msg-text text-center">{this.state.show_error}</h6>
                                                        <button className="cstm-book-btn fw-700 d-flex align-item-center mt-3 mb-3">
                                                            <img src={ASSETS_BASE_URL + "/img/up-arrow.svg"} height="17" />
                                                            <span>
                                                                <label className="text-white" htmlFor="presc-upload" style={{ fontSize: 13}}>Re-Upload</label>
                                                            </span>
                                                            <input id="presc-upload" type="file" accept="image/*;capture=camera" onChange = {(e)=>this.upload(e)}/>
                                                        </button>
                                                    </React.Fragment>
                                                    :<button className="cstm-book-btn fw-700 d-flex align-item-center mt-3 mb-3" onClick={(e)=>e.stopPropagation()}>
                                                        <img src={ASSETS_BASE_URL + "/img/up-arrow.svg"} height="17" />
                                                        <span>
                                                            <label className="text-white" htmlFor="presc-upload" style={{ fontSize: 13}}>{this.state.selected_file?'Re-Upload':'Upload'}</label>
                                                        </span>
                                                        <input id="presc-upload" type="file" accept="image/*;capture=camera" onChange = {(e)=>this.upload(e)}/>
                                                    </button>

                                                }
                                            </div>
                                            <div className="p-3 pb-0">
                                                <div className="health-advisor-col d-flex p-2 align-items-start">
                                                    <img width="17" className="info-detail-icon" src={ASSETS_BASE_URL + "/img/info-icon.svg"} />
                                                    <p className="ml-2">Our health advisor will assist you in booking your tests</p>
                                                </div>
                                                <hr style={{marginTop: 11}}/>
                                            </div>
                                            <div className="guidelines-col p-3 pt-0">
                                                <h5 className="fw-500 text-black" style={{marginBottom: 5}}>Prescription Guidelines</h5>
                                                <ul>
                                                    <li className="fw-500">Avoid blurred image</li>
                                                    <li className="fw-500">Supported files type: jpeg , jpg , png , pdf</li>
                                                    <li className="fw-500">Maximum allowed file size: 5MB</li>
                                                </ul>
                                            </div>
                                            <button className="presc-submit-btn cstm-book-btn fw-700" style={{borderRadius:0}} onClick={this.submit}>Submit</button>
                                        </React.Fragment>: ''
                                    }
                                </div>
                                
                            </React.Fragment>
                        }
                    </CommonPopup>
                    :''
				}

			</React.Fragment>
		)
	}
}

export default PrescriptionView