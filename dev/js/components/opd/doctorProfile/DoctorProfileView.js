import React from 'react';

import Loader from '../../commons/Loader'
import RatingProfileCard from '../../commons/ratingsProfileView/RatingProfileCard.js'
import ComplimentListView from '../../commons/ratingsProfileView/ComplimentListView.js'
import DoctorProfileCard from '../commons/doctorProfileCard'
import AboutDoctor from '../doctorProfile/aboutDoctor/index.js'
import ProfessionalGraph from '../doctorProfile/professionalGraph/index.js'
import ClinicSelector from '../commons/clinicSelector/index.js'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import HelmetTags from '../../commons/HelmetTags'
import CONFIG from '../../../config'
import Footer from '../../commons/Home/footer'
import ContactPoupView from '../doctorProfile/ContactPopup.js'

import GTM from '../../../helpers/gtm.js'
import InitialsPicture from '../../commons/initialsPicture';
import ReviewList from '../../commons/ratingsProfileView/ReviewList.js'
import RatingGraph from '../../commons/ratingsProfileView/RatingGraph.js'
import RatingReviewView from '../../commons/ratingsProfileView/ratingReviewView.js'
import RatingStars from '../../commons/ratingsProfileView/RatingStars';
import HospitalPopUp from '../../commons/ratingsProfileView/HospitalPopUp.js'
import STORAGE from '../../../helpers/storage'
import IpdLeadForm from '../../../containers/ipd/ipdLeadForm.js'
import IpdSecondPopup from '../../../containers/ipd/IpdDoctorCityPopup.js'
import NonBookableDoctor from './nonBookableDoctor.js'
import VIPPopup from './vipProfilePopup.js'
import NonIpdPopupView from '../../commons/nonIpdPopup.js'

const queryString = require('query-string');

class DoctorProfileView extends React.Component {
    constructor(props) {
        super(props)
        let footerData = null
        if (this.props.initialServerData) {
            footerData = this.props.initialServerData.footerData
        }
        const parsed = queryString.parse(this.props.location.search)
        this.state = {
            footerData,
            seoFriendly: this.props.match.url.includes('-dpp'),
            selectedClinic: this.props.hospital_id || "",
            is_live: false,
            rank: 0,
            consultation_fee: 0,
            numberShown: "",
            searchShown: false,
            searchDataHidden: this.props.location.search.includes('hide_search_data'),
            openContactPopup: false,
            clinicPhoneNo: {},
            show_contact: '',
            isOrganic: this.props.location.search.includes('hospital_id'),
            displayHospitalRatingBlock: 0,
            showIpdLeadForm: true,
            showSecondPopup: false,
            firstLeadId: '',
            closeNonBookable: false,
            showVipPopup: false,
            showNonIpdPopup: parsed.show_popup,
            to_be_force:1,
            is_organic_landing:false,
            is_lead_enabled:true
        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
        if (this.state.seoFriendly) {
            this.props.getFooterData(this.props.match.url.split('/')[1]).then((footerData) => {
                if (footerData) {
                    this.setState({ footerData: footerData })
                }
            })
        }

        if (this.props.app_download_list && !this.props.app_download_list.length) {

            this.props.getDownloadAppBannerList((resp) => {
                if (resp && resp.length && resp[0].data) {
                    this.showDownloadAppWidget(resp[0].data)
                }
            })
        } else {
            this.showDownloadAppWidget(this.props.app_download_list)
        }

        this.setState({ searchShown: true })
        let time_to_show = 2000
        let doctor_id = this.props.selectedDoctor
        if (this.props.initialServerData && this.props.initialServerData.doctor_id) {
            doctor_id = this.props.initialServerData.doctor_id
        }
        if(this.props.DOCTORS[doctor_id]) {
            time_to_show = 1000
        }
        // setTimeout(()=>{
        //     this.setState({showVipPopup: true})
        // }, time_to_show)
        this.setState({is_organic_landing:true})
    }

    showDownloadAppWidget(dataList) {
        let landing_page = false
        if (typeof window == 'object' && window.ON_LANDING_PAGE) {
            landing_page = true
        }

        let downloadAppButtonData = {}

        if (landing_page && dataList && dataList.length) {

            dataList.map((banner) => {
                if (banner.isenabled && (this.props.match.url.includes(banner.ends_with) || this.props.match.url.includes(banner.starts_with))) {
                    downloadAppButtonData = banner
                }
            })
        }


        if (Object.values(downloadAppButtonData).length) {

            let gtmTrack = {
                'Category': 'ConsumerApp', 'Action': 'DownloadAppButtonVisible', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'download-app-button-visible', 'starts_with': downloadAppButtonData.starts_with ? downloadAppButtonData.starts_with : '', 'ends_with': downloadAppButtonData.ends_with ? downloadAppButtonData.ends_with : '', 'device': this.props.device_info
            }
            GTM.sendEvent({ data: gtmTrack })
        }
    }

    getMetaTagsData(seoData) {
        let title = ""
        let description = ""
        let schema = {}
        if (seoData) {
            title = seoData.title || ""
            description = seoData.description || ""
            schema = seoData.schema
        }
        return { title, description, schema }
    }

    selectClinic(clinic_id, is_live, rank, consultation_fee, show_contact) {
        let clinicPhoneNo = this.state.clinicPhoneNo
        if (!clinicPhoneNo[clinic_id]) {
            clinicPhoneNo[clinic_id] = ""
        }
        this.setState({ selectedClinic: clinic_id, is_live, rank, numberShown: "", consultation_fee: consultation_fee, clinicPhoneNo: clinicPhoneNo, show_contact: show_contact })
    }

    navigateToClinic(doctor_id, clinicId, topBookNow) {
        let rank = this.state.rank
        if (topBookNow) {
            let gtmData = {
                'Category': 'ConsumerApp', 'Action': 'OpdTopBookNowClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'opd-top-book-now-clicked', 'selectedId': clinicId || ''
            }
            GTM.sendEvent({ data: gtmData })
        }
        if (this.state.is_live) {

            let data = {
                'Category': 'ConsumerApp', 'Action': 'OpdBookNowClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'opd-book-now-clicked', 'selectedId': clinicId || ''
            }
            GTM.sendEvent({ data: data })

            data = {
                'Category': 'ConsumerApp', 'Action': 'OpdBookNowRank', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'opd-book-now-rank', 'rank': rank + 1
            }
            GTM.sendEvent({ data: data })
            this.props.saveProfileProcedures(doctor_id, clinicId)

            if (this.state.seoFriendly) {
                this.props.history.push(`${window.location.pathname}/booking?doctor_id=${doctor_id}&hospital_id=${clinicId}`)
            } else {
                this.props.history.push(`/opd/doctor/${doctor_id}/${clinicId}/bookdetails`)
            }
        }
    }

    getDoctorNo(mobileNo) {
        let doctor_id = this.props.selectedDoctor
        if (this.props.initialServerData && this.props.initialServerData.doctor_id) {
            doctor_id = this.props.initialServerData.doctor_id
        }

        let data = {
            'Category': 'ConsumerApp', 'Action': 'SubmitPhoneNo', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'submit-phone-no', 'doctor_id': doctor_id, "hospital_id": this.state.selectedClinic, 'mobileNo': mobileNo
        }
        GTM.sendEvent({ data: data })
        let postData = {
            "mobile": mobileNo,
            "doctor": doctor_id,
            "hospital": this.state.selectedClinic
        }
        this.props.getDoctorNo(postData, (err, data) => {
            if (!err && data) {

                let clinicPhoneNo = this.state.clinicPhoneNo
                clinicPhoneNo[this.state.selectedClinic] = data.number

                this.setState({
                    numberShown: data.number,
                    openContactPopup: false,
                    clinicPhoneNo: clinicPhoneNo
                })
            }
        })
    }

    showNumber(id, e) {
        e.preventDefault()
        e.stopPropagation()

        let data = {
            'Category': 'ConsumerApp', 'Action': 'ShowNoClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'show-no-clicked', 'doctor_id': id, "hospital_id": this.state.selectedClinic
        }
        if (!this.state.clinicPhoneNo[this.state.selectedClinic]) {
            GTM.sendEvent({ data: data })
            /*this.props.getDoctorNumber(id, this.state.selectedClinic, (err, data) => {
                if (!err && data.number) {
                    this.setState({
                        numberShown: data.number
                    })
                }
            })*/
            this.setState({ openContactPopup: true })
        }
    }

    toggle(which) {
        this.setState({ [which]: !this.state[which] })
    }

    navigateToDoctor(doctor, e) {
        e.preventDefault();
        if (doctor.url) {
            this.props.history.push(`/${doctor.url}`);
        }
        else {
            this.props.history.push(`/opd/doctor/${doctor.id}`);
        }

        let data = {
            'Category': 'ConsumerApp', 'Action': 'recommendedDoctorClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'recommended-doctor-click', 'DoctorID': doctor.doctor_id
        }
        GTM.sendEvent({ data: data })
    }

    viewAllDocClick(nearbyDoctors) {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'viewAllDoctorsClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'view-all-doctors-click'
        }
        GTM.sendEvent({ data: data })

        window.open(nearbyDoctors.doctors_url, '_self');

    }

    display_hospital_rating_block = () => {
        this.setState({ displayHospitalRatingBlock: 1 })
    }

    hospitalPopUpState() {
        this.setState({ displayHospitalRatingBlock: 0 })
    }

    downloadButton(data) {
        let gtmTrack = {
            'Category': 'ConsumerApp', 'Action': 'DownloadAppButtonClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'download-app-button-clicked', 'starts_with': data.starts_with ? data.starts_with : '', 'ends_with': data.ends_with ? data.ends_with : '', 'device': this.props.device_info
        }
        GTM.sendEvent({ data: gtmTrack })
        if (window) {
            window.open(data.URL, '_self')
        }
    }

    submitLeadFormGeneration(ipdFormParams) {
        if (ipdFormParams) {
            let gtmData = {
                'Category': 'ConsumerApp', 'Action': 'DoctorProfileIpdFormClosed', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-profile-ipd-form-closed'
            }
            GTM.sendEvent({ data: gtmData })
        }
        let ipd_data = {
            showChat: true,
            ipdFormParams: ipdFormParams
        }

        this.setState({ showIpdLeadForm: false, showSecondPopup: true }, () => {
            // this.props.ipdChatView({showIpdChat:true, ipdForm: ipdFormParams, showMinimize:true})   
        })
    }

    saveLeadIdForUpdation(response) {
        if (response.id) {
            this.setState({ firstLeadId: response.id, showSecondPopup: true })
        }
    }

    secondIpdFormSubmitted() {
        this.setState({ showSecondPopup: false })
    }

    closeNonBookableDocPopup() {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'NonBookableDoctorCrossClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'Non-Bookable-Doctor-cross-clicked'
        }
        GTM.sendEvent({ data: data })
        this.setState({ closeNonBookable: true })
    }

    toggleVip(){
        let data = {
            'Category': 'ConsumerApp', 'Action': 'DocProfileCrossClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'Doctor-profile-cross-clicked'
        }
        GTM.sendEvent({ data: data })
        this.setState({showVipPopup: false})
    }

    navigateToVip(){
        let data = {
            'Category': 'ConsumerApp', 'Action': 'DocProfileVipNavigation', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'Doctor-profile-vip-navigation', 'doctorId': this.props.selectedDoctor
        }
        GTM.sendEvent({ data: data })
        this.props.history.push('/vip-club-details?source=doctor-profile-page&lead_source=doctorpage')

    }

    goldClicked(id) {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'NonBookableVipGoldClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'non-bookable-vip-gold-clicked', 'selectedId': id
        }
        GTM.sendEvent({ data: data })
        this.props.history.push('/vip-gold-details?is_gold=true&source=docgoldlisting&lead_source=Docprime')
    }

    nonIpdLeads(phone_number){
        let landing_page = false
        if (typeof window == 'object' && window.ON_LANDING_PAGE) {
            landing_page = true
        }
        const parsed = queryString.parse(this.props.location.search)
        let doctor_id = this.props.selectedDoctor
        if (this.props.initialServerData && this.props.initialServerData.doctor_id) {
            doctor_id = this.props.initialServerData.doctor_id
        }
        let criteriaStr = this.props.DOCTORS[doctor_id].display_name
        let hospital_id
        let display_total_mrp = 0
        let display_docprime_discount = 0
        let selected_hospital = this.props.DOCTORS[doctor_id].hospitals.filter(x => x.hospital_id == this.state.selectedClinic)
        if(selected_hospital.length){
            hospital_id = selected_hospital[0].hospital_id
            display_total_mrp = parseInt(selected_hospital[0].mrp)
            display_docprime_discount = display_total_mrp - (parseInt(selected_hospital[0].deal_price))
            if(!selected_hospital[0].insurance.is_user_insured && !selected_hospital[0].vip.is_vip_member && !selected_hospital[0].vip.is_gold_member && selected_hospital[0].vip.is_enable_for_vip){
                display_docprime_discount = display_total_mrp - (selected_hospital[0].vip.vip_convenience_amount + selected_hospital[0].vip.vip_gold_price)
            }
        }
        //check if any utm tag exist in url
        let isUtmTagsExist = false
        if (parsed.utm_source || parsed.utm_medium || parsed.utm_term || parsed.utm_campaign) {
            isUtmTagsExist = true
        }
        let data =({phone_number:phone_number,lead_source:`${!isUtmTagsExist && landing_page?'docorganic':'docads'}`,source:parsed,lead_type:'DOCADS',exitpoint_url:`http://docprime.com${this.props.location.pathname}/booking?doctor_id=${doctor_id}&hospital_id=${hospital_id}`,doctor_id:doctor_id,hospital_id:hospital_id,doctor_name:null,hospital_name:null,is_organic:landing_page,amount_discount: display_docprime_discount})
        if(this.props.common_utm_tags && this.props.common_utm_tags.length){
            data.utm_tags = this.props.common_utm_tags.filter(x=>x.type == "common_xtra_tags")[0].utm_tags
        }
        let visitor_info = GTM.getVisitorInfo()
            if(visitor_info && visitor_info.visit_id){
                data.visit_id = visitor_info.visit_id
                data.visitor_id = visitor_info.visitor_id
            }
        let gtm_data = {'Category': 'ConsumerApp', 'Action': 'DocAdsDppSubmitClick', 'CustomerID': GTM.getUserId() || '', 'event': 'doc-ads-hpp-Submit-click',is_organic:landing_page}
        GTM.sendEvent({ data: gtm_data })
        this.props.saveLeadPhnNumber(phone_number)
        if(this.state.is_lead_enabled && !STORAGE.isAgent()){
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
                    'Category': 'ConsumerApp', 'Action': 'DocAdsDppCrossClick', 'CustomerID': GTM.getUserId() || '', 'event': 'doc-ads-hpp-cross-click'
                }
            GTM.sendEvent({ data: data })
            this.setState({to_be_force:0})
        }
    }

    render() {
        let doctor_id = this.props.selectedDoctor
        let enabled_for_online_booking = false
        let show_dpp_organic_popup = false
        if (this.props.initialServerData && this.props.initialServerData.doctor_id) {
            doctor_id = this.props.initialServerData.doctor_id
        }
        let final_price = parseInt(this.state.consultation_fee)
        if (this.props.selectedDoctorProcedure[doctor_id] && this.props.selectedDoctorProcedure[doctor_id][this.state.selectedClinic] && this.props.selectedDoctorProcedure[doctor_id][this.state.selectedClinic].categories) {

            final_price += parseInt(this.props.selectedDoctorProcedure[doctor_id][this.state.selectedClinic].price.deal_price) || 0
        }

        let search_data = null
        let seo_url = ""
        if (this.props.DOCTORS[doctor_id] && this.props.DOCTORS[doctor_id].search_data) {
            search_data = this.props.DOCTORS[doctor_id].search_data
        }
        let doc_organic_price =0
        if (this.props.DOCTORS[doctor_id]) {
            enabled_for_online_booking = this.props.DOCTORS[doctor_id].enabled_for_online_booking
            doc_organic_price = this.props.DOCTORS[doctor_id].lead_compare_amount
            if(this.props.DOCTORS[doctor_id].hospitals && this.props.DOCTORS[doctor_id].hospitals.length){
                this.props.DOCTORS[doctor_id].hospitals.map((hospital, i) => {
                    if(!hospital.insurance.is_user_insured && !hospital.vip.is_vip_member && !hospital.vip.is_gold_member && hospital.vip.is_enable_for_vip && (hospital.discounted_price -(hospital.vip.vip_convenience_amount + hospital.vip.vip_gold_price) >= doc_organic_price)){
                        show_dpp_organic_popup = true
                    }
                })
            }
            seo_url = this.props.DOCTORS[doctor_id].url || ""
            if (seo_url) {
                seo_url = "/" + seo_url
            }
        }
        let nearbyDoctors = {}
        if (this.props.DOCTORS[doctor_id] && this.props.DOCTORS[doctor_id].doctors && Object.keys(this.props.DOCTORS[doctor_id].doctors).length) {
            nearbyDoctors = this.props.DOCTORS[doctor_id].doctors;
        }

        let is_insurance_applicable = false
        if (this.state.selectedClinic && this.props.DOCTORS[doctor_id] && this.props.DOCTORS[doctor_id].hospitals && this.props.DOCTORS[doctor_id].hospitals.length) {
            this.props.DOCTORS[doctor_id].hospitals.map((hospital) => {
                if (hospital.hospital_id == this.state.selectedClinic) {
                    is_insurance_applicable = hospital.insurance.is_insurance_covered && hospital.insurance.is_user_insured
                }
            })
        }
        //Check if reviews exist for doctor, if not then pick the google reviews for that doctor/hospital
        let google_rating = {}
        if (this.props.DOCTORS[doctor_id] && !this.props.DOCTORS[doctor_id].display_rating_widget) {

            if (this.props.DOCTORS[doctor_id].google_rating && this.props.DOCTORS[doctor_id].google_rating[this.state.selectedClinic] && this.props.DOCTORS[doctor_id].google_rating[this.state.selectedClinic].google_rating && this.props.DOCTORS[doctor_id].google_rating[this.state.selectedClinic].google_rating.length && this.props.DOCTORS[doctor_id].google_rating[this.state.selectedClinic].google_rating_graph && this.props.DOCTORS[doctor_id].google_rating[this.state.selectedClinic].google_rating_graph.avg_rating && this.props.DOCTORS[doctor_id].google_rating[this.state.selectedClinic].google_rating_graph.rating_count) {

                google_rating.rating = this.props.DOCTORS[doctor_id].google_rating[this.state.selectedClinic].google_rating
                google_rating.rating_graph = this.props.DOCTORS[doctor_id].google_rating[this.state.selectedClinic].google_rating_graph
            }
        }

        let avgRating = ''
        let ratingCount = ''
        if (this.props.DOCTORS[doctor_id] && this.props.DOCTORS[doctor_id].rating_graph && this.props.DOCTORS[doctor_id].rating_graph.avg_rating && this.props.DOCTORS[doctor_id].rating_graph.rating_count) {
            avgRating = this.props.DOCTORS[doctor_id].rating_graph.avg_rating;
            ratingCount = this.props.DOCTORS[doctor_id].rating_graph.rating_count;
        }

        let show_google_rating = Object.values(google_rating).length > 0

        //Get Selected Clinic/Hospital Name
        let selectedClinicName = ''

        if (this.props.DOCTORS[doctor_id] && this.props.DOCTORS[doctor_id].hospitals && this.props.DOCTORS[doctor_id].hospitals.length && this.state.selectedClinic) {

            let selectedClinicInfo = this.props.DOCTORS[doctor_id].hospitals.filter(x => x.hospital_id == this.state.selectedClinic)

            selectedClinicName = selectedClinicInfo.length ? selectedClinicInfo[0].hospital_name : ''
        }

        let landing_page = false
        if (typeof window == 'object' && window.ON_LANDING_PAGE) {
            landing_page = true
        }

        let downloadAppButtonData = {}

        if (landing_page && this.props.app_download_list && this.props.app_download_list.length) {

            this.props.app_download_list.map((banner) => {
                if (banner.isenabled && (this.props.match.url.includes(banner.ends_with) || this.props.match.url.includes(banner.starts_with))) {
                    downloadAppButtonData = banner
                }
            })
        }

        const parsed = queryString.parse(this.props.location.search)
        //check if any utm tag exist in url
        let isUtmTagsExist = false
        if (parsed.utm_source || parsed.utm_medium || parsed.utm_term || parsed.utm_campaign) {
            isUtmTagsExist = true
        }
        let showForcedPopup = !isUtmTagsExist && landing_page && this.state.seoFriendly && doctor_id && this.props.DOCTORS[doctor_id] && this.props.DOCTORS[doctor_id].is_congot && this.state.showIpdLeadForm && this.props.DOCTORS[doctor_id].potential_ipd && !this.state.is_live
        showForcedPopup = false
        let isSeoValid= true
        if(CONFIG.SEO_FRIENDLY_HOSPITAL_IDS && this.state.selectedClinic &&  CONFIG.SEO_FRIENDLY_HOSPITAL_IDS.indexOf(parseInt(this.state.selectedClinic))> -1){
            isSeoValid = false
        }
        let showVipPopup = this.state.showVipPopup
        if(nearbyDoctors && Object.keys(nearbyDoctors).length){
             showVipPopup = showVipPopup && this.state.closeNonBookable
        }
        return (
            <div className="profile-body-wrap">
                <ProfileHeader showSearch={true} />
                {
                    (this.props.DOCTORS[doctor_id] && parsed.showPopup && this.state.showIpdLeadForm && typeof window == 'object' && window.ON_LANDING_PAGE) || showForcedPopup ?
                        <IpdLeadForm submitLeadFormGeneration={this.submitLeadFormGeneration.bind(this)} {...this.props} hospital_name={selectedClinicName} hospital_id={this.state.selectedClinic} doctor_name={this.props.DOCTORS[doctor_id].name ? this.props.DOCTORS[doctor_id].name : ''} formSource='DoctorBookingPage' saveLeadIdForUpdation={this.saveLeadIdForUpdation.bind(this)} />
                        : ''
                }
                {
                    this.props.DOCTORS[doctor_id] && this.state.showSecondPopup && parsed.get_feedback && parsed.get_feedback == '1' ?
                        <IpdSecondPopup {...this.props} firstLeadId={this.state.firstLeadId} all_doctors={[]} all_cities={this.props.DOCTORS[doctor_id] && this.props.DOCTORS[doctor_id].all_cities ? this.props.DOCTORS[doctor_id].all_cities : []} doctorProfilePage={true} secondIpdFormSubmitted={this.secondIpdFormSubmitted.bind(this)} hospital_name={selectedClinicName} hospital_id={this.state.selectedClinic} doctor_name={this.props.DOCTORS[doctor_id].name ? this.props.DOCTORS[doctor_id].name : ''} formSource='DoctorBookingPage' />
                        : ''
                }
                {
                    nearbyDoctors && Object.keys(nearbyDoctors).length && !this.state.closeNonBookable ?
                        <NonBookableDoctor {...this.props} closeNonBookableDocPopup={this.closeNonBookableDocPopup.bind(this)} nearbyDoctors={nearbyDoctors} navigateToDoctor={this.navigateToDoctor.bind(this)} details={this.props.DOCTORS[doctor_id]} />
                        : ''
                }
                {
                    /*(this.state.showNonIpdPopup == 1 || this.state.showNonIpdPopup == 2) && this.state.to_be_force == 1?
                    <NonIpdPopupView {...this.props} nonIpdLeads={this.nonIpdLeads.bind(this)} closeIpdLeadPopup = {this.closeIpdLeadPopup.bind(this)} is_force={this.state.showNonIpdPopup} is_dpp={true} doctor_id={doctor_id} hospital_id={this.state.selectedClinic}/>
                    :''*/
                }
                {
                    /*show_dpp_organic_popup && this.state.seoFriendly && enabled_for_online_booking && landing_page && this.state.is_organic_landing && this.state.to_be_force == 1 && !isUtmTagsExist?
                     <NonIpdPopupView {...this.props} nonIpdLeads={this.nonIpdLeads.bind(this)} closeIpdLeadPopup = {this.closeIpdLeadPopup.bind(this)} is_force={this.state.showNonIpdPopup} is_dpp={true} doctor_id={doctor_id} is_organic={false} hospital_id={this.state.selectedClinic}/>
                    :''*/
                }
                <section className="container parent-section book-appointment-section breadcrumb-mrgn">
                    {this.props.DOCTORS[doctor_id] && this.props.DOCTORS[doctor_id].breadcrumb && this.props.DOCTORS[doctor_id].breadcrumb.length ?
                        <section className="col-12 mrng-top-12 d-none d-md-block">
                            <ul className="mrb-10 breadcrumb-list breadcrumb-list-ul" style={{ 'wordBreak': 'breakWord' }}>
                                {
                                    this.props.DOCTORS[doctor_id] && this.props.DOCTORS[doctor_id].breadcrumb && this.props.DOCTORS[doctor_id].breadcrumb.length ?
                                        this.props.DOCTORS[doctor_id].breadcrumb.map((data, key) => {
                                            return <li className="breadcrumb-list-item" key={key}>
                                                {
                                                    key == this.props.DOCTORS[doctor_id].breadcrumb.length - 1 ?
                                                        <span>{data.title}</span>
                                                        : <a href={data.url} title={data.link_title || data.title} onClick={(e) => {
                                                            e.preventDefault();
                                                            this.props.history.push((key == 0 || key == this.props.DOCTORS[doctor_id].breadcrumb.length - 1) ? data.url : `/${data.url}`)
                                                        }}>
                                                            {
                                                                key == 0 || key == this.props.DOCTORS[doctor_id].breadcrumb.length - 1
                                                                    ? <span className="fw-500 breadcrumb-title breadcrumb-colored-title">{data.title}</span>
                                                                    : <h2 className="fw-500 breadcrumb-title breadcrumb-colored-title d-inline-blck">{data.title}</h2>
                                                            }
                                                        </a>
                                                }
                                                {
                                                    key != this.props.DOCTORS[doctor_id].breadcrumb.length - 1 ?
                                                        <span className="breadcrumb-arrow">&gt;</span>
                                                        : ''
                                                }
                                            </li>
                                        })
                                        : ''
                                }
                            </ul>
                        </section>
                        : ''
                    }
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            {
                                this.props.DOCTORS[doctor_id] ?

                                    <section className="dr-profile-screen" style={{ paddingBottom: 0 }}>
                                        {
                                            !parsed.showPopup && downloadAppButtonData && Object.values(downloadAppButtonData).length ?
                                                <a className="downloadBtn" href="javascript:void(0);" onClick={this.downloadButton.bind(this, downloadAppButtonData)}>

                                                    <button className="dwnlAppBtn">
                                                        {
                                                            !this.props.device_info ? ''
                                                                : (this.props.device_info.toLowerCase().includes('iphone') || this.props.device_info.toLowerCase().includes('ipad')) ?
                                                                    <img style={{ width: '13px', marginRight: '5px', marginTop: '-1px' }} src={ASSETS_BASE_URL + "/img/appl1.svg"} />
                                                                    : <img style={{ width: '13px', marginRight: '5px' }} src={ASSETS_BASE_URL + "/img/andr1.svg"} />
                                                        }
                                                        Download App

                                                </button>
                                                </a>
                                                : ''
                                        }

                                        <HelmetTags tagsData={{
                                            title: this.getMetaTagsData(this.props.DOCTORS[doctor_id].seo).title,
                                            description: this.getMetaTagsData(this.props.DOCTORS[doctor_id].seo).description,
                                            canonicalUrl: `${CONFIG.API_BASE_URL}${seo_url || this.props.match.url}`,
                                            schema: this.getMetaTagsData(this.props.DOCTORS[doctor_id].seo).schema
                                        }} noIndex={!this.state.seoFriendly || !isSeoValid} />

                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-12">
                                                    {
                                                        this.state.is_live && landing_page && this.state.seoFriendly ?
                                                            <button className="doc-top-book-btn" onClick={this.navigateToClinic.bind(this, doctor_id, this.state.selectedClinic, true)}>
                                                                Book Now
                                                        </button>
                                                            : ''
                                                    }

                                                    {/* Hospital Selection Block */}
                                                    {this.state.displayHospitalRatingBlock ?
                                                        <HospitalPopUp {...this.props} doctor_details={this.props.DOCTORS[doctor_id]} popUpState={this.hospitalPopUpState.bind(this)} /> : ""
                                                    }

                                                    {
                                                        this.props.DOCTORS[doctor_id].unrated_appointment
                                                            ? <RatingProfileCard {...this.props} details={this.props.DOCTORS[doctor_id].unrated_appointment} /> : ""
                                                    }
                                                    <div className="widget mrt-10 ct-profile skin-white border-bottom-radious gold-relative">
                                                        {
                                                            this.props.DOCTORS[doctor_id].is_gold ?
                                                                <img className="gold-card-img" src={ASSETS_BASE_URL + "/img/gold.svg"} />
                                                                : ''
                                                        }
                                                        <DoctorProfileCard
                                                            details={this.props.DOCTORS[doctor_id]}
                                                            getDoctorNumber={this.props.getDoctorNumber}
                                                            recommendDocs={nearbyDoctors.result && nearbyDoctors.result.length}
                                                            viewAllDocClick={this.viewAllDocClick.bind(this)}
                                                            nearbyDoctors={nearbyDoctors ? nearbyDoctors : ''}
                                                            isSeoFriendly={this.state.seoFriendly}
                                                            isOrganic={this.state.isOrganic}
                                                            {...this.props}
                                                        />
                                                        {
                                                            nearbyDoctors && Object.keys(nearbyDoctors).length ?
                                                                <div className="widge-content pd-0">
                                                                    <div className="widget-panel">
                                                                        {/*
                                                                            nearbyDoctors.result && nearbyDoctors.result.length && nearbyDoctors.specializations && nearbyDoctors.specializations.length ?
                                                                                <div className="panel-title mb-rmv p-relative docslideHeadAlign">
                                                                                    <p>Book experienced {nearbyDoctors.specializations[0].name}s near you<span className="docSlideSubHeading">Get exclusive Docprime discount</span>
                                                                                    </p>
                                                                                    {
                                                                                        nearbyDoctors.count >= 1 && nearbyDoctors.doctors_url ?
                                                                                            <span className="docSlideviewAll" onClick={() => this.viewAllDocClick(nearbyDoctors)}>View All <img src={ASSETS_BASE_URL + "/img/arrowRight.svg"} /></span> : ''
                                                                                    }
                                                                                </div> : ''
                                                                        */}
                                                                        <div className="panel-content pd-0 border-bottom-panel">
                                                                            <div className="docScrollSliderContainer">
                                                                                {
                                                                                    nearbyDoctors.result && nearbyDoctors.result.length ?
                                                                                        nearbyDoctors.result.map((doctor, id) => {
                                                                                            return <div className="docSlideCard" key={id} style={{ cursor: 'auto' }}>
                                                                                                <div className="docSlideHead">
                                                                                                    {/* {   // RATING CODE BELOW, DONT DELETE
                                                                                                        doctor.rating_graph.avg_rating ?
                                                                                                            <span className="slideDocRating">{doctor.rating_graph.avg_rating} <img style={{ width: '14px' }} src={ASSETS_BASE_URL + "/img/slidedocrating.svg"} /></span> : ''
                                                                                                    } */}
                                                                                                    <InitialsPicture name={doctor.name} has_image={!!doctor.thumbnail} className="initialsPicture-ds slideDocMainImg" style={{ width: 60, height: 60, fontSize: '2rem' }} >
                                                                                                        <img className="fltr-usr-image img-round slideDocMainImg" src={doctor.thumbnail} alt={doctor.display_name} title={doctor.display_name} />
                                                                                                    </InitialsPicture>
                                                                                                </div>
                                                                                                <div className="slideDocContent">
                                                                                                    {
                                                                                                        doctor.url ?
                                                                                                            <a href={`/${doctor.url}`} onClick={(e) => this.navigateToDoctor(doctor, e)}>
                                                                                                                <p className="slideDocName">{doctor.display_name}</p>
                                                                                                            </a>
                                                                                                            :
                                                                                                            <a href="javascript:;" style={{ cursor: 'auto' }}>
                                                                                                                <p className="slideDocName">{doctor.display_name}</p>
                                                                                                            </a>
                                                                                                    }
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
                                                                                                    {
                                                                                                        (doctor.hospitals[0].is_gold_member || doctor.hospitals[0].is_vip_member ) && doctor.hospitals[0].cover_under_vip ?
                                                                                                            <div className="slideDocPrice mb-0">
                                                                                                                {
                                                                                                                  doctor.hospitals[0].is_gold_member?
                                                                                                                    <span className="slideNamePrc">
                                                                                                                        <img className="non-doc-vip-ico img-fluid" src={ASSETS_BASE_URL + '/img/gold-sm.png'} />
                                                                                                                    </span>
                                                                                                                    :
                                                                                                                    <span className="slideNamePrc">
                                                                                                                        <img className="vip-main-ico img-fluid" src={ASSETS_BASE_URL + '/img/viplog.png'} />
                                                                                                                    </span>   
                                                                                                                }
                                                                                                                <span className="slideNamePrc">₹ {doctor.hospitals[0].vip_convenience_amount + doctor.hospitals[0].vip_gold_price}</span><span className="slideCutPrc">₹ {doctor.mrp}</span>
                                                                                                            </div>  
                                                                                                        :doctor.discounted_price && doctor.mrp ?
                                                                                                            <div className="slideDocPrice mb-0">
                                                                                                                <span className="slideNamePrc">₹ {doctor.discounted_price}</span><span className="slideCutPrc">₹ {doctor.mrp}</span>
                                                                                                            </div> : ''
                                                                                                    }
                                                                                                    {
                                                                                                        doctor.hospitals[0].enabled_for_online_booking 
                                                                                                        && !doctor.hospitals[0].is_gold_member 
                                                                                                        && !doctor.hospitals[0].is_vip_member
                                                                                                        && doctor.discounted_price>(doctor.hospitals[0].vip_convenience_amount + doctor.hospitals[0].vip_gold_price) 
                                                                                                        && doctor.hospitals[0].hosp_is_gold?
                                                                                                        <div className="pkg-prc-ct home-screengoldprice mb-2" onClick={this.goldClicked.bind(this,doctor.id)}>
                                                                                                            <img className="gld-cd-icon" src={ASSETS_BASE_URL + '/img/gold-sm.png'}/> 
                                                                                                            <p className="gld-p-rc">Price</p> <span className="gld-rate-lf">₹ {doctor.hospitals[0].vip_convenience_amount + doctor.hospitals[0].vip_gold_price}</span><img style={{transform: 'rotate(-90deg)', width: '10px', margin:'0px 10px 0px 0px'}} src={ASSETS_BASE_URL + '/img/customer-icons/dropdown-arrow.svg'}/>
                                                                                                            </div>
                                                                                                        :''
                                                                                                    }
                                                                                                    <div className="slidBookBtn">
                                                                                                        <button style={{ cursor: 'pointer' }} onClick={(e) => this.navigateToDoctor(doctor, e)}>Book Now</button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        }) : ''
                                                                                }
                                                                                {/* {
                                                                                    nearbyDoctors.count > 1 && nearbyDoctors.specializations && nearbyDoctors.specializations.length && this.props.selectedLocation && this.props.selectedLocation.formatted_address != '' && nearbyDoctors.doctors_url ?
                                                                                        <div className="docSlideCard">
                                                                                            <div className="docScrollSearchAll">
                                                                                                <img className="img-fluid" src="/assets/images/vall.png" />
                                                                                                <p>View all {nearbyDoctors.count} {nearbyDoctors.specializations[0].name}<br /> in {this.props.selectedLocation.formatted_address} </p>
                                                                                            </div>
                                                                                        </div> : ''
                                                                                } */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div> : ''
                                                        }
                                                        <div className="widge-content pd-0">
                                                            {
                                                                this.props.DOCTORS[doctor_id].about_web ? <AboutDoctor
                                                                    details={this.props.DOCTORS[doctor_id]}
                                                                /> : ""
                                                            }
                                                        </div>
                                                        <div className="widge-content pd-0">

                                                            {
                                                                (this.props.DOCTORS[doctor_id].hospitals && this.props.DOCTORS[doctor_id].hospitals.length) ? <ClinicSelector
                                                                    details={this.props.DOCTORS[doctor_id]}
                                                                    {...this.props} doctorId={doctor_id}
                                                                    selectClinic={this.selectClinic.bind(this)}
                                                                    selectedClinic={this.state.selectedClinic}
                                                                /> : ""
                                                            }

                                                            <ProfessionalGraph
                                                                details={this.props.DOCTORS[doctor_id]}
                                                            />

                                                            {/* this one is rating */}
                                                            {STORAGE.checkAuth() ?
                                                                <div className="widget-panel">
                                                                    <div className="panel-content ratecardBrdr">
                                                                        <div className="rateUrDoc">
                                                                            <p>Rate your Doctor here</p>
                                                                            <button onClick={this.display_hospital_rating_block}>Rate Now</button>
                                                                        </div>
                                                                    </div>
                                                                </div> : ""
                                                            }
                                                            {/* this one is rating */}
                                                            {
                                                                avgRating >= 4 || ratingCount >= 5 ?
                                                                    <RatingReviewView id={doctor_id} content_type={2} {...this.props} />
                                                                    : show_google_rating ?
                                                                        <div className="widget-panel">
                                                                            <h4 className="panel-title mb-rmv">Patient Feedback <a className="rateViewAll">
                                                                            </a></h4>
                                                                            <div className="panel-content pd-0 border-bottom-panel d-flex align-items-start">
                                                                                <div className="googleReviewcard" style={{ flex: 1 }}>
                                                                                    <img src={ASSETS_BASE_URL + "/img/powered_by_google_on_white.png"} />
                                                                                    {
                                                                                        selectedClinicName ? <p>Ratings for<span>{selectedClinicName}</span></p> : ''
                                                                                    }
                                                                                </div>
                                                                                <div className="feed-back-container" style={{ flex: 1, marginBottom: 0 }}>
                                                                                    <div className="row">
                                                                                        <div className="col-12">
                                                                                            {
                                                                                                google_rating.rating_graph && google_rating.rating_graph.avg_rating ?
                                                                                                    <RatingStars average_rating={google_rating.rating_graph.avg_rating} width="12px" height="12px" justifyCenter={true} /> : ''
                                                                                            }
                                                                                            <div className="feedback-rating-text">
                                                                                                <p className="feedback-rate">{google_rating.rating_graph.avg_rating}</p>
                                                                                                <p className="feedback-rate-status">{google_rating.rating_graph.rating_count} ratings
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        : ""
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            showVipPopup && <VIPPopup toggle={()=>this.toggleVip()} navigateToVip={()=>this.navigateToVip()}/>
                                        }
                                        {
                                            this.state.is_live ?
                                                <div className="dpp-btn-div fixed horizontal bottom sticky-btn">
                                                    {/* {
                                                        !this.state.searchDataHidden && search_data && search_data.result_count && search_data.title && search_data.url ?
                                                            <a className="dpp-btn-view" href={'/' + search_data.url} onClick={(e) => {
                                                                e.preventDefault()
                                                                this.props.history.push(`/${search_data.url}`)
                                                                let data = {
                                                                    'Category': 'ConsumerApp', 'Action': 'viewMoreDoctorsClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'view-more-doctors-click'
                                                                }
                                                                GTM.sendEvent({ data: data })
                                                            }} >
                                                                <img src={ASSETS_BASE_URL + "/img/customer-icons/right-orange.svg"} />
                                                                <p>{`View ${search_data.result_count} ${search_data.title}`}</p>
                                                            </a> : ''
                                                    } */}
                                                    <div className="dpp-btn-book dpp-btn-book-custom" onClick={this.navigateToClinic.bind(this, doctor_id, this.state.selectedClinic, false)}>
                                                        {/*<p>{`Book Now (₹ ${final_price})`}</p>*/}
                                                        <p><span style={{ display: 'inline-block' }}>Book Now</span></p>
                                                        {
                                                            is_insurance_applicable || true? ''
                                                                : <p className="cp-auto" style={{ marginBottom: '8px' }}>*Coupon auto applied on checkout</p>
                                                        }

                                                    </div>
                                                </div>
                                                :
                                                <div className="dpp-btn-div fixed horizontal bottom sticky-btn">
                                                    {/* {
                                                        !this.state.searchDataHidden && search_data && search_data.result_count && search_data.title && search_data.url ?
                                                            <a className="dpp-btn-view" href={'/' + search_data.url} onClick={(e) => {
                                                                e.preventDefault()
                                                                this.props.history.push(`/${search_data.url}`)
                                                                let data = {
                                                                    'Category': 'ConsumerApp', 'Action': 'viewMoreDoctorsClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'view-more-doctors-click'
                                                                }
                                                                GTM.sendEvent({ data: data })
                                                            }} >
                                                                <img src={ASSETS_BASE_URL + "/img/customer-icons/right-orange.svg"} />
                                                                <p>{`View ${search_data.result_count} ${search_data.title}`}</p>
                                                            </a> : ''
                                                    } */}
                                                    {
                                                        this.state.clinicPhoneNo[this.state.selectedClinic]
                                                            ? <div className="dpp-btn-div fixed horizontal bottom sticky-btn">
                                                                <a href={`tel:${this.state.clinicPhoneNo[this.state.selectedClinic]}`} className="dpp-btn-book d-lg-none d-flex">
                                                                    <p><img style={{ width: '20px', marginRight: '4px', position: 'relative', left: '-3px', bottom: '-2px' }} src={ASSETS_BASE_URL + "/img/call-ico.svg"} />
                                                                        {this.state.clinicPhoneNo[this.state.selectedClinic]}</p>
                                                                </a>
                                                                <div className="dpp-btn-book d-lg-flex d-none">
                                                                    <p>{this.state.clinicPhoneNo[this.state.selectedClinic]}</p>
                                                                </div>
                                                            </div>
                                                            : this.state.show_contact ?
                                                                <div className="dpp-btn-book" onClick={this.showNumber.bind(this, doctor_id)}>
                                                                    <p>View Contact</p>
                                                                </div>
                                                                : ''
                                                    }
                                                    {/*<div className="dpp-btn-book" onClick={this.showNumber.bind(this, doctor_id)}>
                                                        <p>{
                                                            this.state.numberShown?
                                                            <img style={{width: '20px', marginRight: '4px', position: 'relative', left: '-3px', bottom: '-2px'}} src={ASSETS_BASE_URL + "/img/call-ico.svg"} /> 
                                                            :''
                                                            }{this.state.numberShown || "View Contact"}</p>
                                                    </div>*/}
                                                    {
                                                        this.state.openContactPopup ?
                                                            <ContactPoupView toggle={this.toggle.bind(this, 'openContactPopup')} mobileNo={this.props.primaryMobile} getDoctor={this.getDoctorNo.bind(this)} />
                                                            : ''
                                                    }
                                                </div>
                                        }
                                    </section> : <Loader />
                            }
                        </div>
                        <RightBar extraClass=" chat-float-btn-2" type="opd" noChatButton={!this.state.searchDataHidden} showDesktopIpd={true} msgTemplate="gold_general_template"/>
                    </div>
                </section>
                <Footer footerData={this.state.footerData} />
            </div >
        );
    }
}

export default DoctorProfileView