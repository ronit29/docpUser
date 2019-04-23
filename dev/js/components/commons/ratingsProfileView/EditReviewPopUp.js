import React from "react";
import STORAGE from '../../../helpers/storage'
// import StarView from './StarView.js'

class EditReviewPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            selectedRating: 0,
            compliments: [],
            review_field: this.props.details.review,
            selected_compliments: this.props.details.compliments_list ? this.props.details.compliments_list : []
        }
    }

    componentDidMount() {
        this.setState({ data: this.props.details })
        this.setState({ selectedRating: this.props.selected_rating })
        this.setState({ compliments: this.props.compliments })
    }

    selectRating(x) {
        this.setState({ selectedRating: x })
        this.setState({ selected_compliments: [] })
    }

    declineRating() {
        this.props.cancel()
    }

    handleReviewChange(e) {
        this.setState({ review_field: e.target.value });
    }

    handleComplimentChange(id) {
        let compliments = this.state.selected_compliments;
        if (compliments.includes(id)) {
            let index = compliments.indexOf(id);
            compliments.splice(index, 1);
        }
        else {
            compliments.push(id);
        }
        this.setState({ selected_compliments: compliments });
    }

    submitRating() {
        let post_data = { 'id': this.state.data.id, 'rating': this.state.selectedRating, 'review': this.state.review_field, 'compliment': this.state.selected_compliments, 'appointment_id': this.state.data.id };
        this.setState({ data: null })
        this.props.submit(post_data)
    }

    render() {

        if (typeof (this.state.data) != "undefined" && this.state.data != null && this.state.data.id) {
            return (
                <div className="raiting-popup">
                    <div className="home-rating-card review-popup">
                        <div className="rate-card-header">
                            Edit your Feedback
                                <span><img onClick={this.declineRating.bind(this)} src={ASSETS_BASE_URL + "/img/customer-icons/rt-close.svg"} className="img-fluid" /></span>
                        </div>
                        <div className="rate-card-doc-dtls">
                            <img src={this.state.data.icon} className="img-fluid img-round " />
                            <div className="rate-doc-dtl rate-doc">
                                <p className="rt-doc-nm doc-name">
                                    {this.state.data.entity_name}
                                </p>
                                <span>{this.state.data.address}</span>
                            </div>
                        </div>
                        <div className="rate-star-icon">
                            {
                                [1, 2, 3, 4, 5].map((x, i) => {
                                    return <img key={i} onClick={this.selectRating.bind(this, x)} className="img-fluid" src={"/assets/img/customer-icons/" + (this.state.selectedRating > 0 && this.state.selectedRating >= x ? "" : "un") + "selected-star.svg"} />
                                })
                            }
                        </div>
                        <div className="rate-compliment-section">
                            <p className="cmplmnt-para complemnt">Give your compliment</p>
                            <ul className="compliment-lising">
                                {this.state.compliments.map(comp => {
                                    if (comp.type == this.state.data.appointment_type && this.state.selectedRating == comp.rating_level) {
                                        let check = this.state.selected_compliments.includes(comp.id);

                                        return <li key={comp.id}>
                                            <label className="ck-bx">
                                                <span className="rate-feed-text">{comp.message}</span>
                                                <input type="checkbox" defaultChecked={check} onChange={this.handleComplimentChange.bind(this, comp.id)} />
                                                <span className="checkmark" />
                                            </label>
                                        </li>
                                    }
                                }
                                )
                                }
                            </ul>
                            <div className="rate-submit-cmnnt-box">
                                <textarea maxLength="5000" placeholder="Leave a review" rows="2" defaultValue={this.state.review_field} onChange={this.handleReviewChange.bind(this)}>
                                </textarea>

                                <button className="rate-submit-btn" onClick={this.submitRating.bind(this)}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return ("");
    }
}

export default EditReviewPopUp;
