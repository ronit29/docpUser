import React from 'react';
import { connect } from 'react-redux';

import { fetchPgData, fetchPaymentOptions } from '../../actions/index.js'
import STORAGE from '../../helpers/storage'

import PaymentView from '../../components/commons/payment/index.js'


class Payment extends React.Component {
    constructor(props) {
        super(props)
        if (!STORAGE.checkAuth()) {
            this.props.history.replace(`/login?callback=/`)
        }
    }

    // static loadData(store) {
    //     return store.dispatch(getUserProfile())
    // }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        if (STORAGE.checkAuth()) {

        }
    }

    render() {

        return (
            <PaymentView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {

    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPgData: (id, cb) => dispatch(fetchPgData(id, cb)),
        fetchPaymentOptions: (cb) => dispatch(fetchPaymentOptions(cb))

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Payment);
