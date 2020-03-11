import React from 'react';

export default ({ toggle,props,is_insurance_applicable }) => {
    return <div>
        <div className="cancel-overlay cancel-overlay-zindex" onClick={toggle}></div>
        <div className="widget cancel-appointment-div cancel-popup no-overflow">
            <div className="widget-header tnc-header text-center action-screen-header">
                <p className="fw-500 cancel-appointment-head">Terms &amp; Conditions</p>
                <img src={ASSETS_BASE_URL + "/img/icons/close.png"} className="close-modal" onClick={toggle} />
                <hr />
            </div>
            <div className="tnc-column">
                <h3 className="mb-24"><strong>Medlife TnC</strong></h3>
                <h5><strong>Offer Terms:</strong></h5>
                <ul className="offer-terms-column">
                    <li>Save 23% on all prescribed medicines exclusively for <strong>Docprime Gold / VIP users</strong></li>
                    <li>No minimum order value required to avail discount.</li>
                    <li>Visit <a href="https://www.medlife.com/">Medlife.com</a></li>
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