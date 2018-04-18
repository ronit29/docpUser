import React from 'react';

import LabDetails from '../commons/labDetails/index.js'
import OrderDetails from '../commons/orderDetails/index.js'
import TimeSlotSelector from '../../commons/timeSlotSelector/index.js'

class LabSlotsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLab: null,
            selectedTests: "",
            timeSlots: null,
            selectedSlot: null
        }
    }

    proceed() {
        if (this.state.selectedSlot) {
            debugger
            this.context.router.history.push(`/doctorprofile/${this.state.selectedDoctor}/${this.state.selectedClinic}/bookdetails?t=${this.state.selectedSlot.start}`)
        }
    }

    selectTimeSlot(slot) {
        this.setState({ selectedSlot: slot })
    }

    componentDidMount() {
        let labId = this.props.match.params.id
        if (labId) {
            this.setState({ selectedLab: labId })
            this.props.getLabById(labId)

            this.props.getLabTimeSlots(labId, null, (timeSlots) => {
                this.setState({ timeSlots })
            })
        }
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <div className="appointmentSlot">

                {
                    this.props.LABS[this.state.selectedLab] ?
                        <div>
                            <LabDetails data={this.props.LABS[this.state.selectedLab]} />
                            <OrderDetails data={this.props.LABS[this.state.selectedLab]} />
                            {
                                this.state.timeSlots ?
                                    <TimeSlotSelector
                                        timeSlots={this.state.timeSlots}
                                        selectTimeSlot={this.selectTimeSlot.bind(this)}
                                    /> : ''
                            }
                            <button className="proceedbtn" onClick={this.proceed.bind(this)}>Proceed</button>
                        </div> : ""
                }

            </div>
        );
    }
}

export default LabSlotsView
