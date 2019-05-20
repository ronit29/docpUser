import React from 'react'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import ChatPanel from '../../components/commons/ChatPanel'
import Loader from '../commons/Loader'

class InsuranceCancellationView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showCancelPopup: false,
			showCancelSection: true
		}
	}

	getGetOrdinal(n) {
		var s = ["th", "st", "nd", "rd"],
			v = n % 100;
		return n + (s[(v - 20) % 10] || s[v] || s[0]);
	}

	cancelPolicy() {
		this.setState({ showCancelPopup: true })
	}

	clickPopUp(type) {
		if (type == 1) {
			this.props.history.push('/insurance/canceldetails')
			// this.props.cancelInsurance(resp => {
			// 	if (resp.success) {
			// 		this.setState({ showCancelPopup: false, showCancelSection:false })
			// 	} else {
			// 		this.setState({ showCancelPopup: false })
			// 	}
			// })
		} else {
			this.setState({ showCancelPopup: false })
		}
	}

	render() {
		return <div className="profile-body-wrap" style={{ paddingBottom: 80 }} >
			<ProfileHeader />
			<section className="container parent-section book-appointment-section container-top-margin">
				<div className="row main-row parent-section-row">
					<div className="col-12 col-md-7 col-lg-7">
						<section className="profile-book-screen">
							<div className="widget">
								<div className="widget-content">
									<h1 className="ins-cancl-heading">We need bank account details to proceed with your cancellation</h1>
									<div className="ins-cancl-container">
										<input className="ins-cn-inp" type="text" placeholder="Account Holder Name" />
										<input className="ins-cn-inp" type="text" placeholder="Bank Name" />
										<textarea className="ins-cn-textarea" placeholder="Address"></textarea>
										<input className="ins-cn-inp" type="number" placeholder="Account Number" />
										<input className="ins-cn-inp" type="text" placeholder="IFSC Code" />
									</div>
									<p className="ins-cancl-para">We need to confirm if this account belongs to you. Please fill more details below </p>
									<button className="ins-cn-btn"><img src={ASSETS_BASE_URL + '/img/upld.png'} />Upload Cancelled Cheque</button>
									<p className="ins-cancl-para">OR</p>
									<button className="ins-cn-btn"><img src={ASSETS_BASE_URL + '/img/upld.png'} />Upload Account Statement</button>
								</div>
							</div>
						</section>
					</div>
					<ChatPanel />
				</div>
			</section>
		</div>

	}
}

export default InsuranceCancellationView    