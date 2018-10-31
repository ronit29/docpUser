import React from 'react'
import { connect } from 'react-redux'
import CitiesMapRoutes from '../../components/commons/CitiesMapRoutes'
import { setFetchResults, getCitiesMap, getSpecialitiesMap } from '../../actions/index.js'

class CitiesMap extends React.Component {

	static loadData(store, match, query) {
		let city = match.params.city
		if (city) {
			return store.dispatch(getCitiesMap(city))
		} else {
			return store.dispatch(getCitiesMap())
		}

	}

	static contextTypes = {
		router: () => null
	}

	componentDidMount() {
		setTimeout(() => {
			this.props.setFetchResults(true)
		}, 1000)
	}

	render() {

		return (
			<CitiesMapRoutes {...this.props} />
		)
	}
}

const mapStateToProps = (state) => {
	const {
		citiesMap,
		citiesMapSpecialities,
		specialitiesMap,
		specialitiesMapCities
	} = state.SITE_MAP

	return {
		citiesMap,
		citiesMapSpecialities,
		specialitiesMap,
		specialitiesMapCities
	}
}


const mapDispatchToProps = (dispatch) => {

	return {
		getCitiesMap: (city) => dispatch(getCitiesMap(city)),
		getSpecialitiesMap: (speciality) => dispatch(getCitiesMap(speciality)),
		setFetchResults: (status) => dispatch(setFetchResults(status))
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(CitiesMap)