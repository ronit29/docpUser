import React from 'react';

class NonBookableDoctor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	render() {
		return (
			<div className="search-el-popup-overlay  cancel-overlay-zindex">
				<div className="search-el-popup non-book-pop">
					<div className="widget p-relative">
					<img className="non-book-cls-btn" src= {ASSETS_BASE_URL + "/img/icons/close.png"}/>
						<div className="non-bok-hdng-container">
							<p className="non-bok-heading">Dr Vandana is not bookable</p>
							<p className="non-bok-subhdng">See bookable doctors with great discounts below</p>
						</div>
						<div className="non-bok-cards-container">
							<div className="cstm-docCard mb-3">
								<div className="cstm-docCard-content">
									<div className="row no-gutters">
										<div className="col-8">
											<a href="/dr-scbaluja-cardiologist-in-sector-41-gurgaon-dpp" title="Dr. S.C.Baluja"><h2 className="cstmDocName">Dr. S.C.Baluja</h2></a>
											<div className="cstm-doc-details-container">
												<div className="cstm-doc-img-container">
													<div><a href="javascript:;" title="Dr. S.C.Baluja">
														<div style={{ width: '50px', height: '50px', fontSize: '1.5em' }}>
															<img className="img-round" src="https://cdn.docprime.com/media/doctor/images/80x80/dr-scbaluja-cardiologist.jpg" alt="Dr. S.C.Baluja" title="Dr. S.C.Baluja" />
														</div>
													</a>
														<p className="cstm-varify">Verified</p>
													</div>
												</div>
												<div className="cstm-doc-content-container"><h3>Cardiologist</h3><h3><span>MBBS | </span><span>MD | </span>
													<span>FICP </span>
												</h3>
													<h3 style={{ marginBottom: '5px' }}>53 Years Experience</h3>
													<p><img className="cstmTimeImg" src="/assets/img/watch-date.svg" />10:30 AM to 12:30 PM</p>
												</div>
											</div>
											<div className="cstm-doc-rtng">
												<img src="/assets/img/customer-icons/rating-star-filled.svg" className="img-cstm-docrating" style={{ width: '12px', marginRight: '2px', height: '12px' }} />
												<img src="/assets/img/customer-icons/rating-star-filled.svg" className="img-cstm-docrating" style={{ width: '12px', marginRight: '2px', height: '12px' }} />
												<img src="/assets/img/customer-icons/rating-star-filled.svg" className="img-cstm-docrating" style={{ width: '12px', marginRight: '2px', height: '12px' }} />
												<img src="/assets/img/customer-icons/rating-star-filled.svg" className="img-cstm-docrating" style={{ width: '12px', marginRight: '2px', height: '12px' }} />
												<img src="/assets/img/customer-icons/rating-star-filled.svg" className="img-cstm-docrating" style={{ width: '12px', marginRight: '2px', height: '12px' }} />
												<span>(1)</span>
											</div>
										</div>
										<div className="col-4">
											<p className="cstm-doc-price">Docprime Price</p>
											<p className="cst-doc-price">₹ 620 <span className="cstm-doc-cut-price">₹ 700 </span></p><p className="cstm-cpn">11% Off<span><br></br>(includes Coupon)</span>
											</p>
											<button className="cstm-book-btn">Book Now</button>
										</div>
									</div>
								</div>
								<div className="cstmCardFooter">
									<div className="cstmfooterContent">
										<h3>
											<img src="/assets/img/cstmhome.svg" style={{ width: '16px' }} />
											<a href="/mayom-hospital-gurgaon-in-sector-41-gurgaon-hpp" style={{ color: 'rgb(0, 0, 0)' }}>Mayom Hospital - Gurgaon</a>
										</h3>
										<a href="/cardiologist-in-sector-41-gurgaon-sptlitcit">
											<p className="mb-rmv">
												<img src="/assets/img/new-loc-ico.svg" style={{ width: '10px', marginLeft: '3px' }} />Sector 41, Gurgaon</p>
										</a>
									</div>
									<div className="cstmDocLoc"><p className="">
										<img src="/assets/img/cstmdist.svg" />0.9km</p></div>
								</div>
							</div>
							<div className="cstm-docCard mb-3">
								<div className="cstm-docCard-content">
									<div className="row no-gutters">
										<div className="col-8">
											<a href="/dr-scbaluja-cardiologist-in-sector-41-gurgaon-dpp" title="Dr. S.C.Baluja"><h2 className="cstmDocName">Dr. S.C.Baluja</h2></a>
											<div className="cstm-doc-details-container">
												<div className="cstm-doc-img-container">
													<div><a href="javascript:;" title="Dr. S.C.Baluja">
														<div style={{ width: '50px', height: '50px', fontSize: '1.5em' }}>
															<img className="img-round" src="https://cdn.docprime.com/media/doctor/images/80x80/dr-scbaluja-cardiologist.jpg" alt="Dr. S.C.Baluja" title="Dr. S.C.Baluja" />
														</div>
													</a>
														<p className="cstm-varify">Verified</p>
													</div>
												</div>
												<div className="cstm-doc-content-container"><h3>Cardiologist</h3><h3><span>MBBS | </span><span>MD | </span>
													<span>FICP </span>
												</h3>
													<h3 style={{ marginBottom: '5px' }}>53 Years Experience</h3>
													<p><img className="cstmTimeImg" src="/assets/img/watch-date.svg" />10:30 AM to 12:30 PM</p>
												</div>
											</div>
											<div className="cstm-doc-rtng">
												<img src="/assets/img/customer-icons/rating-star-filled.svg" className="img-cstm-docrating" style={{ width: '12px', marginRight: '2px', height: '12px' }} />
												<img src="/assets/img/customer-icons/rating-star-filled.svg" className="img-cstm-docrating" style={{ width: '12px', marginRight: '2px', height: '12px' }} />
												<img src="/assets/img/customer-icons/rating-star-filled.svg" className="img-cstm-docrating" style={{ width: '12px', marginRight: '2px', height: '12px' }} />
												<img src="/assets/img/customer-icons/rating-star-filled.svg" className="img-cstm-docrating" style={{ width: '12px', marginRight: '2px', height: '12px' }} />
												<img src="/assets/img/customer-icons/rating-star-filled.svg" className="img-cstm-docrating" style={{ width: '12px', marginRight: '2px', height: '12px' }} />
												<span>(1)</span>
											</div>
										</div>
										<div className="col-4">
											<p className="cstm-doc-price">Docprime Price</p>
											<p className="cst-doc-price">₹ 620 <span className="cstm-doc-cut-price">₹ 700 </span></p><p className="cstm-cpn">11% Off<span><br></br>(includes Coupon)</span>
											</p>
											<button className="cstm-book-btn">Book Now</button>
										</div>
									</div>
								</div>
								<div className="cstmCardFooter">
									<div className="cstmfooterContent">
										<h3>
											<img src="/assets/img/cstmhome.svg" style={{ width: '16px' }} />
											<a href="/mayom-hospital-gurgaon-in-sector-41-gurgaon-hpp" style={{ color: 'rgb(0, 0, 0)' }}>Mayom Hospital - Gurgaon</a>
										</h3>
										<a href="/cardiologist-in-sector-41-gurgaon-sptlitcit">
											<p className="mb-rmv">
												<img src="/assets/img/new-loc-ico.svg" style={{ width: '10px', marginLeft: '3px' }} />Sector 41, Gurgaon</p>
										</a>
									</div>
									<div className="cstmDocLoc"><p className="">
										<img src="/assets/img/cstmdist.svg" />0.9km</p></div>
								</div>
							</div>
						</div>
						<p className="viw-all-non-bok">View All Top General Physicians Near You</p>
					</div>

				</div>
			</div>
		)
	}
}

export default NonBookableDoctor