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

    proceed() {
        if (this.state.selectedLab) {
            this.context.router.history.push(`/lab/${this.state.selectedLab}/bookdetails?tests=${this.state.selectedTests}&t_start=${this.state.selectedSlot.start}&t_end=${this.state.selectedSlot.end}`)
        }
    }

    selectTimeSlot(slot) {
        this.setState({ selectedSlot: slot })
    }

    componentDidMount() {
        let labId = this.props.match.params.id
        let tests = this.getLocationParam('tests')
        if (labId) {
            this.setState({ selectedLab: labId, selectedTests: tests })
            this.props.getLabById(labId)

            this.props.getLabTimeSlots(labId, tests, (timeSlots) => {
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
