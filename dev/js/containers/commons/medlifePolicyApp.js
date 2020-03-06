import React from 'react'
import { connect } from 'react-redux'
import { } from '../../actions/index.js'
import STORAGE from '../../helpers/storage';
import HelmetTags from '../../components/commons/HelmetTags'
const queryString = require('query-string');
import Disclaimer from '../../components/commons/Home/staticDisclaimer.js'

class medlifePolicyApp extends React.Component {
	
	render() {

		return ( 
			<div className="container about-container p-3">
                <HelmetTags tagsData={{
                    title: ('Cancel Policy | docprime'),
                    description: ('docprime: docprime is one stop health care solution for patients and doctors. Patients can book doctors online and doctors can manage patients online.')
                }} />
                <div className="row">
                    <div className="col-12">
                        <div>
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
                <Disclaimer />
            </div>
		)
	}
}

const mapStateToProps = (state, passedProps) => {

	return {
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(medlifePolicyApp)