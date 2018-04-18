import React from 'react';
import { connect } from 'react-redux';

import LabDetails from '../commons/labDetails/index.js'
import OrderDetails from '../commons/orderDetails/index.js'
import DetailsForm from './detailsForm/index.js'
import AddressForm from './addressForm/index.js';

class PatientDetailsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLab: null,
            selectedTests: "",
            selectedSlot: null,
            selectedTests : ""
        }
    }

    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search
        const params = new URLSearchParams(paramString)
        return params.get(tag)
    }

    proceed(){
        // this.context.router.history.push('/payment')
    }

    componentDidMount() {
        let labId = this.props.match.params.id
        let tests = this.getLocationParam('tests')
        if (labId) {
            this.setState({ selectedLab: labId, selectedTests: tests })
            this.props.getLabById(labId)

        }
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <div className="patientDetails">

                {
                    this.props.LABS[this.state.selectedLab] ?
                        <div>
                            <LabDetails data={this.props.LABS[this.state.selectedLab]} />
                            <OrderDetails data={this.props.LABS[this.state.selectedLab]} />
                            <DetailsForm />
                            <AddressForm city="Selected value" />
                            <button className="proceedbtn" onClick={this.proceed.bind(this)}>Proceed</button>
                        </div> : ""
                }

            </div>
        );
    }
}


export default PatientDetailsView
