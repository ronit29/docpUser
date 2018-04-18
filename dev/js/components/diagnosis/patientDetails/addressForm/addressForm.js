import React from 'react';
import { connect } from 'react-redux';

class AddressForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            address:'',
            locality:'',
            landmark:'',
            pincode:'',
            city:props.city

        }
    }

    inputHandler(which, e){
        this.setState({ [which] : e.target.value })
    }

    render() {

        return (
            <div className="detailsForm">
                <h5>Please provide patient details</h5>

                <input value={this.state.address} onChange={this.inputHandler.bind(this,'address')} className="ptname" placeholder="Address*" />
                <input value={this.state.locality} onChange={this.inputHandler.bind(this,'locality')} className="ptname" placeholder="Locality*" />
                <input value={this.state.landmark} onChange={this.inputHandler.bind(this,'landmark')} className="ptname" placeholder="Landmark*" />
                <input value={this.state.pincode} onChange={this.inputHandler.bind(this,'pincode')} className="ptmobile" placeholder="Pincode*" />
                <input value={this.state.city} onChange={this.inputHandler.bind(this,'city')} disabled className="ptotp" placeholder="City" />

            </div>
        );
    }
}


export default DetailsForm
