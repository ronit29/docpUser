import React from 'react'

class DigitSummaryView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {

        return (
            <div>
                <div className="widget mrb-10">
                    <div className="widget-content">
                        <div className="sub-form-input-data">
                            <div>
                                <p className="sub-form-hed">Self</p>
                            </div>
                        </div>
                        <div className="dlts-cnt">
                            <p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/nw-usr.svg'} /><span>Mr. Mayank Yadav</span></p>
                            <p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/calendar-01.svg'} /><span>09/02/1990</span></p>
                            <p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/mail-01.svg'} /><span>mayank@gmail.com</span></p>
                            <p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/customer-icons/call.svg'} /><span>8800327006</span></p>
                            <p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/location-01.svg'} /><span>110092</span></p>
                            <p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/customer-icons/location-colored.svg'} /><span>B11/1 Vinod nagar West Delhi</span></p>
                            <p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/nw-usr.svg'} /><span>Nominee Name</span></p>
                            <p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/nw-usr.svg'} /><span>Brother</span></p>
                        </div>
                    </div>
                </div>
                <div className="widget mrb-10">
                    <div className="widget-header text-center action-screen-header">
                        <p className="fw-500 cancel-appointment-head">Confirm Payment</p>
                        <hr />
                    </div>
                    <div className="payment-content-div">
                        <p className="payment-content fw-500">Premium Amount</p>
                        <p className="payment-content fw-500">&#8377; 0,0</p>
                    </div>
                    <div className="payment-content-div">
                        <p className="payment-content fw-500">GST</p>
                        <p className="payment-content fw-500">&#8377; 0,0</p>
                    </div>
                    <div className="payment-content-div">
                        <p className="payment-content fw-500">Policy StartDate</p>
                        <p className="payment-content fw-500">--/--/--</p>
                    </div>
                    <div className="payment-content-div">
                        <p className="payment-content fw-500">Amount Payable</p>
                        <p className="payment-content fw-500">&#8377; 400</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default DigitSummaryView;