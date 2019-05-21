import React from 'react'
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
import IpdFormView from '../../containers/ipd/IpdForm.js'
const queryString = require('query-string')
import IpdLeadForm from '../../containers/ipd/ipdLeadForm.js'

//View all rating for hospital ,content_type = 3

class HospitalDetailView extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			seoFriendly: this.props.match.url.includes('-hpp'),
			toggleTabType: 'doctors',
			showLeadForm: false
		}
	}

	componentDidMount() {
		let hospital_id = this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.id ? this.props.ipd_hospital_detail.id : this.props.match.params.hospitalId || ''
		let gtmData = {
			'Category': 'ConsumerApp', 'Action': 'IpdHospitalDetailPageLanded', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-hospital-detail-page-landed', selectedId: hospital_id
		}
		GTM.sendEvent({ data: gtmData })

		var section = document.querySelectorAll(".ipd-tb-tabs");
		var sections = {};
		var i = 0

		let headerHeight = -35

		Object.keys(this.refs).forEach((prp, i) => {

			sections[prp] = this.refs[prp].offsetTop + headerHeight

		})

		let self = this
		if (window && document) {
			window.onscroll = function () {
				var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop
				for (i in sections) {
					if (self.refs[i]) {

						if ((self.refs[i].offsetTop + headerHeight) <= scrollPosition) {
							self.setState({ toggleTabType: i })
						}
					}
				}
			}
		}

		const parsed = queryString.parse(this.props.location.search)

		if (parsed.type && this.refs[parsed.type]) {
			this.toggleTabs(parsed.type)
		}
		setTimeout(()=>{
			this.setState({showLeadForm: true})	
		},500)
		

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

	viewDoctorsClicked(specializedSearch = false, e) {
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
		let state = {}

		if (specializedSearch) {
			hospital_id = ''
			this.props.cloneCommonSelectedCriterias({ id: this.props.specialization_id, type: 'speciality' })
		}

		state = {
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


	toggleTabs(type) {
		if (document.getElementById(type)) {
			let gtmData = {
				'Category': 'ConsumerApp', 'Action': 'HospitalPageIpdTabClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'hospital-page-ipd-tab-clicked', type: type
			}
			GTM.sendEvent({ data: gtmData })

			let headerHeight = this.refs[type].offsetTop
			headerHeight = headerHeight - 35
			this.setState({ toggleTabType: type })
			window.scrollTo(0, headerHeight)

		}
	}

	getSpecializationName() {

		if (this.props.ipd_hospital_detail.specialization_doctors && this.props.ipd_hospital_detail.specialization_doctors.specializations && this.props.ipd_hospital_detail.specialization_doctors.specializations.length) {

			let name = this.props.ipd_hospital_detail.specialization_doctors.specializations.map(x => x.name).join(',') || ''
			name = name + ' '
			return `View all ${this.props.ipd_hospital_detail.specialization_doctors.count} ${name} `
		}

		return `View all ${this.props.ipd_hospital_detail.specialization_doctors.count} Doctors`
	}

	submitLeadFormGeneration(close=false) {
		if(close) {
			let gtmData = {
				'Category': 'ConsumerApp', 'Action': 'IpdHospitalDetailPageFormClosed', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-hospital-detail-page-form-closed'
			}
			GTM.sendEvent({ data: gtmData })
		}
		this.setState({showLeadForm: false})
	}

	render() {

		const parsed = queryString.parse(this.props.location.search)

		let showPopup = parsed.showPopup && this.state.showLeadForm && typeof window == 'object' && window.ON_LANDING_PAGE && this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.bed_count

		return (
			<React.Fragment>
				{
					this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.id ?
						<div className="ipd-section">
							{
								showPopup?
								<IpdLeadForm submitLeadFormGeneration={this.submitLeadFormGeneration.bind(this)} {...this.props} hospital_name={this.props.ipd_hospital_detail.name?this.props.ipd_hospital_detail.name:null}/>
								:''
							}

							<HospitalInfo hospital_data={this.props.ipd_hospital_detail} showPopup={showPopup}/>

							<div className="ipd-tabs-container">
								<p className={`ipd-tb-tabs ${this.state.toggleTabType == 'doctors' ? ' ipd-tb-active' : ''}`} onClick={this.toggleTabs.bind(this, 'doctors')}>Doctors</p>
								{
									this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.bed_count?
									<p className={`ipd-tb-tabs ${this.state.toggleTabType == 'bookNow' ? ' ipd-tb-active' : ''}`} onClick={this.toggleTabs.bind(this, 'bookNow')}>Book Now</p>
									:''	
								}
								
								<p className={`ipd-tb-tabs ${this.state.toggleTabType == 'feedback' ? ' ipd-tb-active' : ''}`} onClick={this.toggleTabs.bind(this, 'feedback')}>Feedback</p>
							</div>

							<div id="doctors" ref="doctors">
								{
									this.props.ipd_hospital_detail && ((this.props.ipd_hospital_detail.doctors && this.props.ipd_hospital_detail.doctors.result.length) || (this.props.ipd_hospital_detail.specialization_doctors && this.props.ipd_hospital_detail.specialization_doctors.result.length)) ?
										<div>
											<div>
												<div className="card-head"><h2 className="dsply-ipd-hdng">Doctors</h2></div>
												{
													this.props.ipd_hospital_detail.specialization_doctors && this.props.ipd_hospital_detail.specialization_doctors.result.length ?
														this.props.ipd_hospital_detail.specialization_doctors.result.map((doctorCard, i) => {
															return <DoctorResultCard details={doctorCard} key={i} rank={i} seoFriendly={this.props.ipd_hospital_detail.specialization_doctors.seo} {...this.props} />
														})
														: this.props.ipd_hospital_detail.doctors.result.map((doctorCard, i) => {
															return <DoctorResultCard details={doctorCard} key={i} rank={i} seoFriendly={this.props.ipd_hospital_detail.doctors.seo} {...this.props} />
														})
												}
											</div>
											<div className="algn-anchr">

												{
													this.props.ipd_hospital_detail.specialization_doctors && this.props.ipd_hospital_detail.specialization_doctors.result.length ?
														<a href="javascript:void(0);" onClick={this.viewDoctorsClicked.bind(this, true)}>{this.getSpecializationName()}</a>
														: ''

												}

												{
													this.props.ipd_hospital_detail.doctors && this.props.ipd_hospital_detail.doctors.result.length < this.props.ipd_hospital_detail.doctors.count ?
														<a href="javascript:void(0);" onClick={this.viewDoctorsClicked.bind(this, false)}>{this.props.ipd_hospital_detail.specialization_doctors && this.props.ipd_hospital_detail.specialization_doctors.result.length ? ' /' : ''}{`View all ${this.props.ipd_hospital_detail.doctors.count} Doctors`}</a>
														: ''
												}

											</div>
										</div>
										: ''
								}
							</div>
							{
								this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.bed_count?
								<div id="bookNow" ref="bookNow" className="nav_top_bar">
									<IpdFormView {...this.props} tabView={true} />
								</div>
								:''
							}

							<div id="feedback" ref="feedback" className="mt-1">
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
							</div>

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
			</React.Fragment>
		)
	}
}

export default HospitalDetailView