import React from 'react';
import { connect } from 'react-redux';
import Range from 'rc-slider/lib/Range';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SnackBar from 'node-snackbar'
import LocationElements from '../../../../containers/commons/locationElements'
import LocationPopup from '../../../../containers/commons/locationPopup'
import GTM from '../../../../helpers/gtm'
import CategoryPopup from './categoryPopup.js'


class ResultCount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // anchorEl: null,
            // openFilter: false,
            // priceRange: [0, 20000],
            // distanceRange: [0, 15],
            // sort_on: null,
            shortURL: "",
            // dropdown_visible: false,
            showLocationPopup: false,
            overlayVisible: false,
            showPopupContainer: true,
            // sortText: 'Relevance',
            // openCategory: false,
            // isCategoryApplied:false,
            // appliedCategoryCount:'',
            // initialSelectedCatIds:'',
            // max_age:'',
            // min_age:'',
            // packageType:'',
            // gender:'',
            // catIds:[],
            // test_ids:'',
            ssrFlag: false
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ ...props.filterCriteriaPackages })
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
        this.setState({ ...this.props.filterCriteriaPackages, ssrFlag: true })
        this.shortenUrl()
        if (this.props.seoData && this.props.seoData.location) {
            this.setState({ showLocationPopup: false })
        } else {
            if (this.props.locationType.includes("geo")) {
                this.setState({ showLocationPopup: true, overlayVisible: true })
            }
        }
        if(!this.props.forOrganicSearch){
            var url_string = window.location.href
            var url = new URL(url_string);
            var cat_ids = url.searchParams.get("category_ids")
            if(cat_ids != null){
                cat_ids = cat_ids.split(',')
                if(cat_ids.length > 0){
                    this.setState({
                        appliedCategoryCount:cat_ids.length,isCategoryApplied:true
                    })
                }
            }
        }
    }

    // applyFilters() {
    //     let filterState = {
    //         priceRange: this.state.priceRange,
    //         distanceRange: this.state.distanceRange,
    //         sort_on: this.state.sort_on,
    //         max_age: this.state.max_age,
    //         min_age: this.state.min_age,
    //         gender: this.state.gender,
    //         packageType: this.state.packageType,
    //         catIds:this.state.catIds,
    //         test_ids:this.state.test_ids
    //     }
    //     let data = {
    //         'Category': 'FilterClick', 'Action': 'Clicked on Filter', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-filter-clicked', 'url': window.location.pathname, 'lowPriceRange': this.state.priceRange[0], 'highPriceRange': this.state.priceRange[1], 'lowDistanceRange': this.state.distanceRange[0], 'highDistanceRange': this.state.distanceRange[1], 'sort_on': this.state.sort_on == "" ? 'relevance' : this.state.sort_on
    //     }
    //     GTM.sendEvent({ data: data })
    //     this.props.applyFilters(filterState)
    //     this.setState({ openFilter: false })
    // }

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

    // handleClose(type) {
    //     this.setState({ anchorEl: null, sort_on: type ,dropdown_visible:false}, () => {
    //         if (type || type === "") {
    //             this.applyFilters()
    //         }
    //     })
    // }

    // toggleFilter() {
    //     this.setState({
    //         openFilter: !this.state.openFilter
    //     })
    // }
    
    // handleRange(type, range) {
    //     this.setState({
    //         [type]: range
    //     })
    // }

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

    // isFilterApplied() {
    //     const def = {
    //         priceRange: [0, 20000],
    //         distanceRange: [0, 15]
    //     }
    //     try {
    //         for (let filter in def) {
    //             if (def[filter][0] != this.state[filter][0] || def[filter][1] != this.state[filter][1]) {
    //                 return true
    //             }
    //         }
    //         return false
    //     } catch (e) {
    //         return false
    //     }
    // }

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
        this.setState({ overlayVisible: false, searchCities: [], showLocationPopup: false });
        if(document.getElementById('location_element')){
            document.getElementById('location_element').style.zIndex ='0'
        }
    }

    hideLocationPopup() {
        this.setState({ showLocationPopup: false });
    }

    popupContainer() {
        this.setState({ showPopupContainer: false, showLocationPopup: false });
    }
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
    //         max_age:this.state.max_age,
    //         min_age: this.state.min_age,
    //         gender:this.state.gender,
    //         packageType: this.state.packageType,
    //         test_ids:this.state.test_ids
    //     }
    //     // let isCategory = false 
    //     // if(this.state.initialSelectedCatIds != categoryState.length){
    //     //     isCategory = true
    //     // }
    //     this.props.applyCategories(categoryState,filterState)
    //     // this.setState({ openCategory: false ,isCategoryApplied:isCategory,appliedCategoryCount:categoryState.length>0?categoryState.length:''})
    //     this.setState({ openCategory: false,catIds:categoryState.length})

    // }
    // initialSelectedCategory(selectedcategory){
    //     this.setState({initialSelectedCatIds:selectedcategory.length})
    // }

    goToLocation() {
        this.setState({
            searchCities: []
        })
        let location_url = '/locationsearch'
        let data = {
            'Category': 'ChangeLocationDoctorResultsPopUp', 'Action': 'change-location-doctor-results-PopUp', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'change-location-doctor-results-PopUp', 'url': window.location.pathname
        }
        GTM.sendEvent({ data: data })
        this.props.history.push(location_url)
    }

    render() {

        var selectedTests = []
        if (this.props.currentSearchedCriterias.length) {
            for (var i = 0; i < this.props.currentSearchedCriterias.length; i++) {
                selectedTests.push(this.props.currentSearchedCriterias[i].id);
            }
        }

        // let sortType = ''
        // if (this.state.sort_on) {
        //     sortType = this.state.sort_on.charAt(0).toUpperCase() + this.state.sort_on.slice(1);
        // }

        let criteriaStr = this.getCriteriaString(this.props.currentSearchedCriterias)
        let locationName = ""
        if (this.props.selectedLocation && this.props.selectedLocation.formatted_address) {
            locationName = this.props.selectedLocation.formatted_address
        }
        if (this.props.seoData && this.props.seoData.location) {
            locationName = this.props.seoData.location
        }
        return (
            <div>                
                <div className="container-fluid" id="filter-scroll">
                        <div className="row">
                            <div className="col-12">
                                {
                                    this.props.lab_card ?
                                        <div style={{ padding: '10px 0px' }}>
                                            <div className="d-flex justify-content-between" style={{ alignItems: 'flex-start' }} >
                                                <div style={{ flex: 1 }}>
                                                    <p>{this.props.packagesList?this.props.packagesList.count:""} Results for 
                                                        <h1 className="search-result-heading">
                                                        <span className="fw-700"> {this.props.forOrganicSearch?'Full Body Checkup Packages':this.props.forTaxSaver?'Health Packages':'selected categories'}</span>
                                                        </h1>
                                                        <span className="search-result-span"> {criteriaStr}
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
                                             <div className="action-filter d-none d-md-block alignShareBtn">
                                                <ul className="inline-list">
                                                    <li className="d-none d-md-inline-block">
                                                        <CopyToClipboard text={this.state.shortURL}
                                                            onCopy={() => { SnackBar.show({ pos: 'bottom-center', text: "Shortened URL Copied." }); }}>
                                                            <span style={{ cursor: 'pointer' }}>
                                                                <img src={ASSETS_BASE_URL + "/img/customer-icons/url-short.svg"} style={{ width: 80 }} />
                                                            </span>
                                                        </CopyToClipboard>
                                                    </li>
                                                    {/*<li style={{display:'none'}} onClick={this.handleOpen.bind(this)}><span className="ct-img ct-img-sm filter-icon text-right"><img src={ASSETS_BASE_URL + "/img/customer-icons/range.svg"} className="img-fluid" /></span></li>
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
                                                    </li>*/}
                                                </ul>
                                            </div> 
                                            <div className="filter-title">
                                            
                                                {this.props.packagesList?this.props.packagesList.count:''} Results found for 
                                                <h1 className="search-result-heading">
                                                <span className="fw-700"> {this.props.forOrganicSearch?'Full Body Checkup Packages':this.props.forTaxSaver?'Health Packages':'selected categories'}</span>
                                                </h1>
                                                <span className="search-result-span">
                                                    {
                                                        this.state.showLocationPopup && false ? ''
                                                            : locationName && this.state.ssrFlag ? <span className="location-edit">{` in ${locationName}`}</span> : ''
                                                    }
                                                    <img style={{ width: 15, height: 15, marginLeft: 7, cursor: 'pointer' }} src={ASSETS_BASE_URL + "/img/customer-icons/edit.svg"} onClick={this.goToLocation.bind(this)} />
                                                </span>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                        {
                            this.state.showLocationPopup ?
                                <LocationElements {...this.props} onRef={ref => (this.child = ref)} resultType='list' isTopbar={true} hideLocationPopup={() => this.hideLocationPopup()} locationName={locationName} />
                                :''
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
            </div>
        );
    }
}


export default ResultCount
