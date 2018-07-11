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
                <h4 className="title"><span><img src="/assets/img/icons/user.svg" className="visit-time-icon" style={{width: 16}} /></span>Patient Details <span className="float-right"><a href="#" onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    this.props.navigateTo('patient')
                }} className="text-primary fw-700 text-sm">{this.props.patient ? "Change Patient" : "Pick Patient"}</a></span></h4>
                <p className="date-time">{this.props.patient ? this.props.patient.name : "No Selected Patient"}</p>
            </div>
        );
    }
}


export default ChoosePatient
