import React from 'react'
import HospitalCard from './HospitalCard.js'

class HospitalListView extends React.Component {

	getCostEstimateClicked(hospitalId){

      this.props.history.push(`/ipd/${this.props.match.params.id}/${hospitalId}/getPriceEstimate`)
   	}

	render(){
		let { hospitalList } = this.props
		return(
			<div>
				{
					hospitalList && hospitalList.result?
					hospitalList.result.map((hospital, i) => {
						return <HospitalCard key={i} data={hospital} getCostEstimateClicked={this.getCostEstimateClicked.bind(this)}/>
					})
					:''
				}
			</div>	
           
			)
	}
}

export default HospitalListView