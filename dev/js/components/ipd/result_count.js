import React from 'react';
import { connect } from 'react-redux';
import Range from 'rc-slider/lib/Range';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SnackBar from 'node-snackbar'
import LocationElements from '../../containers/commons/locationElements'
import LocationPopup from '../../containers/commons/locationPopup'
import GTM from '../../helpers/gtm'

class TopBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shortURL: "",
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


    getCriteriaString(selectedCriterias) {
        if (selectedCriterias && selectedCriterias.length) {
            let selectedProcedureCategory = selectedCriterias.filter(x => x.type == 'procedures_category')
            let procedures = selectedCriterias.filter(x => x.type == 'procedures')

            return selectedCriterias.reduce((final, curr, i) => {
                if (i != 0) {
                    final += ', '
                }
                final += `${curr.name?curr.name:''}`
                return final
            }, "")
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
        //this.props.setNextSearchCriteria()
        let data = {
            'Category': 'ChangeLocationIpdResultsPopUp', 'Action': 'change-location-doctor-results-PopUp', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'change-location-doctor-results-PopUp', 'url': window.location.pathname
        }
        GTM.sendEvent({ data: data })
        this.props.history.push(location_url)
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
                                    {this.props.hospital_search_results && this.props.hospital_search_results.count?this.props.hospital_search_results.count: 'No'} results found {criteriaStr ? "for Best " : "for "}
                                    <h1 className="search-result-heading">
                                        <span className="fw-700"> {`${criteriaStr?criteriaStr:''} Hospitals`} </span>
                                        <span className="search-result-span" onClick={
                                            this.goToLocation.bind(this)}>
                                            {
                                                this.state.showLocationPopup && false ? ''
                                                    : locationName ? <span className="location-edit" style={{ color: '#f6843a', cursor: 'pointer' }}>{` in ${locationName}`}</span> : ''
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
                </div>
            </div>
        );
    }
}


export default TopBar
