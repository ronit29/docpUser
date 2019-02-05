import React from "react";
const queryString = require('query-string');

import ComplimentListView from '../../commons/ratingsProfileView/ComplimentListView.js'
import ReviewList from '../../commons/ratingsProfileView/ReviewList.js'
import RatingGraph from '../../commons/ratingsProfileView/RatingGraph.js'

class AllRatingsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
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
        if (this.state.data) {
            return (
                <div>
                    <RatingGraph details={this.state.data} />
                    <div className="user-satisfaction-section">
                        <div className="row no-gutters">
                            {this.state.data ? this.state.data.rating_graph.top_compliments.map(compliment =>
                                <ComplimentListView key={compliment.id} details={compliment} />) : ""}
                        </div>
                    </div>
                    <ReviewList details={this.state.data} />
                </div>)
        } else {
            return <div></div>;
        }
    }

}


export default AllRatingsView;
