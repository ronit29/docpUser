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
            priceRange: [0, 3000],
            distanceRange: [0, 15],
            sort_on: null,
            sits_at_clinic: false,
            sits_at_hospital: false,
            is_female: false,
            is_available: false,
            // shortURL: "",
            dropdown_visible: false,
            // showLocationPopup: false,
            // overlayVisible: false,
            // showPopupContainer: true
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
        this.setState({ anchorEl: null, sort_on: type, dropdown_visible: false }, () => {
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

    // getCriteriaString(selectedCriterias) {
    //     if (selectedCriterias && selectedCriterias.length) {
    //         let selectedProcedureCategory = selectedCriterias.filter(x => x.type == 'procedures_category')
    //         let procedures = selectedCriterias.filter(x => x.type == 'procedures')

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
            priceRange: [0, 3000],
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

    // goToLocation() {
    //     this.setState({
    //         searchCities: []
    //     })
    //     let redirect_to = ""
    //     if (window.location.pathname.includes('sptcit') || window.location.pathname.includes('sptlitcit')) {
    //         redirect_to = "/opd/searchresults"
    //     }

    //     let location_url = '/locationsearch'
    //     if (redirect_to) {
    //         location_url += `?redirect_to=${redirect_to}`
    //     }
    //     this.props.setNextSearchCriteria()
    //     let data = {
    //         'Category': 'ChangeLocationDoctorResultsPopUp', 'Action': 'change-location-doctor-results-PopUp', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'change-location-doctor-results-PopUp', 'url': window.location.pathname
    //     }
    //     GTM.sendEvent({ data: data })
    //     this.props.history.push(location_url)
    // }

    render() {

        // let criteriaStr = this.getCriteriaString(this.props.commonSelectedCriterias)
        // let locationName = ""
        // if (this.props.selectedLocation && this.props.selectedLocation.formatted_address) {
        //     locationName = this.props.selectedLocation.formatted_address
        // }
        // if (this.props.seoData && this.props.seoData.location) {
        //     locationName = this.props.seoData.location
        // }

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

        return (
            <div className="filter-row sticky-header mbl-stick">
                {this.state.dropdown_visible ?
                    <div>
                        <div className="cancel-overlay cancel-overlay-zindex" onClick={this.hideSortDiv.bind(this)}>
                        </div>
                        <div className="widget cancel-appointment-div cancel-popup onscreen-scroll">
                            <div className="pop-top-heading">
                                Sort
                        </div>
                            <div className="col-12">
                                <div className="ins-form-radio insradio-on-popup">
                                    <ul>
                                        <li className={`drop-list-styling  ${!!!this.state.sort_on ? 'drop-icon-selecter' : ''}`} onClick={this.handleClose.bind(this, "")}> <img className="drop-icon-selecter-selected" src={ASSETS_BASE_URL + "/img/checks.svg"} style={{ width: 18 }} /><img src={ASSETS_BASE_URL + "/img/revel.svg"} style={{ width: 18, marginRight: '10px' }} />Relevance</li>
                                        <li className={`drop-list-styling ${this.state.sort_on == 'fees' ? 'drop-icon-selecter' : ''}`} onClick={this.handleClose.bind(this, 'fees')}><img className="drop-icon-selecter-selected" src={ASSETS_BASE_URL + "/img/checks.svg"} style={{ width: 18 }} /><img src={ASSETS_BASE_URL + "/img/sortRupee.svg"} style={{ width: 18, marginRight: '10px' }} />Fee</li>
                                        <li className={`drop-list-styling ${this.state.sort_on == 'distance' ? 'drop-icon-selecter' : ''} `} onClick={this.handleClose.bind(this, 'distance')}><img className="drop-icon-selecter-selected" src={ASSETS_BASE_URL + "/img/checks.svg"} style={{ width: 18 }} /><img src={ASSETS_BASE_URL + "/img/new-loc-ico.svg"} style={{ width: 11, marginRight: '10px' }} />Distance</li>
                                        <li className={`drop-list-styling ${this.state.sort_on == 'experience' ? 'drop-icon-selecter' : ''}`} onClick={this.handleClose.bind(this, 'experience')}><img className="drop-icon-selecter-selected" src={ASSETS_BASE_URL + "/img/checks.svg"} style={{ width: 18 }} /><img src={ASSETS_BASE_URL + "/img/expr.svg"} style={{ width: 16, marginRight: '10px' }} />Experience</li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div> : ""}
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
                                                    : <a href={data.url} title='' onClick={(e) => {
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
                        {/*<div className="top-filter-tabs-select" onClick={this.toggleCategory.bind(this)}><img src={ASSETS_BASE_URL + "/img/categories.svg"} style={{ width: 18 }} /> {this.state.catIds.length >0 ?'Category ('+this.state.catIds.length+')':'Category'}
                        </div>*/}
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
                                    <span className="br">&#8377; 3000</span>

                                    <Range
                                        min={0}
                                        max={3000}
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
