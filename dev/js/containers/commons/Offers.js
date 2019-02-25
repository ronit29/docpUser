import React from 'react';
import { connect } from 'react-redux';
import OffersView from '../../components/commons/offers';
import { toggleOPDCriteria, toggleDiagnosisCriteria, getOfferList, selectSearchType } from '../../actions/index.js'

class Offers extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <OffersView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    const {
        offerList
    } = state.USER

    const {
        selectedLocation
    } = state.SEARCH_CRITERIA_LABS

    return {
        offerList,
        selectedLocation
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleOPDCriteria: (type, criteria, forceAdd, filters) => dispatch(toggleOPDCriteria(type, criteria, forceAdd, filters)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd, filters) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd, filters)),
        selectSearchType: (type) => dispatch(selectSearchType(type)),
        getOfferList: (lat, long) => dispatch(getOfferList(lat, long))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Offers);