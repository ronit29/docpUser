import React from 'react';

class HowitWorks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        return (
            <div className="container about-container">
                <div className="row">
                    <div className="col-12 text-center">
                        <p className="fw-500 about-heading">How it Works</p>
                    </div>
                    <div className="col-12">
                        <p className="fw-500 about-content">DocPrime aims to provide efficient and affordable access to doctors and medical help to people across India and improving the healthcare experience for all humanity.</p>
                    </div>
                </div>
                <div className="row working-row">
                    <div className="working-content-div col-12 col-lg-8">
                        <div className="doctor-consultation">
                            <div className="working-count text-center">
                                <p className="fw-500">1</p>
                            </div>
                            <div className="consultation-text">
                                <p className="fw-500">Doctor Consultation</p>
                            </div>
                        </div>
                        <div className="doctext">
                            <p className="fw-500">
                                Our flawless platform helps user get answers to their queries and offers one-on-one interaction with experienced doctors for free. Users can anonymously, or otherwise, communicate with doctors with various areas of expertise directly from their smartphones.
                            </p>
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
                                <p className="fw-500">Lab Tests</p>
                            </div>
                        </div>
                        <div className="doctext">
                            <p className="fw-500">
                                Detailed information about procedures of the tests, prices, and relevant preparations are easily accessible on our platform. This is to ensure that in the need of the hour, a disease can be diagnosed without having to leave the house.
                            </p>
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
                                <p className="fw-500">Staying Healthy</p>
                            </div>
                        </div>
                        <div className="doctext">
                            <p className="fw-500">
                                The feed on the website is created with the aim of keeping people updated of the latest development in the healthcare industry. This feed is curated by healthcare experts and is filled with information that can help users make an informed decision about their health.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 d-none d-lg-block">
                        <img className="consultation-image" src={ASSETS_BASE_URL + "/img/stayinghealthy.png"} />
                    </div>
                </div>
            </div>
        );
    }
}


export default HowitWorks
