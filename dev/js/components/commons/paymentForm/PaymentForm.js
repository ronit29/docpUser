import React from 'react';

class PaymentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {

        return (
            <div>

                <form id="paymentForm" ref="paymentForm" method="post" action="https://pgdev.policybazaar.com/dp/pay/init" style={{ visibility: 'hidden' }}>
                    {/* <input type="text" name="name" value="aurn" />
                    <input type="text" name="custId" value="11" />
                    <input type="text" name="mobile" value="5555555555" />
                    <input type="text" name="email" value="abc@abc.com" />
                    <input type="text" name="productId" value="1" />
                    <input type="text" name="surl" value="https://qa.panaceatechno.com/dx/" />
                    <input type="text" name="furl" value="https://qa.panaceatechno.com/opd/" />
                    <input type="text" name="appointmentId" value="242342341" />
                    <input type="text" name="txAmount" value="400" /> */}

                    <input type="text" name="name" value={this.props.paymentData['name']} />
                    <input type="text" name="custId" value={this.props.paymentData['custId']} />
                    <input type="text" name="mobile" value={this.props.paymentData['mobile']} />
                    <input type="text" name="email" value={this.props.paymentData['email']} />
                    <input type="text" name="productId" value={this.props.paymentData['productId']} />
                    <input type="text" name="surl" value={this.props.paymentData['surl']} />
                    <input type="text" name="furl" value={this.props.paymentData['furl']} />
                    <input type="text" name="appointmentId" value={this.props.paymentData['appointmentId']} />
                    <input type="text" name="txAmount" value={this.props.paymentData['txAmount']} />

                </form>

            </div>
        );
    }
}


export default PaymentForm
