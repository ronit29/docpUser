import React from 'react'
import HospitalCard from './HospitalCard.js'

class HospitalListView extends React.Component {

	getCostEstimateClicked(hospitalId){

      this.props.history.push(`/ipd/${this.props.ipd_id}/${hospitalId}/getPriceEstimate`)
   	}

   	getHospitalDetailPage(hospitalId){
   		this.props.history.push(`/ipd/hospital/${hospitalId}`)	
   	}

	render(){
		let { hospitalList } = this.props
		return(
			<div>
				{
					hospitalList && hospitalList.result?
					hospitalList.result.map((hospital, i) => {
						return <HospitalCard key={i} data={hospital} getCostEstimateClicked={this.getCostEstimateClicked.bind(this)} getHospitalDetailPage={this.getHospitalDetailPage.bind(this)}/>
					})
					:''
				}
			</div>	
           
			)
	}
}

export default HospitalListView