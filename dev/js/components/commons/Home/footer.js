import React from 'react';
import { withRouter } from 'react-router'

class Footer extends React.Component {
    constructor(props) {
        super(props)
    }

    navigateTo(where) {
        this.props.history.push(where)
    }

    render() {

        let menu = []
        if (this.props.footerData && this.props.footerData.menu && this.props.footerData.menu.length) {
            menu = this.props.footerData.menu
        }

        return (
            <footer className="profile-footer">

                {/* <div className="container-fluid footer-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-4 offset-md-4">
                                <a href="javascript:;">
                                    <div className="logo-img-div">
                                        <img src={ASSETS_BASE_URL + "/img/logo-sm.png"} className="footer-logo-icon" />
                                    </div>
                                </a>
                                <div className="copyright-info">
                                    <p>docprime.com Copyright &copy; 2018.</p>
                                    <p>All rights reserved.</p>
                                    <p>DOCPRIME TECHNOLOGIES PRIVATE LIMITED</p>
                                    <p>CIN : U74999HR2016PTC064312</p>
                                </div>
                                <div className="row social-icons-row">
                                    <div className="social-icon">
                                        <a href="https://www.youtube.com/channel/UCL_6Tstix2ACaBk0jwf_1ug" target="_blank"><img src={ASSETS_BASE_URL + "/img/customer-icons/youtube.svg"} alt="docprime YouTube" /></a>
                                    </div>
                                    <div className="social-icon">
                                        <a href="https://www.instagram.com/docprimeIndia/" target="_blank"><img src={ASSETS_BASE_URL + "/img/customer-icons/instagram.svg"} alt="docprime Instagram" /></a>
                                    </div>
                                    <div className="social-icon">
                                        <a href="https://www.facebook.com/DocPrimeIndia" target="_blank"><img src={ASSETS_BASE_URL + "/img/customer-icons/facebook.svg"} alt="docprime Facebook" /></a>
                                    </div>
                                    <div className="social-icon">
                                        <a href="https://twitter.com/DocPrimeindia" target="_blank"><img src={ASSETS_BASE_URL + "/img/customer-icons/twitter.svg"} alt="docprime Twitter" /></a>
                                    </div>
                                    <div className="social-icon">
                                        <a href="https://www.linkedin.com/company/docprime/" target="_blank"><img src={ASSETS_BASE_URL + "/img/customer-icons/linkedin.svg"} alt="docprime Linkedin" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 text-center">
                                <p className="fw-500 mrt-20" style={{ color: '#8a8a8a', fontSize: 12 }} >This website is not intended to be used in case of a medical emergency and/or critical care and the user should directly contact his/her medical service provider.</p>
                                
                            </div>
                            
                        </div>
                    </div>
                </div> */}


                <div className="container-fluid footer-2">
                    <div className="container">
                        {
                            menu.map((f, i) => {
                                return <div className="footer-doctor-listing" key={i}>
                                    <h4>{f.sub_heading}</h4>
                                    <ul>
                                        {
                                            f.url_list.map((u, j) => {
                                                return <li key={j}>
                                                    <a href={"/" + u.url}>{u.title}</a>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </div>
                            })
                        }
                    </div>
                </div>


                <div className="footer-3 updated-footer-container">
                    <div className="row no-gutters foot-row-alignment">
                        <div className="col-md-2">
                            <div className="footer-links pl-0 foot-with-img">
                                <a href="javascript:;">
                                    <div className="logo-img-div">
                                        <img src={ASSETS_BASE_URL + "/img/logo-sm.png"} className="footer-logo-icon" />
                                    </div>
                                </a>
                                {/* <div className="copyright-info">
                                    <p>docprime.com Copyright &copy; 2018.</p>
                                    <p>All rights reserved.</p>
                                    <p>DOCPRIME TECHNOLOGIES PRIVATE LIMITED</p>
                                    <p>CIN : U74999HR2016PTC064312</p>
                                </div> */}
                                <div className="row social-icons-row">
                                    <div className="social-icon">
                                        <a href="https://www.youtube.com/channel/UCL_6Tstix2ACaBk0jwf_1ug" target="_blank"><img src={ASSETS_BASE_URL + "/img/customer-icons/youtube.svg"} alt="docprime YouTube" /></a>
                                    </div>
                                    <div className="social-icon">
                                        <a href="https://www.instagram.com/docprimeIndia/" target="_blank"><img src={ASSETS_BASE_URL + "/img/customer-icons/instagram.svg"} alt="docprime Instagram" /></a>
                                    </div>
                                    <div className="social-icon">
                                        <a href="https://www.facebook.com/DocPrimeIndia" target="_blank"><img src={ASSETS_BASE_URL + "/img/customer-icons/facebook.svg"} alt="docprime Facebook" /></a>
                                    </div>
                                    <div className="social-icon">
                                        <a href="https://twitter.com/DocPrimeindia" target="_blank"><img src={ASSETS_BASE_URL + "/img/customer-icons/twitter.svg"} alt="docprime Twitter" /></a>
                                    </div>
                                    <div className="social-icon">
                                        <a href="https://www.linkedin.com/company/docprime/" target="_blank"><img src={ASSETS_BASE_URL + "/img/customer-icons/linkedin.svg"} alt="docprime Linkedin" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="footer-links">
                                <h3>docprime</h3>
                                <ul>
                                    <li><a href="/about" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo("/about")
                                    }}>About Us</a></li>
                                    <li><a href="/howitworks" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo("/howitworks")
                                    }}>How it Works</a></li>
                                    <li><a href="/careers" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo("/careers")
                                    }}>Careers</a></li>
                                    <li><a href="/privacy" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo("/privacy")
                                    }}>Privacy Policy</a></li>
                                    <li><a href="/terms" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo("/terms")
                                    }}>Terms &amp; Conditions</a></li>
                                    <li><a href="/disclaimer" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo("/disclaimer")
                                    }}>Disclaimer</a></li>
                                    <li><a href="/media" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo("/media")
                                    }}>Media</a></li>
                                    <li><a href="/contact" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo("/contact")
                                    }}>Contact Us</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="footer-links">
                                <h3>For Patients</h3>
                                <ul>
                                    <li><a href="javascript:void(0);" onClick={this.navigateTo.bind(this, '/opd')}>Book Doctor Appointment</a></li>
                                    <li><a href="javascript:void(0);" onClick={this.navigateTo.bind(this, '/lab')}>Book a Medical Test</a></li>
                                    <li><a href="javascript:void(0);" onClick={this.navigateTo.bind(this, '/mobileviewchat')}>Consult a doctor</a></li>
                                </ul>
                                <h3 className="foot-sub-lisitng">For Doctors</h3>
                                <ul>
                                    <li><a href="javascript:void(0);" onClick={this.navigateTo.bind(this, '/doctorsignup')}>Add Your Clinic</a></li>
                                    <li><a href="javascript:void(0);" onClick={this.navigateTo.bind(this, '/doctorsignup')}>Add Your Lab</a></li>
                                    <li><a href="javascript:void(0);" onClick={this.navigateTo.bind(this, '/doctorsignup')}>Doctor Sign Up</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="footer-links">
                                <h3>Labs in Top Cities</h3>
                                <ul>
                                    <li><a onClick={this.navigateTo.bind(this, '/labs-in-delhi-lbcit')}>Labs in Delhi</a></li>
                                    <li><a onClick={this.navigateTo.bind(this, '/labs-in-gurgaon-lbcit')}>Labs in Gurgaon</a></li>
                                    <li><a onClick={this.navigateTo.bind(this, '/labs-in-bangalore-lbcit')}>Labs in Bangalore</a></li>
                                    <li><a onClick={this.navigateTo.bind(this, '/labs-in-noida-lbcit')}>Labs in Noida</a></li>
                                    <li><a onClick={this.navigateTo.bind(this, '/labs-in-mumbai-lbcit')}>Labs in Mumbai</a></li>
                                    <li><a onClick={this.navigateTo.bind(this, '/labs-in-kolkata-lbcit')}>Labs in Kolkata</a></li>
                                    <li><a onClick={this.navigateTo.bind(this, '/labs-in-hyderabad-lbcit')}>Labs in Hyderabad</a></li>
                                    <li><a onClick={this.navigateTo.bind(this, '/labs-in-chennai-lbcit')}>Labs in Chennai</a></li>
                                    <li><a onClick={this.navigateTo.bind(this, '/labs-in-pune-lbcit')}>Labs in Pune</a></li>
                                    <li><a onClick={this.navigateTo.bind(this, '/labs-in-ghaziabad-lbcit')}>Labs in Ghaziabad</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="footer-links">
                                <h3>Doctors in Top Cities</h3>
                                <ul>
                                    <li><a href="javascript:void(0);" onClick={this.navigateTo.bind(this, '/doctors-in-delhi-sptcit')}>Doctors in Delhi</a></li>
                                    <li><a href="javascript:void(0);" onClick={this.navigateTo.bind(this, '/doctors-in-gurgaon-sptcit')}>Doctors in Gurgaon</a></li>
                                    <li><a href="javascript:void(0);" onClick={this.navigateTo.bind(this, '/doctors-in-bangalore-sptcit')}>Doctors in Bangalore</a></li>
                                    <li><a href="javascript:void(0);" onClick={this.navigateTo.bind(this, '/doctors-in-noida-sptcit')}>Doctors in Noida</a></li>
                                    <li><a href="javascript:void(0);" onClick={this.navigateTo.bind(this, '/doctors-in-mumbai-sptcit')}>Doctors in Mumbai</a></li>
                                    <li><a href="javascript:void(0);" onClick={this.navigateTo.bind(this, '/doctors-in-kolkata-sptcit')}>Doctors in Kolkata</a></li>
                                    <li><a href="javascript:void(0);" onClick={this.navigateTo.bind(this, '/doctors-in-hyderabad-sptcit')}>Doctors in Hyderabad</a></li>
                                    <li><a href="javascript:void(0);" onClick={this.navigateTo.bind(this, '/doctors-in-chennai-sptcit')}>Doctors in Chennai</a></li>
                                    <li><a href="javascript:void(0);" onClick={this.navigateTo.bind(this, '/doctors-in-pune-sptcit')}>Doctors in Pune</a></li>
                                    <li><a href="javascript:void(0);" onClick={this.navigateTo.bind(this, '/doctors-in-ghaziabad-sptcit')}>Doctors in Ghaziabad</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2 footer-last-div">
                            <div className="footer-links">
                                <h3>Useful Resources</h3>
                                <ul>
                                    <li><a href="/all-diseases" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo("/all-diseases")
                                    }}>All Diseases</a></li>
                                    <li><a href="/all-medicines" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo("/all-medicines")
                                    }}>All Medicines</a></li>
                                    <li><a href="/all-cities" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo("/city-inventory")
                                    }}>All Cities </a></li>
                                    <li><a href="/all-cities" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo("/speciality-inventory")
                                    }}>All Specialities</a></li>
                                    {/* <li><a>All Labs (later)</a></li>
                                    <li><a>All Tests (Later)</a></li>
                                    <li><a>All Hospitals (Later)</a></li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 text-center mbl-divider">
                        <p className="fw-500 mrt-20" style={{ color: '#8a8a8a', fontSize: 12 }} >This website is not intended to be used in case of a medical emergency and/or critical care and the user should directly contact his/her medical service provider.</p>

                    </div>
                    <div className="footer-new-copyrght">
                        <p>docprime.com Copyright &copy; 2018.</p>
                        <p>All rights reserved.</p>
                        <p>DOCPRIME TECHNOLOGIES PRIVATE LIMITED</p>
                        <p>CIN : U74999HR2016PTC064312</p>
                    </div>
                </div>

                {/* <div className="container footer-3">
                    <div className="row footer-3-row">
                        <ul className="list-inline footer-3-list text-center">
                            <a href="/about" onClick={(e) => {
                                e.preventDefault();
                                this.navigateTo("/about")
                            }}><li className="list-inline-item">ABOUT US</li></a>
                            <li className="list-inline-item">|</li>
                            <a href="/howitworks" onClick={(e) => {
                                e.preventDefault();
                                this.navigateTo("/howitworks")
                            }}><li className="list-inline-item">HOW IT WORKS</li></a>
                            <li className="list-inline-item">|</li>
                            <a href="/careers" onClick={(e) => {
                                e.preventDefault();
                                this.navigateTo("/careers")
                            }}><li className="list-inline-item">CAREERS</li></a>
                            <li className="list-inline-item">|</li>
                            <a href="/contact" onClick={(e) => {
                                e.preventDefault();
                                this.navigateTo("/contact")
                            }}><li className="list-inline-item">CONTACT US</li></a>
                            <li className="list-inline-item">|</li>
                            <a href="/terms" onClick={(e) => {
                                e.preventDefault();
                                this.navigateTo("/terms")
                            }}><li className="list-inline-item">TERMS &amp; CONDITIONS</li></a>
                            <li className="list-inline-item">|</li>
                            <a href="/privacy" onClick={(e) => {
                                e.preventDefault();
                                this.navigateTo("/privacy")
                            }}><li className="list-inline-item">PRIVACY POLICY</li></a>
                            <li className="list-inline-item">|</li>
                            <a href="/disclaimer" onClick={(e) => {
                                e.preventDefault();
                                this.navigateTo("/disclaimer")
                            }}><li className="list-inline-item">DISCLAIMER</li></a>
                            <li className="list-inline-item">|</li>
                            <a href="/media" onClick={(e) => {
                                e.preventDefault();
                                this.navigateTo("/media")
                            }}><li className="list-inline-item">MEDIA</li></a>
                            <li className="list-inline-item">|</li>
                            <a href="/all-diseases" onClick={(e) => {
                                e.preventDefault();
                                this.navigateTo("/all-diseases")
                            }}><li className="list-inline-item">ALL DISEASES</li></a>
                            <li className="list-inline-item">|</li>
                            <a href="/all-medicines" onClick={(e) => {
                                e.preventDefault();
                                this.navigateTo("/all-medicines")
                            }}><li className="list-inline-item">ALL MEDICINES</li></a>
                            <li className="list-inline-item">|</li>
                            <a href="/all-cities" onClick={(e) => {
                                e.preventDefault();
                                this.navigateTo("/city-inventory")
                            }}><li className="list-inline-item">ALL CITIES</li></a>
                            <li className="list-inline-item">|</li>
                            <a href="/all-cities" onClick={(e) => {
                                e.preventDefault();
                                this.navigateTo("/speciality-inventory")
                            }}><li className="list-inline-item">ALL SPECIALITIES</li></a>
                        </ul>
                    </div>
                </div> */}

            </footer >
        );
    }
}

export default withRouter(Footer)
