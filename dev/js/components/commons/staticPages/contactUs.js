import React from 'react';
import SnackBar from 'node-snackbar'
import HelmetTags from '../HelmetTags'

class ContactUs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            mobile: "",
            email: "",
            message: ""
        }
    }

    changeHandler = (event, key) => {
        this.setState({
            [key]: event.target.value
        });
    }

    onSubmitData(e) {
        e.preventDefault();
        this.props.submitContactMessage(this.state, (error, res) => {
            this.setState({
                name: "",
                mobile: "",
                email: "",
                message: ""
            });
            SnackBar.show({ pos: 'bottom-center', text: "Contact Request taken successfully." });
        });
    }

    render() {
        let mainClass
        if(this.props.fromApp){
            mainClass = "container about-container appUrlPadding"
        }else{
            mainClass = 'container about-container'
        }
        return (
            <div className={mainClass}>
                <HelmetTags tagsData={{
                    title: ('Contact Us | docprime'),
                    description: ('Contact Us: Contact docprime for query related to booking, signup and more.')
                }} />
                <div className="row">
                    <div className="col-12 text-center">
                        <p className="fw-500 about-heading">Contact Us</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-12 contact-background">
                        <div className="contact-text">
                            Feel like contacting us? Submit your queries here and we will try to get back you as soon as possible. You can also mail us at customercare@docprime.com or call our customer care executive on 1800-123-9419.
                        </div>
                        <div className="gps">
                            <div className="contact-location">
                                Plot No. 119, Sector-44, Gurugram
                                - 122001, Haryana (India)
                            </div>
                            <div className="arrow-down">
                            </div>
                            <div className="image-location">
                                <img src={ASSETS_BASE_URL + "/img/customer-icons/location.png"} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="shadow">
                            <div className="form-title mrt-10">Send Us a Message</div>
                            <form onSubmit={this.onSubmitData.bind(this)}>
                                <div className="contact-fields">
                                    <input type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={(e) => { this.changeHandler(e, 'name') }} required />
                                </div>
                                <div className="contact-fields">
                                    <input type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={(e) => { this.changeHandler(e, 'email') }} required />
                                </div>
                                <div className="contact-fields">
                                    <input type="number" className="form-control" placeholder="Mobile Number" max={9999999999} min={5000000000} value={this.state.mobile} onChange={(e) => { this.changeHandler(e, 'mobile') }} required />
                                </div>
                                <div className="contact-fields">
                                    <textarea className="form-control" placeholder="Message" rows={3} value={this.state.message} onChange={(e) => { this.changeHandler(e, 'message') }} required />
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
