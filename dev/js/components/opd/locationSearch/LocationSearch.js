import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import Loader from '../../commons/Loader'
import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import SnackBar from 'node-snackbar'

class LocationSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: "",
            searchResults: [],
            detectLoading: false
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
        let map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 28, lng: 77 },
            zoom: 15
        })
        let service = new google.maps.places.PlacesService(map);
        service.getDetails({
            reference: location.reference
        }, function (place, status) {

            let location_object = {
                formatted_address: place.formatted_address,
                name: place.name,
                place_id: place.place_id,
                geometry: place.geometry
            }

            this.props.selectLocation(location_object)
            setTimeout(() => {
                this.props.history.go(-1)
            }, 100)
        }.bind(this))
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
                var latlng = { lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude) };

                let geocoder = new google.maps.Geocoder
                geocoder.geocode({ 'location': latlng }, (results, status) => {
                    if (results && results[0]) {
                        let location_object = {
                            formatted_address: results[0].formatted_address,
                            name: results[0].name,
                            place_id: results[0].place_id,
                            geometry: results[0].geometry
                        }
                        this.props.selectLocation(location_object)
                        clearTimeout(timeout)
                        setTimeout(() => {
                            this.props.history.go(-1)
                        }, 100)
                    }
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
                            <header className="skin-white fixed horizontal top location-detect-header sticky-header" style={{ top: 65 }}>
                                <div className="container-fluid">
                                    {/* <div className="row">
                                        <div className="col-12">
                                            <div className="select-location-row text-center">
                                                <span onClick={() => {
                                                    this.props.history.go(-1)
                                                }} className="ct-img ct-img-md close"><img src={ASSETS_BASE_URL + "/img/customer-icons/close-black.svg"} className="img-fluid" /></span>
                                                <h4 className="fw-700 text-md">Select Location</h4>
                                            </div>
                                        </div>
                                    </div> */}
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
