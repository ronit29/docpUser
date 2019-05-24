import React from 'react';
import { connect } from 'react-redux';
import Range from 'rc-slider/lib/Range';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SnackBar from 'node-snackbar'
import LocationElements from '../../../../containers/commons/locationElements'
import LocationPopup from '../../../../containers/commons/locationPopup'
import GTM from '../../../../helpers/gtm'
import IpdLeadForm from '../../../../containers/ipd/ipdLeadForm.js'
const queryString = require('query-string')

class TopBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // anchorEl: null,
            // openFilter: false,
            // priceRange: [0, 3000],
            // distanceRange: [0, 15],
            // sort_on: null,
            // sits_at_clinic: false,
            // sits_at_hospital: false,
            // is_female: false,
            // is_available: false,
            shortURL: "",
            // dropdown_visible: false,
            showLocationPopup: false,
            overlayVisible: false,
            showPopupContainer: true,
            showIpdLeadForm: true
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
                    this.setState({ showLocationPopup: true, overlayVisible: true, showIpdLeadForm: false })
                }
            }
        }
        // this.shortenUrl()
    }

    componentDidMount() {
        this.setState({ ...this.props.filterCriteria })
        // this.shortenUrl()
        if ((this.props.seoData && this.props.seoData.location) || this.props.seoFriendly) {
            this.setState({ showLocationPopup: false, showIpdLeadForm: true })
        } else {
            if (this.props.locationType && this.props.locationType.includes("geo")) {
                this.setState({ showLocationPopup: true, overlayVisible: true, showIpdLeadForm: false })
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

    // applyFilters() {
    //     let filterState = {
    //         priceRange: this.state.priceRange,
    //         distanceRange: this.state.distanceRange,
    //         sits_at: this.state.sits_at,
    //         sort_on: this.state.sort_on,
    //         is_female: this.state.is_female,
    //         is_available: this.state.is_available,
    //         sits_at_clinic: this.state.sits_at_clinic,
    //         sits_at_hospital: this.state.sits_at_hospital
    //     }
    //     let data = {
    //         'Category': 'FilterClick', 'Action': 'Clicked on Filter', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'opd-filter-clicked', 'url': window.location.pathname, 'available_today': this.state.is_available, 'sits_at_clinic': this.state.sits_at_clinic, 'sits_at_hospital': this.state.sits_at_hospital, 'lowPriceRange': this.state.priceRange[0], 'highPriceRange': this.state.priceRange[1], 'lowDistanceRange': this.state.distanceRange[0], 'highDistanceRange': this.state.distanceRange[1], 'is_female': this.state.is_female, 'sort_on': this.state.sort_on == "" ? 'relevance' : this.state.sort_on
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
    //     let data = {
    //         'Category': 'ConsumerApp', 'Action': 'OpdSortFilterApplied', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'opd-sort-filter-applied', 'url': window.location.pathname, 'sort_on': type === "" ? 'relevance' : type
    //     }
    //     GTM.sendEvent({ data: data })
    //     this.setState({ anchorEl: null, sort_on: type, dropdown_visible: false }, () => {
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

    // isFilterApplied() {
    //     const def = {
    //         priceRange: [0, 3000],
    //         distanceRange: [0, 15],
    //         sits_at_clinic: false,
    //         sits_at_hospital: false,
    //         is_female: false,
    //         is_available: false
    //     }
    //     try {
    //         for (let filter in def) {
    //             if (filter == 'priceRange' || filter == 'distanceRange') {
    //                 if (def[filter][0] != this.state[filter][0] || def[filter][1] != this.state[filter][1]) {
    //                     return true
    //                 }
    //             } else {
    //                 if (def[filter] != this.state[filter]) {
    //                     return true
    //                 }
    //             }
    //         }
    //         return false
    //     } catch (e) {
    //         return false
    //     }
    // }

    shortenUrl() {
        if (window) {
            let url = window.location.href
            if (url.includes('?')) {
                url = window.location.href + '&force_location=true'
            } else {
                url = window.location.href + '?force_location=true'
            }
            this.props.urlShortner(url, (err, data) => {
                if (!err) {
                    this.setState({ shortURL: data.tiny_url })
                }
            })
        }
    }

    overlayClick() {
        this.setState({ overlayVisible: false, searchCities: [], showIpdLeadForm: true });
        if (document.getElementById('location_element')) {
            document.getElementById('location_element').style.zIndex = '0'
        }
    }

    hideLocationPopup() {
        this.setState({ showLocationPopup: false, showIpdLeadForm: true });
    }

    popupContainer() {
        this.setState({ showPopupContainer: false, showLocationPopup: false, showIpdLeadForm: true });
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

    submitLeadFormGeneration(close=false) {
        if(close) {
            let gtmData = {
                'Category': 'ConsumerApp', 'Action': 'DoctorSearchIpdFormClosed', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-search-ipd-form-closed'
            }
            GTM.sendEvent({ data: gtmData })
        }
        this.setState({showIpdLeadForm: false})
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

        const parsed = queryString.parse(this.props.location.search)
        let specializations = this.props.commonSelectedCriterias.filter(x => x.type == 'speciality')

        let ipd_ids = this.props.commonSelectedCriterias.filter(x => x.type == 'ipd').map(x => x.id)

        return (
            <div>
                <div className="container-fluid" id="filter-scroll">
                    <div className="row">
                        <div className="col-12">
                            <div className="filter-pdng">
                                <div className="action-filter d-none d-md-block alignShareBtn">
                                    <ul className="inline-list">
                                        <li className="d-none d-md-inline-block">
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
                                <div className="filter-title">
                                    {this.props.count} results found for {ipd_ids.length ? 'Best' : ''} 
                                    <h1 className="search-result-heading">
                                        <span className="fw-700"> {criteriaStr || "Doctors"} {ipd_ids.length && criteriaStr? 'Doctors' : ''}</span>
                                        <span className="search-result-span">
                                            {
                                                this.state.showLocationPopup && false ? ''
                                                    : locationName ? <span className="location-edit">{` in ${locationName}`}</span> : ''
                                            }
                                        </span>
                                    </h1>
                                    <img style={{ width: 15, height: 15, marginLeft: 7, cursor: 'pointer' }} src={ASSETS_BASE_URL + "/img/customer-icons/edit.svg"} onClick={
                                        this.goToLocation.bind(this)} />
                                </div>
                            </div>
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

                    {
                        specializations && specializations.length && parsed.hospital_id && parsed.showPopup && this.state.showIpdLeadForm && typeof window == 'object' && window.ON_LANDING_PAGE?
                        <IpdLeadForm submitLeadFormGeneration={this.submitLeadFormGeneration.bind(this)} {...this.props} hospital_id={parsed.hospital_id} formSource='doctorResultPage'/>
                        :''
                    }
                </div>
            </div>
        );
    }
}


export default TopBar
