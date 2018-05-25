import React from 'react';

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
            otp: '',
            existingUser,
            showMedical: false
        }
    }

    inputHandler(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitForm() {
        // validate
        let register = true
        Object.keys(this.refs).forEach((prp, i) => {
            if (this.refs[prp].value) {
                this.refs[prp].style.border = ''
            } else {
                this.refs[prp].style.border = '1px solid red'
                register = false
            }
        })

        if (register) {
            if (this.state.existingUser) {
                this.props.createProfile(this.state, (err, res) => {
                    if (!err) {
                        this.setState({ showMedical: true })
                    }
                })
            } else {
                this.props.registerUser(this.state, (err, res) => {
                    this.setState({ showMedical: true })
                })
            }
        }
    }

    render() {

        return (
            <div>
                <header className="skin-white fixed horizontal top bdr-1 bottom light">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-2">
                                <ul className="inline-list">
                                    <li><span className="icon icon-sm text-middle back-icon-white"></span></li>
                                </ul>
                            </div>
                            <div className="col-8">
                                <div className="header-title fw-700 capitalize text-center">Signup User</div>
                            </div>
                            <div className="col-2">
                                {
                                    this.state.showMedical ? <div onClick={() => {
                                        this.props.history.go(-1)
                                    }} className="header-title fw-700 capitalize text-center text-primary">Skip</div> : ""
                                }
                            </div>
                        </div>
                    </div>
                </header>

                <section className="wrap validation-book-screen">

                    <div style={stepperStyle}>
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
                    </div>

                    {
                        !this.state.showMedical ?
                            <div className="widget no-round no-shadow">
                                <div className="widget-content">
                                    <form className="go-bottom" >
                                        {
                                            this.state.existingUser ? "" : <div className="labelWrap">
                                                <input id="otp" name="otp" type="text" value={this.state.otp} onChange={this.inputHandler.bind(this)} required ref="otp" />
                                                <label htmlFor="otp">Enter OTP</label>
                                            </div>
                                        }

                                        <div className="labelWrap">
                                            <input id="number" name="phone_number" type="text" onChange={this.inputHandler.bind(this)} value={this.state.phone_number} required ref="phone_number" />
                                            <label htmlFor="number">Mobile Number</label>
                                        </div>
                                        <div className="labelWrap">
                                            <input id="fname" name="name" type="text" value={this.state.name} onChange={this.inputHandler.bind(this)} required ref="name" />
                                            <label htmlFor="fname">Patient Name</label>
                                            <span className="text-xs text-light">(Appoinment valid only for the provided name)</span>
                                        </div>
                                        <div className="labelWrap">
                                            <input id="age" name="age" type="text" value={this.state.age} onChange={this.inputHandler.bind(this)} required ref="age" />
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
                                            <input id="email" name="email" type="text" value={this.state.email} onChange={this.inputHandler.bind(this)} required ref="email" />
                                            <label htmlFor="email">Email</label>
                                        </div>

                                    </form>
                                </div>
                            </div> : ""
                    }


                </section>

                <span className="errorMessage">{this.props.error_message}</span>
                {
                    this.state.showMedical ?
                        <button className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg">Done</button>
                        :
                        <button className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg" onClick={this.submitForm.bind(this)}>Next</button>
                }

            </div>
        );
    }
}


export default UserSignupView
