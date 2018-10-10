import React from 'react';

class PickupAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectorOpen: false,
        }
    }

    getAddressStr(address) {
        let addressStr = ""
        addressStr = address.address
        if (address.land_mark) {
            addressStr += ", " + address.land_mark
        }
        if (address.locality) {
            addressStr += ", " + address.locality
        }
        return addressStr
    }

    render() {

        let addressStr = ""

        if (this.props.selectedAddress) {
            this.props.address.map((add) => {
                if (add.id == this.props.selectedAddress) {
                    addressStr = add.address
                    if (add.land_mark) {
                        addressStr += ", " + add.land_mark
                    }
                    if (add.locality) {
                        addressStr += ", " + add.locality
                    }
                }
            })
        }

        return (
            <div className="lab-visit-time">
                <h4 className="title"><span><img src={ASSETS_BASE_URL + "/img/icons/home-orange.svg"} className="visit-time-icon" /></span>Pickup Address <span className="float-right"><a href="#" onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    this.setState({ selectorOpen: true })
                }} className="text-primary fw-700 text-sm">{addressStr ? "Change" : "Pick"} Address</a></span></h4>
                <p className="date-time">{addressStr} {this.props.addressError == false || addressStr.length ? '' : <span className="fw-500" style={{ color: 'red', fontSize: 11, float: 'right' }}>Required</span>}</p>

                {
                    this.state.selectorOpen ? <div className="fullscreen" onClick={() => {
                        this.setState({ selectorOpen: false })
                    }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-md-6 offset-md-3">
                                    <div className="addresspicker" onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                    }}>

                                        <div className="inlineElements">
                                            <span className="selectadd">Select Address</span>
                                            <a className="addnewadd" href="" onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                this.props.history.push('/user/address/add')
                                            }}>Add New Address</a>
                                            {
                                                this.props.address.map((add, i) => {
                                                    return <div key={i} ref={i} className={add.id == this.props.selectedAddress ? "addresspickerDiv selected" : "addresspickerDiv"} onClick={() => {
                                                        this.props.selectPickupAddress(add.id)
                                                        this.setState({ selectorOpen: false })
                                                    }}>
                                                        <span className="addressText">{this.getAddressStr(add)}</span>
                                                        <span className="selectedText">Selected</span>
                                                    </div>
                                                })

                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : ""
                }
            </div>
        );
    }
}


export default PickupAddress
