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

    build_search_data_url(search_data) {
        let { lat, long, specialization_id } = search_data
        return `/opd/searchresults?specializations=${specialization_id}&lat=${lat}&long=${long}`
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

                        <div className="col-12 col-md-7 col-lg-7 center-column">

                            {/* <header className="skin-primary fixed horizontal top sticky-header">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-2">
                                            <div className="header-title fw-700 capitalize text-white">
                                                <ul className="inline-list top-nav alpha-bx text-white"
                                                    onClick={() => {
                                                        this.props.history.go(-1)
                                                    }}
                                                >
                                                    <li>
                                                        <span className="ct-img ct-img-sm arrow-img">
                                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/left-arrow.svg"} className="img-fluid" />
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='col-8'>
                                            <div className="header-title fw-700 capitalize text-white text-center">Doctor Details</div>
                                        </div>
                                        <div className="col-2" style={{ paddingLeft: 0 }} onClick={() => {
                                            this.props.history.push('/')
                                        }}>
                                            <div className="mobile-home-icon-div" >
                                                <img src={ASSETS_BASE_URL + "/img/doc-prime-logo.png"} className="mobile-home-icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </header> */}

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
                                                    {/* {
                                                        search_data && this.state.searchShown ? <div className="mrt-10 mrb-20 article-chat-div" style={{ backgroundColor: 'transparent' }}>
                                                            <p className="fw-500" style={{ color: '#000000' }} >{search_data.title}</p>
                                                            <a onClick={() => {
                                                                let data = {
                                                                    'Category': 'ConsumerApp', 'Action': 'Prpfile-doctor-search', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-search-profile-clicked'
                                                                }
                                                                GTM.sendEvent({ data: data })
                                                            }} href={this.build_search_data_url(search_data)}><button style={{ backgroundColor: '#f78631' }}>View All</button></a>
                                                        </div> : ''
                                                    } */}
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
                                        {/* {
                                            this.state.is_live ? <button disabled={!this.state.selectedClinic} className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn" onClick={this.navigateToClinic.bind(this, doctor_id, this.state.selectedClinic)}>{`Book Now (₹ ${final_price})`}</button> : <button className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn" onClick={this.showNumber.bind(this, doctor_id)}>{this.state.numberShown || "Contact"}</button>
                                        } */}
                                        {
                                            this.state.is_live ?
                                                <div className="dpp-btn-div fixed horizontal bottom sticky-btn">
                                                    {
                                                        !this.state.searchDataHidden && search_data && search_data.result_count && search_data.title && search_data.url ?
                                                            <a className="dpp-btn-view" href={'/'+search_data.url}>
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
                                                            <a className="dpp-btn-view" href={'/'+search_data.url}>
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
