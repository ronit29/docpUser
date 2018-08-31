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
        addressData.is_default = e.target.checked
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
                            return <li key={key}>
                                <a>
                                    <span className="icon icon-lg member-icon" style={{ marginTop: -15 }}>
                                        <input type="radio" value={curr.id.toString()} checked={curr.is_default} onChange={this.updateAddress.bind(this, curr)} />
                                    </span>
                                    <div className="member-details">
                                        <ul className="list">
                                            <li className="fw-500 text-sm" style={{ width: '80%', wordWrap: 'break-word' }}>{curr.address}</li>
                                        </ul>
                                    </div>
                                    <span onClick={this.editAddress.bind(this, curr.id)} style={{ top: 9 }} className="ct-img ct-img-sm arrow-forward-right">Edit</span>
                                </a>
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
