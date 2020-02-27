import React from 'react';
import CommonPopup from '../commonFixedPopup/commonFixedPopup.js'
import SnackBar from 'node-snackbar'

// Method to add before use,
// 1) cancelOverlay()
// 2) pushLead()


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
        if (!this.state.companyName) {
            SnackBar.show({ pos: 'bottom-center', text: "Please Enter Your Company Name" })
            return
        }
        if (!this.state.email) {
            SnackBar.show({ pos: 'bottom-center', text: "Please Enter Email Id" })
            return
        }
        if(!this.state.email.match(/\S+@\S+\.\S+/)){
            SnackBar.show({ pos: 'bottom-center', text: "Please Enter Valid Email" })
            return   
        }
        if (!this.state.name) {
            SnackBar.show({ pos: 'bottom-center', text: "Please Enter Your Name" })
            return
        }
        if (!this.state.phoneNumber) {
            SnackBar.show({ pos: 'bottom-center', text: "Please Enter Your Phone Number" })
            return
        }

        if (this.state.phoneNumber.length<10) {
            SnackBar.show({ pos: 'bottom-center', text: "Please Enter Valid Phone Number" })
            return
        }

        let data = {
            'lead_source': 'CorporateGold',
            'source': '',
            'phone_number': this.state.phoneNumber,
            'company_name': this.state.companyName,
            'contact_person_name': this.state.name,
            'email': this.state.email,
            'number_of_employees': this.state.noe,
            'lead_type': 'CORPORATEGOLD'
        }
        this.props.pushLeads(data);
    }

	render(){
		return(
			<CommonPopup cancelOverlay={this.props.cancelOverlay} className="test-clas">
                <div className="col-sm-12 corporate-detail-section">
                    <img className="modal-close-img" src={ASSETS_BASE_URL + "/img/customer-icons/close-black.svg"} alt="close" onClick={this.props.cancelOverlay}/>
                    <h3>Drop your details</h3>
                    <h6>We will reach you for further assistance</h6>
                    <form action="">
                        <div className="input-field-row">
                            <input type="text" placeholder="* Company Name" style={{marginRight: 12}} name="companyName" value={this.state.companyName} onChange={this.inputHandler}/>
                            <input type="number" placeholder="No of employees" name="noe" value={this.state.noe} onChange={this.inputHandler} />
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