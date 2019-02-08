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

        const parsed = queryString.parse(this.props.location.search)

        this.state = {
            name: '',
            age: '',
            gender: 'm',
            email: '',
            phone_number: this.props.phoneNumber || '',
            existingUser,
            showMedical: false,
            err: "",
            referralCode: parsed.referral || null,
            have_referralCode: !!parsed.referral
        }
    }

    inputHandler(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    toggleReferral(e) {
        this.setState({ have_referralCode: e.target.checked })
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
                        validated = !/[^a-zA-Z ]/.test(this.refs[prp].value)
                    }
                    break
                }
                case "phone_number": {
                    if (!!this.refs[prp].value) {
                        validated = this.refs[prp].value.match(/^[56789]{1}[0-9]{9}$/)
                    } else {
                        validated = true
                    }
                    break
                }
                case "email": {
                    if (!!this.refs[prp].value) {
                        validated = this.refs[prp].value.match(/\S+@\S+\.\S+/)
                    } else {
                        validated = true
                    }
                    break
                }
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
            let post_data = this.state
            if (this.state.referralCode && this.state.have_referralCode) {
                post_data["referral_code"] = this.state.referralCode
            }

            this.props.createProfile(post_data, (err, res) => {
                if (!err) {
                    // this.setState({ showMedical: true })
                    const parsed = queryString.parse(this.props.location.search)
                    if (parsed.callback) {
                        this.props.history.replace(parsed.callback)
                    } else {
                        if (this.state.referralCode && this.state.have_referralCode) {
                            this.props.history.replace('/user')
                        } else {
                            this.props.history.go(-1)
                        }
                    }
                } else {
                    let message = "Error signing up user."
                    if (err.message) {
                        message = err.message
                    }
                    this.setState({ err: message })
                }
            })
        }
    }

    handleEnterPress(e) {
        if (e.key === 'Enter') {
            this.submitForm();
        }
    }

    render() {

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
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
                            </header> */}

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
                                                    <div className="widget mrng-top-12">
                                                        <div className="widget-content">
                                                            <form className="go-bottom" >

                                                                <div className="labelWrap">
                                                                    <input id="number" name="phone_number" type="text" onChange={this.inputHandler.bind(this)} value={this.state.phone_number} required ref="phone_number" onKeyPress={this.handleEnterPress.bind(this)} />
                                                                    <label htmlFor="number">Mobile Number</label>
                                                                </div>
                                                                <div className="labelWrap">
                                                                    <input id="fname" name="name" type="text" value={this.state.name} onChange={this.inputHandler.bind(this)} required ref="name" onKeyPress={this.handleEnterPress.bind(this)} />
                                                                    <label htmlFor="fname">{this.state.existingUser ? "Member" : "Patient"} Name</label>
                                                                    <span className="text-xs text-light">(Appointment valid only for the provided name)</span>
                                                                </div>
                                                                <div className="labelWrap">
                                                                    <input id="age" name="age" type="number" value={this.state.age} onChange={this.inputHandler.bind(this)} required ref="age" onKeyPress={this.handleEnterPress.bind(this)} />
                                                                    <label htmlFor="age">Age</label>
                                                                </div>
                                                                <div className="form-group input-group">
                                                                    <label className="inline input-label">Gender</label>
                                                                    <div className="choose-gender slt-label-radio">
                                                                        <div className="dtl-radio">
                                                                            <label className="container-radio">Male<input value={'m'} onChange={this.inputHandler.bind(this)} checked={this.state.gender == 'm'} type="radio" name="gender" /><span className="doc-checkmark"></span></label>
                                                                        </div>
                                                                        <div className="dtl-radio">
                                                                            <label className="container-radio">Female<input value={'f'} onChange={this.inputHandler.bind(this)} checked={this.state.gender == 'f'} type="radio" name="gender" /><span className="doc-checkmark"></span></label>
                                                                        </div>
                                                                        <div className="dtl-radio">
                                                                            <label className="container-radio">Other<input value={'o'} onChange={this.inputHandler.bind(this)} checked={this.state.gender == 'o'} type="radio" name="gender" /><span className="doc-checkmark"></span></label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="labelWrap">
                                                                    <input id="email" name="email" type="email" value={this.state.email} onChange={this.inputHandler.bind(this)} required ref="email" onKeyPress={this.handleEnterPress.bind(this)} />
                                                                    <label htmlFor="email">Email</label>
                                                                </div>
                                                                <div className="referral-select">
                                                                    <label className="ck-bx" style={{ fontWeight: '600', fontSize: '14px' }}>I have a referral code<input type="checkbox" onClick={this.toggleReferral.bind(this)} checked={this.state.have_referralCode} /><span className="checkmark"></span></label>
                                                                </div>
                                                                {
                                                                    this.state.have_referralCode ? <div className="referralContainer">
                                                                        <div className="slt-nw-input">
                                                                            <input style={{ paddingRight: '80px' }} type="text" className="slt-text-input" onChange={this.inputHandler.bind(this)} placeholder="Enter here" name="referralCode" value={this.state.referralCode} />
                                                                        </div>
                                                                    </div> : ""
                                                                }
                                                            </form>
                                                        </div>
                                                    </div> : ""
                                            }


                                        </section>

                                        <span className="errorMessage">{this.state.err}</span>
                                        <span className="errorMessage">{this.props.error_message}</span>

                                        {
                                            this.state.showMedical ?
                                                <button className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg static-btn">Done</button>
                                                :
                                                <button className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg static-btn" onClick={this.submitForm.bind(this)}>Next</button>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>

                        <RightBar noChatButton={true} />
                    </div>
                </section>
            </div>
        );
    }
}


export default UserSignupView
