import React from 'react'
import LeftBar from '../commons/LeftBar'
import RightBar from '../commons/RightBar'
import ProfileHeader from '../commons/DesktopProfileHeader'
import IpdAboutUs from './aboutIPD.js'
import HospitalList from './HospitalList.js'
import Loader from '../commons/Loader'
import Footer from '../commons/Home/footer'

class IpdInfo extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			toggleTabType: 'aboutTab'
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
		this.setState({toggleTabType: type})
		if(document.getElementById(type)){
			var elmnt = document.getElementById(type)
			elmnt.scrollIntoView()
		}
	}

	viewHospitalsClicked(){
		this.props.history.push(`/ipd/searchHospitals`)

		//this.props.history.push(`/ipd/${this.props.match.params.id}/hospitals`)	
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
				                              <a className={`nav-item nav-link ${this.state.toggleTabType=='aboutTab'?'active':''}`} id="overview-tab" data-toggle="tab" href="javascript:void(0);" role="tab" onClick={this.toggleTabs.bind(this,'aboutTab')}>About
				                              </a>
				                              <a className={`nav-item nav-link ${this.state.toggleTabType=='hospitalTab'?'active':''}`} id="hospital-tab" data-toggle="tab" href="javascript:void(0);" role="tab" onClick={this.toggleTabs.bind(this,'hospitalTab')}>Hospitals
				                              </a>
				                              <a className={`nav-item nav-link ${this.state.toggleTabType=='doctorTab'?'active':''}`} id="doc-tab" data-toggle="tab" href="javascript:void(0);" role="tab" onClick={this.toggleTabs.bind(this,'doctorTab')}>Doctors
				                              </a>
				                           </div>
				                        </div>
				                     </nav>
				                   </div>
				                   <div className="tab-content" ref={elem => this.ipd_info=elem}>

					                   	<IpdAboutUs {...this.props} id="aboutTab"/>

							            <div id="hospitalTab" className="tab-pane fade" id="nav-hospital">
							            	<HospitalList {...this.props} hospitalList = {this.props.ipd_info && this.props.ipd_info.hospitals?this.props.ipd_info.hospitals:[]}/>
							   				 <a href="javascript:void(0);" className="btn-view-hospital" onClick={this.viewHospitalsClicked.bind(this)}>View all Hospitals</a>
										</div>

										<div id="doctorTab" className="tab-pane fade" id="nav-doc">
						                    Coming Soon
						                </div>
						            </div>

						            
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