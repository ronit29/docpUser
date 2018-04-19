import React from 'react';
import { connect } from 'react-redux';

import LabDetails from '../commons/labDetails/index.js'
import OrderDetails from '../commons/orderDetails/index.js'

class BookingSummaryView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bookingId: null,
            bookingDetails: null
        }
    }

    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search
        const params = new URLSearchParams(paramString)
        return params.get(tag)
    }

    proceed() {
        this.context.router.history.push('/payment')
    }

    componentDidMount() {
        let bookingId = this.props.match.params.id
        if (bookingId) {
            this.setState({ bookingId })
            this.props.getLabBookingSummary(bookingId, (bookingDetails) => {
                this.setState({ bookingDetails: bookingDetails.data })
            })
        }
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <div className="patientDetails">

                {
                    this.state.bookingDetails ?
                        <div>

                            <LabDetails data={this.state.bookingDetails.lab} />

                            <div className="selectedAppointmentSlot">
                                <h5>Selected Appointment Slot</h5>
                                <span className="appdate">Appointment Date</span>
                                <span className="date">{this.state.bookingDetails.selectedSlotStart}</span>
                            </div>

                            <div className="selectedAppointmentSlot">
                                <div style={{width:'100%', float:'left'}}>
                                    <span className="appdate">Patient Name</span>
                                    <span className="date">{this.state.bookingDetails.patientDetails.name}</span>
                                </div>
                                <div style={{width:'100%', float:'left'}}>
                                    <span className="appdate">Patient Address</span>
                                    <span className="date">{this.state.bookingDetails.patientDetails.address}</span>
                                </div>
                            </div>

                            <OrderDetails data={this.state.bookingDetails.lab} />
                            
                            <button className="proceedbtn" onClick={this.proceed.bind(this)}>Proceed to Payment</button>
                        </div> : ""
                }

            </div>
        );
    }
}


export default BookingSummaryView
