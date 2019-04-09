import React from 'react'
import HospitalCard from './HospitalCard.js'
import GTM from '../../helpers/gtm.js'

class HospitalListView extends React.Component {

	constructor(props){
      super(props)
      this.state = {
         toggleFilterPopup: false,
         health_insurance_provider: []
      }
   	}

   	toggleProviderFilter(data=[]){

   		this.setState({toggleFilterPopup: !this.state.toggleFilterPopup, health_insurance_provider: data})
   	}

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
					<h2 className="section-heading">{`Top Hospitals for ${ipd_info.about.name} ${this.props.selectedLocation && this.props.selectedLocation.locality?`in ${this.props.selectedLocation.locality}`:''}`}</h2>
					:''	
				}
				
				{
					hospitalList && hospitalList.result?
					hospitalList.result.map((hospital, i) => {
						return <HospitalCard key={i} data={hospital} getCostEstimateClicked={this.getCostEstimateClicked.bind(this)} getHospitalDetailPage={this.getHospitalDetailPage.bind(this)} toggleProviderFilter={this.toggleProviderFilter.bind(this)}/>
					})
					:''
				}

				{
		        	this.state.toggleFilterPopup?
		        	<div className="ipd-section">
			        	<div className="custom-overlay" onClick={this.toggleProviderFilter.bind(this)}></div>
	                    <div className="custom-popup hlth-ins-pop ins-pop">
	                       <div className="cross-btn"><img src="https://cdn.docprime.com/cp/assets/img/icons/close.png" alt="" onClick={this.toggleProviderFilter.bind(this)}/></div>
	                       {
		                       	this.state.health_insurance_provider.length?
		                       	<div className="pop-head text-center">Health Insurance Providers</div>
		                       	:''
		                       		
	                       }
	                       
	                       {
	                       	this.state.health_insurance_provider.length?
	                       	<div className="ins-listing">
	                          <div className="pop-head">Health Insurance Providers</div>
	                          <ul className="range-slider-ul">
	                       			{
				                    	this.state.health_insurance_provider.map((provider, i) => {

			                       				return <li key={i}>{provider}
					                            </li>

			                       			})
			                    	}          
		                       </ul>
		                    </div>
		                    :''
	                       }
	                    </div>
                    </div>
                    :''
		        }
			</div>	
           
			)
	}
}

export default HospitalListView