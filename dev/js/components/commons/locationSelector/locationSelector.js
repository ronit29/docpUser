import React from 'react';

import LocationSearchIcon from 'material-ui-icons/LocationSearching';


class LocationSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    static contextTypes = {
        router: () => null
    }

    getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                debugger
                // let geocoder = new google.maps.Geocoder()
                // let latlng = new google.maps.LatLng(-33.8665433, 151.1956316)
                // geocoder.geocode({
                //     'latLng': latlng
                // }, function (results, status) {
                //     debugger
                // })
            })
        }
    }

    render() {
        let address = 'Select Location'
        if (this.props.selectedLocation && this.props.selectedLocation.formatted_address) {
            address = this.props.selectedLocation.formatted_address
        }

        return (
            <div className="locationSelector">
                <input onClick={() => {
                    this.context.router.history.push('/locationsearch')
                }} placeholder={address} />
                <LocationSearchIcon className="currentLocation" onClick={this.getCurrentLocation.bind(this)} />
            </div>
        );
    }
}


export default LocationSelector
