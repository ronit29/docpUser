import React from 'react';
import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'
import Footer from '../Home/footer'


class IPD extends React.Component{

	render(){

		return(
			 <div className="profile-body-wrap">
                <ProfileHeader showSearch={true} />
                <section className="container parent-section book-appointment-section breadcrumb-mrgn">

	                <div className="row main-row parent-section-row">
	                    <LeftBar />
	                    <div className="col-12 col-md-7 col-lg-7 center-column">

	                    </div>

	           
	                	<RightBar extraClass=" chat-float-btn-2"/>
	                </div>
                </section>
                <Footer />
             </div>
			)
	}
}

export default IPD