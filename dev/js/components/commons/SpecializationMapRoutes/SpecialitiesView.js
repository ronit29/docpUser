import React from 'react'


class SpecialitiesMap extends React.Component {

	constructor(props) {
		super(props)
		this.state = { showMore: false }
	}

	componentDidMount() {

		this.props.getSpecialitiesMap()
	}

	render() {

		return (
			<div className="row sitemap-row">
				{
					this.props.specialitiesMap.specialization_inventory && this.props.specialitiesMap.specialization_inventory.length ?
						this.props.specialitiesMap.specialization_inventory.slice(0, 20).map((city, i) => {
							return <div key={i} className="col-12 col-md-6 col-lg-4" onClick={() => this.props.history.push(`/speciality-inventory/${city.specialization_id}`)}>
								<div className="anchor-data-style">
									<a href={`/speciality-inventory/${city.specialization_id}`} onClick={(e) => e.preventDefault()} >{city.specialization}</a>
									<span className="sitemap-right-arrow">
										<img src={ASSETS_BASE_URL + "/img/customer-icons/arrow-forward-right.svg"} />
									</span>
								</div>
							</div>
						})
						: <p>No Data Found</p>
				}
				{
					this.props.specialitiesMap.specialization_inventory && this.state.showMore && this.props.specialitiesMap.specialization_inventory.length > 20 ?
						this.props.specialitiesMap.specialization_inventory.slice(20).map((city, i) => {
							return <div key={i} className="col-12 col-md-6 col-lg-4" onClick={() => this.props.history.push(`/speciality-inventory/${city.specialization_id}`)}>
								<div className="anchor-data-style">
									<a href={`/speciality-inventory/${city.specialization_id}`} onClick={(e) => e.preventDefault()} >{city.specialization}</a>
									<span className="sitemap-right-arrow">
										<img src={ASSETS_BASE_URL + "/img/customer-icons/arrow-forward-right.svg"} />
									</span>
								</div>
							</div>
						})
						: ''
				}
				{
					!this.state.showMore && this.props.specialitiesMap.specialization_inventory && this.props.specialitiesMap.specialization_inventory.length >= 20 ?
						<div className="col-12 text-center mrt-20">
							<button className="sitemap-show-more" onClick={() => { this.setState({ showMore: true }) }}>Show More</button>
						</div>
						: ''
				}

			</div>
		)
	}
}

export default SpecialitiesMap