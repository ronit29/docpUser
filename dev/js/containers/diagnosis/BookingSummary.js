import React from 'react';
import { connect } from 'react-redux';

import { getLabById } from '../../actions/index.js'

import BookingSummaryView from '../../components/diagnosis/bookingSummary/index.js'

class BookingSummary extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <BookingSummaryView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {

    const {
        selectedCriterias,
    } = state.SEARCH_CRITERIA_LABS

    let LABS = state.LABS

    return {
        selectedCriterias,
        LABS
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLabById: (labId) => dispatch(getLabById(labId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingSummary);
