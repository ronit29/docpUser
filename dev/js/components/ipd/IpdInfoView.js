import React from 'react'
import LeftBar from '../commons/LeftBar'
import RightBar from '../commons/RightBar'
import ProfileHeader from '../commons/DesktopProfileHeader'
import IpdAboutUs from './aboutIPD.js'
import HospitalList from './HospitalList.js'
import DoctorResultCard from '../opd/commons/doctorResultCard'
import Loader from '../commons/Loader'
import Footer from '../commons/Home/footer'
import Scrollspy from 'react-scrollspy'
import IpdProcedurePop from './ipdProcedurePop.js'

class IpdInfo extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			toggleTabType: ''
		}
	}

	componentDidMount(){
		if(window){
			window.scrollTo(0,0)
		}
		/*if(this.refs.ipd_info){

			this.refs.ipd_info.addEventListener("scroll", ()=>{
				if(document.getElementById('aboutTab')){
					this.setState({toggleTabType: 'aboutTab'})
				}
			})	
		}*/
		
	}

	toggleTabs(type){
		//this.setState({toggleTabType: type})
		if(document.getElementById(type)){
			var elmnt = document.getElementById(type)
			elmnt.scrollIntoView()
		}
	}

	viewHospitalsClicked(){
		this.props.mergeIpdCriteria({
			commonSelectedCriterias: this.props.commonSelectedCriterias,
			nextSelectedCriterias: this.props.commonSelectedCriterias
		})
		this.props.history.push(`/ipd/searchHospitals`)

		//this.props.history.push(`/ipd/${this.props.match.params.id}/hospitals`)	
	}

	viewDoctorsClicked(){
		if(this.props.commonSelectedCriterias && this.props.commonSelectedCriterias.length){

			let criteria = {}
			criteria.id = this.props.commonSelectedCriterias[0].id
			criteria.name = this.props.commonSelectedCriterias[0].name
			criteria.type = 'ipd' 
			this.props.cloneCommonSelectedCriterias(criteria)
			this.props.history.push(`/opd/searchresults`)	
		}
		
	}

	render(){

		return(
			<div className="profile-body-wrap">
                <ProfileHeader showSearch={true} />
                <section className="container parent-section book-appointment-section breadcrumb-mrgn">

	                <div className="row main-row parent-section-row">
	                    <LeftBar />
	                    <div className="col-12 col-md-7 col-lg-7 center-column">
	                    	{
	                    	   this.props.IPD_INFO_LOADED?                    		
		                       <div className ="ipd-section">
		                          <div className="full-widget mrg-b0">
				                     <nav className="tab-head">
				                        <div className="">
				                           <div className="nav nav-tabs nav-top-head" id="nav-tab" role="tablist">
				                           	{
				                           		<Scrollspy items={ ['aboutTab', 'hospitalTab', 'doctorTab'] } currentClassName="active">


						                              <a className={`nav-item nav-link ${this.state.toggleTabType=='aboutTab'?'active':''}`} data-toggle="tab" href="javascript:void(0);" role="tab" onClick={this.toggleTabs.bind(this,'aboutTab')}>Info
						                              </a>
						                              <a className={`nav-item nav-link ${this.state.toggleTabType=='hospitalTab'?'active':''}`} data-toggle="tab" href="javascript:void(0);" role="tab" onClick={this.toggleTabs.bind(this,'hospitalTab')}>Hospitals
						                              </a>
						                              <a className={`nav-item nav-link ${this.state.toggleTabType=='doctorTab'?'active':''}`} data-toggle="tab" href="javascript:void(0);" role="tab" onClick={this.toggleTabs.bind(this,'doctorTab')}>Doctors
						                              </a>

				                           		</Scrollspy>
				                           	}
				                           </div>
				                        </div>
				                     </nav>
				                   </div>
				                   <div className="tab-content" ref={elem => this.ipd_info=elem}>
				                   		<div id="aboutTab">
				                   			<IpdAboutUs {...this.props} id="aboutTab"/>
				                   		</div> 
					                   	
							            <div id="hospitalTab" className="tab-pane fade" >
							            	<HospitalList {...this.props} hospitalList = {this.props.ipd_info && this.props.ipd_info.hospitals?this.props.ipd_info.hospitals:[]}/>
							   				 <a href="javascript:void(0);" className="btn-view-hospital" onClick={this.viewHospitalsClicked.bind(this)}>View all Hospitals</a>
										</div>

										<div id="doctorTab" className="tab-pane fade">
						                    {
						                    	this.props.ipd_info && this.props.ipd_info.doctors?
							                    this.props.ipd_info.doctors.result.map((doctorCard, i) => {
							                    	return <DoctorResultCard details={doctorCard} key={i} rank={i} seoFriendly={this.props.ipd_info.doctors.seo} {...this.props}/>
							                    })	
							                    :''
						                    }
						                    <a href="javascript:void(0);" className="btn-view-hospital" onClick={this.viewDoctorsClicked.bind(this)}>View all Doctors</a>
						                    
						                </div>
						            </div>

						            <IpdProcedurePop />
						            
				                </div>
				                :<Loader/>
	                    	}
			            </div>
			            <RightBar extraClass=" chat-float-btn-2"/>
			        </div>
			    </section>
			    <Footer />
			</div>
			)
	}
}

export default IpdInfo