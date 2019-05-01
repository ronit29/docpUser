import React from 'react'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import ChatPanel from '../../components/commons/ChatPanel'
import Loader from '../commons/Loader'

class InsuranceCancellationView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showCancelPopup: false,
			showCancelSection:true
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
			this.props.cancelInsurance(resp => {
				if (resp.success) {
					this.setState({ showCancelPopup: false, showCancelSection:false })
				} else {
					this.setState({ showCancelPopup: false })
				}
			})
		} else {
			this.setState({ showCancelPopup: false })
		}
	}

	render() {
		if (this.props.data) {
			var purchase_date = new Date(this.props.data.purchase_date)
			let purchase_time = purchase_date.toTimeString()
			let purchaseTime = purchase_time.split(" ")
			purchase_date = purchase_date.toDateString()
			let purchaseDate = purchase_date.split(" ")
			let expiry_date = new Date(this.props.data.expiry_date)
			let expiry_time = expiry_date.toTimeString()
			let expiryTime = expiry_time.split(" ")
			expiry_date = expiry_date.toDateString()
			let expiryDate = expiry_date.split(" ")
			return <div className="profile-body-wrap" style={{ paddingBottom: 80 }} >
				<ProfileHeader />
				{this.state.showCancelPopup ?
					<div className="search-el-popup-overlay " >
						<div className="search-el-popup">
							<div className="widget">
								<div className="widget-content padiing-srch-el">
									<p className="srch-el-conent">Are you sure you want to cancel your policy?</p>
									<div className="search-el-btn-container">
										<button onClick={this.clickPopUp.bind(this, 1)}>Yes</button>
										<span className="src-el-btn-border"></span>
										<button onClick={this.clickPopUp.bind(this, 2)}>No</button>
									</div>
								</div>
							</div>

						</div>

					</div>
					: ''
				}
				{this.state.showCancelSection?
					<section className="container parent-section book-appointment-section container-top-margin">
					<div className="row main-row parent-section-row">
						<div className="col-12 col-md-7 col-lg-7">
							<section className="profile-book-screen">
								<div className="widget">
									<div className="widget-content">
										<div className="ins-flex mrb-20">
											<img width="100" src="https://qacdn.docprime.com/media/insurer/images/apllogo.png" />
											<p className="fw-500">Group Out-patient Insurance</p>
											<div style={{ flexGrow: '0', flexShrink: '0' }}>
												<img width="30" src={ASSETS_BASE_URL + "/img/chk-green.svg"} style={{ verticalAlign: '-31px' }} />
												<span className="fw-500" style={{ color: '#4fc243', verticalAlign: '-21px' }} >Active</span>
											</div>
										</div>
									</div>
									<div className="ins-flex justify-content-between ins-date-row mrb-0">
										<div className="ins-date text-center">
											<p className="fw-500 mrb-5">Policy issue Date</p>
											<p className="fw-700">{`${this.getGetOrdinal(purchaseDate[2])} ${purchaseDate[1]} ${purchaseDate[3]}`}</p> 
										</div>
										<div className="ins-date text-center">
											<p className="fw-500 mrb-5">Policy expiry Date</p>
											<p className="fw-700">{`${this.getGetOrdinal(expiryDate[2])} ${expiryDate[1]} ${expiryDate[3]}`}</p>
										</div>
										<div className="ins-date text-center">
											<p className="fw-500 mrb-5">Policy Number</p>
											<p className="fw-700">{this.props.data.policy_number}</p>
										</div>
									</div>
									<div className="widget-content">
										<h5 className="fw-500">Cancellation policy</h5>
										<div className="ins-cancel-table">
											<table className="table">
												<tbody>
													{this.props.data.cancel_master && this.props.data.cancel_master.length >0?
														Object.entries(this.props.data.cancel_master).map(function ([key, value]) {
															return <tr>
																	<td >{value.refund_percentage}% Refund</td>
																	<td className="fw-500">{value.max_days} days from Policy date</td>
																</tr>
														})
														:''
													}
												</tbody>
											</table>
										</div>
										<p>On cancellation of policy all your active appointments will also be cancelled</p>
									</div>
								</div>
							</section>
							<a className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn text-center" style={{ color: "#ffffff" }} onClick={this.cancelPolicy.bind(this)}>cancel policy
								</a>
						</div>
						<ChatPanel />
					</div>
					</section>
				:
					<section className="container parent-section book-appointment-section container-top-margin">
						<div className="row main-row parent-section-row">
							<div className="col-12 col-md-7 col-lg-7">
								<section className="profile-book-screen">
									<div className="widget">
										<div className="widget-content">
											<div>
												<p>
													Your Policy DPHEALTHOPD12345 cancellation request has been initiated
												</p>
											</div>
											<div>
												<p>Our team will get in touch with you shortly</p>
												<p> An email and sms has been sent to your registered email id and mobile number regarding the same </p>
											</div>
											<div>
												<p>
												For any other query you contact us at 1800-123-9419 customercare@docprime.com
												</p>
											</div>
										</div>
									</div>
								</section>
							</div>
						</div>
					</section>
				}
			</div>
		} else {
			return <div className="profile-body-wrap" style={{ paddingBottom: 80 }} >
				<ProfileHeader />
				<Loader />
			</div>
		}

	}
}

export default InsuranceCancellationView    