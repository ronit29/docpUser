import React from 'react'
import LeftBar from '../commons/LeftBar'
import RightBar from '../commons/RightBar'
import ProfileHeader from '../commons/DesktopProfileHeader'
import Footer from '../commons/Home/footer'
import Loader from '../commons/Loader'
import HospitalInfo from './HospitalInfo.js'
import HospitalServices from './HospitalServices.js'
import HospitalTreatment from './HospitalTreatment.js'
//import DoctorList from './DoctorList.js'
//import RatingView from './RatingView.js'
import HospitalLocations from './HospitalLocations.js'
import HospitalGallery from './HospitalGallery.js'
import HospitalAboutUs from './HospitalAboutUs.js'
class HospitalDetailView extends React.Component {

	render(){

		return(
			<div className="profile-body-wrap">
                <ProfileHeader showSearch={true} />
                <section className="container parent-section book-appointment-section breadcrumb-mrgn">

	                <div className="row main-row parent-section-row">
	                    <LeftBar />
	                    <div className="col-12 col-md-7 col-lg-7 center-column">
	                    	{
	                    		this.props.HOSPITAL_DETAIL_LOADED?
	                    		<div className ="ipd-section">
		                    		<HospitalInfo hospital_data={this.props.ipd_hospital_detail}/>
		                    		{
		                    			this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.services && this.props.ipd_hospital_detail.services.length?
		                    			<HospitalServices hospital_data={this.props.ipd_hospital_detail}/>
		                    			:''	 	
		                    		}
		                    		
		                    		<HospitalTreatment hospital_data={this.props.ipd_hospital_detail}/>
		                    		
		                    		{
		                    			this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.other_network_hospitals && this.props.ipd_hospital_detail.other_network_hospitals.length?
		                    			<HospitalLocations hospital_data={this.props.ipd_hospital_detail}/>
		                    		
		                    			:''	
		                    		}
		                    		
		                    		{
		                    			this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.images && this.props.ipd_hospital_detail.images.length?
		                    			<HospitalGallery hospital_data={this.props.ipd_hospital_detail}/>
		                    			:''
		                    		}

		                    		
		                    		{
		                    			this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.about?
		                    			<HospitalAboutUs hospital_data={this.props.ipd_hospital_detail}/>
		                    			:''	
		                    		}
		                    		
		                    	</div>
		                    	:<Loader/>	
	                    	}
	                    	

	                    </div>
	                    <RightBar extraClass=" chat-float-btn-2"/>
	                </div>
	            </section>
	        </div>

			)
	}
}

export default HospitalDetailView