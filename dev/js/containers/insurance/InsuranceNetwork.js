import React from 'react'
import { connect } from 'react-redux'
import { } from '../../actions/index.js'
import InsuranceNetworkView from '../../components/insurance/InsuranceNetworkView.js'

class InsuranceNetwork extends React.Component {

    render() {
        return (
            <InsuranceNetworkView {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}



export default connect(mapStateToProps, mapDispatchToProps)(InsuranceNetwork)