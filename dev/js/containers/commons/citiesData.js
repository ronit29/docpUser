import React from 'react'
import {connect} from 'react-redux'

import { citiesData} from '../../actions/index.js'

class CitiesData extends React.Component{

	componentDidMount() {
        
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