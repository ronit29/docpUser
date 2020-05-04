import React from 'react'

class DigitOrderView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        let fullName = '';
        if(this.props.orderdata){
            let memberData = this.props.orderdata.member_details[0];
            if (memberData){
                fullName = memberData.first_name + ' ' + memberData.middle_name + ' ' + memberData.last_name
            }
        }
        return (
            this.props.orderdata?
            <div className="widget mrb-10">
            <div className="ins-card-head">
                <div className="ins-name-head-div d-flex align-items-start digit-logo">
                    <img className="img-fluid " width="60" src={ASSETS_BASE_URL + '/img/digit-insurance-logo.jpg'} />
                    <p className="fw-500 mrt-10">
                    Protect Against Coronavirus under Digit group Illness policy<br/>
                        <span className="ins-active-container">
                            <p>Active <img src={ASSETS_BASE_URL + "/img/chk-green.svg"} /></p>
                        </span>
                        </p>
                </div>
            </div>
            <div className="ins-policy-date">
                <div className="details-flex-cont">
                    <div className="ins-policy-details">
                        <p>Policy Purchase Date</p>
                        <span>{this.props.orderdata.purchase_date}</span>
                    </div>
                    <div className="ins-policy-details">
                        <p>Policy Start Date</p>
                        <span>{this.props.orderdata.policystart_date}</span>
                    </div>
                    <div className="ins-policy-details">
                        <p>Valid Upto</p>
                        {/* <span>11th Oct 2021</span> */}
                        <span>{this.props.orderdata.expiry_date}</span>
                    </div>
                </div>
                <div className="ins-policy-members-details mt-20">
                    <p><span>Premium</span> : Rs {this.props.orderdata.amount}</p>
                    <p style={{ 'textTransform': 'capitalize' }}><span>Proposer Name </span> : {fullName}</p>
                    <p><span>Policy Number</span> : "Congratulations on Securing your health! Your Policy Copy Will be shared to your registered email within 24 hours!"</p>
                    <p><span>Cover</span> : 1 'Member(s)'</p>
                    <ul>
                        <li style={{ 'textTransform': 'capitalize' }}>
                            <span className="insa-tbl-names"> {fullName} </span>
                            {/* <span className="insa-sub-tbl-names"> Shady</span>
                            <span className="insa-sub-tbl-names"> TestIng</span> */}
                        </li>
                    </ul>
                </div>
            </div>
        </div>:<div></div>
                );
            }
        }

export default DigitOrderView