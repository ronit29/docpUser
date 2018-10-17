import React from 'react'

class PrescriptionCardView extends React.Component{

    downloadImage(src) {
        if (window) {
            window.open(src, '_blank')
        }
    }

	render(){

        let date = new Date(this.props._updatedAt).toDateString()


		return(
			<div className="prescription-card">
                <div className="pres-card-content">
                    <div className="row">
                        <div className="col-8">
                            <div className="prs-name-section">
                                <img src={ASSETS_BASE_URL + "/img/ps-lft.svg"} />
                                <div className="name-sec-text">
                                    <p className="prs-name-age-gender">  {this.props.profile.name} | <span>{this.props.profile.age}</span>   |   <span>{this.props.profile.gender.toUpperCase()}</span></p>
                                    <p className="prs-sub-txt">{`By Dr. ${this.props.doctorProfile.name}`}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="prs-pdf-section">
                                <p>Created on
                                    <span>{date}</span>
                                </p>
                                <a href='#' onClick = {this.downloadImage.bind(this,this.props.PrescriptionFileURL)} >
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