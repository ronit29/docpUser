import React from 'react'

class CitiesSpecialitiesView extends React.Component {

	componentDidMount() {

		let city = this.props.match.params.city
		this.props.getCitiesMap(city)
	}

	render() {

		return (
			<div className="row sitemap-row">
				{
					this.props.citiesMapSpecialities.specialization_city_urls ?
						this.props.citiesMapSpecialities.specialization_city_urls.map((city, i) => {
							return <div className="col-12 col-md-6" key={i} onClick={() => { this.props.history.push(`/${city.url}`) }} >
								<div className="anchor-data-style">
									<a href={`/${city.url}`} onClick={(e) => { e.preventDefault() }}>{`${city.title}`}</a>
									<span className="sitemap-count">{`(${city.count})`}</span>
								</div>
							</div>
						})
						: ''
				}
			</div>
		)
	}
}

export default CitiesSpecialitiesView