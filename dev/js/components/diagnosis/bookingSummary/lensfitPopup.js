import React from 'react'

class BookingConfirmationPopup extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			
		}
	}

	render() {
		return (
		<div className="search-el-popup-overlay d-none" >
			<div className="search-el-popup">
				<div className="widget">
					<div className="widget-content padiing-srch-el">
						<p className="srch-el-conent">Do you wish to continue?</p>
						<div className="search-el-btn-container">
							{/* <button onClick={this.props.priceConfirmationPopup.bind(this, true)}>Yes</button> */}
						</div>
					</div>
				</div>

			</div>
		</div>)
	}
}

export default BookingConfirmationPopup    