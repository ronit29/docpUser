import React from 'react';
import { connect } from 'react-redux';
import OffersView from '../../components/commons/offers';
import { toggleOPDCriteria, toggleDiagnosisCriteria } from '../../actions/index.js'

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

const mapStateToProps = (state, passedProps) => {

}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleOPDCriteria: (type, criteria, forceAdd) => dispatch(toggleOPDCriteria(type, criteria, forceAdd)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Offers);