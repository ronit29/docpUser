import React from 'react';

class PickupAddress extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectorOpen: false
        }
    }

    render() {

        return (
            <div className="lab-visit-time">
                <h4 className="title"><span><img src="/assets/img/customer-icons/clock.svg" /></span>Pickup Address <span className="float-right"><a href="#" onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    this.setState({ selectorOpen: true })
                }} className="text-primary fw-700 text-sm">Change Address</a></span></h4>
                <p className="date-time"></p>

                {
                    this.state.selectorOpen ? <div className="fullscreen" onClick={() => {
                        this.setState({ selectorOpen: false })
                    }}>
                        <div className="addresspicker" onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                        }}>

                        </div>
                    </div> : ""
                }
            </div>
        );
    }
}


export default PickupAddress
