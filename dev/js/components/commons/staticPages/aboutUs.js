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
        if (this.props.fromApp) {
            mainClass = "container about-container appUrlPadding"
            headingClass = "col-12 text-center d-none d-md-block"
        } else {
            mainClass = 'container about-container'
            headingClass = "col-12 text-center"
        }

        return (
            <div>
                <div className={mainClass}>
                    <HelmetTags tagsData={{
                        title: ('About Us | Docprime'),
                        description: ('Docprime: Docprime is one stop health care solution for patients and doctors. Patients can book doctors online and doctors can manage patients online.')
                    }} />
                    <div className="row">
                        <div className={headingClass}>
                            <p className="fw-500 about-heading">About Us</p>
                        </div>
                        <div className="col-12">
                            {
                                this.props.fromApp ? <span>This Mobile App is managed and operated by Docprime Technologies Private Limited. </span> : ''
                            }
                            <p className="fw-500 about-content">
                                Docprime, a PolicyBazaar group company, is a young online medical services provider. Started with a team of young, experienced and vibrant professionals, the company has a humanitarian approach towards providing easy access to health care services.</p>
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
                                <p className="feature-content">The Docprime platform is easy to navigate and has a straightforward approach. The minimalist design of the website ensures that the consumers can find the information for their reference swiftly and effortlessly.</p>
                            </div>
                        </div>
                        <div className="col-12 about-content-div">
                            <p className="fw-500 about-content">Docprime is dedicated towards the welfare of the people and to make a closely knit community of doctors and patients.</p>
                            <p className="fw-500 about-content">Today, the average lifestyle of a human being is fast-paced. In this fast-paced lifestyle, people ignore their health that leads to several health complications. At Docprime, we aim to be the guide and the helping hand to ensure better health for everyone and help them at each step towards health improvement.</p>
                            <p className="fw-500 about-content">Docprime aims at connecting people by providing them with every piece of information they need to secure themselves and their family’s well-being. Assessing health issues, consulting experienced medical practitioners and storing health records are few services offered by the company.</p>
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
                                        <p className="step-data fw-500">Get Docprime app for seamless online chat consultation</p>
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
                                    <p className="fw-500 step-heading">Become a Partner with Docprime</p>
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
                            <p className="fw-500 about-content">Docprime ensures that you get the right solution and treatment, and that is why we have hired country’s best and most experienced doctors who are knowledgeable, skilled and the best in their areas of expertise. They are available to solve your health related queries and provide on-demand healthcare solutions, 24X7X365.</p>
                            <p className="fw-500 about-content">At Docprime, we understand the value of your time and that’s why we want to offer you the best healthcare right from the comfort of your home. We provide doctors, physiotherapists and nurses for home visits to ensure that you don’t need to step out when the need arises.</p>
                            <p className="fw-500 about-content">We aim to tap the latest technology to find solutions to various issues in order to disrupt the global healthcare delivery system. Our innovative healthcare solutions are a step towards bridging the gap between healthcare experts and the patients.</p>
                        </div>
                        <div className="col-12">
                            <button onClick={() => { this.props.fromApp ? this.navigateTo("/contact?fromApp=true") : this.navigateTo("/contact") }} className="contact-btn">Contact Us</button>
                        </div>
                    </div>
                </div>
                <div className="about_managment_container">
                    <div className="container">
                        <div className={headingClass}>
                            <p className="fw-500 about-heading">About management</p>
                        </div>
                        <div className="about_mng_card_cont">
                            <div className="row">
                                <div className="col-md-12 col-lg-6 mrng-bottom-20">
                                    <div className="about_mng_cards">
                                        <div className="abt-img-text">
                                            <img src={ASSETS_BASE_URL + "/img/abt-img/ys.png"} />
                                            <div className="abt-usr-nm">
                                                <h4>Yashish Dahiya</h4>
                                                <p>Co-founder & CEO, </p>
                                                <p>PolicyBazaar Group of Companies</p>
                                            </div>
                                        </div>
                                        <div className="abt-content">
                                            <p>Yashish Dahiya is the Chief Executive Officer and Co-Founder of PolicyBazaar Group of Companies. He has built Policybazaar.com into a 3,000-crore plus insurance marketplace within a short span of 10 years. Under his leadership, the group company started PaisaBazaar.com, an online financial marketplace for investment and lending products in 2014.  With the backing of a host of investors, Yashish has now set his sights on transforming the healthcare industry overall with the launch of Docprime.com. Before starting his entrepreneurial journey with PolicyBazaar.com, he was the Managing Director of ebookers.com, a leading pan-European online travel distributor, which was also an FTSE 250 company listed on Nasdaq. Yashish was also a management consultant with Bain & Co. in their London office. Yashish holds a Bachelor’s Degree in Engineering from IIT Delhi, a Post Graduate Diploma in Management from IIM Ahmedabad, and an MBA from INSEAD. Yashish likes to spend his spare time outdoors, is the current masters national champion in swimming and is the fifth fastest Ironman from India across all ages. </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-6 mrng-bottom-20">
                                    <div className="about_mng_cards">
                                        <div className="abt-img-text">
                                            <img src={ASSETS_BASE_URL + "/img/abt-img/alk.png"} />
                                            <div className="abt-usr-nm">
                                                <h4>Alok Bansal</h4>
                                                <p>Co-founder & CFO, </p>
                                                <p>PolicyBazaar Group of Companies</p>
                                            </div>
                                        </div>
                                        <div className="abt-content">
                                            <p>Alok Bansal is the Co-Founder & CFO of PolicyBazaar Group of Companies . He heads various functions including corporate finance and controllership, tax, treasury, strategic planning, and analytics. He firmly believes that the primary responsibility of a CFO is to accomplish business goals rather than just concentrating on functional goals. According to him, the success of any business lies in working with a team with different mind sets, allowing them the flexibility and freedom to experiment, innovate and contribute. Alok’s core strength lies in strategic thinking, process control, and execution. Prior to joining PolicyBazaar.com, Alok has worked in various cross-functional leadership roles with Mahindra & Mahindra, iGate Global Solutions and GE. He was recognized as one of the top 100 CFOs in the country by the CFO India Magazine in 2016. Alok has a special interest in science and technology, economic empowerment, education and civil rights.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-6 mrng-bottom-20">
                                    <div className="about_mng_cards">
                                        <div className="abt-img-text">
                                            <img src={ASSETS_BASE_URL + "/img/abt-img/ash.png"} />
                                            <div className="abt-usr-nm">
                                                <h4>Ashish Gupta </h4>
                                                <p>CEO, Docprime.com and </p>
                                                <p>Chief Tech Evangelist, Policybazaar.com </p>
                                            </div>
                                        </div>
                                        <div className="abt-content">
                                            <p>
                                                Ashish Gupta is currently the CEO of Docprime.com and is responsible for running all facets of the business. He is passionate about the health industry and in his present position, committed to build an integrated ecosystem to bridge the gap between doctors and patients.  Prior to this, he served as the Chief Technology Officer (CTO) of Policybazaar.com which he joined in 2015. With an overall experience of 16 years, Ashish has been at a realm of many innovations. Before joining the revolutionary online insurance company, Ashish was the Vice-President and CTO at HealthKart, a premier e-health store. He also had his own start-up called CouponVoodoo.com, which aimed at simplifying a shopper’s buying decision based upon pricing.  His initial few jobs included being a management trainee with the automotive division of ICI Paints and learning and growing by being involved in other cross-functional roles. Apart from working, he enjoys traveling and exploring other countries or cities. A graduate in Chemical Engineering from IIT Delhi, Ashish loves being behind the wheels and going on long drives.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-6 mrng-bottom-20">
                                    <div className="about_mng_cards">
                                        <div className="abt-img-text">
                                            <img src={ASSETS_BASE_URL + "/img/abt-img/abhay.png"} />
                                            <div className="abt-usr-nm">
                                                <h4>Abhay Singavi</h4>
                                                {/* <p>Co-founder & </p> */}
                                                <p>Chief Operating Officer</p>
                                                <p>Docprime.com</p>
                                            </div>
                                        </div>
                                        <div className="abt-content">
                                            <p>Abhay Singavi is Chief Operating Officer at Docprime.com.  He is responsible for executing the company’s business strategy, driving the overall growth and performance of key business units. Abhay brings in more than 12 years of leadership experience in the healthcare sector.
<br/>
<br/>
                                                 Prior to joining Docprime, Abhay was leading key strategic initiatives covering clinical outcomes, service excellence, operation optimization, business innovation and a variety of leadership roles at Medanta for 7 years. He was also youngest CEO in the healthcare industry while he served at Narayana Health group as CEO - Preventive Health where he was instrumental in handling the preventive health and wellness management across group.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


export default AboutUs
