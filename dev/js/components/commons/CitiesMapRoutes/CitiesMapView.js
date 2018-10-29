import React from 'react'


class CitiesMap extends React.Component {

	componentDidMount() {

		this.props.getCitiesMap()
	}

	render() {

		return (
			<div className="row sitemap-row">
				{
					this.props.citiesMap ?
						this.props.citiesMap.map((city, i) => {
							return <div className="col-12 col-md-6" key={i} onClick={() => { this.props.history.push(`/city-inventory/${city.toLowerCase()}`) }}>
								<div className="anchor-data-style">
									<a href={`/city-inventory/${city.toLowerCase()}`} onClick={(e) => { e.preventDefault(); }}>{city}</a>
									<span className="sitemap-right-arrow">
										<img src="/assets/img/customer-icons/arrow-forward-right.svg" />
									</span>
								</div>
							</div>
						})
						: ''
				}
			</div>
		)
	}
}

export default CitiesMap