import React from 'react'

class CitiesSpecialitiesView extends React.Component {

	componentDidMount() {

		let city = this.props.match.params.city
		this.props.getCitiesMap(city)
	}

	render() {

		return (
			<div>
				{
					this.props.citiesMapSpecialities.specialization_city_urls ?
						this.props.citiesMapSpecialities.specialization_city_urls.map((city, i) => {
							return <div className="anchor-data-style" key={i} onClick={() => { this.props.history.push(`/${city.url}`) }} style={{paddingRight: 50}} >
								<a href={`/${city.url}`} onClick={(e) => { e.preventDefault() }}>{`${city.title}`}</a>
								<span className="sitemap-count">{`(${city.count})`}</span>
							</div>
						})
						: ''
				}
			</div>
		)
	}
}

export default CitiesSpecialitiesView