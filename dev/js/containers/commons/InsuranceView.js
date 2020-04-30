import React from 'react'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import ChatPanel from '../../components/commons/ChatPanel'



class Insurance extends React.Component {
	toggleTabs() {

	}
	render() {

		return (
			<div>
				<div className="profile-body-wrap">
					<ProfileHeader showPackageStrip={true} />

					<section className="container article-container bottomMargin">
						<div className="row main-row parent-section-row justify-content-center">
							<div className="col-12 col-md-10 col-lg-10 center-column">
								<div className="container-fluid mt-20">
									{/* <div className="ins-landing-container">
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
									</div> */}
									<div>
										<div className="widget mrb-10">
											<div className="ins-card-head">
												<div className="ins-name-head-div d-flex align-items-start digit-logo">
													<img className="img-fluid " width="60" src="https://www.reinsurancene.ws/wp-content/uploads/2019/03/digit-insurance-logo.jpg" />
													<p className="fw-500 mrt-10">
														Digit Covid Group insurance</p>
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
													{/* <div style={{ paddingBottom: 10 }}>
														<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
															<a style={{ paddingLeft: '12px', fontWeight: '500', fontSize: '12px', color: '#f78631', textDecoration: 'underline', cursor: 'pointer' }} href="" id="terms_condition">T&C apply</a>
															<a style={{ paddingRight: '12px', fontWeight: '500', fontSize: '12px', color: '#f78631', textDecoration: 'underline', cursor: 'pointer' }} href='/insurance/network' >View Network</a>
														</div>

													</div> */}
												</div>
											</div>
										</div>
										{/* <div className="mt-0" style={{ padding: '0 4px 10px' }} >
												<div className="d-flex align-items-start">
													<div className="d-flex ins-form-info align-items-center text-center">
														<p className="fw-500 mrb-10">Coverage (1 Year)</p>
														<p className="fw-500">dummy</p>
													</div>
													<div className="d-flex ins-form-info align-items-center text-center">
														<p className="fw-500 mrb-10">Annual Premium</p>
														<p className="fw-500">₹ 9999</p>
													</div>
												</div>
												<div className="mrt-10" style={{ cursor: 'pointer', paddingLeft: 5 }}>
													<p className="fw-500 text-primary">Select another plan':'Edit'</p>
												</div>
											</div> */}
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
															{/* <span style={{ 'cursor': 'pointer' }}>EDIT</span> */}
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
										{/* self details  */}
										<div className="widget mrb-10">
											<div className="widget-content">
												<div className="sub-form-input-data">
													<div>
														<p className="sub-form-hed">Self</p>
													</div>
												</div>
												<div className="dlts-cnt">
													<p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/nw-usr.svg'} /><span>Mayank Yadav</span></p>
													<p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/calendar-01.svg'} /><span>09/02/1990</span></p>
													<p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/mail-01.svg'} /><span>mayank@gmail.com</span></p>
													<p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/location-01.svg'} /><span>110092</span></p>
													<p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/customer-icons/location-colored.svg'} /><span>B11/1 Vinod nagar West Delhi</span></p>
													<p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/nw-usr.svg'} /><span>Nominee Name</span></p>
													<p><img className="img-fluid" src={ASSETS_BASE_URL + '/img/nw-usr.svg'} /><span>Brother</span></p>
												</div>
											</div>
										</div>
										{/* self details  */}
										{/* dummy data  */}
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
												<p>Terms and Conditions</p>
										</div>




										{/* <div className="payment-content-btn text-center">
											<button className="fw-500">Done</button>
										</div> */}

									</div>
									<div className="bottomMargin"></div>
									{/* dummy data  */}

								</div>
							</div>
						</div>
						<div className="sticky-btn fixed insuBtnsContainer">
							<button className="insu-right-orng-btn ins-buy-btn">Buy Now</button>
						</div>
					</section>
				</div>
			</div >
		)
	}
}

export default Insurance