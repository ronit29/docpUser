import React from 'react';
import InitialsPicture from '../../commons/initialsPicture';
import RatingStars from '../../commons/ratingsProfileView/RatingStars';
import DoctorResultCard from '../commons/doctorResultCard'
import GTM from '../../../helpers/gtm.js'

class NonBookableDoctor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	ViewAll(){
		let speciality={}
		if(this.props.details.doctors && this.props.details.doctors.specializations){
			
			speciality.id = this.props.details.doctors.specializations[0].id
			speciality.name = this.props.details.doctors.specializations[0].name
			speciality.type = 'speciality'
			let data = {
			'Category': 'ConsumerApp', 'Action': 'NonBookableDoctorViewAllClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'Non-Bookable-Doctor-ViewAll-clicked', 'selected': speciality.name || '', 'selectedId': speciality.id || ''
			}
			GTM.sendEvent({ data: data })
			this.props.toggleOPDCriteria('speciality', speciality, true)
			setTimeout(() => {
				this.props.history.push('/opd/searchresults')
			}, 100)
		}

	}
	render() {

		return (
			<div className="search-el-popup-overlay  cancel-overlay-zindex">
				<div className="search-el-popup non-book-pop">
					<div className="widget p-relative">
					<img className="non-book-cls-btn" src= {ASSETS_BASE_URL + "/img/icons/close.png"} onClick={this.props.closeNonBookableDocPopup.bind(this)}/>
						<div className="non-bok-hdng-container">
							<p className="non-bok-heading">{this.props.details.display_name} is not bookable</p>
							<p className="non-bok-subhdng">See bookable doctors with great discounts below</p>
						</div>
						<div className="non-bok-cards-container">
							{this.props.nearbyDoctors.result && this.props.nearbyDoctors.result.length ?
                                this.props.nearbyDoctors.result.map((doctor, id) => {
                                	if(id <=1){
                                	return <DoctorResultCard {...this.props} details={doctor} key={id} rank={id} isNonBookablePopup={true}/>
									}
                                })
							:''}
						</div>
						{this.props.details.doctors && this.props.details.doctors.specializations?
							<p className="viw-all-non-bok" onClick={this.ViewAll.bind(this)}>View All Top {this.props.details.doctors.specializations[0].name} Near You</p>
						:''}
					</div>

				</div>
			</div>
		)
	}
}

export default NonBookableDoctor