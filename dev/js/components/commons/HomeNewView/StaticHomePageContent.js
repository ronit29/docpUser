import React from 'react';

export default (props)=> {

	return(
		<React.Fragment>
		 {/******  Our Partners section *********/}
        <section className="card-block-row">
            <h6 className="text-center fw-500 our-partner-heading-text">Our Partners</h6>
            <div className="card-slider-container partner-section d-flex justify-content-center align-item-center flex-wrap">
                <div className="partner-img-block">
                    <img className="img-fluid" src="https://cdn.docprime.com/media/web/custom_images/Image_1-12x.png" alt="Partners"/>   
                </div>
                <div className="partner-img-block">
                    <img className="img-fluid" src="https://cdn.docprime.com/media/web/custom_images/Image_2-12x.png" alt="Partners"/>   
                </div>
                <div className="partner-img-block">
                    <img className="img-fluid" src="https://cdn.docprime.com/media/web/custom_images/Image_72x.png" alt="Partners"/>   
                </div>
                <div className="partner-img-block">
                    <img className="img-fluid" src="https://cdn.docprime.com/media/web/custom_images/Image_92x.png" alt="Partners"/>   
                </div>
                <div className="partner-img-block">
                    <img className="img-fluid" src="https://cdn.docprime.com/media/web/custom_images/Image_102x.png" alt="Partners"/>   
                </div>
                <div className="partner-img-block">
                    <img className="img-fluid" src="https://cdn.docprime.com/media/web/custom_images/Image_182x.png"  alt="Partners"/>   
                </div>
                {/* <div className="partner-img-block">
                    <img className="img-fluid" src="https://cdn.docprime.com/media/web/custom_images/Image_192x.png"  alt="Partners"/>   
                </div> */}
                <div className="partner-img-block">
                    <img className="img-fluid transform-sc-1" src="https://cdn.docprime.com/media/web/custom_images/Image_6-12x.png" alt="Partners"/>   
                </div>
                <div className="partner-img-block">
                    <img style={{transform:"scale(0.5)"}} className="img-fluid" src="https://cdn.docprime.com/media/web/custom_images/Image_4-12x.png" alt="Partners"/>   
                </div>
                <div className="partner-img-block">
                    <img style={{transform:"scale(0.5)"}} className="img-fluid" src="https://cdn.docprime.com/media/web/custom_images/Image_3-12x.png" alt="Partners"/>   
                </div>
                
                <div className="partner-img-block">
                    <img style={{transform:"scale(0.5)"}} className="img-fluid" src="https://cdn.docprime.com/media/web/custom_images/Image_52x.png" alt="Partners"/>   
                </div>
                <div className="partner-img-block">
                    <img className="img-fluid" src="https://cdn.docprime.com/media/web/custom_images/Image_112x.png" alt="Partners"/>   
                </div>
            </div>
        </section>
        {/******  Our Partners section *********/}
        {/******  Where we are *********/}
        <section className="card-block-row">
            <div className="card-slider-container d-flex justify-content-between milestone-section" id="counter-section">
                <div className="round-col d-flex justify-content-center align-item-center flex-column">
                    <ul className="d-flex">
                        <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                    </ul>
                    <h3>we are here <br/>so far</h3>  
                </div>
                <div className="consultation-col">
                    <h3 className="fw-500 text-right">
                        <span>1 Lakh +</span><br/>
                        <span>Doctor and Lab Appointments</span>
                    </h3>
                    <h3 className="fw-500 text-right">
                        <span>10 Lakh +</span><br/>
                        <span>Online Consultation</span>
                    </h3>
                </div>
                <div className="consultation-col left-border">
                    <h4 className="fw-500 text-left">
                        <span id="countNum">30000 +</span><br/>
                        <span>Doctor Network</span>
                    </h4>
                    <h4 className="fw-500 text-left">
                        <span>2 Lakh +</span><br/>
                        <span>Prescription Generated</span>
                    </h4>
                    <h4 className="fw-500 text-left">
                        <span id="countNum2">5000 +</span><br/>
                        <span>Lab Network</span>
                    </h4>
                </div>
            </div>
        </section>
        {/******  Where we are *********/} 
        {/******  customer review *********/}
        <section className="card-block-row ">
            <h6 className="text-center fw-500 customer-review-heading">Our Customer Says</h6>
            <div className="card-slider-container cust-review d-flex justify-content-between cust-feedback-col">
                <div className="col-10 col-sm-4 text-center">
                    <div className="cust-img-block d-flex justify-content-center align-items-center fw-500">
                        <img src={ASSETS_BASE_URL + "/img/profile-img.png"} alt="name"/>
                        {/* <span>CNR</span> */}
                    </div>
                    <h3>Customer Name Reviewed</h3>
                    <ul className="d-flex justify-content-center align-item-center mb-2">
                        <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                    </ul>
                    <p className="text-center mb-2">Discounts are high which is nice but appointment timings shown in the app to be booked are useless , I desired to book metropolis lab for some tests as per my convenience but it shows in the app only 1000 am and 1100 am available any day so I booked for 100</p>
                    <img height="20" src={ASSETS_BASE_URL + "/img/g-play.png"} alt="google-play"/>
                </div>
                <div className="col-10 col-sm-4 text-center">
                    <div className="cust-img-block d-flex justify-content-center align-items-center fw-500">
                        {/* <img src={ASSETS_BASE_URL + "/img/profile-img.png"} alt="name"/> */}
                        <span>CNR</span>
                    </div>
                    <h3>Customer Name Reviewed</h3>
                    <ul className="d-flex justify-content-center align-item-center mb-2">
                        <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                    </ul>
                    <p className="text-center mb-2">Discounts are high which is nice but appointment timings shown in the app to be booked are useless , I desired to book metropolis lab for some tests as per my convenience but it shows in the app only 1000 am and 1100 am available any day so I booked for 100</p>
                    <img height="20" src={ASSETS_BASE_URL + "/img/g-play.png"} alt="google-play"/>
                </div>
                <div className="col-10 col-sm-4 text-center">
                    <div className="cust-img-block d-flex justify-content-center align-items-center fw-500">
                        {/* <img src={ASSETS_BASE_URL + "/img/profile-img.png"} alt="name"/> */}
                        <span>CNR</span>
                    </div>
                    <h3>Customer Name Reviewed</h3>
                    <ul className="d-flex justify-content-center align-item-center mb-2">
                        <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                    </ul>
                    <p className="text-center mb-2">Discounts are high which is nice but appointment timings shown in the app to be booked are useless , I desired to book metropolis lab for some tests as per my convenience but it shows in the app only 1000 am and 1100 am available any day so I booked for 100</p>
                    <img height="20" src={ASSETS_BASE_URL + "/img/g-play.png"} alt="google-play"/>
                </div>
            </div>

            {/* slider buttons 
            <a className="pkg-btnlft"> 
                <img height="12" src={ASSETS_BASE_URL + "/img/color-chev.svg"} alt="chev-left"/>
            </a>
            <a className="pkg-btnrgt"> 
                <img height="12" src={ASSETS_BASE_URL + "/img/color-chev.svg"} alt="chev-right"/>
            </a>
        	*/ 	}
        </section>
        </React.Fragment>
		)
}