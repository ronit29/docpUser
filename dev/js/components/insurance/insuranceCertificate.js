import React from 'react'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import ChatPanel from '../../components/commons/ChatPanel'

class InsuranceCertificateView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	render() {
		if (Object.keys(this.props.get_insured_profile).length > 0) {
			var purchase_date = new Date(this.props.get_insured_profile.purchase_date)
			let purchase_time = purchase_date.toTimeString()
			let purchaseTime = purchase_time.split(" ")
			purchase_date = purchase_date.toDateString()
			let purchaseDate = purchase_date.split(" ")
			let expiry_date = new Date(this.props.get_insured_profile.expiry_date)
			let expiry_time = expiry_date.toTimeString()
			let expiryTime = expiry_time.split(" ")
			expiry_date = expiry_date.toDateString()
			let expiryDate = expiry_date.split(" ")
			return <div className="profile-body-wrap" style={{ paddingBottom: 80 }} >
				<ProfileHeader />
				<section className="container parent-section book-appointment-section container-top-margin">
					<div className="row main-row parent-section-row">
						<div className="col-12 col-md-7 col-lg-7">
							<section className="profile-book-screen">
								{/*<section className="section-margin-bottom">
									<div className="widget cong-margin-btm">
										<div className="ins-final-screen-continer">
											<div className="ins-card-head">
												<div className="ins-name-head certificate-width">
													<img width="140" src={this.props.get_insured_profile.insurer_img} />
													<p>
														OPD Insurance by <span>Apollo Munich</span>
														<span className="ins-active-container">
															<p>Active <img src={ASSETS_BASE_URL + "/img/chk-green.svg"} /></p>
														</span>
													</p> 
													<p>Group Out-patient Insurance<span className="ins-active-container">
														<p>Active <img src={ASSETS_BASE_URL + "/img/chk-green.svg"} /></p>
													</span>
													</p>
												</div>
											</div>
											<div className="ins-policy-date">
												<div className="details-flex-cont">
													<div className="ins-policy-details">
														<p>Policy Purchase Date</p>
														<span>{`${purchaseDate[2]}th ${purchaseDate[1]} ${purchaseDate[3]}`}</span>
													</div>
													<div className="ins-policy-details">
														<p>Valid Upto</p>
														<span>{`${expiryDate[2]}th ${expiryDate[1]} ${expiryDate[3]}`}</span>
													</div>
												</div>
												<div className="ins-policy-members-details">
													<p><span>Premium</span> : Rs {this.props.get_insured_profile.premium_amount}</p>
													<p style={{ 'textTransform': 'capitalize' }}><span>Proposer Name </span> : {this.props.get_insured_profile.proposer_name[0].first_name} {this.props.get_insured_profile.proposer_name[0].middle_name} {this.props.get_insured_profile.proposer_name[0].last_name}</p>
													<p><span>Policy Number</span> : {this.props.get_insured_profile.policy_number}</p>
													<p><span>Cover</span> : {this.props.get_insured_profile.insured_members.length} {this.props.get_insured_profile.insured_members.length == 1 ? 'Member' : 'Members'}</p>
													<ul>{Object.entries(this.props.get_insured_profile.insured_members).map(function ([key, value]) {
														return <li key={key} style={{ 'textTransform': 'capitalize' }}>
															<span className="insa-tbl-names"> {value.relation} : </span>
															<span className="insa-sub-tbl-names"> {value.first_name} {value.middle_name} {value.last_name} </span>
														</li>
													}, this)}
													</ul>
												</div>
											</div>
										</div>
									</div>
								</section>*/}
								<div className="widget">
									<div className="widget-content">
										<p className="fw-500 ins-congo-text text-primary text-center mrb-10">Congratulations !</p>
										<p className="fw-500 text-center mrb-10">Your Group Out-patient Insurance has been issued</p>
										<div className="ins-flex mrb-20">
											<img width="100" src="https://qacdn.docprime.com/media/insurer/images/apllogo.png" />
											{/*<p className="fw-500">OPD Insurance <br />by <span className="fw-700">Apollo Munich</span></p>*/}
											<p className="fw-500">Group Out-patient Insurance</p>
											<div>
												<img width="30" src={ASSETS_BASE_URL + "/img/chk-green.svg"} style={{ verticalAlign: '-31px' }} />
												<span className="fw-500" style={{ color: '#4fc243', verticalAlign: '-21px' }} >Active</span>
											</div>
										</div>
										<div className="ins-flex mrb-10">
											<img src={ASSETS_BASE_URL + '/img/customer-icons/pdf.png'} />
											<p className="fw-500 mr-0">Please find attached the certificate of insurance for the issued policy</p>
										</div>
									</div>
									<div className="ins-flex justify-content-between ins-date-row mrb-0">
										<div className="ins-date text-center">
											<p className="fw-500 mrb-5">Policy issue Date</p>
											<p className="fw-700">{`${purchaseDate[2]}th ${purchaseDate[1]} ${purchaseDate[3]}`}</p>
										</div>
										<div className="ins-date text-center">
											<p className="fw-500 mrb-5">Policy expiry Date</p>
											<p className="fw-700">{`${expiryDate[2]}th ${expiryDate[1]} ${expiryDate[3]}`}</p>
										</div>
										<div className="ins-date text-center">
											<p className="fw-500 mrb-5">Policy Number</p>
											<p className="fw-700">{this.props.get_insured_profile.policy_number}</p>
										</div>
									</div>
									<div className="widget-content ins-bg-grey">
										<div className="container ins-details-container">
											<div className="row ins-details-row no-gutters">
												<div className="col-6 ins-details-div">
													<p className="ins-gr-text fw-500">Annual Premium Paid:</p>
												</div>
												<div className="col-6 ins-details-div">
													<p className="ins-bl-text fw-500">&#8377; {this.props.get_insured_profile.premium_amount}</p>
												</div>
											</div>
											<div className="row ins-details-row no-gutters">
												<div className="col-6 ins-details-div">
													<p className="ins-gr-text fw-500">Proposer Name:</p>
												</div>
												<div className="col-6 ins-details-div">
													<p className="ins-bl-text fw-500" style={{ 'textTransform': 'capitalize' }}>{this.props.get_insured_profile.proposer_name[0].first_name} {this.props.get_insured_profile.proposer_name[0].middle_name} {this.props.get_insured_profile.proposer_name[0].last_name}</p>
												</div>
											</div>
											<div className="row ins-details-row no-gutters">
												<div className="col-6 ins-details-div">
													<p className="ins-gr-text fw-500">Covered Members:</p>
												</div>
												<div className="col-6 ins-details-div">
													{Object.entries(this.props.get_insured_profile.insured_members).map(function ([key, value]) {
														return  <p key={key} style={{ 'textTransform': 'capitalize' }} className="ins-bl-text fw-500">
																<span className="fw-400">{value.relation} : - </span>
																{value.first_name} {value.middle_name} {value.last_name}
																</p>
													}, this)}
												</div>
											</div>
										</div>
									</div>
								</div>
							</section>									
							<button className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg static-btn">
								<a style={{ color: "#ffffff" }} href={this.props.get_insured_profile.coi_url} download target="_blank">
									Download Certificate of Insurance<span className="foot-btn-sub-span">(Policy Document)</span>
								</a>
							</button>
						</div>
						<ChatPanel />
					</div>
				</section>
			</div>
		} else {
			return <div></div>
		}

	}
}

export default InsuranceCertificateView    