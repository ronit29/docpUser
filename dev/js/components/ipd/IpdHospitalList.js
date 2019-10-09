import React from 'react'
import HospitalCard from './HospitalCard.js'
import GTM from '../../helpers/gtm.js'
import InfiniteScroll from 'react-infinite-scroller';
import Loader from '../commons/Loader'
const queryString = require('query-string')

class IpdHospitalListView extends React.Component {

	constructor(props){
      super(props)
      const parsed = queryString.parse(this.props.location.search)
      this.state = {
         toggleFilterPopup: false,
         health_insurance_provider: [],
         hasMore: true,
         loading: false,
         page: parsed && parsed.page?parseInt(parsed.page)||1:1,
         readMore: 'search-details-data-less' 
      }
   	}

   	toggleProviderFilter(data=[]){

   		this.setState({toggleFilterPopup: !this.state.toggleFilterPopup, health_insurance_provider: data})
   	}

	getCostEstimateClicked(hospitalId){
		

		let ipd_id = this.props.commonSelectedCriterias && this.props.commonSelectedCriterias.length?this.props.commonSelectedCriterias[0].id:''
	
		let gtmData = {
	    	'Category': 'ConsumerApp', 'Action': 'IpdGetCostEstimateClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-get-cost-estimate-clicked', selectedId: ipd_id || '', hospitalId: hospitalId || ''
		}
		GTM.sendEvent({ data: gtmData })

    if(ipd_id){
      this.props.history.push(`/ipd/${ipd_id}/getPriceEstimate?hospital_id=${hospitalId}`)
    }else{
      this.props.history.push(`/ipd/price/getPriceEstimate?hospital_id=${hospitalId}`)  
    }
		
      
   	}

   	getHospitalDetailPage(hospitalId, url=null){
   		let gtmData = {
            'Category': 'ConsumerApp', 'Action': 'HospitalDetailClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'hospital-detail-clicked', 'selectedId': hospitalId || ''
        }
        GTM.sendEvent({ data: gtmData })
   		
   		if(url){
   			this.props.history.push(`/${url}`)
   		}else{
   			this.props.history.push(`/ipd/hospital/${hospitalId}`)	
   		}
   		
   	}

   	loadMore(page) {
        this.setState({ hasMore: false, loading: true })
        this.props.getIpdHospitalList(null, page, (hasMore) => {
            this.setState({ loading: false})
            setTimeout(() => {
                this.setState({ hasMore })
            }, 1000)
        })

    }

    toggleScroll() {
        if (window) {
            window.scrollTo(0, 0)
        }
        this.setState({ readMore: 'search-details-data-less' })
    }

	render(){
		let { hospital_list, HOSPITAL_DATA } = this.props
    let ipd_id = this.props.commonSelectedCriterias && this.props.commonSelectedCriterias.length?this.props.commonSelectedCriterias[0].id:null

		return(
			<div>
				{
            this.props.hospital_search_content && this.props.hospital_search_content != '' && parseInt(this.props.page) == 1 ?
            <div className="search-result-card-collpase">
                <div className={this.state.readMore} dangerouslySetInnerHTML={{ __html: this.props.hospital_search_content }} >
                </div>

                {this.state.readMore && this.state.readMore != '' ?
                    <span className="rd-more" onClick={() => this.setState({ readMore: '' })}>Read More</span>
                    : ''
                }

                {this.state.readMore == '' ?
                    <span className="rd-more" onClick={this.toggleScroll.bind(this)}>Read Less</span>
                    : ''
                }
            </div>
            : ''
        }
				{
					hospital_list.length?
					<InfiniteScroll
              pageStart={this.state.page}
              loadMore={this.loadMore.bind(this)}
              hasMore={this.state.hasMore}
              useWindow={true}
              initialLoad={false}
          >
                    <ul>
                    {
						hospital_list.map((hospitalId, i) => {
							if(HOSPITAL_DATA[hospitalId]){
								return <HospitalCard key={i} data={HOSPITAL_DATA[hospitalId]} getCostEstimateClicked={this.getCostEstimateClicked.bind(this)} getHospitalDetailPage={this.getHospitalDetailPage.bind(this)} toggleProviderFilter={this.toggleProviderFilter.bind(this)} noIpd={ipd_id?false:true} {...this.props}/>	
							}
						})
					}
					</ul>
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