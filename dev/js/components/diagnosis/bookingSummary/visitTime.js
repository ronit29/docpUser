import React from 'react';

class VisitTime extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }



    render() {

        let { date, time } = this.props.selectedSlot

        if (date) {
            date = new Date(date).toDateString()
        }

        return (
            <div className="lab-visit-time">
                <h4 className="title"><span><img src="/assets/img/customer-icons/clock.svg" className="visit-time-icon"/></span>Visit time <span className="float-right"><a href="" onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    this.props.navigateTo('time')
                }} className="text-primary fw-700 text-sm">{time.text ? "Change" : "Pick"} Time</a></span></h4>
                <p className="date-time">{date || "No time selected"} {time.text ? "|" : ""} {time.text}</p>
            </div>
        );
    }
}


export default VisitTime
