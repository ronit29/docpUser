import React from 'react'


class CitiesMap extends React.Component {

	constructor(props) {
		super(props)
		this.state = { showMore: false }
	}

	componentDidMount() {
		this.props.getCitiesMap()
	}

	render() {

		return (
			<div>
				<div className="fw-500 sitemap-title">All Cities</div>
				<div className="row sitemap-row">
					{
						this.props.citiesMap && this.props.citiesMap.length ?
							this.props.citiesMap.map((city, i) => {
								let style = {}
								if (!this.state.showMore && i >= 20) {
									style = { display: 'none' }
								}
								return <div style={style} className="col-12 col-md-6 col-lg-4 tests-brdr-btm" key={i} onClick={() => { this.props.history.push(`/city-inventory/${city.toLowerCase()}`) }}>
									<div className="anchor-data-style">
										<a href={`/city-inventory/${city.toLowerCase()}`} onClick={(e) => { e.preventDefault(); }}>{city}</a>
										<span className="sitemap-right-arrow">
											<img src={ASSETS_BASE_URL + "/img/customer-icons/arrow-forward-right.svg"} />
										</span>
									</div>
								</div>
							})
							: <p>No Data Found</p>
					}
					{
						!this.state.showMore && this.props.citiesMap && this.props.citiesMap.length >= 20 ?
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

export default CitiesMap