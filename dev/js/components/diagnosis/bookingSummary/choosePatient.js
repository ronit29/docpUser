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
                <h4 className="title"><span><img src="/assets/img/customer-icons/clock.svg" /></span>Patient Details <span className="float-right"><a href="#" className="text-primary fw-700 text-sm">Pick Patient</a></span></h4>
                <p className="date-time">Dummy User</p>
            </div>
        );
    }
}


export default ChoosePatient
