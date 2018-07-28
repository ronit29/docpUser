import React from 'react';

export default ({ toggle, old_deal_price, deal_price, mrp, payable_amount }) => {
    return <div>
        <div className="cancel-overlay" onClick={toggle}></div>
        <div className="widget cancel-appointment-div">
            <div className="widget-header text-center action-screen-header">
                <p className="fw-500 cancel-appointment-head">Payment Summary</p>
                <hr />
            </div>
            <div className="payment-content-div">
                <p className="payment-content">Doctor Fees</p>
                <p className="payment-content fw-500">&#8377; {mrp}</p>
            </div>
            <div className="payment-content-div">
                <p className="payment-content">Docprime Discount</p>
                <p className="payment-content fw-500">&#8377; {mrp - deal_price}</p>
            </div>
            <div className="payment-content-div">
                <p className="payment-content fw-500">Subtotal</p>
                <p className="payment-content fw-500">&#8377; {deal_price}</p>
            </div>
            <div className="payment-content-div">
                <p className="payment-content fw-500">Previous Adjustments</p>
                <p className="payment-content fw-500">&#8377; {old_deal_price}</p>
            </div>
            <div className="payment-content-div">
                <p className="payment-content fw-500">Amount Payable</p>
                <p className="payment-content fw-500">&#8377; {payable_amount}</p>
            </div>
            <div className="payment-content-btn text-center">
                <button className="fw-500" onClick={toggle}>Done</button>
            </div>
        </div>
    </div>
}