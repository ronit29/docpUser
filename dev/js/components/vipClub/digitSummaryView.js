import React from 'react'

class DigitSummaryView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        let fullName = this.props.selfdata.title+ ' ' + this.props.selfdata.name + ' ' +this.props.selfdata.middle_name+ ' ' +this.props.selfdata.last_name;
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
                            <p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/nw-usr.svg'} /><span>{fullName}</span></p>
                            <p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/calendar-01.svg'} /><span>{this.props.selfdata.dob}</span></p>
                            <p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/mail-01.svg'} /><span>{this.props.selfdata.email}</span></p>
                            <p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/customer-icons/call.svg'} /><span>{this.props.selfdata.phone_number}</span></p>
                            <p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/location-01.svg'} /><span>{this.props.selfdata.pincode}</span></p>
                            <p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/customer-icons/location-colored.svg'} /><span>{this.props.selfdata.address}</span></p>
                            <p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/nw-usr.svg'} /><span>{this.props.selfdata.nominee_name}</span></p>
                            <p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/nw-usr.svg'} /><span>{this.props.selfdata.nominee_relation}</span></p>
                        </div>
                    </div>
                </div>
                <div className="widget mrb-10">
                    <div className="widget-header text-center action-screen-header">
                        <p className="fw-500 cancel-appointment-head">Confirm Payment</p>
                        <hr />
                    </div>
                    <div className="payment-content-div">
                        <p className="payment-content fw-500">Plan Name</p>
                        <p className="payment-content fw-500">{this.props.plandata.name}</p>
                    </div>
                    <div className="payment-content-div">
                        <p className="payment-content fw-500">Premium Amount</p>
                        <p className="payment-content fw-500">&#8377; {this.props.plandata.amount}</p>
                    </div>
                    <div className="payment-content-div">
                        <p className="payment-content fw-500">GST</p>
                        <p className="payment-content fw-500"> 18%</p>
                    </div>
                    {/* <div className="payment-content-div">
                        <p className="payment-content fw-500">Policy StartDate</p>
                        <p className="payment-content fw-500">--/--/--</p>
                    </div> */}
                    <div className="payment-content-div">
                        <p className="payment-content fw-500">Amount Payable</p>
                        <p className="payment-content fw-500">&#8377;  {this.props.plandata.final_amount}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default DigitSummaryView;