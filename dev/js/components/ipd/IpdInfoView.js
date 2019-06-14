import React from 'react'
import LeftBar from '../commons/LeftBar'
import RightBar from '../commons/RightBar'
import ProfileHeader from '../commons/DesktopProfileHeader'
import Loader from '../commons/Loader'
import Footer from '../commons/Home/footer'
import IpdView from './IpdInfo.js'

class InfoView extends React.Component {

	
	render(){

		return(
			<div className="profile-body-wrap">
                <ProfileHeader showSearch={true} />
                <section className="container parent-section book-appointment-section breadcrumb-mrgn">

	                <div className="row main-row parent-section-row">
	                    <LeftBar />
	                    <div className="col-12 col-md-7 col-lg-7 center-column">
	                    	{
	                    		this.props.IPD_INFO_LOADED || (this.props.ipd_info && this.props.ipd_info.about && this.props.ipd_info.about.id == this.props.ipd_id)?
	                    		<IpdView {...this.props}/>
	                    		:<Loader/>
	                    	}
			            </div>
			            <RightBar extraClass=" chat-float-btn-2" showDesktopIpd={true}/>
			        </div>
			    </section>
			    <Footer />
			</div>
			)
	}
}

export default InfoView