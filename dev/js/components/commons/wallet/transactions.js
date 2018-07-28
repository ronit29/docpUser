import React from 'react';

class Transactions extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {

        return (
            <div>
                <div className="row transactions-date-row">
                    <div className="col-12">
                        <p className="transactions-date">19th June 2018</p>
                    </div>
                </div>
                <div className="row transactions-row">
                    <div className="col-3 col-sm-2">
                        <img src={ASSETS_BASE_URL + "/img/icons/transaction-left.svg"} className="transaction-icon transaction-icon-right" />
                    </div>
                    <div className="col-6 col-sm-8 transaction-item-col">
                        <p className="transaction-item-head fw-500">Amount Refunded</p>
                        <p className="transaction-item">Transaction id : 12345976RTBDP</p>
                        <p className="transaction-item">Refund in process</p>
                    </div>
                    <div className="col-3 col-sm-2 transaction-amt-col">
                        <p className="transaction-amt fw-500"><span className="plus-text">+</span> &#8377; 200</p>
                    </div>
                </div>
            </div>
        )
    }

}

export default Transactions