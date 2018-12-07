import React from 'react';
import { connect } from 'react-redux';
import InitialsPicture from '../../../commons/initialsPicture'
import ReviewList from '../../../commons/ratingsProfileView/ReviewList.js'
import RatingGraph from '../../../commons/ratingsProfileView/RatingGraph.js'
import ComplimentListView from '../../../commons/ratingsProfileView/ComplimentListView.js'
import LabTests from '../labTests'
import RatingProfileCard from '../../../commons/ratingsProfileView/RatingProfileCard.js'
import { buildOpenBanner } from '../../../../helpers/utils.js'

class LabDetails extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    render() {

        let { about, address, lab_image, lat, long, name, primary_mobile, city, sublocality, locality, lab_thumbnail } = this.props.data.lab
        let { lab_timing, lab_timing_data, mrp, next_lab_timing, next_lab_timing_data } = this.props.data

        return (
            <section className="profile-book-screen">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            {this.props.data.lab.unrated_appointment ? <RatingProfileCard {...this.props} details={this.props.data.lab.unrated_appointment} /> : ""}

                            <div className="widget mrb-15">
                                <div className="widget-header pb-header text-center">
                                    <div className="pb-logo">
                                        <InitialsPicture name={name} has_image={!!lab_thumbnail} className="initialsPicture-lp">
                                            <img src={lab_thumbnail} className="img-fluid" />
                                        </InitialsPicture>
                                    </div>
                                    <h1 className="widget-title pb-title">{name}</h1>
                                    <p className="location">{locality} {city}
                                        {/* <span className="ct-img ct-img-xs">
                                        <img src={ASSETS_BASE_URL + "/img/customer-icons/map-marker.svg"} className="img-fluid" />
                                    </span> */}
                                    </p>
                                    <ul className="list time-contact">
                                        <li>
                                            <span className="fw-700 text-sm">Timing: -</span>
                                            {buildOpenBanner(lab_timing, lab_timing_data, next_lab_timing, next_lab_timing_data)}
                                        </li>
                                        {/* <li>
                                            <span className="fw-700 text-sm">Contact: -</span>
                                            {primary_mobile}
                                            <span className="open-close">{" Call Now"}</span>
                                        </li> */}
                                    </ul>
                                </div>

                                <LabTests {...this.props} />


                                {/* <div className="widget-content pb-details pb-facility">
                                    <h4 className="wc-title text-md fw-700">Facility</h4>
                                    <ul className="list pb-list facilty-list">
                                        <li>Parking Available</li>
                                        <li>Card Accepted</li>
                                        <li>E Report Available</li>
                                        <li>Home Chekup Available</li>
                                    </ul>
                                </div> */}

                                {this.props.data.lab.display_rating_widget ?
                                    <div className="widget-panel">
                                        <h4 className="panel-title mb-rmv">Patient Feedback</h4>
                                        <div className="panel-content pd-0 border-bottom-panel">
                                            <RatingGraph details={this.props.data.lab} />
                                            <div className="user-satisfaction-section">
                                                <div className="row">
                                                    {this.props.data.lab.rating_graph ? this.props.data.lab.rating_graph.top_compliments.map(compliment =>
                                                        <ComplimentListView key={compliment.id} details={compliment} />
                                                    ) : <span></span>}
                                                </div>
                                            </div>
                                            <ReviewList details={this.props.data.lab} />
                                        </div>
                                    </div> : ""}
                            </div>
                            <div className="widget mrb-15">
                                <div className="widget-content pb-details pb-location">
                                    <h4 className="wc-title text-md fw-700">Location</h4>
                                    <div className="address-details">
                                        <a href={`https://www.google.com/maps/search/?api=1&query=${lat},${long}`} className="link-text text-md fw-700" target="_blank">
                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/map-icon.png"} className="img-fluid add-map" />
                                        </a>
                                        <p className="add-info">{address}</p>
                                    </div>
                                    <div className="pb-view text-left">
                                        <a href={`https://www.google.com/maps/search/?api=1&query=${lat},${long}`} className="link-text text-md fw-700 view-in-map" target="_blank">View in Google Map</a>
                                    </div>
                                </div>
                            </div>
                            <div className="widget mrb-15">
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
