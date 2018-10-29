import React from 'react'


class CitiesMap extends React.Component {

	componentDidMount() {

		this.props.getCitiesMap()
	}

	render() {

		return (
			<div className="col-12 col-md-7 col-lg-7 center-column">
				{
					this.props.citiesMap ?
						this.props.citiesMap.map((city, i) => {
							return <div className="anchor-data-style" key={i} onClick={() => { this.props.history.push(`/city-inventory/${city.toLowerCase()}`) }}>
								<a href={`/city-inventory/${city.toLowerCase()}`} onClick={(e) => { e.preventDefault(); }}>{city}</a>
								<span className="sitemap-right-arrow">
									<img src="/assets/img/customer-icons/arrow-forward-right.svg" />
								</span>
							</div>
						})
						: ''
				}

			</div>
		)
	}
}

export default CitiesMap