import React from 'react';
import { connect } from 'react-redux';

import { fetchReferralCode } from '../../actions/index.js'

import ReferralView from '../../components/commons/referral'

class Referral extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {

    }

    render() {

        return (
            <ReferralView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    let { refer_amount } = state.USER
    return {
        refer_amount
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReferralCode: () => dispatch(fetchReferralCode())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Referral);
