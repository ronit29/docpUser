import React from 'react'


class SpecialitiesMap extends React.Component {

	constructor(props){
		super(props)
		this.state = {showMore: false}
	}

	componentDidMount(){

		this.props.getSpecialitiesMap()
	}

	render(){

		return(
			<div className="col-12 col-md-7 col-lg-7 center-column">
			{
				this.props.specialitiesMap.specialization_inventory && this.props.specialitiesMap.specialization_inventory.length?
				this.props.specialitiesMap.specialization_inventory.slice(0,20).map((city, i) => {
					return <div key= {i} className="anchor-data-style">
							<a href={`/speciality-inventory/${city.id}`} onClick={(e) => {
		                    e.preventDefault();
		                    this.props.history.push(`/speciality-inventory/${city.id}`) }} >{city.specialization}</a>
		                    <span className="sitemap-right-arrow">
								<img src={ASSETS_BASE_URL+ "/img/customer-icons/arrow-forward-right.svg"} />
							</span>
						</div>
				})
				:<p>No Data Found</p>
			}
			{
				this.props.specialitiesMap.specialization_inventory && this.state.showMore && this.props.specialitiesMap.specialization_inventory.length>20 ?
				this.props.specialitiesMap.specialization_inventory.slice(20).map((city, i) => {
					return <div key= {i} className="anchor-data-style">
						<a href={`/speciality-inventory/${city.id}`} onClick={(e) => {
	                    e.preventDefault();
	                    this.props.history.push(`/speciality-inventory/${city.id}`) }} >{city.specialization}</a>
	                    <span className="sitemap-right-arrow">
								<img src={ASSETS_BASE_URL+ "/img/customer-icons/arrow-forward-right.svg"} />
							</span>
	                  </div>
				})
				:''
			}
			{
				!this.state.showMore && this.props.specialitiesMap.specialization_inventory && this.props.specialitiesMap.specialization_inventory.length >= 20?
				<span onClick={()=>{ this.setState({showMore: true }) }}>Show More </span>
				:''
			}

			</div>
			)
	}
}

export default SpecialitiesMap