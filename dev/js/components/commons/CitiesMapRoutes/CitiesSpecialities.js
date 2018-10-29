import React from 'react'

class CitiesSpecialitiesView extends React.Component {

	constructor(props) {
		super(props)
		this.state = { showMore: false }
	}

	componentDidMount() {

		let city = this.props.match.params.city
		this.props.getCitiesMap(city)
	}

	render() {

		return (
			<div className="row sitemap-row">
				{
					this.props.citiesMapSpecialities.specialization_city_urls && this.props.citiesMapSpecialities.specialization_city_urls.length ?
						this.props.citiesMapSpecialities.specialization_city_urls.slice(0, 20).map((city, i) => {
							return <div className="col-12 col-md-6" key={i} onClick={() => { this.props.history.push(`/${city.url}`) }}>
								<div className="anchor-data-style">
									<a href={`/${city.url}`} onClick={(e) => { e.preventDefault() }}>{`${city.title}`}</a>
									<span className="sitemap-count">{`(${city.count})`}</span>
								</div>
							</div>
						})
						: ''
				}

				{
					this.props.citiesMapSpecialities.specialization_city_urls && this.props.citiesMapSpecialities.specialization_city_urls.length ?
						this.props.citiesMapSpecialities.specialization_city_urls.slice(20).map((city, i) => {
							return <div className="col-12 col-md-6" key={i} onClick={() => { this.props.history.push(`/${city.url}`) }}>
								<div className="anchor-data-style">
									<a href={`/${city.url}`} onClick={(e) => { e.preventDefault() }}>{`${city.title}`}</a>
									<span className="sitemap-count">{`(${city.count})`}</span>
								</div>
							</div>
						})
						: ''
				}

				{
					!this.state.showMore && this.props.citiesMapSpecialities.specialization_city_urls && this.props.citiesMapSpecialities.specialization_city_urls.length >= 20 ?
						<div className="col-12 text-center mrt-20">
							<button className="sitemap-show-more" onClick={() => { this.setState({ showMore: true }) }}>Show More</button>
						</div>
						: ''
				}
			</div>
		)
	}
}

export default CitiesSpecialitiesView