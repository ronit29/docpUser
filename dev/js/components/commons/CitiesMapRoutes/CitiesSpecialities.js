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
			<div>
				<div className="fw-500 sitemap-title">{this.props.match.params.city}</div>
				<div className="row sitemap-row">
					{
						this.props.citiesMapSpecialities.specialization_city_urls && this.props.citiesMapSpecialities.specialization_city_urls.length ?
							this.props.citiesMapSpecialities.specialization_city_urls.map((city, i) => {
								let style = {}
								if (!this.state.showMore && i >= 20) {
									style = { display: 'none' }
								}
								return <div style={style} className="col-12 col-md-6 tests-brdr-btm" key={i} onClick={() => { this.props.history.push(`/${city.url}`) }}>
									<div className="anchor-data-style">
										<a href={`/${city.url}`} onClick={(e) => { e.preventDefault() }}>{`${city.title}`}</a>
										<span className="sitemap-count">{`(${city.count})`}</span>
									</div>
								</div>
							})
							: <p>No Data Found</p>
					}

					{
						!this.state.showMore && this.props.citiesMapSpecialities.specialization_city_urls && this.props.citiesMapSpecialities.specialization_city_urls.length >= 20 ?
							<div className="col-12 text-center mrt-20">
								<button className="sitemap-show-more" onClick={() => { this.setState({ showMore: true }) }}>Show More</button>
							</div>
							: ''
					}
				</div>
			</div>
		)
	}
}

export default CitiesSpecialitiesView