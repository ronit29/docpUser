export function buildURI_OPD(selectedCriterias, selectedLocation, filterCriteria, doctor_name, hospital_name) {
    let specialization_ids = selectedCriterias
        .filter((x) => {
            return x.type == "speciality"
        }).map((x) => {
            return x.id
        }).join(',')

    let condition_ids = selectedCriterias
        .filter((x) => {
            return x.type == "condition"
        }).map((x) => {
            return x.id
        }).join(',')


    let lat = 28.644800
    let long = 77.216721
    let place_id = ""

    if (selectedLocation) {
        place_id = selectedLocation.place_id || ""
        lat = selectedLocation.geometry.location.lat
        long = selectedLocation.geometry.location.lng
        if (typeof lat === 'function') lat = lat()
        if (typeof long === 'function') long = long()

        lat = parseFloat(parseFloat(lat).toFixed(6))
        long = parseFloat(parseFloat(long).toFixed(6))
    }

    let min_fees = filterCriteria.priceRange[0]
    let max_fees = filterCriteria.priceRange[1]
    let min_distance = filterCriteria.distanceRange[0]
    let max_distance = filterCriteria.distanceRange[1]
    let sort_on = filterCriteria.sort_on || ""
    let is_available = filterCriteria.is_available
    let is_female = filterCriteria.is_female

    let url = `/opd/searchresults?specializations=${specialization_ids}&conditions=${condition_ids}&lat=${lat}&long=${long}&min_fees=${min_fees}&max_fees=${max_fees}&min_distance=${min_distance}&max_distance=${max_distance}&sort_on=${sort_on}&is_available=${is_available}&is_female=${is_female}&doctor_name=${doctor_name}&hospital_name=${hospital_name}&place_id=${place_id}`

    return url
}

export function buildURI_LAB(selectedCriterias, selectedLocation, filterCriteria, lab_name) {
    let specialization_ids = selectedCriterias
        .filter((x) => {
            return x.type == "test"
        })
        .map((x) => {
            return x.id
        }).join(',')

    let lat = 28.644800
    let long = 77.216721
    let place_id = ""

    if (selectedLocation) {
        place_id = selectedLocation.place_id
        lat = selectedLocation.geometry.location.lat
        long = selectedLocation.geometry.location.lng
        if (typeof lat === 'function') lat = lat()
        if (typeof long === 'function') long = long()

        lat = parseFloat(parseFloat(lat).toFixed(6))
        long = parseFloat(parseFloat(long).toFixed(6))
    }

    let min_distance = filterCriteria.distanceRange[0]
    let max_distance = filterCriteria.distanceRange[1]
    let min_price = filterCriteria.priceRange[0]
    let max_price = filterCriteria.priceRange[1]
    let sort_on = filterCriteria.sort_on || ""

    let data = {
        'Category': 'ConsumerApp', 'Action': 'ShowLabsClicked', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'show-labs-clicked'
    }
    GTM.sendEvent({ data: data })

    let url = `/lab/searchresults?test_ids=${specialization_ids}&min_distance=${min_distance}&lat=${lat}&long=${long}&min_price=${min_price}&max_price=${max_price}&sort_on=${sort_on}&max_distance=${max_distance}&lab_name=${lab_name}&place_id=${place_id}`

    return url
}