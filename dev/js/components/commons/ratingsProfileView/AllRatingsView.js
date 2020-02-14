import React from "react";
const queryString = require('query-string');
import InfiniteScroll from 'react-infinite-scroller';
import ProfileHeader from '../../commons/DesktopProfileHeader'
import ComplimentListView from '../../commons/ratingsProfileView/ComplimentListView.js'
import ReviewList from '../../commons/ratingsProfileView/ReviewList.js'
import RatingGraph from '../../commons/ratingsProfileView/RatingGraph.js'
import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import Footer from '../../commons/Home/footer'
import Disclaimer from '../../commons/Home/staticDisclaimer.js'

class AllRatingsView extends React.Component {
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
        const parsed = queryString.parse(this.props.location.search)
        let content_type = parsed.content_type
        let object_id = parsed.id
        this.props.getAllRatings(content_type, object_id, 1, (err, data, hasMore) => {
            if (!err && data) {
                this.setState({ data, hasMore })
            }
        })
        setTimeout(() => {
            this.setState({ hasMore: true })
        }, 0)
    }

    loadMore() {
        const parsed = queryString.parse(this.props.location.search)
        let content_type = parsed.content_type
        let object_id = parsed.id
        this.setState({ hasMore: false, loading: true }, () => {
            this.props.getAllRatings(content_type, object_id, this.state.page, (err, data, hasMore) => {
                let newData = { ...this.state.data }
                newData.rating = newData.rating.concat(data.rating)
                this.setState({ loading: false, page: this.state.page + 1, hasMore, data: newData })
            })
        })

    }

    render() {

        return (
            <div className="profile-body-wrap">
                <ProfileHeader showSearch={true} />
                <section className="container parent-section book-appointment-section breadcrumb-mrgn">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                        {this.state.data ?
                                            <div>
                                                <RatingGraph details={this.state.data} />
                                                <div className="user-satisfaction-section">
                                                    <div className="row no-gutters">
                                                        {this.state.data ? this.state.data.rating_graph.top_compliments.map(compliment =>
                                                            <ComplimentListView key={compliment.id} details={compliment} />) : ""}
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

                                            </div> : ""}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <RightBar msgTemplate="gold_general_template"/>
                    </div>
                </section>
                <Disclaimer />
                <Footer footerData={this.state.footerData} />
            </div>
        )
    }

}


export default AllRatingsView;
