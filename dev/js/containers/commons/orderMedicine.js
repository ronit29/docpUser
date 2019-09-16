import React from 'react';
import { connect } from 'react-redux';

import { iFrameState } from '../../actions/index.js'
import OrderMedicineView from '../../components/commons/OrderMedicine/orderMedicineView.js';

class OrderMedicine extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <OrderMedicineView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    let {
        iFrameUrls
    } = state.USER
    return {
        iFrameUrls
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        iFrameState: (url, emptyUrls) => dispatch(iFrameState(url, emptyUrls))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderMedicine);