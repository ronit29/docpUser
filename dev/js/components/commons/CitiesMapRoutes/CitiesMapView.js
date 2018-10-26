import React from 'react'


class CitiesMap extends React.Component {

	componentDidMount(){

		this.props.getCitiesMap()
	}

	render(){

		return(
			<div className="col-12 col-md-7 col-lg-7 center-column">
			{
				this.props.citiesMap?
				this.props.citiesMap.map((city, i) => {
					return <a className="anchor-data-style" key= {i} href={`/city-inventory/${city.toLowerCase()}`} onClick={(e) => {
                    e.preventDefault();
                    this.props.history.push(`/city-inventory/${city.toLowerCase()}`) }} >{city}</a>
				})
				:''
			}

			</div>
			)
	}
}

export default CitiesMap