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
				<div className="search-el-popup">
					<div className="widget">
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
				</div>
			</div>
		)
	}
}

export default BookingConfirmationPopup