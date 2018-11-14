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
						<div className="col-12 col-md-7 col-lg-7 center-column" style={{ paddingTop: "20px" }}>
							<div className="container-fluid" style={{ display: '' }}>
								<div className="filter-card-dl mb-3">
									<img className="gold-card-img" src="/assets/img/gold.svg" />
									<div className="fltr-crd-top-container">
										<div className="fltr-lctn-dtls">
											<p><img className="fltr-loc-ico" width="12px" height="18px" src="/assets/img/customer-icons/map-marker-blue.svg" /><span className="fltr-loc-txt">Near Saitn Angel Public School, Senior Wing, Sector 45</span> | <span>0.9 Km</span></p>
										</div>
										<div className="row no-gutters">
											<div className="col-8">
												<div className="fltr-crd-img">
													<div><img className="fltr-usr-image img-round" src="https://qacdn.docprime.com/media/doctor/images/80x80/c20abe51eeb3d78c03c5f285266cf3e0.jpg" /></div>
													<span className="fltr-rtng">Verified</span>
												</div>
												<div className="fltr-name-dtls">
													<a href="/dr-satvender-singh-general-physician-in-sector-45-gurgaon-dpp">
														<h2 className="fltr-dc-name" style={{ fontSize: '16px' }}>Dr. Satvender Singh</h2>
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
											<div className="insurance-checkboxes">
												<ul className="procedure-list">
													<li>
														<div>
															<input type="checkbox" className="ins-chk-bx" id="test1" name="fruit-1" value="" /><label for="test1">Indivisual 1A</label>
														</div>
														<p className="pr-prices">₹ 300<span className="pr-cut-price">₹ 400</span></p>
													</li>
													<li>
														<div>
															<input type="checkbox" className="ins-chk-bx" id="test2" name="fruit-1" value="" /><label for="test2">Indivisual 1A</label>
														</div>
														<p className="pr-prices">₹ 300<span className="pr-cut-price">₹ 400</span></p>
													</li>

												</ul>
												<button className="pr-plus-add-btn">
													+ 5 more
													</button>
											</div>

										</div>
									</div>
									<div className="filtr-card-footer">
										<div>
											<img src="/assets/img/customer-icons/home.svg" />
											<p>Dr. Satvender Singh Clinic</p>
										</div>
										<div className="text-right">
											<img src="/assets/img/customer-icons/clock-black.svg" />
											<p><span>5:30 PM to 7:30 PM</span></p>
										</div>
									</div>
								</div>
								<div className="filter-card-dl mb-3">
									<img className="gold-card-img" src="/assets/img/gold.svg" />
									<div className="fltr-crd-top-container">
										<div className="fltr-lctn-dtls">
											<p><img className="fltr-loc-ico" width="12px" height="18px" src="/assets/img/customer-icons/map-marker-blue.svg" /><span className="fltr-loc-txt">Near Saitn Angel Public School, Senior Wing, Sector 45</span> | <span>0.9 Km</span></p>
										</div>
										<div className="row no-gutters">
											<div className="col-8">
												<div className="fltr-crd-img">
													<div><img className="fltr-usr-image img-round" src="https://qacdn.docprime.com/media/doctor/images/80x80/c20abe51eeb3d78c03c5f285266cf3e0.jpg" /></div>
													<span className="fltr-rtng">Verified</span>
												</div>
												<div className="fltr-name-dtls">
													<a href="/dr-satvender-singh-general-physician-in-sector-45-gurgaon-dpp">
														<h2 className="fltr-dc-name" style={{ fontSize: '16px' }}>Dr. Satvender Singh</h2>
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
											<div className="insurance-checkboxes">
												<ul className="procedure-list">
													<li>
														<div>
															<input type="checkbox" className="ins-chk-bx" id="test1" name="fruit-1" value="" /><label for="test1">Indivisual 1A</label>
														</div>
														<p className="pr-prices">₹ 300<span className="pr-cut-price">₹ 400</span></p>
													</li>
													<li>
														<div>
															<input type="checkbox" className="ins-chk-bx" id="test2" name="fruit-1" value="" /><label for="test2">Indivisual 1A</label>
														</div>
														<p className="pr-prices">₹ 300<span className="pr-cut-price">₹ 400</span></p>
													</li>

												</ul>
												<button className="pr-plus-add-btn">
													+ 5 more
													</button>
											</div>

										</div>
									</div>
									<div className="filtr-card-footer">
										<div>
											<img src="/assets/img/customer-icons/home.svg" />
											<p>Dr. Satvender Singh Clinic</p>
										</div>
										<div className="text-right">
											<img src="/assets/img/customer-icons/clock-black.svg" />
											<p><span>5:30 PM to 7:30 PM</span></p>
										</div>
									</div>
								</div>
							</div>

							{/* second sreen  */}
							<div className="container-fluid" style={{ display: 'none' }}>
								<div className="widget mrt-10 ct-profile skin-white pr-border-radious gold-relative mb-3">
									<img className="gold-card-img" src="/assets/img/gold.svg" />
									<div className="widget-header dr-qucik-info doc-gold-padding">
										<div className="fltr-crd-img">
											<div><img src="https://qacdn.docprime.com/media/doctor/images/80x80/c20abe51eeb3d78c03c5f285266cf3e0.jpg" className="img-fluid img-round" />
											</div>
											<span className="fltr-rtng">Verified</span>
										</div>
										<div className="dr-profile">
											<h1 className="dr-name">Dr. Satvender Singh</h1>
											<p className="desg">General Physician</p>
											<p className="add-details">15 Years of Experience</p>
											<p className="add-details">EXP - Dr. Satvender Singh Clinic</p>
										</div>
									</div>
								</div>
								<div className="widget mrt-10 ct-profile skin-white pr-border-radious gold-relative mb-3">
									<div className="widget-panel">
										<h4 className="panel-title mb-rmv">Dr. Satvender Singh</h4>
										<div className="panel-content">
											<p className="fw-10000 text-md">
												Dr. Vandana verma is a dentist with 6 years of work experience. She completed her BDS from Ch. Charan Singh University, Meerut. She specializes in Oral and MaxilloFacial Surgery Madan Mohan READ MORE
											</p>
										</div>
									</div>
								</div>
								<div className="widget mrt-10 ct-profile skin-white pr-border-radious gold-relative mb-3">
									<div className="widget-panel">
										<h4 className="panel-title mb-rmv">Select Clinic</h4>
										<div className="panel-content pnl-bottom-border">
											<div className="search-list-radio prp-chk-card">
												<input type="radio" id="home1" name="radio-group" value="hom1e" checked /><label className="radio-inline lab-appointment-label text-md fw-500" htmlFor="home1">Veritaas Multispeciality  Clinic  Diagnostic Centre</label>
											</div>
											<div className="conslt-fee-card">
												<p>Consultation Fee <span className="pr-prices">₹ 300<span className="pr-cut-price">₹ 400</span></span></p>
											</div>
											<div className="pr-address-card">
												<div className="row align-items-center">
													<div className="col-10">
														<div className="pr-addrs-card-pc">
															<span className="test-span">Address:</span><p>Huda city center, Gurgaon</p>
														</div>
														<div className="pr-addrs-card-pc">
															<span className="test-span">Timings:</span><p>Mon to Wed - 10:20 AM to 1:00 PM <span>Thu - 2:00 PM to 6:00 PM</span></p>
														</div>
													</div>
													<div className="col-2">
														<img src="/assets/img/customer-icons/clock-black.svg" />
													</div>
												</div>
											</div>
											<div className="procedure-checkboxes">
												<h3>Procedures Available (25)</h3>
												<div className="insurance-checkboxes">
													<ul className="procedure-list">
														<li>
															<div className="chk-with-img">
																<input type="checkbox" className="ins-chk-bx" id="test1" name="fruit-1" value="" /><label for="test1">Filling</label>
																<img src={ASSETS_BASE_URL + "/img/icons/info.svg"} />
															</div>
															<p className="pr-prices">₹ 300<span className="pr-cut-price">₹ 400</span></p>
														</li>
														<li>
															<div className="chk-with-img">
																<input type="checkbox" className="ins-chk-bx" id="test2" name="fruit-1" value="" /><label for="test2">Braces</label>
																<img src={ASSETS_BASE_URL + "/img/icons/info.svg"} />
															</div>
															<p className="pr-prices">₹ 300<span className="pr-cut-price">₹ 400</span></p>
														</li>
														<li>
															<div className="chk-with-img">
																<input type="checkbox" className="ins-chk-bx" id="test2" name="fruit-1" value="" /><label for="test2">Tooth Extraction</label>
																<img src={ASSETS_BASE_URL + "/img/icons/info.svg"} />
															</div>
															<p className="pr-prices">₹ 300<span className="pr-cut-price">₹ 400</span></p>
														</li>
														<li>
															<div className="chk-with-img">
																<input type="checkbox" className="ins-chk-bx" id="test2" name="fruit-1" value="" /><label for="test2">Filing</label>
																<img src={ASSETS_BASE_URL + "/img/icons/info.svg"} />
															</div>
															<p className="pr-prices">₹ 300<span className="pr-cut-price">₹ 400</span></p>
														</li>
													</ul>
													<button className="pr-plus-add-btn">
														+ 5 more
													</button>
												</div>

											</div>
										</div>
										<div className="panel-content pnl-bottom-border">
											<div className="search-list-radio prp-chk-card">
												<input type="radio" id="home1" name="radio-group" value="hom1e" checked /><label className="radio-inline lab-appointment-label text-md fw-500" htmlFor="home1">Veritaas Multispeciality  Clinic  Diagnostic Centre</label>
											</div>
											<div className="pr-address-card">
												<div className="row align-items-center">
													<div className="col-10">
														<div className="pr-addrs-card-pc">
															<span className="test-span">Address:</span><p>Huda city center, Gurgaon</p>
														</div>
														<div className="pr-addrs-card-pc">
															<span className="test-span">Timings:</span><p>Mon to Wed - 10:20 AM to 1:00 PM <span>Thu - 2:00 PM to 6:00 PM</span></p>
														</div>
													</div>
													<div className="col-2">
														<img src="/assets/img/customer-icons/clock-black.svg" />
													</div>
												</div>
											</div>
										</div>
										<div className="panel-content pnl-bottom-border">
											<div className="search-list-radio prp-chk-card">
												<input type="radio" id="home1" name="radio-group" value="hom1e" checked /><label className="radio-inline lab-appointment-label text-md fw-500" htmlFor="home1">Veritaas Multispeciality  Clinic  Diagnostic Centre</label>
											</div>
											<div className="pr-address-card">
												<div className="row align-items-center">
													<div className="col-10">
														<div className="pr-addrs-card-pc">
															<span className="test-span">Address:</span><p>Huda city center, Gurgaon</p>
														</div>
														<div className="pr-addrs-card-pc">
															<span className="test-span">Timings:</span><p>Mon to Wed - 10:20 AM to 1:00 PM <span>Thu - 2:00 PM to 6:00 PM</span></p>
														</div>
													</div>
													<div className="col-2">
														<img src="/assets/img/customer-icons/clock-black.svg" />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* last screen */}
							<div className="widget mrt-10 ct-profile skin-white pr-border-radious gold-relative mb-3" style={{ display: 'none' }}>

								<img className="gold-card-img" src="/assets/img/gold.svg" />
								<div className="widget-header pnl-bottom-border dr-qucik-info doc-gold-padding">
									<div className="pr-summary">
										<div className="summary-doc">
											<div className="fltr-crd-img">
												<div><img className="fltr-usr-image img-round" src="https://qacdn.docprime.com/media/doctor/images/80x80/c20abe51eeb3d78c03c5f285266cf3e0.jpg" /></div>
												<span className="fltr-rtng">Verified</span>
											</div>
											<div className="fltr-name-dtls">
												<a href="/dr-satvender-singh-general-physician-in-sector-45-gurgaon-dpp">
													<h2 className="fltr-dc-name" style={{ fontSize: '18px' }}>Dr. Satvender Singh</h2>
												</a>
												<p style={{ fontSize: '15px', color: 'black' }}>Rana Dental Clinic</p>
											</div>
										</div>
									</div>
								</div>
								<div className="summery-status">
									<div className="row mb-3">
										<div className="col-4">
											<div className="tbl-img-txt">
												<img src={ASSETS_BASE_URL + "/img/customer-icons/clock.svg"} />
												<p>Visit Time</p>
											</div>
										</div>
										<div className="col-8 flex-align">
											<p>18th  April |  3:30 PM</p>
											<span className="select-span">Change</span>
										</div>
									</div>
									<div className="row mb-3">
										<div className="col-4">
										<div className="tbl-img-txt">
											<img src={ASSETS_BASE_URL + "/img/customer-icons/clock.svg"} />
											<p>Patient</p>
											</div>
										</div>
										<div className="col-8">
											<span className="select-span">Select Patient</span>
										</div>
									</div>
										<div className="treatment-select">
											<img src={ASSETS_BASE_URL + "/img/customer-icons/clock.svg"} />
											<p>Treatment(s) Selected</p>
										</div>
										<div className="trt-tabl">
												<table>
													<tr>
														<td>Consultation Fees</td>
														<td><p className="tbl-price">₹ 500</p><span className="tbl-price-span">₹ 300</span></td>
													</tr>
													<tr>
														<td>Filling Fees</td>
														<td><p className="tbl-price">₹ 500</p><span className="tbl-price-span">₹ 300</span></td>
													</tr>
												</table>
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