import React from 'react'
import ResultCount from './result_count.js'
import Range from 'rc-slider/lib/Range';
const queryString = require('query-string')
import GTM from '../../helpers/gtm.js'

class StickyFilter extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			toggleFilterPopup :false,
			lastSelectedProviderIds: [],
			lastSelectedDistance: [0, 25],
			provider_ids: [],
			distance: [0, 25]
		}
	}

	componentWillReceiveProps(nextProps){
		this.setState({provider_ids: nextProps.filterCriteria.provider_ids, lastSelectedProviderIds: nextProps.filterCriteria.provider_ids, distance: nextProps.filterCriteria.distance, lastSelectedDistance: nextProps.filterCriteria.distance})
	}

	applyFilters(){
		const parsed = queryString.parse(this.props.location.search)
		let filterCriteria =  {
			distance: this.state.distance,
			provider_ids: this.state.provider_ids
		}

		let gtmData = {
            'Category': 'ConsumerApp', 'Action': 'IpdHospitalSearchFilterApplied', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-hospital-search-filter-applied', 'minDistance':this.state.distance[0], 'maxDistance': this.state.distance[1], 'provider_ids': this.state.provider_ids.join(',') 
        }

        GTM.sendEvent({ data: gtmData })

		this.setState({lastSelectedProviderIds: this.state.provider_ids, lastSelectedDistance: this.state.distance})
		let search_id_data = Object.assign({}, this.props.search_id_data)

		if (this.props.search_id_data && this.props.search_id_data[parsed.search_id]) {
            search_id_data[parsed.search_id].filterCriteria = filterCriteria
            search_id_data[parsed.search_id].page = 1
        }

		this.props.mergeIpdCriteria({
			filterCriteria:filterCriteria, search_id_data: search_id_data, page: 1
		})
		setTimeout(()=>{
			this.props.fetchNewResults()
			this.setState({toggleFilterPopup: false})
		},100)
	}

	toggleProviderFilter(id){
		let provider_ids = [] 
		let found = false
		provider_ids = this.state.provider_ids.filter((x) => {
			if(x==id){
				found = true
				return false
			}
			return true
		})

		if(!found){
			provider_ids.push(id)
		}

		this.setState({provider_ids: provider_ids})
	}

	closeFiltersPopUp(){
		this.setState({toggleFilterPopup: false, provider_ids: this.state.lastSelectedProviderIds, distance: this.state.lastSelectedDistance})
	}

	handleRange(type, range) {
        this.setState({
            [type]: range
        })
    }
	render(){
		let seoData = this.props.hospitalSearchSeoData
		let { hospital_search_results } = this.props
		let health_insurance_provider = []

		if(hospital_search_results && hospital_search_results.insurance_providers && hospital_search_results.insurance_providers.length){

			if(hospital_search_results.insurance_providers.length >4 && this.state.showMoreProviders){
				health_insurance_provider = hospital_search_results.insurance_providers
			}else{
				health_insurance_provider = hospital_search_results.insurance_providers.slice(0,3)	
			}
			

		}
		return(
			<div>
			
		        <section className="stick-prnt">
		         <div className="stick-it">
			           <div className="top-filter-tab-container">
			              {/*<div className="top-filter-tabs-select"><img src="https://cdn.docprime.com/cp/assets/img/sort.svg" style={{ width: '18px', marginRight: '5px' }} /><span>Sort</span></div>*/}
			              <div className="top-filter-tabs-select" onClick={()=>{
			              	let gtmData = {
						            'Category': 'ConsumerApp', 'Action': 'IpdHospitalSearchFilterClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-hospital-search-filter-clicked'
						        }
						        GTM.sendEvent({ data: gtmData })

			              	this.setState({toggleFilterPopup: true})
			              }}><img src="https://cdn.docprime.com/cp/assets/img/filter.svg" style={{ width: '18px', marginRight: '5px' }} /><span>Filter</span></div>
			           </div>
		           </div>
		           <ResultCount {...this.props} applyFilters={this.applyFilters.bind(this)} seoData={seoData} lab_card={false} seoFriendly={false}/>
		        </section>

		        {
		        	this.state.toggleFilterPopup?
		        	<div className="ipd-section">
			        	<div className="custom-overlay" onClick={this.closeFiltersPopUp.bind(this)}></div>
	                    <div className="custom-popup hlth-ins-pop">
	                       <div className="cross-btn"><img src="https://cdn.docprime.com/cp/assets/img/icons/close.png" alt="" onClick={this.closeFiltersPopUp.bind(this)}/></div>
	                       <div className="pop-head text-center">Filters</div>
	                       {/*<div className="distance-slider">
	                        <span>Distance</span>
	                        <span className="orng-txt">0 Km to 15 Km</span>
	                       </div>*/}

	                       <div className="widget-content">
                                <div className="filterRow distance-slider-bar">
                                    <span className="tl">Distance</span>
                                    <span className="tr orng-txt"> {this.state.distance[0]} Km to {this.state.distance[1]} Km </span>
                                    <span className="bl ">0 Km</span>
                                    <span className="br">50 Km</span>

                                    <Range
                                        min={0}
                                        max={50}
                                        value={this.state.distance}
                                        step={2}
                                        className="range"
                                        onChange={this.handleRange.bind(this, 'distance')}
                                    />
                                </div>
                            </div>



	                       {/*<div className="distance-slider-bar">
	                         <input type="range" min="1" max="50" value="20" className="dis-slider" /> 
	                         <div className="range-value">
	                           <span>0 Km</span>  
	                           <span>50 Km</span>  
	                         </div>
	                       </div>*/}
	                       <hr />

	                       {
	                       	health_insurance_provider.length && false?
	                       	<div className="ins-listing">
	                          <div className="pop-head">Health Insurance Providers</div>
	                          <ul className="range-slider-ul">
	                       			{
				                    	health_insurance_provider.length?
				                    	health_insurance_provider.map((provider, i) => {

			                       				return <li key={i}>
					                                <label className="ck-bx">{provider.name} 
					                                    <input type="checkbox" value="on" checked={this.state.provider_ids.indexOf(provider.id)>-1?true:false} onChange={this.toggleProviderFilter.bind(this, provider.id)}/>
					                                    <span className="checkmark"></span>
					                                </label>
					                            </li>

			                       			})
			                    		:''
			                    	}          
		                       </ul>
		                       {
	                    		health_insurance_provider.length >4 && !this.state.showMoreProviders?
		                    		<a href="javascript:void(0);" onClick={()=>this.setState({toggleFilterPopup: true})} className="btn-view-hospital btn-show-more">Show More</a>	
		                    		:''
			                    }
		                    </div>
		                    :''
	                       }
	                      
	                       <div className="btn-search-div btn-apply-div">
	                         <a href="javascript:void(0);" className="btn-search" onClick={this.applyFilters.bind(this)}>Apply</a>
	                        </div>
	                    </div>
                    </div>
                    :''
		        }
		    </div>
			)
	}
}

export default StickyFilter