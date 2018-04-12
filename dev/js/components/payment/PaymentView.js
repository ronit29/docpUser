import React from 'react';

import PaymentIcon from 'material-ui-icons/Payment';
import CashIcon from 'material-ui-icons/AttachMoney';

class PaymentView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="payment">
                <div className="offerRow">
                    <span>Get 10% cashback for all online payment, T&C</span>
                </div>
                <div className="paymentRow">
                    <PaymentIcon className="paymentIcon" />
                    <span>Paytm Wallet</span>
                </div>
                <div className="paymentRow">
                    <PaymentIcon className="paymentIcon" />
                    <span>Credit/Debit/ATM Card</span>
                </div>
                <div className="paymentRow">
                    <PaymentIcon className="paymentIcon" />
                    <span>Net Banking</span>
                </div>
                <div className="paymentRow">
                    <CashIcon className="paymentIcon" />
                    <span>Pay in Cash</span>
                </div>
                <div className="paymentRow">
                    <PaymentIcon className="paymentIcon" />
                    <span>OnDoc Pay</span>
                </div>
            </div>
        );
    }
}


export default PaymentView
