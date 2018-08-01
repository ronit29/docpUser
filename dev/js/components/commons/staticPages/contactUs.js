import React from 'react';

class ContactUs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        return (
            <div className="container about-container contact-container">
                <div className="row">
                    <div className="col-12 text-center">
                        <p className="fw-500 about-heading">Contact Us</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-12 contact-background">
                        <div className="contact-text">
                            Feel like contacting us? Submit your queries here and we will try to get back you as soon as possible
            </div>
                        <div className="gps">
                            <div className="contact-location">
                                Plot No. 119, Sector-44, Gurugram
                                - 122001, Haryana (India)
              </div>
                            <div className="arrow-down">
                            </div>
                            <div className="image-location">
                                <img src="/assets/img/customer-icons/location.png" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="shadow">
                            <div className="form-title mrt-10">Send Us a Message</div>
                            <form>
                                <div className="contact-fields">
                                    <input type="text" className="form-control" placeholder="Name" required />
                                </div>
                                <div className="contact-fields">
                                    <input type="email" className="form-control" placeholder="Email" required />
                                </div>
                                <div className="contact-fields">
                                    <input type="number" className="form-control" placeholder="Mobile Number" max={9999999999} min={7000000000} required />
                                </div>
                                <div className="contact-fields">
                                    <textarea className="form-control" placeholder="Message" rows={3} required defaultValue={""} />
                                </div>
                                <div className="submit">
                                    <button type="submit" className="btn submit-btn">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default ContactUs
