import React from 'react';
import Radio from 'material-ui/Radio';

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
                <ul className="list family-list">
                    {
                        address.map((curr, key) => {
                            return <li key={key}>
                                <a>
                                    <span className="icon icon-lg member-icon" style={{ marginTop: -15 }}>
                                        <Radio value={curr.id.toString()}  checked={curr.is_default} onChange={this.updateAddress.bind(this, curr)} />
                                    </span>
                                    <div className="member-details">
                                        <ul className="list">
                                            <li className="fw-500 text-sm" style={{width: '80%', wordWrap: 'break-word'}}>{curr.address}</li>
                                        </ul>
                                    </div>
                                    <span onClick={this.editAddress.bind(this, curr.id)} style={{ top: 9 }} className="ct-img ct-img-sm arrow-forward-right">Edit</span>
                                </a>
                            </li>
                        })
                    }
                </ul>
                <button onClick={this.addAddress.bind(this)} className="v-btn v-btn-primary btn-lg add-more-members-btn">+</button>
            </div>
        );
    }
}


export default UserAddress
