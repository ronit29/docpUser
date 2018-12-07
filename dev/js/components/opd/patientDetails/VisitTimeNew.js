import React from 'react';

class VisitTimeNew extends React.Component {
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
            <div className="lab-visit-time d-flex jc-spaceb">
                <h4 className="title"><span><img src={ASSETS_BASE_URL + "/img/customer-icons/clock.svg"} className="visit-time-icon" /></span>Visit Time </h4>
                <div className="float-right d-flex mbl-view-formatting">
                    <h4 className="date-time mr-10 title">{date || "No time selected"} {time.text ? "|" : ""} {time.text} {time.text?(time.value>=12?'PM':'AM'):''}</h4>
                    <a href="" onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    this.props.navigateTo('time')
                }} className="text-primary fw-700 text-sm">{time.text ? "Change" : "Pick"}</a></div>
                
            </div>
        );
    }
}


export default VisitTimeNew
