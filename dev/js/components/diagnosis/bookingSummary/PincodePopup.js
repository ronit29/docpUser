import React from 'react';
import SnackBar from 'node-snackbar'

class PincodePoupupView extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            pincode: ''
        }
    }

    validatePincode(){
        if(this.state.pincode.match(/^[0-9]{6}$/)){
            return true
        }
        return false
    }

    submitPincode(e){
        e.stopPropagation()
        if(this.validatePincode()){
            this.props.setPincode(this.state.pincode)
        }else{
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Please Enter Valid Pincode" })
            }, 500)
        }
    }

    _handleContinuePress(e) {
        if (e.key === 'Enter') {
            this.submitPincode(e)
        }
    }

    inputHandler(e){
        e.target.value.length <= 6?this.setState({ pincode: e.target.value }):''
    }

    render() {
        return (
            <section className="error-msg-pop">
                <div className="cancel-overlay" onClick={()=>this.props.toggle()}></div>
                <div className="popup-error popup-timeslot">
                    <div className="error-head">Check time slot !</div>
                    <div className="cross-btn" onClick={()=>this.props.toggle()}>
                        <img src={ASSETS_BASE_URL + "/img/icons/close.png"} alt="close" />
                    </div>
                    <div className="checking-loc">
                        <p className="error-msg">Please enter your pincode, so that we can find the best available time slot </p>
                        <div className="InputField">
                            <input type="number" className="form-in" placeholder="Enter your pincode" onChange={this.inputHandler.bind(this)} value={this.state.pincode} onKeyPress={this._handleContinuePress.bind(this)}/>
                        </div>
                    </div>
                    <div className ="wait-for-loc">
                         <img src={ASSETS_BASE_URL + "/img/loader_orange.gif"} alt="loader" />
                         <p className="error-msg">Please wait, while we are finding best available time for you</p>
                    </div>
                    <a href="Javascript:void(0);" onClick={this.submitPincode.bind(this)} className="btn-chk-avl">Check Availability</a>
                </div>
            </section>
        )
    }
}

export default PincodePoupupView