import React from 'react'
import HospitalCard from './HospitalCard.js'

class IpdHospitalListView extends React.Component {

	getCostEstimateClicked(hospitalId){
		if(this.props.commonSelectedCriterias && this.props.commonSelectedCriterias.length){
			let ipd_id = this.props.commonSelectedCriterias[0].id
			this.props.history.push(`/ipd/${ipd_id}/${hospitalId}/getPriceEstimate`)
		}
      
   	}

   	getHospitalDetailPage(hospitalId){
   		this.props.history.push(`/ipd/hospital/${hospitalId}`)
   	}

	render(){
		let { hospital_list, HOSPITAL_DATA } = this.props
		return(
			<div>
				{
					hospital_list.length?
					hospital_list.map((hospitalId, i) => {
						if(HOSPITAL_DATA[hospitalId]){
							return <HospitalCard key={i} data={HOSPITAL_DATA[hospitalId]} getCostEstimateClicked={this.getCostEstimateClicked.bind(this)} getHospitalDetailPage={this.getHospitalDetailPage.bind(this)}/>	
						}
					})
					:''
				}
			</div>	
           
			)
	}
}

export default IpdHospitalListView