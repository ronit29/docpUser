import React from 'react'

class PrescriptionCardView extends React.Component{

	render(){

		return(
			<div className="prescription-card">
                <div className="pres-card-content">
                    <div className="row">
                        <div className="col-8">
                            <div className="prs-name-section">
                                <img src={ASSETS_BASE_URL + "/img/ps-lft.svg"} />
                                <div className="name-sec-text">
                                    <p className="prs-name-age-gender">  Rajiv Kumar  |  <span>28</span>   |   <span>M</span></p>
                                    <p className="prs-sub-txt">By Dr. Sopha Jearmy</p>
                                </div>
                            </div>
                            <div className="btn-prs-section">
                                <button className="prs-snd-sms">Send SMS</button>
                                <button className="prs-snd-email">Send to Email</button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="prs-pdf-section">
                                <p>Created on
                                    <span>8th Oct 2018</span>
                                </p>
                                <a href="#">
                                    <img src={ASSETS_BASE_URL + "/img/pdf-dwn.png"} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
			)
	}
}

export default PrescriptionCardView