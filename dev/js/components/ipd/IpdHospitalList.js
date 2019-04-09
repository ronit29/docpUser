import React from 'react'
import HospitalCard from './HospitalCard.js'
import GTM from '../../helpers/gtm.js'
import InfiniteScroll from 'react-infinite-scroller';
import Loader from '../commons/Loader'

class IpdHospitalListView extends React.Component {

	constructor(props){
      super(props)
      this.state = {
         toggleFilterPopup: false,
         health_insurance_provider: [],
         hasMore: true,
         loading: false,
         page: 2
      }
   	}

   	toggleProviderFilter(data=[]){

   		this.setState({toggleFilterPopup: !this.state.toggleFilterPopup, health_insurance_provider: data})
   	}

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

   	loadMore(page) {
        this.setState({ hasMore: false, loading: true })
        this.props.getIpdHospitalList(null, this.state.page, (hasMore) => {
            this.setState({ loading: false, page: page + 1 })
            setTimeout(() => {
                this.setState({ hasMore })
            }, 1000)
        })

    }

	render(){
		let { hospital_list, HOSPITAL_DATA } = this.props
		return(
			<div>
				{
					hospital_list.length?
					<InfiniteScroll
                        pageStart={this.state.page}
                        loadMore={this.loadMore.bind(this)}
                        hasMore={this.state.hasMore}
                        useWindow={true}
                        initialLoad={false}
                    >
                    {
						hospital_list.map((hospitalId, i) => {
							if(HOSPITAL_DATA[hospitalId]){
								return <HospitalCard key={i} data={HOSPITAL_DATA[hospitalId]} getCostEstimateClicked={this.getCostEstimateClicked.bind(this)} getHospitalDetailPage={this.getHospitalDetailPage.bind(this)} toggleProviderFilter={this.toggleProviderFilter.bind(this)}/>	
							}
						})
					}
					</InfiniteScroll>
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
		        {this.state.loading ? <Loader classType="loaderPagination" /> : ""}
			</div>	
           
			)
	}
}

export default IpdHospitalListView