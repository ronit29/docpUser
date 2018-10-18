import React from 'react';

class PickupAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

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
                    this.props.navigateTo()
                }} className="text-primary fw-700 text-sm">{addressStr ? "Change" : "Pick"}</a></span></h4>
                <p className="date-time">{addressStr} {this.props.addressError == false || addressStr.length ? '' : <span className="fw-500" style={{ color: 'red', fontSize: 11, float: 'right' }}>Required</span>}</p>
            </div>
        );
    }
}


export default PickupAddress
