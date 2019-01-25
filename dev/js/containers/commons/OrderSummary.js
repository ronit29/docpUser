import React from 'react';
import { connect } from 'react-redux';

import { fetchOrderSummary } from '../../actions/index.js'
import STORAGE from '../../helpers/storage'

import OrderSummaryView from '../../components/commons/orderSummary'


class OrderSummary extends React.Component {
    constructor(props) {
        super(props)
        if (!STORAGE.checkAuth()) {
            this.props.history.replace(`/login?callback=/`)
        }
    }

    componentDidMount() {
        if (STORAGE.checkAuth()) {

        }
    }

    render() {

        return (
            <OrderSummaryView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {

    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrderSummary: (order_id) => dispatch(fetchOrderSummary(order_id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
