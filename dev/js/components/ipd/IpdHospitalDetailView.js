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
import BreadCrumbView from './breadCrumb.js'
import HelmetTags from '../commons/HelmetTags'
import CONFIG from '../../config'

//View all rating for hospital ,content_type = 3

class HospitalDetailView extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			seoFriendly: this.props.match.url.includes('-hpp')
		}
	}

	componentDidMount() {
		let hospital_id = this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.id ? this.props.ipd_hospital_detail.id : this.props.match.params.hospitalId || ''
		let gtmData = {
			'Category': 'ConsumerApp', 'Action': 'IpdHospitalDetailPageLanded', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-hospital-detail-page-landed', selectedId: hospital_id
		}
		GTM.sendEvent({ data: gtmData })
	}

	getCostEstimateClicked() {

		let ipd_id = this.props.commonSelectedCriterias.length ? this.props.commonSelectedCriterias[0].id : null
		let hospital_id = this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.id ? this.props.ipd_hospital_detail.id : ''
		let gtmData = {
			'Category': 'ConsumerApp', 'Action': 'IpdGetCostEstimateClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-get-cost-estimate-clicked', selectedId: ipd_id || '', hospitalId: hospital_id
		}
		GTM.sendEvent({ data: gtmData })


		this.props.history.push(`/ipd/${ipd_id ? ipd_id : 'price'}/getPriceEstimate?hospital_id=${hospital_id}`)

	}

	viewDoctorsClicked() {
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
		let hospital_id = this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.id ? this.props.ipd_hospital_detail.id : ''
		let doctor_name = ''
		let hospital_name = ''
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

	getMetaTagsData(seoData) {
		let title = "Hospital Profile Page"
		if (this.state.seoFriendly) {
			title = ""
		}
		let description = ""
		if (seoData) {
			title = seoData.title ? seoData.title : title
			description = seoData.description || ""
		}
		return { title, description }
	}

	render() {

		return (
			<div className="profile-body-wrap">
				<ProfileHeader showSearch={true} />
				<HelmetTags tagsData={{
					canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.match.url}`,
					title: this.getMetaTagsData(this.props.ipd_hospital_detail ? this.props.ipd_hospital_detail.seo : null).title,
					description: this.getMetaTagsData(this.props.ipd_hospital_detail ? this.props.ipd_hospital_detail.seo : null).description
				}} noIndex={!this.state.seoFriendly} />
				<section className="container parent-section book-appointment-section breadcrumb-mrgn">
					{
						this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.breadcrumb ?
							<BreadCrumbView breadcrumb={this.props.ipd_hospital_detail.breadcrumb} {...this.props} />
							: ''
					}
					<div className="row main-row parent-section-row">
						<LeftBar />
						<div className="col-12 col-md-7 col-lg-7 center-column">
							{
								this.props.HOSPITAL_DETAIL_LOADED ?
									<div className="ipd-section">
										<HospitalInfo hospital_data={this.props.ipd_hospital_detail} />

										{
											this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.doctors && this.props.ipd_hospital_detail.doctors.result.length ?
												<div>
													<div>
														<div className="card-head"><h2 className="dsply-ipd-hdng">Doctors</h2></div>
														{
															this.props.ipd_hospital_detail.doctors.result.map((doctorCard, i) => {
																return <DoctorResultCard details={doctorCard} key={i} rank={i} seoFriendly={this.props.ipd_hospital_detail.doctors.seo} {...this.props} />
															})
														}
													</div>
													{
														this.props.ipd_hospital_detail.doctors.result.length < this.props.ipd_hospital_detail.doctors.count ?
															<a href="javascript:void(0);" className="btn-view-hospital" onClick={this.viewDoctorsClicked.bind(this)}>{`View all ${this.props.ipd_hospital_detail.doctors.count} Doctors`}</a>
															: ''
													}
												</div>
												: ''
										}

										{
											this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.ipd_procedure_categories && this.props.ipd_hospital_detail.ipd_procedure_categories.length ?
												<HospitalTreatment hospital_data={this.props.ipd_hospital_detail} {...this.props} />
												: ''
										}

										{
											this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.services && this.props.ipd_hospital_detail.services.length ?
												<HospitalServices hospital_data={this.props.ipd_hospital_detail} />
												: ''
										}

										{
											this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.rating_graph && this.props.ipd_hospital_detail.rating_graph.star_count && this.props.ipd_hospital_detail.display_rating_widget ?
												<div className="hs-card">
													<div className="card-head"><h2 className="dsply-ipd-hdng">Patient Feedback</h2></div>
													<RatingGraph details={this.props.ipd_hospital_detail} />
													{
														this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.rating && this.props.ipd_hospital_detail.rating.length && this.props.ipd_hospital_detail.display_rating_widget ?
															<ReviewList details={this.props.ipd_hospital_detail} />
															: ''
													}
												</div>
												: ''
										}

										{
											this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.other_network_hospitals && this.props.ipd_hospital_detail.other_network_hospitals.length ?
												<HospitalLocations hospital_data={this.props.ipd_hospital_detail} />

												: ''
										}

										{
											this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.images && this.props.ipd_hospital_detail.images.length ?
												<HospitalGallery hospital_data={this.props.ipd_hospital_detail} />
												: ''
										}


										{
											this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.about ?
												<HospitalAboutUs hospital_data={this.props.ipd_hospital_detail} />
												: ''
										}

										<div className="btn-search-div btn-apply-div btn-sbmt"><a href="javascript:void(0);" onClick={this.getCostEstimateClicked.bind(this)} className="btn-search">{this.props.commonSelectedCriterias && this.props.commonSelectedCriterias.length ? 'Get Cost Estimate' : 'Need Help?'}</a></div>

									</div>
									: <Loader />
							}


						</div>
						<RightBar extraClass=" chat-float-btn-2" />
					</div>
				</section>
			</div>

		)
	}
}

export default HospitalDetailView