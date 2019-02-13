import React from 'react';


class MyReviewCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sms_id: this.props.sms_id ? this.props.sms_id : null,
            data: this.props.details,
            selectedRating: this.props.details ? this.props.details.ratings : 0,
            type: 1,
            compliments: [],
            review_field: this.props.details.review,
            selected_compliments: this.props.details.compliments_list ? this.props.details.compliments_list : []
        }
    }

    componentDidMount() {
        this.setState({ data: this.props.details })
        this.setState({ compliments: this.props.comp })
        this.setState({ sms_id: this.props.sms_id })
        console.log(this.props);
        if (this.state.sms_id !== null && (this.props.details.id == this.state.sms_id)) {
            console.log('innnn');
            this.setState({ type: 0 })
        }
    }

    selectRating(x) {
        this.setState({ selectedRating: x })
        this.setState({ selected_compliments: [] });

    }

    editRating(id) {
        this.setState({ type: 0 })
    }

    handleReviewChange(e) {
        this.setState({ review_field: e.target.value });
    }

    handleComplimentChange(id) {
        let compliments = this.state.selected_compliments;
        compliments.push(id);
        this.setState({ selected_compliments: compliments });
    }

    cancelUpdate() {
        this.setState({
            type: 1, selected_compliments: this.props.details.compliments_list ? this.props.details.compliments_list : [], selectedRating: this.props.details ? this.props.details.ratings : 0, review_field: this.props.details.review,

        })
    }

    submitRating() {
        let post_data = { 'id': this.props.details.id, 'rating': this.state.selectedRating, 'review': this.state.review_field, 'compliment': this.state.selected_compliments, 'appointment_id': this.props.details.appointment_id };
        this.props.updateAppointmentRating(post_data, (err, data) => {
            if (!err && data) {
                this.setState({ type: 1, data: data })
            }
        })
        this.props.submit(post_data, 0)
    }


    render() {
        if (this.state.type == 1) {
            return (
                <div className="widget mrb-15" key={this.state.data.id}>
                    <div className="widget-content">
                        <div className="first-sec">
                            <img src={this.state.data.icon} className="img-fluid" />
                            <div className="c-date">{this.state.data.date}</div>
                        </div>
                        <div className="last-sec">
                            <div className="clnc-nam">{this.state.data.entity_name}</div>
                            <div className="clnc-add">{this.state.data.address}</div>
                        </div>
                        <div className="rating-sec">
                            <span className="rating-img"><img className="img-fluid" src="/assets/img/customer-icons/satr-wt.svg" /> {this.state.data.ratings} </span>
                            <span className="clnc-nam">{this.state.data.compliments}</span>
                            <div className="clnc-nam pad-t6 rate-mg-top">{this.state.data.review}</div>
                        </div>
                        <div className="btn-div">
                            <ul>
                                <li><a href="javascript:void(0);" onClick={this.editRating.bind(this)}>Edit</a></li>
                                {this.state.data.ratings > 3 ? <li><a href="javascript:void(0);">Share</a></li> : ""}
                            </ul>
                        </div>
                    </div>
                </div>);
        }
        else {
            return (<div className="widget mrb-15">
                <div className="widget-content">
                    <div className="rate-star-icon" style={{width:'70%', margin:'auto'}}>
                        {
                            [1, 2, 3, 4, 5].map((x, i) => {
                                return <img key={i} onClick={this.selectRating.bind(this, x)} className="img-fluid" src={"/assets/img/customer-icons/" + (this.state.selectedRating > 0 && this.state.selectedRating >= x ? "" : "un") + "selected-star.svg"} />
                            })
                        }
                    </div>
                    <div className="rate-compliment-section">
                        <p className="cmplmnt-para">Give your compliment</p>
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
                            <textarea maxLength="5000" placeholder="Leave a review" rows="2" value={this.state.review_field} onChange={this.handleReviewChange.bind(this)}>
                            </textarea>

                            {/* <button className="rate-submit-btn" onClick={this.submitRating.bind(this)}>Update</button> */}
                        </div>
                    </div>
                    <div className="btn-div">
                        <ul>
                            <li><a href='javascript:void(0);' onClick={this.submitRating.bind(this)}>Update</a></li>
                            <li><a href='javascript:void(0);' onClick={this.cancelUpdate.bind(this)}>Cancel</a></li>
                        </ul>
                    </div>
                </div>
            </div>);
        }

    }
}


export default MyReviewCard
