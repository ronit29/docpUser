import React from "react";

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

        {this.props.details.rating.map(rating =>
          <div className="usr-feed-comment" key={rating.id}>
            <div className="comment-status-content">
              <span>{rating.ratings} <img className="img-fluid" src="/assets/img/customer-icons/satr-wt.svg" /></span>
              <p className="feed-sts-heading">{rating.compliment}</p>
            </div>
            <p className="usr-comments-pera">{rating.review}</p>
            <p className="comment-para-status">{rating.user_name} | {rating.date}</p>
          </div>
        )}

      </div>
    );
  }
}

export default ReviewList;
