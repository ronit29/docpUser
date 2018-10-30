import { GET_CITIES_MAP, GET_CITIES_SPECIALITIES , GET_SPECIALITIES_CITIES, GET_SPECIALITIES_MAP} from '../../constants/types';

const defaultState = {
	citiesMap: [],
	citiesMapSpecialities: {},
	specialitiesMap: [],
	specialitiesMapCities: {}
}

export default function (state = defaultState, action) {

	switch (action.type) {

		case GET_CITIES_MAP : {

			let newState = {
				...state
			}

			newState.citiesMap = action.payload
			return newState
		}

		case GET_CITIES_SPECIALITIES: {
			let newState = {
				...state
			}
			newState.citiesMapSpecialities = action.payload
			return newState
		}

		case GET_SPECIALITIES_MAP : {

			let newState = {
				...state
			}

			newState.specialitiesMap = action.payload
			return newState
		}

		case GET_SPECIALITIES_CITIES: {
			let newState = {
				...state
			}
			newState.specialitiesMapCities = action.payload
			return newState
		}
	}
	return state
}