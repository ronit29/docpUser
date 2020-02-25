import React from 'react'
import LeftBar from '../commons/LeftBar'
import RightBar from '../commons/RightBar'
import ProfileHeader from '../commons/DesktopProfileHeader'
import Footer from '../commons/Home/footer'
import SnackBar from 'node-snackbar'
import ThankyouPoup from './ipdThankYouScreen.js'
const queryString = require('query-string')
import GTM from '../../helpers/gtm.js'
import BannerCarousel from '../commons/Home/bannerCarousel';
import IPDForm from './IpdTabForm.js'
import Disclaimer from '../commons/Home/staticDisclaimer.js'

class IPDFormView extends React.Component {

	componentDidMount() {

		if(!this.props.tabView) {

			const parsed = queryString.parse(this.props.location.search)
			let gtmData = {
				'Category': 'ConsumerApp', 'Action': 'IpdLeadGenerationPageLanded', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-lead-generation-page-landed', selectedId: this.props.match.params.id, 'hospitalId': parsed.hospital_id ? parsed.hospital_id : ''
			}
			GTM.sendEvent({ data: gtmData })

			let selectedLocation = ''
			let lat = 28.644800
			let long = 77.216721
			if (this.props.selectedLocation) {
				selectedLocation = this.props.selectedLocation;
				lat = selectedLocation.geometry.location.lat
				long = selectedLocation.geometry.location.lng
				if (typeof lat === 'function') lat = lat()
				if (typeof long === 'function') long = long()
			}

			this.props.getOfferList(lat, long)	
		}
		
	}

	render() {
		let { ipd_info } = this.props

		if(this.props.tabView) {
			return(
				<IPDForm {...this.props} />
				)
		}else {

			return (
				<div className="profile-body-wrap">
					<ProfileHeader />
					<section className="container container-top-margin">

						<div className="row main-row parent-section-row">
							<LeftBar />
							<div className="col-12 col-md-7 col-lg-7 center-column">
								{
									this.props.offerList && this.props.offerList.filter(x => x.slider_location === 'ipd_lead_form').length ?
										<div className="col-12 mrb-20">
											<BannerCarousel {...this.props} sliderLocation="ipd_lead_form" />
										</div> : ''
								}
								<IPDForm {...this.props} />
							</div>
							<RightBar extraClass=" chat-float-btn-2" msgTemplate="gold_general_template"/>
						</div>
					</section>
					<Disclaimer />
				</div>
			)
		}
	}
}

export default IPDFormView