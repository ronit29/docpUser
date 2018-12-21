import React from 'react';

const TYPE = {
    0: "Credited",
    1: "Debit"
}

const ACTION = {
    0: "CANCELLATION",
    1: "PAYMENT",
    2: "REFUND",
    3: "SALE",
    4: "RESCHEDULE_PAYMENT",
    5: "CASHBACK_CREDIT"
}

const PRODUCT = {
    1: 'Doctor',
    2: 'Lab'
}


class Transactions extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    getAmountTag(data) {
        let { type, amount } = data
        if (TYPE[type] == 'Credited') {
            return <span className="csh-trns-price"><b className="pls-sgn">+</b> ₹ {amount}</span>
        } else {
            return <span className="csh-trns-price"><b className="mns-sgn">-</b> ₹ {amount}</span>
        }
    }

    getImageTag(data) {
        let { type, amount } = data
        if (TYPE[type] == 'Credited') {
            return <img src={ASSETS_BASE_URL + "/img/csh-back.svg"} style={{ width: '30px' }} />
        } else {
            return <img className="minus-img" src={ASSETS_BASE_URL + "/img/csh-back.svg"} style={{ width: '30px' }} />
        }
    }

    formatDate(ts) {
        return new Date(ts).toDateString()
    }

    getTxMessage(data) {
        let { type, action, product_id } = data
        switch (action) {
            case 0: {
                return "Cancellation amount Credited to wallet"
            }
            case 1: {
                return "Added money to wallet"
            }
            case 2: {
                return "Amount refunded to the payment source"
            }
            case 3: {
                return `Paid for ${PRODUCT[product_id]} appointment`
            }
            case 4: {
                return "Refund for rescheduled appointment"
            }
            case 5: {
                return "Cashback credited for appointment"
            }
        }
    }

    render() {
        let { type, action, amount, created_at, reference_id, product_id } = this.props.data

        return (
            <div className="cash-all-transaction">
                <h5 className="csh-heading-bg">{this.formatDate(created_at)}</h5>
                <div className="csh-trns-data">
                    <div className="csh-content-with-img">
                        {this.getImageTag(this.props.data)}
                        <div className="csh-booking-id-content">
                            <p>{this.getTxMessage(this.props.data)}</p>
                            {
                                reference_id ? <span>Booking id : {reference_id}</span> : ""
                            }
                        </div>
                    </div>
                    {this.getAmountTag(this.props.data)}
                </div>
            </div>
        )
    }

}

export default Transactions