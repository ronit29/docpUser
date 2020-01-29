import React from 'react';

export default (props) => {

    return (
        <div className="pakg-slider-container mb-24">
                                            <div className="pkgSliderHeading">
                                                <h5>Our Happy Gold Customers</h5>
                                            </div>
                                            <div className="pkgSliderContainer">
                                                <div className="pkgCardsList d-flex sub-wd-cards top_pkgCat">
                                                    <div className="pkgcustCards vip-cmmnt-card">
                                                       <div className="vip-sld-content">
                                                           <img src={ASSETS_BASE_URL +'/img/nwdpsmile.png'}/>
                                                           <h4>Kritika Pandey</h4>
                                                           <p> Can you imagine having a discount on doctor's fee. Yeah, I was surprised too. But with Docprime Gold membership, i got heavy discounts on doctor fees, lab tests and full-body health packages. Definitely saved some good money here.</p>
                                                       </div>
                                                    </div>
                                                    <div className="pkgcustCards vip-cmmnt-card">
                                                       <div className="vip-sld-content">
                                                           <img src={ASSETS_BASE_URL +'/img/nwdpsmile.png'}/>
                                                           <h4>Purnima Singla</h4>
                                                           <p>I have booked 3 full body health packages for my family. After receiving the report, I got a call from a doctor who explained each and every element of the report to me and my family. He even prescribed some medicines to my mother and directed us to take some multivitamins. I truly loved the service.</p>
                                                       </div>
                                                    </div>
                                                    <div className="pkgcustCards vip-cmmnt-card">
                                                       <div className="vip-sld-content">
                                                           <img src={ASSETS_BASE_URL +'/img/nwdpsmile.png'}/>
                                                           <h4>Akash Saini</h4>
                                                           <p>I didn’t believe in the Gold membership product at first. I was happy with discounts but was suspecting the network of hospitals & labs. I am happy that I took this chance and booked the membership. Docprime has partnered with most of the top hospitals and labs. I recently got a discount on Medanta’s Doctor fee.</p>
                                                       </div>
                                                    </div>
                                                    <div className="pkgcustCards vip-cmmnt-card">
                                                       <div className="vip-sld-content">
                                                           <img src={ASSETS_BASE_URL +'/img/nwdpsmile.png'}/>
                                                           <h4>Sonam Sinha</h4>
                                                           <p>I booked preventive health packages for my parents living in Delhi. I am so glad that I can take care of their health by sitting in Bangalore. They collected the blood sample from my parent's home and sent the report on email which was reviewed by their Doctor. He prescribed some medicines to my parents and I got 23% off on medicine online delivery. Had an overall amazing experience!</p>
                                                       </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
    )
}