import React from 'react'
import HospitalCard from './HospitalCard.js'

class HospitalList extends React.Component {

	getCostEstimateClicked(hospitalId){

      this.props.history.push(`/ipd/${this.props.ipd_info.about.id}/${hospitalId}/getPriceEstimate`)
   	}

	render(){
		let { ipd_info } = this.props
		return(
			<div>
				{
					ipd_info && ipd_info.hospitals && ipd_info.hospitals.result?
					ipd_info.hospitals.result.map((hospital, i) => {
						return <HospitalCard key={i} data={hospital} getCostEstimateClicked={this.getCostEstimateClicked.bind(this)}/>
					})
					:''
				}

				{
					ipd_info && ipd_info.hospitals && ipd_info.hospitals.result?
					ipd_info.hospitals.result.map((hospital, i) => {
						return <HospitalCard key={i} data={hospital} getCostEstimateClicked={this.getCostEstimateClicked.bind(this)}/>
					})
					:''
				}
			</div>	
           
			)
	}
}

export default HospitalList