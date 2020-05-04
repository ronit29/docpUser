import React from 'react'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import ChatPanel from '../../components/commons/ChatPanel'
import CommonLoginPopup from '../../components/commons/commonFixedPopup/commonFixedPopup.js'




class Insurance extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showPopup: false
		}
	}
	cancelOverlay = () => {
		this.setState({ showPopup: false })
	}

	openPopup = () => {
		this.setState({ showPopup: true })
	}
	toggleTab() {

	}
	render() {

		return (
			<React.Fragment>
				<div>
					<div className="profile-body-wrap">
						<ProfileHeader showPackageStrip={true} />
						<section className="container article-container bottomMargin">
							<div className="row main-row parent-section-row justify-content-center">
								<div className="col-12 col-md-10 col-lg-10 center-column">
									<div className="container-fluid mt-20">
										<div>
											{/* ==================== top section with icons and listing ==================== */}
											<div className="widget mrb-10">
												<div className="ins-card-head">
													<div className="ins-name-head-div d-flex align-items-start digit-logo">
														<img className="img-fluid " width="60" src="https://www.reinsurancene.ws/wp-content/uploads/2019/03/digit-insurance-logo.jpg" />
														<p className="fw-500 mrt-10">
														Protect Against Coronavirus under Digit group Illness policy</p>
													</div>
													<div className="ins-pdf-dwnload-div d-flex align-items-center">
														<a href="" >
															<img src={ASSETS_BASE_URL + "/img/pdf-dwn.png"} />
														</a>
														<span className="fw-500">
															Policy Details</span>
													</div>
												</div>
												<div className="ins-swich-tabs-container">
													<div className="ins-tabs">
														<ul>
															<li>
																<p className=' active'>Features</p>
															</li>
															<li >
																<p className='ins-tab-inactive' >What's not Covered?</p></li>
														</ul>
													</div>
													<div className="ins-tabs-content widget-content">
														<ul>
															<li>Sum Insured Type : Individual for each member covered</li>
															<li>Room rent restriction : No Restriction</li>
															<li>ICU limit : No Restriction</li>
															<li>Pre and Post hospitalization days : 30 days and 60 days respectively</li>
															<li>Road Ambulance : 1% of the SI (up to INR 5,000)</li>
															<li>Second medical opinion : Covered</li>
															<li>Types of hospitals covered : All</li>
														</ul>
														<ul className="d-none">
															<li>Hospitalisation expenses not in lieu of treatment for Coronavirus disease (COVID-19) will not be covered.</li>
															<li>Insured members already treated for or quarantined for Coronavirus disease (COVID-19) before the policy issuance will not be covered.</li>
															<li>Treatment taken outside India will not be covered.</li>
															<li>Home hospitalisation (Domiciliary hospitalisation) expenses will not be covered.</li>
															<li>Hospitalisation expenses for patients only under investigation with inconclusive medical report will not be covered.</li>
														</ul>
													</div>
												</div>
											</div>
											{/* ==================== top section with icons and listing ==================== */}
											{/* ==================== Steps Container ==================== */}
											<div className="widget mrb-10 digi-step">
												<div className="ins-status-container">
													<div className="navigation_menu" id="">
														<ul className="navigation_tabs" id="">
															<li className="tab_inactive">
																<a href="#">Choose Your Plan</a>
															</li>
															<li className='tab_inactive'>
																<a href="#">Fill Member Details</a>
															</li>
															<li className="tab_disabled">
																<a href="#">Payment</a>
															</li>
														</ul>
													</div>
												</div>
											</div>
											{/* ==================== Steps Container ==================== */}
											{/* ==================== table Container ==================== */}
											<div className="widget mrb-10">
												<table className="table table-bordered insurance-tbl insurance-checkboxes digitTbl">
													<thead>
														<tr>
															<th className="tbl-first-head"><p>Coverage (1 Year)</p></th>
															<th className="tbl-second-head"><p>Annual Premium</p></th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td><p className="ins-dtls-members-edit">{this.props.is_edit ? 'Change Insured Plan' : 'Insured Member Details'}
															</p>
															</td>
															<td></td>
														</tr>
														<tr>
															<td>
																<div className="dtl-radio">
																	<label className="container-radio">Lorem ipsum dolor sit amet
							 		<input type="radio" checked />
																		<span className="doc-checkmark"></span>
																	</label>
																</div>
															</td>
															<td><span>₹ 8888</span></td>
														</tr>
														<tr>
															<td>
																<div className="dtl-radio">
																	<label className="container-radio">Lorem ipsum dolor sit amet
							 		<input type="radio" value='' />
																		<span className="doc-checkmark"></span>
																	</label>
																</div>
															</td>
															<td><span>₹ 8888</span></td>
														</tr>
														<tr>
															<td>
																<div className="dtl-radio">
																	<label className="container-radio">Lorem ipsum dolor sit amet
							 		<input type="radio" value='' />
																		<span className="doc-checkmark"></span>
																	</label>
																</div>
															</td>
															<td><span>₹ 8888</span></td>
														</tr>
														<tr>
															<td>
																<div className="dtl-radio">
																	<label className="container-radio">Lorem ipsum dolor sit amet
							 		<input type="radio" value='' />
																		<span className="doc-checkmark"></span>
																	</label>
																</div>
															</td>
															<td><span>₹ 8888</span></td>
														</tr>
													</tbody>
												</table>
											</div>
											{/* ==================== table Container ==================== */}
											{/*==================== self details ====================  */}
											<div className="widget mrb-10">
												<div className="widget-content">
													<div className="sub-form-input-data">
														<div>
															<p className="sub-form-hed">Self</p>
														</div>
													</div>
													<div className="dlts-cnt">
														<p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/nw-usr.svg'} /><span>Mr. Mayank Yadav</span></p>
														<p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/calendar-01.svg'} /><span>09/02/1990</span></p>
														<p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/mail-01.svg'} /><span>mayank@gmail.com</span></p>
														<p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/customer-icons/call.svg'} /><span>8800327006</span></p>
														<p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/location-01.svg'} /><span>110092</span></p>
														<p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/customer-icons/location-colored.svg'} /><span>B11/1 Vinod nagar West Delhi</span></p>
														<p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/nw-usr.svg'} /><span>Nominee Name</span></p>
														<p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/nw-usr.svg'} /><span>Brother</span></p>
													</div>
												</div>
											</div>
											{/*==================== self details ====================  */}
											{/* ==================== dummy data ====================  */}
											<div className="widget mrb-10 digit-input-container">
												<div className="widget-content">
													<div className="ins-sub-forms">
														{/* <hr className="ins-internal-hr" /> */}
														<div className="sub-form-input-data">
															<div>
																<p className="sub-form-hed">Details</p>
															</div>
															<div className="sub-form-hed-click" >
																Add More <img src={ASSETS_BASE_URL + "/img/rgt-arw.svg"} />
															</div>
														</div>
														<div className="col-12">
															<button className='label-names-buttons btn-active ' name="title" value='mr.' data-param='title' >Mr.</button>
															<button className='label-names-buttons' name="title" value='miss.' data-param='title' >Ms.</button>
															<button className='label-names-buttons' value='mrs.' name="title" data-param='title'  >Mrs.</button>
														</div>
														<div className="row no-gutters">

															<div className="col-6">
																<div className="ins-form-group inp-margin-right ">
																	<input type="text" id="name1" className="form-control ins-form-control" required autoComplete="off" name="name" data-param='name' />
																	<label className="form-control-placeholder" htmlFor="name1">First Name</label>
																	<img src={ASSETS_BASE_URL + "/img/nw-usr.svg"} />
																</div>

															</div>
															<div className="col-6">
																<div className="ins-form-group inp-margin-right ">
																	<input type="text" id="middle_name" className="form-control ins-form-control" required autoComplete="off" name="middle_name" value="" data-param='middle_name' />
																	<label className="form-control-placeholder" htmlFor="middle_name">Middle Name</label>
																	<img src={ASSETS_BASE_URL + "/img/nw-usr.svg"} />
																</div>
															</div>
															<div className="col-6">
																<div className="ins-form-group inp-margin-left">
																	<input type="text" id="last_name" className="form-control ins-form-control" required autoComplete="off" name="last_name" data-param='last_name' />
																	<label className="form-control-placeholder" htmlFor="last_name">Last Name</label>
																	<img src={ASSETS_BASE_URL + "/img/nw-usr.svg"} />
																</div>
															</div>
															<div className="col-12">
																<div className="ins-form-group">
																	<input type="date" id="isn-date" className="form-control ins-form-control ins-date-picker-style" required autoComplete="off" name="dob" data-param='dob' value='date' />
																	<label className="form-control-placeholder datePickerLabel" htmlFor="ins-date">Date of birth</label>
																	<img src={ASSETS_BASE_URL + "/img/calendar-01.svg"} />
																</div>
															</div>
															<div className="col-12">
																<div className="ins-form-group">
																	<input type="text" className='form-control ins-form-control' required id="mil" />
																	<label className='form-control-placeholder ' htmlFor="mil">Email</label>
																	<img src={ASSETS_BASE_URL + "/img/mail-01.svg"} />
																</div>
															</div>
															<div className="col-12">
																<div className="ins-form-group">
																	<input type="text" id="mbl" className="form-control ins-form-control ins-date-picker-style" required autoComplete="off" name="dob" data-param='dob' value='' />
																	<label className="form-control-placeholder" htmlFor="mbl">Mobile</label>
																	<img src={ASSETS_BASE_URL + "/img/customer-icons/call.svg"} />
																</div>
															</div>
															<div className="col-12">
																<div className="ins-form-group">
																	<input type="text" id="pin" className="form-control ins-form-control ins-date-picker-style" required autoComplete="off" name="dob" data-param='dob' value='' />
																	<label className="form-control-placeholder" htmlFor="pin">Pin Code</label>
																	<img src={ASSETS_BASE_URL + "/img/location-01.svg"} />
																</div>
															</div>
															<div className="col-12">
																<div className="ins-form-group">
																	<input type="text" id="adr" className="form-control ins-form-control ins-date-picker-style" required autoComplete="off" name="dob" data-param='dob' value='' />
																	<label className="form-control-placeholder" htmlFor="adr">Address</label>
																	<img src={ASSETS_BASE_URL + "/img/location-01.svg"} />
																</div>
															</div>
															<div className="col-12">
																<div className="ins-form-group inp-margin-right ">
																	<input type="text" id="nomName" className="form-control ins-form-control" required autoComplete="off" name="name" data-param='name' />
																	<label className="form-control-placeholder" htmlFor="nomName">Nominee Name</label>
																	<img src={ASSETS_BASE_URL + "/img/nw-usr.svg"} />
																</div>
															</div>
															<div className="col-12">
																<div className="ins-form-group">
																	<select className="ins-select-drop" id="relation_dropdown" >
																		<option data-param="relation" disabled selected hidden value="relation">Nominee Relation</option>
																		<option data-param="relation" value="spouse">SPOUSE</option>
																		<option data-param="relation" value="son">SON</option>
																		<option data-param="relation" value="daughter">DAUGHTER</option>
																	</select>
																	<img src={ASSETS_BASE_URL + "/img/nw-usr.svg"} />
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											{/* ==================== dummy data ==================== */}
											{/* ==================== Payment ==================== */}
											<div className="widget mrb-10">
												<div className="widget-header text-center action-screen-header">
													<p className="fw-500 cancel-appointment-head">Confirm Payment</p>
													<hr />
												</div>
												<div className="payment-content-div">
													<p className="payment-content fw-500">Premium Amount</p>
													<p className="payment-content fw-500">&#8377; 0,0</p>
												</div>
												<div className="payment-content-div">
													<p className="payment-content fw-500">GST</p>
													<p className="payment-content fw-500">&#8377; 0,0</p>
												</div>
												<div className="payment-content-div">
													<p className="payment-content fw-500">Policy StartDate</p>
													<p className="payment-content fw-500">--/--/--</p>
												</div>
												<div className="payment-content-div">
													<p className="payment-content fw-500">Amount Payable</p>
													<p className="payment-content fw-500">&#8377; 400</p>
												</div>
											</div>
											<div className="term-cont-digi">
												<label className="ck-bx" htmlform="test11" style={{ 'fontWeight': '500', 'fontSize': '13px' }}>
													<input type="checkbox" defaultChecked className="ins-chk-bx" value="" id="test11" name="fruit-1" />
													<span className="checkmark"></span>I Agree to the </label>
												<p onClick={this.openPopup}>Terms and Conditions</p>
											</div>
										</div>
										<div className="bottomMargin"></div>
										{/* ==================== Payment ==================== */}
										{/* ==================== after Payment ==================== */}
										<div className="widget mrb-10">
											<div className="ins-card-head">
												<div className="ins-name-head-div d-flex align-items-start digit-logo">
													<img className="img-fluid " width="60" src="https://www.reinsurancene.ws/wp-content/uploads/2019/03/digit-insurance-logo.jpg" />
													<p className="fw-500 mrt-10">
													Protect Against Coronavirus under Digit group Illness policy<br/>
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
														<span>11th Oct 2020</span>
													</div>
													<div className="ins-policy-details">
														<p>Valid Upto</p>
														<span>11th Oct 2021</span>
													</div>
												</div>
												<div className="ins-policy-members-details mt-20">
													<p><span>Premium</span> : Rs 2000</p>
													<p style={{ 'textTransform': 'capitalize' }}><span>Proposer Name </span> : Mayank Yadav</p>
													<p><span>Policy Number</span> : DIDIG22926765</p>
													<p><span>Cover</span> : 4 'Members'</p>
													<ul>
														<li style={{ 'textTransform': 'capitalize' }}>
															<span className="insa-tbl-names"> Maddy: </span>
															<span className="insa-sub-tbl-names"> Shady</span>
															<span className="insa-sub-tbl-names"> TestIng</span>
														</li>
													</ul>
												</div>
											</div>
										</div>
										{/* ==================== after Payment ==================== */}
									</div>
								</div>
							</div>
							{/* ==================== Common button ==================== */}
							<div className="sticky-btn fixed insuBtnsContainer">
								<button className="insu-right-orng-btn ins-buy-btn">Buy Now</button>
							</div>
							{/* ==================== Common button ==================== */}
						</section>
					</div>
				</div >

				{/* ==================== PopUp ==================== */}
				{
					this.state.showPopup ?
						<CommonLoginPopup cancelOverlay={this.cancelOverlay} className="test-clas">
							<div className="digitTNC-cont">
								<h3>Terms & Conditions</h3>
								<ul>
									<li>Coverage is applicable only if the insured member(s) is/are diagnosed with and hospitalised solely for COVID-19.</li>
									<li>Comorbidity exclusion clause- Insured Member(s) is/are not suffering from fever or suffering /suffered from diabetes, hypertension, disease related to heart/lungs/kidney/liver, cancer, stroke or any condition that needs ongoing medication or the insured members(s) is/are due for any medical treatment, at the time of buying this policy</li>
									<li>Positive test report for Coronavirus disease (COVID-19) conducted from Govt/ICMR Authorized test Centre in India from National Institute of Virology, Pune. <a
										href="https://icmr.nic.in/sites/default/files/upload_documents/Testing_sites_for_COVID19.pdf" target="_blank">https://icmr.nic.in/sites/default/files/upload_documents/Testing_sites_for_COVID19.pdf</a></li>
									<li>Hospitalisation expenses due to Quarantine for COVID-19 are also covered if the insured member(s) was/were suffering from COVID -19 during the hospitalisation and the said hospitalisation was solely due to COVID-19.</li>
									<li>Child below 18 years can be covered if either parent also takes the policy</li>
									<li>*Parents can also be covered in case of employer – employee policy provided they are below age 60.</li>
								</ul>
							</div>
						</CommonLoginPopup> : ''
				}
				{/* ==================== PopUp ==================== */}
			</React.Fragment>
		)
	}
}

export default Insurance