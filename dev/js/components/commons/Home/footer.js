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

        return (
            <footer className="profile-footer">
                {/* <div className="container footer-1 d-none d-md-block">
                    <div className="row">
                        <div className="col-12">
                            <div className="foot-head">
                                DELHI
						    </div>
                            <div className="footer-link-div">
                                <a href="javascript:;">Anaesthesiology in Delhi | </a>
                                <a href="javascript:;">Andrologist in Delhi | </a>
                                <a href="javascript:;">Anesthesiologist in Delhi | </a>
                                <a href="javascript:;">Cardiac Anaesthesia in Delhi | </a>
                                <a href="javascript:;">Cardio Thoracic Surgery in Delhi | </a>
                                <a href="javascript:;">Cardiologist in Delhi | </a>
                                <a href="javascript:;">Cardiology in Delhi | </a>
                                <a href="javascript:;">Cosmetologist in Delhi | </a>
                                <a href="javascript:;">Dentist in Delhi | </a>
                                <a href="javascript:;">Dermatologist in Delhi | </a>
                                <a href="javascript:;">Dietitian Nutritionist in Delhi | </a>
                                <a href="javascript:;">Ear-Nose-Throat (ENT) Specialist in Delhi | </a>
                                <a href="javascript:;">Endocrinologist in Delhi | </a>
                                <a href="javascript:;">Endocrinology in Delhi | </a>
                                <a href="javascript:;">Gastroenterologist in Delhi | </a>
                                <a href="javascript:;">Gastroenterology in Delhi | </a>
                                <a href="javascript:;">General Physician in Delhi | </a>
                                <a href="javascript:;">General surgeon in Delhi |</a>
                                <a href="javascript:;">Gynecologist in Delhi | </a>
                                <a href="javascript:;">Hematology Specialist in Delhi | </a>
                                <a href="javascript:;">Homoeopath in Delhi | </a>
                                <a href="javascript:;">Medical Genetics in Delhi | </a>
                                <a href="javascript:;">Neonatology in Delhi | </a>
                                <a href="javascript:;">Nephrologist in Delhi | </a>
                                <a href="javascript:;">Nephrology in Delhi | </a>
                                <a href="javascript:;">Neuro Surgery in Delhi | </a>
                                <a href="javascript:;">Neurologist in Delhi | </a>
                                <a href="javascript:;">Neurology in Delhi | </a>
                                <a href="javascript:;">Ophthalmologyin Delhi | </a>
                                <a href="javascript:;">Opthalmologist in Delhi | </a>
                                <a href="javascript:;">Orthopedist in Delhi | </a>
                                <a href="javascript:;">Paediatrics in Delhi | </a>
                                <a href="javascript:;">Pathologist in Delhi | </a>
                                <a href="javascript:;">Pediatrician in Delhi | </a>
                                <a href="javascript:;">Physiotherapist in Delhi | </a>
                                <a href="javascript:;">Psychiatrist in Delhi | </a>
                                <a href="javascript:;">Pulmonologist in Delhi | </a>
                                <a href="javascript:;">Radiologist in Delhi | </a>
                                <a href="javascript:;">Rheumatology in Delhi | </a>
                                <a href="javascript:;">Urology Nutritionist Surgery in Delhi</a>
                            </div>
                            <div className="foot-head">
                                BANGLORE
						    </div>
                            <div className="footer-link-div">
                                <a href="javascript:;">Anaesthesiology in Banglore | </a>
                                <a href="javascript:;">Andrologist in Banglore | </a>
                                <a href="javascript:;">Anesthesiologist in Banglore | </a>
                                <a href="javascript:;">Cardiac Anaesthesia in Banglore | </a>
                                <a href="javascript:;">Cardio Thoracic Surgery in Banglore | </a>
                                <a href="javascript:;">Cardiologist in Banglore | </a>
                                <a href="javascript:;">Cardiology in Banglore | </a>
                                <a href="javascript:;">Cosmetologist in Banglore | </a>
                                <a href="javascript:;">Dentist in Banglore | </a>
                                <a href="javascript:;">Dermatologist in Banglore | </a>
                                <a href="javascript:;">Dietitian Nutritionist in Banglore | </a>
                                <a href="javascript:;">Ear-Nose-Throat (ENT) Specialist in Banglore | </a>
                                <a href="javascript:;">Endocrinologist in Banglore | </a>
                                <a href="javascript:;">Endocrinology in Banglore | </a>
                                <a href="javascript:;">Gastroenterologist in Banglore | </a>
                                <a href="javascript:;">Gastroenterology in Banglore | </a>
                                <a href="javascript:;">General Physician in Banglore | </a>
                                <a href="javascript:;">General surgeon in Banglore | </a>
                                <a href="javascript:;">Gynecologist in Banglore | </a>
                                <a href="javascript:;">Hematology Specialist in Banglore | </a>
                                <a href="javascript:;">Homoeopath in Banglore | </a>
                                <a href="javascript:;">Medical Genetics in Banglore | </a>
                                <a href="javascript:;">Neonatology in Banglore | </a>
                                <a href="javascript:;">Nephrologist in Banglore | </a>
                                <a href="javascript:;">Nephrology in Banglore | </a>
                                <a href="javascript:;">Neuro Surgery in Banglore | </a>
                                <a href="javascript:;">Neurologist in Banglore | </a>
                                <a href="javascript:;">Neurology in Banglore | </a>
                                <a href="javascript:;">Ophthalmologyin Banglore | </a>
                                <a href="javascript:;">Opthalmologist in Banglore | </a>
                                <a href="javascript:;">Orthopedist in Banglore | </a>
                                <a href="javascript:;">Paediatrics in Banglore | </a>
                                <a href="javascript:;">Pathologist in Banglore | </a>
                                <a href="javascript:;">Pediatrician in Banglore | </a>
                                <a href="javascript:;">Physiotherapist in Banglore | </a>
                                <a href="javascript:;">Psychiatrist in Banglore | </a>
                                <a href="javascript:;">Pulmonologist in Banglore | </a>
                                <a href="javascript:;">Radiologist in Banglore | </a>
                                <a href="javascript:;">Rheumatology in Banglore | </a>
                                <a href="javascript:;">Urology Nutritionist Surgery in Banglore</a>
                            </div>
                            <div className="foot-head">
                                MUMBAI
						    </div>
                            <div className="footer-link-div">
                                <a href="javascript:;">Anaesthesiology in Mumbai | </a>
                                <a href="javascript:;">Andrologist in Mumbai | </a>
                                <a href="javascript:;">Anesthesiologist in Mumbai | </a>
                                <a href="javascript:;">Cardiac Anaesthesia in Mumbai | </a>
                                <a href="javascript:;">Cardio Thoracic Surgery in Mumbai | </a>
                                <a href="javascript:;">Cardiologist in Mumbai | </a>
                                <a href="javascript:;">Cardiology in Mumbai | </a>
                                <a href="javascript:;">Cosmetologist in Mumbai | </a>
                                <a href="javascript:;">Dentist in Mumbai | </a>
                                <a href="javascript:;">Dermatologist in Mumbai | </a>
                                <a href="javascript:;">Dietitian Nutritionist in Mumbai | </a>
                                <a href="javascript:;">Ear-Nose-Throat (ENT) Specialist in DMumbai | </a>
                                <a href="javascript:;">Endocrinologist in Mumbai | </a>
                                <a href="javascript:;">Endocrinology in Mumbai | </a>
                                <a href="javascript:;">Gastroenterologist in Mumbai | </a>
                                <a href="javascript:;">Gastroenterology in Mumbai | </a>
                                <a href="javascript:;">General Physician in Mumbai | </a>
                                <a href="javascript:;">General surgeon in Mumbai | </a>
                                <a href="javascript:;">Gynecologist in Mumbai | </a>
                                <a href="javascript:;">Hematology Specialist in Mumbai | </a>
                                <a href="javascript:;">Homoeopath in Mumbai | </a>
                                <a href="javascript:;">Medical Genetics in Mumbai | </a>
                                <a href="javascript:;">Neonatology in Mumbai | </a>
                                <a href="javascript:;">Nephrologist in Mumbai | </a>
                                <a href="javascript:;">Nephrology in Mumbai | </a>
                                <a href="javascript:;">Neuro Surgery in Mumbai | </a>
                                <a href="javascript:;">Neurologist in Mumbai | </a>
                                <a href="javascript:;">Neurology in Mumbai | </a>
                                <a href="javascript:;">Ophthalmologyin Mumbai | </a>
                                <a href="javascript:;">Opthalmologist in Mumbai | </a>
                                <a href="javascript:;">Orthopedist in Mumbai | </a>
                                <a href="javascript:;">Paediatrics in Mumbai | </a>
                                <a href="javascript:;">Pathologist in Mumbai | </a>
                                <a href="javascript:;">Pediatrician in Mumbai | </a>
                                <a href="javascript:;">Physiotherapist in Mumbai | </a>
                                <a href="javascript:;">Psychiatrist in Mumbai | </a>
                                <a href="javascript:;">Pulmonologist in Mumbai | </a>
                                <a href="javascript:;">Radiologist in Mumbai | </a>
                                <a href="javascript:;">Rheumatology in Mumbai | </a>
                                <a href="javascript:;">Urology Nutritionist Surgery in Mumbai</a>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="container-fluid footer-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-4 offset-md-4">
                                <a href="javascript:;">
                                    <div className="logo-img-div">
                                        <img src={ASSETS_BASE_URL + "/img/logo-sm.png"} className="footer-logo-icon" />
                                    </div>
                                </a>
                                <div className="copyright-info">
                                    <p>Docprime.com Copyright &copy; 2018.</p>
                                    <p>All rights reserved.</p>
                                    <p>DOCPRIME TECHNOLOGIES PRIVATE LIMITED</p>
                                    <p>CIN : U74999HR2016PTC064312</p>
                                </div>
                                <div className="row social-icons-row">
                                    <div className="social-icon">
                                        <a href="https://www.youtube.com/channel/UCL_6Tstix2ACaBk0jwf_1ug" target="_blank"><img src={ASSETS_BASE_URL + "/img/customer-icons/youtube.svg"} /></a>
                                    </div>
                                    <div className="social-icon">
                                        <a href="https://www.instagram.com/docprimeIndia/" target="_blank"><img src={ASSETS_BASE_URL + "/img/customer-icons/instagram.svg"} /></a>
                                    </div>
                                    <div className="social-icon">
                                        <a href="https://www.facebook.com/DocPrimeIndia" target="_blank"><img src={ASSETS_BASE_URL + "/img/customer-icons/facebook.svg"} /></a>
                                    </div>
                                    <div className="social-icon">
                                        <a href="https://twitter.com/DocPrimeindia" target="_blank"><img src={ASSETS_BASE_URL + "/img/customer-icons/twitter.svg"} /></a>
                                    </div>
                                    <div className="social-icon">
                                        <a href="https://www.linkedin.com/company/docprime/" target="_blank"><img src={ASSETS_BASE_URL + "/img/customer-icons/linkedin.svg"} /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 text-center">
                                <p className="fw-500 mrt-20" style={{color: '#8a8a8a', fontSize: 12}} >This website is not intended to be used in case of a medical emergency and/or critical care and the user should directly contact his/her medical service provider.</p>
                            </div>
                            {/* <div className="col-md-9 d-none d-md-block">
                                <div className="row">
                                    <div className="col-3">
                                        <div className="footer-2-head">
                                            <p>For Doctors</p>
                                        </div>
                                        <div className="footer-2-content">
                                            <ul className="footer-2-list">
                                                <a href="javascript:;"><li>Doctor Profile</li></a>
                                                <a href="javascript:;"><li>Consultations</li></a>
                                                <a href="javascript:;"><li>Health Profile</li></a>
                                                <a href="javascript:;"><li>Billing/Analytics</li></a>
                                                <a href="javascript:;"><li>Patients Detail</li></a>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="footer-2-head">
                                            <p>For Diagnostic Centers</p>
                                        </div>
                                        <div className="footer-2-content">
                                            <ul className="footer-2-list">
                                                <a href="javascript:;"><li>Diagnostics Profile</li></a>
                                                <a href="javascript:;"><li>Consultations</li></a>
                                                <a href="javascript:;"><li>Medical Tests</li></a>
                                                <a href="javascript:;"><li>Billing/Analytics</li></a>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="footer-2-head">
                                            <p>For Hospital/Clinics</p>
                                        </div>
                                        <div className="footer-2-content">
                                            <ul className="footer-2-list">
                                                <a href="javascript:;"><li>Hospital/Clinic Profile</li></a>
                                                <a href="javascript:;"><li>Consultations for Doctors</li></a>
                                                <a href="javascript:;"><li>Medical Tests</li></a>
                                                <a href="javascript:;"><li>Billing/Analytics</li></a>
                                                <a href="javascript:;"><li>Listing of doctors</li></a>
                                                <a href="javascript:;"><li>Admin Access</li></a>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="footer-2-head">
                                            <p>For Patients</p>
                                        </div>
                                        <div className="footer-2-content">
                                            <ul className="footer-2-list">
                                                <a href="javascript:;"><li>Free health Consultation chat</li></a>
                                                <a href="javascript:;"><li>Search for doctors</li></a>
                                                <a href="javascript:;"><li>Search for clinics</li></a>
                                                <a href="javascript:;"><li>Search for hospitals</li></a>
                                                <a href="javascript:;"><li>Search for diagnostics</li></a>
                                                <a href="javascript:;"><li>Health articles</li></a>
                                                <a href="javascript:;"><li>Consult a doctor</li></a>
                                                <a href="javascript:;"><li>Article about medicines</li></a>
                                                <a href="javascript:;"><li>Disease Articles</li></a>
                                                <a href="javascript:;"><li>Daily tip for health</li></a>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="container footer-3">
                    <div className="row footer-3-row">
                        <ul className="list-inline footer-3-list text-center">
                            <a onClick={() => {
                                this.navigateTo("/about")
                            }}><li className="list-inline-item">ABOUT US</li></a>
                            <li className="list-inline-item">|</li>
                            <a onClick={() => {
                                this.navigateTo("/howitworks")
                            }}><li className="list-inline-item">HOW IT WORKS</li></a>
                            <li className="list-inline-item">|</li>
                            <a onClick={() => {
                                this.navigateTo("/careers")
                            }}><li className="list-inline-item">CAREERS</li></a>
                            <li className="list-inline-item">|</li>
                            <a onClick={() => {
                                this.navigateTo("/contact")
                            }}><li className="list-inline-item">CONTACT US</li></a>
                            <li className="list-inline-item">|</li>
                            <a onClick={() => {
                                this.navigateTo("/terms")
                            }}><li className="list-inline-item">TERMS &amp; CONDITIONS</li></a>
                            <li className="list-inline-item">|</li>
                            <a onClick={() => {
                                this.navigateTo("/privacy")
                            }}><li className="list-inline-item">PRIVACY POLICY</li></a>
                            <li className="list-inline-item">|</li>
                            <a onClick={() => {
                                this.navigateTo("/disclaimer")
                            }}><li className="list-inline-item">DISCLAIMER</li></a>
                            <li className="list-inline-item">|</li>
                            <a onClick={() => {
                                this.navigateTo("/media")
                            }}><li className="list-inline-item">MEDIA</li></a>
                            <li className="list-inline-item">|</li>
                            <a onClick={() => {
                                this.navigateTo("/doctorsignup")
                            }}><li className="list-inline-item">DOCTOR SIGNUP</li></a>
                        </ul>
                    </div>
                </div>
            </footer>
        );
    }
}

export default withRouter(Footer)
