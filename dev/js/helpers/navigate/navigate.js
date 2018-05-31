function getLocationParam(props, tag) {
    // this API assumes the context of react-router-4
    const paramString = props.location.search
    const params = new URLSearchParams(paramString)
    return params.get(tag)
}

const NAVIGATE = {
    navigateTo: (where) => {
        window.location.href = where
    },

    refreshLabSearchResults: (props) => {
        let searchState = getLocationParam(props, 'search')
        searchState = JSON.parse(searchState)
        let oldLocation = searchState.selectedLocation

        if (oldLocation && oldLocation.place_id && props.selectedLocation && oldLocation.place_id != props.selectedLocation.place_id) {
            return true
        }

        let noResulsFound = props.labList.length == 0

        if (props.history.action === 'PUSH' || noResulsFound) {
            return true
        }

        return false
    },

    refreshDoctorSearchResults: (props) => {
        let searchState = getLocationParam(props, 'search')
        searchState = JSON.parse(searchState)
        let oldLocation = searchState.selectedLocation

        if (oldLocation && oldLocation.place_id && props.selectedLocation && oldLocation.place_id != props.selectedLocation.place_id) {
            return true
        }

        let noResulsFound = props.doctorList.length == 0

        if (props.history.action === 'PUSH' || noResulsFound) {
            return true
        }

        return false
    }
}

export default NAVIGATE