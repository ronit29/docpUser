import React from "react";
import STORAGE from '../../../helpers/storage'


class RatingProfileCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            selectedRating: 0,
            rating_id: null,
            compliments: [],
            review_field: '',
            selected_compliments: []
        }
    }

    componentDidMount() {
        this.setState({ data: this.props.details })
        if (STORAGE.checkAuth()) {
            this.props.getRatingCompliments((err, compliments) => {
                if (!err && compliments) {
                    this.setState({ compliments })
                }
            })
        }
    }

    selectRating(x, size) {
        this.setState({ selectedRating: x })
        if (!size) {
            let type = this.getAppointmentType();
            let post_data = { 'rating': x, 'appointment_id': this.props.details.id, 'appointment_type': type };
            this.props.createAppointmentRating(post_data, (err, data) => {
                if (!err && data) {
                    this.setState({ rating_id: data.id })
                }
            })
        }
    }

    declineRating(type, id, size) {
        if (!size) {
            let post_data = { 'appointment_id': id, 'appointment_type': type };
            this.props.closeAppointmentRating(post_data, (err, data) => {
                if (!err && data) {
                    console.log('Popup Closed');
                }
            })
        }
        this.setState({ data: null })
    }

    getAppointmentType = () => {
        let type = this.props.details.type && this.props.details.type == "lab" ? 1 : 2;
        return type;
    }
    handleReviewChange(e) {
        this.setState({ review_field: e.target.value });
    }

    handleComplimentChange(id) {
        let compliments = this.state.selected_compliments;
        compliments.push(id);
        this.setState({ selected_compliments: compliments });
    }

    submitRating() {
        let post_data = { 'id': this.state.rating_id, 'rating': this.state.selectedRating, 'review': this.state.review_field, 'compliment': this.state.selected_compliments };
        this.props.updateAppointmentRating(post_data, (err, data) => {
            if (!err && data) {
                this.setState({ data: null })
            }
        })
    }

    render() {
        if (this.state.data) {
            let name = (this.props.details.doctor) ? this.props.details.doctor.name : this.props.details.lab_name;
            let qualification_object = this.props.details.doctor ? this.props.details.doctor.qualifications : null;
            let qualification = qualification_object ? qualification_object[0].qualification : '';
            let specialization = qualification_object ? qualification_object[0].specialization : '';
            let thumbnail = this.props.details.doctor ? this.props.details.doctor_thumbnail : this.props.details.lab_thumbnail;
            let type = this.getAppointmentType();
            let pipe = '';
            if (type !== 1) {
                pipe = ' | ';
            }
            let app_id = this.props.details.id
            let entity = (type == 1) ? 'lab' : 'doctor';
            if (!this.state.rating_id) {

                return (

                    <div className="rating-upside-container">
                        <div className="sub-upside-star">
                            <p>Rate your recent visit with the {entity}</p>
                            {
                                [1, 2, 3, 4, 5].map((x, i) => {
                                    return <img key={i} onClick={this.selectRating.bind(this, x, 0)} className="img-fluid" src={"/assets/img/customer-icons/" + (this.state.selectedRating > 0 && this.state.selectedRating >= x ? "" : "un") + "selected-star.svg"} />
                                })
                            }
                        </div>
                        {typeof (this.props.booking_flag) != 'undefined' && this.props.booking_flag ? "" :
                            (<div className="inner-star-cls">
                                <img onClick={this.declineRating.bind(this, type, app_id, 0)} className="img-fluid" src="/assets/img/customer-icons/rt-close.svg" />
                            </div>)
                        }
                    </div>
                );
            }
            else {

                return (<div className="raiting-popup">
                    <div className="home-rating-card">

                        <div className="rate-card-header">
                            Share your Feedback
                    <span><img onClick={this.declineRating.bind(this, type, app_id, 1)} src="/assets/img/customer-icons/rt-close.svg" className="img-fluid" /></span>
                        </div>
                        <div className="rate-card-doc-dtls">
                            <img src={thumbnail} className="img-fluid img-round " />
                            <div className="rate-doc-dtl">
                                <p className="rt-doc-nm">
                                    {name}
                                </p>
                                <span>{qualification} {pipe} {specialization}</span>
                            </div>
                        </div>
                        <div className="rate-star-icon">
                            {
                                [1, 2, 3, 4, 5].map((x, i) => {
                                    return <img key={i} onClick={this.selectRating.bind(this, x, 1)} className="img-fluid" src={"/assets/img/customer-icons/" + (this.state.selectedRating > 0 && this.state.selectedRating >= x ? "" : "un") + "selected-star.svg"} />
                                })
                            }
                        </div>
                        {/* <StarView handleSelect={this.h        this.setState({ data: this.props.details.unrated_appointment })
andleselectRating} selectedRating={this.state.selectedRating} /> */}
                        <div className="rate-compliment-section">
                            <p className="cmplmnt-para">Give your compliment</p>
                            <ul className="compliment-lising">
                                {this.state.compliments.map(comp => {
                                    if (comp.type == type && this.state.selectedRating == comp.rating_level)
                                        return <li key={comp.id}>
                                            <label className="ck-bx">
                                                <span className="rate-feed-text">{comp.message}</span>
                                                <input type="checkbox" onChange={this.handleComplimentChange.bind(this, comp.id)} />
                                                <span className="checkmark" />
                                            </label>
                                        </li>
                                }
                                )
                                }
                            </ul>
                            <div className="rate-submit-cmnnt-box">
                                <textarea placeholder="Leave a review" rows="2" value={this.state.review_field} onChange={this.handleReviewChange.bind(this)}>
                                </textarea>


                                <button className="rate-submit-btn" onClick={this.submitRating.bind(this)}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>);
            }
        }
        else {
            return ("");
        }
    }
}

export default RatingProfileCard;



