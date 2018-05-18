import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios'

class LocationSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: "",
            searchResults: []
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
            center: { lat: -33.867, lng: 151.195 },
            zoom: 15
        })
        let service = new google.maps.places.PlacesService(map);
        service.getDetails({
            reference: location.reference
        }, function (place, status) {
            this.props.selectLocation(place)
            this.props.history.go(-1)

        }.bind(this))
    }

    componentDidMount() {
        let input = document.getElementById('topLocationSearch')
        input.focus()
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <div>
                <header className="skin-white fixed horizontal top location-detect-header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="select-location-row text-center">
                                    <span onClick={() => {
                                        this.props.history.go(-1)
                                    }} className="ct-img ct-img-md close"><img src="/assets/img/customer-icons/close-black.svg" className="img-fluid" /></span>
                                    <h4 className="fw-700 text-md">Select Location</h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="search-row">
                                    <div className="adon-group location-detect-field">
                                        <input type="text" value={this.state.search} onChange={this.inputHandler.bind(this)} className="form-control input-md search-input no-shadow" placeholder="Select any city or locality" id="topLocationSearch" />
                                        <span className="ct-img ct-img-sm map-marker-blue"><img src="/assets/img/customer-icons/map-marker-blue.svg" className="img-fluid" /></span>
                                    </div>
                                    <div className="detect-my-locaiton">
                                        <span className="ct-img ct-img-xs"><img src="/assets/img/customer-icons/gps.svg" className="img-fluid" /></span>Detect My Location
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
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
        );
    }
}


export default LocationSearch
