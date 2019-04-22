import React from 'react';
import SharePopUp from './SharePopUp.js';
import EditReviewPopUp from './EditReviewPopUp.js';

class MyReviewCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sms_id: this.props.sms_id ? this.props.sms_id : null,
            data: this.props.details,
            selectedRating: this.props.details ? this.props.details.ratings : 0,
            type: 1,
            toggle_share: false,
            compliments: [],
        }
    }

    componentDidMount() {
        this.setState({ data: this.props.details })
        this.setState({ compliments: this.props.comp })
        this.setState({ sms_id: this.props.sms_id })
        if (this.state.sms_id !== null && (this.props.details.id == this.state.sms_id)) {
            this.setState({ type: 0 })
        }
    }

    selectRating(x) {
        this.setState({ selectedRating: x })
    }

    editRating(id) {
        this.setState({ type: 0 })
    }

    cancelUpdate() {
        this.setState({
            type: 1, selectedRating: this.props.details ? this.props.details.ratings : 0, review_field: this.props.details.review,

        })
    }

    thanYouButton = () => {
        this.setState({ toggle_share: false })
    }

    sharePopUp() {
        this.setState({ toggle_share: true })
    }

    submitRating(post_data) {
        this.props.updateAppointmentRating(post_data, (err, data) => {
            if (!err && data) {
                this.setState({ type: 1, data: data })
            }
        })
    }


    render() {
        return (
            <div>
                < div className="widget mrb-15" key={this.state.data.id} >
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
                            <span className="rating-img"><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/satr-wt.svg"} /> {this.state.data.ratings} </span>
                            <span className="clnc-nam">{this.state.data.compliments}</span>
                            <div className="clnc-nam pad-t6 rate-mg-top">{this.state.data.review}</div>
                        </div>
                        <div className="btn-div">
                            <ul>
                                <li><a href="javascript:void(0);" onClick={this.editRating.bind(this)}>Edit</a></li>
                                {this.state.data.ratings > 3 ?
                                    <li><a href="javascript:void(0);" onClick={this.sharePopUp.bind(this)}>Share</a></li>
                                    : ""}
                            </ul>
                        </div>
                    </div>
                </div>
                {
                    this.state.type == 0 ? <EditReviewPopUp {...this.props} details={this.state.data} submit={this.submitRating.bind(this)} selected_rating={this.state.data.ratings} compliments={this.state.compliments} cancel={this.cancelUpdate.bind(this)} /> : ""
                }
                {
                    this.state.toggle_share ? <SharePopUp {...this.props} submit={this.thanYouButton} selectedRating={this.state.selectedRating} details={this.state.data} /> : ""
                }
            </div>
        );
    }
}


export default MyReviewCard
