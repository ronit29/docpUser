import React from 'react'
import HospitalCard from './HospitalCard.js'
import GTM from '../../helpers/gtm.js'

class HospitalListView extends React.Component {

	getCostEstimateClicked(hospitalId){
		if(this.props.commonSelectedCriterias.length){
			let ipd_id = this.props.commonSelectedCriterias[0].id

			let gtmData = {
		    	'Category': 'ConsumerApp', 'Action': 'IpdGetCostEstimateClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-get-cost-estimate-clicked', 'selectedId': ipd_id || '', 'hospitalId': hospitalId
			}
			GTM.sendEvent({ data: gtmData })			
			this.props.history.push(`/ipd/${ipd_id}/getPriceEstimate?hospital_id=${hospitalId}`)		
		}
      
   	}

   	getHospitalDetailPage(hospitalId){
   		let gtmData = {
            'Category': 'ConsumerApp', 'Action': 'HospitalDetailClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'hospital-detail-clicked', 'selectedId': hospitalId || ''
        }
        GTM.sendEvent({ data: gtmData })
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