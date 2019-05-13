import React from 'react';
import { connect } from 'react-redux';
import Range from 'rc-slider/lib/Range';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SnackBar from 'node-snackbar'
import LocationElements from '../../../../containers/commons/locationElements'
import LocationPopup from '../../../../containers/commons/locationPopup'
import GTM from '../../../../helpers/gtm'
import STORAGE from '../../../../helpers/storage'

class TopBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            is_insured: props.filterCriteria && props.filterCriteria.is_insured ? props.filterCriteria.is_insured : false,
            dropdown_visible: false,
            hospital_id: props.filterCriteria && props.filterCriteria.hospital_id ? props.filterCriteria.hospital_id : '',
            //New filters
            previous_filters: {},
            sort_on: '',
            sort_order: '',
            avg_ratings: '',
            availability: [],
            gender: '',
            sits_at_clinic: false,
            sits_at_hospital: false,
            specialization: [],
            shortURL: "",
            showLocationPopup: false,
            overlayVisible: false,
            //showPopupContainer: true
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ ...props.filterCriteria })
        if (props.locationType && !props.locationType.includes("geo")) {
            this.setState({ showLocationPopup: false })
        } else {
            if ((props.seoData && props.seoData.location) || props.seoFriendly) {
                this.setState({ showLocationPopup: false })
            } else {
                if (props.selectedLocation != this.props.selectedLocation) {
                    this.setState({ showLocationPopup: true, overlayVisible: true })
                }
            }
        }
        // this.shortenUrl()
    }

    componentDidMount() {
        this.setState({ ...this.props.filterCriteria })
        // this.shortenUrl()
        if ((this.props.seoData && this.props.seoData.location) || this.props.seoFriendly) {
            this.setState({ showLocationPopup: false })
        } else {
            if (this.props.locationType && this.props.locationType.includes("geo")) {
                this.setState({ showLocationPopup: true, overlayVisible: true })
            }
        }
    }

    applyFilters() {
        let filterState = {
            sort_on: this.state.sort_on,
            sort_order: this.state.sort_order,
            gender: this.state.gender,
            availability: this.state.availability,
            avg_ratings: this.state.avg_ratings,
            sits_at_clinic: this.state.sits_at_clinic,
            sits_at_hospital: this.state.sits_at_hospital,
            is_insured: this.state.is_insured,
            hospital_id: this.state.hospital_id
        }
        let data = {
            'Category': 'FilterClick', 'Action': 'Clicked on Filter', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'opd-filter-clicked', 'url': window.location.pathname, 'availability': this.state.availability, 'sits_at_clinic': this.state.sits_at_clinic, 'sits_at_hospital': this.state.sits_at_hospital, 'gender': this.state.gender, 'sort_order': this.state.sort_order || '', 'sort_on': this.state.sort_on||'', 'rating': this.state.avg_ratings
        }
        GTM.sendEvent({ data: data })

        let ifAnyFilterApplied = this.isDataFiltered({}, true)
        if(ifAnyFilterApplied) {
            this.props.applyFilters(filterState)    
        }
        
        this.setState({ dropdown_visible: false })
    }

    handleClose(reset=false, e) {

        if(reset) {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'ResetOpdFilter', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'reset-opd-filter', 'url': window.location.pathname, 'availability': this.state.availability, 'sits_at_clinic': this.state.sits_at_clinic, 'sits_at_hospital': this.state.sits_at_hospital, 'gender': this.state.gender, 'sort_order': this.state.sort_order || '', 'sort_on': this.state.sort_on||'', 'rating': this.state.avg_ratings
            }
            GTM.sendEvent({ data: data })
            let resetFilters = {
                sort_on: '',
                sort_order: '',
                avg_ratings: '',
                availability: [],
                gender: '',
                sits_at_clinic: false,
                sits_at_hospital: false,
                specialization: [],
                
            }
            this.setState({
              ...resetFilters
            })

        } else{
            let data = {
                'Category': 'ConsumerApp', 'Action': 'CloseOpdFilter', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'close-opd-filter', 'url': window.location.pathname, 'availability': this.state.availability, 'sits_at_clinic': this.state.sits_at_clinic, 'sits_at_hospital': this.state.sits_at_hospital, 'gender': this.state.gender, 'sort_order': this.state.sort_order || '', 'sort_on': this.state.sort_on||'', 'rating': this.state.avg_ratings
            }
            GTM.sendEvent({ data: data })
            this.setState({
                dropdown_visible: false,
                ...this.state.previous_filters
            })
        }

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
        }else if(type.includes('sits_at_clinic') || type.includes('sits_at_hospital')){

                if(this.state[type]) {
                    this.setState({[type]: !this.state[type]})
                }else {
                    this.setState({'sits_at_clinic': type.includes('sits_at_clinic')?value:!value, 'sits_at_hospital': type.includes('sits_at_hospital')?value:!value})
                }
        }else{
            this.setState({ [type]: this.state[type]==value?'':value })
        }
        
    }

    sortFilterClicked() {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'OpdSortFilterClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'opd-sort-filter-clicked', 'url': window.location.pathname, 'availability': this.state.availability, 'sits_at_clinic': this.state.sits_at_clinic, 'sits_at_hospital': this.state.sits_at_hospital, 'gender': this.state.gender, 'sort_order': this.state.sort_order || '', 'sort_on': this.state.sort_on||'', 'rating': this.state.avg_ratings
        }
        GTM.sendEvent({ data: data })

        let currentFilters = {
            sort_on: this.state.sort_on,
            sort_order: this.state.sort_order,
            avg_ratings: this.state.avg_ratings,
            availability: [].concat(this.state.availability),
            gender: this.state.gender,
            sits_at_clinic: this.state.sits_at_clinic,
            sits_at_hospital: this.state.sits_at_hospital,
            specialization: []
        }
        this.setState({ dropdown_visible: true, previous_filters: currentFilters })
    }

    isDataFiltered(filterData = {}, checkIfAnyFilterAppliled= false) {

        if (checkIfAnyFilterAppliled) {

            try {
                let filterCount = 0
                for (let filter in this.state.previous_filters) {

                    if (filter.includes('availability') || filter.includes('specialization')) {
                        
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
                availability: [],
                gender: '',
                hospital_type: ''
            }
        }
        try {
            let filterCount = 0
            for (let filter in filterData) {
                
                if(filter.includes('hospital_type')){
                    if(this.state['sits_at_clinic'] || this.state['sits_at_hospital']){
                        filterCount++
                    }
                } else if(filter.includes('availability')){
                    if(this.state[filter].length) {
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

    getCriteriaString(selectedCriterias) {
        if (selectedCriterias && selectedCriterias.length) {
            let selectedProcedureCategory = selectedCriterias.filter(x => x.type == 'procedures_category')
            let procedures = selectedCriterias.filter(x => x.type == 'procedures')

            return selectedCriterias.reduce((final, curr, i) => {
                if (i != 0) {
                    final += ', '
                }
                final += `${curr.name}`
                return final
            }, "")
        }
    }

    goToLocation() {
        this.setState({
            searchCities: []
        })
        let redirect_to = ""
        if (window.location.pathname.includes('sptcit') || window.location.pathname.includes('sptlitcit')) {
            redirect_to = "/opd/searchresults"
        }

        let location_url = '/locationsearch'
        if (redirect_to) {
            location_url += `?redirect_to=${redirect_to}`
        }
        this.props.setNextSearchCriteria()
        let data = {
            'Category': 'ChangeLocationDoctorResultsPopUp', 'Action': 'change-location-doctor-results-PopUp', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'change-location-doctor-results-PopUp', 'url': window.location.pathname
        }
        GTM.sendEvent({ data: data })
        this.props.history.push(location_url)
    }

    overlayClick() {
        this.setState({ overlayVisible: false, searchCities: [], showLocationPopup: false });
        if (document.getElementById('location_element')) {
            document.getElementById('location_element').style.zIndex = '0'
        }
    }

    hideLocationPopup() {
        this.setState({ showLocationPopup: false });
    }

    popupContainer() {
        this.setState({ showPopupContainer: false, showLocationPopup: false });
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

    toggleInsured() {
        let data = {
            'Category': 'CoveredUnderOPDInsuranceClicked', 'Action': 'CoveredUnderLABInsuranceClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'covered-under-opd-insurance-clicked', 'url': window.location.pathname
        }
        GTM.sendEvent({ data: data })

        this.setState({ is_insured: !this.state.is_insured }, () => {

            let filterState = {
                is_insured: this.state.is_insured,
                hospital_id: this.state.hospital_id,
                sort_order: this.state.sort_order,
                sort_on: this.state.sort_on,
                avg_ratings: this.state.avg_ratings,
                availability: this.state.availability,
                gender: this.state.gender,
                sits_at_clinic: this.state.sits_at_clinic,
                sits_at_hospital: this.state.sits_at_hospital,
                specialization: []
            }
            this.props.applyFilters(filterState)
        })
    }

    render() {

        let ipd_ids = this.props.commonSelectedCriterias.filter(x => x.type == 'ipd').map(x => x.id)
        let criteriaStr = this.getCriteriaString(this.props.commonSelectedCriterias)

        let locationName = ""
        if (this.props.selectedLocation && this.props.selectedLocation.formatted_address) {
            locationName = this.props.selectedLocation.formatted_address
        }
        if (this.props.seoData && this.props.seoData.location) {
            locationName = this.props.seoData.location
        }

        return (
            <div>
                {
                    this.state.dropdown_visible ?
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
                                            <div className={`sort-cards-list ${this.state.sort_on=='fees' && this.state.sort_order=='asc'?'chitActive':''}`} onClick={this.toggleAllFilters.bind(this, 'sort_on', 'price_asc', false)}>
                                                <div className="srt-lst-img">
                                                    {
                                                        this.state.sort_on=='fees' && this.state.sort_order=='asc'?
                                                        <img src={ASSETS_BASE_URL + "/img/popupicon/rv-pricesort.svg"} style={{ width: 18 }} />
                                                        :<img src={ASSETS_BASE_URL + "/img/popupicon/pricesort.svg"} style={{ width: 18 }} />
                                                    }
                                                    
                                                </div>
                                                <p>Price Low to High</p>
                                            </div>
                                            <div className={`sort-cards-list ${this.state.sort_on=='fees' && this.state.sort_order=='desc'?'chitActive':''}`} onClick={this.toggleAllFilters.bind(this, 'sort_on', 'price_desc', false)}>
                                                <div className="srt-lst-img">
                                                    {
                                                        this.state.sort_on=='fees' && this.state.sort_order=='desc'?
                                                        <img src={ASSETS_BASE_URL + "/img/popupicon/rv-priceup.svg"} style={{ width: 18 }} />
                                                        :<img src={ASSETS_BASE_URL + "/img/popupicon/priceup.svg"} style={{ width: 18 }} />
                                                    }
                                                </div>
                                                <p>Price High to Low</p>
                                            </div>
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
                                            <div className={`sort-cards-list ${this.state.sort_on=='experience'?'chitActive':''}`} onClick={this.toggleAllFilters.bind(this, 'sort_on', 'experience', false)}>
                                                <div className="srt-lst-img">
                                                    {
                                                        this.state.sort_on=='experience'?
                                                        <img src={ASSETS_BASE_URL + "/img/popupicon/rv-expr.svg"} style={{ width: 18 }} />
                                                        :<img src={ASSETS_BASE_URL + "/img/popupicon/expr.svg"} style={{ width: 18 }} />
                                                    }
                                                </div>
                                                <p>Experience</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sorting-btns-cont">
                                        <h5 className="sort-headings">Ratings</h5>
                                        <div className="sortbtncard">
                                            <button className={`sortBtns ${this.state.avg_ratings =='3'? 'srtBtnAct' : ''}`} onClick={this.toggleAllFilters.bind(this, 'avg_ratings', '3', false)}>
                                                
                                                {
                                                    this.state.avg_ratings=='3' ?
                                                    <img className="srt-star-img" src={ASSETS_BASE_URL + "/img/popupicon/rv-btn-star.svg"} />
                                                    :<img className="srt-star-img" src={ASSETS_BASE_URL + "/img/customer-icons/selected-star.svg"} />
                                                }
                                                   3.0 +</button>
                                            <button className={`sortBtns ${this.state.avg_ratings =='4'? 'srtBtnAct' : ''}`} onClick={this.toggleAllFilters.bind(this, 'avg_ratings', '4', false)}>
                                                {
                                                    this.state.avg_ratings=='4'?
                                                    <img className="srt-star-img" src={ASSETS_BASE_URL + "/img/popupicon/rv-btn-star.svg"} />
                                                    :<img className="srt-star-img" src={ASSETS_BASE_URL + "/img/customer-icons/selected-star.svg"} /> 
                                                }
                                               4.0 +</button>
                                            <button className={`sortBtns ${this.state.avg_ratings =='4.5'? 'srtBtnAct' : ''}`} onClick={this.toggleAllFilters.bind(this, 'avg_ratings', '4.5', false)}>

                                                {
                                                    this.state.avg_ratings =='4.5'?
                                                    <img className="srt-star-img" src={ASSETS_BASE_URL + "/img/popupicon/rv-btn-star.svg"} />
                                                    :<img className="srt-star-img" src={ASSETS_BASE_URL + "/img/customer-icons/selected-star.svg"} />
                                                }
                                                   4.5 +</button>
                                        </div>
                                    </div>
                                    <div className="sorting-btns-cont">
                                        <h5 className="sort-headings">Availability</h5>
                                        <div className="sortbtncard">
                                            <button className={`sortBtns ${this.state.availability && this.state.availability.length && this.state.availability.indexOf('1') > -1 ? 'srtBtnAct' : ''}`} onClick={this.toggleAllFilters.bind(this, 'availability', '1', true)}>Today</button>
                                            <button className={`sortBtns ${this.state.availability && this.state.availability.length && this.state.availability.indexOf('2') > -1 ? 'srtBtnAct' : ''}`} onClick={this.toggleAllFilters.bind(this, 'availability', '2', true)}>Tomorrow</button>
                                            <button className={`sortBtns ${this.state.availability && this.state.availability.length && this.state.availability.indexOf('3') > -1 ? 'srtBtnAct' : ''}`} onClick={this.toggleAllFilters.bind(this, 'availability', '3', true)}>Next 3 Days</button>
                                        </div>
                                    </div>
                                    <div className="sorting-btns-cont">
                                        <h5 className="sort-headings">Gender</h5>
                                        <div className="sortbtncard justyfy-twoBtns">
                                            <button className={`sortBtns ${this.state.gender == 'm' ? 'srtBtnAct' : ''}`} onClick={this.toggleAllFilters.bind(this, 'gender', 'm', false)}>Male</button>
                                            <button className={`sortBtns ${this.state.gender == 'f' ? 'srtBtnAct' : ''}`} onClick={this.toggleAllFilters.bind(this, 'gender', 'f', false)}>Female</button>
                                        </div>
                                    </div>
                                    <div className="sorting-btns-cont">
                                        <h5 className="sort-headings">Visit Type</h5>
                                        <div className="sortbtncard justyfy-twoBtns">
                                            <button className={`sortBtns ${this.state.sits_at_clinic ? 'srtBtnAct' : ''}`} onClick={this.toggleAllFilters.bind(this, 'sits_at_clinic', !this.state.sits_at_clinic, false)}>Clinic</button>
                                            <button className={`sortBtns ${this.state.sits_at_hospital ? 'srtBtnAct' : ''}`} onClick={this.toggleAllFilters.bind(this, 'sits_at_hospital', !this.state.sits_at_hospital, false)}>Hospital</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="pop-foot-btns-cont">
                                    <button className="add-shpng-cart-btn" onClick={this.handleClose.bind(this, true)}>Reset</button>
                                    <button className="v-btn-primary book-btn-mrgn-adjust" onClick={this.applyFilters.bind(this)}>Apply Filter</button>
                                </div>
                            </div>
                        </div> : ""
                }
                <div className="filter-row sticky-header mbl-stick">
                    <div className="filter-row sticky-header mbl-stick">
                        {this.props.breadcrumb && this.props.breadcrumb.length ?
                            <div className="col-12 mrng-top-12 d-none d-md-block">
                                <ul className="mrb-10 breadcrumb-list breadcrumb-list-ul" style={{ 'wordBreak': 'breakWord' }}>
                                    {
                                        this.props.breadcrumb && this.props.breadcrumb.length ?
                                            this.props.breadcrumb.map((data, key) => {
                                                return <li className="breadcrumb-list-item" key={key}>
                                                    {
                                                        key == this.props.breadcrumb.length - 1 ?
                                                            <span>{data.title}</span>
                                                            : <a href={data.url} title={data.link_title || data.title} onClick={(e) => {
                                                                e.preventDefault();
                                                                this.props.history.push((key == 0 || key == this.props.breadcrumb.length - 1) ? data.url : `/${data.url}`)
                                                            }}>{key == 0 || key == this.props.breadcrumb.length - 1 ? <span className="fw-500 breadcrumb-title breadcrumb-colored-title">{data.title}</span> : <h2 className="fw-500 breadcrumb-title breadcrumb-colored-title d-inline-blck">{data.title}</h2>}</a>
                                                    }
                                                    {
                                                        key != this.props.breadcrumb.length - 1 ?
                                                            <span className="breadcrumb-arrow">&gt;</span>
                                                            : ''
                                                    }
                                                </li>
                                            })
                                            : ''
                                    }
                                </ul>
                            </div>
                            : ''
                        }

                        <section className="scroll-shadow-bar">
                            <div className="top-filter-tab-container">
                                <div className="top-filter-tabs-select locationTestFilter" >
                                    <p className="newStickyfilter">
                                        {
                                            `${this.props.count} ${ipd_ids.length ? 'Specialists' : 'Results'} for ${criteriaStr || 'Doctor'}`
                                        }
                                        {
                                            locationName ?
                                                <span onClick={this.goToLocation.bind(this)} >{` in ${locationName}`}<img style={{ width: '11px', height: '15px', marginLeft: '7px' }} src={ASSETS_BASE_URL + "/img/customer-icons/edit.svg"} />
                                                </span>
                                                : ''
                                        }
                                    </p>
                                </div>
                                <div className="d-none d-md-inline-block">
                                    <ul className="inline-list">
                                        <li >
                                            <span style={{ cursor: 'pointer' }} onClick={this.shortenUrl.bind(this)}>
                                                <img src={ASSETS_BASE_URL + "/img/customer-icons/url-short.svg"} style={{ width: 80 }} />
                                            </span>
                                        </li>
                                        {
                                            this.state.shortURL ? <div className="shareLinkpopupOverlay" onClick={() => {
                                                this.setState({ shortURL: "" })
                                            }}>
                                                <div className="shareLinkpopup" onClick={(e) => {
                                                    e.stopPropagation()
                                                }}>
                                                    <p>{this.state.shortURL}</p>
                                                    <CopyToClipboard text={this.state.shortURL}
                                                        onCopy={() => {
                                                            SnackBar.show({ pos: 'bottom-center', text: "Shortened URL Copied." });
                                                            this.setState({ shortURL: "" })
                                                        }}>
                                                        <span className="shrelinkBtn">
                                                            <button>Copy</button>
                                                        </span>
                                                    </CopyToClipboard>
                                                </div>
                                            </div> : ""
                                        }
                                    </ul>
                                </div>
                                <div className="top-filter-tabs-select newSortFilterbar" onClick={this.sortFilterClicked.bind(this)}>
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
                    {
                        this.state.showLocationPopup ?
                            <LocationElements {...this.props} onRef={ref => (this.child = ref)} resultType='list' isTopbar={true} hideLocationPopup={() => this.hideLocationPopup()} locationName={locationName} />
                            : ''
                    }

                    {
                        this.state.showLocationPopup && this.state.overlayVisible && !this.props.clinic_card ?
                            <div className="locationPopup-overlay" onClick={() => this.overlayClick()} ></div>
                            : ''
                    }

                    {
                        this.state.showLocationPopup && this.props.clinic_card && this.state.showPopupContainer ?
                            <div className="popupContainer-overlay"></div>
                            : ''
                    }
                    {
                        STORAGE.checkAuth() && this.props.is_login_user_insured && this.props.insurance_status == 1
                            ? <div className="tg-list-item">
                                <input className="tgl tgl-ios" id="lab_insurance" type="checkbox" checked={this.state.is_insured} onChange={this.toggleInsured.bind(this)} />
                                <label className="tgl-btn" htmlFor="lab_insurance"></label>
                                <p>Covered under OPD insurance | <a href="https://qacdn.docprime.com/media/insurer/documents/Group_Out-Patient_CIS_JNLVJju.PDF" target="_blank"><span> Know More</span></a></p>
                            </div>
                            : ''
                    }
                </div>
            </div>
        );
    }
}


export default TopBar
