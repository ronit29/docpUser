import React from 'react';
import { connect } from 'react-redux';
import OffersView from '../../components/commons/offers';
import { toggleOPDCriteria, toggleDiagnosisCriteria, getOfferList } from '../../actions/index.js'

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

    return {
        offerList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleOPDCriteria: (type, criteria, forceAdd) => dispatch(toggleOPDCriteria(type, criteria, forceAdd)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd)),
        getOfferList: () => dispatch(getOfferList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Offers);