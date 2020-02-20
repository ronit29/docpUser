import React from 'react';
import CommonPopup from '../commonFixedPopup/commonFixedPopup.js'
import SnackBar from 'node-snackbar'


class CorporateLeadPopup extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			companyName: '',
			noe:'',
			email:'',
			phoneNumber:'',
			name:''
		}
	}

	
    inputHandler = (e)=> {
    	if(e.target.name=="phoneNumber") {
    		if(e.target.value.length <=10){
    			this.setState({ [e.target.name]: e.target.value });
    		}
    	}else {
    		this.setState({ [e.target.name]: e.target.value })
    	}
    }

    submit = ()=>{
    	setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Response Submitted Successfully" })
            	this.props.cancelOverlay();
            }, 400)
    }

	render(){
		return(
			<CommonPopup cancelOverlay={this.props.cancelOverlay} className="test-clas">
                <div className="col-sm-12 corporate-detail-section">
                    <img className="modal-close-img" src={ASSETS_BASE_URL + "/img/customer-icons/close-black.svg"} alt="close" onClick={this.props.cancelOverlay}/>
                    <h3>Drop your details</h3>
                    <h6>We will reach yo for further assistance</h6>
                    <form action="">
                        <div className="input-field-row">
                            <input type="text" placeholder="* Company Name" style={{marginRight: 12}} name="companyName" value={this.state.companyName} onChange={this.inputHandler}/>
                            <input type="text" placeholder="No of employees" name="noe" value={this.state.noe} onChange={this.inputHandler} />
                        </div>
                        <div className="input-field-row">
                            <input type="text" placeholder="* Email Address" name="email" value={this.state.email} onChange={this.inputHandler} />
                        </div>
                        <div className="input-field-row">
                            <input type="text" placeholder="* Contact Person Name" name="name" value={this.state.name} onChange={this.inputHandler} />
                        </div>
                        <div className="input-field-row">
                            <input type="number" max="10" placeholder="* Contact Number" name="phoneNumber" value={this.state.phoneNumber} onChange={this.inputHandler} />
                        </div>
                    </form>
                    <button className="ipd-inp-sbmt float-right" onClick={this.submit}>Submit</button>
                </div>
            </CommonPopup>
			)
	}
}

export default CorporateLeadPopup;