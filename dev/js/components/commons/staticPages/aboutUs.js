import React from 'react';
import HelmetTags from '../HelmetTags'

class AboutUs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    navigateTo(where) {
        this.props.history.push(where)
    }

    render() {
        let mainClass
        let headingClass
        if(this.props.fromApp){
            mainClass = "container about-container appUrlPadding"
            headingClass = "col-12 text-center d-none d-md-block"
        }else{
            mainClass = 'container about-container'
            headingClass = "col-12 text-center"
        }

        return (
            <div className={mainClass}>
                <HelmetTags tagsData={{
                    title: ('About Us | docprime'),
                    description: ('docprime: docprime is one stop health care solution for patients and doctors. Patients can book doctors online and doctors can manage patients online.')
                }} />
                <div className="row">
                    <div className={headingClass}>
                        <p className="fw-500 about-heading">About Us</p>
                    </div>
                    <div className="col-12">
                        <p className="fw-500 about-content">docprime, a PolicyBazaar group company, is a young online medical services provider. Started with a team of young, experienced and vibrant professionals, the company has a humanitarian approach towards providing easy access to health care services.</p>
                    </div>
                    <div className="col-12 col-md-4 feature-col">
                        <div className="feature-img-div text-center">
                            <img src={ASSETS_BASE_URL + "/img/customer-icons/about-1.png"} className="feature-img" />
                        </div>
                        <div className="feature-div text-center">
                            <p className="fw-500 feature-heading">Affordable</p>
                            <p className="feature-content">We offer our multiple services at an affordable price. We aim at making health care services easily accessible and affordable to ensure that patients do not hesitate while consulting doctors online.</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 feature-col">
                        <div className="feature-img-div text-center">
                            <img src={ASSETS_BASE_URL + "/img/customer-icons/about-2.png"} className="feature-img" />
                        </div>
                        <div className="feature-div text-center">
                            <p className="fw-500 feature-heading">Safe</p>
                            <p className="feature-content">We work round the clock to ensure highest levels of data security. With our platform, the records of both, the patients and the doctors are safe. Our separate infrastructure ensures that the provider’s data and the consumer’s data are isolated from each other.</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 feature-col">
                        <div className="feature-img-div text-center">
                            <img src={ASSETS_BASE_URL + "/img/customer-icons/about-3.png"} className="feature-img" />
                        </div>
                        <div className="feature-div text-center">
                            <p className="fw-500 feature-heading">Straight Forward</p>
                            <p className="feature-content">The docprime platform is easy to navigate and has a straightforward approach. The minimalist design of the website ensures that the consumers can find the information for their reference swiftly and effortlessly.</p>
                        </div>
                    </div>
                    <div className="col-12 about-content-div">
                        <p className="fw-500 about-content">docprime is dedicated towards the welfare of the people and to make a closely knit community of doctors and patients.</p>
                        <p className="fw-500 about-content">Today, the average lifestyle of a human being is fast-paced. In this fast-paced lifestyle, people ignore their health that leads to several health complications. At docprime, we aim to be the guide and the helping hand to ensure better health for everyone and help them at each step towards health improvement.</p>
                        <p className="fw-500 about-content">docprime aims at connecting people by providing them with every piece of information they need to secure themselves and their family’s well-being. Assessing health issues, consulting experienced medical practitioners and storing health records are few services offered by the company.</p>
                        <p className="fw-500 about-content">Not only are we dedicated to providing a better health to people, we also ensure that they get easy access to country’s best doctors in the most convenient and affordable ways. On our way to creating an experience truly prime for users and healthcare experts, we overcome multitudinous challenges almost every day.</p>
                    </div>
                    <div className="col-12 col-md-4 about-steps-div">
                        <div className="about-steps">
                            <div className="step-icon-div">
                                <img src={ASSETS_BASE_URL + "/img/customer-icons/step-calendar.svg"} />
                            </div>
                            <div className="step-heading-div text-center">
                                <p className="fw-500 step-heading">Book Appointments</p>
                            </div>
                            <div className="step-content-div">
                                <div className="step-content">
                                    <div className="step-circle" />
                                    <p className="step-data fw-500">10,000+ Verified Doctors</p>
                                </div>
                                <div className="step-content">
                                    <div className="step-circle" />
                                    <p className="step-data fw-500">Book Appointments 24*7</p>
                                </div>
                                <div className="step-content">
                                    <div className="step-circle" />
                                    <p className="step-data fw-500">Find Doctors Easily</p>
                                </div>
                                <div className="step-content">
                                    <div className="step-circle" />
                                    <p className="step-data fw-500">Efficient Patient Administration</p>
                                </div>
                                <div className="step-content">
                                    <div className="step-circle" />
                                    <p className="step-data fw-500">Swift Appointment Confirmation</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 about-steps-div">
                        <div className="about-steps">
                            <div className="step-icon-div">
                                <img src={ASSETS_BASE_URL + "/img/customer-icons/step-chat.svg"} />
                            </div>
                            <div className="step-heading-div text-center">
                                <p className="fw-500 step-heading">Online Chat Consultation</p>
                            </div>
                            <div className="step-content-div">
                                <div className="step-content">
                                    <div className="step-circle" />
                                    <p className="step-data fw-500">Get docprime app for seamless online chat consultation</p>
                                </div>
                                <div className="step-content">
                                    <div className="step-circle" />
                                    <p className="step-data fw-500">Low Response Time</p>
                                </div>
                                <div className="step-content">
                                    <div className="step-circle" />
                                    <p className="step-data fw-500">Verified Doctors Available at your Disposal</p>
                                </div>
                                <div className="step-content">
                                    <div className="step-circle" />
                                    <p className="step-data fw-500">100% Confidential and Private</p>
                                </div>
                                <div className="step-content">
                                    <div className="step-circle" />
                                    <p className="step-data fw-500">On-Demand Consultation Available Anytime and Anywhere</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 about-steps-div">
                        <div className="about-steps">
                            <div className="step-icon-div">
                                <img src={ASSETS_BASE_URL + "/img/customer-icons/step-partner.svg"} />
                            </div>
                            <div className="step-heading-div text-center">
                                <p className="fw-500 step-heading">Become a Partner with docprime</p>
                            </div>
                            <div className="step-content-div">
                                <div className="step-content">
                                    <div className="step-circle" />
                                    <p className="step-data fw-500">Reach New Patients</p>
                                </div>
                                <div className="step-content">
                                    <div className="step-circle" />
                                    <p className="step-data fw-500">Maximize your Earnings</p>
                                </div>
                                <div className="step-content">
                                    <div className="step-circle" />
                                    <p className="step-data fw-500">Keep Track of Patients and their Feedback</p>
                                </div>
                                <div className="step-content">
                                    <div className="step-circle" />
                                    <p className="step-data fw-500">Edit your Profile Effortlessly</p>
                                </div>
                                <div className="step-content">
                                    <div className="step-circle" />
                                    <p className="step-data fw-500">Chat With Patients without Giving your Personal Contact Details</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 about-content-div">
                        <p className="fw-500 about-content">docprime ensures that you get the right solution and treatment, and that is why we have hired country’s best and most experienced doctors who are knowledgeable, skilled and the best in their areas of expertise. They are available to solve your health related queries and provide on-demand healthcare solutions, 24X7X365.</p>
                        <p className="fw-500 about-content">At docprime, we understand the value of your time and that’s why we want to offer you the best healthcare right from the comfort of your home. We provide doctors, physiotherapists and nurses for home visits to ensure that you don’t need to step out when the need arises.</p>
                        <p className="fw-500 about-content">We aim to tap the latest technology to find solutions to various issues in order to disrupt the global healthcare delivery system. Our innovative healthcare solutions are a step towards bridging the gap between healthcare experts and the patients.</p>
                    </div>
                    <div className="col-12">
                        <button onClick={() => { this.props.fromApp?this.navigateTo("/contact?fromApp=true"):this.navigateTo("/contact") }} className="contact-btn">Contact Us</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default AboutUs
