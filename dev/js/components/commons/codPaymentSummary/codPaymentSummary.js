import React from 'react'
import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import GTM from '../../../helpers/gtm.js'
import STORAGE from '../../../helpers/storage'

class CodPaymentView extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			items: []
		}
	}

	componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }

        if (STORAGE.checkAuth() && false) {
            this.props.fetchOrderSummary(5).then((res) => {
                if (res.data && res.data.length) {
                    this.setState({ items: res.data })

                }
            }).catch((e) => {

            })
        }
    }

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