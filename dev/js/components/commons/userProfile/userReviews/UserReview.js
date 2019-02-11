import React from 'react';
import MyReviewCard from '../../ratingsProfileView/MyReviewCard.js';

class UserReview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            compliments: [],
        }
    }

    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search)
        let sms_token = parsed.token ? parsed.token : null;
        let sms_id = parsed.id ? parsed.id : null;
        if (sms_token) {
            this.props.OTTLogin(sms_token).then((order_id) => {
                // return this.props.fetchOrderById(order_id)
            })
        }

        this.props.getRatingCompliments((err, compliments) => {
            if (!err && compliments) {
                this.setState({ compliments })
            }
        })
        this.props.getUserReviews((err, data) => {
            if (!err && data) {
                this.setState({ data })
            }
        })
    }



    render() {
        return (
            <div>
                <h2 className="rev-txt">Your Reviews</h2>
                {this.state.data ? this.state.data.map(rating => <MyReviewCard {...this.props} details={rating} comp={this.state.compliments} key={rating.id} />) : ""}
            </div>
        );
    }
}


export default UserReview
