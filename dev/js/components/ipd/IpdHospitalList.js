import React from 'react'
import HospitalCard from './HospitalCard.js'

class IpdHospitalListView extends React.Component {

	getCostEstimateClicked(hospitalId){

      this.props.history.push(`/ipd/${this.props.match.params.id}/${hospitalId}/getPriceEstimate`)
   	}

	render(){
		let { hospital_list, HOSPITAL_DATA } = this.props
		return(
			<div>
				{
					hospital_list.length?
					hospital_list.map((hospitalId, i) => {
						if(HOSPITAL_DATA[hospitalId]){
							return <HospitalCard key={i} data={HOSPITAL_DATA[hospitalId]} getCostEstimateClicked={this.getCostEstimateClicked.bind(this)}/>	
						}
					})
					:''
				}
			</div>	
           
			)
	}
}

export default IpdHospitalListView