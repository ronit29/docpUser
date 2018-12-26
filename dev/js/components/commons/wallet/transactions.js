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

const SOURCE_FROM = {
    1: '',
    2: 'from Promotional Balance'
}

const SOURCE_TO = {
    1: '',
    2: 'to Promotional Balance'
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
        let { type, action, product_id, source } = data
        if (!source) {
            source = 1
        }

        switch (action) {
            case 0: {
                return `Refund for ${PRODUCT[product_id]} Appointment ${SOURCE_TO[source]}`
            }
            case 1: {
                return "Added Money to Wallet"
            }
            case 2: {
                return "Amount Refunded to Payment Source"
            }
            case 3: {
                return `Paid for ${PRODUCT[product_id]} Appointment ${SOURCE_FROM[source]}`
            }
            case 4: {
                return "Refund for rescheduled appointment"
            }
            case 5: {
                return `Cashback Received for ${PRODUCT[product_id]} Appointment`
            }
        }
    }

    openAppointment(type, id) {
        if (id) {
            if (PRODUCT[type] == 'Doctor') {
                this.props.history.push(`/opd/appointment/${id}`)
            } else {
                this.props.history.push(`/lab/appointment/${id}`)
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
                                reference_id ? <span onClick={this.openAppointment.bind(this, product_id, reference_id)}>Booking id : {reference_id}</span> : ""
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