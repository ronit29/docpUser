import React from 'react';

class BasicDetails extends React.Component {
    constructor(props) {
        super(props)
    }

    handleChange(key, e) {
        this.props.updateProfile(key, e.target.value)
    }

    render() {

        let { name, email, gender, phone_number, profile_image, id } = this.props.profileData

        return (
            <section className="wrap myProfile">
                <div className="widget no-shadow no-radius">
                    <div className="widget-content">
                        <div className="profile-icon">
                            <img src="/assets/img/icons/drIcon.jpg" className="img-fluid img-round" />
                            <span className="cam-icon"><img src="/assets/img/icons/cam-md.png" className="img-fluid cam-icon-img" /></span>
                        </div>
                    </div>
                </div>
                <div className="widget no-shadow no-radius">
                    <div className="widget-content">
                        <form className="go-bottom">
                            <div className="labelWrap">
                                <input value={name} onChange={this.handleChange.bind(this, 'name')} id="fname" className="fc-input error-outline" name="fname" type="text" required />
                                <label htmlFor="fname">Name</label>
                            </div>
                            <div className="form-group input-group">
                                <label className="inline input-label">Gender</label>
                                <div className="choose-gender">
                                    <label className="radio-inline"><input type="radio" name="optradio" checked={gender == "m"} value={'m'} onChange={this.handleChange.bind(this, 'gender')}/>Male</label>
                                    <label className="radio-inline"><input type="radio" name="optradio" checked={gender == "f"} value={'f'} onChange={this.handleChange.bind(this, 'gender')}/>Female</label>
                                    <label className="radio-inline"><input type="radio" name="optradio" checked={gender == "o"} value={'o'} onChange={this.handleChange.bind(this, 'gender')}/>Other</label>
                                </div>
                            </div>
                            {/* <div className="labelWrap">
                                <input value={name} onChange={this.handleChange.bind(this, 'name')} id="age" name="lname" type="text" required />
                                <label htmlFor="age">Age</label>
                            </div> */}
                            <div className="labelWrap">
                                <input value={email} onChange={this.handleChange.bind(this, 'email')} id="email" name="lname" type="text" required />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="labelWrap">
                                <input value={phone_number||""} onChange={this.handleChange.bind(this, 'phone_number')} id="number" name="lname" type="text" required />
                                <label htmlFor="number">Mobile Number</label>
                            </div>

                            <a href="" onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                this.props.manageAddress()
                            }}>Manage My Address ---></a>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}


export default BasicDetails
