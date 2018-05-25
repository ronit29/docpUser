import React from 'react';

class BasicDetails extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

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
                                <input id="fname" className="fc-input error-outline" name="fname" type="text" required />
                                <label htmlFor="fname">Doctor Name</label>
                            </div>
                            <div className="form-group input-group">
                                <label className="inline input-label">Gender</label>
                                <div className="choose-gender">
                                    <label className="radio-inline"><input type="radio" name="optradio" />Male</label>
                                    <label className="radio-inline"><input type="radio" name="optradio" />Female</label>
                                    <label className="radio-inline"><input type="radio" name="optradio" />Other</label>
                                </div>
                            </div>
                            <div className="labelWrap">
                                <input id="age" name="lname" type="text" required />
                                <label htmlFor="age">Age</label>
                            </div>
                            <div className="labelWrap">
                                <input id="email" name="lname" type="text" required />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="labelWrap">
                                <input id="number" name="lname" type="text" required />
                                <label htmlFor="number">Mobile Number</label>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}


export default BasicDetails
