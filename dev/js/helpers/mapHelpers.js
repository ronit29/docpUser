export function _getlocationFromLatLong(lat, long, location_type = 'locality', cb) {
    if (typeof google != undefined && lat && long) {
        var latlng = { lat: parseFloat(parseFloat(lat).toFixed(6)), lng: parseFloat(parseFloat(long).toFixed(6)) };

        let geocoder = new google.maps.Geocoder
        geocoder.geocode({ 'location': latlng }, (results, status) => {
            if (results && results[0]) {
                let results_to_pick = results[0]
                results.map((x) => {
                    if (x.address_components && x.address_components.length > results_to_pick.address_components.length) {
                        results_to_pick = x
                    }
                })

                let location_name = ""
                let locality = _getNameFromLocation(results_to_pick, 'locality')
                let sub_locality = _getNameFromLocation(results_to_pick, 'sublocality')
                // debugger
                if (sub_locality && location_type != 'city') {
                    location_name += `${sub_locality}, `
                }
                if (locality) {
                    location_name += `${locality}`
                }
                if (!location_name) {
                    location_name = results_to_pick.formatted_address
                }

                let location_object = {
                    formatted_address: location_name,
                    name: location_name,
                    place_id: "",
                    geometry: { location: { lat, lng: long } }
                }
                cb(location_object)
            }
        })
    }
}

export function _getLocationFromPlaceId(placeId, cb) {
    if (typeof google != undefined) {
        let map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 28, lng: 77 },
            zoom: 15
        })
        let service = new google.maps.places.PlacesService(map);
        service.getDetails({
            reference: placeId
        }, function (place, status) {
            let location_name = place.formatted_address
            let formedName = _getNameforPlaceId(place)
            if (formedName) {
                location_name = formedName
            }
            // debugger
            let location_object = {
                formatted_address: location_name,
                name: location_name,
                place_id: place.place_id,
                geometry: place.geometry
            }

            cb(location_object)

        }.bind(this))
    }
}

export function _getNameforPlaceId(result) {
    let name = []
    if (result.address_components && result.address_components.length) {
        let found_locality = false
        for (let i = 0; i < result.address_components.length; i++) {

            if (result.address_components[i].types) {
                for (let x of result.address_components[i].types) {
                    if (x == 'locality') {
                        found_locality = true
                        break
                    }
                }
                name.push(result.address_components[i].long_name)
                if (found_locality) {
                    break
                }
            }

        }
        if (!found_locality) {
            name = ""
        }
    }
    if (name.length) {
        return name.join(', ')
    } else return ""
}

export function _getNameFromLocation(result, type) {
    let name = ""
    if (result.address_components && result.address_components.length) {
        for (let i = result.address_components.length - 1; i >= 0; i--) {
            if (result.address_components[i].types) {
                for (let x of result.address_components[i].types) {
                    if (x == type) {
                        name = result.address_components[i].long_name
                        break
                    }
                }
            }
            if(name){
                break
            }
        }
    }
    return name
}