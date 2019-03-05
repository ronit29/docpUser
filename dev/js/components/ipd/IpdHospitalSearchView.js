import React from 'react'
import LeftBar from '../commons/LeftBar'
import RightBar from '../commons/RightBar'
import ProfileHeader from '../commons/DesktopProfileHeader'
import IpdHospitalList from './IpdHospitalList.js'
import Loader from '../commons/Loader'
import Footer from '../commons/Home/footer'
import StickyTopBarFilter from './StickyTopBarFilter.js'

class IpdHospitalView extends React.Component{

	getMoreResults(){
		this.props.getIpdHospitals(this.props.match.params.id, this.props.selectedLocation, this.props.filterCriteria, this.props.provider_ids)
	}

	render(){
		let { hospital_list } = this.props
		return(
				<div className="profile-body-wrap">
                <ProfileHeader showSearch={true} />
	                <section className="container parent-section book-appointment-section breadcrumb-mrgn">

		                <div className="row main-row parent-section-row">
		                    <LeftBar />
		                    <div className="col-12 col-md-7 col-lg-7 center-column">
		                    	<StickyTopBarFilter {...this.props}/>
		                    	<div className ="ipd-section">
		                    		{
		                    			hospital_list.length>0?
		                    			<div className="tab-content">
								            <div className="tab-pane fade" id="nav-hospital">
								            	<IpdHospitalList {...this.props} />
											</div>
							            </div>
							            :''
		                    		}
		                    		
		                    	</div>
		                    </div>
		                </div>
		            </section>
		            <Footer />
	           	</div>

			)
	}
}

export default IpdHospitalView