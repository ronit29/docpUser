import React from 'react'


class CitiesMap extends React.Component {

	constructor(props){
		super(props)
		this.state = {showMore: false}
	}

	componentDidMount() {

		this.props.getCitiesMap()
	}

	render() {

		return (
			<div className="row sitemap-row">
				{
					this.props.citiesMap && this.props.citiesMap.length?
						this.props.citiesMap.slice(0,20).map((city, i) => {
							return <div className="anchor-data-style" key={i} onClick={() => { this.props.history.push(`/city-inventory/${city.toLowerCase()}`) }}>
								<a href={`/city-inventory/${city.toLowerCase()}`} onClick={(e) => { e.preventDefault(); }}>{city}</a>
								<span className="sitemap-right-arrow">
									<img src={ASSETS_BASE_URL+ "/img/customer-icons/arrow-forward-right.svg"} />
								</span>
							</div>
						})
						: <p>No Data Found</p>
				}
				{
					this.props.citiesMap && this.state.showMore && this.props.citiesMap.length >= 20?
						this.props.citiesMap.slice(20).map((city, i) => {
							return <div className="anchor-data-style" key={i} onClick={() => { this.props.history.push(`/city-inventory/${city.toLowerCase()}`) }}>
								<a href={`/city-inventory/${city.toLowerCase()}`} onClick={(e) => { e.preventDefault(); }}>{city}</a>
								<span className="sitemap-right-arrow">
									<img src={ASSETS_BASE_URL+ "/img/customer-icons/arrow-forward-right.svg"} />
								</span>
							</div>
						})
						: ''
				}
				{
					!this.state.showMore && this.props.citiesMap && this.props.citiesMap.length >= 20?
					<span onClick={()=>{ this.setState({showMore: true }) }}>Show More </span>
					:''
				}
			</div>
		)
	}
}

export default CitiesMap