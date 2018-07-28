import React from 'react';

export default ({ toggle, finalPrice, finalMrp }) => {
    return <div>
        <div className="cancel-overlay" onClick={toggle}></div>
        <div className="widget cancel-appointment-div payment-popup">
            <div className="widget-header text-center action-screen-header">
                <p className="fw-500 cancel-appointment-head">Payment Summary</p>
                <hr />
            </div>
            <div className="payment-content-div">
                <p className="payment-content">Lab Fees</p>
                <p className="payment-content fw-500">&#8377; {finalMrp}</p>
            </div>
            <div className="payment-content-div">
                <p className="payment-content">Docprime Discount</p>
                <p className="payment-content fw-500">&#8377; {finalMrp - finalPrice}</p>
            </div>
            <div className="payment-content-div">
                <p className="payment-content fw-500">Subtotal</p>
                <p className="payment-content fw-500">&#8377; {finalPrice}</p>
            </div>
            {/* <div className="payment-content-div">
                <p className="payment-content fw-500">Promocode Discount</p>
                <p className="payment-content fw-500">&#8377; 200</p>
            </div> */}
            <div className="payment-content-div">
                <p className="payment-content fw-500">Amount Payable</p>
                <p className="payment-content fw-500">&#8377; {finalPrice}</p>
            </div>
            <div className="payment-content-btn text-center">
                <button className="fw-500" onClick={toggle}>Done</button>
            </div>
        </div>
    </div>
}