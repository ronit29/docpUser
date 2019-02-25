import React from 'react';
import { withRouter } from 'react-router'
import GTM from '../../../helpers/gtm';

class Footer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hideSource: false
        }
    }

    componentDidMount() {
        this.setState({ hideSource: true })
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
                {
                    menu.length > 0 ?
                        <div className="container-fluid footer-2">
                            <div className="container">
                                {
                                    menu.map((f, i) => {
                                        return <div className="footer-doctor-listing" key={i}>
                                            <h2>{f.sub_heading}</h2>
                                            <ul>
                                                {
                                                    f.url_list.map((u, j) => {
                                                        return <li key={j}>
                                                            <a href={"/" + u.url} onClick={(e) => {
                                                                e.preventDefault();
                                                                this.navigateTo(`/${u.url}`)
                                                            }}>{u.title}</a>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        : ''
                }

                {
                    this.props.specialityFooterData && this.props.specialityFooterData.length ?
                        <div className="container-fluid mrt-10">
                            <div className="row justify-content-center">
                                {
                                    this.props.specialityFooterData.map((footerData, i) => {
                                        return <div className="col-12 col-md-2" style={{ marginBottom: 15, paddingTop: 10 }} key={"div" + i}>
                                            <h3 className="speciality-footer-head">{footerData.title}</h3>
                                            <ul className="speciality-footer-list">
                                                {
                                                    footerData.urls.map((url, j) => {
                                                        return <li key={"li" + j}>
                                                            <a href={url.url} onClick={(e) => {
                                                                e.preventDefault();
                                                                this.navigateTo(url.url)
                                                            }}>{url.title}</a>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    })
                                }
                            </div>
                        </div> : ''
                }

                <section className="container-fluid mrt-20">
                    <div className="row">
                        <div className="col-12 col-md-2">
                            <div className="footer-links">
                                <a href="javascript:;">
                                    <div className="logo-img-div">
                                        <img src={ASSETS_BASE_URL + "/img/logo-sm.png"} className="footer-logo-icon" />
                                    </div>
                                </a>
                                <div className="social-icons-row mrt-20">
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
                        <div className="col-md-2 col-12">
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
                        <div className="col-md-2 col-12">
                            <div className="footer-links">
                                <h3>For Patients</h3>
                                {
                                    this.state.hideSource ? <ul>
                                        <li><a href="/search?from=footer" onClick={(e) => {
                                            e.preventDefault();
                                            this.navigateTo("/search?from=footer")
                                        }}>Book Doctor Appointment</a></li>
                                        <li><a href="/search?from=footer" onClick={(e) => {
                                            e.preventDefault();
                                            this.navigateTo("/search?from=footer")
                                        }}>Book a Medical Test</a></li>
                                        <li><a href="/online-consultation" onClick={(e) => {
                                            e.preventDefault();
                                            this.navigateTo("/online-consultation")
                                        }}>Consult a Doctor</a></li>
                                        <li><a href="/referral" onClick={(e) => {
                                            e.preventDefault();
                                            this.navigateTo("/referral")
                                        }}>Refer & Earn</a></li>
                                        <li><a href="/full-body-checkup-health-packages?fromFooter=true" onClick={(e) => {
                                            e.preventDefault();
                                            this.navigateTo("/full-body-checkup-health-packages?fromFooter=true")
                                        }}>Book Full Body Packages</a></li>
                                    </ul> : ""
                                }
                                <h3 className="foot-sub-lisitng">For Doctors</h3>
                                <ul>
                                    <li><a href="/doctorsignup" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo("/doctorsignup");

                                        let data = {
                                            'Category': 'ConsumerApp', 'Action': 'addYourClinicClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'add-your-clinic-click'
                                        }
                                        GTM.sendEvent({ data: data });

                                    }}>Add Your Clinic</a></li>
                                    <li><a href="/doctorsignup" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo("/doctorsignup");

                                        let data = {
                                            'Category': 'ConsumerApp', 'Action': 'addYourLabClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'add-your-lab-click'
                                        }
                                        GTM.sendEvent({ data: data });

                                    }}>Add Your Lab</a></li>
                                    <li><a href="/doctorsignup" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo("/doctorsignup");

                                        let data = {
                                            'Category': 'ConsumerApp', 'Action': 'doctorSignUp', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-sign-up'
                                        }
                                        GTM.sendEvent({ data: data });

                                    }}>Doctor Sign Up</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2 col-12">
                            <div className="footer-links">
                                <h3>Labs in Top Cities</h3>
                                <ul>
                                    <li><a href="/labs-in-delhi-lbcit" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo('/labs-in-delhi-lbcit')
                                    }}>Labs in Delhi</a></li>
                                    <li><a href="/labs-in-gurgaon-lbcit" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo('/labs-in-gurgaon-lbcit')
                                    }}>Labs in Gurgaon</a></li>
                                    <li><a href="/labs-in-bangalore-lbcit" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo('/labs-in-bangalore-lbcit')
                                    }}>Labs in Bangalore</a></li>
                                    <li><a href="/labs-in-noida-lbcit" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo('/labs-in-noida-lbcit')
                                    }}>Labs in Noida</a></li>
                                    <li><a href="/labs-in-mumbai-lbcit" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo('/labs-in-mumbai-lbcit')
                                    }}>Labs in Mumbai</a></li>
                                    <li><a href="/labs-in-kolkata-lbcit" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo('/labs-in-kolkata-lbcit')
                                    }}>Labs in Kolkata</a></li>
                                    <li><a href="/labs-in-hyderabad-lbcit" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo('/labs-in-hyderabad-lbcit')
                                    }}>Labs in Hyderabad</a></li>
                                    <li><a href="/labs-in-chennai-lbcit" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo('/labs-in-chennai-lbcit')
                                    }}>Labs in Chennai</a></li>
                                    <li><a href="/labs-in-pune-lbcit" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo('/labs-in-pune-lbcit')
                                    }}>Labs in Pune</a></li>
                                    <li><a href="/labs-in-ghaziabad-lbcit" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo('/labs-in-ghaziabad-lbcit')
                                    }}>Labs in Ghaziabad</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2 col-12">
                            <div className="footer-links">
                                <h3>Doctors in Top Cities</h3>
                                <ul>
                                    <li><a href="/doctors-in-delhi-sptcit" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo('/doctors-in-delhi-sptcit')
                                    }}>Doctors in Delhi</a></li>
                                    <li><a href="/doctors-in-gurgaon-sptcit" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo('/doctors-in-gurgaon-sptcit')
                                    }}>Doctors in Gurgaon</a></li>
                                    <li><a href="/doctors-in-bangalore-sptcit" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo('/doctors-in-bangalore-sptcit')
                                    }}>Doctors in Bangalore</a></li>
                                    <li><a href="/doctors-in-noida-sptcit" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo('/doctors-in-noida-sptcit')
                                    }}>Doctors in Noida</a></li>
                                    <li><a href="/doctors-in-mumbai-sptcit" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo('/doctors-in-mumbai-sptcit')
                                    }}>Doctors in Mumbai</a></li>
                                    <li><a href="/doctors-in-kolkata-sptcit" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo('/doctors-in-kolkata-sptcit')
                                    }}>Doctors in Kolkata</a></li>
                                    <li><a href="/doctors-in-hyderabad-sptcit" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo('/doctors-in-hyderabad-sptcit')
                                    }}>Doctors in Hyderabad</a></li>
                                    <li><a href="/doctors-in-chennai-sptcit" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo('/doctors-in-chennai-sptcit')
                                    }}>Doctors in Chennai</a></li>
                                    <li><a href="/doctors-in-pune-sptcit" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo('/doctors-in-pune-sptcit')
                                    }}>Doctors in Pune</a></li>
                                    <li><a href="/doctors-in-ghaziabad-sptcit" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo('/doctors-in-ghaziabad-sptcit')
                                    }}>Doctors in Ghaziabad</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2 col-12">
                            <div className="footer-links">
                                <h3>Useful Resources</h3>
                                <ul>
                                    <li><a href="/all-articles" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo("/all-articles")
                                    }}>All Articles</a></li>
                                    <li><a href="/all-diseases" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo("/all-diseases")
                                    }}>All Diseases</a></li>
                                    <li><a href="/all-medicines" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo("/all-medicines")
                                    }}>All Medicines</a></li>
                                    <li><a href="/city-inventory" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo("/city-inventory")
                                    }}>All Cities </a></li>
                                    <li><a href="/speciality-inventory" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo("/speciality-inventory")
                                    }}>All Specialities</a></li>
                                    <li><a href="/doctors-near-me" onClick={(e) => {
                                        e.preventDefault();
                                        this.navigateTo("/doctors-near-me")
                                    }}>Find a Doctor Near You</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <p className="fw-500 mrt-20" style={{ color: '#8a8a8a', fontSize: 12 }} >This website is not intended to be used in case of a medical emergency and/or critical care and the user should directly contact his/her medical service provider.</p>
                        </div>
                        <div className="col-12 footer-new-copyrght" style={{ paddingBottom: 5 }} >
                            <p>docprime.com Copyright &copy; 2018.</p>
                            <p>All rights reserved.</p>
                            <p>DOCPRIME TECHNOLOGIES PRIVATE LIMITED</p>
                            <p>CIN : U74999HR2016PTC064312</p>
                        </div>
                    </div>
                </section>
            </footer>
        );
    }
}

export default withRouter(Footer)