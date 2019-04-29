import React from 'react'
import IpdAboutUs from './aboutIPD.js'
import IpdInfoViewMore from './IpdAboutUs.js'
import HospitalList from './HospitalList.js'
import DoctorResultCard from '../opd/commons/doctorResultCard'
import Loader from '../commons/Loader'
import GTM from '../../helpers/gtm.js'
import HelmetTags from '../commons/HelmetTags'
import CONFIG from '../../config'



class IpdView extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			toggleTabType: 'aboutTab',
			toggleReadMore: false,
			seoFriendly: this.props.match.url.includes('-ipdp')
		}
	}

	componentDidMount(){
		if(window){
			window.scrollTo(0,0)
		}

		var section = document.querySelectorAll(".nav_top_bar");
		var sections = {};
		var i = 0

		let headerHeight = 0	        

		Object.keys(this.refs).forEach((prp, i) => {
			
			if(document.getElementsByClassName('stickyBar') && document.getElementsByClassName('stickyBar')[0]){
				headerHeight = document.getElementsByClassName('stickyBar')[0].offsetTop - 100
			}
			sections[prp] = this.refs[prp].offsetTop + headerHeight						

		})

		let self = this
		if(window && document){
			window.onscroll = function() {
		    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop
		    for (i in sections) {
		    	if(self.refs[i]){

		    		if(i.includes('readMoreView')){
		    			if(scrollPosition > (self.refs['readMoreView'].offsetTop +  headerHeight )){
					    	self.setState({toggleTabType: 'aboutTab'})
					    }
		    		}else{

		    			if ((self.refs[i].offsetTop +  headerHeight )<= scrollPosition) {
					      	self.setState({toggleTabType: i})
					    }	
		    		}
		    		
		    	}
		    }
		  }	
		}
	}

	toggleTabs(type){
		if(document.getElementById(type)){
			let gtmData = {
	            'Category': 'ConsumerApp', 'Action': 'IpdTabClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-tab-clicked', selectedId: this.props.ipd_id || '', type: type
	        }
	        GTM.sendEvent({ data: gtmData })

			var elmnt = document.getElementById(type)
			
			let headerHeight = 0
			if(document.getElementsByClassName('stickyBar') && document.getElementsByClassName('stickyBar')[0]){
				headerHeight = this.refs[type].offsetTop -45
			}
			this.setState({toggleTabType: type})
			window.scrollTo(0,headerHeight)

		}
	}

	viewHospitalsClicked(){
		let gtmData = {
            'Category': 'ConsumerApp', 'Action': 'IpdViewAllHospitalClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-view-all-hospital-clicked', selectedId: this.props.ipd_id || ''
        }
        GTM.sendEvent({ data: gtmData })
		this.props.mergeIpdCriteria({
			commonSelectedCriterias: this.props.commonSelectedCriterias,
			nextSelectedCriterias: this.props.commonSelectedCriterias
		})

		if(this.props.ipd_info && this.props.ipd_info.hospitals && this.props.ipd_info.hospitals.canonical_url){

			this.props.history.push(`/${this.props.ipd_info.hospitals.canonical_url}`)
		}else{

			this.props.history.push(`/ipd/searchHospitals`)
		}
		
	}

	viewDoctorsClicked(){
		if(this.props.commonSelectedCriterias && this.props.commonSelectedCriterias.length){


			let gtmData = {
	            'Category': 'ConsumerApp', 'Action': 'IpdViewAllDoctorClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-view-all-doctor-clicked', selectedId: this.props.commonSelectedCriterias[0].id || ''
	        }
	        GTM.sendEvent({ data: gtmData })

			let criteria = {}
			criteria.id = this.props.commonSelectedCriterias[0].id
			criteria.name = this.props.commonSelectedCriterias[0].name
			criteria.type = 'ipd' 
			this.props.cloneCommonSelectedCriterias(criteria)

			if(this.props.ipd_info && this.props.ipd_info.doctors && this.props.ipd_info.doctors.canonical_url){

				this.props.history.push(`/${this.props.ipd_info.doctors.canonical_url}`)
			}else{

				this.props.history.push(`/opd/searchresults`)
			}
				
		}
		
	}

	getCostEstimateClicked(){
		let gtmData = {
	    	'Category': 'ConsumerApp', 'Action': 'IpdGetCostEstimateClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-get-cost-estimate-clicked', selectedId: this.props.ipd_id || ''
		}
		GTM.sendEvent({ data: gtmData })
		this.props.history.push(`/ipd/${this.props.ipd_id}/getPriceEstimate`)
	}

	readMoreClicked(){
		this.setState({toggleReadMore: true})
		if(this.refs['readMoreView']){
			let headerHeight = this.refs['readMoreView'].offsetTop -45
			window.scrollTo(0,headerHeight)	
		}
	}

	getMetaTagsData(seoData) {
        let title = "IPD Procedure Page"
        if (this.state.seoFriendly) {
            title = ""
        }
        let description = ""
        if (seoData) {
            title = seoData.title || ""
            description = seoData.description || ""
        }
        return { title, description }
    }

	render(){

		return(                  		
           <div className ="ipd-section ipdSection">
           	  <HelmetTags tagsData={{
                    canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.match.url}`,
                    title: this.getMetaTagsData(this.props.ipd_info.seo).title,
                    description: this.getMetaTagsData(this.props.ipd_info.seo).description
                }} noIndex={!this.state.seoFriendly} />

           	  <h4 className="section-heading top-sc-head"> <span className="about-head"> {`${this.props.ipd_info?`${this.props.ipd_info.about.name} ${this.props.selectedLocation && this.props.selectedLocation.locality?`in ${this.props.selectedLocation.locality}`:''}  `:''}`} </span>
					</h4>
              <div className="full-widget mrg-b0 stickyBar">
                 <nav className="tab-head">
                    <div className="">
                       <div className="nav nav-tabs nav-top-head " id="nav-tab" role="tablist">
	                              <a className={`nav-item nav-link ${this.state.toggleTabType=='aboutTab'?'active':''}`} data-toggle="tab" href="javascript:void(0);" role="tab" onClick={this.toggleTabs.bind(this,'aboutTab')}>Overview
	                              </a>
	                              <a className={`nav-item nav-link ${this.state.toggleTabType=='hospitalTab'?'active':''}`} data-toggle="tab" href="javascript:void(0);" role="tab" onClick={this.toggleTabs.bind(this,'hospitalTab')}>Hospitals
	                              </a>
	                              <a className={`nav-item nav-link ${this.state.toggleTabType=='doctorTab'?'active':''}`} data-toggle="tab" href="javascript:void(0);" role="tab" onClick={this.toggleTabs.bind(this,'doctorTab')}>Doctors
	                              </a>
                       </div>
                    </div>
                 </nav>
               </div>
               <div className="tab-content" >
               		<div id="aboutTab" ref="aboutTab" className="nav_top_bar">
               			<IpdAboutUs {...this.props} id="aboutTab" readMoreClicked={this.readMoreClicked.bind(this)}/>
               		</div> 
                   	
		            <div id="hospitalTab" ref="hospitalTab" className="tab-pane fade" className="nav_top_bar">
		            	{
		            		this.props.ipd_info && this.props.ipd_info.hospitals && this.props.ipd_info.hospitals.result && this.props.ipd_info.hospitals.result.length?
		            		<HospitalList {...this.props} hospitalList = {this.props.ipd_info && this.props.ipd_info.hospitals?this.props.ipd_info.hospitals:[]}/>
		            		:''	
		            	}
		            	
		            	{
		            		this.props.ipd_info && this.props.ipd_info.hospitals && this.props.ipd_info.hospitals.result && this.props.ipd_info.hospitals.result.length<this.props.ipd_info.hospitals.count?
				   				<a href="javascript:void(0);" className="btn-view-hospital" onClick={this.viewHospitalsClicked.bind(this)}>{`View all ${this.props.ipd_info.hospitals.count} Hospitals`}</a>
				   				:''
		            	}
					</div>

					<div id="doctorTab" ref="doctorTab" className="tab-pane fade nav_top_bar">
						{
							this.props.ipd_info && this.props.ipd_info.doctors && this.props.ipd_info.doctors.result  && this.props.ipd_info.doctors.result.length && this.props.ipd_info.about && this.props.ipd_info.about.name?
							<h2 className="section-heading">{`Top Doctors for ${this.props.ipd_info.about.name} ${this.props.selectedLocation && this.props.selectedLocation.locality?`in ${this.props.selectedLocation.locality}`:''} `}</h2>
							:''	
						}
	                    {
	                    	this.props.ipd_info && this.props.ipd_info.doctors?
		                    this.props.ipd_info.doctors.result.map((doctorCard, i) => {
		                    	return <DoctorResultCard details={doctorCard} key={i} rank={i} seoFriendly={this.props.ipd_info.doctors.seo} {...this.props}/>
		                    })	
		                    :''
	                    }
	                    {
	                    	this.props.ipd_info && this.props.ipd_info.doctors && this.props.ipd_info.doctors.result && this.props.ipd_info.doctors.result.length<this.props.ipd_info.doctors.count?
	                    	<a href="javascript:void(0);" className="btn-view-hospital" onClick={this.viewDoctorsClicked.bind(this)}>{`View all ${this.props.ipd_info.doctors.count} Doctors`}</a>
	                    	:''	
	                    }
	                    
	                    
	                </div>

	                <div ref="readMoreView" className="tab-pane fade nav_top_bar">
	                	<IpdInfoViewMore {...this.props}/>
	               	</div>
	            </div>
	            <div className="btn-search-div btn-apply-div btn-sbmt">
                     <a href="javascript:void(0);" onClick={this.getCostEstimateClicked.bind(this)} className="btn-search">Get Cost Estimate</a>
                </div>
            </div>
			)
	}
}

export default IpdView