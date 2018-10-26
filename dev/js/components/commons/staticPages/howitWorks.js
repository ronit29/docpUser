import React from 'react';
import HelmetTags from '../HelmetTags'

class HowitWorks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        return (
            <div className="container about-container">
                <HelmetTags tagsData={{
                    title: ('How docprime Works | docprime'),
                    description: ('how does docprime works for the patients and doctors.')
                }} />
                <div className="row">
                    <div className="col-12 text-center">
                        <p className="fw-500 about-heading">How it Works</p>
                    </div>
                    <div className="col-12">
                        <p className="fw-500 about-content">docprime.com aims to redefine how Indians seek healthcare services. It connects patients with medical consultants in real time and bridges the gap between need and fulfilment using state-of-the-art technology and a robust offline network. It also facilitates booking of doctor appointments and lab tests at discounted rates.</p>
                        <p className="fw-500 about-content">Our Key Services are:</p>
                    </div>
                </div>
                <div className="row working-row">
                    <div className="working-content-div col-12 col-lg-8">
                        <div className="doctor-consultation">
                            <div className="working-count text-center">
                                <p className="fw-500">1</p>
                            </div>
                            <div className="consultation-text">
                                <p className="fw-500">Free for Life-Doctor consultation</p>
                            </div>
                        </div>
                        <div className="doctext">
                            <ul style={{ listStyleType: 'disc' }}>
                                <li className="fw-500">Free medical consultation over chat and phone from experienced medical consultants</li>
                                <li className="fw-500">Instant and real-time interaction with medical consultants to help identify the root cause of the problem</li>
                                <li className="fw-500">Users can anonymously, or otherwise, communicate with doctors with various areas of expertise directly from their smartphones or desktops</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 d-none d-lg-block">
                        <img className="consultation-image" src={ASSETS_BASE_URL + "/img/doctorConslutation.png"} />
                    </div>
                </div>
                <div className="row working-row lab">
                    <div className="working-content-div col-12 col-lg-8">
                        <div className="doctor-consultation">
                            <div className="working-count text-center">
                                <p className="fw-500">2</p>
                            </div>
                            <div className="consultation-text">
                                <p className="fw-500">Doctor Search and Online Appointment Booking</p>
                            </div>
                        </div>
                        <div className="doctext">
                            <ul style={{ listStyleType: 'disc' }}>
                                <li className="fw-500">Search the best doctors nearby your area and book your next doctor visit conveniently through us</li>
                                <li className="fw-500">Avail discount upto 50% on booking doctor services</li>
                                <li className="fw-500">14000+doctors from reputed and leading clinics and hospitals on board to provide best healthcare services</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 d-none d-lg-block">
                        <img className="lab-image" src={ASSETS_BASE_URL + "/img/phone.png"} />
                    </div>
                </div>
                <div className="row working-row lab">
                    <div className="working-content-div col-12 col-lg-8">
                        <div className="doctor-consultation">
                            <div className="working-count text-center">
                                <p className="fw-500">3</p>
                            </div>
                            <div className="consultation-text">
                                <p className="fw-500">Search and Book Lab Tests at Discounted Rates</p>
                            </div>
                        </div>
                        <div className="doctext">
                            <ul style={{ listStyleType: 'disc' }}>
                                <li className="fw-500">Search the best diagnostic lab nearby your area</li>
                                <li className="fw-500">Avail discount upto 60% on lab tests</li>
                                <li className="fw-500">Comprehensive network of reputed 4000+ diagnostic labs</li>
                                <li className="fw-500">Detailed information about procedures of the tests, prices, and relevant preparations are easily accessible on the platform</li>
                                <li className="fw-500">Home collection facility available</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 d-none d-lg-block">
                        <img className="consultation-image" src={ASSETS_BASE_URL + "/img/stayinghealthy.png"} />
                    </div>
                </div>
                <div className="row working-row lab">
                    <div className="working-content-div col-12 col-lg-8">
                        <div className="doctor-consultation">
                            <div className="working-count text-center">
                                <p className="fw-500">4</p>
                            </div>
                            <div className="consultation-text">
                                <p className="fw-500">Health feed</p>
                            </div>
                        </div>
                        <div className="doctext">
                            <ul style={{ listStyleType: 'disc' }}>
                                <li className="fw-500">Important facts and knowledge about various diseases and medicines, and how to manage the condition</li>
                                <li className="fw-500">Information on useful lifestyle changes for overall well-being</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row lab">
                    <div className="working-content-div col-12 col-lg-8">
                        <p className="fw-500 text-xl">Our Upcoming Services :</p>
                    </div>
                </div>
                <div className="row working-row lab" style={{ marginTop: 40 }} >
                    <div className="working-content-div col-12 col-lg-8">
                        <div className="doctor-consultation">
                            <div className="working-count text-center">
                                <p className="fw-500">1</p>
                            </div>
                            <div className="consultation-text">
                                <p className="fw-500">Subscription based OPD product</p>
                            </div>
                        </div>
                        <div className="doctext">
                            <ul style={{ listStyleType: 'disc' }}>
                                <li className="fw-500">Unlimited consultations and diagnostic test to make regular OPD visits convenient, accessible, and affordable</li>
                                <li className="fw-500">Ease of cashless transactions for OPD services</li>
                                <li className="fw-500">Online appointment booking</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row working-row lab">
                    <div className="working-content-div col-12 col-lg-8">
                        <div className="doctor-consultation">
                            <div className="working-count text-center">
                                <p className="fw-500">2</p>
                            </div>
                            <div className="consultation-text">
                                <p className="fw-500">ePharmacy</p>
                            </div>
                        </div>
                        <div className="doctext">
                            <ul style={{ listStyleType: 'disc' }}>
                                <li className="fw-500">Comprehensive network of pharmacies</li>
                                <li className="fw-500">Doorstep delivery of medicines at discounted rates</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default HowitWorks
