import React from 'react';

class PickupAddress extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectorOpen: false
        }
    }

    render() {

        let addressStr = ""

        if (this.props.selectedAddress) {
            this.props.address.map((add) => {
                if (add.id == this.props.selectedAddress) {
                    addressStr = add.address
                }
            })
        }

        return (
            <div className="lab-visit-time">
                <h4 className="title"><span><img src="/assets/img/customer-icons/clock.svg" /></span>Pickup Address <span className="float-right"><a href="#" onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    this.setState({ selectorOpen: true })
                }} className="text-primary fw-700 text-sm">Change Address</a></span></h4>
                <p className="date-time">{addressStr}</p>

                {
                    this.state.selectorOpen ? <div className="fullscreen" onClick={() => {
                        this.setState({ selectorOpen: false })
                    }}>
                        <div className="addresspicker" onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                        }}>
                            <span className="selectadd">Select Address</span>
                            <a className="addnewadd" href="" onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                this.props.history.push('/user/address/add')
                            }}>Add New Address</a>
                            {
                                this.props.address.map((add, i) => {
                                    return <div key={i} className={add.id == this.props.selectedAddress ? "addresspickerDiv selected" : "addresspickerDiv"} onClick={() => {
                                        this.props.selectPickupAddress(add.id)
                                        this.setState({ selectorOpen: false })
                                    }}>
                                        <span className="addressText">{add.address}</span>
                                    </div>
                                })
                            }
                        </div>
                    </div> : ""
                }
            </div>
        );
    }
}


export default PickupAddress
