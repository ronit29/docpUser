import React from 'react';
import { connect } from 'react-redux';

import { } from '../../actions/index.js'

import PaymentView from '../../components/opd/payment/PaymentView.js'

class Payment extends React.Component {
    constructor(props) {
        super(props)
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

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Payment);
