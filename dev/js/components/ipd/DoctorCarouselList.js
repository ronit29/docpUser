import React from 'react'
import InitialsPicture from '../commons/initialsPicture';
import GTM from '../../helpers/gtm.js'

class DoctorCarouselList extends React.Component {

    navigateToDoctor(doctor, e) {
        e.preventDefault()
        if(doctor.url){
            this.props.history.push(doctor.url);
        }else{
            this.props.history.push(`/opd/doctor/${doctor.id}?hide_search_data=true`)
        }
        

        let data = {
            'Category': 'ConsumerApp', 'Action': 'recommendedDoctorClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'recommended-doctor-click', 'DoctorID': doctor.doctor_id
        }
        GTM.sendEvent({ data: data })
    }

	render(){
        let { doctorCardData } = this.props
		return(
            <div className="widge-content ct-profile pd-0">
                <div className="widget-panel">
                    <div className="panel-content pd-0 border-bottom-panel">
                        <div className="docScrollSliderContainer" style={{background: 'transparent'}}>
                            {
                                doctorCardData && doctorCardData.length ?
                                    doctorCardData.map((doctor, id) => {
                                        return <a href={`/${doctor.url?doctor.url:`opd/doctor/${doctor.id}?hide_search_data=true`}`} className="docSlideCard" key={id} onClick={(e) => this.navigateToDoctor(doctor, e)}>
                                            <div className="docSlideHead">
                                                <InitialsPicture name={doctor.name} has_image={!!doctor.thumbnail} className="initialsPicture-ds slideDocMainImg" style={{ width: 60, height: 60, fontSize: '2rem' }} >
                                                    <img className="fltr-usr-image img-round slideDocMainImg" src={doctor.thumbnail} alt={doctor.display_name} title={doctor.display_name} />
                                                </InitialsPicture>
                                                {
                                                    doctorCardData.average_rating?
                                                    <span className="rating-s-tar">{doctorCardData.average_rating} <img src={ASSETS_BASE_URL + "/images/star.png"} className="star-img" /></span>
                                                    :''    
                                                }
                                                
                                            </div>
                                            <div className="slideDocContent">
                                                <p className="slideDocName">{doctor.display_name}</p>
                                                <p className="slideDocExp">{doctor.experience_years} Years of Experience</p>
                                                {
                                                    doctor.qualifications && doctor.qualifications.length ?
                                                        <p className="slideDocdeg">
                                                            {
                                                                doctor.qualifications.map((qualification, index) => {
                                                                    return <span key={index}>{qualification.qualification}</span>
                                                                })
                                                            }
                                                        </p> : ''
                                                }
                                                {
                                                    doctor.hospitals && doctor.hospitals.length ?
                                                        <p className="slideDocExp" style={{ marginTop: 5 }} >{doctor.hospitals[0].hospital_name}</p> : ''
                                                }
                                                <div className="slideDocPrice">
                                                    <span className="slideNamePrc">₹ {doctor.deal_price}</span><span className="slideCutPrc">₹ {doctor.mrp}</span>
                                                </div>
                                                <div className="slidBookBtn">
                                                    <button>Book Now</button>
                                                </div>
                                            </div>
                                        </a>
                                    }) : ''
                            }
                        </div>
                    </div>
                </div>
            </div>)
	}
}

export default DoctorCarouselList