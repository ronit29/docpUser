import React from 'react'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import ChatPanel from '../../components/commons/ChatPanel'



class Insurance extends React.Component {

	render() {

		return (
			<div>
				<div className="profile-body-wrap">
					<ProfileHeader />

					<section className="container parent-section book-appointment-section">
						<div className="row main-row parent-section-row">
							<div className="col-12 col-md-7 col-lg-7 ins-main-padding">
								<section className="profile-book-screen">
									<div className="widget">
										<div className="ins-card-head">
											<div className="ins-name-head">
												<img src="https://cdn.docprime.com/media/lab/images/90x60/35bce4401ab5ea4b346186238d17e67d.jpg" />
												<p>
													OPD Insurance by <span>Apollo Munich</span>
												</p>
											</div>
											<div className="ins-pdf-dwnload">
												<img src={ASSETS_BASE_URL + "/img/pdf-dwn.png"} />
												<span>
													Policy Details
												</span>
											</div>
										</div>
										{/* tab section */}
										<div className="ins-swich-tabs-container">
											<div className="ins-tabs">
												<ul>
													<li>
														<p>Whats Covered?</p>
													</li>
													<li><p>Whats not Covered?</p></li>
												</ul>
											</div>
											<div className="ins-tabs-content">
												<ul>
													<li><p>All Appointments booked from docprime platform</p></li>
													<li><p>Unlimited number of doctor consultations on partner network.</p></li>
													<li><p>Unlimited numbers of diagnostic tests (Radiology and Pathology)</p></li>
													<li><p>Premium services on online doctor consultation</p></li>
												</ul>
											</div>
										</div>
										<div className="ins-status-container">
											<div className="navigation_menu" id="">
												<ul className="navigation_tabs" id="">
													<li className="tab_inactive">
														<a href="#">Select Premium</a>
													</li>
													<li className="tab_active">
														<a href="#">Fill Details</a>
													</li>
													<li className="tab_disabled">
														<a href="#">Payment</a>
													</li>
												</ul>
											</div>
										</div>
										{/* tab section */}
										{/* coverage listing */}
										<div className="coverage-list-container">
											<table className="table table-bordered insurance-tbl insurance-checkboxes">
												<thead>
													<tr>
														<th className="tbl-first-head"><p>Coverage (1 Year)</p></th>
														<th className="tbl-second-head"><p>Annual Premium</p></th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td><input type="checkbox" className="ins-chk-bx" id="test1" name="fruit-1" value="" /><label for="test1">Indivisual 1A</label></td>
														<td><span>Rs 1499</span></td>
													</tr>
													<tr>
														<td><input type="checkbox" className="ins-chk-bx" id="test2" name="fruit-1" value="" /><label for="test2">2 Adults (2A)</label> </td>
														<td><span>Rs 1499</span></td>
													</tr>
													<tr>
														<td><input type="checkbox" className="ins-chk-bx" id="test3" name="fruit-1" value="" /><label for="test3">2 Adult + 2 Child (2A + 2C)</label></td>
														<td><span>Rs 1499</span></td>
													</tr>
													<tr>
														<td><input type="checkbox" className="ins-chk-bx" id="test4" name="fruit-1" value="" /><label for="test4">3 Adult + 2 Child (2A + 2C)</label> </td>
														<td><span>Rs 1499</span></td>
													</tr>
												</tbody>
											</table>
										</div>
										<div className="ins-gst-ribbon-section">
											<p className="ins-gst">inclusive of 18% GST</p>
											<span className="ins-ribbon">You Saved Rs 500</span>
										</div>
										{/* coverage listing */}
									</div>
								</section>
								{/* insurance input screen */}
								<section className="section-margin-bottom">
									<div className="widget">
										<div className="ins-card-head">
											<div className="ins-name-head">
												<img src="https://cdn.docprime.com/media/lab/images/90x60/35bce4401ab5ea4b346186238d17e67d.jpg" />
												<p>
													OPD Insurance by <span>Apollo Munich</span>
												</p>
											</div>
											<div className="ins-pdf-dwnload">
												<img src={ASSETS_BASE_URL + "/img/pdf-dwn.png"} />
												<span>
													Policy Details
												</span>
											</div>
										</div>
										<div className="insurance-form-page">
											<table className="table table-bordered insurance-tbl insurance-checkboxes">
												<thead>
													<tr>
														<th className="tbl-first-head"><p>Coverage (1 Year)</p></th>
														<th className="tbl-second-head"><p>Annual Premium</p></th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td><input type="checkbox" className="ins-chk-bx" id="test11" name="fruit-1" value="" /><label for="test11">Indivisual 1A</label></td>
														<td><span>Rs 1499</span></td>
													</tr>
												</tbody>
											</table>
										</div>

										<div className="ins-gst-ribbon-section">
											<p className="ins-gst">inclusive of 18% GST</p>
										</div>
										<div className="ins-status-container">
											<div className="navigation_menu" id="">
												<ul className="navigation_tabs" id="">
													<li className="tab_inactive">
														<a href="#">Select Premium</a>
													</li>
													<li className="tab_active">
														<a href="#">Fill Details</a>
													</li>
													<li className="tab_disabled">
														<a href="#">Payment</a>
													</li>
												</ul>
											</div>
										</div>

										<div className="insurance-member-container">
											<h4>Insured Member Details</h4>
											<div className="insurance-member-details">
												<div className="member-dtls-chk">
													<span>Self</span>
													<div className="insurance-checkboxes">
														<input type="checkbox" className="ins-chk-bx" id="test21" name="fruit-1" value="" /><label for="test21">I dont have last name</label>
													</div>
												</div>
												<div className="row no-gutters">
												<div className="col-12">
													<button className="label-names-buttons">Mr.</button>
													<button className="label-names-buttons btn-active">Ms.</button>
													<button className="label-names-buttons">Mrs.</button>
												</div>
													<div className="col-6">
														<div className="ins-form-group inp-margin-right ">
															<input type="text" id="name" className="form-control ins-form-control" required autocomplete="off" />
															<label className="form-control-placeholder" for="name">First Name</label>
															<img className="ins-input-img" style={{ width: '19px' }} src={ASSETS_BASE_URL + "/img/ins-usr.svg"} />
														</div>
													</div>
													<div className="col-6">
														<div className="ins-form-group inp-margin-left">
															<input type="text" id="lastname" className="form-control ins-form-control" required autocomplete="off" />
															<label className="form-control-placeholder" for="lastname">Last Name</label>
															<img className="ins-input-img" style={{ width: '19px' }} src={ASSETS_BASE_URL + "/img/ins-usr.svg"} />
														</div>
													</div>
													<div className="col-12">
														<div className="ins-form-radio">
															<div className="dtl-radio">
																<label className="container-radio">
																	Male
															 <input type="radio" checked name="Male" />
																	<span className="doc-checkmark"></span>
																</label>
															</div>
															<div className="dtl-radio">
																<label className="container-radio">
																	Female
															 <input type="radio" checked name="female" />
																	<span className="doc-checkmark"></span>
																</label>
															</div>
															<div className="dtl-radio">
																<label className="container-radio">
																	Others
															 <input type="radio" checked name="others" />
																	<span className="doc-checkmark"></span>
																</label>
															</div>
														</div>
													</div>
													<div className="col-12">
														<div className="ins-form-group">
															<input type="email" id="emails" className="form-control ins-form-control" required autocomplete="off" />
															<label className="form-control-placeholder" for="emails">Email</label>
															<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/email.svg"} />
														</div>
													</div>
													<div className="col-12">
														<div className="ins-form-group">
															<input type="text" id="isndate" className="form-control ins-form-control" required autocomplete="off" />
															<label className="form-control-placeholder" for="isndate">Date of birth</label>
															<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/cal.svg"} />
														</div>
													</div>
													<div className="col-12">
														<div className="ins-form-group">
															<input type="text" id="isnpin" className="form-control ins-form-control" required autocomplete="off" />
															<label className="form-control-placeholder" for="isnpin">Pincode</label>
															<img className="ins-input-img" style={{ width: '18px' }} src={ASSETS_BASE_URL + "/img/ins-loc.svg"} />
														</div>
													</div>
													<div className="col-12">
														<div className="ins-form-group">
															<input type="text" id="isnaddress" className="form-control ins-form-control" required autocomplete="off" />
															<label className="form-control-placeholder" for="isnaddress">Full Address</label>
															<img className="ins-input-img" style={{ width: '18px' }} src={ASSETS_BASE_URL + "/img/ins-loc.svg"} />
														</div>
													</div>
												</div>

												<div className="ins-sub-forms sub-input-forms-containers">
													<hr className="ins-internal-hr" />
													<div className="sub-form-input-data">
														<div>
															<p className="sub-form-hed">Adult 2</p>
														</div>
														<div className="sub-form-hed-click">
															Select from profile
												<img src={ASSETS_BASE_URL + "/img/rgt-arw.svg"} />
														</div>
													</div>

													<div className="row no-gutters">
														<div className="col-12">
															<div className="ins-form-group">
																<input type="text" id="isnpin2" className="form-control ins-form-control" required autocomplete="off" />
																<label className="form-control-placeholder" for="isnpin2">Relation</label>
																<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/rel.svg"} />
															</div>
														</div>
														<div className="col-6">
															<div className="ins-form-group inp-margin-right ">
																<input type="text" id="name1" className="form-control ins-form-control" required autocomplete="off" />
																<label className="form-control-placeholder" for="name1">First Name</label>
																<img className="ins-input-img" style={{ width: '19px' }} src={ASSETS_BASE_URL + "/img/ins-usr.svg"} />
															</div>
														</div>
														<div className="col-6">
															<div className="ins-form-group inp-margin-left">
																<input type="text" id="lastname2" className="form-control ins-form-control" required autocomplete="off" />
																<label className="form-control-placeholder" for="lastname2">Last Name</label>
																<img className="ins-input-img" style={{ width: '19px' }} src={ASSETS_BASE_URL + "/img/ins-usr.svg"} />
															</div>
														</div>
														<div className="col-12">
															<div className="ins-form-radio">
																<div className="dtl-radio">
																	<label className="container-radio">
																		Male
															 <input type="radio" checked name="Male" />
																		<span className="doc-checkmark"></span>
																	</label>
																</div>
																<div className="dtl-radio">
																	<label className="container-radio">
																		Female
															 <input type="radio" checked name="female" />
																		<span className="doc-checkmark"></span>
																	</label>
																</div>
																<div className="dtl-radio">
																	<label className="container-radio">
																		Others
															 <input type="radio" checked name="others" />
																		<span className="doc-checkmark"></span>
																	</label>
																</div>
															</div>
														</div>

														<div className="col-12">
															<div className="ins-form-group">
																<input type="text" id="isndate2" className="form-control ins-form-control" required autocomplete="off" />
																<label className="form-control-placeholder" for="isndate2">Date of birth</label>
																<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/cal.svg"} />
															</div>
														</div>


													</div>
												</div>

											</div>
										</div>
									</div>
								</section>
								{/* insurance input screen */}

								{/* ===============isurance 4th screen=============== */}
								<section className="section-margin-bottom">
									<div className="widget">
										<div className="ins-card-head">
											<div className="ins-name-head">
												<img src="https://cdn.docprime.com/media/lab/images/90x60/35bce4401ab5ea4b346186238d17e67d.jpg" />
												<p>
													OPD Insurance by <span>Apollo Munich</span>
												</p>
											</div>
											<div className="ins-pdf-dwnload">
												<img src={ASSETS_BASE_URL + "/img/pdf-dwn.png"} />
												<span>
													Policy Details
												</span>
											</div>
										</div>
										<div className="insurance-form-page">
											<table className="table table-bordered insurance-tbl insurance-checkboxes">
												<thead>
													<tr>
														<th className="tbl-first-head"><p>Coverage (1 Year)</p></th>
														<th className="tbl-second-head"><p>Annual Premium</p></th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td><p className="ins-dtls-members-edit">Insured Member Details   <span>EDIT</span></p></td>
														<td></td>
													</tr>
													<tr>
														<td><label for="test11">2 Adult + 2 Child (2A + 2C)</label></td>
														<td><span>Rs 1499</span></td>
													</tr>
												</tbody>
											</table>
										</div>

										<div className="ins-gst-ribbon-section">
											<p className="ins-gst">inclusive of 18% GST</p>
										</div>
										<div className="ins-status-container">
											<div className="navigation_menu" id="">
												<ul className="navigation_tabs" id="">
													<li className="tab_inactive">
														<a href="#">Select Premium</a>
													</li>
													<li className="tab_active">
														<a href="#">Fill Details</a>
													</li>
													<li className="tab_disabled">
														<a href="#">Payment</a>
													</li>
												</ul>
											</div>
										</div>

										<div className="insurance-member-container">
											<div className="ins-user-details-lisitng">
												<p class="sub-form-hed">Self</p>
												<ul className="ins-usr-img-para">
													<li>
														<div className="img-list-width">
															<img className="ins-input-img" style={{ width: '19px' }} src={ASSETS_BASE_URL + "/img/ins-usr.svg"} />
														</div>
														<p>Rishabh Mehrotra | Male</p>
													</li>
													<li>
														<div className="img-list-width">
															<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/cal.svg"} />
														</div>
														<p>25/07/1993</p>
													</li>
													<li>
														<div className="img-list-width">
															<img className="ins-input-img" style={{ width: '18px' }} src={ASSETS_BASE_URL + "/img/ins-loc.svg"} />
														</div>
														<p>220012</p>
													</li>
													<li>
														<div className="img-list-width">
															<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/email.svg"} />
														</div>
														<p>rishabh@docprime.com</p>
													</li>
													<li>
														<div className="img-list-width">
															<img className="ins-input-img" style={{ width: '18px' }} src={ASSETS_BASE_URL + "/img/ins-loc.svg"} />
														</div>
														<p>123 Sector 44 Policybazaar Gurgaon Haryana</p>
													</li>
												</ul>
											</div>
											<div class="ins-sub-forms sub-input-forms-containers">
												<hr class="ins-internal-hr" />
												<div className="ins-user-details-lisitng">
													<p class="sub-form-hed">Member 2</p>
													<div className="members-container-padding">
														<div className="row">
															<div className="col-6">
																<div className="members-listings">
																	<div className="member-list-width">
																		<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/rel.svg"} />
																	</div>
																	<p>Wife</p>
																</div>
															</div>
															<div className="col-6">
																<div className="members-listings">
																	<div className="member-list-width">
																		<img style={{ width: '19px' }} className="ins-input-img" src={ASSETS_BASE_URL + "/img/ins-usr.svg"} />
																	</div>
																	<p>Mrs. The Wife Name Female</p>
																</div>
															</div>
															<div className="col-6">
																<div className="members-listings">
																	<div className="member-list-width">
																		<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/cal.svg"} />
																	</div>
																	<p>25/07/1993</p>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</section>

								{/* ===============isurance 4th screen=============== */}

								{/* ===============isurance 5th screen=============== */}
								<section className="section-margin-bottom">
									<div className="widget cong-margin-btm">
										<div className="congratulation-section">
											<div className="cong-img">
												<img className="ins-input-img" src={ASSETS_BASE_URL + "/img/cong.png"} />
											</div>
											<div className="cong-content">
												<p className="cong-orng-para">Congratulations!</p>
												<p className="cong-blk-text">Your policy has been booked. </p>
											</div>
										</div>
										<div className="ins-card-head">
											<div className="ins-name-head">
												<img src="https://cdn.docprime.com/media/lab/images/90x60/35bce4401ab5ea4b346186238d17e67d.jpg" />
												<p>
													OPD Insurance by <span>Apollo Munich</span>
												</p>
											</div>
										</div>
									</div>
									<div className="widget">
										<div className="fnl-radio">
											<div className="ins-radio-table-container">
												<p className="ins-rd-fist"> Just few more questions regarding medical history then download your certficate of Insurance</p>
												<p className="ins-rd-second">Did anyone ever diagnose with the following disease?</p>
											</div>
											<div className="ins-radio-main-table">
												<table className="table">
													<thead>
														<tr>
															<th></th>
															<th><p>Self</p></th>
															<th><p>Wife</p></th>
															<th><p>Child 1</p></th>
															<th><p>Child 2</p></th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>
																<p>Hypertension</p>
															</td>
															<td>
																<label className="container-radio">
																	<input type="radio" checked name="Male" />
																	<span className="doc-checkmark"></span>
																</label>
															</td>
															<td>
																<label className="container-radio">
																	<input type="radio" name="Male" />
																	<span className="doc-checkmark"></span>
																</label>
															</td>
															<td>
																<label className="container-radio">
																	<input type="radio" name="Male" />
																	<span className="doc-checkmark"></span>
																</label>
															</td>
															<td>
																<label className="container-radio">
																	<input type="radio" name="Male" />
																	<span className="doc-checkmark"></span>
																</label>
															</td>
														</tr>
														<tr>
															<td>
																<p>Hypertension</p>
															</td>
															<td>
																<label className="container-radio">
																	<input type="radio" checked name="Male" />
																	<span className="doc-checkmark"></span>
																</label>
															</td>
															<td>
																<label className="container-radio">
																	<input type="radio" name="Male" />
																	<span className="doc-checkmark"></span>
																</label>
															</td>
															<td>
																<label className="container-radio">
																	<input type="radio" name="Male" />
																	<span className="doc-checkmark"></span>
																</label>
															</td>
															<td>
																<label className="container-radio">
																	<input type="radio" name="Male" />
																	<span className="doc-checkmark"></span>
																</label>
															</td>
														</tr>
														<tr>
															<td>
																<p>Hypertension</p>
															</td>
															<td>
																<label className="container-radio">
																	<input type="radio" checked name="Male" />
																	<span className="doc-checkmark"></span>
																</label>
															</td>
															<td>
																<label className="container-radio">
																	<input type="radio" name="Male" />
																	<span className="doc-checkmark"></span>
																</label>
															</td>
															<td>
																<label className="container-radio">
																	<input type="radio" name="Male" />
																	<span className="doc-checkmark"></span>
																</label>
															</td>
															<td>
																<label className="container-radio">
																	<input type="radio" name="Male" />
																	<span className="doc-checkmark"></span>
																</label>
															</td>
														</tr>
														<tr>
															<td>
																<p>Hypertension</p>
															</td>
															<td>
																<label className="container-radio">
																	<input type="radio" checked name="Male" />
																	<span className="doc-checkmark"></span>
																</label>
															</td>
															<td>
																<label className="container-radio">
																	<input type="radio" name="Male" />
																	<span className="doc-checkmark"></span>
																</label>
															</td>
															<td>
																<label className="container-radio">
																	<input type="radio" name="Male" />
																	<span className="doc-checkmark"></span>
																</label>
															</td>
															<td>
																<label className="container-radio">
																	<input type="radio" name="Male" />
																	<span className="doc-checkmark"></span>
																</label>
															</td>
														</tr>
														<tr>
															<td>
																<p>Hypertension</p>
															</td>
															<td>
																<label className="container-radio">
																	<input type="radio" checked name="Male" />
																	<span className="doc-checkmark"></span>
																</label>
															</td>
															<td>
																<label className="container-radio">
																	<input type="radio" name="Male" />
																	<span className="doc-checkmark"></span>
																</label>
															</td>
															<td>
																<label className="container-radio">
																	<input type="radio" name="Male" />
																	<span className="doc-checkmark"></span>
																</label>
															</td>
															<td>
																<label className="container-radio">
																	<input type="radio" name="Male" />
																	<span className="doc-checkmark"></span>
																</label>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</section>
								{/* ===============isurance 5th screen=============== */}

								{/* ===============isurance 6th screen=============== */}
								<section className="section-margin-bottom">
									<div className="widget cong-margin-btm">
										<div className="ins-final-screen-continer">
											<div className="ins-card-head">
												<div className="ins-name-head">
													<img src="https://cdn.docprime.com/media/lab/images/90x60/35bce4401ab5ea4b346186238d17e67d.jpg" />
													<p>
														OPD Insurance by <span>Apollo Munich</span>
														<span className="ins-active-container">
															<p>Active <img src={ASSETS_BASE_URL + "/img/chk-green.svg"} /></p>
														</span>
													</p>
												</div>
											</div>
											<div className="ins-policy-date">
												<div className="details-flex-cont">
													<div className="ins-policy-details">
														<p>Policy Purchase Date</p>
														<span>11<sup>th</sup> Oct 2018</span>
													</div>
													<div className="ins-policy-details">
														<p>Policy Purchase Date</p>
														<span>11<sup>th</sup> Oct 2018</span>
													</div>
												</div>
												<div className="ins-policy-members-details">
													<p><span>Premium</span> : Rs 2999</p>
													<p><span>Praposer Name </span> : Mr. Rishabh Mehrotra</p>
													<p><span>Policy Number</span> : DPHEALTHOPD12345</p>
													<p><span>Cover</span> : 4 Members</p>
													<ul>
														<li>Rishabh Mehrotra</li>
														<li> Mehrotra</li>
														<li> Wife Name</li>
														<li>child Name</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</section>
								{/* ===============isurance 6th screen=============== */}
								<button className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg static-btn">Proceeed
								</button>
							</div>

							<ChatPanel />
						</div>
					</section>
				</div>
			</div>
		)
	}
}

export default Insurance