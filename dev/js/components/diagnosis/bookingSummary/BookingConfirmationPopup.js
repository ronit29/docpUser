import React from 'react'

class BookingConfirmationPopup extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	render() {
		return (
			<div className="search-el-popup-overlay">
				<div className="search-el-popup vip-srch-pop-min">
					<div className="widget d-none">
						<div className="widget-content padiing-srch-el">
							{
								this.props.iFramePopup ?
									<React.Fragment>
										{/* <div className="close-popup-btn" onClick={() => this.props.hidePopup()}>
											<img src={ASSETS_BASE_URL + "/img/icons/close.png"} className="img-fluid" />
										</div> */}
										{/* <p className="srch-el-conent fw-700">Information</p> */}
										<p className="mrt-20 text-center fw-500">We are redirecting you to PharmEasy website in 3 seconds...</p>
										{/* <div className="search-el-btn-container" style={{ paddingBottom: 0 }}>
											<button onClick={() => this.props.continueClick()}>Continue</button>
										</div> */}
									</React.Fragment>
									:
									<React.Fragment>
										<p className="srch-el-conent">Do you wish to continue?</p>
										<div className="search-el-btn-container">
											<button onClick={this.props.priceConfirmationPopup.bind(this, true)}>Yes</button>
											{/* <span className="src-el-btn-border"></span> */}
											<button onClick={this.props.priceConfirmationPopup.bind(this, false)}>No</button>
										</div>
									</React.Fragment>
							}
						</div>
					</div>

					{/* vip banner container */}
					<div className="vip-banner-container">
						<div className="vip-banner">
							<img className="img-fluid vp-cls-img" src={ASSETS_BASE_URL + '/img/vip-pop-cls.svg'} />
							<img className="img-fluid vp-bnr-img" src={ASSETS_BASE_URL + '/img/vip-img-pop.png'} />
							<div className="pop-bnr-txt">
								<p className="vp-bnr-know-txt">Know more about Docprime VIP</p>
								<p className="vp-bnr-sub-txt">Not Interested? Continue Booking <img style={{width:'7px'}} className="img-fluid" src={ASSETS_BASE_URL + '/img/vip-rght.svg'} /></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default BookingConfirmationPopup