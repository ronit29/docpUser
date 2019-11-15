import React from 'react';

export default ({ toggle,props,is_insurance_applicable }) => {
    return <div>
        <div className="cancel-overlay cancel-overlay-zindex" onClick={toggle}></div>
        <div className="widget cancel-appointment-div cancel-popup">
            <div className="widget-header text-center action-screen-header" style={{ position: 'relative' }} >
                <p className="fw-500 cancel-appointment-head">Terms &amp; Conditions</p>
                <img src={ASSETS_BASE_URL + "/img/icons/close.png"} className="close-modal" onClick={toggle} />
                <hr />
            </div>
            <div className="tnc-column">
                {/*<p className="fw-500">For any online paid appointments, you can cancel your scheduled or re-booked appointment and initiate immediate refund at any time. An immediate refund shall be subject to terms and conditions as described under this section mentioned below.

                    In the event, the services are not availed at the appointed date and time and our systems do not validate the URN generated on your registered mobile number, we will automatically cancel your appointment at 12:00 midnight of next date of your appointment date.

                    Occasionally, appointments may be cancelled or postponed by the Third Party Service Provider. Should this occur, we will attempt to contact or inform you and you may re-schedule your appointment as per your convenience or visit www.docprime.com for fresh/re-booking on the Website.

                    Cancellation through mail or call center is allowed for all the bookings until the time of appointment or 12:00 midnight of next date of your appointment date. In such cases, we will initiate an immediate refund of your money as per the process defined under Refund, Rescheduling and Cancellation section under the End User Agreement. 
                    <u style={{color: '#f78631',cursor:'pointer',display:'inline-block'}} onClick={() =>props.history.push('/terms?forBookingScroll=true')}>click here</u>
                </p>*/}
                {/* <ul className="booking-cancel">
                    
                </ul> */}
                {/* <ul className="qa-column">
                    <li className="mb-24">
                        <span><strong>What are the benefits of being a gold member?</strong></span><br/>
                        <span>You can avail exclusive discounts on Doctor and Lab test appointments for the covered members in the plan. Additionally, you can get upto 23% discount on prescribed medicines on Medlife.com. The membership will last till the duration of the plan.</span>
                    </li>
                    <li className="mb-24">
                        <span><strong>How I can avail discounts on medicines?</strong></span><br/>
                        <span>You can visit <a href="https://www.medlife.com/">https://www.medlife.com/</a> website or mobile application and use the exclusive coupon code provided to you once you become a gold member. You can get upto 23% discount on prescription drugs. Promo code can be used multiple times for 1 year without any minimum order value. </span>
                    </li>
                </ul> */}
                <h3 className="mb-24"><strong>Medlife TnC</strong></h3>
                <h5><strong>Offer Terms:</strong></h5>
                <ul className="offer-terms-column">
                    <li>Save Up to 23% on all prescribed medicines exclusively for <strong>Docprime Gold / VIP users</strong></li>
                    <li>No minimum order value required to avail discount.</li>
                    <li>Visit <a href="http://bit.ly/2NXLR5u">http://bit.ly/2NXLR5u</a></li>
                    <li>Upload prescription &amp; select medicines.</li>
                    <li>Enter promo in the order checkout page. Complete payment via any mode. **Promo not applicable on OTC products</li>
                </ul>
                <h5><strong>T&amp;C Pharmacy: </strong></h5>
                <ul className="offer-terms-column">
                    <li>Offer Valid on Prescription Drugs</li>
                    <li>Promo code can be used Multiple times during the offer period. Customers can avail this promo code by calling customer support (1860-1234-1234) or by booking online through landing page link. </li>
                    <li>
                        <span>Discount on Selected Products: Discounts provided on the website/mobile application are on selected products. Discounts are not applicable on the following products and on any products so mentioned elsewhere on the website/mobile application:</span>
                        <ul className="child-list-item pd-12">
                            <li>All Baby foods viz Ceralac, Lactogen, Nanpro etc.</li>
                            <li>All Health Supplements viz Pediasure, Proteinex, Proteinules, Threptin etc</li>
                            <li>Over the counter (OTC) products – Benadryl Cough Syrup, Crocin, Saridon, all Dettol, Savlon products, medicated soaps etc.</li>
                            <li>All Cosmetic products</li>
                        </ul>
                    </li>
                    <li>Offer Validity – 1 year </li>
                </ul>
            </div>
        </div>
    </div>
}