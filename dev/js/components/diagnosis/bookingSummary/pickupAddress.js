import React from 'react';

class PickupAddress extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        return (
            <div className="lab-visit-time">
                <h4 className="title"><span><img src="/assets/img/customer-icons/clock.svg" /></span>Pickup Address <span className="float-right"><a href="#" className="text-primary fw-700 text-sm">Change Address</a></span></h4>
                <p className="date-time"></p>
            </div>
        );
    }
}


export default PickupAddress
