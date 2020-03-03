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
            sort_on: '',
            sort_order: '',
            avg_ratings: '',
            home_visit: false,
            lab_visit: false,
            quickFilter: {}
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ ...props.filterCriteriaPackages, quickFilter: props.quickFilter||{} }, ()=>{
            if(this.state.quickFilter && ( (this.state.quickFilter.catId && this.state.quickFilter.catId.length) || this.state.quickFilter.viewMore ) ) {
                this.sortFilterClicked()
            }
        })
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
            sort_on: this.state.sort_on,
            sort_order: this.state.sort_order,
            avg_ratings: this.state.avg_ratings || '',
            home_visit: this.state.home_visit,
            lab_visit: this.state.lab_visit,
            gender: this.state.gender,
            packageType: this.state.packageType,
            catIds: this.state.catIds,
            test_ids: this.state.test_ids,
            package_ids: this.state.package_ids
        }
        let data = {
            'Category': 'FilterClick', 'Action': 'Clicked on Filter', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-filter-clicked', 'url': window.location.pathname, 'sort_order': this.state.sort_order || '', 'rating': this.state.avg_ratings || [], 'home_visit': this.state.home_visit || '', 'lab_visit': this.state.lab_visit || '', sort_on: this.state.sort_on || ''
        }
        GTM.sendEvent({ data: data })

        let ifAnyFilterApplied = this.isDataFiltered({}, true)
        if(ifAnyFilterApplied) {
            this.props.applyFilters(filterState)    
        }
        
        this.setState({ openFilter: false })
    }

    handleClose(reset=false, e) {

        if(reset) {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'ResetPackageFilter', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'reset-package-filter', 'url': window.location.pathname, 'sort_order': this.state.sort_order || '', 'rating': this.state.avg_ratings || [], 'home_visit': this.state.home_visit || '', 'lab_visit': this.state.lab_visit || '', sort_on: this.state.sort_on || ''
            }
            GTM.sendEvent({ data: data })

            let resetFilters = {
                sort_on: '',
                sort_order: '',
                avg_ratings: '',
                home_visit: false,
                lab_visit: false,
                gender: '',
                catIds: []
            }

            this.setState({
                ...resetFilters,
                quickFilter: {}
            })
        }else {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'ClosePackageFilter', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'close-package-filter', 'url': window.location.pathname, 'sort_order': this.state.sort_order || '', 'rating': this.state.avg_ratings || [], 'home_visit': this.state.home_visit || '', 'lab_visit': this.state.lab_visit || '', sort_on: this.state.sort_on || ''
            }
            GTM.sendEvent({ data: data })
            this.setState({
                openFilter: false,
                ...this.state.previous_filters,
                quickFilter: {}
            })
            this.props.resetQuickFilters()
        }
        
    }

    sortFilterClicked() {
        let data = {
                'Category': 'ConsumerApp', 'Action': 'PackageSortFilterClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'package-sort-filter-clicked', 'url': window.location.pathname, 'sort_order': this.state.sort_order || '', 'rating': this.state.avg_ratings || [], 'home_visit': this.state.home_visit || '', 'lab_visit': this.state.lab_visit || '', sort_on: this.state.sort_on || ''
            }
        GTM.sendEvent({ data: data })

        let currentFilters = {
            sort_on: this.state.sort_on,
            sort_order: this.state.sort_order,
            avg_ratings: this.state.avg_ratings || '',
            home_visit: this.state.home_visit,
            lab_visit: this.state.lab_visit,
            gender: this.state.gender,
            catIds: [].concat(this.state.catIds) || []
        }

        this.setState({
            openFilter: true, previous_filters: currentFilters, catIds: this.state.quickFilter && this.state.quickFilter.catId && this.state.quickFilter.catId.length?this.state.quickFilter.catId:this.state.catIds
        })
    }

    isDataFiltered(filterData = {}, checkIfAnyFilterAppliled=false) {

        if (checkIfAnyFilterAppliled) {

            try {
                let filterCount = 0
                for (let filter in this.state.previous_filters) {

                    if (filter.includes('catIds') ) {
                        
                        if (this.state.previous_filters[filter] && this.state[filter].length != this.state.previous_filters[filter].length) {
                            
                            filterCount++
                            break;
                        }else {

                            for(let arrFliter=0;arrFliter<this.state[filter].length; arrFliter++) {
                                if(this.state.previous_filters[filter].indexOf(this.state[filter][arrFliter])==-1){
                                    filterCount++
                                    break;
                                }
                            }
                        }

                    } else if(this.state[filter] != this.state.previous_filters[filter]){
                        filterCount++
                        break;
                    }
                }
                return filterCount
            } catch (e) {
                return false
            }
        } else {

            filterData = {
                avg_ratings: '',
                hospital_type: '',
                catIds: []
            }
        }
        try {
            let filterCount = 0
            for (let filter in filterData) {

                if(filter.includes('hospital_type')){
                    if(this.state['lab_visit'] || this.state['home_visit']){
                        filterCount++
                    }
                }else if (filter =='catIds') {
                    if (this.state[filter].length) {
                        filterCount++
                    }
                } else if (filterData[filter] != this.state[filter]) {
                    filterCount++
                }
            }
            return filterCount
        } catch (e) {
            return false
        }
    }

    selectCategory(category) {
        let selectedCategoryIds = this.state.catIds
        if (category) {
            if (selectedCategoryIds.indexOf(category) > -1) {
                selectedCategoryIds = selectedCategoryIds.filter(x => x != category)
            } else {
                selectedCategoryIds.push(category)
            }
        }
        this.setState({ catIds: selectedCategoryIds })
    }

    toggleAllFilters(type, val, isArray = false, e) {
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
        if(type.includes('sort_on') ) {

            if(val.includes('price_asc') || val.includes('price_desc') ){

                if(this.state[type]=='fees' && ( (this.state['sort_order']=='asc' && val.includes('price_asc') ) || (this.state['sort_order']=='desc' && val.includes('price_desc') ) ) ){
                    this.setState({sort_on: null, sort_order: null})
                }else{
                    this.setState({sort_on: 'fees', sort_order: val.includes('price_asc')?'asc':'desc'})
                }

            }else {
                this.setState({ sort_on: this.state[type]==value?null:value, sort_order: null })
            }
        }else if(type.includes('lab_visit') || type.includes('home_visit')){

                if(this.state[type]) {
                    this.setState({[type]: !this.state[type]})
                }else {
                    this.setState({'lab_visit': type.includes('lab_visit')?value:!value, 'home_visit': type.includes('home_visit')?value:!value})
                }
        }else {
            this.setState({ [type]: this.state[type]==value?'':value })  
        }
    }

    render() {

        var selectedTests = []
        if (this.props.currentSearchedCriterias.length) {
            for (var i = 0; i < this.props.currentSearchedCriterias.length; i++) {
                selectedTests.push(this.props.currentSearchedCriterias[i].id);
            }
        }

        let quickFilterCatId = this.state.quickFilter && this.state.quickFilter.catId && this.state.quickFilter.catId.length?this.state.quickFilter.catId[0]:''

        return (
            <React.Fragment>
            {
            this.state.openFilter ?
                <div>
                    <div className="cancel-overlay cancel-overlay-zindex" onClick={this.handleClose.bind(this, false)}>
                    </div>
                    <div className="widget cancel-appointment-div cancel-popup overflow-hidden pb-0">
                        <div className="cross-btn" onClick={this.handleClose.bind(this, false)}>
                            <img src={ASSETS_BASE_URL + "/img/icons/close.png"} alt="close" />
                        </div>
                        <div className="pop-top-heading">
                            Sort/Filter
                    </div>
                        <div className="sorting-main-container">
                            <div className="sort-lft-cont">
                                <h5 className="sort-headings">Sort by</h5>
                                <div className="sort-slider-scroll">
                                    <div className={`sort-cards-list ${this.state.sort_on==''?'chitActive':''}`} onClick={this.toggleAllFilters.bind(this, 'sort_on', '', false)}>
                                        <div className="srt-lst-img">
                                            {
                                                this.state.sort_on==''?
                                                <img src={ASSETS_BASE_URL + "/img/popupicon/rv-relevence.svg"} style={{ width: 18 }} />
                                                :<img src={ASSETS_BASE_URL + "/img/revel.svg"} style={{ width: 18 }} />
                                            }
                                        </div>
                                        <p>Relevance</p>
                                    </div>
                                    {
                                        this.props.is_login_user_insured && this.props.insurance_status == 1?''
                                        :<div className={`sort-cards-list ${this.state.sort_on=='fees' && this.state.sort_order=='asc'?'chitActive':''}`} onClick={this.toggleAllFilters.bind(this, 'sort_on', 'price_asc', false)}>
                                            <div className="srt-lst-img">
                                                {
                                                    this.state.sort_on=='fees' && this.state.sort_order=='asc'?
                                                    <img src={ASSETS_BASE_URL + "/img/popupicon/rv-pricesort.svg"} style={{ width: 18 }} />
                                                    :<img src={ASSETS_BASE_URL + "/img/popupicon/pricesort.svg"} style={{ width: 18 }} />
                                                }
                                            </div>
                                            <p>Price Low to High</p>
                                        </div>
                                    }

                                    {
                                        this.props.is_login_user_insured && this.props.insurance_status == 1?''
                                        :<div className={`sort-cards-list ${this.state.sort_on=='fees' && this.state.sort_order=='desc'?'chitActive':''}`} onClick={this.toggleAllFilters.bind(this, 'sort_on', 'price_desc', false)}>
                                            <div className="srt-lst-img">
                                                {
                                                    this.state.sort_on=='fees' && this.state.sort_order=='desc'?
                                                    <img src={ASSETS_BASE_URL + "/img/popupicon/rv-priceup.svg"} style={{ width: 18 }} />
                                                    :<img src={ASSETS_BASE_URL + "/img/popupicon/priceup.svg"} style={{ width: 18 }} />
                                                }
                                            </div>
                                            <p>Price High to Low</p>
                                        </div>
                                    }
                                    
                                    <div className={`sort-cards-list ${this.state.sort_on=='distance'?'chitActive':''}`} onClick={this.toggleAllFilters.bind(this, 'sort_on', 'distance', false)}>
                                        <div className="srt-lst-img">
                                            {
                                                this.state.sort_on=='distance'?
                                                <img src={ASSETS_BASE_URL + "/img/popupicon/rv-locations.svg"} style={{ width: 14 }} />
                                                :<img src={ASSETS_BASE_URL + "/img/popupicon/locations.svg"} style={{ width: 14 }} />
                                            }
                                        </div>
                                        <p>Distance</p>
                                    </div>
                                    <div className={`sort-cards-list ${this.state.sort_on=='rating'?'chitActive':''}`} onClick={this.toggleAllFilters.bind(this, 'sort_on', 'rating', false)}>
                                        <div className="srt-lst-img">
                                            {
                                                this.state.sort_on=='rating'?
                                                <img src={ASSETS_BASE_URL + "/img/popupicon/rv-ratng.svg"} style={{ width: 18 }} />
                                                :<img src={ASSETS_BASE_URL + "/img/popupicon/ratng.svg"} style={{ width: 18 }} />
                                            }
                                        </div>
                                        <p>Rating</p>
                                    </div>
                                </div>
                            </div>
                            <div className="sorting-btns-cont">
                                <h5 className="sort-headings">Ratings</h5>
                                <div className="sortbtncard">
                                    <button className={`sortBtns ${this.state.avg_ratings =='3' ? 'srtBtnAct' : ''}`} onClick={this.toggleAllFilters.bind(this, 'avg_ratings', '3', false)}>

                                        {
                                            this.state.avg_ratings =='3' ?
                                            <img className="srt-star-img" src={ASSETS_BASE_URL + "/img/popupicon/rv-btn-star.svg"} />
                                            :<img className="srt-star-img" src={ASSETS_BASE_URL + "/img/customer-icons/selected-star.svg"} />
                                        }  
                                         3.0 +</button>
                                    <button className={`sortBtns ${this.state.avg_ratings =='4'? 'srtBtnAct' : ''}`} onClick={this.toggleAllFilters.bind(this, 'avg_ratings', '4', false)}> 

                                        {
                                            this.state.avg_ratings =='4'?
                                            <img className="srt-star-img" src={ASSETS_BASE_URL + "/img/popupicon/rv-btn-star.svg"} />
                                            :<img className="srt-star-img" src={ASSETS_BASE_URL + "/img/customer-icons/selected-star.svg"} /> 
                                        } 
                                          4.0 +</button>
                                    <button className={`sortBtns ${this.state.avg_ratings =='4.5' ? 'srtBtnAct' : ''}`} onClick={this.toggleAllFilters.bind(this, 'avg_ratings', '4.5', false)}>
                                        {
                                            this.state.avg_ratings =='4.5'?
                                            <img className="srt-star-img" src={ASSETS_BASE_URL + "/img/popupicon/rv-btn-star.svg"} />
                                            :<img className="srt-star-img" src={ASSETS_BASE_URL + "/img/customer-icons/selected-star.svg"} />
                                        }
                                       4.5 +</button>
                                </div>
                            </div>
                            <div className="sorting-btns-cont">
                                <h5 className="sort-headings">Visit Type</h5>
                                <div className="sortbtncard justyfy-twoBtns">
                                    <button className={`sortBtns ${this.state.home_visit ? 'srtBtnAct' : ''}`} onClick={this.toggleAllFilters.bind(this, 'home_visit', !this.state.home_visit, false)}>Home Visit</button>
                                    <button className={`sortBtns ${this.state.lab_visit ? 'srtBtnAct' : ''}`} onClick={this.toggleAllFilters.bind(this, 'lab_visit', !this.state.lab_visit, false)}>Lab Visit</button>
                                </div>
                            </div>

                            {
                                this.props.packagesList.categories && this.props.packagesList.categories.length > 0 ?
                                    <div className="sorting-btns-cont">
                                        <h5 className="sort-headings">Category</h5>
                                        <div className="sortbtncard justyfy-twoBtns">
                                            <ul className="cat-gry">
                                                {
                                                    quickFilterCatId?
                                                        this.props.packagesList.categories.filter((x=>x.id==quickFilterCatId)).map((category, i) => {
                                                            return <li key={category.id} id={category.id} onClick={this.selectCategory.bind(this, category.id)}><a href="javascript:void(0);" className={this.state.catIds.indexOf(category.id) > -1 ? "selected" : ''}>{category.name}</a></li>
                                                        })
                                                        :''
                                                }
                                                {
                                                    this.props.packagesList.categories.filter((x=>x.id!=quickFilterCatId)).map((category, i) => {
                                                        return <li key={category.id} id={category.id} onClick={this.selectCategory.bind(this, category.id)}><a href="javascript:void(0);" className={this.state.catIds.indexOf(category.id) > -1 ? "selected" : ''}>{category.name}</a></li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div> : ''
                            }
                        </div>
                        <div className="pop-foot-btns-cont">
                            <button className="add-shpng-cart-btn" onClick={this.handleClose.bind(this, true)}>Reset</button>
                            <button className="v-btn-primary book-btn-mrgn-adjust" onClick={this.applyFilters.bind(this)}>Apply Filter</button>
                        </div>
                    </div>
                </div> : ""
                }
            <div className="filter-row sticky-header mbl-stick" style={{top:'55px'}}>
                <div className="">

                    {this.props.forOrganicSearch ?
                        <div className="col-12 mrng-top-12 d-none d-md-block"><ul className="mrb-10 breadcrumb-list" style={{ 'wordBreak': 'breakWord' }}><li className="breadcrumb-list-item"><a href="/"><span className="fw-500 breadcrumb-title breadcrumb-colored-title">Home</span></a></li><span className="breadcrumb-arrow">&gt;</span><li className="breadcrumb-list-item"><span className="fw-500 breadcrumb-title">Full Body Checkup Packages</span></li></ul></div>
                        : ''}
                    <section className="scroll-shadow-bar">
                        {
                            this.props.forTaxSaver ? ''
                                : <div className="filter-row sticky-header mbl-stick">
                                    <section className="scroll-shadow-bar">
                                        <div className="top-filter-tab-container" >
                                            <div className="top-filter-tabs-select " onClick={this.props.comparePackage.bind(this)}>
                                                <img src={!this.props.isCompared && (this.props.isCompare || this.props.compare_packages.length > 0) ? ASSETS_BASE_URL + "/images/packageCompare/compare-orange.png" : ASSETS_BASE_URL + "/images/packageCompare/compare.png"} alt="" style={{ width: 16 }} /> <span className={`${!this.props.isCompared && (this.props.isCompare || (this.props.compare_packages && this.props.compare_packages.length > 0)) ? 'comapre-active' : ''}`}>Compare Packages</span>
                                            </div>
                                            <div className="top-filter-tabs-select " onClick={this.sortFilterClicked.bind(this)}>
                                                <div className="p-relative">
                                                    <img style={{ width: '14px' }} src={ASSETS_BASE_URL + "/img/filtersort.png"} />
                                                    {
                                                        this.isDataFiltered() ?
                                                            <p className="filterNotification">{this.isDataFiltered()}</p>
                                                            : ''
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
                    this.state.openFilter && false ? <div onClick={this.sortFilterClicked.bind(this)} className="filter-overlay overlay black cancel-overlay-zindex">
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
            </React.Fragment>
        );
    }
}


export default TopBar
