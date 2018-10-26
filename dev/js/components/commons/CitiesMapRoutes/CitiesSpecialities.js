import React from 'react'

class CitiesSpecialitiesView extends React.Component{

	componentDidMount(){

		let city = this.props.match.params.city
		this.props.getCitiesMap(city)
	}

	render(){console.log('cccccccccccccc');console.log(this.props)

		return(
			<div className="col-12 col-md-7 col-lg-7 center-column">
				{
					this.props.citiesMapSpecialities.specialization_city_urls?
					this.props.citiesMapSpecialities.specialization_city_urls.map((city, i) => {
						return <a key= {i} className= "anchor-data-style" href={`/${city.url}`} onClick={(e) => {
	                    e.preventDefault();
	                    this.props.history.push(`/${city.url}`) }} >{`${city.title}(${city.count})`}</a>
					})
					:''
				}
			</div>
			)
	}
}

export default CitiesSpecialitiesView