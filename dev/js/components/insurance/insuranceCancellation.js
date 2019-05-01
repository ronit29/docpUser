import React from 'react'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import ChatPanel from '../../components/commons/ChatPanel'
import Loader from '../commons/Loader'

class InsuranceCancellationView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showCancelPopup: false
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
					this.setState({ showCancelPopup: false })
				} else {
					this.setState({ showCancelPopup: false })
				}
			})
		} else {
			this.setState({ showCancelPopup: false })
		}
	}

	render() {
		if (1) {
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
											{/* <p className="fw-700">{`${this.getGetOrdinal(purchaseDate[2])} ${purchaseDate[1]} ${purchaseDate[3]}`}</p> */}
											<p className="fw-700">30th Apr 2019</p>
										</div>
										<div className="ins-date text-center">
											<p className="fw-500 mrb-5">Policy expiry Date</p>
											{/* <p className="fw-700">{`${this.getGetOrdinal(expiryDate[2])} ${expiryDate[1]} ${expiryDate[3]}`}</p> */}
											<p className="fw-700">29th Apr 2020</p>
										</div>
										<div className="ins-date text-center">
											<p className="fw-500 mrb-5">Policy Number</p>
											{/* <p className="fw-700">{this.props.get_insured_profile.policy_number}</p> */}
											<p className="fw-700">dummynumber00000089</p>
										</div>
									</div>
									<div className="widget-content">
										<h5 className="fw-500">Cancellation policy</h5>
										<div className="ins-cancel-table">
											<table className="table">
												<tbody>
													<tr>
														<td >100% Refund</td>
														<td className="fw-500">15 days from Policy date</td>
													</tr>
													<tr>
														<td >100% Refund</td>
														<td className="fw-500">15 days from Policy date</td>
													</tr>
													<tr>
														<td >100% Refund</td>
														<td className="fw-500">15 days from Policy date</td>
													</tr>
													<tr>
														<td >100% Refund</td>
														<td className="fw-500">15 days from Policy date</td>
													</tr>
													<tr>
														<td >No Refund</td>
														<td className="fw-500">Atleast 1 completed Claim</td>
													</tr>
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