import React from 'react';

import LabProfileCard from '../../commons/labProfileCard/index.js'
import InfiniteScroll from 'react-infinite-scroller';
import Loader from '../../../commons/Loader'
import GTM from '../../../../helpers/gtm'
import LabResultCard from '../../commons/labResultCard'
import BannerCarousel from '../../../commons/Home/bannerCarousel.js';

class LabsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasMore: false,
            loading: false,
            renderBlock: false,
            page: 0,
            is_insured: props.filterCriteria && props.filterCriteria.is_insured?props.filterCriteria.is_insured:false,
            avg_ratings: ''
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
                    let scroll_pos = window.LAB_SCROLL_POS ? (window.LAB_SCROLL_POS) : 0
                    // TODO: improve scroll back logic
                    window.scrollTo(0, scroll_pos || 0)
                    window.LAB_SCROLL_POS = 0

                    window.onscroll = function () {
                        window.LAB_SCROLL_POS = window.pageYOffset
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
            this.setState({ ...props.filterCriteria.avg_ratings || '' })    
        }
        
    }

    componentWillUnmount() {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'LabSearchPagination', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-search-pagination', 'Pages': this.state.page
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
        this.setState({ hasMore: false, loading: true, page: page })

        this.props.getLabList(null, page + 1, (hasMore) => {
            this.setState({ loading: false })
            setTimeout(() => {
                this.setState({ hasMore })
            }, 1000)
        })
    }
    testInfo() {
        {/*var url_string = window.location.href;
        var url = new URL(url_string);
        var test_ids = url.searchParams.get("test_ids");
        this.props.history.push('/search/testinfo?test_ids=' + test_ids + '&from=searchresults')
        let data = {
            'Category': 'ConsumerApp', 'Action': 'testInfoClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'test-info-click', 'pageSource': 'lab-result-page'
        }
        GTM.sendEvent({ data: data })*/}
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

        let gtmData = {
            'Category': 'LabQuickFilterClicked', 'Action': 'LabQuickFilterClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-quick-filter-clicked', 'url': window.location.pathname, 'type': type, 'val': val
        }
        GTM.sendEvent({ data: gtmData })

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
        let show_details = false
        let { LABS, labList } = this.props

        let start_page = 0
        if (this.props.curr_page) {
            start_page = Math.max(0, this.props.curr_page - 1)
        } else {
            if (this.props.page) {
                start_page = Math.max(0, this.props.page - 1)
            }
        }

        return (
            <section className="wrap search-book-result variable-content-section" ref="checkIfExists">
                {
                    this.state.renderBlock ? <Loader /> :
                        <div className="container-fluid cardMainPaddingRmv">
                            <div className="row no-gutters">

                                {/*{Object.entries(this.props.currentSearchedCriterias).map(function ([key, value]) {
                                    if (value.show_details) {
                                        show_details = true
                                    }
                                })}
                                {
                                    show_details ? <div className="col-12">
                                        <span className="srch-heading" style={{ float: 'left', cursor: 'pointer', color: '#e46608' }} onClick={this.testInfo.bind(this)}> Test Info</span></div> : ''
                                }*/}


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
                                                labList.map((labId, i) => {
                                                    if (LABS[labId]) {

                                                        return <React.Fragment key={i}>
                                                                {
                                                                    i==4 && !this.state.avg_ratings ?
                                                                    <div className="sort-sub-filter-container mb-3">
                                                                        <p>Filter by <span className="fw-700"> Ratings </span><span className="fw-500 sort-more-filter" onClick={this.viewMoreClicked.bind(this)}>More filters</span></p>
                                                                        <div className="srt-sb-btn-cont">
                                                                            <button className={`${this.state.avg_ratings=='3'?'srt-act':''}`} onClick={this.applyQuickFilters.bind(this, 'avg_ratings', '3', false)}>3.0 +</button>
                                                                            <button className={`${this.state.avg_ratings=='4'?'srt-act':''}`} onClick={this.applyQuickFilters.bind(this, 'avg_ratings', '4', false)}>4.0 +</button>
                                                                            <button className={`${this.state.avg_ratings=='4.5'?'srt-act':''}`} onClick={this.applyQuickFilters.bind(this, 'avg_ratings', '4.5', false)}>4.5 +</button>
                                                                        </div>
                                                                    </div>
                                                                    :''    
                                                                }

                                                                {
                                                                    i==5 && this.props.offerList && this.props.offerList.filter(x => x.slider_location === 'lab_search_results').length && !this.state.is_insured?
                                                                        // <div className="col-12">
                                                                        //     <BannerCarousel {...this.props} sliderLocation="lab_search_results" />
                                                                        // </div> : ''
                                                                        <div className="banner-cont-height home-page-banner-div mb-3 mr-0 banner-md-margn">
                                                                        <div className="hidderBanner banner-carousel-div d-md-none">
                                                                            <div className="divHeight m-0" style={{marginBottom:"5px!important"}}></div>
                                                                        </div>
                                                                        <BannerCarousel {...this.props} sliderLocation="lab_search_results" />
                                                                    </div>
                                                                    :''
                                                                }
                                                                <li>
                                                                    {
                                                                        this.props.lab_card ?
                                                                            <LabProfileCard {...this.props} details={LABS[labId]} key={i} rank={i} />
                                                                            : <LabProfileCard {...this.props} details={LABS[labId]} key={i} rank={i} />
                                                                    }
                                                                </li>
                                                                {false && labList && labList.length > 5 &&  i == 2?
                                                                <div className="mb-3 referDocimg" onClick={(e)=>{
                                                                    e.preventDefault();
                                                                    let data = {
                                                                            'Category': 'ConsumerApp', 'Action': 'ReferLabList', 'CustomerID': GTM.getUserId() || '', 'event': 'refer-lab-list'
                                                                        }
                                                                    GTM.sendEvent({ data: data })
                                                                    this.props.history.push('/doctorsignup?member_type=2')}}>
                                                                    <img src={ASSETS_BASE_URL + "/img/zero_lab-min.png"} />
                                                                </div>:''}
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


export default LabsList
