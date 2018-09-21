function getLocationParam(props, tag) {
    // this API assumes the context of react-router-4
    const paramString = props.location.search
    const params = new URLSearchParams(paramString)
    return params.get(tag)
}

const NAVIGATE = {
    navigateTo: (where) => {
        if (window) {
            let no_reload = getLocationParam(window, 'ref')
            if (where == '/') {
                if (!no_reload) {
                    // add nr to check and stop recursive reloads
                    window.location.href = where + "?ref=nr"
                }
            } else {
                window.location.href = where
            }
        }
    },

    /**
     * Check if the component is required to fetch new data from server, or just use the exisitng one. 
     */
    refreshLabSearchResults: (props) => {
        let lat = getLocationParam(props, 'lat') || null
        let long = getLocationParam(props, 'long') || null
        let place_id = getLocationParam(props, 'place_id') || ""

        let oldLocation = null
        if (lat || place_id) {
            oldLocation = {
                lat, long, place_id
            }
        }

        if (!!!oldLocation) {
            return true
        }

        let new_lat = null
        if (props.selectedLocation && props.selectedLocation.geometry) {
            new_lat = props.selectedLocation.geometry.location.lat
            if (typeof new_lat === 'function') new_lat = new_lat()
            new_lat = parseFloat(parseFloat(new_lat).toFixed(6))
        }

        if (oldLocation && oldLocation.lat && new_lat && oldLocation.lat != new_lat) {
            return true
        }

        let noResulsFound = props.labList.filter(x => props.LABS[x]) < 10

        if (props.history.action === 'PUSH' || noResulsFound || props.SET_FROM_SERVER) {
            return true
        }

        return false
    },

    /**
     * Check if the component is required to fetch new data from server, or just use the exisitng one. 
     */
    refreshDoctorSearchResults: (props) => {
        let lat = getLocationParam(props, 'lat') || null
        let long = getLocationParam(props, 'long') || null
        let place_id = getLocationParam(props, 'place_id') || ""

        let oldLocation = null
        if (lat || place_id) {
            oldLocation = {
                lat, long, place_id
            }
        }

        if (!!!oldLocation) {
            return true
        }

        let new_lat = null
        if (props.selectedLocation && props.selectedLocation.geometry) {
            new_lat = props.selectedLocation.geometry.location.lat
            if (typeof new_lat === 'function') new_lat = new_lat()
            new_lat = parseFloat(parseFloat(new_lat).toFixed(6))
        }

        if (oldLocation && oldLocation.lat && new_lat && oldLocation.lat != new_lat) {
            return true
        }

        let noResulsFound = props.doctorList.filter(x => props.DOCTORS[x]) < 10

        if (props.history.action === 'PUSH' || noResulsFound || props.SET_FROM_SERVER) {
            return true
        }

        return false
    }
}

export default NAVIGATE