import React from 'react'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import LeftBar from '../../components/commons/LeftBar'
import RightBar from '../../components/commons/RightBar'


class ProcedureView extends React.Component {

	render() {

		return (
			<div className="profile-body-wrap">
				<ProfileHeader />
				<section className="container parent-section book-appointment-section">
					<div className="row main-row parent-section-row">
						<LeftBar />
						<div className="col-12 col-md-7 col-lg-7 center-column" style={{paddingTop: "20px"}}>
							<div className="filter-card-dl mb-3">
								<img className="gold-card-img" src="/assets/img/gold.svg"/>
									<div className="fltr-crd-top-container">
										<div className="fltr-lctn-dtls">
											<p><img className="fltr-loc-ico" width="12px" height="18px" src="/assets/img/customer-icons/map-marker-blue.svg"/><span className="fltr-loc-txt">Near Saitn Angel Public School, Senior Wing, Sector 45</span> | <span>0.9 Km</span></p>
      										</div>
											<div className="row no-gutters">
												<div className="col-8">
													<div className="fltr-crd-img">
														<div><img className="fltr-usr-image img-round" src="https://qacdn.docprime.com/media/doctor/images/80x80/c20abe51eeb3d78c03c5f285266cf3e0.jpg"/></div>
															<span className="fltr-rtng">Verified</span>
														</div>
														<div className="fltr-name-dtls">
															<a href="/dr-satvender-singh-general-physician-in-sector-45-gurgaon-dpp">
																<h2 className="fltr-dc-name" style={{fontSize: '16px'}}>Dr. Satvender Singh</h2>
															</a>
															<p>General Physician</p>
															<p>15 Years of Experience</p>
														</div>
													</div>
													<div className="col-4">
														<div className="fltr-bkng-section">
															<span className="filtr-offer ofr-ribbon fw-700">25% Off</span>
															<p className="fltr-prices">₹ 300<span className="fltr-cut-price">₹ 400</span></p>
															<div className="signup-off-container"><span className="signup-off-doc">+ ₹ 100 OFF <b>on Signup</b> </span></div>
															<button className="fltr-bkng-btn">Book Now</button>
														</div>
													</div>
												</div>
												<div className="procedure-checkboxes">
													<h4>Procedures in <span>Denture <img src={ASSETS_BASE_URL + "/img/icons/info.svg"} /></span></h4>

												</div>
											</div>
											<div className="filtr-card-footer">
												<div>
													<img src="/assets/img/customer-icons/home.svg"/>
														<p>Dr. Satvender Singh Clinic</p>
      												</div>
													<div className="text-right">
														<img src="/assets/img/customer-icons/clock-black.svg"/>
															<p><span>5:30 PM to 7:30 PM</span></p>
      													</div>
													</div>
												</div>
											</div>
											<RightBar />
										</div>

				</section>
			</div>
								)
							}
						}
						
export default ProcedureView