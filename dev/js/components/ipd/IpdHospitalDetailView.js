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
// import HospitalGallery from './HospitalGallery.js'
import HospitalAboutUs from './HospitalAboutUs.js'
import GTM from '../../helpers/gtm.js'
import IpdFormView from '../../containers/ipd/IpdForm.js'
const queryString = require('query-string')
import IpdLeadForm from '../../containers/ipd/ipdLeadForm.js'
import ChatIpdPanel from '../commons/ChatPanel/ChatIpdPanel.js'
import IpdOffersPage from './IpdOffersPage.js'
import CommonSearch from '../../containers/commons/CommonSearch.js'
import IpdCarousel from './IpdHospitalDetailCarousel.js'
import IpdQuestionAnswer from './ipdQuestionAnswer.js'
import IpdSecondPopup from '../../containers/ipd/IpdDoctorCityPopup.js'
import CommentBox from '../commons/article/ArticleCommentBox.js'
import Reply from '../commons/article/Reply.js'
import STORAGE from '../../helpers/storage';
import SnackBar from 'node-snackbar'
import NonIpdPopupView from '../commons/nonIpdPopup.js'

//View all rating for hospital ,content_type = 3

class HospitalDetailView extends React.Component {

	constructor(props) {
		super(props)
		const parsed = queryString.parse(this.props.location.search)
		this.state = {
			seoFriendly: this.props.match.url.includes('-hpp'),
			toggleTabType: 'doctors',
			showLeadForm: true,
			ipdFormParams: {},
			showForcedPopup: false,
			showSecondPopup: false,
			firstLeadId:'',
			replyOpenFor: '',
			comment:'',
			showNonIpdPopup: parsed.show_popup,
            to_be_force:1,
            is_lead_enabled:true
		}
	}

	componentDidMount() {

		if (window) {
            window.scrollTo(0, 0)
        }
                
		let hospital_id = this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.id ? this.props.ipd_hospital_detail.id : this.props.match.params.hospitalId || ''
		let gtmData = {
			'Category': 'ConsumerApp', 'Action': 'IpdHospitalDetailPageLanded', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-hospital-detail-page-landed', selectedId: hospital_id
		}
		GTM.sendEvent({ data: gtmData })

		var section = document.querySelectorAll(".ipd-tb-tabs");
		var sections = {};
		var i = 0

		let headerHeight = 35
		if(document.getElementsByClassName('ipd-tabs-container') && document.getElementsByClassName('ipd-tabs-container').length) {
			headerHeight = document.getElementsByClassName('ipd-tabs-container')[0].offsetHeight
		}
		headerHeight = -(headerHeight)
		Object.keys(this.refs).forEach((prp, i) => {

			sections[prp] = this.refs[prp].offsetTop + headerHeight

		})

		let self = this
		if (window && document) {
			window.onscroll = function () {
				var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop
				for (i in sections) {
					if (self.refs[i]) {

						if (i.includes('view_more')) {
							if (scrollPosition > (self.refs['view_more'].offsetTop + headerHeight)) {
								self.setState({ toggleTabType: '' })
							}
						} else {

							if ((self.refs[i].offsetTop + headerHeight) <= scrollPosition) {
								self.setState({ toggleTabType: i })
							}
						}
					}
				}
			}
		}

		const parsed = queryString.parse(this.props.location.search)

		if (parsed.type && this.refs[parsed.type]) {
			this.toggleTabs(parsed.type)
		}

		if(window.location.href.includes('type#')) {
			let type = window.location.href.split('#')
			if(type.length==2 && this.refs[type[1]]) {
				this.toggleTabs(type[1])		
			}
		}
 
		setTimeout(()=>{
			this.setState({showForcedPopup: true })
		},1000)

	}

	getCostEstimateClicked() {
		const parsed = queryString.parse(this.props.location.search)
		let ipd_id = this.props.commonSelectedCriterias.length ? this.props.commonSelectedCriterias[0].id : null
		let hospital_id = this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.id ? this.props.ipd_hospital_detail.id : ''
		let gtmData = {
			'Category': 'ConsumerApp', 'Action': 'IpdGetCostEstimateClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-get-cost-estimate-clicked', selectedId: ipd_id || '', hospitalId: hospital_id
		}
		GTM.sendEvent({ data: gtmData })

		if(parsed.fromProcedure){

		}else{
			ipd_id = null
			let selectedCriteria = []
			this.props.toggleIPDCriteria(selectedCriteria, true)
		}

		this.props.history.push(`/ipd/${ipd_id ? ipd_id : 'price'}/getPriceEstimate?hospital_id=${hospital_id}`)

	}

	viewDoctorsClicked(specializationId = null, e) {
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

		if (specializationId) {
			this.props.cloneCommonSelectedCriterias({ id: specializationId, type: 'speciality' })
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
			let tabheight = 35;
			if(document.getElementsByClassName('ipd-tabs-container') && document.getElementsByClassName('ipd-tabs-container').length) {
				tabheight = document.getElementsByClassName('ipd-tabs-container')[0].offsetHeight
			}
			headerHeight = headerHeight - tabheight
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

	submitLeadFormGeneration(ipdFormParams) {
		if (close) {
			let gtmData = {
				'Category': 'ConsumerApp', 'Action': 'IpdHospitalDetailPageFormClosed', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-hospital-detail-page-form-closed'
			}
			GTM.sendEvent({ data: gtmData })
		}
		/*let ipd_data = {
			showChat: true,
			ipdFormParams: ipdFormParams,
			hospital:this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.id?this.props.ipd_hospital_detail.id:''
		}*/

		this.setState({ showLeadForm: false, ipdFormParams: ipdFormParams }, () => {
			/*this.props.checkIpdChatAgentStatus((response)=> {
				if(response && response.users && response.users.length) {

					// this.props.ipdChatView({showIpdChat:true, ipdForm: ipdFormParams, showMinimize: true})
				}
			})*/
			// this.props.showChatView(ipd_data)	
		})
	}

	applyQuickFilters(category) {
		let gtmData = {
			'Category': 'ConsumerApp', 'Action': 'IpdHospitalSpecializationSearch', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-hospital-specialization-search', 'specializationId': category.id
		}
		GTM.sendEvent({ data: gtmData })
		let self = this

		let hospital_id = this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.id ? this.props.ipd_hospital_detail.id : ''
		let doctor_name = ''
		let hospital_name = ''
		let state = {}
		let specialization_category = [{id: category.id, type:'group_ids'}]
		
		this.props.cloneCommonSelectedCriterias(specialization_category)
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

	getInputFocus() {
		let headerHeight = document.getElementById('common_search') ? document.getElementById('common_search').offsetTop : 0
		headerHeight = headerHeight - 89
		window.scrollTo(0, headerHeight)
	}

	saveLeadIdForUpdation(response) {
		if (response.id) {
			this.setState({ firstLeadId: response.id, showSecondPopup: true })
		}
	}

	secondIpdFormSubmitted() {
		this.setState({ showSecondPopup: false })
	}

	postReply(e) {
        e.preventDefault()
        if (!this.state.comment) {
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Please write valid comment" })
            }, 500)
            return
        }
        let postData = {
        	type: 'hospital',
            id: this.props.ipd_hospital_detail.id,
            comment: this.state.comment,
            name: Object.values(this.props.profiles).length && this.props.profiles[this.props.defaultProfile] ? this.props.profiles[this.props.defaultProfile].name : '',
            email: Object.values(this.props.profiles).length && this.props.profiles[this.props.defaultProfile] ? this.props.profiles[this.props.defaultProfile].email : '',
            parent: this.state.replyOpenFor
        }
        this.props.postHospitalComments(postData, (error, data) => {
            if (data) {
                this.setState({ comment: '', replyOpenFor: '' })
                this.loadComments()
                setTimeout(() => {
                    SnackBar.show({ pos: 'bottom-center', text: "Comment Posted Sucessfully, Awaiting moderation" })
                }, 500)
            } else {
                setTimeout(() => {
                    SnackBar.show({ pos: 'bottom-center', text: "Could not post your comment, Try again!" })
                }, 500)
            }
        })
        return
    }

	loadComments(){
		this.props.getHospitalComments(this.props.ipd_hospital_detail.id)
	}

	commentReplyClicked(id) {
        this.setState({ replyOpenFor: id })
    }

    handleInputComment(e) {
        this.setState({ comment: e.target.value })
    }

    nonIpdLeads(phone_number){
        const parsed = queryString.parse(this.props.location.search)
        let criteriaStr = this.props.ipd_hospital_detail.name
        let data =({phone_number:phone_number,lead_source:'docads',source:parsed,lead_type:'DOCADS',hospital_name:criteriaStr,exitpoint_url:'http://docprime.com' + this.props.location.pathname,doctor_id:null,hospital_id:null,doctor_name:null})
        if(this.props.common_utm_tags && this.props.common_utm_tags.length){
            data.utm_tags = this.props.common_utm_tags.filter(x=>x.type == "common_xtra_tags")[0].utm_tags
        }
        let visitor_info = GTM.getVisitorInfo()
            if(visitor_info && visitor_info.visit_id){
                data.visit_id = visitor_info.visit_id
                data.visitor_id = visitor_info.visitor_id
            }
        let gtm_data = {'Category': 'ConsumerApp', 'Action': 'DocAdsHppSubmitClick', 'CustomerID': GTM.getUserId() || '', 'event': 'doc-ads-hpp-Submit-click'}
        GTM.sendEvent({ data: gtm_data })
       if(this.state.is_lead_enabled){
            this.setState({is_lead_enabled:false})
            this.props.NonIpdBookingLead(data)
            setTimeout(() => {
                this.setState({is_lead_enabled:true})
            }, 5000)
        }
       this.setState({to_be_force:0})
    }

    closeIpdLeadPopup(from){
        if(from){
            let data = {
                    'Category': 'ConsumerApp', 'Action': 'DocAdsHppCrossClick', 'CustomerID': GTM.getUserId() || '', 'event': 'doc-ads-hpp-cross-click'
                }
            GTM.sendEvent({ data: data })
            this.setState({to_be_force:0})
        }
    }

	render() {

		const parsed = queryString.parse(this.props.location.search)

		let showPopup = parsed.showPopup && this.state.showLeadForm && typeof window == 'object' && window.ON_LANDING_PAGE && this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.bed_count

		showPopup = parsed.showPopup && this.state.showLeadForm && !this.props.is_ipd_form_submitted && !this.state.showNonIpdPopup 

		let landing_page = false
		if (typeof window == 'object' && window.ON_LANDING_PAGE) {
			landing_page = true
		}

		let showForcedPopup= this.state.showLeadForm && landing_page && this.state.seoFriendly && this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.is_ipd_hospital && this.state.showForcedPopup && !this.state.showNonIpdPopup


		let isUserLogin = Object.values(this.props.profiles).length || STORAGE.checkAuth()
        let commentsExists = this.props.hospitalComments && this.props.hospitalComments.length ? this.props.hospitalComments.length : null

        let specialization_data = []
        if(this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.specialization_doctors && this.props.ipd_hospital_detail.specialization_doctors.specializations){

        	specialization_data = this.props.ipd_hospital_detail.specialization_doctors.specializations
        }
        showPopup = false;
        showForcedPopup = false;

		return (
			<React.Fragment>
				{
					this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.id ?
						<div className="ipd-section">
							{
								(showPopup || showForcedPopup) ?
									<IpdLeadForm submitLeadFormGeneration={this.submitLeadFormGeneration.bind(this)} {...this.props} hospital_name={this.props.ipd_hospital_detail.name ? this.props.ipd_hospital_detail.name : null} hospital_id={this.props.ipd_hospital_detail.id} formSource='ipdHospitalPopup' saveLeadIdForUpdation={this.saveLeadIdForUpdation.bind(this)} noToastMessage={true} specialization_data={specialization_data}/>
									: ''
							}
							{
								this.state.showSecondPopup && this.state.firstLeadId && parsed.get_feedback && parsed.get_feedback == '1' ?
									<IpdSecondPopup {...this.props} firstLeadId={this.state.firstLeadId} all_doctors={this.props.ipd_hospital_detail.all_doctors} all_cities={this.props.ipd_hospital_detail.all_cities} hospitalProfilePage={true} secondIpdFormSubmitted={this.secondIpdFormSubmitted.bind(this)} hospital_name={this.props.ipd_hospital_detail.name ? this.props.ipd_hospital_detail.name : null} hospital_id={this.props.ipd_hospital_detail.id} />
									: ''
							}

							{
			                    /*(this.state.showNonIpdPopup == 1 || this.state.showNonIpdPopup == 2) && this.state.to_be_force == 1 && !STORAGE.isAgent()?
			                    <NonIpdPopupView {...this.props} nonIpdLeads={this.nonIpdLeads.bind(this)} closeIpdLeadPopup = {this.closeIpdLeadPopup.bind(this)} is_force={this.state.showNonIpdPopup} is_hpp={true} hospital_data={this.props.ipd_hospital_detail}/>
			                    :''*/
			                }

							<HospitalInfo hospital_data={this.props.ipd_hospital_detail} showPopup={showPopup} isSeo={this.state.seoFriendly} />

							
							{
								this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.other_network_hospitals && this.props.ipd_hospital_detail.other_network_hospitals.length?
								<IpdCarousel {...this.props} hospital_data ={this.props.ipd_hospital_detail}/>
								:''
							}

							<div className="ipd-tabs-container">
								<a href={`${this.props.location && this.props.location.pathname?`${this.props.location.pathname}?type#doctors`:''}`} className={`ipd-tb-tabs ${this.state.toggleTabType == 'doctors' ? ' ipd-tb-active' : ''}`} onClick={(e)=>{
									e.preventDefault()
									this.toggleTabs('doctors')
								}}>Doctors</a>
								{
									this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.bed_count && false ?
										<a href={`${this.props.location && this.props.location.pathname?`${this.props.location.pathname}?type#bookNow`:''}`} className={`ipd-tb-tabs ${this.state.toggleTabType == 'bookNow' ? ' ipd-tb-active' : ''}`} onClick={(e)=>{
											e.preventDefault()
											this.toggleTabs('bookNow')
										}}>Book Now</a>
										: ''
								}
								{
									this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.rating_graph && this.props.ipd_hospital_detail.rating_graph.star_count && this.props.ipd_hospital_detail.display_rating_widget?
										<a href={`${this.props.location && this.props.location.pathname?`${this.props.location.pathname}?type#feedback`:''}`} className={`ipd-tb-tabs ${this.state.toggleTabType == 'feedback' ? ' ipd-tb-active' : ''}`} onClick={(e)=>{
											e.preventDefault()
											this.toggleTabs('feedback')
										}}>Feedback</a>
										:''	
								}
								{
									this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.offers && this.props.ipd_hospital_detail.offers.length?
									<a href={`${this.props.location && this.props.location.pathname?`${this.props.location.pathname}?type#offers`:''}`} className={`ipd-tb-tabs ${this.state.toggleTabType == 'offers' ? ' ipd-tb-active' : ''}`} onClick={(e)=>{
										e.preventDefault()
										this.toggleTabs('offers')
									}}>Offers</a>
									:''	
								}

							</div>
							{
								this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.is_ipd_hospital ?
									<div id="common_search" className="ipd-sl-srch">
										<CommonSearch {...this.props} hospital_id_search={this.props.hospital_id} commonSearch={true} getInputFocus={this.getInputFocus.bind(this)} hospital_lat={this.props.ipd_hospital_detail.lat} hospital_long={this.props.ipd_hospital_detail.long} hospital_search_name={this.props.ipd_hospital_detail.name || ''} />
									</div>
									: ''
							}

							{
								this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.all_specialization_groups && this.props.ipd_hospital_detail.all_specialization_groups.length ?
									<div className="sort-sub-filter-container mb-3">
										<p><span className="fw-700">Popular Specializations</span></p>
										<div className="srt-sb-btn-cont">
											{
												this.props.ipd_hospital_detail.all_specialization_groups.map((category, j) => {
													return <button key={j} className='srt-act' id={category.id} onClick={this.applyQuickFilters.bind(this, category)}> {category.name}</button>
												})
											}
										</div>
									</div> : ''
							}
							<div id="doctors" ref="doctors">
								{
									this.props.ipd_hospital_detail && ((this.props.ipd_hospital_detail.doctors && this.props.ipd_hospital_detail.doctors.result.length) || (this.props.ipd_hospital_detail.specialization_doctors && this.props.ipd_hospital_detail.specialization_doctors.result.length)) ?
										<div>
											<div>
												<div className="card-head"><h2 className="dsply-ipd-hdng">{`${this.props.ipd_hospital_detail.seo_title?this.props.ipd_hospital_detail.seo_title:this.props.ipd_hospital_detail.name_city ? this.props.ipd_hospital_detail.name_city : ''} Doctors List`}</h2></div>
												{
													this.props.ipd_hospital_detail.specialization_doctors && this.props.ipd_hospital_detail.specialization_doctors.result.length ?
														this.props.ipd_hospital_detail.specialization_doctors.result.map((doctorCard, i) => {
															return <DoctorResultCard details={doctorCard} key={i} rank={i} seoFriendly={this.props.ipd_hospital_detail.specialization_doctors.seo} {...this.props} isHospitalPage={true} />
														})
														: this.props.ipd_hospital_detail.doctors.result.map((doctorCard, i) => {
															return <DoctorResultCard details={doctorCard} key={i} rank={i} seoFriendly={this.props.ipd_hospital_detail.doctors.seo} {...this.props} isHospitalPage={true} />
														})
												}
											</div>
											<div className="algn-anchr">

												{
													this.props.ipd_hospital_detail.specialization_doctors && this.props.ipd_hospital_detail.specialization_doctors.result.length ?
														<a href="javascript:void(0);" onClick={this.viewDoctorsClicked.bind(this, this.props.specialization_id || '')}>{this.getSpecializationName()}</a>
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
								this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.bed_count && false ?
									<div id="bookNow" ref="bookNow" className="nav_top_bar">
										<IpdFormView {...this.props} tabView={true} formSource='IpdHospitalDetailPage' />
									</div>
									: ''
							}

							<div id="feedback" ref="feedback" className="mt-1">
								{
									this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.rating_graph && this.props.ipd_hospital_detail.rating_graph.star_count && this.props.ipd_hospital_detail.display_rating_widget ?
										<div className="hs-card">
											<div className="card-head"><h2 className="dsply-ipd-hdng">Reviews for {this.props.ipd_hospital_detail.name ? this.props.ipd_hospital_detail.name : ''}</h2></div>
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
								this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.offers && this.props.ipd_hospital_detail.offers.length ?
									<div id="offers" ref="offers">
										<IpdOffersPage {...this.props} offers={this.props.ipd_hospital_detail.offers} />
									</div>
									: ''
							}

							<div ref="view_more">
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

							{/*
								this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.other_network_hospitals && this.props.ipd_hospital_detail.other_network_hospitals.length ?
									<HospitalLocations hospital_data={this.props.ipd_hospital_detail} />

									: ''
							*/}

							{/* {
								this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.images && this.props.ipd_hospital_detail.images.length ?
									<HospitalGallery hospital_data={this.props.ipd_hospital_detail} />
									: ''
							} */}


							{
								this.props.ipd_hospital_detail && (this.props.ipd_hospital_detail.new_about) ?
									<HospitalAboutUs hospital_data={this.props.ipd_hospital_detail} />
									: ''
							}

							{
								this.props.ipd_hospital_detail && this.props.ipd_hospital_detail.question_answers && this.props.ipd_hospital_detail.question_answers.length ?
									<IpdQuestionAnswer hospital_data={this.props.ipd_hospital_detail} />
									: ''
							}

		                    <div className="ipd-wdg-pdng">
		                        {
	                                this.props.hospitalComments && this.props.hospitalComments.length?
	                                    <div className="">
	                                        <h4 className="comments-main-heading">{`User Comments (${this.props.hospitalComments.length})`}</h4>
	                                        {
	                                            this.props.hospitalComments.map((comment, key) => {
	                                                return <Reply key={comment.id} commentReplyClicked={this.commentReplyClicked.bind(this)} isUserLogin={isUserLogin} {...this.props} {...this.state} 
	                                                	loadComments={this.loadComments.bind(this)} postComment={this.props.postHospitalComments}

	                                                 postReply={this.postReply.bind(this)} handleInputComment={this.handleInputComment.bind(this)} commentData={comment} commentsExists={commentsExists} hospitalPage={true} hospital_id={this.props.ipd_hospital_detail.id}
	                                                  notArticle={true}/>
	                                            })}
	                                    </div>
	                                    : ''
		                        }

                                <div className="">
                                    <div className="widget mrb-15 mrng-top-12 p-0">
                                        <div className="widget-content">
                                            <CommentBox {...this.props} {...this.state}  parentCommentId={this.state.replyOpenFor} hospitalPage={true} parentCommentId='' hospital_id={this.props.ipd_hospital_detail.id} loadComments={this.loadComments.bind(this)} postComment={this.props.postHospitalComments}/>
                                        </div>
                                    </div>
                                </div>
		                            
		                    </div>

							{
								this.props.ipd_chat || showPopup || (this.props.ipd_hospital_detail && !this.props.ipd_hospital_detail.is_ipd_hospital) ? ''
									: parsed.fromProcedure ?
										<div className="btn-search-div btn-apply-div btn-sbmt"><a href="javascript:void(0);" onClick={this.getCostEstimateClicked.bind(this)} className="btn-search">Get Cost Estimate</a></div>
										: <div className="btn-search-div btn-apply-div btn-sbmt"><a href="javascript:void(0);" onClick={this.getCostEstimateClicked.bind(this)} className="btn-search">Need Help?</a></div>
							}


						</div>
						: <Loader />
				}

			</React.Fragment>
		)
	}
}

export default HospitalDetailView