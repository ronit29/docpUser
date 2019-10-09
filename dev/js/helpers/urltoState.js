import { _getlocationFromLatLong, _getLocationFromPlaceId } from './mapHelpers.js'
import { API_GET } from '../api/api'

export function opdSearchStateBuilder(selectLocation, querParams, isServer = false, location_ms = null) {

    try {
        return new Promise((resolve, reject) => {

            let _getLocationParamBind = (tag) => _getLocationParam(querParams, isServer, tag)

            let specializations_ids = _getLocationParamBind('specializations') || ""
            let condition_ids = _getLocationParamBind('conditions') || ""

            let lat = _getLocationParamBind('lat') || ""
            let long = _getLocationParamBind('long') || ""
            let place_id = _getLocationParamBind('place_id') || ""

            let locality = _getLocationParamBind('locality') || ""
            let sub_locality = _getLocationParamBind('sub_locality') || ""

            //let min_distance = parseInt(_getLocationParamBind('min_distance')) || 0
            //let max_distance = parseInt(_getLocationParamBind('max_distance')) || 15
            //let min_fees = parseInt(_getLocationParamBind('min_fees')) || 0
            //let max_fees = parseInt(_getLocationParamBind('max_fees')) || 3000
            //let is_available = _getLocationParamBind('is_available') === "true"
            //let is_female = _getLocationParamBind('is_female') === "true"
            
            let sort_on = _getLocationParamBind('sort_on') || ''
            let sort_order = _getLocationParamBind('sort_order') || ''
            let availability = _getLocationParamBind('availability') || []
            let avg_ratings = _getLocationParamBind('avg_ratings') || ''
            let gender = _getLocationParamBind('gender') || ''
            let sits_at_clinic = _getLocationParamBind('sits_at_clinic') === "true"
            let sits_at_hospital = _getLocationParamBind('sits_at_hospital') === "true"


            let doctor_name = _getLocationParamBind('doctor_name')
            doctor_name = doctor_name || ""
            let hospital_name = _getLocationParamBind('hospital_name')
            hospital_name = hospital_name || ""
            let locationType = _getLocationParamBind('locationType') || "geo"
            let procedures_ids = _getLocationParamBind('procedure_ids') || ""
            let category_ids = _getLocationParamBind('procedure_category_ids') || ""
            let ipd_procedures = _getLocationParamBind('ipd_procedures') || ""
            let page = _getLocationParamBind('page') || 1
            page = parseInt(page)
            let hospital_id = _getLocationParamBind('hospital_id') || ""
            let is_insured = _getLocationParamBind('is_insured') === "true"
            let group_ids = _getLocationParamBind('group_ids') || ''
            let specialization_filter_ids = _getLocationParamBind('specialization_filter_ids') || ''
            let spec = []
            let cond = []
            let procedures = []
            let procedure_categories = []
            let ipd_ids = []
            let group_data = []
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

            if (procedures_ids) {
                procedures = procedures_ids.split(',').map((x) => {
                    return {
                        type: 'procedures',
                        name: "",
                        id: parseInt(x)
                    }
                })
            }

            if (category_ids) {
                procedure_categories = category_ids.split(',').map((x) => {
                    return {
                        type: 'procedures_category',
                        name: "",
                        id: parseInt(x)
                    }
                })
            }

            if(ipd_procedures){
                ipd_ids = ipd_procedures.split(',').map((x) => {
                    return {
                        type: 'ipd',
                        name: "",
                        id: parseInt(x)
                    }
                })
            }

            if(group_ids) {
                group_data = group_ids.split(',').map((x) => {
                    return {
                        type: 'group_ids',
                        name: "",
                        id: parseInt(x)
                    }
                })   
            }

            let commonSelectedCriterias = [...cond, ...spec, ...procedures, ...procedure_categories, ...ipd_ids, ...group_data]

            let filterCriteria = {
                sort_order, gender, availability, avg_ratings, sits_at_hospital, sits_at_clinic, sort_on, specialization_filter_ids
            }

            if (doctor_name) {
                filterCriteria.doctor_name = doctor_name
            }

            if (hospital_name) {
                filterCriteria.hospital_name = hospital_name
            }

            if(hospital_id){
                filterCriteria.hospital_id = hospital_id
            }

            if(is_insured){
                filterCriteria.is_insured = is_insured
            }

            if (!isServer && !location_ms) {
                if (place_id) {
                    setTimeout(() => {
                        _getLocationFromPlaceId(place_id, (location_object) => {
                            selectLocation(location_object, 'autoComplete', false)
                        })
                    }, 1000)
                } else {
                    if (lat && long) {
                        setTimeout(() => {
                            _getlocationFromLatLong(lat, long, (locationType == 'geoip' ? 'city' : 'locality'), (location_object) => {
                                selectLocation(location_object, locationType, false)
                            })
                        }, 1000)
                    }
                }
            }

            let selectedLocation = null
            if (lat && long) {
                selectedLocation = { geometry: { location: { lat, lng: long } }, place_id, formatted_address: "Delhi", sub_locality: sub_locality, locality: locality }
            }

            if (location_ms) {
                API_GET(`/api/v1/geoip/adword/${location_ms}`).then((data) => {
                    selectedLocation = { geometry: { location: { lat: data.latitude, lng: data.longitude } }, place_id, formatted_address: "" }

                    if (!isServer) {
                        setTimeout(() => {
                            _getlocationFromLatLong(data.latitude, data.longitude, 'locality', (location_object) => {
                                selectLocation(location_object, 'geo', false)
                            })
                        }, 1000)
                    }

                    resolve({
                        filterCriteria,
                        commonSelectedCriterias,
                        selectedLocation,
                        page
                    })
                }).catch((e) => {
                    if (selectedLocation) {
                        if (!isServer) {
                            setTimeout(() => {
                                _getlocationFromLatLong(lat, long, 'locality', (location_object) => {
                                    selectLocation(location_object, 'geo', false)
                                })
                            }, 1000)
                        }
                        resolve({
                            filterCriteria,
                            commonSelectedCriterias,
                            selectedLocation,
                            page
                        })
                    } else {
                        resolve({
                            filterCriteria,
                            commonSelectedCriterias,
                            pagepage,
                            page
                        })
                    }
                })
            } else {
                if (selectedLocation) {
                    resolve({
                        filterCriteria,
                        commonSelectedCriterias,
                        selectedLocation,
                        page
                    })
                } else {
                    resolve({
                        filterCriteria,
                        commonSelectedCriterias,
                        page
                    })
                }
            }
        })

    } catch (e) {
        console.error(e)
    }

}


export function labSearchStateBuilder(selectLocation, querParams, isServer = false, location_ms = null) {
    try {
        return new Promise((resolve, reject) => {

            let _getLocationParamBind = (tag) => _getLocationParam(querParams, isServer, tag)

            let test_ids = _getLocationParamBind('test_ids') || ""
            let lat = _getLocationParamBind('lat') || ""
            let long = _getLocationParamBind('long') || ""
            let place_id = _getLocationParamBind('place_id') || ""
            /*let min_distance = parseInt(_getLocationParamBind('min_distance')) || 0
            let max_distance = parseInt(_getLocationParamBind('max_distance')) || 15
            let min_price = parseInt(_getLocationParamBind('min_price')) || 0
            let max_price = parseInt(_getLocationParamBind('max_price')) || 20000
            */
            let sort_on = _getLocationParamBind('sort_on') || ''
            let sort_order = _getLocationParamBind('sort_order') || ''
            let avg_ratings = _getLocationParamBind('avg_ratings') || ''
            let availability = _getLocationParamBind('availability') || []
            let home_visit = _getLocationParamBind('home_visit') ==="true"
            let lab_visit = _getLocationParamBind('lab_visit') ==="true"
            

            let lab_name = _getLocationParamBind('lab_name') || ""
            lab_name = lab_name || ""
            let network_id = _getLocationParamBind('network_id') || ""
            network_id = network_id || ""
            let locationType = _getLocationParamBind('locationType') || "geo"
            let page = _getLocationParamBind('page') || 1
            page = parseInt(page)

            let is_insured = _getLocationParamBind('is_insured') === "true"

            let currentSearchedCriterias = []
            if (test_ids) {
                currentSearchedCriterias = test_ids.split(',').map((x) => {
                    return {
                        type: 'test',
                        name: "",
                        id: parseInt(x)
                    }
                })
            }

            let filterCriteria = {
                sort_order, availability, avg_ratings, home_visit, lab_visit, sort_on
            }

            if (lab_name) {
                filterCriteria.lab_name = lab_name
            }

            if (network_id) {
                filterCriteria.network_id = network_id
            }

            if(is_insured){
                filterCriteria.is_insured = is_insured
            }

            if (!isServer && !location_ms) {
                if (place_id) {
                    setTimeout(() => {
                        _getLocationFromPlaceId(place_id, (location_object) => {
                            selectLocation(location_object, 'autoComplete', false)
                        })
                    }, 1000)
                } else {
                    if (lat && long) {
                        setTimeout(() => {
                            _getlocationFromLatLong(lat, long, (locationType == 'geoip' ? 'city' : 'locality'), (location_object) => {
                                selectLocation(location_object, locationType, false)
                            })
                        }, 1000)
                    }
                }
            }

            let selectedLocation = null
            if (lat && long) {
                selectedLocation = { geometry: { location: { lat, lng: long } }, place_id, formatted_address: "Delhi" }
            }

            if (location_ms) {
                API_GET(`/api/v1/geoip/adword/${location_ms}`).then((data) => {
                    selectedLocation = { geometry: { location: { lat: data.latitude, lng: data.longitude } }, place_id, formatted_address: "" }

                    if (!isServer) {
                        setTimeout(() => {
                            _getlocationFromLatLong(data.latitude, data.longitude, 'locality', (location_object) => {
                                selectLocation(location_object, 'geo', false)
                            })
                        }, 1000)
                    }

                    resolve({
                        filterCriteria,
                        currentSearchedCriterias,
                        selectedLocation,
                        page
                    })
                }).catch((e) => {
                    if (selectedLocation) {
                        if (!isServer) {
                            setTimeout(() => {
                                _getlocationFromLatLong(lat, long, 'locality', (location_object) => {
                                    selectLocation(location_object, 'geo', false)
                                })
                            }, 1000)
                        }
                        resolve({
                            filterCriteria,
                            currentSearchedCriterias,
                            selectedLocation,
                            page
                        })
                    } else {
                        resolve({
                            filterCriteria,
                            currentSearchedCriterias,
                            page
                        })
                    }
                })
            } else {
                if (selectedLocation) {
                    resolve({
                        filterCriteria,
                        currentSearchedCriterias,
                        selectedLocation,
                        page
                    })
                } else {
                    resolve({
                        filterCriteria,
                        currentSearchedCriterias,
                        page
                    })
                }
            }
        })

    } catch (e) {
        console.error(e)
    }
}

export function PackageSearchStateBuilder(selectLocation, querParams, isServer = false, location_ms = null) {
    try {
        return new Promise((resolve, reject) => {

            let _getLocationParamBind = (tag) => _getLocationParam(querParams, isServer, tag)

            let test_ids = _getLocationParamBind('test_ids') || ""
            let lat = _getLocationParamBind('lat') || ""
            let long = _getLocationParamBind('long') || ""
            let place_id = _getLocationParamBind('place_id') || ""
            /*let min_distance = parseInt(_getLocationParamBind('min_distance')) || 0
            let max_distance = parseInt(_getLocationParamBind('max_distance')) || 15
            let min_price = parseInt(_getLocationParamBind('min_price')) || 0
            let max_price = parseInt(_getLocationParamBind('max_price')) || 20000
            */
            let sort_on = _getLocationParamBind('sort_on') || ''
            let sort_order = _getLocationParamBind('sort_order') || ''
            let avg_rating = _getLocationParamBind('avg_rating') || ''
            let home_visit = _getLocationParamBind('home_visit') === "true"
            let lab_visit = _getLocationParamBind('lab_visit') === "true"

            let lab_name = _getLocationParamBind('lab_name') || ""
            // let test_ids = _getLocationParamBind('test_ids') || ""
            let catIds = _getLocationParamBind('category_ids') || ""
            lab_name = lab_name || ""
            let network_id = _getLocationParamBind('network_id') || ""
            network_id = network_id || ""
            let locationType = _getLocationParamBind('locationType') || "geo"
            let page = _getLocationParamBind('page') || 1
            page = parseInt(page)
            let max_age= parseInt(_getLocationParamBind('max_age')) || ""
            let min_age= parseInt(_getLocationParamBind('min_age')) || ""
            let gender= parseInt(_getLocationParamBind('gender')) || ""
            let package_type= parseInt(_getLocationParamBind('package_type')) || ""
            let package_ids= parseInt(_getLocationParamBind('package_ids')) || ""
            let package_category_ids= parseInt(_getLocationParamBind('package_category_ids')) || ""

            let currentSearchedCriterias = []
            // if (test_ids) {
            //     currentSearchedCriterias = test_ids.split(',').map((x) => {
            //         return {
            //             type: 'test',
            //             name: "",
            //             id: parseInt(x)
            //         }
            //     })
            // }

            let filterCriteriaPackages = {
                sort_order, max_age, min_age, package_type, gender, catIds, test_ids, package_ids, package_category_ids, avg_rating, lab_visit, home_visit, sort_on
            }

            if (lab_name) {
                filterCriteriaPackages.lab_name = lab_name
            }

            if (network_id) {
                filterCriteriaPackages.network_id = network_id
            }

            /*filterCriteriaPackages.priceRange = [0, 20000]
            filterCriteriaPackages.priceRange[0] = filterCriteriaPackages.min_price
            filterCriteriaPackages.priceRange[1] = filterCriteriaPackages.max_price

            filterCriteriaPackages.distanceRange = [0, 15]
            filterCriteriaPackages.distanceRange[0] = filterCriteriaPackages.min_distance
            filterCriteriaPackages.distanceRange[1] = filterCriteriaPackages.max_distance
*/
            if (!isServer && !location_ms) {
                if (place_id) {
                    setTimeout(() => {
                        _getLocationFromPlaceId(place_id, (location_object) => {
                            selectLocation(location_object, 'autoComplete', false)
                        })
                    }, 1000)
                } else {
                    if (lat && long) {
                        setTimeout(() => {
                            _getlocationFromLatLong(lat, long, (locationType == 'geoip' ? 'city' : 'locality'), (location_object) => {
                                selectLocation(location_object, locationType, false)
                            })
                        }, 1000)
                    }
                }
            }

            let selectedLocation = null
            if (lat && long) {
                selectedLocation = { geometry: { location: { lat, lng: long } }, place_id, formatted_address: "Delhi" }
            }

            if (location_ms) {
                API_GET(`/api/v1/geoip/adword/${location_ms}`).then((data) => {
                    selectedLocation = { geometry: { location: { lat: data.latitude, lng: data.longitude } }, place_id, formatted_address: "" }

                    if (!isServer) {
                        setTimeout(() => {
                            _getlocationFromLatLong(data.latitude, data.longitude, 'locality', (location_object) => {
                                selectLocation(location_object, 'geo', false)
                            })
                        }, 1000)
                    }

                    resolve({
                        filterCriteriaPackages,
                        currentSearchedCriterias,
                        selectedLocation,
                        page
                    })
                }).catch((e) => {
                    if (selectedLocation) {
                        if (!isServer) {
                            setTimeout(() => {
                                _getlocationFromLatLong(lat, long, 'locality', (location_object) => {
                                    selectLocation(location_object, 'geo', false)
                                })
                            }, 1000)
                        }
                        resolve({
                            filterCriteriaPackages,
                            currentSearchedCriterias,
                            selectedLocation,
                            page
                        })
                    } else {
                        resolve({
                            filterCriteriaPackages,
                            currentSearchedCriterias,
                            page
                        })
                    }
                })
            } else {
                if (selectedLocation) {
                    resolve({
                        filterCriteriaPackages,
                        currentSearchedCriterias,
                        selectedLocation,
                        page
                    })
                } else {
                    resolve({
                        filterCriteriaPackages,
                        currentSearchedCriterias,
                        page
                    })
                }
            }
        })

    } catch (e) {
        console.error(e)
    }
}

export function HospitalSearchStateBuilder(selectLocation, querParams, isServer = false, location_ms = null) {

    try {
        return new Promise((resolve, reject) => {

            let _getLocationParamBind = (tag) => _getLocationParam(querParams, isServer, tag)

            let ipd_id = _getLocationParamBind('ipd_id') || ""
            let lat = _getLocationParamBind('lat') || ""
            let long = _getLocationParamBind('long') || ""
            let place_id = _getLocationParamBind('place_id') || ""
            let min_distance = parseInt(_getLocationParamBind('min_distance')) || 0
            let max_distance = parseInt(_getLocationParamBind('max_distance')) || 20

            let provider_ids = _getLocationParamBind('provider_ids') || ""
            let locationType = _getLocationParamBind('locationType') || "geo"
            let page = _getLocationParamBind('page') || 1
            page = parseInt(page)
            let network_id = _getLocationParamBind('network_id') || ""

            let filterCriteria = {
               min_distance, max_distance
            }

            filterCriteria.distance = [0, 20]
            filterCriteria.distance[0] = filterCriteria.min_distance
            filterCriteria.distance[1] = filterCriteria.max_distance
            filterCriteria.provider_ids = provider_ids
            filterCriteria.network_id = network_id

            if(ipd_id){
                ipd_id = ipd_id.split(',').map((x) => {
                    return {
                        type: 'ipd',
                        name: "",
                        id: parseInt(x)
                    }
                })
            }

            let commonSelectedCriterias = [...ipd_id]


            if (!isServer && !location_ms) {
                if (place_id) {
                    setTimeout(() => {
                        _getLocationFromPlaceId(place_id, (location_object) => {
                            selectLocation(location_object, 'autoComplete', false)
                        })
                    }, 1000)
                } else {
                    if (lat && long) {
                        setTimeout(() => {
                            _getlocationFromLatLong(lat, long, (locationType == 'geoip' ? 'city' : 'locality'), (location_object) => {
                                selectLocation(location_object, locationType, false)
                            })
                        }, 1000)
                    }
                }
            }

            let selectedLocation = null
            if (lat && long) {
                selectedLocation = { geometry: { location: { lat, lng: long } }, place_id, formatted_address: "Delhi" }
            }

            if (location_ms) {
                API_GET(`/api/v1/geoip/adword/${location_ms}`).then((data) => {
                    selectedLocation = { geometry: { location: { lat: data.latitude, lng: data.longitude } }, place_id, formatted_address: "" }

                    if (!isServer) {
                        setTimeout(() => {
                            _getlocationFromLatLong(data.latitude, data.longitude, 'locality', (location_object) => {
                                selectLocation(location_object, 'geo', false)
                            })
                        }, 1000)
                    }

                    resolve({
                        filterCriteria,
                        commonSelectedCriterias,
                        selectedLocation,
                        page
                    })
                }).catch((e) => {
                    if (selectedLocation) {
                        if (!isServer) {
                            setTimeout(() => {
                                _getlocationFromLatLong(lat, long, 'locality', (location_object) => {
                                    selectLocation(location_object, 'geo', false)
                                })
                            }, 1000)
                        }
                        resolve({
                            filterCriteria,
                            commonSelectedCriterias,
                            selectedLocation,
                            page
                        })
                    } else {
                        resolve({
                            filterCriteria,
                            commonSelectedCriterias,
                            page
                        })
                    }
                })
            } else {
                if (selectedLocation) {
                    resolve({
                        filterCriteria,
                        commonSelectedCriterias,
                        selectedLocation,
                        page
                    })
                } else {
                    resolve({
                        filterCriteria,
                        commonSelectedCriterias,
                        page
                    })
                }
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