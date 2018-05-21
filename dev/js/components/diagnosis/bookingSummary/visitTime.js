import React from 'react';

class VisitTime extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        return (
            <div className="lab-visit-time">
                <h4 className="title"><span><img src="/assets/img/customer-icons/clock.svg" /></span>Visit time <span className="float-right"><a href="#" className="text-primary fw-700 text-sm">Change Time</a></span></h4>
                <p className="date-time">18th April | 3:30 PM</p>
            </div>
        );
    }
}


export default VisitTime
