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
        let searchState = getLocationParam(props, 'search')
        searchState = JSON.parse(searchState)
        let oldLocation = searchState.selectedLocation

        if (oldLocation && oldLocation.place_id && props.selectedLocation && oldLocation.place_id != props.selectedLocation.place_id) {
            return true
        }

        let noResulsFound = props.labList.filter(x => props.LABS[x]) < 10

        if (props.history.action === 'PUSH' || noResulsFound) {
            return true
        }

        return false
    },

    /**
     * Check if the component is required to fetch new data from server, or just use the exisitng one. 
     */
    refreshDoctorSearchResults: (props) => {
        let searchState = getLocationParam(props, 'search')
        searchState = JSON.parse(searchState)
        let oldLocation = searchState.selectedLocation

        if (oldLocation && oldLocation.place_id && props.selectedLocation && oldLocation.place_id != props.selectedLocation.place_id) {
            return true
        }

        let noResulsFound = props.doctorList.filter(x => props.DOCTORS[x]) < 10

        if (props.history.action === 'PUSH' || noResulsFound) {
            return true
        }

        return false
    }
}

export default NAVIGATE