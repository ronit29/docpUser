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
				this.props.specialitiesMap.specialization_inventory?
				this.props.specialitiesMap.specialization_inventory.slice(1,20).map((city, i) => {
					return <a className="anchor-data-style" key= {i} href={`/speciality-inventory/${city.id}`} onClick={(e) => {
                    e.preventDefault();
                    this.props.history.push(`/speciality-inventory/${city.id}`) }} >{city.specialization}</a>
				})
				:''
			}
			{
				this.props.specialitiesMap.specialization_inventory && this.state.showMore && this.props.specialitiesMap.specialization_inventory.length>20 ?
				this.props.specialitiesMap.specialization_inventory.slice(20).map((city, i) => {
					return <a className="anchor-data-style" key= {i} href={`/speciality-inventory/${city.id}`} onClick={(e) => {
                    e.preventDefault();
                    this.props.history.push(`/speciality-inventory/${city.id}`) }} >{city.specialization}</a>
				})
				:''
			}

			</div>
			)
	}
}

export default SpecialitiesMap