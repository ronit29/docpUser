import React from 'react'

class IpdOffers extends React.Component {

	render(){

		return(
			<div className="hs-card">
				<div className="ipd-ofr-cont">
					<div className="widget-content">
					<h4 className="hs-ofr-heading"><img src={ASSETS_BASE_URL + '/img/ipd-ofr.svg'} />Offers Available</h4>
						<div className="ipd-ofr-main">
							<div className="hs-offerCard">
								<div className="hs-ofr-crdHeading">
									<p><img src={ASSETS_BASE_URL + '/img/ipd-cpn.svg'} />₹51000 OFF on Maternity</p>
									<img src={ASSETS_BASE_URL + '/img/ipd-share.svg'} />
								</div>
								<div className="hs-ofr-card-content">
									<div className="cpn-rqrd">
										<p>User Promo code :  <span>DOC50</span></p>
									</div>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit
						</p>
									<p className="no-cpn-rqrd">No Coupon Required</p>
								</div>
								<div className="offer-hide-content">
									<ul>
										<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</li>
										<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</li>
										<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</li>
									</ul>
								</div>
								<div className="hs-offer-footer">
									<p className="tc_cont">T&C Apply</p>
									<p className="show-hide-offr">Hide Details <img className="offshowIcon ofhideIcon " style={{ width: '7px', marginLeft: '5px' }} src={ASSETS_BASE_URL + '/img/right-sc.svg'} /></p>
								</div>
							</div>
						</div>
						<p className="ofr-vw-more">View 6 more offers</p>
					</div>
				</div>
			</div>
			)
	}
}

export default IpdOffers