import React from 'react';
import CONFIG from '../../../config'


class PaymentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        let data = { "paymentMode": "CC", "responseCode": "227", "bankTxId": "", "txDate": "Jun 4, 2018 12:10:23 PM", "bankName": "SBI", "statusMsg": "Oops an error occurred. We will get back to you!", "currency": "INR", "statusCode": 1, "pgGatewayName": "MOCK", "responseMessage": "Your payment has been declined by your bank. Please contact your bank for any queries. If money has been deducted from your account, your bank will inform us within 48 hrs and we will refund the same", "txStatus": "TXN_FAILURE", "customerId": 51, "orderNo": 126, "statusShortMsg": "Others", "pgTxId": "70000926367", "email": "dummy_appointment@policybazaar.com", "pbGatewayName": "paytm", "mobile": "9999999997", appointmentId: this.props.paymentData['appointmentId'], productId: this.props.paymentData['productId'] }

        data = btoa(JSON.stringify(data))
        
        return (
            <div>

                {/* <form id="paymentForm" ref="paymentForm" method="post" action="https://pgdev.policybazaar.com/dp/pay/init" style={{ visibility: 'hidden' }}>
                    <input type="text" name="name" value={this.props.paymentData['name']} />
                    <input type="text" name="custId" value={this.props.paymentData['custId']} />
                    <input type="text" name="mobile" value={this.props.paymentData['mobile']} />
                    <input type="text" name="email" value={this.props.paymentData['email']} />
                    <input type="text" name="productId" value={this.props.paymentData['productId']} />
                    <input type="text" name="surl" value={this.props.paymentData['surl']} />
                    <input type="text" name="furl" value={this.props.paymentData['furl']} />
                    <input type="text" name="appointmentId" value={this.props.paymentData['appointmentId']} />
                    <input type="text" name="txAmount" value={this.props.paymentData['txAmount']} />
                </form> */}


                <form id="paymentForm" ref="paymentForm" method="post" action={ `${CONFIG.API_BASE_URL}/api/v1/user/transaction/save` } style={{ visibility: 'hidden' }}>
                    <input type="text" name="response" value={data} />
                </form>

            </div>
        );
    }
}


export default PaymentForm
