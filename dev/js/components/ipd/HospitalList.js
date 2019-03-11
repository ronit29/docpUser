import React from 'react'
import HospitalCard from './HospitalCard.js'

class HospitalListView extends React.Component {

	getCostEstimateClicked(hospitalId){
		if(this.props.commonSelectedCriterias.length){
			let ipd_id = this.props.commonSelectedCriterias[0].id
			this.props.history.push(`/ipd/${ipd_id}/${hospitalId}/getPriceEstimate`)		
		}
      
   	}

   	getHospitalDetailPage(hospitalId){
   		this.props.history.push(`/ipd/hospital/${hospitalId}`)	
   	}

	render(){
		let { hospitalList, ipd_info } = this.props
		return(
			<div>
				{
					ipd_info && ipd_info.about && ipd_info.about.name?
					<h4 className="section-heading">{`Top Hospitals for ${ipd_info.about.name} `}</h4>
					:''	
				}
				
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