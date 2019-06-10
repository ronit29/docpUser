import React from 'react'

class IpdOffers extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			showTnc: false
		}
	}

	toggleTnC(id) {

		if (this.state.showTnc && document.getElementById(id)) {
			let height = document.getElementById(id).offsetHeight || 0
			window.scrollTo(0, height)
		}
		this.setState({ showTnc: !this.state.showTnc })

	}

	render() {

		return (
			<div className="hs-card">
				<div className="ipd-ofr-cont">
					<div className="widget-content">
						<h4 className="hs-ofr-heading"><img src={ASSETS_BASE_URL + '/img/ipd-ofr.svg'} />Offers Available</h4>
						{
							this.props.offers.map((offer, i) => {
								return <div className="ipd-ofr-main" id={`${i}_offer`} key={i}>
									<div className="hs-offerCard">
										<div className="hs-ofr-crdHeading">
											<div className="hs-ofr-contnn">
												<img src={ASSETS_BASE_URL + '/img/ipd-cpn.svg'} />
												<p>
													{
														offer.hospital ? <span className="offr-grn-cd">{offer.hospital}</span> : ''
													}
													{offer.title}
												</p>
											</div>

											{/*<img src={ASSETS_BASE_URL + '/img/ipd-share.svg'} />*/}
										</div>
										<div className="hs-ofr-card-content">

											{
												offer.coupon ?
													<div className="cpn-rqrd">
														<p>User Promo code :  <span>{offer.coupon}</span></p>
													</div>
													: ''
											}
											<p>{offer.description}</p>
											{
												!offer.coupon ?
													<p className="no-cpn-rqrd">No Coupon Required</p>
													: ''
											}
										</div>

										{
											offer.show_tnc && this.state.showTnc ?
												<div className="offer-hide-content">
													<div className="custom-li-style" dangerouslySetInnerHTML={{ __html: offer.tnc }}>
													</div>
												</div>
												: ''
										}

										{
											offer.show_tnc ?
												<div className="hs-offer-footer">
													<p className="tc_cont">T&C Apply</p>
													{
														this.state.showTnc ?
															<p className="show-hide-offr cursor-pntr" onClick={this.toggleTnC.bind(this, `${i}_offer`)} >Hide Details <img className="offshowIcon ofhideIcon " style={{ width: '7px', marginLeft: '5px' }} src={ASSETS_BASE_URL + '/img/right-sc.svg'} /></p>
															: <p className="show-hide-offr cursor-pntr" onClick={this.toggleTnC.bind(this, `${i}_offer`)} >Show Details <img className="" style={{ width: '7px', marginLeft: '5px' }} src={ASSETS_BASE_URL + '/img/right-sc.svg'} /></p>
													}
												</div>
												: ''
										}

									</div>
								</div>

							})
						}

						{/*<p className="ofr-vw-more">View 6 more offers</p>*/}
					</div>
				</div>
			</div>
		)
	}
}

export default IpdOffers