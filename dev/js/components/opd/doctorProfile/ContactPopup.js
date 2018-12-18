import React from 'react'
import SnackBar from 'node-snackbar'

class ContactPoupView extends React.Component{

	constructor(props){
		super(props)
		this.state = {validateNo: false,phoneNumber:''}
	}

	inputHandler(e) {
        if (e.target.name == 'phoneNumber') {
            e.target.value.length <= 10
                ? e.target.value.length == 10
                    ? this.setState({
                        [e.target.name]: e.target.value, validateNo: true
                    })
                    : this.setState({
                        [e.target.name]: e.target.value
                    })
                : this.setState({ validateNo: true })
        }

    }

    componentDidMount(){
    	if(this.props.mobileNo){
    		this.setState({phoneNumber: this.props.mobileNo, validateNo: true})
    	}
    }
    componentWillReceiveProps(nextProps){
//    	if(nextProps)
    }

    handleContinuePress(e) {
        if (e.key === 'Enter') {
            this.submit()
        }
    }

    submit(){
    	if(this.state.validateNo){
    		this.props.getDoctor(this.state.phoneNumber)	
    	}else{
    		SnackBar.show({ pos: 'bottom-center', text: "Please provide a valid number (10 digits)" })
    	}
    	
    }

	render(){console.log(this.props);
		return(
			<div>
		        <div className="cancel-overlay" onClick={this.props.toggle}></div>
		        <div className="widget cancel-appointment-div cancel-popup">
		            <div className="widget-header text-center action-screen-header" style={{ position: 'relative' }} >
		                <p className="fw-500 cancel-appointment-head">Submit Phone</p>
		                <img src={ASSETS_BASE_URL + "/img/icons/close.png"} className="close-modal" onClick={this.props.toggle} />
		                <hr />
		            </div>
		            <div className="cancel-policy-text">
		                <div className="slt-nw-input">
	                        <label className="slt-label" htmlFor="male">Mobile:</label>
	                        <input className="slt-text-input" type="number" placeholder="" value={this.state.phoneNumber} onChange={this.inputHandler.bind(this)} name="phoneNumber" onKeyPress={this.handleContinuePress.bind(this)} />
	                        <button className="mobile-fill-btn" onClick={this.submit.bind(this)}>Submit</button>
	                        
	                    </div>
		            </div>
		        </div>
    		</div>
			)
	}
}

export default ContactPoupView