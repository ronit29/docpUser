import React from 'react'
import SnackBar from 'node-snackbar'
import { _getlocationFromLatLong, _getLocationFromPlaceId } from '../../../helpers/mapHelpers'

class LocationElementsView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            search: '',
            searchResults: [],
            detectLoading: false,
            validationError: false,
            location_object: null,
            location_type: ''
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
        this.props.onRef(this)
        if (this.props.locationType && !this.props.locationType.includes("geo") && this.props.selectedLocation && this.props.selectedLocation.formatted_address) {
            this.setState({ location_object: this.props.selectedLocation, search: this.props.locationName || this.props.selectedLocation.formatted_address })
        }
        if (!this.props.isTopbar) {
            if (document.getElementById('doc-input-field')) {
                document.getElementById('doc-input-field').addEventListener('focusin', () => {
                    this.props.getCityListLayout()
                    this.setState({ location_object: null, search: '' })
                })

                document.getElementById('doc-input-field').addEventListener('focusout', () => {
                    this.setState({ location_object: null, search: '' })
                })
            }
        }
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    getLocation(location) {
        var auto = new google.maps.places.AutocompleteService()

        var request = {
            input: location,
            types: ['geocode'],
            componentRestrictions: { country: 'in' }
        };
        if (location) {
            auto.getPlacePredictions(request, function (results, status) {
                results = results || []
                this.setState({ searchResults: results })
                this.props.getCityListLayout(results)
            }.bind(this))
        }
    }

    inputHandler(e) {
        this.setState({
            search: e.target.value
        })
        this.getLocation(e.target.value)
    }

    inputNoHandler(e) {
        this.setState({
            mobile_no: e.target.value,
            validationError: false
        })
    }

    selectLocation(location, cb) {
        let timeout = setTimeout(() => {
            if (this.state.detectLoading) {
                this.setState({ detectLoading: false })
                // SnackBar.show({ pos: 'bottom-center', text: "Could not select location." });
            }
        }, 5000)
        this.setState({ detectLoading: true })

        _getLocationFromPlaceId(location.reference, (location_object) => {
            this.props.selectLocation(location_object, 'autoComplete').then(() => {
                this.setState({ detectLoading: false, searchResults: [], search: location_object.formatted_address })
                cb()
            })
        })
    }

    detectLocation() {
        let timeout = setTimeout(() => {
            if (this.state.detectLoading) {
                this.setState({ detectLoading: false })
                SnackBar.show({ pos: 'bottom-center', text: "Could not fetch location." });
            }
        }, 5000)

        this.setState({ detectLoading: true })

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                _getlocationFromLatLong(parseFloat(position.coords.latitude), parseFloat(position.coords.longitude), 'locality', (location_object) => {
                    this.props.selectLocation(location_object, 'autoDetect').then(() => {
                        clearTimeout(timeout)
                        this.setState({ detectLoading: false })
                    })
                })
            }, (a, b, c) => {
                this.setState({ detectLoading: false })
                SnackBar.show({ pos: 'bottom-center', text: "Could not fetch location." });
            }, (a, b, c) => {
                this.setState({ detectLoading: false })
                SnackBar.show({ pos: 'bottom-center', text: "Could not fetch location." });
            })
        }
        else {
            this.setState({ detectLoading: false })
            // geolocation is not supported
        }
    }

    focusOut() {
        if (this.props.selectedLocation && this.props.selectedLocation.formatted_address) {
            this.setState({ search: props.selectedLocation.formatted_address || '' })
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
            this.props.history.push(location_url)
        }
    }

    render() {

        return (
            // toggle class : 'doc-select-none'
            <div className="row" style={{ backgroundColor: '#f78316', marginTop: 10, position: 'relative', zIndex: 11 }}>

                <div className="col-12">
                    {
                        this.props.resultType == 'list' ?
                            <p className="location-txt-msg">Tell us your exact location to get more relevant results:</p>
                            : ''
                    }
                    <div className={this.props.resultType == 'list' ? "doc-caret" : "doc-select-none"}></div>
                </div>

                <div className="col-12" style={{ paddingBottom: 10 }}>
                    <div className="doc-select-location-div">
                        <div className="doc-input-loc-div" onClick={this.goToLocation.bind(this)}>
                            <input type="text" className="form-control doc-input-loc" id="doc-input-field" placeholder="Search your locality" value={this.state.search} onChange={this.inputHandler.bind(this)} />
                            <span className="doc-input-loc-icon">
                                <img src={ASSETS_BASE_URL + "/img/customer-icons/map-marker-blue.svg"} />
                            </span>
                            {
                                this.props.isTopbar ? "" : <div className="doc-or-text  text-center">
                                    <p style={{ color: '#fff', fontSize: 28 }}>|</p>
                                </div>
                            }
                            {
                                this.props.isTopbar ? "" : <div className="doc-auto-detect-div " onClick={this.detectLocation.bind(this)}>
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/crosshairs-gps.svg"} />
                                    <p className="fw-500 text-sm" style={{ color: '#fff' }}>Auto Detect</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <div id="map1" style={{ display: 'none' }}></div>
            </div>
        )
    }
}

export default LocationElementsView