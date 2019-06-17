import React from 'react';
import { connect } from 'react-redux';
import Range from 'rc-slider/lib/Range';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SnackBar from 'node-snackbar'
import LocationElements from '../../../../containers/commons/locationElements'
import LocationPopup from '../../../../containers/commons/locationPopup'
import GTM from '../../../../helpers/gtm'
import CategoryPopup from './categoryPopup.js'


class TopBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            openFilter: false,
            // shortURL: "",
            dropdown_visible: false,
            // showLocationPopup: false,
            // overlayVisible: false,
            // showPopupContainer: true,
            sortText: 'Relevance',
            openCategory: false,
            isCategoryApplied: false,
            appliedCategoryCount: '',
            initialSelectedCatIds: '',
            max_age: '',
            min_age: '',
            packageType: '',
            gender: '',
            catIds: [],
            test_ids: '',
            package_ids: '',
            previous_filters: {},
            sort_order: null,
            rating: [],
            home_visit: false,
            lab_visit: false,
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ ...props.filterCriteriaPackages })
        // if (props.locationType && !props.locationType.includes("geo")) {
        //     this.setState({ showLocationPopup: false })
        // } else {
        //     if (props.seoData && props.seoData.location) {
        //         this.setState({ showLocationPopup: false })
        //     } else {
        //         if (props.selectedLocation != this.props.selectedLocation) {
        //             this.setState({ showLocationPopup: true, overlayVisible: true })
        //         }
        //     }
        // }
        // this.shortenUrl()
    }

    componentDidMount() {
        this.setState({ ...this.props.filterCriteriaPackages })
        // this.shortenUrl()
        // if (this.props.seoData && this.props.seoData.location) {
        //     this.setState({ showLocationPopup: false })
        // } else {
        //     if (this.props.locationType.includes("geo")) {
        //         this.setState({ showLocationPopup: true, overlayVisible: true })
        //     }
        // }
        if (!this.props.forOrganicSearch) {
            var url_string = window.location.href
            var url = new URL(url_string);
            var cat_ids = url.searchParams.get("category_ids")
            if (cat_ids != null) {
                cat_ids = cat_ids.split(',')
                if (cat_ids.length > 0) {
                    this.setState({
                        appliedCategoryCount: cat_ids.length, isCategoryApplied: true
                    })
                }
            }
        }
    }

    applyFilters() {
        let filterState = {
            sort_order: this.state.sort_order || '',
            rating: this.state.rating ||'',
            home_visit: this.state.home_visit || false,
            lab_visit: this.state.lab_visit ||false,
            gender: this.state.gender,
            packageType: this.state.packageType,
            catIds: this.state.catIds,
            test_ids: this.state.test_ids,
            package_ids: this.state.package_ids
        }
        let data = {
            'Category': 'FilterClick', 'Action': 'Clicked on Filter', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-filter-clicked', 'url': window.location.pathname, 'lowPriceRange': this.state.priceRange[0], 'highPriceRange': this.state.priceRange[1], 'lowDistanceRange': this.state.distanceRange[0], 'highDistanceRange': this.state.distanceRange[1], 'sort_on': this.state.sort_on == "" ? 'relevance' : this.state.sort_on
        }
        GTM.sendEvent({ data: data })
        this.props.applyFilters(filterState)
        this.setState({ openFilter: false })
    }

    // handleOpen(event) {
    //     // this.setState({ anchorEl: event.currentTarget })
    //     this.setState({
    //         dropdown_visible: true
    //     });
    // }

    // hideSortDiv() {
    //     this.setState({
    //         dropdown_visible: false
    //     });
    // }

    handleClose(type) {
        this.setState({ anchorEl: null, sort_on: type})
        // this.setState({ anchorEl: null, sort_on: type ,dropdown_visible:false}, () => {
        //     if (type || type === "") {
        //         this.applyFilters()
        //     }
        // })
    }

    toggleFilter() {
        this.setState({
            openFilter: !this.state.openFilter
        })
    }

    handleRange(type, range) {
        this.setState({
            [type]: range
        })
    }

    // getCriteriaString(selectedCriterias) {
    //     if (selectedCriterias && selectedCriterias.length) {
    //         return selectedCriterias.reduce((final, curr, i) => {
    //             if (i != 0) {
    //                 final += ', '
    //             }
    //             final += `${curr.name}`
    //             return final
    //         }, "")
    //     }
    // }

    isFilterApplied() {
        const def = {
            priceRange: [0, 20000],
            distanceRange: [0, 15]
        }
        try {
            for (let filter in def) {
                if (def[filter][0] != this.state[filter][0] || def[filter][1] != this.state[filter][1]) {
                    return true
                }
            }
            return false
        } catch (e) {
            return false
        }
    }

    selectCategory(category){
        let selectedCategoryIds = this.state.catIds
        if(category){
            if(selectedCategoryIds.indexOf(category)>-1){
                selectedCategoryIds = selectedCategoryIds.filter(x=>x!=category) 
            }else{
                selectedCategoryIds.push(category)    
            }
        }
        this.setState({catIds: selectedCategoryIds})
    }

    // shortenUrl() {
    //     if (window) {
    //         let url = window.location.href + '&force_location=true'
    //         this.props.urlShortner(url, (err, data) => {
    //             if (!err) {
    //                 this.setState({ shortURL: data.tiny_url })
    //             }
    //         })
    //     }
    // }

    // overlayClick() {
    //     this.setState({ overlayVisible: false, searchCities: [] });
    // }

    // hideLocationPopup() {
    //     this.setState({ showLocationPopup: false });
    // }

    // popupContainer() {
    //     this.setState({ showPopupContainer: false, showLocationPopup: false });
    // }
    // toggleCategory(event) {
    //     this.setState({
    //         openCategory: !this.state.openCategory
    //     })
    // }
    // closeCategory() {
    //     this.setState({
    //         openCategory: !this.state.openCategory
    //     })
    // }
    // applyCategories(categoryState) {
    //     let filterState = {
    //         priceRange: this.state.priceRange,
    //         distanceRange: this.state.distanceRange,
    //         sort_on: this.state.sort_on,
    //         max_age: this.state.max_age,
    //         min_age: this.state.min_age,
    //         gender: this.state.gender,
    //         packageType: this.state.packageType,
    //         test_ids: this.state.test_ids,
    //         package_ids: this.state.package_ids
    //     }
    //     // let isCategory = false 
    //     // if(this.state.initialSelectedCatIds != categoryState.length){
    //     //     isCategory = true
    //     // }
    //     this.props.applyCategories(categoryState, filterState)
    //     // this.setState({ openCategory: false ,isCategoryApplied:isCategory,appliedCategoryCount:categoryState.length>0?categoryState.length:''})
    //     this.setState({ openCategory: false, catIds: categoryState.length })

    // }
    // initialSelectedCategory(selectedcategory) {
    //     this.setState({ initialSelectedCatIds: selectedcategory.length })
    // }

    // goToLocation() {
    //     this.setState({
    //         searchCities: []
    //     })
    //     let location_url = '/locationsearch'
    //     let data = {
    //         'Category': 'ChangeLocationDoctorResultsPopUp', 'Action': 'change-location-doctor-results-PopUp', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'change-location-doctor-results-PopUp', 'url': window.location.pathname
    //     }
    //     GTM.sendEvent({ data: data })
    //     this.props.history.push(location_url)
    // }

    render() {

        // if(document.getElementById("filter-scroll")){
        //     window.onscroll = function() {
        //     var currentScrollPos = window.pageYOffset
        //       if (currentScrollPos > 0) {
        //         document.getElementById("filter-scroll").classList.add("d-none")
        //       } else {
        //         document.getElementById("filter-scroll").classList.remove("d-none")
        //       }
        //     }
        // }

        var selectedTests = []
        if (this.props.currentSearchedCriterias.length) {
            for (var i = 0; i < this.props.currentSearchedCriterias.length; i++) {
                selectedTests.push(this.props.currentSearchedCriterias[i].id);
            }
        }

        let sortType = ''
        if (this.state.sort_on) {
            sortType = this.state.sort_on.charAt(0).toUpperCase() + this.state.sort_on.slice(1);
        }

        // let criteriaStr = this.getCriteriaString(this.props.currentSearchedCriterias)
        // let locationName = ""
        // if (this.props.selectedLocation && this.props.selectedLocation.formatted_address) {
        //     locationName = this.props.selectedLocation.formatted_address
        // }
        // if (this.props.seoData && this.props.seoData.location) {
        //     locationName = this.props.seoData.location
        // }
        return (
            <div>
                {
                    this.state.dropdown_visible ?
                        <div>
                            <div className="cancel-overlay cancel-overlay-zindex" onClick={this.hideSortDiv.bind(this)}>
                            </div>
                            <div className="widget cancel-appointment-div cancel-popup onscreen-scroll">
                                <div className="pop-top-heading">
                                    Sort
                            </div>
                                <div className="col-12">
                                    <div className="ins-form-radio insradio-on-popup">
                                        <ul className="">
                                            <li className={`drop-list-styling  ${!!!this.state.sort_on ? 'drop-icon-selecter' : ''}`} onClick={this.handleClose.bind(this, "")}> <img className="drop-icon-selecter-selected" src={ASSETS_BASE_URL + "/img/checks.svg"} style={{ width: 18 }} /><img src={ASSETS_BASE_URL + "/img/revel.svg"} style={{ width: 18, marginRight: '10px' }} />Relevance</li>
                                            <li className={`drop-list-styling ${this.state.sort_on == 'fees' ? 'drop-icon-selecter' : ''}`} onClick={this.handleClose.bind(this, 'fees')}><img className="drop-icon-selecter-selected" src={ASSETS_BASE_URL + "/img/checks.svg"} style={{ width: 18 }} /><img src={ASSETS_BASE_URL + "/img/sortRupee.svg"} style={{ width: 18, marginRight: '10px' }} />Fee</li>
                                            <li className={`drop-list-styling ${this.state.sort_on == 'distance' ? 'drop-icon-selecter' : ''} `} onClick={this.handleClose.bind(this, 'distance')}><img className="drop-icon-selecter-selected" src={ASSETS_BASE_URL + "/img/checks.svg"} style={{ width: 18 }} /><img src={ASSETS_BASE_URL + "/img/new-loc-ico.svg"} style={{ width: 11, marginRight: '10px' }} />Distance</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div> : ""
                }
                <div className="filter-row sticky-header mbl-stick">

                    {this.props.forOrganicSearch ?
                        <div className="col-12 mrng-top-12 d-none d-md-block"><ul className="mrb-10 breadcrumb-list" style={{ 'wordBreak': 'breakWord' }}><li className="breadcrumb-list-item"><a href="/"><span className="fw-500 breadcrumb-title breadcrumb-colored-title">Home</span></a></li><span className="breadcrumb-arrow">&gt;</span><li className="breadcrumb-list-item"><span className="fw-500 breadcrumb-title">Full Body Checkup Packages</span></li></ul></div>
                        : ''}
                    <section className="scroll-shadow-bar">
                        {/*
                            this.props.forTaxSaver ? '' :
                                <div className="top-filter-tab-container">
                                    <div className="top-filter-tabs-select" onClick={this.handleOpen.bind(this)}><img src={ASSETS_BASE_URL + "/img/sort.svg"} style={{ width: 18 }} /><span>Sort</span>
                                        {
                                            this.state.sort_on != null ? <span className="applied-filter-noti-new" /> : ""
                                        }
                                    </div>
                                    <div className="top-filter-tabs-select" onClick={this.toggleFilter.bind(this)}><img src={ASSETS_BASE_URL + "/img/filter.svg"} style={{ width: 18 }} /><span>Filter</span>
                                        {
                                            this.isFilterApplied.call(this) ? <span className="applied-filter-noti-new" /> : ""
                                        }
                                    </div>
                                    <div className="top-filter-tabs-select" onClick={this.toggleCategory.bind(this)}><img src={ASSETS_BASE_URL + "/img/categories.svg"} style={{ width: 18 }} /> {this.state.catIds.length > 0 ? 'Category (' + this.state.catIds.length + ')' : 'Category'}
                                    </div>
                                </div>
                        */}
                        {
                            this.props.forTaxSaver?''
                            :<div className="top-filter-tab-container">
                                <div className="top-filter-tabs-select" onClick={this.props.comparePackage.bind(this)}>
                                <img src={!this.props.isCompared && (this.props.isCompare || this.props.compare_packages.length > 0)? ASSETS_BASE_URL + "/images/packageCompare/compare-orange.png": ASSETS_BASE_URL + "/images/packageCompare/compare.png"} alt="" style={{width: 16}} /> <span className={`${!this.props.isCompared && (this.props.isCompare || (this.props.compare_packages && this.props.compare_packages.length > 0))?'comapre-active':''}`}>Compare</span> </div>
                                <div className="top-filter-tabs-select" onClick={this.toggleFilter.bind(this)}>
                                      <img className="sort-filter" src={ASSETS_BASE_URL + "/images/packageCompare/filtersort.png"} alt="" style={{width: 13}} /> 
                                      <span>Sort / Filter</span> 
                                </div>
                            </div>
                        }
                    </section>

                   
                </div>
                {
                        this.state.openCategory ? <div>
                            <CategoryPopup {...this.props} applyCategories={this.applyCategories.bind(this)} closeCategory={this.closeCategory.bind(this)} initialSelectedCategory={this.initialSelectedCategory.bind(this)} />
                        </div> : ""
                    }
                {
                    this.state.openFilter ? <div onClick={this.toggleFilter.bind(this)} className="filter-overlay overlay black cancel-overlay-zindex">
                        <div className="widget filter-popup" onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                        }}>
                            <div className="widget-content wd-content">
                                <div className="filterRow pad-all-0 mt-0">
                                    <h4 className="section-sort">Sort By</h4>
                                    <ul className="sortBy">
                                    <li className={`drop-list-styling  ${!!!this.state.sort_on ? 'drop-icon-selecter selected-sort' : ''}`} onClick={this.handleClose.bind(this, "")}> <span><img src={ASSETS_BASE_URL + "/img/revel.svg"} style={{ width: 18}} /> </span><br />Relevance</li>
                                    <li className={`drop-list-styling ${this.state.sort_on == 'fees' ? 'drop-icon-selecter selected-sort' : ''}`} onClick={this.handleClose.bind(this, 'fees')}><span><img src={ASSETS_BASE_URL + "/img/sortRupee.svg"} style={{ width: 13, marginTop: '-2px'}} /></span><br />Fee</li>
                                    <li className={`drop-list-styling ${this.state.sort_on == 'distance' ? 'drop-icon-selecter selected-sort' : ''} `} onClick={this.handleClose.bind(this, 'distance')}><span><img src={ASSETS_BASE_URL + "/img/new-loc-ico.svg"} style={{ width: 11, verticalAlign: '-2px'}} /></span><br />Distance</li>
                                    </ul>
                                </div>
                                 <hr className="hr-cls" />
                                <div className="filterRow">
                                 <h4 className="section-sort">Filter</h4>
                                   <div style={{position:'relative',marginTop:20}}>
                                    <span className="tl">Price</span>
                                    <span className="tr">&#8377; {this.state.priceRange[0]} to {this.state.priceRange[1]}</span>
                                    <span className="bl">&#8377; 0</span>
                                    <span className="br">&#8377; 20000</span>

                                    <Range
                                        min={0}
                                        max={20000}
                                        value={this.state.priceRange}
                                        step={100}
                                        className="range"
                                        onChange={this.handleRange.bind(this, 'priceRange')}
                                    />
                                   </div>
                                </div>
                                <div className="filterRow">
                                    <div style={{position:'relative'}}>
                                    <span className="tl">Distance</span>
                                    <span className="tr">{this.state.distanceRange[0]} to {this.state.distanceRange[1]} KM</span>
                                    <span className="bl">0 KM</span>
                                    <span className="br">50 KM</span>

                                    <Range
                                        min={0}
                                        max={50}
                                        value={this.state.distanceRange}
                                        step={1}
                                        className="range"
                                        onChange={this.handleRange.bind(this, 'distanceRange')}
                                    />
                                    </div>
                                </div>
                                <hr className="hr-cls" />
                                {
                                    this.props.packagesList.categories && this.props.packagesList.categories.length >0?
                                    <div className="filterRow pad-all-0">
                                        <h4 className="section-sort">Category</h4>
                                        <ul className="cat-gry">
                                            {
                                                this.props.packagesList.categories.map((category,i) =>{
                                                    return <li key={i} id={category.id} onClick={this.selectCategory.bind(this,category.id)}><a href="javascript:void(0);" className={this.state.catIds.indexOf(category.id) > -1?"selected":''}>{category.name}</a></li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                :''}
                            </div>
                            <div className="widget-footer pd-0">
                                <button className="v-btn v-btn-primary btn-block btn-lg pop-btn" onClick={this.applyFilters.bind(this)}>Apply</button>
                            </div>
                        </div>
                    </div> : ""
                }
            </div>
        );
    }
}


export default TopBar
