import React from "react";
const queryString = require('query-string');

import ProfileHeader from '../../commons/DesktopProfileHeader'
import ComplimentListView from '../../commons/ratingsProfileView/ComplimentListView.js'
import ReviewList from '../../commons/ratingsProfileView/ReviewList.js'
import RatingGraph from '../../commons/ratingsProfileView/RatingGraph.js'
import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import Footer from '../../commons/Home/footer'

class AllRatingsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            footerData: null,
        }
    }

    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search)
        let content_type = parsed.content_type
        let object_id = parsed.id
        this.props.getAllRatings(content_type, object_id, (err, data) => {
            if (!err && data) {
                this.setState({ data })
            }
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
                                                <ReviewList details={this.state.data} />
                                            </div> : ""}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <RightBar />
                    </div>
                </section>
                <Footer footerData={this.state.footerData} />
            </div>
        )
    }

}


export default AllRatingsView;
