import React from 'react';
import CONFIG from '../../../config'
import GTM from '../../../helpers/gtm.js'


class PaymentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    
    sendEvent() {
        let refs = this.props.refs
        if (refs) {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'ContinueClicked', 'pageSource': refs, 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'continue-clicked'
            }
            GTM.sendEvent({ data: data })
        } else {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'ContinueClicked', 'pageSource': 'UNKNOWN', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'continue-clicked'
            }
            GTM.sendEvent({ data: data })
        }
    }

    componentDidMount() {
        this.sendEvent()
    }

    render() {

        // let data = { "paymentMode": "CC", "responseCode": "227", "bankTxId": "", "txDate": "Jun 4, 2018 12:10:23 PM", "bankName": "SBI", "statusMsg": "Oops an error occurred. We will get back to you!", "currency": "INR", "statusCode": 1, "pgGatewayName": "MOCK", "responseMessage": "Your payment has been declined by your bank. Please contact your bank for any queries. If money has been deducted from your account, your bank will inform us within 48 hrs and we will refund the same", "txStatus": "TXN_FAILURE", "customerId": 51, "orderNo": this.props.paymentData['orderId'], "statusShortMsg": "Others", "email": "dummy_appointment@policybazaar.com", "pbGatewayName": "paytm", "mobile": "9999999997", productId: this.props.paymentData['productId'] }

        // if (this.props.paymentData['referenceId']) {
        //     data['referenceId'] = this.props.paymentData['referenceId']
        // }

        // data['pgTxId'] = this.props.paymentData['orderId']
        // data = btoa(JSON.stringify(data))

        return (
            <div>

                <form id="paymentForm" ref="paymentForm" method="post" action={CONFIG.PG_URL} style={{ display: 'none' }}>
                    <input type="text" name="name" defaultValue={this.props.paymentData['name']} />
                    <input type="text" name="custId" defaultValue={this.props.paymentData['custId']} />
                    <input type="text" name="mobile" defaultValue={this.props.paymentData['mobile']} />
                    <input type="text" name="email" defaultValue={this.props.paymentData['email']} />
                    <input type="text" name="productId" defaultValue={this.props.paymentData['productId']} />
                    <input type="text" name="surl" defaultValue={this.props.paymentData['surl']} />
                    <input type="text" name="furl" defaultValue={this.props.paymentData['furl']} />
                    {
                        this.props.paymentData && this.props.paymentData['referenceId']?
                        <input type="text" name="referenceId" defaultValue={this.props.paymentData['referenceId']} />
                        :''
                    }
                    <input type="text" name="txAmount" defaultValue={this.props.paymentData['txAmount']} />
                    <input type="text" name="orderId" defaultValue={this.props.paymentData['orderId']} />
                    <input type="text" name="hash" defaultValue={this.props.paymentData['hash']} />
                    <input type="text" name="holdPayment" defaultValue={this.props.paymentData['holdPayment']} />
                    <input type="text" name="isPreAuth" defaultValue={this.props.paymentData['isPreAuth']} />
                    {
                        this.props.paymentData && this.props.paymentData['paytmMsg']?
                        <input type="text" name="paytmMsg" defaultValue={this.props.paymentData['paytmMsg']} />
                        :''
                    }
                    {
                        this.props.paymentData && this.props.paymentData['couponCode'] ?
                        <React.Fragment>
                            <input type="text" name="couponCode" defaultValue={this.props.paymentData['couponCode']} />
                            <input type="text" name="discountedAmnt" defaultValue={this.props.paymentData['discountedAmnt']} />
                            <input type="text" name="couponPgMode" defaultValue={this.props.paymentData['couponPgMode']} />
                        </React.Fragment>
                        : ''
                    }
                    {
                        this.props.paymentData && this.props.paymentData['insurerCode']?
                        <input type="text" name="insurerCode" defaultValue={this.props.paymentData['insurerCode']} />
                        :''
                    }
                    {
                        this.props.paymentData && this.props.paymentData['merchCode']?
                        <input type="text" name="merchCode" defaultValue={this.props.paymentData['merchCode']} />
                        :''
                    }
                    
                </form>


                {/* <form id="paymentForm" ref="paymentForm" method="post" action={`${CONFIG.API_BASE_URL}/api/v1/user/transaction/save`} style={{ visibility: 'hidden' }}>
                    <input type="text" name="response" defaultValue={data} />
                </form> */}

            </div>
        );
    }
}


export default PaymentForm
