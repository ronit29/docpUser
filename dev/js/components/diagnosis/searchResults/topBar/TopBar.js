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
            sortText: 'Relevance'
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
                if ((props.seoData && props.seoData.location) || props.seoFriendly) {
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
        let data = {
            'Category': 'ConsumerApp', 'Action': 'LabSortFilterApplied', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-sort-filter-applied', 'url': window.location.pathname, 'sort_on': type === "" ? 'relevance' : type
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

    changeBtnClick() {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'changeBtnOnLabCardClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'change-btn-on-lab-card-click'
        }
        GTM.sendEvent({ data: data })
        let selectedTests = []
        if (this.props.currentSearchedCriterias.length) {
            for (var i = 0; i < this.props.currentSearchedCriterias.length; i++) {
                selectedTests.push(this.props.currentSearchedCriterias[i].id);
            }
        }
        this.props.history.push(`/locationsearch?lab_card=true&id=${selectedTests}`)
    }

    goToLocation() {
       this.setState({
            searchCities: [],
        })
        /*let redirect_to = ""
        if (window.location.pathname.includes('lbcit') || window.location.pathname.includes('lblitcit')) {
            redirect_to = "/lab/searchresults"
        }
*/
        let location_url = '/locationsearch'
/*        if (redirect_to) {
            location_url += `?redirect_to=${redirect_to}`
        }
*/
        let data = {
            'Category': 'ChangeLocationDoctorResultsPopUp', 'Action': 'change-location-doctor-results-PopUp', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'change-location-doctor-results-PopUp', 'url': window.location.pathname
        }
        GTM.sendEvent({ data: data })
        this.props.history.push(location_url)
 
    }

    render() {

        let sortType = ''
        if (this.state.sort_on) {
            sortType = this.state.sort_on.charAt(0).toUpperCase() + this.state.sort_on.slice(1);
        }

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
                <section className="filter-row sticky-header mbl-stick">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                {
                                    this.props.lab_card ?
                                        <div style={{ padding: '10px 0px' }}>
                                            <div className="d-flex justify-content-between" style={{ alignItems: 'flex-start' }} >
                                                <div style={{ flex: 1 }}>
                                                    <p>{this.props.count} Results found {criteriaStr ? "for" : ""}
                                                        <span className="fw-700"> {criteriaStr}
                                                            {
                                                                locationName ? ` in ${locationName}` : ''
                                                            }
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="text-right" style={{ width: 65, cursor: 'pointer' }} onClick={() => this.changeBtnClick()}>
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
                                                {this.props.count} Results found {criteriaStr ? "for" : ""} <span className="fw-700"> {criteriaStr}</span>

                                                <span onClick={this.goToLocation.bind(this)}>

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
                {
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
                }
            </div>
        );
    }
}


export default TopBar
