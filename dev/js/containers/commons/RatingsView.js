import React from 'react';
import { connect } from 'react-redux';

import { getAllRatings } from '../../actions/index.js'

import AllRatingsView from '../../components/commons/ratingsProfileView/AllRatingsView.js'


class RatingsView extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    render() {
        return (
            <AllRatingsView {...this.props} />
        );
    }
}

const mapStateToProps = (state, passedProps) => {
    /**
     * initialServerData is server rendered async data required build html on server. 
     */
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllRatings: (content_type, object_id, page, cb) => dispatch(getAllRatings(content_type, object_id, page, cb)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RatingsView);
