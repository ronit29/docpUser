import React from 'react';
import { connect } from 'react-redux';

import { getUserProfile, fetchTransactions, refundWallet } from '../../actions/index.js'

import WalletView from '../../components/commons/wallet'
import STORAGE from '../../helpers/storage'

class Home extends React.Component {
    constructor(props) {
        super(props)
        if (!STORAGE.checkAuth()) {
            this.props.history.replace(`/login?callback=/wallet`)
        }
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        if (STORAGE.checkAuth()) {
            // this.props.getUserProfile()
            this.props.fetchTransactions()
        }
    }

    render() {

        return (
            <WalletView {...this.props} {...this.state} />
        );
    }
}

const mapStateToProps = (state) => {
    let {
        userTransactions,
        userWalletBalance,
        userCashbackBalance
    } = state.USER

    return {
        userTransactions,
        userWalletBalance,
        userCashbackBalance
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTransactions: (cb) => dispatch(fetchTransactions(cb)),
        getUserProfile: () => dispatch(getUserProfile()),
        refundWallet: (cb) => dispatch(refundWallet(cb))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
