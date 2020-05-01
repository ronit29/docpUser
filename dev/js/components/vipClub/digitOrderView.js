import React from 'react'

class DigitOrderView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {

        return (
            <div className="widget mrb-10">
            <div className="ins-card-head">
                <div className="ins-name-head-div d-flex align-items-start digit-logo">
                    <img className="img-fluid " width="60" src="https://www.reinsurancene.ws/wp-content/uploads/2019/03/digit-insurance-logo.jpg" />
                    <p className="fw-500 mrt-10">
                        Digit Covid Group insurance<br/>
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
                        <span>11th Oct 2020</span>
                    </div>
                    <div className="ins-policy-details">
                        <p>Valid Upto</p>
                        <span>11th Oct 2021</span>
                    </div>
                </div>
                <div className="ins-policy-members-details mt-20">
                    <p><span>Premium</span> : Rs 2000</p>
                    <p style={{ 'textTransform': 'capitalize' }}><span>Proposer Name </span> : Mayank Yadav</p>
                    <p><span>Policy Number</span> : DIDIG22926765</p>
                    <p><span>Cover</span> : 4 'Members'</p>
                    <ul>
                        <li style={{ 'textTransform': 'capitalize' }}>
                            <span className="insa-tbl-names"> Maddy: </span>
                            <span className="insa-sub-tbl-names"> Shady</span>
                            <span className="insa-sub-tbl-names"> TestIng</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
                );
            }
        }

export default DigitOrderView