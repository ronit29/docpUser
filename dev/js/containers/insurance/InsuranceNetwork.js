import React from 'react'
import { connect } from 'react-redux'
import { getInsuranceNetworks, setNetworkType } from '../../actions/index.js'
import InsuranceNetworkView from '../../components/insurance/InsuranceNetworkView.js'

class InsuranceNetwork extends React.Component {

    render() {
        return (
            <InsuranceNetworkView {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    const {
        insuranceNetwork,
        inputString,
        networkType
    } = state.SITE_MAP

    const {
        selectedLocation
    } = state.SEARCH_CRITERIA_OPD

    return {
        insuranceNetwork,
        inputString,
        selectedLocation,
        networkType
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInsuranceNetworks: (lat, long, type, searchString, searchBy) => dispatch(getInsuranceNetworks(lat, long, type, searchString, searchBy)),
        setNetworkType: (type) => dispatch(setNetworkType(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceNetwork)