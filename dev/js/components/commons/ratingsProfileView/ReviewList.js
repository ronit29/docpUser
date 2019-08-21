import React from "react";

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (typeof (this.props.details.rating) != "undefined" && this.props.details.rating != null && this.props.details.rating) {

      return (
        <div>

          {this.props.details.rating.map(rating =>
            <div className="usr-feed-comment" key={`${rating.id}+'_'+${rating.user_name}`}>
              <div className="comment-status-content">
                <span>{rating.ratings} <img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/satr-wt.svg"} /></span>
                <p className="feed-sts-heading">{rating.compliment}</p>
              </div>
              {rating.doctor_name?<p className="usr-comments-pera fw-500">Dr. {rating.doctor_name}</p>:''}
              <p className="usr-comments-pera">{rating.review}</p>
              <p className="comment-para-status"> { rating.is_verified ? <img className="rt-vr-img" src={ASSETS_BASE_URL + "/img/rating-verify.svg"}/> : ""} {rating.user_name ? rating.user_name + " |" : "" }  {rating.date}</p>
            </div>
          )}

        </div>
      );
    }
    else {
      return ("");
    }
  }
}

export default ReviewList;
