import React from 'react'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import LeftBar from '../../components/commons/LeftBar'
import RightBar from '../../components/commons/RightBar'


class ProcedureView extends React.Component{

	render(){

		return(
			<div className="profile-body-wrap">
				<ProfileHeader />
				<section className="container parent-section book-appointment-section">
					<div className="row main-row parent-section-row">
						<LeftBar />
					</div>
					<div className="col-12 col-md-7 col-lg-7 center-column">
						<RightBar/>
					</div>
				</section>
				<p>Prince</p>
			</div>
			)
	}
}

export default ProcedureView