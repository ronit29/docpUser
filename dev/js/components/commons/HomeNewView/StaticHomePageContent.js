import React from 'react';

export default (props)=> {

    function scroll(type) {
        let dataType = 'static_review_blck'
        var elmnt = document.getElementById(dataType)

        if(elmnt) {
            let outerDivWidth = elmnt.offsetWidth
            let cardCount = elmnt.children && elmnt.children.length?elmnt.children.length:6;
            let childDivWidth = elmnt.scrollWidth?elmnt.scrollWidth:3000;
            let cardWidth = Math.ceil(childDivWidth / cardCount)

            let leftScroll = elmnt.scrollLeft

            if (type == 'right') {
                elmnt.scroll({ left: leftScroll + outerDivWidth, behavior: 'smooth' })
                if (childDivWidth <= (leftScroll +  2*outerDivWidth ) )  {
                    document.getElementById(`${dataType}_leftArrow_hsptl`).classList.add("d-none")
                }
                document.getElementById(`${dataType}_RightArrow_hsptl`).classList.remove("d-none")
            } else {
                elmnt.scroll({ left: leftScroll - outerDivWidth, behavior: 'smooth' })
                if (leftScroll - outerDivWidth <= 0) {
                    document.getElementById(`${dataType}_RightArrow_hsptl`).classList.add("d-none")
                }
                document.getElementById(`${dataType}_leftArrow_hsptl`).classList.remove("d-none")
            }
        }
    }

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
                {/* <div className="round-col ">
                    <ul className="d-flex">
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                    </ul>
                    <h3>we are here <br/>so far</h3>  
                    <img className="img-fluid" src={ASSETS_BASE_URL + "/img/profit.svg"} alt="profit"/>
                </div> */}
                <div className="consultation-col">
                    <h3 className="fw-500 text-center">
                        <span>1 Lakh +</span><br/>
                        <span>Doctor and Lab Appointments</span>
                    </h3>
                    <h3 className="fw-500 text-center">
                        <span>10 Lakh +</span><br/>
                        <span>Online Consultation</span>
                    </h3>
                </div>
                <div className="consultation-col left-border">
                    <h4 className="fw-500 text-center">
                        <span id="countNum">30000 +</span><br/>
                        <span>Doctor Network</span>
                    </h4>
                    <h4 className="fw-500 text-center">
                        <span id="countNum2">5000 +</span><br/>
                        <span>Lab Network</span>
                    </h4>
                    <h4 className="fw-500 text-center">
                        <span>2 Lakh +</span><br/>
                        <span>Prescription Delivered</span>
                    </h4>
                </div>
            </div>
        </section>
        {/******  Where we are *********/} 
        {/******  customer review *********/}
        <section className="card-block-row ">
            <h6 className="text-center fw-500 customer-review-heading">Our Happy Customers </h6>
            <div className="card-slider-container cust-review d-flex justify-content-between cust-feedback-col" id="static_review_blck">
                <div className="col-10 col-sm-4 text-center">
                    <div className="cust-img-block d-flex justify-content-center align-items-center fw-500">
                        {/* <img src={ASSETS_BASE_URL + "/img/profile-img.png"} alt="name"/> */}
                        <span>AG</span>
                    </div>
                    <h3>Ananda Ghoshal </h3>
                    <ul className="d-flex justify-content-center align-item-center mb-2">
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                    </ul>
                    <p className="text-center mb-2">Docprime has provided me the chance to consult the Doctor at the earliest. Their customer care is prompt and cooperative to sort out my problem as soon as possible. It is the easiest way to book Doctor apponintments</p>
                    {/* <img height="20" src={ASSETS_BASE_URL + "/img/g-play.png"} alt="google-play"/> */}
                </div>
                <div className="col-10 col-sm-4 text-center">
                    <div className="cust-img-block d-flex justify-content-center align-items-center fw-500">
                        {/* <img src={ASSETS_BASE_URL + "/img/profile-img.png"} alt="name"/> */}
                        <span>S</span>
                    </div>
                    <h3>Sanat</h3>
                    <ul className="d-flex justify-content-center align-item-center mb-2">
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                    </ul>
                    <p className="text-center mb-2">Docprime has helped me choose a doctor (dentist) without any hassle, considering the fact that I am completely new to the city & has absolutely no knowledge about which doctor to consult. Thank you very much Docprime.</p>
                    {/* <img height="20" src={ASSETS_BASE_URL + "/img/g-play.png"} alt="google-play"/> */}
                </div>
                <div className="col-10 col-sm-4 text-center">
                    <div className="cust-img-block d-flex justify-content-center align-items-center fw-500">
                        {/* <img src={ASSETS_BASE_URL + "/img/profile-img.png"} alt="name"/> */}
                        <span>PS</span>
                    </div>
                    <h3>Purnima Singla</h3>
                    <ul className="d-flex justify-content-center align-item-center mb-2">
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/grey-star.svg"} alt="star"/></li>
                    </ul>
                    <p className="text-center mb-2">I have booked 3 full body health packages for my family. After receiving the report, I got a call from a doctor who explained each and every element of the report to me and my family. He even prescribed some medicines to my mother and directed us to take some multivitamins. I truly loved the service.</p>
                    {/* <img height="20" src={ASSETS_BASE_URL + "/img/g-play.png"} alt="google-play"/> */}
                </div>
                <div className="col-10 col-sm-4 text-center">
                    <div className="cust-img-block d-flex justify-content-center align-items-center fw-500">
                        {/* <img src={ASSETS_BASE_URL + "/img/profile-img.png"} alt="name"/> */}
                        <span>PS</span>
                    </div>
                    <h3>Preet Sohal</h3>
                    <ul className="d-flex justify-content-center align-item-center mb-2">
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                    </ul>
                    <p className="text-center mb-2">I don't generally write reviews but Docprime really deserves 5 stars. I had been struggling to find a dermatologist in my area, did Google search, asked around from friends but didn't find one as per my expectations. This app showed me the one clinic which is not on Google search. I booked the appointment immediately. It's just a great experience.</p>
                    {/* <img height="20" src={ASSETS_BASE_URL + "/img/g-play.png"} alt="google-play"/> */}
                </div>
                <div className="col-10 col-sm-4 text-center">
                    <div className="cust-img-block d-flex justify-content-center align-items-center fw-500">
                        {/* <img src={ASSETS_BASE_URL + "/img/profile-img.png"} alt="name"/> */}
                        <span>SS</span>
                    </div>
                    <h3>Sonam Sinha </h3>
                    <ul className="d-flex justify-content-center align-item-center mb-2">
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/star.svg"} alt="star"/></li>
                        <li><img height="15" src={ASSETS_BASE_URL + "/img/grey-star.svg"} alt="star"/></li>
                    </ul>
                    <p className="text-center mb-2">I booked preventive health packages for my parents living in Delhi. I am so glad that I can take care of their health by sitting in Bangalore. They collected the blood sample from my parent's home and sent the report on email which was reviewed by their Doctor. He prescribed some medicines to my parents and I got 23% off on medicine online delivery. Had an overall amazing experience!</p>
                    {/* <img height="20" src={ASSETS_BASE_URL + "/img/g-play.png"} alt="google-play"/> */}
                </div>
            </div>

            {/* slider buttons */}
            <a className="pkg-btnlft d-none"  id={`static_review_blck_RightArrow_hsptl`} onClick={()=>scroll('left')}> 
                <img height="12" src={ASSETS_BASE_URL + "/img/color-chev.svg"} alt="chev-left"/>
            </a>
            <a className="pkg-btnrgt" id={`static_review_blck_leftArrow_hsptl`} onClick={()=>scroll('right')}> 
                <img height="12" src={ASSETS_BASE_URL + "/img/color-chev.svg"} alt="chev-right"/>
            </a>
        </section>
        </React.Fragment>
		)
}