import React from 'react';
import { connect } from 'react-redux';

import DoctorResultCard from '../../commons/doctorResultCard'
import InfiniteScroll from 'react-infinite-scroller';
import Loader from '../../../commons/Loader'
import GTM from '../../../../helpers/gtm'
import ClinicResultCard from '../../commons/clinicResultCard';
import BannerCarousel from '../../../commons/Home/bannerCarousel';

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
            sort_order: ''
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
        if(props.filterCriteria) {
            this.setState({ sort_on: props.filterCriteria.sort_on, sort_order: props.filterCriteria.sort_order,  availability: props.filterCriteria.availability })    
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
            value = selectedVal.filter((data)=> {
                if(data==val){
                    found = true
                    return false
                }
                return true
            })
            if(!found){
                value.push(val)    
            }
        }

        let filters = {...this.props.filterCriteria}
        if(type.includes('sort_on') ) {

            if(val.includes('price_asc') || val.includes('price_desc') ){

                if(this.state[type]=='fees' && ( (this.state['sort_order']=='asc' && val.includes('price_asc') ) || (this.state['sort_order']=='desc' && val.includes('price_desc') ) ) ){
                    this.setState({sort_on: null, sort_order: null}, ()=> {
                        filters = Object.assign({filters, ...this.state})
                        this.props.applyFilters(filters)
                    })
                }else{
                    this.setState({sort_on: 'fees', sort_order: val.includes('price_asc')?'asc':'desc'},()=>{
                        filters = Object.assign({filters, ...this.state})
                        this.props.applyFilters(filters)
                    })
                }
                
            }else {
                this.setState({ sort_on: this.state[type]==value?null:value, sort_order: null },()=> {
                    filters = Object.assign({filters, ...this.state})
                    this.props.applyFilters(filters)
                })    
            }
        }else{
            this.setState({ [type]: this.state[type]==value?'':value }, ()=> {
                filters = Object.assign({filters, ...this.state})
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
                                    <div className="search-result-card-collpase read-clps-bar">
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

                                                    return <React.Fragment key={i}>
                                                            {
                                                                i==3 && (this.state.availability && !this.state.availability.length)?
                                                                <div className="sort-sub-filter-container mb-3">
                                                                    <p>You are looking for <span className="fw-700">availability ?</span><span className="fw-700" onClick={this.viewMoreClicked.bind(this)}>more filters</span></p>
                                                                    <div className="srt-sb-btn-cont">
                                                                        <button className={`${this.state.availability && this.state.availability.length && this.state.availability.indexOf('1') > -1?'srt-act':''}`} onClick={this.applyQuickFilters.bind(this, 'availability', '1', true)}>Today</button>
                                                                        <button className={`${this.state.availability && this.state.availability.length && this.state.availability.indexOf('2') > -1?'srt-act':''}`} onClick={this.applyQuickFilters.bind(this, 'availability', '2', true)}>Tomorrow</button>
                                                                        <button className={`${this.state.availability && this.state.availability.length && this.state.availability.indexOf('3') > -1?'srt-act':''}`} onClick={this.applyQuickFilters.bind(this, 'availability', '3', true)}>Next 3 Days</button>
                                                                    </div>
                                                                </div>
                                                                :''    
                                                            }

                                                            {
                                                                this.props.insurance_status != 1 && !this.state.sort_order && ( (i==5 && this.state.availability && !this.state.availability.length) || (i==3 && this.state.availability && this.state.availability.length) )?
                                                                <div className="sort-sub-filter-container mb-3">
                                                                    <p>You are looking <span className="fw-700">Price Variant?</span><span className="fw-700" onClick={this.viewMoreClicked.bind(this)}>more filters</span></p>
                                                                    <div className="srt-sb-btn-cont">
                                                                        <button className={`${this.state.sort_on=='fees' && this.state.sort_order=='asc'?'srt-act':''}`} onClick={this.applyQuickFilters.bind(this, 'sort_on', 'price_asc', false)}>Price Low to High</button>
                                                                        <button className={`${this.state.sort_on=='fees' && this.state.sort_order=='desc'?'srt-act':''}`} onClick={this.applyQuickFilters.bind(this, 'sort_on', 'price_desc', false)}>Price High to Low</button>
                                                                    </div>
                                                                </div>
                                                                :''    
                                                            }

                                                            <li>
                                                                {
                                                                    this.props.clinic_card ? <ClinicResultCard {...this.props} details={result_data[cardId]} key={i} rank={i} /> : <DoctorResultCard {...this.props} details={result_data[cardId]} key={i} rank={i} />
                                                                }
                                                            </li>

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
