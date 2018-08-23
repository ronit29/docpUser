import React from 'react';

class UserSignupView extends React.Component {
    constructor(props) {
        super(props)

        let { profiles, selectedProfile, defaultProfile } = this.props.USER
        let def_profile = null
        if (profiles && profiles[defaultProfile]) {
            def_profile = profiles[defaultProfile]
        }

        this.state = {
            address: '',
            land_mark: '',
            pincode: '',
            locality: '',
            type: 'home',
            phone_number: def_profile ? def_profile.phone_number : "",
            edit: !!this.props.match.params.id,
            land_mark_results: [],
            locality_results: []
        }
    }

    getLocation(location, resultField) {
        var auto = new google.maps.places.AutocompleteService()

        var request = {
            input: location,
            types: ['(regions)'],
            componentRestrictions: { country: 'in' }
        };
        if (location) {
            auto.getPlacePredictions(request, function (results, status) {
                results = results || []
                this.setState({ [resultField]: results })
            }.bind(this))
        } else {
            this.setState({ [resultField]: [] })
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

        // if (e.target.name == 'land_mark') {
        //     this.getLocation(e.target.value, 'land_mark_results')
        // }

        // if (e.target.name == 'locality') {
        //     this.getLocation(e.target.value, 'locality_results')
        // }
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
                {/* <header className="skin-white fixed horizontal top bdr-1 bottom light sticky-header">
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
                </header> */}

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
                                    <input id="locality" name="locality" type="text" onChange={this.inputHandler.bind(this)} value={this.state.locality} required />
                                    <label htmlFor="locality">Select Locality</label>

                                    {
                                        this.state.locality_results.length ? <div className="panel-content pd-0">
                                            <ul className="list city-list">
                                                {
                                                    this.state.locality_results.map((result, i) => {
                                                        return <li key={i}>
                                                            <a>{result.description}
                                                                <span className="city-loc">City</span>
                                                            </a>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </div> : ""
                                    }


                                </div>
                                <div className="labelWrap">
                                    <input id="address" name="address" type="text" onChange={this.inputHandler.bind(this)} value={this.state.address} required ref="address" />
                                    <label htmlFor="address">House Address</label>
                                </div>
                                <div className="labelWrap">
                                    <input id="land_mark" name="land_mark" type="text" onChange={this.inputHandler.bind(this)} value={this.state.land_mark} required ref="land_mark" />
                                    <label htmlFor="land_mark">Land Mark</label>

                                    {
                                        this.state.land_mark_results.length ? <div className="panel-content pd-0">
                                            <ul className="list city-list">
                                                {
                                                    this.state.land_mark_results.map((result, i) => {
                                                        return <li key={i}>
                                                            <a>{result.description}
                                                                <span className="city-loc">City</span>
                                                            </a>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </div> : ""
                                    }


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
