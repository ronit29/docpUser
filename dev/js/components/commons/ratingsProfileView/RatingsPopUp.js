import React from "react";
import STORAGE from '../../../helpers/storage'
// import StarView from './StarView.js'


class RatingsPopUp extends React.Component {
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

    getAppointmentType = () => {
        let type = this.state.data.type && this.state.data.type == "lab" ? 1 : 2;
        return type;
    }

    componentDidMount() {
        if (STORAGE.checkAuth()) {
            this.props.getUnratedAppointment((err, data) => {
                if (!err && data) {
                    this.setState({ data })
                    //let type = this.state.data.type && this.state.data.type == "lab" ? 1 : 2;
                }
            })
            this.props.getRatingCompliments((err, compliments) => {
                if (!err && compliments) {
                    this.setState({ compliments })
                }
            })
        }
    }

    handleselectRating = (x, size) => {
        this.setState({ selectedRating: x })
        if (!size) {
            let type = this.getAppointmentType();
            let post_data = { 'rating': x, 'appointment_id': this.state.data.id, 'appointment_type': type };
            this.props.createAppointmentRating(post_data, (err, data) => {
                if (!err && data) {
                    console.log(data.id);
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
        if (typeof (this.state.data) != "undefined" && this.state.data != null && this.state.data.id) {
            let name = (this.state.data.doctor) ? this.state.data.doctor.name : this.state.data.lab.name;
            let qualification_object = this.state.data.doctor ? this.state.data.doctor.qualifications : null;
            let qualification = qualification_object ? qualification_object[0].qualification : '';
            let specialization = qualification_object ? qualification_object[0].specialization : '';
            let type = this.getAppointmentType();
            let pipe = ''
            if (type !== 1) {
                pipe = ' | ';
            }
            if (!this.state.rating_id) {
                return (
                    <div className="raiting-popup">
                        <div className="home-rating-card">
                            <div className="rate-card-header">
                                Share your Feedback
                                <span><img onClick={this.declineRating.bind(this, type, this.state.data.id, 1)} src="/assets/img/customer-icons/rt-close.svg" className="img-fluid" /></span>
                            </div>
                            <div className="rate-card-doc-dtls">
                                <img src="/assets/img/customer-icons/user.png" className="img-fluid img-round " />
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
                            {/* <StarView handleSelect={this.handleselectRating} selectedRating={this.state.selectedRating} /> */}
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
                    </div>
                );
            }
            else {
                return (
                    <div className="raiting-popup">
                        <div className="home-rating-card">
                            <div className="rate-card-header">
                                Rate your Experience
                        <span><img onClick={this.declineRating.bind(this, type, this.state.data.id, 0)} src="/assets/img/customer-icons/rt-close.svg" className="img-fluid" /></span>
                            </div>
                            <div className="rate-card-doc-dtls">
                                <img src="/assets/img/customer-icons/user.png" className="img-fluid img-round " />
                                <div className="rate-doc-dtl">
                                    <p className="rt-doc-nm">{name}</p>
                                    <span>{qualification} {pipe} {specialization}</span>
                                </div>
                            </div>
                            <div className="rate-star-icon">
                                {
                                    [1, 2, 3, 4, 5].map((x, i) => {
                                        return <img key={i} onClick={this.selectRating.bind(this, x, 0)} className="img-fluid" src={"/assets/img/customer-icons/" + (this.state.selectedRating > 0 && this.state.selectedRating >= x ? "" : "un") + "selected-star.svg"} />
                                    })
                                }
                            </div>
                        </div >
                    </div>
                );
            }
        }
        return (<div></div >);
    }
}

export default RatingsPopUp;
