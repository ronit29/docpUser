import React from 'react';
const queryString = require('query-string');

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'

const stepperStyle = {
    padding: 60,
    paddingBottom: 0,
    paddingTop: 10,
}


class UserSignupView extends React.Component {
    constructor(props) {
        super(props)

        let existingUser = false
        if (this.props.location.search.includes('existing')) {
            // create profile scenario
            existingUser = true
        }

        this.state = {
            name: '',
            age: '',
            gender: 'm',
            email: '',
            phone_number: this.props.phoneNumber || '',
            existingUser,
            showMedical: false,
            err: ""
        }
    }

    inputHandler(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitForm() {
        this.setState({ err: "" })
        // validate
        let register = true
        Object.keys(this.refs).forEach((prp, i) => {
            let validated = false
            switch (this.refs[prp].name) {
                case "name": {
                    if (!this.refs[prp].value) {
                        validated = false
                    } else {
                        validated = !/[^a-zA-Z0-9 ]/.test(this.refs[prp].value)
                    }
                    break
                }
                // case "phone_number": {
                //     validated = this.refs[prp].value.match(/^[789]{1}[0-9]{9}$/)
                //     break
                // }
                // case "email": {
                //     validated = this.refs[prp].value.match(/\S+@\S+\.\S+/)
                //     break
                // }
                case "age": {
                    validated = this.refs[prp].value > 0 && this.refs[prp].value < 100
                    break
                }
                default: {
                    validated = true
                    break
                }
            }
            if (validated) {
                this.refs[prp].style.border = ''
            } else {
                this.refs[prp].style.border = '1px solid red'
                register = false
            }
        })

        if (register) {
            this.props.createProfile(this.state, (err, res) => {
                if (!err) {
                    // this.setState({ showMedical: true })
                    const parsed = queryString.parse(this.props.location.search)
                    if (parsed.callback) {
                        this.props.history.replace(parsed.callback)
                    } else {
                        this.props.history.go(-1)
                    }
                } else {
                    this.setState({ err: "Error signing up user." })
                }
            })
        }
    }

    render() {

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container parent-section book-appointment-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-0 center-column">
                            <header className="skin-white fixed horizontal top bdr-1 bottom light sticky-header">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-2">
                                            <ul className="inline-list">
                                                <li onClick={() => {
                                                    this.props.history.go(-1)
                                                }}><span className="icon icon-sm text-middle back-icon-white"><img src="/assets/img/customer-icons/back-icon.png" className="img-fluid" /></span></li>
                                            </ul>
                                        </div>
                                        <div className="col-8">
                                            <div className="header-title fw-700 capitalize text-center">{this.state.existingUser ? "Add Profile" : "Signup User"}</div>
                                        </div>
                                        <div className="col-2">
                                            {
                                                this.state.showMedical ? <div onClick={() => {
                                                    const parsed = queryString.parse(this.props.location.search)
                                                    if (parsed.callback) {
                                                        this.props.history.replace(parsed.callback)
                                                    } else {
                                                        this.props.history.go(-1)
                                                    }
                                                }} className="header-title fw-700 capitalize text-center text-primary">Skip</div> : ""
                                            }
                                        </div>
                                    </div>
                                </div>
                            </header>

                            <section className="validation-book-screen">

                                {/* <div style={stepperStyle}>
                                    <div className="col-12">
                                        <div className="app-timeline book-confirmed-timeline">
                                            <ul className="inline-list">
                                                <li className={!this.state.showMedical ? "active" : ""}>
                                                    <span className="dot">1</span>
                                                    <p className="text-sm fw-700 text-light">Details</p>
                                                </li>
                                                <li>

                                                </li>
                                                <li className={this.state.showMedical ? "active" : ""}>
                                                    <span className="dot">2</span>
                                                    <p className="text-sm fw-700 text-light">Medical</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div> */}

                                {
                                    !this.state.showMedical ?
                                        <div className="widget no-round no-shadow">
                                            <div className="widget-content">
                                                <form className="go-bottom" >

                                                    <div className="labelWrap">
                                                        <input id="number" name="phone_number" type="text" onChange={this.inputHandler.bind(this)} value={this.state.phone_number} required ref="phone_number" />
                                                        <label htmlFor="number">Mobile Number</label>
                                                    </div>
                                                    <div className="labelWrap">
                                                        <input id="fname" name="name" type="text" value={this.state.name} onChange={this.inputHandler.bind(this)} required ref="name" />
                                                        <label htmlFor="fname">{this.state.existingUser ? "Member" : "Patient"} Name</label>
                                                        <span className="text-xs text-light">(Appointment valid only for the provided name)</span>
                                                    </div>
                                                    <div className="labelWrap">
                                                        <input id="age" name="age" type="number" value={this.state.age} onChange={this.inputHandler.bind(this)} required ref="age" />
                                                        <label htmlFor="age">Age</label>
                                                    </div>
                                                    <div className="form-group input-group">
                                                        <label className="inline input-label">Gender</label>
                                                        <div className="choose-gender">
                                                            <label className="radio-inline"><input value={'m'} onChange={this.inputHandler.bind(this)} checked={this.state.gender == 'm'} type="radio" name="gender" />Male</label>
                                                            <label className="radio-inline"><input value={'f'} onChange={this.inputHandler.bind(this)} checked={this.state.gender == 'f'} type="radio" name="gender" />Female</label>
                                                            <label className="radio-inline"><input value={'o'} onChange={this.inputHandler.bind(this)} checked={this.state.gender == 'o'} type="radio" name="gender" />Other</label>
                                                        </div>
                                                    </div>
                                                    <div className="labelWrap">
                                                        <input id="email" name="email" type="email" value={this.state.email} onChange={this.inputHandler.bind(this)} required ref="email" />
                                                        <label htmlFor="email">Email</label>
                                                    </div>

                                                </form>
                                            </div>
                                        </div> : ""
                                }


                            </section>

                            <span className="errorMessage">{this.state.err}</span>
                            <span className="errorMessage">{this.props.error_message}</span>

                            {
                                this.state.showMedical ?
                                    <button className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn">Done</button>
                                    :
                                    <button className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn" onClick={this.submitForm.bind(this)}>Next</button>
                            }

                        </div>

                        <RightBar />
                    </div>
                </section>
            </div>
        );
    }
}


export default UserSignupView
