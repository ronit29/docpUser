import React from "react";
import InfiniteScroll from 'react-infinite-scroller';
import ProfileHeader from '../DesktopProfileHeader'
import ComplimentListView from '../ratingsProfileView/ComplimentListView.js'
import ReviewList from '../ratingsProfileView/ReviewList.js'
import RatingGraph from '../ratingsProfileView/RatingGraph.js'
import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import Footer from '../Home/footer'

class RatingReviewView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            hasMore: false,
            footerData: null,
            page: 2
        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
        this.props.getAllRatings(this.props.content_type, this.props.id, 1, (err, data, hasMore) => {
            if (!err && data) {
                this.setState({ data, hasMore })
            }
        })
        setTimeout(() => {
            this.setState({ hasMore: true })
        }, 0)
    }

    loadMore() {
        this.setState({ hasMore: false, loading: true }, () => {
            this.props.getAllRatings(this.props.content_type, this.props.id, this.state.page, (err, data, hasMore) => {
                let newData = { ...this.state.data }
                newData.rating = newData.rating.concat(data.rating)
                this.setState({ loading: false, page: this.state.page + 1, hasMore, data: newData })
            })
        })

    }

    render() {

        return (
            <React.Fragment>
            {
                this.state.data?
                <div className="widget-panel">
                    <h4 className="panel-title mb-rmv">Patient Feedback <a className="rateViewAll"></a></h4>
                    <div className="panel-content pd-0 border-bottom-panel">
                        <RatingGraph details={this.state.data} />
                        <div className="user-satisfaction-section">
                            <div className="row no-gutters">
                                {this.state.data.rating_graph && this.state.data.rating_graph.top_compliments?
                                    this.state.data.rating_graph.top_compliments.map(compliment =>
                                        <ComplimentListView key={compliment.id} details={compliment} />
                                    ) : <div></div>}

                            </div>
                        </div>
                        <InfiniteScroll
                            pageStart={1}
                            loadMore={this.loadMore.bind(this)}
                            hasMore={this.state.hasMore}
                            useWindow={true}
                            initialLoad={false}
                        >
                            <ReviewList details={this.state.data} />
                        </InfiniteScroll>
                    </div>
                </div>
                :''    
            }
            </React.Fragment>
        )
    }

}


export default RatingReviewView;
