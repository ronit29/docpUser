import React from 'react'

class UserAddress extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        // this.props.getUserAddress()
    }

    addAddress() {
        this.props.history.push('/user/address/add')
    }

    editAddress(id) {
        this.props.history.push(`/user/address/edit/${id}`)
    }

    updateAddress(addressData, e) {
        addressData.is_default = true
        this.props.updateUserAddress(addressData, (err, data) => {
            this.props.getUserAddress()
        })
    }

    render() {

        let { address } = this.props.USER

        return (
            <div className="widget-content">
                <ul className="list family-list dp-user-list">
                    {
                        (address && address.length) ? address.map((curr, key) => {
                            return <li key={key} style={{cursor: 'unset'}}>
                                <span className="icon icon-lg member-icon" onClick={this.updateAddress.bind(this, curr)} style={{ marginTop: -17, position: 'relative', cursor: 'pointer' }}>
                                    <input type="radio" value={curr.id.toString()} checked={curr.is_default} className="user-address-hidden-radio" />
                                    <span className="user-address-radio"></span>
                                </span>
                                <div className="member-details">
                                    <ul className="list">
                                        <li className="fw-500 text-sm" style={{ width: '80%', wordWrap: 'break-word' }}>{curr.address}</li>
                                        <li className="fw-500 text-sm" style={{ width: '80%', wordWrap: 'break-word' }}>{curr.land_mark}</li>
                                    </ul>
                                </div>
                                <span onClick={this.editAddress.bind(this, curr.id)} style={{ top: 10 }} className="ct-img ct-img-sm arrow-forward-right">Edit</span>
                            </li>
                        }) : <div className="text-center pd-20">
                                <img src={ASSETS_BASE_URL + "/img/customer-icons/no-address.png"} />
                                <p className="fw-500 text-lg mrt-20">No Address !!</p>
                            </div>
                    }
                </ul>
                <button onClick={this.addAddress.bind(this)} className="v-btn v-btn-primary btn-lg add-more-members-btn">+</button>
            </div>
        );
    }
}


export default UserAddress
