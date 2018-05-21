import React from 'react';

class UserSignupView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            appoinmentFor: 'self',
            patientName: '',
            age: '',
            gender: 'm',
            email: '',
            phoneNumber: ''
        }
    }

    inputHandler(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitForm() {

    }

    render() {

        return (
            <div>
                <header className="skin-white fixed horizontal top bdr-1 bottom light">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-2">
                                <ul className="inline-list">
                                    <li><span className="icon icon-sm text-middle back-icon-white"><img src="/assets/img/customer-icons/back-icon.png" className="img-fluid" /></span></li>
                                </ul>
                            </div>
                            <div className="col-8">
                                <div className="header-title fw-700 capitalize text-center">Add User Profile</div>
                            </div>
                            <div className="col-2">
                            </div>
                        </div>
                    </div>
                </header>

                <section className="wrap validation-book-screen">
                    <div className="widget no-round no-shadow">
                        <div className="widget-header">
                            <h4 className="widget-title">Contact Details</h4>
                        </div>
                        <div className="widget-content">
                            <form className="go-bottom" >
                                <div className="form-group input-group">
                                    <label className="inline input-label">Appointment for</label>
                                    <div className="choose-gender">
                                        <label className="radio-inline"><input value={'self'} onChange={this.inputHandler.bind(this)} checked={this.state.appoinmentFor == 'self'} type="radio" name="appoinmentFor" />Self</label>
                                        <label className="radio-inline"><input value={'else'} onChange={this.inputHandler.bind(this)} checked={this.state.appoinmentFor == 'else'} type="radio" name="appoinmentFor" />Someone else</label>
                                    </div>
                                </div>
                                <div className="labelWrap">
                                    <input id="fname" name="patientName" type="text" value={this.state.patientName} onChange={this.inputHandler.bind(this)} required />
                                    <label htmlFor="fname">Patient Name</label>
                                    <span className="text-xs text-light">(Appoinment valid only for the provided name)</span>
                                </div>
                                <div className="labelWrap">
                                    <input id="age" name="age" type="text" value={this.state.age} onChange={this.inputHandler.bind(this)} required />
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
                                    <input id="email" name="email" type="text" value={this.state.email} onChange={this.inputHandler.bind(this)} required />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="labelWrap">
                                    <input id="number" name="phoneNumber" type="text" value={this.state.phoneNumber} onChange={this.inputHandler.bind(this)} required />
                                    <label htmlFor="number">Mobile Number</label>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
                
                <button className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg" onClick={this.submitForm.bind(this)}>Continue</button>
            </div>
        );
    }
}


export default UserSignupView
