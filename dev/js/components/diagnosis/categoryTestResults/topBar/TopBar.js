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
            openFilter: false,
            priceRange: [0, 20000],
            distanceRange: [0, 15],
            sort_on: null,
            // shortURL: "",
            dropdown_visible: false,
            // showLocationPopup: false,
            // overlayVisible: false,
            // showPopupContainer: true,
            sortText: 'Relevance',
            is_insured: props.filterCriteria && props.filterCriteria.is_insured?props.filterCriteria.is_insured:false
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
            priceRange: this.state.priceRange,
            distanceRange: this.state.distanceRange,
            sort_on: this.state.sort_on,
            is_insured: this.state.is_insured
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

    // goToLocation() {
    //     this.setState({
    //         searchCities: [],
    //     })
    //     /*let redirect_to = ""
    //     if (window.location.pathname.includes('lbcit') || window.location.pathname.includes('lblitcit')) {
    //         redirect_to = "/lab/searchresults"
    //     }
    //     */
    //     let location_url = '/locationsearch'
    //             if (redirect_to) {
    //                 location_url += `?redirect_to=${redirect_to}`
    //             }

    //     let data = {
    //         'Category': 'ChangeLocationDoctorResultsPopUp', 'Action': 'change-location-doctor-results-PopUp', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'change-location-doctor-results-PopUp', 'url': window.location.pathname
    //     }
    //     GTM.sendEvent({ data: data })
    //     this.props.history.push(location_url)

    // }

    toggleInsured() {
        let data = {
            'Category': 'CoveredUnderLABInsuranceClicked', 'Action': 'CoveredUnderLABInsuranceClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'covered-under-lab-insurance-clicked', 'url': window.location.pathname
        }
        GTM.sendEvent({ data: data })

        this.setState({is_insured: !this.state.is_insured}, ()=>{

            let filterState = {
                priceRange: this.state.priceRange,
                distanceRange: this.state.distanceRange,
                sort_on: this.state.sort_on,
                is_insured: this.state.is_insured
            }
            this.props.applyFilters(filterState)    
        })
    }

    render() {
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
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div> : ""}
                <div className="filter-row sticky-header mbl-stick">
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
                    
                </div>
                {
                        this.state.openFilter ? <div onClick={this.toggleFilter.bind(this)} className="filter-overlay overlay black cancel-overlay-zindex">
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
        );
    }
}


export default TopBar
