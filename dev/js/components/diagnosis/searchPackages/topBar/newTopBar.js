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
            avg_ratings: [],
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
            avg_ratings: this.state.avg_ratings ||'',
            home_visit: this.state.home_visit || false,
            lab_visit: this.state.lab_visit ||false,
            gender: this.state.gender,
            packageType: this.state.packageType,
            catIds: this.state.catIds,
            test_ids: this.state.test_ids,
            package_ids: this.state.package_ids
        }
        let data = {
            'Category': 'FilterClick', 'Action': 'Clicked on Filter', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-filter-clicked', 'url': window.location.pathname, 'sort_order': this.state.sort_order || '', 'rating': this.state.avg_ratings||[], 'home_visit': this.state.home_visit || '', 'lab_visit': this.state.lab_visit || ''
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
        this.setState({ openFilter: false })
    }

    sortFilterClicked() {
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

    isDataFiltered(filterData={}) {

        if ( filterData && Object.values(filterData).length ) {

        }else {

            filterData = {
                sort_order: null,
                avg_ratings: [],
                availability: [],
                home_visit: false,
                lab_visit: false,
            }
        }
        try {
            let filterCount = 0
            for (let filter in filterData) {

                if(filter == 'availability' || filter =='avg_ratings'){
                    if(filterData[filter].length) {
                        filterCount++    
                    }
                }else if (filterData[filter] != this.state[filter]) {
                    filterCount++
                }
            }
            return filterCount
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

    toggleAllFilters(type, val, isArray=false) {
        let value = val
        if(isArray){
            value = []
            value.push(val)
        }
        this.setState({[type]: value})
    }

    render() {

        var selectedTests = []
        if (this.props.currentSearchedCriterias.length) {
            for (var i = 0; i < this.props.currentSearchedCriterias.length; i++) {
                selectedTests.push(this.props.currentSearchedCriterias[i].id);
            }
        }

        return (
            <div>
                <div className="">

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
                            :<div className="filter-row sticky-header mbl-stick">
                                <section className="scroll-shadow-bar">
                                    <div className="top-filter-tab-container" >
                                        <div className="top-filter-tabs-select newSortFilterbar" onClick={this.props.comparePackage.bind(this)}>
                                            <img src={!this.props.isCompared && (this.props.isCompare || this.props.compare_packages.length > 0)? ASSETS_BASE_URL + "/images/packageCompare/compare-orange.png": ASSETS_BASE_URL + "/images/packageCompare/compare.png"} alt="" style={{width: 16}} /> <span className={`${!this.props.isCompared && (this.props.isCompare || (this.props.compare_packages && this.props.compare_packages.length > 0))?'comapre-active':''}`}>Compare</span> 
                                        </div>
                                        <div className="top-filter-tabs-select newSortFilterbar" onClick={this.sortFilterClicked.bind(this)}>
                                            <div className="p-relative">
                                                <img style={{ width: '14px' }} src={ASSETS_BASE_URL + "/img/filtersort.png"} />
                                                {
                                                    this.isDataFiltered()?
                                                    <p className="filterNotification">{this.isDataFiltered()}</p>
                                                    :''    
                                                }
                                            </div>
                                            <span>Sort/Filter</span>
                                        </div>
                                    </div>
                                </section>
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
                    this.state.openFilter ?
                    <div>
                        <div className="cancel-overlay cancel-overlay-zindex" onClick={this.handleClose.bind(this)}>
                        </div>
                        <div className="widget cancel-appointment-div cancel-popup onscreen-scroll">
                            <div className="pop-top-heading">
                                Sort/Filter
                            </div>
                            <div className="sorting-main-container">
                                <div className="sort-lft-cont">
                                    <h5 className="sort-headings">Sort by</h5>
                                    <div className="sort-slider-scroll">
                                        <div className="sort-cards-list" onClick={this.toggleAllFilters.bind(this, 'sort_order', '')}>
                                            <div className="srt-lst-img">
                                                <img src={ASSETS_BASE_URL + "/img/revel.svg"} style={{ width: 18 }} />
                                            </div>
                                            <p>Relevance</p>
                                        </div>
                                        <div className="sort-cards-list" onClick={this.toggleAllFilters.bind(this, 'sort_order', 'low_to_high')}>
                                            <div className="srt-lst-img">
                                                <img src={ASSETS_BASE_URL + "/img/revel.svg"} style={{ width: 18 }} />
                                            </div>
                                            <p>Price Low to High</p>
                                        </div>
                                        <div className="sort-cards-list" onClick={this.toggleAllFilters.bind(this, 'sort_order', 'high_to_low')}>
                                            <div className="srt-lst-img">
                                                <img src={ASSETS_BASE_URL + "/img/revel.svg"} style={{ width: 18 }} />
                                            </div>
                                            <p>Price High to Low</p>
                                        </div>
                                        <div className="sort-cards-list" onClick={this.toggleAllFilters.bind(this, 'sort_order', 'distance')}>
                                            <div className="srt-lst-img">
                                                <img src={ASSETS_BASE_URL + "/img/revel.svg"} style={{ width: 18 }} />
                                            </div>
                                            <p>Distance</p>
                                        </div>
                                        <div className="sort-cards-list" onClick={this.toggleAllFilters.bind(this, 'sort_order', '')}>
                                            <div className="srt-lst-img">
                                                <img src={ASSETS_BASE_URL + "/img/revel.svg"} style={{ width: 18 }} />
                                            </div>
                                            <p>Rating</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="sorting-btns-cont">
                                    <h5 className="sort-headings">Ratings</h5>
                                    <div className="sortbtncard">
                                        <button className={`sortBtns ${this.state.avg_ratings && this.state.avg_ratings.length && this.state.avg_ratings.indexOf('3')>-1?'srtBtnAct':''}`} onClick={this.toggleAllFilters.bind(this, 'avg_ratings', '3', true)}><img className="srt-star-img" src={ASSETS_BASE_URL + "/img/customer-icons/selected-star.svg"}/>   3.0 +</button>
                                        <button className={`sortBtns ${this.state.avg_ratings && this.state.avg_ratings.length && this.state.avg_ratings.indexOf('4')>-1?'srtBtnAct':''}`} onClick={this.toggleAllFilters.bind(this, 'avg_ratings', '4', true)}> <img className="srt-star-img" src={ASSETS_BASE_URL + "/img/customer-icons/selected-star.svg"}/>   4.0 +</button>
                                        <button className={`sortBtns ${this.state.avg_ratings && this.state.avg_ratings.length && this.state.avg_ratings.indexOf('4.5')>-1?'srtBtnAct':''}`} onClick={this.toggleAllFilters.bind(this, 'avg_ratings', '4.5', true)}><img className="srt-star-img" src={ASSETS_BASE_URL + "/img/customer-icons/selected-star.svg"}/>   4.5 +</button>
                                    </div>
                                </div>
                                <div className="sorting-btns-cont">
                                    <h5 className="sort-headings">Hospital Type</h5>
                                    <div className="sortbtncard justyfy-twoBtns">
                                        <button className={`sortBtns ${this.state.home_visit?'srtBtnAct':''}`}  onClick={this.toggleAllFilters.bind(this, 'home_visit', !this.state.home_visit)}>Home Visit</button>
                                        <button className={`sortBtns ${this.state.lab_visit?'srtBtnAct':''}`} onClick={this.toggleAllFilters.bind(this, 'lab_visit', !this.state.lab_visit)}>Lab Visit</button>
                                    </div>
                                </div>

                                {
                                    this.props.packagesList.categories && this.props.packagesList.categories.length >0?
                                    <div className="sorting-btns-cont">
                                        <h5 className="sort-headings">Category</h5>
                                        <div className="sortbtncard justyfy-twoBtns">
                                            <ul className="cat-gry">
                                            {
                                                this.props.packagesList.categories.map((category,i) =>{
                                                    return <li key={i} id={category.id} onClick={this.selectCategory.bind(this,category.id)}><a href="javascript:void(0);" className={this.state.catIds.indexOf(category.id) > -1?"selected":''}>{category.name}</a></li>
                                                })
                                            }
                                        </ul>
                                        </div>
                                    </div>:''
                                }
                            </div>
                        </div>
                    </div> : ""
                }
                {
                    this.state.openFilter && false? <div onClick={this.sortFilterClicked.bind(this)} className="filter-overlay overlay black cancel-overlay-zindex">
                        <div className="widget filter-popup" onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                        }}>
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
