import React from "react";
import RatingStars from "./RatingStars";

class RatingGraph extends React.Component {
    constructor(props) {
        super(props);
    }

    getRatingPercent(key) {
        return { 'width': key['percent'] + '%' }
    }

    render() {
        if (typeof (this.props.details.rating_graph) != "undefined" && this.props.details.rating_graph != null && this.props.details.rating_graph) {
            let fivestar_progress = this.props.details.rating_graph.star_count[5]
            let fourstar_progress = this.props.details.rating_graph.star_count[4]
            let threestar_progress = this.props.details.rating_graph.star_count[3]
            let twostar_progress = this.props.details.rating_graph.star_count[2]
            let onestar_progress = this.props.details.rating_graph.star_count[1]

            return (
                <div className="feed-back-container">
                    <div className="row flx-center">
                        <div className="col-4">
                            {
                                this.props.details.rating_graph && this.props.details.rating_graph.avg_rating ?
                                    <RatingStars average_rating={this.props.details.rating_graph.avg_rating} width="12px" height="12px" justifyCenter={true} /> : ''
                            }
                            <div className="feedback-rating-text">
                                <p className="feedback-rate">{this.props.details.rating_graph.avg_rating}</p>
                                <p className="feedback-rate-status">
                                    {this.props.details.rating_graph.rating_count} ratings and
                                <span>{this.props.details.rating_graph.review_count} reviews</span>
                                </p>
                            </div>
                        </div>
                        <div className="col-7 border-lft">
                            <div className="feed-status-container">
                                <span className="feed-progress-point">5<img src={ASSETS_BASE_URL + "/img/customer-icons/star-dark.svg"} /></span>
                                <div className="rating-progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="30" style={this.getRatingPercent(fivestar_progress)}>
                                        <span className="sr-only"></span>
                                    </div>
                                </div>
                                <span className="feed-progress-count">{fivestar_progress['count']}</span>
                            </div>
                            <div className="feed-status-container">
                                <span className="feed-progress-point">4<img src={ASSETS_BASE_URL + "/img/customer-icons/star-dark.svg"} /></span>
                                <div className="rating-progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={this.getRatingPercent(fourstar_progress)}>
                                        <span className="sr-only"></span>
                                    </div>
                                </div>
                                <span className="feed-progress-count">{fourstar_progress['count']}</span>
                            </div>
                            <div className="feed-status-container">
                                <span className="feed-progress-point">3<img src={ASSETS_BASE_URL + "/img/customer-icons/star-dark.svg"} /></span>
                                <div className="rating-progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={this.getRatingPercent(threestar_progress)}>
                                        <span className="sr-only"></span>
                                    </div>
                                </div>
                                <span className="feed-progress-count">{threestar_progress['count']}</span>
                            </div>
                            <div className="feed-status-container">
                                <span className="feed-progress-point">2<img src={ASSETS_BASE_URL + "/img/customer-icons/star-dark.svg"} /></span>
                                <div className="rating-progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={this.getRatingPercent(twostar_progress)}>
                                        <span className="sr-only"></span>
                                    </div>
                                </div>
                                <span className="feed-progress-count">{twostar_progress['count']}</span>
                            </div>
                            <div className="feed-status-container">
                                <span className="feed-progress-point">1<img src={ASSETS_BASE_URL + "/img/customer-icons/star-dark.svg"} /></span>
                                <div className="rating-progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={this.getRatingPercent(onestar_progress)}>
                                        <span className="sr-only"></span>
                                    </div>
                                </div>
                                <span className="feed-progress-count">{onestar_progress['count']}</span>
                            </div>
                        </div>
                    </div>
                </div>

            );
        }
        else {
            return (<div></div>)
        }
    }
}

export default RatingGraph;
