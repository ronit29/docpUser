import React from 'react'
import HospitalCard from './HospitalCard.js'
import GTM from '../../helpers/gtm.js'

class IpdHospitalListView extends React.Component {

	getCostEstimateClicked(hospitalId){
		if(this.props.commonSelectedCriterias && this.props.commonSelectedCriterias.length){
			let ipd_id = this.props.commonSelectedCriterias[0].id
		
			let gtmData = {
		    	'Category': 'ConsumerApp', 'Action': 'IpdGetCostEstimateClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-get-cost-estimate-clicked', selectedId: ipd_id || '', hospitalId: hospitalId || ''
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