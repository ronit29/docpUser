import React from 'react';

import PackageProfileCard from '../../commons/labProfileCard/packageProfileCard.js'
import InfiniteScroll from 'react-infinite-scroller';
import Loader from '../../../commons/Loader'
import GTM from '../../../../helpers/gtm'
import BannerCarousel from '../../../commons/Home/bannerCarousel.js';
import SelectedPkgStrip from './selectedPkgStrip.js'

class packagesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasMore: false,
            loading: false,
            renderBlock: false,
            page: 0,
            readMore: 'search-details-data-less',
            catIds: []
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
        this.setState({ ...this.props.filterCriteriaPackages })
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

    componentWillReceiveProps(props) {
        if (props.filterCriteriaPackages) {
            this.setState({ catIds: props.filterCriteriaPackages.catIds || [] })
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

        this.props.getLabList(null, page + 1, (hasMore) => { //get searched packages result
            this.setState({ loading: false })
            setTimeout(() => {
                this.setState({ hasMore })
            }, 1000)
        })
    }
    testInfo() { // redirect to included test details page
        var url_string = window.location.href;
        var url = new URL(url_string);
        var test_ids = url.searchParams.get("test_ids");
        this.props.history.push('/search/testinfo?test_ids=' + test_ids + '&from=searchresults')
    }
    toggleScroll() {
        if (window) {
            window.scrollTo(0, 0)
        }
        this.setState({ readMore: 'search-details-data-less' })
    }
    showTc() {
        this.props.history.push('/tax-saver-health-packages-tc')
    }

    applyQuickFilters(category, viewMore = false) {
        // apply filters
        let filters = {
            catId: viewMore ? [] : [category],
            viewMore: viewMore
        }
        let gtmData = {
            'Category': 'PackageQuickFilterClicked', 'Action': 'PackageQuickFilterClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'package-quick-filter-clicked', 'url': window.location.pathname, 'type': category
        }
        GTM.sendEvent({ data: gtmData })
        this.props.applyQuickFilter(filters)
    }

    render() {
        let { LABS, labList } = this.props

        let start_page = 0
        if (this.props.curr_page) {
            start_page = Math.max(0, this.props.curr_page - 1)
        } else {
            if (this.props.page) {
                start_page = Math.max(0, this.props.page - 1)
            }
        }

        // if(document.getElementById("pkgTost") !== null){
        //     window.onscroll = function() {
        //     var currentScrollPos = window.pageYOffset
        //       if (currentScrollPos == 0) {
        //         document.getElementById("pkgTost").classList.add("d-none")
        //       } else {
        //         document.getElementById("pkgTost").classList.remove("d-none")
        //       }
        //     }
        // }

        return (
            <section className="wrap search-book-result variable-content-section" style={{ paddingTop: 10 }} ref="checkIfExists">
                {!this.props.forOrganicSearch && !this.props.forTaxSaver ? <div className="pkgTost d-none" id="pkgTost"><p onClick={() => this.props.history.push('/health-package-advisor')}>Need Help in Booking Health Package? </p>
                </div> : ''
                }
                {
                    this.state.renderBlock ? <Loader /> :
                        <div className="container-fluid cardMainPaddingRmv" style={{ minHeight: '60vh' }}>
                            {
                                this.props.forOrganicSearch && this.props.packagesList && this.props.packagesList.count > 0 ?
                                    <div className="search-result-card-collpase">
                                        <div className={this.state.readMore} dangerouslySetInnerHTML={{ __html: this.props.packagesList.search_content }} >
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
                            {/*
                                this.props.forTaxSaver ? <div>
                                    <div className="taxBanner">
                                        <img className="img-fluid" src="https://cdn.docprime.com/images/artboard1243.png" />
                                    </div>
                                    <div className="taxContent">
                                        { <img style={{ cursor: 'pointer', marginTop: '3px' }} src={ASSETS_BASE_URL + "/img/icons/info.svg"} /> }
                                        <p className="taxContentPara">Book Preventive Healthcare Packages for you and your family and get a tax benefit upto <span style={{ display: 'inline-block' }}>₹ 5000</span> under section 80D of the Income Tax Act. To know more <span className="taxClickbtn" onClick={this.showTc.bind(this)}> click here</span></p>
                                    </div>
                                </div>
                                    : ''
                            */}
                            <div className="row no-gutters">
                                <div className="col-12">
                                    <InfiniteScroll
                                        pageStart={start_page}
                                        loadMore={this.loadMore.bind(this)}
                                        hasMore={this.state.hasMore}
                                        useWindow={true}
                                    >
                                        <ul>
                                            {
                                                this.props.packagesList && this.props.packagesList.result ? this.props.packagesList.result.map((packages, i) => {

                                                    return <React.Fragment key={i}>

                                                        {
                                                            i == 3 && !this.state.catIds.length && this.props.packagesList && this.props.packagesList.categories && this.props.packagesList.categories.length ?
                                                                <div className="sort-sub-filter-container mb-3">
                                                                    <p>Filter by <span className="fw-700"> Test Category </span><span className="fw-500 sort-more-filter" onClick={this.applyQuickFilters.bind(this, '', true)}>More filters</span></p>
                                                                    <div className="srt-sb-btn-cont">
                                                                        {
                                                                            this.props.packagesList.categories.map((category, j) => {
                                                                                return <button key={j} className={`${this.state.catIds && this.state.catIds.indexOf(category.id) > -1 ? 'srt-act' : ''}`} id={category.id} onClick={this.applyQuickFilters.bind(this, category.id, false)}> {category.name}</button>
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                                : ''
                                                        }

                                                        {
                                                            i == 5 && this.props.offerList && this.props.offerList.filter(x => (x.slider_location === 'search_packages_page') || (x.slider_location === 'full_body_chechkup_page') || (x.slider_location === 'tax_saver_packages_page')).length ?
                                                                <div className="banner-cont-height home-page-banner-div mb-3 mr-0 banner-md-margn">
                                                                    <div className="hidderBanner banner-carousel-div d-md-none">
                                                                        <div className="divHeight m-0" style={{ marginBottom: "5px!important" }}></div>
                                                                    </div>
                                                                    <BannerCarousel {...this.props} sliderLocation={this.props.forTaxSaver ? "tax_saver_packages_page" : this.props.forOrganicSearch ? 'full_body_chechkup_page' : 'search_packages_page'} />
                                                                </div> : ''
                                                        }
                                                        <li id={`scrollById_${packages.id}`}>
                                                            <PackageProfileCard {...this.props} details={packages} key={i} rank={i} />
                                                        </li>
                                                    </React.Fragment>
                                                })
                                                    : ''
                                            }
                                        </ul>
                                        {/*<InfiniteScroll
                                        pageStart={0}
                                        loadMore={this.loadMore.bind(this)}
                                        hasMore={this.state.hasMore}
                                        useWindow={true}
                                    >
                                    {
                                        labList.map((labId, i) => {
                                            if (i == 1 && LABS[labId]) {

                                                return <div key={i}>
                                                    <div className="no-risk-container mt-3">
                                                        <div className="no-rsk">
                                                            <div className="rsk-image">
                                                                <img className="" src={ASSETS_BASE_URL + "/img/customer-icons/group-98.png"} />
                                                            </div>
                                                            <div className="rsk-content">
                                                                <h4 className="rsk-hdng">Amazing Savings... No Risks!</h4>
                                                                <ul className="rsk-lstng ff">
                                                                    <li className="lst-bfr">Upto 50% Off on doctor and lab bookings</li>
                                                                    <li className="lst-bfr">100% money back guarantee -  No questions!</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        this.props.lab_card ?
                                                            <LabResultCard {...this.props} details={LABS[labId]} key={i} rank={i} />
                                                            : <LabProfileCard {...this.props} details={LABS[labId]} key={i} rank={i} />
                                                    }
                                                </div>

                                            } else {
                                                if (LABS[labId]) {
                                                    return <div key={i}>
                                                        {
                                                            this.props.lab_card ?
                                                                <LabResultCard {...this.props} details={LABS[labId]} key={i} rank={i} />
                                                                : <LabProfileCard {...this.props} details={LABS[labId]} key={i} rank={i} />
                                                        }
                                                    </div>
                                                } else {
                                                    return ""
                                                }
                                            }
                                        })
                                        }
                                    </InfiniteScroll>*/}
                                    </InfiniteScroll>
                                </div>
                            </div>
                            {this.state.loading ? <Loader classType="loaderPagination" /> : ""}
                        </div>
                }
                {
                    !this.props.isCompared && (this.props.isCompare || this.props.compare_packages.length > 0) ?
                        <SelectedPkgStrip {...this.props} toggleComparePackages={this.props.toggleComparePackages.bind(this)} />
                        : ''
                }
            </section>
        );
    }
}


export default packagesList
