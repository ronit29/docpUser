import React from 'react';
import { connect } from 'react-redux';

import { getOfferList, toggleOPDCriteria, toggleDiagnosisCriteria, NonIpdBookingLead, common_utm_tags, saveLeadPhnNumber } from '../../actions/index.js'

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
        offerList,
        common_utm_tags
    } = state.USER

    return {
        offerList
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        getOfferList: (lat, long) => dispatch(getOfferList(lat, long)),
        toggleOPDCriteria: (type, criteria, forceAdd, filter) => dispatch(toggleOPDCriteria(type, criteria, forceAdd, filter)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd, filter) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd, filter)),
        NonIpdBookingLead:(data,cb) =>dispatch(NonIpdBookingLead(data, cb)),
        saveLeadPhnNumber:(number) => dispatch(saveLeadPhnNumber(number))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ThyrocarePackage);
