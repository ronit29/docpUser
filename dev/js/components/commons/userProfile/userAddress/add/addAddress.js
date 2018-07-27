import React from 'react';

class UserSignupView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            address: '',
            land_mark: '',
            pincode: '',
            type: 'home',
            phone_number: '',
            edit: !!this.props.match.params.id
        }
    }

    componentDidMount() {
        if (this.state.edit) {
            let editState = {}
            if (this.props.USER.address) {
                this.props.USER.address.map((add) => {
                    if (add.id == this.props.match.params.id) {
                        editState = add
                    }
                })
            }
            this.setState({ ...editState })
        }
    }

    componentWillReceiveProps(props) {
        if (this.state.edit) {
            let editState = {}
            if (props.USER.address) {
                props.USER.address.map((add) => {
                    if (add.id == props.match.params.id) {
                        editState = add
                    }
                })
            }
            this.setState({ ...editState })
        }
    }

    inputHandler(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitForm() {
        // validate
        let addAddress = true
        Object.keys(this.refs).forEach((prp, i) => {
            let validated = false
            switch (this.refs[prp].name) {
                case "phone_number": {
                    if (this.refs[prp].value == "") {
                        validated = true
                        this.refs[prp].style.border = ''
                        return
                    } else {
                        validated = this.refs[prp].value.match(/^[6789]{1}[0-9]{9}$/)
                    }
                    break
                }
                case "pincode": {
                    validated = this.refs[prp].value.match(/^[1-9][0-9]{5}$/)
                    break
                }
                default: {
                    validated = true
                    break
                }
            }
            if (this.refs[prp].value && validated) {
                this.refs[prp].style.border = ''
            } else {
                this.refs[prp].style.border = '1px solid red'
                addAddress = false
            }
        })

        if (addAddress) {
            if (this.state.edit) {
                this.props.updateUserAddress(this.state, (err, data) => {
                    this.props.history.go(-1)
                })
            } else {
                this.props.addUserAddress(this.state, (err, res) => {
                    if (!err) {
                        this.props.selectPickupAddress(res.id)
                    }
                    // go back
                    this.props.history.go(-1)
                })
            }
        }
    }

    render() {

        return (
            <div>
                <header className="skin-white fixed horizontal top bdr-1 bottom light sticky-header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-2">
                                <ul className="inline-list">
                                    <li onClick={() => {
                                        this.props.history.go(-1)
                                    }}><span className="icon icon-sm text-middle back-icon-white"><img src={ASSETS_BASE_URL + "/img/customer-icons/back-icon.png"} className="img-fluid" /></span></li>
                                </ul>
                            </div>
                            <div className="col-8">
                                <div className="header-title fw-700 capitalize text-center">{this.state.edit ? "Edit" : "Add"} Address</div>
                            </div>
                            <div className="col-2">
                            </div>
                        </div>
                    </div>
                </header>

                <section className="validation-book-screen">

                    <div className="widget no-round no-shadow">
                        <div className="widget-content">
                            <form className="go-bottom">


                                <div className="labelWrap">
                                    <input id="number" name="phone_number" type="text" onChange={this.inputHandler.bind(this)} value={this.state.phone_number} required ref="phone_number" />
                                    <label htmlFor="number">Mobile Number</label>
                                    <span className="text-xs"> (will be used at the time of sample pickup)</span>
                                </div>
                                <div className="labelWrap">
                                    <input id="locality" name="lname" type="text" required />
                                    <label htmlFor="locality">Select Locality</label>
                                </div>
                                <div className="labelWrap">
                                    <input id="address" name="address" type="text" onChange={this.inputHandler.bind(this)} value={this.state.address} required ref="address" />
                                    <label htmlFor="address">House Address</label>
                                </div>
                                <div className="labelWrap">
                                    <input id="land_mark" name="land_mark" type="text" onChange={this.inputHandler.bind(this)} value={this.state.land_mark} required ref="land_mark" />
                                    <label htmlFor="land_mark">Land Mark</label>
                                </div>
                                <div className="labelWrap">
                                    <input id="pincode" name="pincode" type="text" onChange={this.inputHandler.bind(this)} value={this.state.pincode} required ref="pincode" />
                                    <label htmlFor="pincode">Pin Code</label>
                                </div>
                                <div className="form-group input-group">
                                    <label className="inline input-label">Price Label</label>
                                    <div className="choose-gender">
                                        <label className="radio-inline"><input value={'home'} onChange={this.inputHandler.bind(this)} checked={this.state.type == 'home'} type="radio" name="type" />Home</label>
                                        <label className="radio-inline"><input value={'office'} onChange={this.inputHandler.bind(this)} checked={this.state.type == 'office'} type="radio" name="type" />Office</label>
                                        <label className="radio-inline"><input value={'other'} onChange={this.inputHandler.bind(this)} checked={this.state.type == 'other'} type="radio" name="type" />Other</label>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>


                </section>
                {
                    this.state.edit ? <button className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn" onClick={this.submitForm.bind(this)}>Edit</button>
                        :
                        <button className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn" onClick={this.submitForm.bind(this)}>Add</button>
                }


            </div>
        );
    }
}


export default UserSignupView
