import React from "react";

class RatingGraph extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let fivestar_progress = this.props.details.rating_graph.star_count[5] * 10
        return (
            <div className="feed-back-container">
                <div className="row flx-center">
                    <div className="col-4">
                        <div className="feedback-rating-text">
                            <p className="feedback-rate">{this.props.details.rating_graph.avg_rating}</p>
                            <p className="feedback-rate-status">
                                {this.props.details.rating_graph.rating_count} ratings and
                            <span>{this.props.details.rating_graph.review_count} reviews</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="feed-status-container">
                            <span className="feed-progress-point">5<img src="/assets/img/customer-icons/star-dark.svg" /></span>
                            <div className="rating-progress">
                                <div className="progress-bar" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style={{ width: '30%' }}>
                                    <span className="sr-only"></span>
                                </div>
                            </div>
                            <span className="feed-progress-count">{this.props.details.rating_graph.star_count[5]}</span>
                        </div>
                        <div className="feed-status-container">
                            <span className="feed-progress-point">4<img src="/assets/img/customer-icons/star-dark.svg" /></span>
                            <div className="rating-progress">
                                <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: '60%' }}>
                                    <span className="sr-only"></span>
                                </div>
                            </div>
                            <span className="feed-progress-count">{this.props.details.rating_graph.star_count[4]}</span>
                        </div>
                        <div className="feed-status-container">
                            <span className="feed-progress-point">3<img src="/assets/img/customer-icons/star-dark.svg" /></span>
                            <div className="rating-progress">
                                <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: '40%' }}>
                                    <span className="sr-only"></span>
                                </div>
                            </div>
                            <span className="feed-progress-count">{this.props.details.rating_graph.star_count[3]}</span>
                        </div>
                        <div className="feed-status-container">
                            <span className="feed-progress-point">2<img src="/assets/img/customer-icons/star-dark.svg" /></span>
                            <div className="rating-progress">
                                <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: '20%' }}>
                                    <span className="sr-only"></span>
                                </div>
                            </div>
                            <span className="feed-progress-count">{this.props.details.rating_graph.star_count[2]}</span>
                        </div>
                        <div className="feed-status-container">
                            <span className="feed-progress-point">1<img src="/assets/img/customer-icons/star-dark.svg" /></span>
                            <div className="rating-progress">
                                <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: '10%' }}>
                                    <span className="sr-only"></span>
                                </div>
                            </div>
                            <span className="feed-progress-count">{this.props.details.rating_graph.star_count[1]}</span>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default RatingGraph;
