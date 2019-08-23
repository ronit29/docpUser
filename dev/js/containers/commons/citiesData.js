import React from 'react'
import {connect} from 'react-redux'

import { citiesData} from '../../actions/index.js'

class CitiesData extends React.Component{

	componentDidMount() {
		let data=[
		{'id':1,'city_name':'delhi'},
		{'id':2,'city_name':'hyderabad'},
		{'id':3,'city_name':'gurgaon'}
		]
        this.props.citiesData(data)
    }

	render(){
		return(
			<div></div>
		)
	}
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        citiesData: (criteria) => dispatch(citiesData(criteria))
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(CitiesData)