import React from "react";
import STORAGE from '../../../helpers/storage'
// import StarView from './StarView.js'

class ReviewPopUp extends React.Component {
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
        this.setState({ selectedRating: this.props.selected_rating })
        this.setState({ compliments: this.props.compliments })
    }

    selectRating(x) {
        this.setState({ selectedRating: x })
    }

    declineRating(type, id) {
        this.props.closeAppointmentPopUp(id, (err, data) => {
            if (!err && data) {
                console.log('Popup Closed');
            }
        })
        this.props.submit({}, 1)
        this.setState({ data: null })
        this.props.popUpState()
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
        let post_data = { 'id': this.props.rating_id, 'rating': this.state.selectedRating, 'review': this.state.review_field, 'compliment': this.state.selected_compliments, 'appointment_id': this.state.data.id };
        this.setState({ data: null })
        this.props.submit(post_data, 0)
    }

    thanYouButton() {
        this.setState({ rating_done: false })
    }

    render() {

        if (typeof (this.state.data) != "undefined" && this.state.data != null && this.state.data.id) {
            return (
                <div className="raiting-popup">
                    <div className="home-rating-card">
                        <div className="rate-card-header">
                            Share your Feedback
                                <span><img onClick={this.declineRating.bind(this, this.props.obj.type, this.state.data.id)} src={ASSETS_BASE_URL + "/img/customer-icons/rt-close.svg"} className="img-fluid" /></span>
                        </div>
                        {
                            typeof (this.props.selectedHospital) != 'undefined' && this.props.selectedHospital.id ?

                                <div className="rate-seceltion-cont">
                                    <p className="rt-par-select">{this.props.selectedHospital.hospital_name}</p>
                                </div> : ""
                        }
                        <div className="rate-card-doc-dtls">
                            <img src={this.props.obj.thumbnail} className="img-fluid img-round " />
                            <div className="rate-doc-dtl">
                                <p className="rt-doc-nm">
                                    {this.props.obj.name}
                                </p>
                                <span>{this.props.obj.qualification} {this.props.obj.pipe} {this.props.obj.specialization}</span>
                            </div>
                        </div>
                        <div className="rate-star-icon">
                            {
                                [1, 2, 3, 4, 5].map((x, i) => {
                                    return <img key={i} onClick={this.selectRating.bind(this, x)} className="img-fluid" src={"/assets/img/customer-icons/" + (this.state.selectedRating > 0 && this.state.selectedRating >= x ? "" : "un") + "selected-star.svg"} />
                                })
                            }
                        </div>
                        {/* <StarView handleSelect={this.handleselectRating} selectedRating={this.state.selectedRating} /> */}
                        <div className="rate-compliment-section">
                            <p className="cmplmnt-para">Give your compliment</p>
                            <ul className="compliment-lising">
                                {this.state.compliments.map(comp => {
                                    if (comp.type == this.props.obj.type && this.state.selectedRating == comp.rating_level)
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
                                <textarea maxLength="5000" placeholder="Leave a review" rows="2" value={this.state.review_field} onChange={this.handleReviewChange.bind(this)}>
                                </textarea>

                                <button className="rate-submit-btn" onClick={this.submitRating.bind(this)}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (<div></div >);
    }
}

export default ReviewPopUp;
