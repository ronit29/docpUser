import React from 'react'
import GTM from '../../../helpers/gtm.js'

class BookingConfirmationPopup extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	render() {
		let pathName = this.props.location.pathname
		let searchParam = this.props.location.search
		let callBackUrl = pathName + searchParam
		return (
			<div className="search-el-popup-overlay" >
				<div className="search-el-popup">
					<div className="widget">
						<div className="lnst-fit-pop-bg">
							<p>Get a Free Eyewear with <br />this appointment</p>
							<div className="by-lansfit">
								<span>by</span>
								<img className="lnsfit-pop-ico" src={ASSETS_BASE_URL + "/img/lensico.png"} />
							</div>
						</div>
						<div className="lnst-fit-sub-pop">
							<p className="lns-para-mn">“FREE PAIR OF EYE GLASSES <br/>(Frame + Lens) or Sunglasses</p>
							<p className="lnsft-cpn">Use Coupon: LENSFIT</p>
							<p className="lns-know" onClick={(e) => {
								e.preventDefault()
								e.stopPropagation()
								let data = {
					                'Category': 'ConsumerApp', 'Action': 'LensFitKnowMore', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lensfit-knowmore-clicked'
					            }

					            GTM.sendEvent({ data: data })
								this.props.history.push('/lensfit-tnc?callbackurl='+callBackUrl+'&isLensfitSpecific=true')
								}}>Know more</p>
						</div>
						<div className="lnsfit-btn-container">
							<button onClick={this.props.closeLensFitPopup.bind(this)}>I Don’t want</button>
							<button onClick={this.props.applyLensFitCoupons.bind(this,this.props.isOPD?this.props.deal_price:0,this.props.lensfit_coupons)}>Apply LENSFIT</button>
						</div>
					</div>

				</div>
			</div>)
	
	}
}

export default BookingConfirmationPopup    