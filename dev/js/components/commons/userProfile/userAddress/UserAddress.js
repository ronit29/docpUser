import React from 'react'

class UserAddress extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pick: this.props.location.search.includes('pick=true')
        }
    }

    componentDidMount() {
        // this.props.getUserAddress()
    }

    addAddress() { //add new address
        this.props.history.push('/user/address/add')
    }

    editAddress(id) { // edit existing address
        if (this.props.location.search.includes('pick=true')) {
            // pick address and go back, else go on to edit.
            this.props.selectPickupAddress(id)
            this.props.history.go(-1)
        } else {
            this.props.history.push(`/user/address/edit/${id}`)
        }
    }

    updateAddress(addressData, e) { // update changes in address
        addressData.is_default = true
        this.props.updateUserAddress(addressData, (err, data) => {
            this.props.getUserAddress()
            this.editAddress(addressData.id)
        })
    }

    render() {

        let { address } = this.props.USER

        return (
            <div className="widget-content pl-0 pr-0">
                <ul className="list family-list dp-user-list">
                    {
                        (address && address.length) ? address.map((curr, key) => {
                            return <li key={key}>
                                <span className="icon icon-lg member-icon" onClick={this.updateAddress.bind(this, curr)} style={{ top: '0px', position: 'absolute', left: '10px', height: '0px', width: '0px', cursor: 'pointer' }}>
                                    <input type="radio" value={curr.id.toString()} checked={curr.is_default} className="user-address-hidden-radio" />
                                    <span className="user-address-radio"></span>
                                </span>
                                <div className="member-details padding-leftadjest" onClick={this.updateAddress.bind(this, curr)}>
                                    <ul className="list">
                                        <li className="fw-500 text-sm" style={{ width: '80%', wordWrap: 'break-word' }}>{curr.address}</li>
                                        <li className="fw-500 text-sm" style={{ width: '80%', wordWrap: 'break-word' }}>{curr.land_mark !== ""?curr.land_mark:curr.locality}</li>
                                    </ul>
                                </div>
                                <span onClick={this.updateAddress.bind(this, curr)} style={{ top: 10 }} className="ct-img ct-img-sm arrow-forward-right">{this.state.pick ? "Pick" : "Edit"}</span>
                            </li>
                        }) : <div className="text-center pd-20">
                                <img src={ASSETS_BASE_URL + "/img/customer-icons/no-address.png"} />
                                <p className="fw-500 text-lg mrt-20">No Address !!</p>
                            </div>
                    }
                </ul>
                <div className="mrt-20">
                    <p onClick={this.addAddress.bind(this)} className="text-primary fw-500" style={{ cursor: 'pointer', fontSize: 16 }} >Add new address</p>
                </div>
                {/* <button onClick={this.addAddress.bind(this)} className="v-btn v-btn-primary btn-lg add-more-members-btn">+</button> */}
            </div>
        );
    }
}


export default UserAddress
