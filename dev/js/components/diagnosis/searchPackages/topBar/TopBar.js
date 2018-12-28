import React from 'react';
import { connect } from 'react-redux';
import Range from 'rc-slider/lib/Range';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SnackBar from 'node-snackbar'
import LocationElements from '../../../../containers/commons/locationElements'
import LocationPopup from '../../../../containers/commons/locationPopup'
import GTM from '../../../../helpers/gtm'

class TopBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            openFilter: false,
            priceRange: [0, 20000],
            distanceRange: [0, 15],
            sort_on: null,
            shortURL: "",
            dropdown_visible: false,
            showLocationPopup: false,
            overlayVisible: false,
            showPopupContainer: true,
            sortText: 'Relevance',
            openCategory: false,
            selectedCatIds:[],
            selectedAllCatIds:[],
            selectedCatIdsLeng:'',
            isSelectAll:'',
            is_applied:true
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ ...props.filterCriteria })
        if (props.locationType && !props.locationType.includes("geo")) {
            this.setState({ showLocationPopup: false })
        } else {
            if (props.seoData && props.seoData.location) {
                this.setState({ showLocationPopup: false })
            } else {
                if (props.selectedLocation != this.props.selectedLocation) {
                    this.setState({ showLocationPopup: true, overlayVisible: true })
                }
            }
        }
        this.shortenUrl()
    }

    componentDidMount() {
        this.setState({ ...this.props.filterCriteria })
        this.shortenUrl()
        if (this.props.seoData && this.props.seoData.location) {
            this.setState({ showLocationPopup: false })
        } else {
            if (this.props.locationType.includes("geo")) {
                this.setState({ showLocationPopup: true, overlayVisible: true })
            }
        }
    }

    applyFilters() {
        let filterState = {
            priceRange: this.state.priceRange,
            distanceRange: this.state.distanceRange,
            sort_on: this.state.sort_on
        }
        let data = {
            'Category': 'FilterClick', 'Action': 'Clicked on Filter', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-filter-clicked', 'url': window.location.pathname, 'lowPriceRange': this.state.priceRange[0], 'highPriceRange': this.state.priceRange[1], 'lowDistanceRange': this.state.distanceRange[0], 'highDistanceRange': this.state.distanceRange[1], 'sort_on': this.state.sort_on == "" ? 'relevance' : this.state.sort_on
        }
        GTM.sendEvent({ data: data })
        this.props.applyFilters(filterState)
        this.setState({ openFilter: false })
    }

    handleOpen(event) {
        // this.setState({ anchorEl: event.currentTarget })
        this.setState({
            dropdown_visible: true
        });
    }

    hideSortDiv() {
        this.setState({
            dropdown_visible: false
        });
    }

    handleClose(type) {
        this.setState({ anchorEl: null, sort_on: type }, () => {
            if (type || type === "") {
                this.applyFilters()
            }
        })
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

    getCriteriaString(selectedCriterias) {
        if (selectedCriterias && selectedCriterias.length) {
            return selectedCriterias.reduce((final, curr, i) => {
                if (i != 0) {
                    final += ', '
                }
                final += `${curr.name}`
                return final
            }, "")
        }
    }

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

    shortenUrl() {
        if (window) {
            let url = window.location.href + '&force_location=true'
            this.props.urlShortner(url, (err, data) => {
                if (!err) {
                    this.setState({ shortURL: data.tiny_url })
                }
            })
        }
    }

    overlayClick() {
        this.setState({ overlayVisible: false, searchCities: [] });
    }

    hideLocationPopup() {
        this.setState({ showLocationPopup: false });
    }

    popupContainer() {
        this.setState({ showPopupContainer: false, showLocationPopup: false });
    }
    toggleCategory(event) {
        this.toggleTest()
        this.setState({
            openCategory: !this.state.openCategory
        })
    }
    toggleTest(category) {
        let selectedCategoryIds = this.state.selectedCatIds
        if(category){
            if(selectedCategoryIds.indexOf(category)>-1){
                selectedCategoryIds = selectedCategoryIds.filter(x=>x!=category)  
            }else{
                selectedCategoryIds.push(category)    
            }
            this.setState({isSelectAll:false})
        }else{
            if(this.state.is_applied){
            this.props.packagesList.categories.map((categories, i) => {
                if(categories.is_selected){
                selectedCategoryIds.push(categories.id)
                }
                this.setState({selectedAllCatIds:selectedCategoryIds,isSelectAll:true})
            })
            }
        }
        this.setState({selectedCatIds: selectedCategoryIds,selectedCatIdsLeng:selectedCategoryIds.length})
    }
    closeCategory() {
        this.setState({
            openCategory: !this.state.openCategory
        })
    }
    applyCategories() {
        let categoryState = this.state.selectedCatIds
        this.props.applyCategories(categoryState)
        this.setState({ openCategory: false,is_applied:false })
    }
    applyAllCategory(){
        let selectedCategoryIds = this.state.selectedCatIds
        if(this.state.isSelectAll){
            selectedCategoryIds = []
            this.setState({isSelectAll:false})
        }else{
            selectedCategoryIds = this.state.selectedAllCatIds
            this.setState({isSelectAll:true})
        }
        this.setState({selectedCatIds: selectedCategoryIds,selectedCatIdsLeng:selectedCategoryIds.length})
    }
    render() {
        var selectedTests = []
        if (this.props.selectedCriterias.length) {
            for (var i = 0; i < this.props.selectedCriterias.length; i++) {
                selectedTests.push(this.props.selectedCriterias[i].id);
            }
        }

        let sortType = ''
        if (this.state.sort_on) {
            sortType = this.state.sort_on.charAt(0).toUpperCase() + this.state.sort_on.slice(1);
        }

        let criteriaStr = this.getCriteriaString(this.props.selectedCriterias)
        let locationName = ""
        if (this.props.selectedLocation && this.props.selectedLocation.formatted_address) {
            locationName = this.props.selectedLocation.formatted_address
        }
        if (this.props.seoData && this.props.seoData.location) {
            locationName = this.props.seoData.location
        }

        return (
            <div>
                <section className="filter-row sticky-header mbl-stick">
                 <div className="top-filter-tab-container">
                    {/*<div className="top-filter-tabs-select"><img src={ASSETS_BASE_URL + "/img/sort.svg"} style={{ width: 18 }} />Sort</div>
                    <div className="top-filter-tabs-select"><img src={ASSETS_BASE_URL + "/img/filter.svg"} style={{ width: 18 }} />Filter</div>*/}
                    <div className="top-filter-tabs-select" onClick={this.toggleCategory.bind(this)}><img src={ASSETS_BASE_URL + "/img/categories.svg"} style={{ width: 18 }} />Select Package Category</div>
                </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                {
                                    this.props.lab_card ?
                                        <div style={{ padding: '10px 0px' }}>
                                            <div className="d-flex justify-content-between" style={{ alignItems: 'flex-start' }} >
                                                <div style={{ flex: 1 }}>
                                                    <p>{this.props.packagesList?this.props.packagesList.count:""} Results found for Health Packages
                                                        <span className="fw-700"> {criteriaStr}
                                                            {
                                                                locationName ? ` in ${locationName}` : ''
                                                            }
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="text-right" style={{ width: 65, cursor: 'pointer' }} onClick={() => this.props.history.push(`/locationsearch?lab_card=true&id=${selectedTests}`)}>
                                                    <p className="fw-500 text-primary" style={{ fontSize: 14 }} >Change</p>
                                                </div>
                                            </div>
                                            <div className="d-flex lc-filter-sort-div mrt-10">
                                                <div className="lc-filter-div d-flex" onClick={this.toggleFilter.bind(this)}>
                                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/lc-filter.svg"} style={{ width: 18 }} />
                                                    <p className="fw-500 text-primary" style={{ marginLeft: 4 }}>Filter</p>
                                                </div>
                                                <div className="lc-sort-div d-flex" onClick={this.handleOpen.bind(this)}>
                                                    <p className="fw-500 text-primary" style={{ marginRight: 4 }}>{this.state.sort_on === "" || !this.state.sort_on ? 'Relevance' : sortType}</p>
                                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/orange-down.svg"} style={{ width: 10 }} />
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className="filter-pdng">
                                            {/* <div className="action-filter">
                                                <ul className="inline-list">
                                                    <li className="d-none d-md-inline-block">
                                                        <CopyToClipboard text={this.state.shortURL}
                                                            onCopy={() => { SnackBar.show({ pos: 'bottom-center', text: "Shortened URL Copied." }); }}>
                                                            <span style={{ cursor: 'pointer' }}>
                                                                <img src={ASSETS_BASE_URL + "/img/customer-icons/url-short.svg"} style={{ width: 80 }} />
                                                            </span>
                                                        </CopyToClipboard>
                                                    </li>
                                                    <li style={{display:'none'}} onClick={this.handleOpen.bind(this)}><span className="ct-img ct-img-sm filter-icon text-right"><img src={ASSETS_BASE_URL + "/img/customer-icons/range.svg"} className="img-fluid" /></span></li>
                                                    <li style={{display:'none'}} onClick={this.toggleFilter.bind(this)}><span className="ct-img ct-img-sm filter-icon text-right applied-filter"><img src={ASSETS_BASE_URL + "/img/customer-icons/filter.svg"} className="img-fluid" /></span>
                                                        {
                                                            this.isFilterApplied.call(this) ? <span className="applied-filter-noti" /> : ""
                                                        }
                                                    </li>
                                                    <li className="cat-ico-text" onClick={this.toggleCategory.bind(this)}>
                                                     <img src={ASSETS_BASE_URL + "/img/customer-icons/categories.svg"} className="img-fluid" />
                                                    <span style={{marginTop:'1px'}} className="ct-img ct-img-sm filter-icon text-right applied-filter">Category
                                                    </span>
                                                        {
                                                            this.isFilterApplied.call(this) ? <span className="applied-filter-noti" /> : ""
                                                        }
                                                    </li>
                                                </ul>
                                            </div> */}
                                            <div className="filter-title">
                                                {this.props.packagesList?this.props.packagesList.count:''} Results found for Health Packages

                                                <span onClick={() => {
                                                    this.setState({
                                                        showLocationPopup: !this.state.showLocationPopup,
                                                        searchCities: [],
                                                        showPopupContainer: true
                                                    })
                                                }}>

                                                    {
                                                        this.state.showLocationPopup && false ? ''
                                                            : locationName ? <span className="location-edit" style={{ color: '#f6843a', cursor: 'pointer' }}>{` in ${locationName}`}</span> : ''
                                                    }
                                                    <img style={{ width: 15, height: 15, marginLeft: 7, cursor: 'pointer' }} src={ASSETS_BASE_URL + "/img/customer-icons/edit.svg"} />
                                                </span>
                                            </div>
                                        </div>
                                }
                                {
                                    this.state.dropdown_visible ?
                                        <div>
                                            <div className="sort-dropdown-overlay" onClick={this.hideSortDiv.bind(this)} ></div>
                                            <div className="sort-dropdown-div">
                                                <ul className="sort-dropdown-list">
                                                    <li className={`sort-dropdown-list-item  ${!!!this.state.sort_on ? 'sort-item-selected' : ''}`} onClick={this.handleClose.bind(this, "")}>Relevance</li>
                                                    <li className={`sort-dropdown-list-item ${this.state.sort_on == 'fees' ? 'sort-item-selected' : ''}`} onClick={this.handleClose.bind(this, 'fees')}>Fee</li>
                                                    <li className={`sort-dropdown-list-item ${this.state.sort_on == 'distance' ? 'sort-item-selected' : ''} `} onClick={this.handleClose.bind(this, 'distance')}>Distance</li>
                                                </ul>
                                            </div>
                                        </div> : ""
                                }
                            </div>
                        </div>
                        {
                            this.state.showLocationPopup ?
                                this.props.lab_card && this.state.showPopupContainer ?
                                    <LocationPopup {...this.props} onRef={ref => (this.child = ref)} resultType='list' isTopbar={true} hideLocationPopup={() => this.hideLocationPopup()} locationName={locationName} criteriaString={criteriaStr} popupContainer={() => this.popupContainer()} />
                                    : <LocationElements {...this.props} onRef={ref => (this.child = ref)} resultType='list' isTopbar={true} hideLocationPopup={() => this.hideLocationPopup()} locationName={locationName} />
                                : ''
                        }

                        {
                            this.state.showLocationPopup && this.state.overlayVisible && !this.props.lab_card ?
                                <div className="locationPopup-overlay" onClick={() => this.overlayClick()} ></div> : ''
                        }

                        {
                            this.state.showLocationPopup && this.props.lab_card && this.state.showPopupContainer ?
                                <div className="popupContainer-overlay"></div>
                                : ''
                        }

                    </div>

                </section>
                {/*{
                                    this.state.openFilter ? <div onClick={this.toggleFilter.bind(this)} className="filter-overlay overlay black">
                                        <div className="widget filter-popup" onClick={(e) => {
                                            e.stopPropagation()
                                            e.preventDefault()
                                        }}>
                                            <div className="widget-content">
                                                <div className="filterRow">
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
                                                <div className="filterRow">
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
                                            <div className="widget-footer pd-0">
                                                <button className="v-btn v-btn-primary btn-block btn-lg" onClick={this.applyFilters.bind(this)}>Apply</button>
                                            </div>
                                        </div>
                                    </div> : ""
                                }*/}
                {
                    this.state.openCategory ? <div>
                        <div className="cancel-overlay"></div>
                        <div className="widget cancel-appointment-div cancel-popup onscreen-scroll">    
                            <div className="pop-top-heading mb-0">
                                    Select categories   
                                    <span className="float-right" style={{cursor: 'pointer', marginRight: '10px'}} onClick={this.closeCategory.bind(this)}><img src={ASSETS_BASE_URL + "/img/customer-icons/rt-close.svg"} style={{ width: 18 }} /></span>                    
                            </div>
                            
                            <div className="terms-condition-div onscreen-scroll pt-0">
                             <div className="">
                                <div className="ins-form-radio insradio-on-popup">
                                    <ul className="list all-test-list mrt-10">
                                    <li>
                                        <label className="ck-bx" style={{ fontWeight: 400, fontSize: 14 }}>
                                            SelectAll
                                            <input type="checkbox" checked={this.props.packagesList.categories_count == this.state.selectedCatIdsLeng} onChange={this.applyAllCategory.bind(this)} />
                                            <span className="checkmark" />
                                        </label>
                                    </li>
                                    {
                                    this.props.packagesList.categories.map((categories, i) => {
                                    return  <li key={i}>
                                                <label className="ck-bx" style={{ fontWeight: 400, fontSize: 14 }}>
                                                    {categories.name}
                                                    <input type="checkbox" checked={this.state.selectedCatIds.indexOf(categories.id) > -1} onChange={this.toggleTest.bind(this, categories.id)} />
                                                    <span className="checkmark" />
                                                </label>
                                            </li>
                                        })
                                    }
                                    </ul>
                                </div>
                            </div>
                            </div>
                            <div className="procedures-btn-pop">
                                <button onClick={this.applyCategories.bind(this)}>Apply</button>
                            </div>
                        </div>
                    </div> : ""
                }
            </div>
        );
    }
}


export default TopBar
