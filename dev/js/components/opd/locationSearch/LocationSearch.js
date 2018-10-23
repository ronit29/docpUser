import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import Loader from '../../commons/Loader'
import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import SnackBar from 'node-snackbar'
import GTM from '../../../helpers/gtm.js'
import { _getlocationFromLatLong, _getLocationFromPlaceId } from '../../../helpers/mapHelpers'
const queryString = require('query-string');

class LocationSearch extends React.Component {
    constructor(props) {
        super(props)
        const parsed = queryString.parse(this.props.location.search)
        this.state = {
            search: "",
            searchResults: [],
            detectLoading: false,
            redirect_to: parsed.redirect_to
        }
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
            }.bind(this))
        }
    }

    inputHandler(e) {
        this.setState({
            search: e.target.value
        })
        this.getLocation(e.target.value)

    }

    selectLocation(location) {
        let timeout = setTimeout(() => {
            if (this.state.detectLoading) {
                this.setState({ detectLoading: false })
                SnackBar.show({ pos: 'bottom-center', text: "Could not select location." });
            }
        }, 5000)
        this.setState({ detectLoading: true })

        _getLocationFromPlaceId(location.reference, (location_object) => {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'UserLocation', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'user-location', 'location': location_object.name || '', 'place_id': location_object.place_id || '', 'formatted_address': location_object.formatted_address || ''
            }
            GTM.sendEvent({ data: data })

            this.props.selectLocation(location_object, 'autoComplete').then(() => {
                if (this.state.redirect_to) {
                    this.props.history.push(this.state.redirect_to)
                } else {
                    this.props.history.go(-1)
                }
                this.setState({ detectLoading: false })
            })
        })
    }

    componentDidMount() {
        let input = document.getElementById('topLocationSearch')
        input.focus()
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
                        if (this.state.redirect_to) {
                            this.props.history.push(this.state.redirect_to)
                        } else {
                            this.props.history.go(-1)
                        }
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

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container parent-section parent-section-temp">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            <header className="skin-white fixed horizontal top location-detect-header sticky-header" style={{ top: 100 }}>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12" style={{ paddingTop: 10 }}>
                                            <div className="search-row">
                                                <div className="adon-group location-detect-field">
                                                    <input type="text" value={this.state.search} onChange={this.inputHandler.bind(this)} className="form-control input-md search-input no-shadow" placeholder="Select any city or locality" id="topLocationSearch" disabled={this.state.detectLoading} />
                                                    <span className="ct-img ct-img-sm map-marker-blue"><img src={ASSETS_BASE_URL + "/img/customer-icons/map-marker-blue.svg"} className="img-fluid" /></span>
                                                </div>
                                                <div className="detect-my-locaiton" onClick={this.detectLocation.bind(this)}>
                                                    <span className="ct-img ct-img-xs"><img src={ASSETS_BASE_URL + "/img/customer-icons/gps.svg"} className="img-fluid" /></span>Detect My Location
                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </header>
                            {
                                this.state.detectLoading ? <div className="fullscreen"><Loader /></div> : ""
                            }
                            <section className="wrap locaton-detect-screen">
                                <div className="widget-panel">
                                    <h4 className="panel-title">Search Result</h4>
                                    <div className="panel-content pd-0">
                                        <ul className="list city-list">
                                            {
                                                this.state.searchResults.map((result, i) => {
                                                    return <li key={i} onClick={this.selectLocation.bind(this, result)}>
                                                        <a>{result.description}
                                                            <span className="city-loc">City</span>
                                                        </a>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </section>
                            <div id="map" style={{ display: 'none' }}></div>
                        </div>

                        <RightBar />
                    </div>
                </section>
            </div>
        );
    }
}


export default LocationSearch
