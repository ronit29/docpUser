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
            searchDataHidden: this.props.location.search.includes('hide_search_data')
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

    selectClinic(clinic_id, is_live, rank, consultation_fee) {
        this.setState({ selectedClinic: clinic_id, is_live, rank, numberShown: "", consultation_fee: consultation_fee })
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

            this.props.history.push(`/opd/doctor/${doctor_id}/${clinicId}/book`)
        }
    }

    showNumber(id, e) {
        e.preventDefault()
        e.stopPropagation()

        let data = {
            'Category': 'ConsumerApp', 'Action': 'ShowNoClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'show-no-clicked', 'doctor_id': id, "hospital_id": this.state.selectedClinic
        }
        if (!this.state.numberShown) {
            GTM.sendEvent({ data: data })
            this.props.getDoctorNumber(id, this.state.selectedClinic, (err, data) => {
                if (!err && data.number) {
                    this.setState({
                        numberShown: data.number
                    })
                }
            })
        }
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
        if (this.props.DOCTORS[doctor_id] && this.props.DOCTORS[doctor_id].search_data) {
            search_data = this.props.DOCTORS[doctor_id].search_data
        }

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container parent-section book-appointment-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column pt-0">
                            <section>
                                <div className="container-fluid">
                                    <div className="widget mb-10">
                                        <div className="search-top-container">
                                            <p className="srch-heading">Search</p>
                                            <div className="serch-nw-inputs-container">
                                                <div className="serch-nw-inputs">
                                                    <input className="new-srch-inp" placeholder="location" />
                                                    <img className="srch-inp-img" src={ASSETS_BASE_URL + "/img/ins-loc.svg"} />
                                                    <button className="srch-inp-btn-img">Auto Detect <img src={ASSETS_BASE_URL + "/img/loc-track.svg"} /></button>
                                                </div>
                                                <div className="serch-nw-inputs">
                                                    <input className="new-srch-doc-lab" placeholder="Search Doctors, Labs and Tests" />
                                                    <img style={{ width: '15px' }} className="srch-inp-img" src={ASSETS_BASE_URL + "/img/shape-srch.svg"} />
                                                </div>
                                                <div className="srch-radio-btns">
                                                    <div className="dtl-radio">
                                                        <label className="container-radio">Doctor
                                                            <input type="radio" checked name="radio" />
                                                            <span className="doc-checkmark"></span>
                                                        </label>
                                                    </div>
                                                    <div className="dtl-radio">
                                                        <label className="container-radio">Test
                                                            <input type="radio" checked name="radio" />
                                                            <span className="doc-checkmark"></span>
                                                        </label>
                                                    </div>
                                                    <div className="dtl-radio">
                                                        <label className="container-radio">Dental Treatments
                                                            <input type="radio" checked name="radio" />
                                                            <span className="doc-checkmark"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="widget mb-10">
                                        <div className="common-search-container">
                                            <p className="srch-heading">Commonly Searched <span className="srch-view-all-btn">View all</span></p>
                                            <div className="common-listing-cont">
                                                <ul>
                                                    <li><p className="click-active">General Physician </p>
                                                        <img style={{ width: '15px',display: 'none' }} src={ASSETS_BASE_URL + "/img/redirect-arrow.svg"} />
                                                    </li>
                                                    <li><p className="click-active"> T3, Total Tri-iodothyronine </p>
                                                        <img style={{ width: '15px',display: 'none' }} src={ASSETS_BASE_URL + "/img/redirect-arrow.svg"} />
                                                    </li>
                                                    <li><p>Dengue NS1 antigen detection </p>
                                                        <img style={{ width: '15px' }} src={ASSETS_BASE_URL + "/img/redirect-arrow.svg"} />
                                                    </li>
                                                    <li><p>General Physician </p>
                                                        <img style={{ width: '15px' }} src={ASSETS_BASE_URL + "/img/redirect-arrow.svg"} />
                                                    </li>
                                                    <li><p>General Physician </p>
                                                        <img style={{ width: '15px' }} src={ASSETS_BASE_URL + "/img/redirect-arrow.svg"} />
                                                    </li>
                                                    <li><p>General Physician </p>
                                                        <img style={{ width: '15px' }} src={ASSETS_BASE_URL + "/img/redirect-arrow.svg"} />
                                                    </li>
                                                    <li><p>General Physician </p>
                                                        <img style={{ width: '15px' }} src={ASSETS_BASE_URL + "/img/redirect-arrow.svg"} />
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="widget mb-10">
                                        <div className="common-search-container">
                                            <p className="srch-heading">Selected</p>
                                            <div className="common-listing-cont">
                                                <ul>
                                                    <li><p>General Physician </p>
                                                        <img style={{ width: '15px' }} src={ASSETS_BASE_URL + "/img/sl-close.svg"} />
                                                    </li>
                                                    <li><p>Hypertension </p>
                                                        <img style={{ width: '15px' }} src={ASSETS_BASE_URL + "/img/sl-close.svg"} />
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {
                                this.props.DOCTORS[doctor_id] ?

                                    <section className="dr-profile-screen" style={{ paddingBottom: 0 }}>

                                        <HelmetTags tagsData={{
                                            title: this.getMetaTagsData(this.props.DOCTORS[doctor_id].seo).title,
                                            description: this.getMetaTagsData(this.props.DOCTORS[doctor_id].seo).description,
                                            canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.match.url}`,
                                            schema: this.getMetaTagsData(this.props.DOCTORS[doctor_id].seo).schema
                                        }} noIndex={!this.state.seoFriendly} />

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
                                                            <a className="dpp-btn-view" href={'/' + search_data.url}>
                                                                <img src={ASSETS_BASE_URL + "/img/customer-icons/right-orange.svg"} />
                                                                <p>{`View ${search_data.result_count} ${search_data.title}`}</p>
                                                            </a> : ''
                                                    }
                                                    <div className="dpp-btn-book" onClick={this.navigateToClinic.bind(this, doctor_id, this.state.selectedClinic)}>
                                                        <p>{`Book Now (₹ ${final_price})`}</p>
                                                    </div>
                                                </div>
                                                :
                                                <div className="dpp-btn-div fixed horizontal bottom sticky-btn">
                                                    {
                                                        !this.state.searchDataHidden && search_data && search_data.result_count && search_data.title && search_data.url ?
                                                            <a className="dpp-btn-view" href={'/' + search_data.url}>
                                                                <img src={ASSETS_BASE_URL + "/img/customer-icons/right-orange.svg"} />
                                                                <p>{`View ${search_data.result_count} ${search_data.title}`}</p>
                                                            </a> : ''
                                                    }
                                                    <div className="dpp-btn-book" onClick={this.showNumber.bind(this, doctor_id)}>
                                                        <p>{this.state.numberShown || "Contact"}</p>
                                                    </div>
                                                </div>
                                        }
                                    </section> : <Loader />
                            }
                        </div>

                        <RightBar extraClass=" chat-float-btn-2" />
                    </div>
                </section>

                <Footer footerData={this.state.footerData} />
            </div>
        );
    }
}

export default DoctorProfileView
