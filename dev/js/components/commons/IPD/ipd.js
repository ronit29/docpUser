import React from 'react';
import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'
import Footer from '../Home/footer'


class IPD extends React.Component{

	render(){

		return(
			 <div className="profile-body-wrap">
                <ProfileHeader showSearch={true} />
                <section className="container parent-section book-appointment-section breadcrumb-mrgn">

	                <div className="row main-row parent-section-row">
	                    <LeftBar />
	                    <div className="col-12 col-md-7 col-lg-7 center-column">

	                    

	                    	<section className="filter-row sticky-header mbl-stick">
			                   <div className="top-filter-tab-container">
			                      <div className="top-filter-tabs-select"><img src="https://cdn.docprime.com/cp/assets/img/sort.svg" style={{ width: '18px', marginRight: '5px' }} /><span>Sort</span></div>
			                      <div className="top-filter-tabs-select"><img src="https://cdn.docprime.com/cp/assets/img/filter.svg" style={{ width: '18px', marginRight: '5px' }} /><span>Filter</span></div>
			                   </div>
			                   <div className="container-fluid">
			                      <div className="row">
			                         <div className="col-12">
			                            <div className="filter-pdng">
			                               <div className="filter-title">126 Results found for <span className="fw-700"> Abdominal Multiple/Large Myomectomy</span>
			                                   <span>
			                                       <span className="location-edit" style={{color: 'rgb(246, 132, 58)', cursor: 'pointer'}}> in Gurgoan , Sector 44 </span>
			                                       <img src="https://cdn.docprime.com/cp/assets/img/customer-icons/edit.svg" className="ic-edit ipd-edit" />
			                                   </span>
			                                </div>
			                            </div>
			                         </div>
			                      </div>
			                   </div>
			                </section>

	                       <div className ="ipd-section">
	                          <div className="full-widget">
			                     <h4 className="section-heading secHead">Top Hospitals for Abdominal Multiple/Large Myomectomy in Gurgaon</h4>
			                     <nav className="tab-head">
			                        <div className="container">
			                           <div className="nav nav-tabs nav-top-head" id="nav-tab" role="tablist">
			                              <a className="nav-item nav-link active" id="overview-tab" data-toggle="tab" href="#nav-overview" role="tab">About
			                              </a>
			                              <a className="nav-item nav-link" id="hospital-tab" data-toggle="tab" href="#nav-hospital" role="tab">Hospitals
			                              </a>
			                              <a className="nav-item nav-link" id="doc-tab" data-toggle="tab" href="#nav-doc" role="tab">Doctors
			                              </a>
			                           </div>
			                        </div>
			                     </nav>
			                   </div>
	                    	  <div className="tab-content">
			                     <div className="tab-pane fade show active" id="nav-overview">
			                        <h4 className="section-heading top-sc-head">Abdominal Multiple/Large Myomectomy 
			                           <img src="https://cdn.docprime.com/cp/assets/img/icons/info.svg" alt="" className="info-img" />
			                        </h4>
			                        <ul>
			                           <li className="widget pat-info">
			                              <img src="assets/images/rupees.png" alt="" className="img-list" />
			                              <div>Approximate Cost:  <span>INR 1.5 L to 4 L</span></div>
			                           </li>
			                           <li className="widget pat-info">
			                              <img src="assets/images/injection.png" alt="" className="img-list" />
			                              <div>Anesthesia Type:  <span>General</span></div>
			                           </li>
			                           <li className="widget pat-info">
			                              <img src="assets/images/lapar.png" alt="" className="img-list" />
			                              <div>Techniques Used:  <span>Laparoscopic</span></div>
			                           </li>
			                           <li className="widget pat-info">
			                              <img src="assets/images/clock.png" alt="" className="img-list" />
			                              <div>Procedure Duration:  <span> 4-5 hours</span></div>
			                           </li>
			                           <li className="widget pat-info">
			                              <img src="assets/images/stay-duration.png" alt="" className="img-list" />
			                              <div>Hospital Stay Duration: <span>3 Days</span></div>
			                           </li>
			                           <li className="widget pat-info">
			                              <img src="assets/images/health-insurance.png" alt="" className="img-list" />
			                              <div>Eligible for Health Insurance:  <span>Yes</span></div>
			                           </li>
			                        </ul>
			                        <h4 className="section-heading">Procedure </h4>
			                          <div className="widget">
			                             Most people think that knee replacement means the original knee will be taken out and replaced with some sort of a metallic joint. It is but natural that such a thought will create anxiety in anyone. The nametotal knee replacement’ is a misnomer as there is no operation
			                             <a href="javascript:void(0);">Read More</a>
			                          </div>
			                     </div>
			                     <div className="tab-pane fade" id="nav-hospital">
			                        <div className="widget">
			                           <div className="loc-info">
			                              <img src="https://cdn.docprime.com/cp/assets/img/new-loc-ico.svg" alt="loc" className="img-loc" />
			                              <p>Huda City Centre Mall Sector 52 Gurgaon | 3.5 Km</p>
			                           </div>
			                           <div className="hospital-info">
			                              <div className="left-side-info">
			                                 <h4 className="section-heading">Fortis Hospital Gurgaon</h4>
			                                 <div className="hos-certified"><img src="assets/images/certified.png" className="img-certified" />CAP | ISO Certified</div>
			                                 <div className="hos-popularity">
			                                    <span className="pop-txt">Popular</span> 
			                                    <span className="pop-star">4.5</span> 
			                                    <img src="assets/images/star.png" alt="star" className="img-star" />
			                                 </div>
			                              </div>
			                              <div class="right-side-info">
			                                 <img src="assets/images/hospital-img.png" alt="" className="img-fluid img-hospital" />
			                              </div>
			                           </div>
			                           <div className="hospital-info hsptl-info">
			                              <div className="left-side-info">
			                                 <div className="hos-certified hs-certified"><img src="assets/images/bed.png" alt="" className="img-bed" />700 beds</div>
			                                 <div className="hos-certified"><img src="assets/images/multi-speciality.png" alt="" className="img-splty" />Multi Speciality</div>
			                              </div>
			                              <div className="right-side-info">
			                                 <p className="ins-provider"><img src="assets/images/green-tick.png" alt="" className="img-tick" />12 Health Insurance Providers</p>
			                                 <a href="javascript:void(0);" className="btn-estimate">Get Cost Estimate</a>
			                              </div>
			                           </div>
			                        </div>
  
                       				 <a href="javascript:void(0);" class="btn-view-hospital">View all Hospitals</a>
                    				 </div>
				                     <div className="tab-pane fade" id="nav-doc">
				                        Coming Soon
				                     </div>
                 				 </div>

                 				 {/*form*/}
			                 		   <h4 className="section-heading pt-0">Please provide your below details, Our Medical Expert will call you for the further process</h4>
						                  <div className="info-popup">
						                     <div className="pop-head">Abdominal Multiple/Large Myomectomy </div>
						                     <div className="form-group fm-grp mt-0">
						                        <div className="lbl-txt">Name:</div>
						                        <div class="input-form"><input type="text" className="form-control" /></div>
						                     </div>
						                     <div className="form-group fm-grp">
						                        <div className="lbl-txt">Mobile No:</div>
						                        <div className="input-form"><input type="text" className="form-control" /></div>
						                     </div>
						                     <div className="form-group fm-grp">
						                        <div className="lbl-txt">Email Id:</div>
						                        <div className="input-form"><input type="text" className="form-control" /></div>
						                        <span className="error-msg">Required</span>
						                     </div>
						                     <div className="form-group fm-grp mrg-mb0">
						                        <div className="lbl-txt gender-label">gender:</div>
						                        <div className="input-form dis-flx">
						                           <div className="dtl-radio">
						                              <label className="container-radio">Male
						                              <input type="radio" name="gender" value="on" />
						                              <span className="doc-checkmark"></span>
						                              </label>
						                           </div>
						                           <div className="dtl-radio">
						                              <label className="container-radio">Female
						                              <input type="radio" name="gender" value="on" />
						                              <span className="doc-checkmark"></span>
						                              </label>
						                           </div>
						                           <div className="dtl-radio">
						                              <label className="container-radio">Others
						                              <input type="radio" name="gender" value="on" />
						                              <span className="doc-checkmark"></span>
						                              </label>
						                           </div>
						                        </div>
						                     </div>
						                     <div className="form-group fm-grp mrg-mt0">
						                        <div className="lbl-txt">Age:</div>
						                        <div className="input-form"><input type="text" class="form-control" /></div>
						                     </div>
						                  </div>
						                  <div className="btn-search-div btn-apply-div btn-sbmt">
						                     <a href="javascript:void(0);" class="btn-search">Submit</a>
						                  </div>
			                  {/*form*/}

			                  {/*Hospital view*/}
			                     <div className="hs-card">    
					              <div className="banner mt-21">
					                <img src="assets/images/banner-forties.jpg" className="img-fluid" alt="" />  
					              </div>
					              <div className="hospital-details">
					                <div className="hs-nme">
					                   <img src="assets/images/hospital-img.png" alt="" className="" />  
					                </div>
					                  <h4 className="section-heading">Fortis Memorial Research Institute</h4>
					                <div className="hsptl-info">
					                  <div className="hos-certified"><img src="assets/images/bed.png" alt="" className="img-bed" />700 beds</div>
					                  <div className="hos-certified"><img src="assets/images/multi-speciality.png" alt="" className="img-splty" />Multi Speciality</div>
					                </div>
					                <div className="opd-timing">
					                  <span><b>OPD Timing:</b> - 8:00 AM - 6:00 PM | </span>
					                  <span className="opd-status"> Open Today</span>
					                </div>
					                 <hr />
					                <ul className="hsptl-contact text-left">
					                  <li>
					                    <div className="hsptl-title hs-tle hsptl-photo">Photo</div>
					                    <div className="hsptl-img">
					                      <span><img src="assets/images/xs.jpeg" alt="" /></span>
					                      <span><img src="assets/images/xs.jpeg" alt="" /></span>
					                      <span className="btn-more-img">+25<br /> more</span>
					                    </div>
					                  </li>
					                  <li className="li-address">
					                    <div className="hsptl-title hs-tle">Address:</div>
					                    <div className="hsptl-title hsptl-add">Opp Huda City Metro Station, Sector 44, Gurugram, Haryana 122009</div>
					                    <div className="hsptl-title"><img src="https://cdn.docprime.com/cp/assets/img/customer-icons/map-icon.png" alt="" class="img-fluid img-map" /></div>
					                    
					                  </li>
					                  <li>
					                    <div className="hsptl-title hsptl-cntc hs-tle">Contact</div>
					                    <div className="hsptl-title hsptl-add"> 0124 496 2200</div>
					                    <div className="hsptl-title"><img src="https://cdn.docprime.com/cp/assets/img/customer-icons/map-icon.png" alt="" class="img-fluid img-map" style={{width: '20px'}} /></div>
					                  </li>
					                </ul>
					              </div>
					             </div>
					             <div className="hs-card">
					               <div className="card-head">Services</div>   
					               <div className="card-body clearfix">
					                 <ul className="hs-services">
					                   <li><img src="assets/images/food.png" alt="" /> Cafeteria </li>  
					                   <li><img src="assets/images/pharmacy.png" alt="" /> Pharmacy  </li>  
					                   <li><img src="assets/images/credit-card.png" alt="" /> Credit Card </li>  
					                   <li><img src="assets/images/radiology.png" alt="" /> Radiology </li>  
					                   <li><img src="assets/images/icu.png" alt="" /> ICU </li>  
					                   <li><img src="assets/images/waiting-area.png" alt="" />  Reception </li>  
					                   <li><img src="assets/images/help-desk.png" alt="" /> International Desk </li>  
					                   <li><img src="assets/images/telemedicine.png" alt="" /> Telemedicine </li>  
					                 </ul>
					                 <a href="javascript:void(0);" className="btn-view-hospital btn-more">+12 more</a>
					               </div>   
					             </div>
					             <div className="hs-card">
					               <div className="card-head">Treatments</div>   
					               <div className="card-body clearfix">
					                 <ul className="hs-accordian"> 
					                     <li>
					                       <div className="accordian-head">Uro Oncology (3)
					                           <img className="" src="assets/images/up-arrow.png" />
					                       </div>
					                       <p className="accordian-dtl">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
					                     </li>
					                     <li>
					                       <div className="accordian-head">Uro Oncology (3)
					                           <img className="" src="assets/images/down-arrow.png" />
					                       </div>
					                       <p className="accordian-dtl d-none">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
					                     </li>
					                     <li>
					                       <div className="accordian-head">Uro Oncology (3)
					                           <img className="" src="assets/images/down-arrow.png" />
					                       </div>
					                       <p className="accordian-dtl d-none">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
					                     </li>
					                     <li>
					                       <div className="accordian-head">Uro Oncology (3)
					                           <img className="" src="assets/images/down-arrow.png" />
					                       </div>
					                       <p className="accordian-dtl d-none">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
					                     </li>
					                 </ul>
					                 <a href="javascript:void(0);" className="btn-view-hospital btn-more">+24 more</a>
					               </div>   
					             </div>
					             <div className="hs-card">
					               <div className="card-head">Hospital in other locations</div>   
					               <div className="card-body clearfix">
					                 <ul className="hs-accordian"> 
					                     <li>
					                       <div className="accordian-head">Fortis Hospital
					                           <img className="img-map" src="https://cdn.docprime.com/cp/assets/img/customer-icons/map-icon.png" />
					                       </div>
					                       <p className="accordian-dtl">Artemis Hospital, Sec-51, Gurgaon, Gurugram, Haryana 122001</p>
					                     </li>
					                     <li>
					                       <div className="accordian-head">Fortis Memorial Research Institute
					                           <img className="img-map" src="https://cdn.docprime.com/cp/assets/img/customer-icons/map-icon.png" />
					                       </div>
					                       <p className="accordian-dtl">Artemis Hospital, Sec-51, Gurgaon, Gurugram, Haryana 122001</p>
					                     </li>  
					                 </ul>
					                 <a href="javascript:void(0);" className="btn-view-hospital btn-more">+5 more</a>
					               </div>   
					             </div>
					             <div className="hs-card">
					               <div className="card-head">Photo Gallery</div>   
					               <div className="card-body clearfix">
					                 <ul className="hs-accordian hs-image-gallery"> 
					                     <li><img src="assets/images/xs.jpeg" /></li>
					                     <li><img src="assets/images/xs.jpeg" /></li>
					                     <li><img src="assets/images/xs.jpeg" /></li>
					                     <li><img src="assets/images/xs.jpeg" /></li>
					                     <li><img src="assets/images/xs.jpeg" /></li>
					                 </ul>
					               </div>   
					             </div>
					             <div className="hs-card">
					               <div className="card-head">About</div>   
					               <div className="card-body clearfix">
					                   Thyrocare is India's first fully automated diagnostic laboratory with a 
					                   focus on providing quality at affordable costs to laboratories and hospitals in 
					                   India and other countries.Thyrocare operates with a Centralized Processing Laboratory (CPL) in 
					                   Mumbai - India for esoteric tests; and Regional Processing Laboratory in major metro cities of 
					                   India and other parts of Asia. We have focus on strong technologies, strong brands and strong systems
					                   that enable all laboratories to give their clients the best of science and technology at an affordable
					                   cost.With a belief that 'Quality' is the heart of any intelligent management,
					               </div>   
					             </div>

					             {/*Hospital view*/}
					             {/*select policy Popup*/}
					               <div className="custom-overlay"></div>
					                    <div className="custom-popup hlth-ins-pop">
					                       <div className="cross-btn"><img src="https://cdn.docprime.com/cp/assets/img/icons/close.png" alt="" /></div>
					                       <div className="pop-head text-center">Filters</div>
					                       <div className="distance-slider">
					                        <span>Distance</span>
					                        <span className="orng-txt">0 Km to 15 Km</span>
					                       </div>
					                       <div className="distance-slider-bar">
					                         <input type="range" min="1" max="50" value="20" className="dis-slider" /> 
					                         <div className="range-value">
					                           <span>0 Km</span>  
					                           <span>50 Km</span>  
					                         </div>
					                       </div>
					                       <hr />
					                       <div className="ins-listing">
					                          <div className="pop-head">Health Insurance Providers</div>
					                          <ul>
					                            <li>
					                                <label className="ck-bx">Apollo Munich Health Insurance 
					                                    <input type="checkbox" value="on" />
					                                    <span className="checkmark"></span>
					                                </label>
					                            </li> 
					                            <li>
					                                <label className="ck-bx">Star Health and Allied  
					                                    <input type="checkbox" value="on" />
					                                    <span className="checkmark"></span>
					                                </label>
					                            </li>
					                            <li>
					                                <label className="ck-bx">Apollo Munich Health Insurance 
					                                    <input type="checkbox" value="on" />
					                                    <span className="checkmark"></span>
					                                </label>
					                            </li>
					                            <li>
					                                <label className="ck-bx">Apollo Munich Health Insurance 
					                                    <input type="checkbox" value="on" checked />
					                                    <span className="checkmark"></span>
					                                </label>
					                            </li>
					                          </ul>
					                       </div>
					                       <a href="javascript:void(0);" className="btn-view-hospital btn-show-more">Show More</a>
					                        
					                       <div className="btn-search-div btn-apply-div">
					                         <a href="javascript:void(0);" className="btn-search">Apply</a>
					                        </div>
					                    </div>
					             {/*select policy popup*/}
					             {/*Thanku popup*/}

					             	<div className="custom-popup thanks-popup text-center">
				                       <div className="cross-btn"><img src="https://cdn.docprime.com/cp/assets/img/icons/close.png" alt="" /></div>
				                       <div className="pop-head text-center">Thank you for using Docprime!</div>
				                       <p>Our medical expert will call you shortly and help you with the following:</p>
				                       <ul className="med-help">
				                         <li><img src="assets/images/tick.png" alt="" />Find the right Doctor and Hospital </li>
				                         <li><img src="assets/images/tick.png" alt="" />Comparing Surgery/Procedure cost</li>
				                         <li><img src="assets/images/tick.png" alt="" />Managing Hospital Process</li>
				                       </ul>
				                        <a href="javascript:void(0);" className="btn-search btn-singup">Signup on Docprime</a>
				                        <a href="javascript:void(0);" className="btn-coupan">&amp; Get coupons worth ₹300 </a>
				                        
				                    </div>

					             {/*Thanku popup*/}

                 		   </div>
	                  	</div>

	           
	                	<RightBar extraClass=" chat-float-btn-2"/>
	                </div>
                </section>
                <Footer />
             </div>
			)
	}
}

export default IPD