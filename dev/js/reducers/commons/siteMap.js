import { GET_CITIES_MAP, GET_CITIES_SPECIALITIES, GET_SPECIALITIES_CITIES, GET_SPECIALITIES_MAP, GET_TESTS_ALPHABETICALLY, GET_TESTS_FLAG, GET_INSURANCE_NETWORK, SET_NETWORK_TYPE, START_FETCHING_IPD_LIST, GET_IPD_ALPHABETICALLY } from '../../constants/types';

const defaultState = {
	citiesMap: [],
	citiesMapSpecialities: {},
	specialitiesMap: [],
	specialitiesMapCities: {},
	alphabeticalTests: [],
	insuranceNetwork: [],
	networkType: 'doctor',
	testIndexLoading: true,
	alphabeticalIpdTests: [],
	selectedIpdListAlphabet: '',
	ipdIndexLoading: true
}

export default function (state = defaultState, action) {

	switch (action.type) {

		case GET_CITIES_MAP: {

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

		case GET_SPECIALITIES_MAP: {

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

		case GET_TESTS_FLAG: {
			let newState = {
				...state
			}
			newState.testIndexLoading = action.flag
			return newState
		}

		case GET_TESTS_ALPHABETICALLY: {
			let newState = {
				...state
			}
			newState.alphabeticalTests = action.payload
			newState.selectedAlphabet = action.payload.key
			newState.testIndexLoading = action.flag
			return newState
		}

		case GET_INSURANCE_NETWORK: {
			let newState = {
				...state
			}
			newState.insuranceNetwork = action.payload
			newState.inputString = action.payload.starts_with
			return newState
		}

		case SET_NETWORK_TYPE: {
			let newState = {
				...state
			}
			newState.networkType = action.payload
			return newState
		}

		case START_FETCHING_IPD_LIST: {
			let newState = {
				...state
			}
			newState.ipdIndexLoading = action.flag
			return newState
		}

		case GET_IPD_ALPHABETICALLY: {
			let newState = {
				...state
			}
			newState.alphabeticalIpdTests = action.payload
			newState.selectedIpdListAlphabet = action.character
			newState.ipdIndexLoading = action.flag
			return newState
		}
	}
	return state
}