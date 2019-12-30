import React from 'react'


class PrescriptionView extends React.PureComponent {

	constructor(props) {
		super(props)
		this.state = {
			show_error: false,
			prescription_added: false,
			selected_file: ''
		}
	}

	upload = (event)=>{
		if(event && event.target && event.target.files && event.target.files.length && event.target.files[0].name) {
			if(/abc/.test(event.target.files[0].name) ) {
				this.setState({show_error: true});
			}
			this.setState({selected_file: event.target.value})
		}
	}

	render(){
		console.log('Prescription VIEWWWWWWWWWWWWWWWWWW');
		return(
			<React.Fragment>
				{
					this.props.is_home_page?
					<div className="widget mb-3 d-flex align-item-center justify-content-between upload-prescription-widget" >
						<div className="d-flex align-item-center">
							<img width="47" src={ASSETS_BASE_URL + "/img/lab-test-pres.png"} />
							<h6 className="fw-700 ml-2">Book Test <br/> from Prescription!</h6>
						</div>
						{/*<button className="m-0 cstm-book-btn fw-500">Upload</button>*/}
                        <input type="file" accept="image/*;capture=camera" onChange = {(e)=>this.upload(e)}/>
					</div>
					:''
				}

				{
					this.props.search_lab?
					<div className="widget mb-3 d-flex align-item-center justify-content-between upload-prescription-widget" >
                        <div className="d-flex align-item-center">
                            <img width="47" src={ASSETS_BASE_URL + "/img/lab-test-pres.png"} />
                            <h6 className="fw-700 ml-2">Book Test <br/> from Prescription!</h6>
                        </div>
                        {/*<button className="m-0 cstm-book-btn fw-500">Upload</button>*/}
                        <input type="file" accept="image/*;capture=camera" onChange = {(e)=>this.upload(e)}/>
                    </div>
                    :''
				}

				{
					this.state.prescription_added?
					<div className="three upload-prescription">
                        <div className="widget-header text-center mv-header p-3">
                            <h4 className="fw-700 text-md">Upload Prescription</h4>
                            <a style={{ cursor: 'pointer', right:15,top:16, position: 'absolute' }} onClick={()=>this.setState({abc: true}) /*this.props.hideLoginPopup.bind(this)*/}>
                                <img src={ASSETS_BASE_URL + "/img/customer-icons/rt-close.svg"} style={{ width: 14 }} />
                            </a>
                        </div>
                        <div className="upload-prescription-column d-flex align-item-center justify-content-center flex-column">
                            <img className="prescription-placeholder" width="70" src={ASSETS_BASE_URL + "/img/presc-icon.png"} />
                            {
                            	this.state.show_error?
                            	<React.Fragment>
                            		<img className="prescription-uploaded-img" src={this.state.selected_file} /> 
                            		<h6 className="error-msg-text">Invalid Format</h6>
                            		<button className="cstm-book-btn fw-700 d-flex align-item-center mt-3 mb-3">
		                                 <img src={ASSETS_BASE_URL + "/img/up-arrow.svg"} />
		                                 <span className="ml-2">Re-Upload</span>
		                            </button>
                            	</React.Fragment>
                            	:<button className="cstm-book-btn fw-700 d-flex align-item-center mt-3 mb-3">
	                                 <img src={ASSETS_BASE_URL + "/img/up-arrow.svg"} />
	                                 <span className="ml-2">Upload</span>
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
                        {/* for insured person  */}
                        {/* <div className="p-3">
                            <div className="health-advisor-col d-flex p-2 align-items-start">
                                <img width="17" className="info-detail-icon" src={ASSETS_BASE_URL + "/img/info-icon.svg"} />
                                <p className="ml-2"> For insured customers, prescription upload is required at the time of booking</p>
                            </div>
                        </div> */}
                        <div className="guidelines-col p-3 pt-0">
                            <h5 className="fw-500 text-black mb-3">Prescription Guidelines</h5>
                            <ul>
                                <li className="fw-500">Avoid blurred image</li>
                                <li className="fw-500">Supported files type: jpeg , jpg , png , pdf</li>
                                <li className="fw-500">Maximum allowed file size: 5MB</li>
                            </ul>
                        </div>
                        <button className="presc-submit-btn cstm-book-btn fw-700" style={{borderRadius:0}}>Submit</button>
                    </div>:''
				}

			</React.Fragment>
			)
	}
}

export default PrescriptionView