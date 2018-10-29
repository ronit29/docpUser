import React from 'react'

class CitiesSpecialitiesView extends React.Component {

	constructor(props){
		super(props)
		this.state = {showMore: false}
	}

	componentDidMount() {

		let city = this.props.match.params.city
		this.props.getCitiesMap(city)
	}

	render() {

		return (
			<div>
				{
					this.props.citiesMapSpecialities.specialization_city_urls && this.props.citiesMapSpecialities.specialization_city_urls.length ?
						this.props.citiesMapSpecialities.specialization_city_urls.slice(0,20).map((city, i) => {
							return <div className="anchor-data-style" key={i} onClick={() => { this.props.history.push(`/${city.url}`) }} style={{paddingRight: 50}} >
								<a href={`/${city.url}`} onClick={(e) => { e.preventDefault() }}>{`${city.title}`}</a>
								<span className="sitemap-count">{`(${city.count})`}</span>
							</div>
						})
						: ''
				}

				{
					this.props.citiesMapSpecialities.specialization_city_urls && this.props.citiesMapSpecialities.specialization_city_urls.length?
						this.props.citiesMapSpecialities.specialization_city_urls.slice(20).map((city, i) => {
							return <div className="anchor-data-style" key={i} onClick={() => { this.props.history.push(`/${city.url}`) }} style={{paddingRight: 50}} >
								<a href={`/${city.url}`} onClick={(e) => { e.preventDefault() }}>{`${city.title}`}</a>
								<span className="sitemap-count">{`(${city.count})`}</span>
							</div>
						})
						: ''
				}

				{
					!this.state.showMore && this.props.citiesMapSpecialities.specialization_city_urls && this.props.citiesMapSpecialities.specialization_city_urls.length >= 20?
					<span onClick={()=>{ this.setState({showMore: true }) }}>Show More </span>
					:''
				}
			</div>
		)
	}
}

export default CitiesSpecialitiesView