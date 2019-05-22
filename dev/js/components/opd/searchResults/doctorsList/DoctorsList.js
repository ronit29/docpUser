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

    detectLocation() {
        let timeout = setTimeout(() => {
            if (this.state.detectLoading) {
                this.setState({ detectLoading: false })
                SnackBar.show({ pos: 'bottom-center', text: "Could not fetch location." });
            }
        }, 5000)

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

    render() {

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

        return (
            <section ref="checkIfExists">
                {
                    this.state.renderBlock ? <Loader /> :
                        <div className="container-fluid cardMainPaddingRmv">
                            {
                                this.props.search_content && this.props.search_content != '' && parseInt(this.props.page) == 1 ?
                                    <div className="search-result-card-collpase">
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
                                {
                                    this.props.offerList && this.props.offerList.filter(x => x.slider_location === 'doctor_search_page').length && !this.state.is_insured ?
                                        <div className="col-12">
                                            <BannerCarousel {...this.props} sliderLocation="doctor_search_page" />
                                        </div> : ''
                                }

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
                                                result_list.map((cardId, i) => {
                                                    if (result_data[cardId]) {
                                                        if (i == 2 && this.props.seoFriendly && this.props.match.url.includes('-sptcit') && this.props.commonSelectedCriterias && this.props.commonSelectedCriterias.length) {
                                                            return <div className="d-flex align-items-center justify-content-between auto-location-widget mb-3">
                                                                <div className="d-flex align-items-center auto-location-text">
                                                                    <img src={ASSETS_BASE_URL + '/img/customer-icons/location-colored.svg'} />
                                                                    <p className="fw-500">Show {this.props.commonSelectedCriterias[0].name} near me</p>
                                                                </div>
                                                                <div className="auto-location-btn text-primary fw-500" onClick={() => this.detectLocation()} >Detect Location</div>
                                                            </div>
                                                        } else {
                                                            return <li key={i} >
                                                                {
                                                                    this.props.clinic_card ? <ClinicResultCard {...this.props} details={result_data[cardId]} key={i} rank={i} /> : <DoctorResultCard {...this.props} details={result_data[cardId]} key={i} rank={i} />
                                                                }
                                                            </li>
                                                        }
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
