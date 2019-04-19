import React from 'react'
import LeftBar from '../commons/LeftBar'
import RightBar from '../commons/RightBar'
import ProfileHeader from '../commons/DesktopProfileHeader'
import Footer from '../commons/Home/footer'
import Loader from '../commons/Loader'
import HospitalInfo from './HospitalInfo.js'
import HospitalServices from './HospitalServices.js'
import HospitalTreatment from './HospitalTreatment.js'
import DoctorResultCard from '../opd/commons/doctorResultCard'
//import RatingView from './RatingView.js'
import RatingGraph from '../commons/ratingsProfileView/RatingGraph.js'
import ReviewList from '../commons/ratingsProfileView/ReviewList.js'
import HospitalLocations from './HospitalLocations.js'
import HospitalGallery from './HospitalGallery.js'
import HospitalAboutUs from './HospitalAboutUs.js'
import GTM from '../../helpers/gtm.js'


//View all rating for hospital ,content_type = 3

class HospitalDetailView extends React.Component {

	componentDidMount(){
			let gtmData = {
		    	'Category': 'ConsumerApp', 'Action': 'IpdHospitalDetailPageLanded', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-hospital-detail-page-landed', selectedId: this.props.match.params.hospitalId 
			}
			GTM.sendEvent({ data: gtmData })		
	}

	getCostEstimateClicked(hospitalId){
		if(this.props.commonSelectedCriterias.length){
			let ipd_id = this.props.commonSelectedCriterias[0].id

			let gtmData = {
		    	'Category': 'ConsumerApp', 'Action': 'IpdGetCostEstimateClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-get-cost-estimate-clicked', selectedId: ipd_id || '', hospitalId: this.props.match.params.hospitalId || ''
			}
			GTM.sendEvent({ data: gtmData })

			
			this.props.history.push(`/ipd/${ipd_id}/getPriceEstimate?hospital_id=${this.props.match.params.hospitalId}`)		
		}
      
   	}

   	viewDoctorsClicked(){
		/*if(this.props.commonSelectedCriterias && this.props.commonSelectedCriterias.length){


			let gtmData = {
	            'Category': 'ConsumerApp', 'Action': 'IpdViewAllDoctorClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-view-all-doctor-clicked', selectedId: this.props.commonSelectedCriterias[0].id || ''
	        }
	        GTM.sendEvent({ data: gtmData })

			let criteria = {}
			criteria.id = this.props.commonSelectedCriterias[0].id
			criteria.name = this.props.commonSelectedCriterias[0].name
			criteria.type = 'ipd' 
			this.props.cloneCommonSelectedCriterias(criteria)
			this.props.history.push(`/opd/searchresults`)	
		}*/
		let self = this
		let hospital_id = this.props.match.params.hospitalId
		let doctor_name=''
		let hospital_name =''
		let state = {
            filterCriteria: {
            	...self.props.filterCriteria,
            	hospital_id, doctor_name, hospital_name
            },
            nextFilterCriteria: {
            	...self.props.filterCriteria,
                hospital_id, doctor_name, hospital_name
            }
        }
		this.props.mergeOPDState(state)
		this.props.history.push(`/opd/searchresults`)	
	}

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
		                    		
		                    		{
		                    			this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.ipd_procedure_categories && this.props.ipd_hospital_detail.ipd_procedure_categories.length?
		                    			<HospitalTreatment hospital_data={this.props.ipd_hospital_detail} {...this.props}/>
		                    			:''	
		                    		}
		                    		
		                    		{
				                    	this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.doctors && this.props.ipd_hospital_detail.doctors.result.length?
				                    		<div>
					                    		<div className="hs-card">
						               			<div className="card-head">Doctors</div>
						               			{
								                    this.props.ipd_hospital_detail.doctors.result.map((doctorCard, i) => {
								                    	return <DoctorResultCard details={doctorCard} key={i} rank={i} seoFriendly={this.props.ipd_hospital_detail.doctors.seo} {...this.props}/>
								                    })
							                	}
							                    </div>
							                	{
							                    	this.props.ipd_hospital_detail.doctors.result.length<this.props.ipd_hospital_detail.doctors.count?
							                    	<a href="javascript:void(0);" className="btn-view-hospital" onClick={this.viewDoctorsClicked.bind(this)}>{`View all ${this.props.ipd_hospital_detail.doctors.count} Doctors`}</a>
							                    	:''	
							                    }
							                    </div>    	
					                    :''
				                    }

				                    {
				                    	this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.rating_graph && this.props.ipd_hospital_detail.rating_graph.star_count && this.props.ipd_hospital_detail.display_rating_widget?
				                    	<div className="hs-card">
					               			<div className="card-head">Patient Feedback</div>
				                    		<RatingGraph details = {this.props.ipd_hospital_detail}/>
				                   		</div>
				                    	:''
				                    }

				                    {
				                    	this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.rating && this.props.ipd_hospital_detail.rating.length && this.props.ipd_hospital_detail.display_rating_widget?
				                    	<ReviewList details = {this.props.ipd_hospital_detail}/>
				                    	:''
				                    }

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
		                    		{
		                    			this.props.commonSelectedCriterias && this.props.commonSelectedCriterias.length?
		                    			<div className="btn-search-div btn-apply-div btn-sbmt"><a href="javascript:void(0);" onClick={this.getCostEstimateClicked.bind(this)} className="btn-search">Get Cost Estimate</a></div>
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