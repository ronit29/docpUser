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
            priceRange: [0, 1500],
            distanceRange: [0, 15],
            sort_on: null,
            sits_at_clinic: false,
            sits_at_hospital: false,
            is_female: false,
            is_available: false,
            shortURL: "",
            dropdown_visible: false,
            showLocationPopup: false,
            overlayVisible: false,
            showPopupContainer: true
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
        this.shortenUrl()
    }

    componentDidMount() {
        this.setState({ ...this.props.filterCriteria })
        this.shortenUrl()
        if ((this.props.seoData && this.props.seoData.location) || this.props.seoFriendly) {
            this.setState({ showLocationPopup: false })
        } else {
            if (this.props.locationType && this.props.locationType.includes("geo")) {
                this.setState({ showLocationPopup: true, overlayVisible: true })
            }
        }
    }

    handleInput(e) {
        let evName = e.target.name
        let checked = e.target.checked
        setTimeout(() => {
            this.setState({
                [evName]: checked
            })
        })
    }

    applyFilters() {
        let filterState = {
            priceRange: this.state.priceRange,
            distanceRange: this.state.distanceRange,
            sits_at: this.state.sits_at,
            sort_on: this.state.sort_on,
            is_female: this.state.is_female,
            is_available: this.state.is_available,
            sits_at_clinic: this.state.sits_at_clinic,
            sits_at_hospital: this.state.sits_at_hospital
        }
        let data = {
            'Category': 'FilterClick', 'Action': 'Clicked on Filter', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'opd-filter-clicked', 'url': window.location.pathname, 'available_today': this.state.is_available, 'sits_at_clinic': this.state.sits_at_clinic, 'sits_at_hospital': this.state.sits_at_hospital, 'lowPriceRange': this.state.priceRange[0], 'highPriceRange': this.state.priceRange[1], 'lowDistanceRange': this.state.distanceRange[0], 'highDistanceRange': this.state.distanceRange[1], 'is_female': this.state.is_female, 'sort_on': this.state.sort_on == "" ? 'relevance' : this.state.sort_on
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
        let data = {
            'Category': 'ConsumerApp', 'Action': 'OpdSortFilterApplied', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'opd-sort-filter-applied', 'url': window.location.pathname, 'sort_on': type === "" ? 'relevance' : type
        }
        GTM.sendEvent({ data: data })
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

    isFilterApplied() {
        const def = {
            priceRange: [0, 1500],
            distanceRange: [0, 15],
            sits_at_clinic: false,
            sits_at_hospital: false,
            is_female: false,
            is_available: false
        }
        try {
            for (let filter in def) {
                if (filter == 'priceRange' || filter == 'distanceRange') {
                    if (def[filter][0] != this.state[filter][0] || def[filter][1] != this.state[filter][1]) {
                        return true
                    }
                } else {
                    if (def[filter] != this.state[filter]) {
                        return true
                    }
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

    render() {

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
            {this.props.breadcrumb && this.props.breadcrumb.length?
                <div className="col-12 mrng-top-12 d-none d-md-block">
                    <ul className="mrb-10 breadcrumb-list breadcrumb-list-ul" style={{'wordBreak': 'breakWord'}}>
                        {
                            this.props.breadcrumb && this.props.breadcrumb.length?
                            this.props.breadcrumb.map((data, key) => {
                              return  <li className="breadcrumb-list-item" key={key}>
                                {
                                    key==this.props.breadcrumb.length-1?
                                    <span>{data.title}</span>
                                    :<a href={data.url} title ='' onClick={(e) => {e.preventDefault();
                                            this.props.history.push(data.url)
                                        }}>{key== 0 || key== this.props.breadcrumb.length-1?<span className="fw-500 breadcrumb-title breadcrumb-colored-title">{data.title}</span>:<h2 className="fw-500 breadcrumb-title breadcrumb-colored-title d-inline-blck">{data.title}</h2>}</a>
                                }   
                                {
                                    key!= this.props.breadcrumb.length-1?
                                    <span className="breadcrumb-arrow">&gt;</span>
                                    :''
                                }
                                </li>
                            })
                            :''
                        }
                    </ul>
                </div>
                :''
            }
                
                <section className="filter-row sticky-header mbl-stick">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="filter-pdng">
                                    <div className="action-filter">
                                        <ul className="inline-list">
                                            <li className="d-none d-md-inline-block">
                                                <CopyToClipboard text={this.state.shortURL}
                                                    onCopy={() => { SnackBar.show({ pos: 'bottom-center', text: "Shortened URL Copied." }); }}>
                                                    <span style={{ cursor: 'pointer' }}>
                                                        <img src={ASSETS_BASE_URL + "/img/customer-icons/url-short.svg"} style={{ width: 80 }} />
                                                    </span>
                                                </CopyToClipboard>
                                            </li>
                                            <li onClick={this.handleOpen.bind(this)}><span className="ct-img ct-img-sm filter-icon text-right"><img src={ASSETS_BASE_URL + "/img/customer-icons/range.svg"} className="img-fluid" /></span></li>
                                            <li onClick={this.toggleFilter.bind(this)}><span className="ct-img ct-img-sm filter-icon text-right applied-filter"><img src={ASSETS_BASE_URL + "/img/customer-icons/filter.svg"} className="img-fluid" /></span>
                                                {
                                                    this.isFilterApplied.call(this) ? <span className="applied-filter-noti" /> : ""
                                                }
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="filter-title">
                                        {this.props.count} Results found {criteriaStr ? "for" : ""}
                                        <h1 className="search-result-heading">
                                            <span className="fw-700"> {criteriaStr} </span>
                                            <span className="search-result-span" onClick={() => {
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
                                            </span>
                                        </h1>
                                        <img style={{ width: 15, height: 15, marginLeft: 7, cursor: 'pointer' }} src={ASSETS_BASE_URL + "/img/customer-icons/edit.svg"} onClick={() => {
                                            this.setState({
                                                showLocationPopup: !this.state.showLocationPopup,
                                                searchCities: [],
                                                showPopupContainer: true
                                            })
                                        }} />
                                    </div>
                                </div>
                                {
                                    this.state.dropdown_visible ?
                                        <div>
                                            <div className="sort-dropdown-overlay" onClick={this.hideSortDiv.bind(this)} ></div>
                                            <div className="sort-dropdown-div">
                                                <ul className="sort-dropdown-list">
                                                    <li className={`sort-dropdown-list-item  ${!!!this.state.sort_on ? 'sort-item-selected' : ''}`} onClick={this.handleClose.bind(this, "")}>Relevance</li>
                                                    <li className={`sort-dropdown-list-item ${this.state.sort_on == 'fees' ? 'sort-item-selected' : ''}`} onClick={this.handleClose.bind(this, 'fees')}>Fee</li>
                                                    <li className={`sort-dropdown-list-item ${this.state.sort_on == 'distance' ? 'sort-item-selected' : ''}`} onClick={this.handleClose.bind(this, 'distance')}>Distance</li>
                                                    <li className={`sort-dropdown-list-item ${this.state.sort_on == 'experience' ? 'sort-item-selected' : ''}`} onClick={this.handleClose.bind(this, 'experience')}>Experience</li>
                                                </ul>
                                            </div>
                                        </div> : ""
                                }
                            </div>
                        </div>
                        {
                            this.state.showLocationPopup ?
                                this.props.clinic_card && this.state.showPopupContainer ?
                                    <LocationPopup {...this.props} onRef={ref => (this.child = ref)} resultType='list' isTopbar={true} hideLocationPopup={() => this.hideLocationPopup()} locationName={locationName} criteriaString={criteriaStr} popupContainer={() => this.popupContainer()} />
                                    : <LocationElements {...this.props} onRef={ref => (this.child = ref)} resultType='list' isTopbar={true} hideLocationPopup={() => this.hideLocationPopup()} locationName={locationName} />
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

                    </div>

                </section>
                {
                    this.state.openFilter ? <div onClick={this.toggleFilter.bind(this)} className="filter-overlay overlay black">
                        <div className="widget filter-popup" onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                        }}>
                            <div className="widget-content">
                                <div className="filterRow filterRowShort">
                                    <span className="tl filterLabel">Available Today</span>
                                    <div className="filterInput">
                                        <input type="checkbox" name="is_available" checked={!!this.state.is_available} onChange={this.handleInput.bind(this)} className="opd-filter-hidden-checkbox" />
                                        <span className="opd-filter-checkbox"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="widget-content">
                                <div className="filterRow filterSitsAt">
                                    <span className="tl">Sits At</span>
                                    <div className="checkFilter">
                                        <input type="checkbox" name="sits_at_clinic" checked={!!this.state.sits_at_clinic} onChange={this.handleInput.bind(this)} className="opd-filter-hidden-checkbox" style={{ top: 39, left: 20 }} />
                                        <span className="opd-filter-checkbox" style={{ top: 39, left: 20 }}></span>
                                    </div>
                                    <span className="checkFilterLabel">Clinic</span>
                                    <div className="checkFilter">
                                        <input type="checkbox" name="sits_at_hospital" checked={!!this.state.sits_at_hospital} onChange={this.handleInput.bind(this)} className="opd-filter-hidden-checkbox" style={{ top: 39, left: 128 }} />
                                        <span className="opd-filter-checkbox" style={{ top: 39, left: 128 }}></span>
                                    </div>
                                    <span className="checkFilterLabel">Hospital</span>
                                </div>
                            </div>
                            <div className="widget-content">
                                <div className="filterRow">
                                    <span className="tl">Fees</span>
                                    <span className="tr">&#8377; {this.state.priceRange[0]} to {this.state.priceRange[1]}</span>
                                    <span className="bl">&#8377; 0</span>
                                    <span className="br">&#8377; 2000</span>

                                    <Range
                                        min={0}
                                        max={2000}
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
                            <div className="widget-content">
                                <div className="filterRow filterRowFemaleDoc">
                                    <span className="tl filterLabel">Female Doctor</span>
                                    <div className="filterInput">
                                        {/* <Checkbox name="is_female" checked={!!this.state.is_female} onChange={this.handleInput.bind(this)} className="checkFilter float-right filterInput" /> */}
                                        <input type="checkbox" name="is_female" checked={!!this.state.is_female} onChange={this.handleInput.bind(this)} className="opd-filter-hidden-checkbox" />
                                        <span className="opd-filter-checkbox"></span>
                                    </div>

                                </div>
                            </div>
                            <div className="widget-footer pd-0">
                                <button className="v-btn v-btn-primary btn-block btn-lg" onClick={this.applyFilters.bind(this)}>Apply</button>
                            </div>
                        </div>
                    </div> : ""
                }
            </div>
        );
    }
}


export default TopBar
