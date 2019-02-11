import React from 'react';

import Loader from '../../commons/Loader'
import ReviewList from '../../commons/ratingsProfileView/ReviewList.js'
import RatingGraph from '../../commons/ratingsProfileView/RatingGraph.js'
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

class DoctorProfileView extends React.Component {
    constructor(props) {
        super(props)
        let footerData = null
        if (this.props.initialServerData) {
            footerData = this.props.initialServerData.footerData
        }
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
            show_contact: ''
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
        this.setState({ searchShown: true })
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

    navigateToClinic(doctor_id, clinicId) {
        let rank = this.state.rank

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

            this.props.history.push(`/opd/doctor/${doctor_id}/${clinicId}/bookdetails`)
        }
    }

    getDoctorNo(mobileNo) {
        let doctor_id = this.props.selectedDoctor
        if (this.props.initialServerData && this.props.initialServerData.doctor_id) {
            doctor_id = this.props.initialServerData.doctor_id
        }

        let data = {
            'Category': 'ConsumerApp', 'Action': 'SubmitPhoneNo', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'submit-phone-no', 'doctor_id': doctor_id, "hospital_id": this.state.selectedClinic, 'phoneNo': mobileNo
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

    render() {

        let doctor_id = this.props.selectedDoctor
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
        if (this.props.DOCTORS[doctor_id]) {
            seo_url = this.props.DOCTORS[doctor_id].url || ""
            if (seo_url) {
                seo_url = "/" + seo_url
            }
        }

        return (
            <div className="profile-body-wrap">
                <ProfileHeader showSearch={true} />
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
                                                        : <a href={data.url} title='' onClick={(e) => {
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

                                        <HelmetTags tagsData={{
                                            title: this.getMetaTagsData(this.props.DOCTORS[doctor_id].seo).title,
                                            description: this.getMetaTagsData(this.props.DOCTORS[doctor_id].seo).description,
                                            canonicalUrl: `${CONFIG.API_BASE_URL}${seo_url || this.props.match.url}`,
                                            schema: this.getMetaTagsData(this.props.DOCTORS[doctor_id].seo).schema
                                        }} noIndex={false && !this.state.seoFriendly} />

                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-12">

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
                                                            {...this.props}
                                                        />
                                                        <div className="widge-content pd-0">
                                                            {
                                                                this.props.DOCTORS[doctor_id].about ? <AboutDoctor
                                                                    details={this.props.DOCTORS[doctor_id]}
                                                                /> : ""
                                                            }

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
                                                            {this.props.DOCTORS[doctor_id].display_rating_widget ?
                                                                <div className="widget-panel">
                                                                    <h4 className="panel-title mb-rmv">Patient Feedback</h4>
                                                                    <a><span onClick={() => this.props.history.push(`/view-all-ratings?content_type=2&id=` + doctor_id)}>View All</span></a>
                                                                    <div className="panel-content pd-0 border-bottom-panel">
                                                                        <RatingGraph details={this.props.DOCTORS[doctor_id]} />
                                                                        <div className="user-satisfaction-section">
                                                                            <div className="row no-gutters">
                                                                                {(typeof (this.props.DOCTORS[doctor_id].rating_graph) != "undefined" && this.props.DOCTORS[doctor_id].rating_graph != null && this.props.DOCTORS[doctor_id].rating_graph) ?
                                                                                    this.props.DOCTORS[doctor_id].rating_graph.top_compliments.map(compliment =>
                                                                                        <ComplimentListView key={compliment.id} details={compliment} />
                                                                                    ) : <div></div>}

                                                                            </div>
                                                                        </div>
                                                                        <ReviewList details={this.props.DOCTORS[doctor_id]} />
                                                                    </div>
                                                                </div> :
                                                                ""}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            this.state.is_live ?
                                                <div className="dpp-btn-div fixed horizontal bottom sticky-btn">
                                                    {
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
                                                    }
                                                    <div className="dpp-btn-book dpp-btn-book-custom" onClick={this.navigateToClinic.bind(this, doctor_id, this.state.selectedClinic)}>
                                                        {/*<p>{`Book Now (₹ ${final_price})`}</p>*/}
                                                        <p style={{ flex: 2 }}><span style={{ marginTop: '5px', display: 'inline-block' }} className="">Book Now</span></p>
                                                        <p className="cp-auto" style={{ marginBottom: '8px' }}>*Coupon auto applied on checkout</p>
                                                    </div>
                                                </div>
                                                :
                                                <div className="dpp-btn-div fixed horizontal bottom sticky-btn">
                                                    {
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
                                                    }
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

                        <RightBar extraClass=" chat-float-btn-2" type="opd" noChatButton={!this.state.searchDataHidden} />
                    </div>
                </section>

                <Footer footerData={this.state.footerData} />
            </div>
        );
    }
}

export default DoctorProfileView
