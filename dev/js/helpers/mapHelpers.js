export function _getlocationFromLatLong(lat, long, location_type = 'locality', cb) {
    if (google) {
        var latlng = { lat: parseFloat(parseFloat(lat).toFixed(6)), lng: parseFloat(parseFloat(long).toFixed(6)) };

        let geocoder = new google.maps.Geocoder
        geocoder.geocode({ 'location': latlng }, (results, status) => {
            if (results && results[0]) {
                if (false) {
                    location_type = "sublocality"
                }
                let location_object = {
                    formatted_address: _getNameFromLocation(results[0], location_type),
                    name: _getNameFromLocation(results[0], location_type),
                    place_id: "",
                    geometry: { location: { lat, lng: long } }
                }
                cb(location_object)
            }
        })
    }
}

export function _getLocationFromPlaceId(placeId, cb) {
    if (google) {
        let map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 28, lng: 77 },
            zoom: 15
        })
        let service = new google.maps.places.PlacesService(map);
        service.getDetails({
            reference: placeId
        }, function (place, status) {
            let location_object = {
                formatted_address: place.formatted_address,
                name: place.name,
                place_id: place.place_id,
                geometry: place.geometry
            }

            cb(location_object)

        }.bind(this))
    }
}

export function _getNameFromLocation(result, type) {
    let name = result.formatted_address
    if (result.address_components && result.address_components.length) {
        for (let i = result.address_components.length - 1; i >= 0; i--) {
            if (result.address_components[i].types) {
                for (let x of result.address_components[i].types) {
                    if (x == type) {
                        name = result.address_components[i].long_name
                    }
                }
            }
        }
    }
    return name
}