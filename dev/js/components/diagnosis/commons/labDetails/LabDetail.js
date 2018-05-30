import React from 'react';
import { connect } from 'react-redux';

import LabTests from '../labTests'

class LabDetails extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        let { about, address, lab_image, lat, long, name, primary_mobile, city, sublocality, locality } = this.props.data.lab

        return (
            <section className="wrap profile-book-screen">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="widget profile-book">
                                <div className="widget-header pb-header text-center">
                                    <div className="pb-logo">
                                        <img src="/assets/img/customer-icons/lab1.png" className="img-fluid" />
                                    </div>
                                    <h4 className="widget-title pb-title">{name}</h4>
                                    <p className="location">{locality} {city} | <span className="ct-img ct-img-xs"><img src="/assets/img/customer-icons/map-marker.svg" className="img-fluid" /></span>1.5KM</p>
                                    <ul className="list time-contact">
                                        <li>
                                            <span className="fw-700 text-sm">Timing: -</span>
                                            {this.props.data.lab_timing}
                                            <span className="open-close">{" Open Today"}</span>
                                        </li>
                                        <li>
                                            <span className="fw-700 text-sm">Contact: -</span>
                                            {primary_mobile}
                                            <span className="open-close">{" Call Now"}</span>
                                        </li>
                                    </ul>
                                </div>

                                <LabTests {...this.props} />

                                <div className="widget-content pb-details pb-location">
                                    <h4 className="wc-title text-md fw-700">Location</h4>
                                    <div className="address-details">
                                        <p className="add-info">{address}</p>
                                    </div>
                                    <div className="pb-view text-left">
                                        <a href={`https://www.google.com/maps/search/?api=1&query=${long},${lat}`} className="link-text text-md fw-700" target="_blank">View in Google Map</a>
                                    </div>
                                </div>
                                {/* <div className="widget-content pb-details pb-facility">
                                    <h4 className="wc-title text-md fw-700">Facility</h4>
                                    <ul className="list pb-list facilty-list">
                                        <li>Parking Available</li>
                                        <li>Card Accepted</li>
                                        <li>E Report Available</li>
                                        <li>Home Chekup Available</li>
                                    </ul>
                                </div> */}
                                <div className="widget-content pb-details pb-about">
                                    <h4 className="wc-title text-md fw-700">About</h4>
                                    <p>{about}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


export default LabDetails
