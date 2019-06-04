import React from 'react'
import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import GTM from '../../../helpers/gtm.js'
import STORAGE from '../../../helpers/storage'

class CodPaymentView extends React.Component {

	render(){

		return(
			<div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column">

                        </div>

                        <RightBar extraClass=" chat-float-btn-2" noChatButton={true} />
                    </div>
                </section>
            </div>
			)
	}
}

export default CodPaymentView