import React from 'react';
import { connect } from 'react-redux';

import DoctorResultCard from '../../commons/doctorResultCard'
import InfiniteScroll from 'react-infinite-scroller';
import Loader from '../../../commons/Loader'
import GTM from '../../../../helpers/gtm'
import ClinicResultCard from '../../commons/clinicResultCard';
import BannerCarousel from '../../../commons/Home/bannerCarousel';
import SnackBar from 'node-snackbar'
import { _getlocationFromLatLong, _getLocationFromPlaceId, _autoCompleteService } from '../../../../helpers/mapHelpers';
import RatingStars from '../../../commons/ratingsProfileView/RatingStars';

class DoctorsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasMore: false,
            loading: false,
            renderBlock: false,
            page: 1,
            readMore: 'search-details-data-less',
            is_insured: props.filterCriteria && props.filterCriteria.is_insured ? props.filterCriteria.is_insured : false,
            availability: [],
            sort_on: '',
            sort_order: '',
            detectLoading: false
        }
    }

    componentDidMount() {
        /**
         * Below code ensures smooth back page transitions in case of huge data sets, and maintains scroll position.
         * renderBlock = true (by default) will block render until the page transition is completed, and once its done, it will then render and set scroll position accordingly
         
        setTimeout(() => {
            if (this.refs.checkIfExists) {
                this.setState({ renderBlock: false })
            }
            setTimeout(() => {
                if (window) {
                    let scroll_pos = window.OPD_SCROLL_POS ? (window.OPD_SCROLL_POS) : 0
                    // TODO: improve scroll back logic
                    window.scrollTo(0, scroll_pos || 0)
                    window.OPD_SCROLL_POS = 0

                    window.onscroll = function () {
                        window.OPD_SCROLL_POS = window.pageYOffset
                    }
                }
            }, 100)
        }, 100)
        
        */
        setTimeout(() => {
            this.setState({ hasMore: true })
        }, 0)
        this.setState({ ...this.props.filterCriteria })
        let selectedLocation = ''
        let lat = 28.644800
        let long = 77.216721
        if (this.props.selectedLocation) {
            selectedLocation = this.props.selectedLocation;
            lat = selectedLocation.geometry.location.lat
            long = selectedLocation.geometry.location.lng
            if (typeof lat === 'function') lat = lat()
            if (typeof long === 'function') long = long()
        }

        this.props.getOfferList(lat, long);
    }

    componentWillReceiveProps(props) {
        if (props.filterCriteria) {
            this.setState({ sort_on: props.filterCriteria.sort_on, sort_order: props.filterCriteria.sort_order, availability: props.filterCriteria.availability || [] })
        }

    }

    componentWillUnmount() {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'DoctorSearchPagination', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-search-pagination', 'Pages': this.state.page
        }
        GTM.sendEvent({ data: data })

        // if (window) {
        //     window.onscroll = null
        // }
    }

    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search
        const params = new URLSearchParams(paramString)
        return params.get(tag)
    }

    loadMore(page) {
        this.setState({ hasMore: false, loading: true })
        this.props.getDoctorList(null, page + 1, (hasMore) => {
            this.setState({ loading: false, page: page + 1 })
            setTimeout(() => {
                this.setState({ hasMore })
            }, 1000)
        })

    }

    toggleScroll() {
        if (window) {
            window.scrollTo(0, 0)
        }
        this.setState({ readMore: 'search-details-data-less' })
    }

    applyQuickFilters(type, val, isArray, e) {
        let value = val
        if (isArray) {
            let selectedVal = [].concat(this.state[type]) || []
            let found = false
            value = selectedVal.filter((data) => {
                if (data == val) {
                    found = true
                    return false
                }
                return true
            })
            if (!found) {
                value.push(val)
            }
        }

        let gtmData = {
            'Category': 'OpdQuickFilterClicked', 'Action': 'OpdQuickFilterClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'opd-quick-filter-clicked', 'url': window.location.pathname, 'type': type, 'val': val
        }
        GTM.sendEvent({ data: gtmData })

        let filters = { ...this.props.filterCriteria }
        if (type.includes('sort_on')) {

            if (val.includes('price_asc') || val.includes('price_desc')) {

                if (this.state[type] == 'fees' && ((this.state['sort_order'] == 'asc' && val.includes('price_asc')) || (this.state['sort_order'] == 'desc' && val.includes('price_desc')))) {
                    this.setState({ sort_on: null, sort_order: null }, () => {
                        filters = Object.assign({ filters, ...this.state })
                        this.props.applyFilters(filters)
                    })
                } else {
                    this.setState({ sort_on: 'fees', sort_order: val.includes('price_asc') ? 'asc' : 'desc' }, () => {
                        filters = Object.assign({ filters, ...this.state })
                        this.props.applyFilters(filters)
                    })
                }

            } else {
                this.setState({ sort_on: this.state[type] == value ? null : value, sort_order: null }, () => {
                    filters = Object.assign({ filters, ...this.state })
                    this.props.applyFilters(filters)
                })
            }
        } else {
            this.setState({ [type]: this.state[type] == value ? '' : value }, () => {
                filters = Object.assign({ filters, ...this.state })
                this.props.applyFilters(filters)
            })
        }
    }

    viewMoreClicked() {
        let filters = {
            viewMore: true
        }
        this.props.applyQuickFilter(filters)
    }


    detectLocation(type) {
        let timeout = setTimeout(() => {
            if (this.state.detectLoading) {
                this.setState({ detectLoading: false })
                SnackBar.show({ pos: 'bottom-center', text: "Could not fetch location." });
            }
        }, 5000)

        let data = {
            'Category': 'ConsumerApp', 'Action': `DetectLocation${type}Click`, 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': `Detect-Location-${type}-Click`, 'Page': 'doctor-search'
        }
        GTM.sendEvent({ data: data })

        this.setState({ detectLoading: true })
        this.props.detectLocationClick();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                _getlocationFromLatLong(parseFloat(position.coords.latitude), parseFloat(position.coords.longitude), 'locality', (location_object) => {
                    this.props.selectLocation(location_object, 'autoDetect').then(() => {
                        clearTimeout(timeout)
                        this.setState({ detectLoading: false })
                    })
                })
            }, (a, b, c) => {
                this.setState({ detectLoading: false })
                SnackBar.show({ pos: 'bottom-center', text: "Could not fetch location." });
            }, (a, b, c) => {
                this.setState({ detectLoading: false })
                SnackBar.show({ pos: 'bottom-center', text: "Could not fetch location." });
            })
        }
        else {
            this.setState({ detectLoading: false })
            // geolocation is not supported
        }
    }

    navigateToHospital(data) {
        let gtmData = {
            'Category': 'ConsumerApp', 'Action': 'SponsorCardClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'sponsor-card-clicked'
        }
        GTM.sendEvent({ data: gtmData })
        if (data.url) {
            this.props.history.push(`/${data.url}`)
        } else {
            this.props.history.push(`/ipd/hospital/${data.id}`)
        }
    }

    render() {

        let detectFlag = true

        let { HOSPITALS, DOCTORS, doctorList, hospitalList } = this.props

        let start_page = 0
        if (this.props.curr_page) {
            start_page = Math.max(0, this.props.curr_page - 1)
        } else {
            if (this.props.page) {
                start_page = Math.max(0, this.props.page - 1)
            }
        }

        let result_list = doctorList
        let result_data = DOCTORS
        if (this.props.clinic_card) {
            result_list = hospitalList
            result_data = HOSPITALS
        }

        let card_ID = null
        let bookableDoctors = true

        result_list.map((cardId, i) => {
            if (detectFlag && result_data[cardId] && !result_data[cardId].hospitals[0].enabled_for_online_booking && this.props.seoFriendly && this.props.match.url.includes('-sptlitcit') && this.props.commonSelectedCriterias && this.props.commonSelectedCriterias.length) {
                card_ID = cardId
                detectFlag = false;
            }
            if (i == 0) {
                if (result_data[cardId] && !result_data[cardId].hospitals[0].enabled_for_online_booking && this.props.seoFriendly && this.props.match.url.includes('-sptlitcit') && this.props.commonSelectedCriterias && this.props.commonSelectedCriterias.length) {
                    bookableDoctors = false
                }
            }
        })

        let sponsorData = this.props.sponsorData && this.props.sponsorData.length ? this.props.sponsorData[0] : null

        return (
            <section ref="checkIfExists">
                {
                    this.state.renderBlock ? <Loader /> :
                        <div className="container-fluid cardMainPaddingRmv">
                            {
                                this.props.search_content && this.props.search_content != '' && parseInt(this.props.page) == 1 ?
                                    <div className="search-result-card-collpase d-none d-md-block mb-0" style={{ borderRadius: '5px', marginTop: '5px' }}>
                                        <div className={this.state.readMore} dangerouslySetInnerHTML={{ __html: this.props.search_content }} >
                                        </div>

                                        {this.state.readMore && this.state.readMore != '' ?
                                            <span className="rd-more" onClick={() => this.setState({ readMore: '' })}>Read More</span>
                                            : ''
                                        }

                                        {this.state.readMore == '' ?
                                            <span className="rd-more" onClick={this.toggleScroll.bind(this)}>Read Less</span>
                                            : ''
                                        }
                                    </div>
                                    : ''
                            }
                            <div className="row no-gutters">
                                {/*
                                    this.props.offerList && this.props.offerList.filter(x => x.slider_location === 'doctor_search_page').length && !this.state.is_insured ?
                                        <div className="col-12">
                                            <BannerCarousel {...this.props} sliderLocation="doctor_search_page" />
                                        </div> : ''
                                */}

                                <div className="col-12">
                                    <InfiniteScroll
                                        pageStart={start_page}
                                        loadMore={this.loadMore.bind(this)}
                                        hasMore={this.state.hasMore}
                                        useWindow={true}
                                        initialLoad={false}
                                    >
                                        <ul>
                                            {
                                                sponsorData && sponsorData.name &&
                                                <div className="clinic-card mb-3" onClick={() => this.navigateToHospital(sponsorData)}>
                                                    <div className="clnc-content">
                                                        <div className="row no-gutters">
                                                            <div className="col-8">
                                                                <h2 className="cstmDocName">{sponsorData.name}</h2>
                                                                <div className="cstm-doc-details-container">
                                                                    {
                                                                        sponsorData.hospital_image &&
                                                                        <div className="cstm-doc-img-container">
                                                                            <div>
                                                                                <img style={{ width: '80px' }} className="clnc-stc-img" src={sponsorData.hospital_image} />
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    <div className="cstm-doc-content-container">
                                                                        <h3>{`${sponsorData.all_doctors ? sponsorData.all_doctors.length : ''} Doctors`}</h3>
                                                                        {
                                                                            sponsorData.opd_timings &&
                                                                            <React.Fragment>
                                                                                <h3 style={{ marginBottom: "5px;" }}>OPD Timings :</h3>
                                                                                <p><img className="cstmTimeImg" src={ASSETS_BASE_URL + "/img/watch-date.svg"} /> {sponsorData.opd_timings}</p>
                                                                            </React.Fragment>
                                                                        }

                                                                    </div>
                                                                </div>
                                                                <div className="cstm-doc-rtng">
                                                                    {
                                                                        sponsorData.avg_rating &&
                                                                        <RatingStars average_rating={parseInt(sponsorData.avg_rating)} rating_count={''} width="12px" height="12px" />
                                                                    }
                                                                    {
                                                                        sponsorData.rating && sponsorData.rating.length > 0 &&
                                                                        <span>{`(${sponsorData.rating.length})`}</span>
                                                                    }

                                                                </div>
                                                            </div>
                                                            <div className="col-4 text-right">
                                                                <p className="clnc-spnsr">SPONSORED</p>
                                                                {/*                                                                <p className="cstm-cpn">Upto 30% Off </p>*/}
                                                                <button className="cstm-book-btn clnc-btn">Book Appointment</button>
                                                            </div>
                                                        </div>
                                                        {
                                                            sponsorData.hospital_services &&
                                                            <div className="clnc-chps-cont">
                                                                <div className="clnc-chps">
                                                                    {
                                                                        sponsorData.hospital_services.map((serv, key) => {
                                                                            return key < 4 ? <span key={serv.id}>{serv.name}</span> : ''
                                                                        })
                                                                    }
                                                                </div>
                                                                {
                                                                    sponsorData.hospital_services && sponsorData.hospital_services.length > 4 &&
                                                                    <div className="clnc-all-srvc">
                                                                        <p>{`+ ${sponsorData.hospital_services.length - 4} More`}</p>
                                                                    </div>
                                                                }

                                                            </div>
                                                        }

                                                        <p className="cln-loc-par"><img src={ASSETS_BASE_URL + "/img/new-loc-ico.svg"} />{sponsorData.short_address}</p>
                                                    </div>
                                                </div>
                                            }

                                            {
                                                result_list.map((cardId, i) => {
                                                    if (result_data[cardId]) {

                                                        return <React.Fragment key={i}>

                                                            {
                                                                i == 1 && !!!bookableDoctors ?
                                                                    <li key={i}>
                                                                        <div className="d-flex align-items-center justify-content-between auto-location-widget mb-3">
                                                                            <div className="d-flex align-items-center auto-location-text">
                                                                                <img src={ASSETS_BASE_URL + '/img/customer-icons/location-colored.svg'} />
                                                                                <p className="fw-500">See {this.props.commonSelectedCriterias[0].name} with great discounts near you</p>
                                                                            </div>
                                                                            <div className="auto-location-btn fw-500" onClick={() => this.detectLocation('Sptlitcit')} >Detect Location</div>
                                                                        </div>
                                                                    </li> : ''
                                                            }

                                                            {
                                                                (i == 0 && this.props.seoFriendly && this.props.match.url.includes('-sptcit') && this.props.commonSelectedCriterias && this.props.commonSelectedCriterias.length) ?
                                                                    <div className="d-flex align-items-center justify-content-between auto-location-widget mrb-20 mrt-20">
                                                                        <div className="d-flex align-items-center auto-location-text">
                                                                            <img src={ASSETS_BASE_URL + '/img/customer-icons/location-colored.svg'} />
                                                                            <div>
                                                                                <p className="fw-500 pr-4 d-inline">Show</p>
                                                                                <h2 className="fw-500 d-inline" style={{fontSize: '14px'}}>{this.props.commonSelectedCriterias[0].name} near me</h2>
                                                                            </div>
                                                                        </div>
                                                                        <div className="auto-location-btn fw-500" onClick={() => this.detectLocation('Sptcit')} >Detect Location</div>
                                                                    </div>
                                                                    : ''
                                                            }
                                                            {
                                                                i == 4 && (!this.state.availability || !this.state.availability.length) ?
                                                                    <div className="sort-sub-filter-container mb-3">
                                                                        <p>Filter by <span className="fw-700">Availability </span><span className="fw-500 sort-more-filter" onClick={this.viewMoreClicked.bind(this)}>More filters</span></p>
                                                                        <div className="srt-sb-btn-cont">
                                                                            <button className={`${this.state.availability && this.state.availability.length && this.state.availability.indexOf('1') > -1 ? 'srt-act' : ''}`} onClick={this.applyQuickFilters.bind(this, 'availability', '1', true)}>Today</button>
                                                                            <button className={`${this.state.availability && this.state.availability.length && this.state.availability.indexOf('2') > -1 ? 'srt-act' : ''}`} onClick={this.applyQuickFilters.bind(this, 'availability', '2', true)}>Tomorrow</button>
                                                                            <button className={`${this.state.availability && this.state.availability.length && this.state.availability.indexOf('3') > -1 ? 'srt-act' : ''}`} onClick={this.applyQuickFilters.bind(this, 'availability', '3', true)}>Next 3 Days</button>
                                                                        </div>
                                                                    </div>
                                                                    : ''
                                                            }

                                                            {
                                                                (card_ID) && (card_ID == cardId) && (bookableDoctors) ?
                                                                    <li key={i}>
                                                                        <div className="d-flex align-items-center justify-content-between auto-location-widget mb-3">
                                                                            <div className="d-flex align-items-center auto-location-text">
                                                                                <img src={ASSETS_BASE_URL + '/img/customer-icons/location-colored.svg'} />
                                                                                <p className="fw-500">See more {this.props.commonSelectedCriterias[0].name} near you</p>
                                                                            </div>
                                                                            <div className="auto-location-btn fw-500" onClick={() => this.detectLocation('Sptlitcit')} >Detect Location</div>
                                                                        </div>
                                                                    </li> : ''
                                                            }

                                                            {
                                                                false && result_list && result_list.length > 5 && i == 3 ?
                                                                <div className="mb-3 referDocimg" onClick={(e) => {
                                                                    e.preventDefault();
                                                                    let data = {
                                                                        'Category': 'ConsumerApp', 'Action': 'ReferDoctorList', 'CustomerID': GTM.getUserId() || '', 'event': 'refer-doctor-list'
                                                                    }
                                                                    GTM.sendEvent({ data: data })
                                                                    this.props.history.push('/doctorsignup?member_type=1')
                                                                }}>
                                                                    <img src={ASSETS_BASE_URL + "/img/refrlbnr.png"} />
                                                                </div> : ''
                                                            }

                                                            {
                                                                this.props.insurance_status != 1 && !this.state.sort_order && ((i == 6 && this.state.availability && !this.state.availability.length) || (i == 3 && this.state.availability && this.state.availability.length)) ?
                                                                    <div className="sort-sub-filter-container mb-3">
                                                                        <p>Sort by <span className="fw-700"></span><span className="fw-500 sort-more-filter" onClick={this.viewMoreClicked.bind(this)}>More filters</span></p>
                                                                        <div className="srt-sb-btn-cont">
                                                                            <button className={`${this.state.sort_on == 'fees' && this.state.sort_order == 'asc' ? 'srt-act' : ''}`} onClick={this.applyQuickFilters.bind(this, 'sort_on', 'price_asc', false)}>Price Low to High</button>
                                                                            <button className={`${this.state.sort_on == 'fees' && this.state.sort_order == 'desc' ? 'srt-act' : ''}`} onClick={this.applyQuickFilters.bind(this, 'sort_on', 'price_desc', false)}>Price High to Low</button>
                                                                        </div>
                                                                    </div>
                                                                    : ''
                                                            }

                                                            {
                                                                i == 5 && this.props.offerList && this.props.offerList.filter(x => x.slider_location === 'doctor_search_page').length && !this.state.is_insured ?
                                                                    /*<div className="col-12">
                                                                        <BannerCarousel {...this.props} sliderLocation="doctor_search_page" />
                                                                    </div> : ''*/
                                                                    <div className="banner-cont-height home-page-banner-div mb-3 mr-0 banner-md-margn">
                                                                        <div className="hidderBanner banner-carousel-div d-md-none">
                                                                            <div className="divHeight m-0" style={{marginBottom:"5px!important"}}></div>
                                                                        </div>
                                                                        <BannerCarousel {...this.props} sliderLocation="doctor_search_page" />
                                                                    </div>
                                                                    :''
                                                            }

                                                            <li>
                                                                {
                                                                    this.props.clinic_card ? <ClinicResultCard {...this.props} details={result_data[cardId]} key={i} rank={i} /> : <DoctorResultCard {...this.props} details={result_data[cardId]} key={i} rank={i} />
                                                                }
                                                            </li>

                                                            {this.props.similar_specializations && this.props.similar_specializations.length &&
                                                                !this.state.sort_order && (!this.state.availability || !this.state.availability.length) && (i == 7 || this.props.count - 1 == i) ?
                                                                this.props.SimilarSpecializationData()
                                                                : ''
                                                            }

                                                            {this.props.similar_specializations && this.props.similar_specializations.length && this.state.sort_order && (this.state.availability || this.state.availability.length) && this.props.count < 8 && i == (this.props.count - 1) ?
                                                                this.props.SimilarSpecializationData()
                                                                : ''
                                                            }

                                                            {this.props.similar_specializations && this.props.similar_specializations.length && this.state.sort_order && (this.state.availability || this.state.availability.length) && this.props.count < 8 && i == 3 ?
                                                                this.props.SimilarSpecializationData()
                                                                : ''
                                                            }

                                                            {this.props.similar_specializations && this.props.similar_specializations.length && this.state.sort_order && (this.state.availability || this.state.availability.length) && i == 3 ?
                                                                this.props.SimilarSpecializationData()
                                                                : ''
                                                            }

                                                            {
                                                                !!!card_ID && i == result_list.length - 1 && this.props.seoFriendly && this.props.match.url.includes('-sptlitcit') && this.props.commonSelectedCriterias && this.props.commonSelectedCriterias.length ?
                                                                    <li key={i}>
                                                                        <div className="d-flex align-items-center justify-content-between auto-location-widget mb-3">
                                                                            <div className="d-flex align-items-center auto-location-text">
                                                                                <img src={ASSETS_BASE_URL + '/img/customer-icons/location-colored.svg'} />
                                                                                <p className="fw-500">See more {this.props.commonSelectedCriterias[0].name} near you</p>
                                                                            </div>
                                                                            <div className="auto-location-btn fw-500" onClick={() => this.detectLocation('Sptlitcit')} >Detect Location</div>
                                                                        </div>
                                                                    </li> : ''
                                                            }

                                                        </React.Fragment>
                                                    } else {
                                                        return ""
                                                    }
                                                })
                                            }
                                        </ul>
                                    </InfiniteScroll>
                                </div>
                            </div>
                            {this.state.loading ? <Loader classType="loaderPagination" /> : ""}
                        </div>
                }
            </section>
        );
    }
}


export default DoctorsList
