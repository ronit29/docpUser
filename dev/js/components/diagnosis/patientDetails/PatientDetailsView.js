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
            selectedSlotStart : null,
            selectedSlotEnd : null
        }
    }

    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search
        const params = new URLSearchParams(paramString)
        return params.get(tag)
    }

    proceed(){
        this.context.router.history.push('/lab/booking/summary/IUHBUH8787UHB')
    }

    componentDidMount() {
        let labId = this.props.match.params.id
        let tests = this.getLocationParam('tests')
        let selectedSlotStart = this.getLocationParam('t_start')
        selectedSlotStart = new Date(parseFloat(selectedSlotStart))
        selectedSlotStart = selectedSlotStart.toString()
        let selectedSlotEnd = this.getLocationParam('t_end')
        selectedSlotEnd = new Date(parseFloat(selectedSlotEnd))
        selectedSlotEnd = selectedSlotEnd.toString()
        if (labId) {
            this.setState({ selectedLab: labId, selectedTests: tests, selectedSlotStart, selectedSlotEnd })
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
                            <div className="selectedAppointmentSlot">
                                <h5>Selected Appointment Slot</h5>
                                <span className="appdate">Appointment Date</span>
                                <span className="date">{ this.state.selectedSlotStart }</span>
                            </div>
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
