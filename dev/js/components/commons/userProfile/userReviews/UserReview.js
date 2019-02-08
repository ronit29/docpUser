import React from 'react';

const GENDER = {
    "m": "Male",
    "f": "Female",
    "o": "Other"
}

class UserReview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
        }
    }

    componentDidMount() {
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

                {this.state.data ? this.state.data.map(rating =>
                    <div className="review-card clearfix" key={rating.id}>
                        <div className="first-sec">
                            <img src={rating.icon} className="img-fluid" />
                            <div className="c-date">{rating.date}</div>
                        </div>
                        <div className="last-sec">
                            <div className="clnc-nam">{rating.entity_name}</div>
                            <div className="clnc-add">Distt Shopping Centre Next to More Superstore Gurgaon</div>
                        </div>
                        <div className="rating-sec">
                            <span className="rating-img"><img className="img-fluid" src="/assets/img/customer-icons/satr-wt.svg" /> {rating.ratings} </span>
                            <span className="clnc-nam">{rating.compliments}</span>
                            <div className="clnc-nam pad-t6">{rating.review}</div>
                        </div>
                        <div className="btn-div">
                            <ul>
                                <li><a href="javascript:void(0);">Edit</a></li>
                                <li><a href="javascript:void(0);">Share</a></li>
                            </ul>
                        </div>
                    </div>
                ) : ""}
            </div>
        );
    }
}


export default UserReview
