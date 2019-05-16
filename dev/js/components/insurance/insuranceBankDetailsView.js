import React from 'react'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import ChatPanel from '../../components/commons/ChatPanel'
import Loader from '../commons/Loader'

class InsuranceCancellationView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showCancelPopup: false,
			showCancelSection:true
		}
	}

	getGetOrdinal(n) {
		var s = ["th", "st", "nd", "rd"],
			v = n % 100;
		return n + (s[(v - 20) % 10] || s[v] || s[0]);
	}

	cancelPolicy() {
		this.setState({ showCancelPopup: true })
	}

	clickPopUp(type) {
		if (type == 1) {
			this.props.history.push('/insurance/canceldetails')
			// this.props.cancelInsurance(resp => {
			// 	if (resp.success) {
			// 		this.setState({ showCancelPopup: false, showCancelSection:false })
			// 	} else {
			// 		this.setState({ showCancelPopup: false })
			// 	}
			// })
		} else {
			this.setState({ showCancelPopup: false})
		}
	}

	render() {
			return <div className="profile-body-wrap" style={{ paddingBottom: 80 }} >
				<ProfileHeader />
				<section className="container parent-section book-appointment-section container-top-margin">
					<div className="row main-row parent-section-row">
						<div className="col-12 col-md-7 col-lg-7">
							<section className="profile-book-screen">
							</section>
						</div>
						<ChatPanel />
					</div>
				</section>
			</div>

	}
}

export default InsuranceCancellationView    