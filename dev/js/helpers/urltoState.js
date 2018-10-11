import { _getlocationFromLatLong, _getLocationFromPlaceId } from './mapHelpers.js'

export function opdSearchStateBuilder(selectLocation, querParams, isServer = false) {

    try {
        return new Promise((resolve, reject) => {

            let _getLocationParamBind = (tag) => _getLocationParam(querParams, isServer, tag)

            let specializations_ids = _getLocationParamBind('specializations') || ""
            let condition_ids = _getLocationParamBind('conditions') || ""

            let lat = _getLocationParamBind('lat') || ""
            let long = _getLocationParamBind('long') || ""
            let place_id = _getLocationParamBind('place_id') || ""

            let min_distance = parseInt(_getLocationParamBind('min_distance')) || 0
            let max_distance = parseInt(_getLocationParamBind('max_distance')) || 35
            let min_fees = parseInt(_getLocationParamBind('min_fees')) || 0
            let max_fees = parseInt(_getLocationParamBind('max_fees')) || 1500
            let sort_on = _getLocationParamBind('sort_on') || null
            let is_available = _getLocationParamBind('is_available') === "true"
            let is_female = _getLocationParamBind('is_female') === "true"
            let doctor_name = _getLocationParamBind('doctor_name')
            doctor_name = doctor_name || ""
            let hospital_name = _getLocationParamBind('hospital_name')
            hospital_name = hospital_name || ""

            let selectedCriterias = []
            let spec = []
            let cond = []
            if (specializations_ids) {
                spec = specializations_ids.split(',').map((x) => {
                    return {
                        type: 'speciality',
                        name: "",
                        id: parseInt(x)
                    }
                })
            }

            if (condition_ids) {
                cond = condition_ids.split(',').map((x) => {
                    return {
                        type: 'condition',
                        name: "",
                        id: parseInt(x)
                    }
                })
            }

            selectedCriterias = [...cond, ...spec]

            let filterCriteria = {
                min_fees, max_fees, sort_on, is_available, is_female, min_distance, max_distance
            }

            if (doctor_name) {
                filterCriteria.doctor_name = doctor_name
            }

            if (hospital_name) {
                filterCriteria.hospital_name = hospital_name
            }

            filterCriteria.priceRange = [0, 1500]
            filterCriteria.priceRange[0] = filterCriteria.min_fees
            filterCriteria.priceRange[1] = filterCriteria.max_fees

            filterCriteria.distanceRange = [0, 35]
            filterCriteria.distanceRange[0] = filterCriteria.min_distance
            filterCriteria.distanceRange[1] = filterCriteria.max_distance

            if (!isServer) {
                if (place_id && place_id != 'from_sensor') {
                    setTimeout(() => {
                        _getLocationFromPlaceId(place_id, (location_object) => {
                            selectLocation(location_object, 'autoComplete', false)
                        })
                    }, 1000)
                } else {
                    if (lat && long) {
                        setTimeout(() => {
                            let type = 'geo'
                            if (place_id && place_id == 'from_sensor') {
                                type = 'autoDetect'
                            }
                            _getlocationFromLatLong(lat, long, 'locality', (location_object) => {
                                selectLocation(location_object, type, false)
                            })
                        }, 1000)
                    }
                }
            }

            let selectedLocation = null
            if (lat && long) {
                selectedLocation = { geometry: { location: { lat, lng: long } }, place_id, formatted_address: "" }
            }

            if (selectedLocation) {
                resolve({
                    filterCriteria,
                    selectedCriterias,
                    selectedLocation
                })
            } else {
                resolve({
                    filterCriteria,
                    selectedCriterias
                })
            }
        })

    } catch (e) {
        console.error(e)
    }

}


export function labSearchStateBuilder(selectLocation, querParams, isServer = false) {
    try {
        return new Promise((resolve, reject) => {

            let _getLocationParamBind = (tag) => _getLocationParam(querParams, isServer, tag)

            let test_ids = _getLocationParamBind('test_ids') || ""
            let lat = _getLocationParamBind('lat') || ""
            let long = _getLocationParamBind('long') || ""
            let place_id = _getLocationParamBind('place_id') || ""
            let min_distance = parseInt(_getLocationParamBind('min_distance')) || 0
            let max_distance = parseInt(_getLocationParamBind('max_distance')) || 35
            let min_price = parseInt(_getLocationParamBind('min_price')) || 0
            let max_price = parseInt(_getLocationParamBind('max_price')) || 20000
            let sort_on = _getLocationParamBind('sort_on') || null
            let lab_name = _getLocationParamBind('lab_name') || ""
            lab_name = lab_name || ""

            let selectedCriterias = []
            if (test_ids) {
                selectedCriterias = test_ids.split(',').map((x) => {
                    return {
                        type: 'test',
                        name: "",
                        id: parseInt(x)
                    }
                })
            }

            let filterCriteria = {
                min_price, max_price, min_distance, max_distance, sort_on
            }

            if (lab_name) {
                filterCriteria.lab_name = lab_name
            }

            filterCriteria.priceRange = [0, 20000]
            filterCriteria.priceRange[0] = filterCriteria.min_price
            filterCriteria.priceRange[1] = filterCriteria.max_price

            filterCriteria.distanceRange = [0, 35]
            filterCriteria.distanceRange[0] = filterCriteria.min_distance
            filterCriteria.distanceRange[1] = filterCriteria.max_distance

            if (!isServer) {
                if (place_id && place_id != 'from_sensor') {
                    setTimeout(() => {
                        _getLocationFromPlaceId(place_id, (location_object) => {
                            selectLocation(location_object, 'autoComplete', false)
                        })
                    }, 1000)
                } else {
                    if (lat && long) {
                        setTimeout(() => {
                            let type = 'geo'
                            if (place_id && place_id == 'from_sensor') {
                                type = 'autoDetect'
                            }
                            _getlocationFromLatLong(lat, long, 'locality', (location_object) => {
                                selectLocation(location_object, type, false)
                            })
                        }, 1000)
                    }
                }
            }

            let selectedLocation = null
            if (lat && long) {
                selectedLocation = { geometry: { location: { lat, lng: long } }, place_id, formatted_address: "" }
            }

            if (selectedLocation) {
                resolve({
                    filterCriteria,
                    selectedCriterias,
                    selectedLocation
                })
            } else {
                resolve({
                    filterCriteria,
                    selectedCriterias
                })
            }

        })

    } catch (e) {
        console.error(e)
    }
}


function _getLocationParam(querParams, isServer = false, tag) {
    if (isServer) {
        return querParams[tag]
    } else {
        // this API assumes the context of react-router-4
        const params = new URLSearchParams(querParams)
        return params.get(tag)
    }
}