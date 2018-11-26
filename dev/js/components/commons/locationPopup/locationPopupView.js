import React from 'react'
import { _getlocationFromLatLong } from '../../../helpers/mapHelpers'
const queryString = require('query-string');
import GTM from '../../../helpers/gtm'

class LocationPopupView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            search: '',
            location_object: null
        }
    }

    componentWillReceiveProps(props) {
        if (props.selectedLocation && this.props.selectedLocation) {
            if (this.state.search) {
                if (props.selectedLocation != this.props.selectedLocation) {
                    this.setState({ location_object: props.selectedLocation, search: props.selectedLocation.formatted_address })
                }
            } else if (!props.locationType.includes("geo")) {
                this.setState({ location_object: props.selectedLocation, search: props.selectedLocation.formatted_address })
            }
        }
    }

    componentDidMount() {
        if (this.props.locationType && !this.props.locationType.includes("geo") && this.props.selectedLocation && this.props.selectedLocation.formatted_address) {
            this.setState({ location_object: this.props.selectedLocation, search: this.props.locationName || this.props.selectedLocation.formatted_address })
        }
    }

    goToLocation() {
        if (this.props.isTopbar) {
            let redirect_to = ""
            if (window.location.pathname.includes('sptcit') || window.location.pathname.includes('sptlitcit')) {
                redirect_to = "/opd/searchresults"
            }

            if (window.location.pathname.includes('lbcit') || window.location.pathname.includes('lblitcit')) {
                redirect_to = "/lab/searchresults"
            }

            let location_url = '/locationsearch'
            if (redirect_to) {
                location_url += `?redirect_to=${redirect_to}`
            }

            let data = {
                'Category': 'ChangeLocationDoctorResultsPopUp', 'Action': 'change-location-doctor-results-PopUp', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'change-location-doctor-results-PopUp', 'url': window.location.pathname
            }
            GTM.sendEvent({ data: data })
            this.props.history.push(location_url)
        }
    }

    continueLocation() {
        const parsed = queryString.parse(this.props.location.search);
        let data = {
            'Category': 'ContinueLocationDoctorResultsPopUp', 'Action': 'continue-location-doctor-results-PopUp', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'continue-location-doctor-results-PopUp', 'url': window.location.pathname
        }
        GTM.sendEvent({ data: data })
        if (parsed.lat && parsed.long) {
            _getlocationFromLatLong(parsed.lat, parsed.long, 'locality', (locationData) => {
                if (locationData) {
                    this.props.selectLocation(locationData, 'autoDetect')
                }
            })
        }
    }

    render() {
        return (
            <div className="fr-location-popup-container">
                <p className="fw-500 text-md">Showing {this.props.count} results <span style={{ fontWeight: 700 }}>{this.props.criteriaString ? `for ${this.props.criteriaString}` : ''}</span></p>
                <p className="fw-700 text-md">{this.props.locationName ? ` in ${this.props.locationName}` : ''}</p>
                <div className="mrt-20">
                    <button className="fw-500 fr-popup-cont" onClick={() => this.continueLocation()}>Continue</button>
                </div>
                <p className="fw-500 mrt-20 text-xs">OR</p>
                <div className="mrt-20">
                    <button className="fw-500 fr-popup-change" onClick={this.goToLocation.bind(this)}>Change Location</button>
                </div>
            </div>
        )
    }
}

export default LocationPopupView