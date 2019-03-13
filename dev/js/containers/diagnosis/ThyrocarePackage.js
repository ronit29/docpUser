import React from 'react';
import { connect } from 'react-redux';

import { getOfferList, toggleOPDCriteria, toggleDiagnosisCriteria } from '../../actions/index.js'

import ThyrocarePackageView from '../../components/diagnosis/ThyrocarePackage/ThyrocarePackageView.js';

class ThyrocarePackage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <ThyrocarePackageView {...this.props} />
        );
    }
}

const mapStateToProps = (state, passedProps) => {

    const {
        offerList
    } = state.USER

    return {
        offerList
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        getOfferList: (lat, long) => dispatch(getOfferList(lat, long)),
        toggleOPDCriteria: (type, criteria, forceAdd, filter) => dispatch(toggleOPDCriteria(type, criteria, forceAdd, filter)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd, filter) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd, filter))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ThyrocarePackage);
