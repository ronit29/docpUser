import AXIOS from 'axios'
import CONFIG from '../config/config'


export function _autoCompleteService(query, cb, types = null) {

    let url = `${CONFIG.GOOGLE_SERVICE_URL}/autocomplete/${query}`
    AXIOS.post(url, {
        types: types
    }).then((data) => {
        if (data && data.data) {
            cb(data.data)
        }
    }).catch((e) => {
        cb([])
    })
}

export function _getlocationFromLatLong(lat, long, location_type = 'locality', cb) {
    var lat_c = parseFloat(parseFloat(lat).toFixed(6))
    var long_c = parseFloat(parseFloat(long).toFixed(6))

    let url = `${CONFIG.GOOGLE_SERVICE_URL}/location/latlong/${lat_c}/${long_c}`
    AXIOS.get(url).then((data) => {
        if (data && data.data) {
            let results = data.data
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
                    geometry: { location: { lat, lng: long } },
                    locality: locality,
                    sub_locality: sub_locality
                }
                cb(location_object)
            }
        }
    }).catch((e) => {
        // cb([])
    })
}

export function _getLocationFromPlaceId(placeId, cb, modify = false) {
    let url = `${CONFIG.GOOGLE_SERVICE_URL}/location/placeid/${placeId}`
    AXIOS.get(url).then((data) => {
        if (data && data.data) {
            let place = data.data
            if (modify) {
                cb(place)
                return
            }
            let location_name = place.formatted_address
            let formedName = _getNameforPlaceId(place)

            //Get Locality & SubLocality
            let locality = _getNameFromLocation(place, 'locality')
            let sub_locality = _getNameFromLocation(place, 'sublocality')

            if (formedName) {
                location_name = formedName
            }
            // debugger
            let location_object = {
                formatted_address: location_name,
                name: location_name,
                place_id: place.place_id,
                geometry: place.geometry,
                locality: locality,
                sub_locality: sub_locality
            }
            cb(location_object)
        } else {
            // cb(null)
        }
    }).catch((e) => {
        // cb(null)
    })
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
            if (name) {
                break
            }
        }
    }
    return name
}