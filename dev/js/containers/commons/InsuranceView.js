import React from 'react'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import ChatPanel from '../../components/commons/ChatPanel'



class Insurance extends React.Component {

	render() {

		return (
			<div>
				<div className="profile-body-wrap">
					<ProfileHeader showPackageStrip={true} />

					<section className="container article-container">
						<div className="row main-row parent-section-row justify-content-center">
							<div className="col-12 col-md-10 col-lg-10 center-column">
								<div className="container-fluid article-column">
									<div className="ins-landing-container">
										<div>
											<div className="ins-steps-section">
												<div className="doc-usr-only">
													<h1>Group OPD Insurance exclusively <br></br>for <span>Docprime</span> users only </h1>
													<div className="doc-pwdby">
														<p>Powered by</p>
														<img style={{ width: '130px' }} src="https://cdn.docprime.com/media/insurer/images/AMHI_Logo-01.png" />
													</div>
												</div>
											</div>
											<div className="ins-steps-section">
												<div className="row align-item-center">
													<div className="col-6">
														<div className="lft-cntn-algn">
															<img className="ins-step-img" src={ASSETS_BASE_URL + "/img/ins-hosp.png"} />
														</div>
													</div>
													<div className="col-6">
														<div className="lft-para-algn">
															<p className="step-blk-para">Unlimited</p>
															<p className="step-blk-para">Doctor</p>
															<p className="step-orng-para">consultation</p>
															<p className="step-qut-para">with <span>20,000+</span> Doctors*</p>
														</div>
													</div>
												</div>
											</div>
											<div className="ins-steps-section">
												<div className="row align-item-center">
													<div className="col-6">
														<div className="lft-para-algn">
															<p className="step-blk-para">Unlimited</p>
															<p className="step-orng-para">Lab Tests</p>
															<p className="step-qut-para">with <span>20,000+</span> Doctors*</p>
														</div>
													</div>
													<div className="col-6">
														<img className="ins-step-img" src={ASSETS_BASE_URL + "/img/isn-lab.png"} />
													</div>
												</div>
											</div>
											<div className="ins-steps-section">
												<div className="row align-item-center">
													<div className="col-6">
														<div className="lft-cntn-algn">
															<img className="ins-step-img" src={ASSETS_BASE_URL + "/img/ins-act.png"} />
														</div>
													</div>
													<div className="col-6">
														<div className="lft-para-algn">
															<p className="step-orng-para">Instant activation</p>
															<p className="step-blk-para">upon purchase</p>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="ins-land-listing">
											<p><img src={ASSETS_BASE_URL + '/img/ins-hrt.png'} />Pre existing diseases covered</p>
											<p><img src={ASSETS_BASE_URL + '/img/ins-rprt.png'} />No medical test required for policy inssuance</p>
											<p><img src={ASSETS_BASE_URL + '/img/ins-yr.png'} />Valid for 1 year from policy inssuance</p>
										</div>
										<div className="ins-network-cont">
											<div className="ins-netwrk-heading-cont">
												<p>*Only available on Docprime network </p>
												<span>View network</span>
											</div>
											<p className="ins-nw-note">A few things to note... </p>
											<ul className="ins-nw-listing">
												<li>All procedures (dental, daycare etc..) and sessions (therapy, counselling etc..) are not covered</li>
												<li>Any lab test or OPD appointments with MRP more than ₹1500 are not covered</li>
												<li>Only 5 oncology and 5 Gynecology doctor appointments are covered in a policy year</li>
												<li>Docprime's Insurance network is dynamic in nature and may change from time to time</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="sticky-btn fixed insuBtnsContainer">
							<button className="insu-right-orng-btn ins-buy-btn">Buy Now</button>
						</div>
					</section>
				</div>
			</div>
		)
	}
}

export default Insurance