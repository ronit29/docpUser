import React from 'react';

class ChoosePatient extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        return (
            <div className="lab-visit-time">
                <h4 className="title"><span><img src="/assets/img/customer-icons/clock.svg" className="visit-time-icon"  /></span>Patient Details</h4>
                <p className="date-time">{this.props.patient ? this.props.patient.name : "No Selected Patient"}</p>
            </div>
        );
    }
}


export default ChoosePatient
