import React from "react";
import GTM from '../../../helpers/gtm.js';
import Loadable from 'react-loadable'
import { fetchReferralCode } from '../../../actions/index.js';
import STORAGE from "../../../helpers/storage/index.js";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SnackBar from 'node-snackbar';
import CONFIG from "../../../config/index.js";

// import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon, EmailShareButton, EmailIcon } from 'react-share';

const loading = () => <div className="loading_Linebar_container">
	<div className="loading_bar_line"></div>
</div>

const ReactShare = Loadable({
	loader: () => import('react-share'),
	modules: ['react-share'],
	webpack: () => [require.resolveWeak('react-share')],
	loading,
})

class ThankYouPopUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			referralCode: ''
		}
	}

	componentDidMount() {
		if (STORAGE.checkAuth()) {
			fetchReferralCode()().then((res) => {
				if (res && res.code) {
					this.setState({ referralCode: res.code })
				}
			}).catch((e) => {

			})
		}
		this.getLink();
	}

	gaTracking(btnType, event) {
		let actionVal
		let eventVal
		if (btnType == 'fb') {
			actionVal = 'BookingRatingFbShare'
			eventVal = 'booking-rating-fb-share'
		} else if (btnType == 'twitter') {
			actionVal = 'BookingRatingTwitterShare'
			eventVal = 'booking-rating-twitter-share'
		} else if (btnType == 'whtsapp') {
			actionVal = 'BookingRatingWhatsAppShare'
			eventVal = 'booking-rating-whatsapp-share'
		} else {
			actionVal = 'BookingRatingEmailShare'
			eventVal = 'booking-rating-email-share'
		}
		let data = {
			'Category': 'ConsumerApp', 'Action': actionVal, 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': eventVal,
		}
		GTM.sendEvent({ data: data })
	}

	getLink() {
		return `${CONFIG.API_BASE_URL}/login?referral=${this.state.referralCode}`
	}

	render() {
		let profileData = ''
		if (this.props.profiles && this.props.selectedProfile) {
			profileData = this.props.profiles[this.props.selectedProfile]
		}
		let name = ""
		if (profileData && profileData.name) {
			name = profileData.name
		}
		let social_message
		let doctor_name
		if (this.props.appointmentData && this.props.appointmentData.type == 'doctor') {
			doctor_name = this.props.appointmentData.doctor.name
			social_message = `Used docprime to book Dr. ${doctor_name}. Had an excellent experience. I love how convenient and easy to use it is. On top of it, you get so many discounts. Who thought healthcare can be so affordable. My first choice for my good health! You can also get ₹ 50 if you signup with my referral code ${this.state.referralCode}.`
		} else {
			social_message = `Used docprime to book a lab test. Had an excellent experience. I love how convenient and easy to use it is. On top of it, you get so many discounts. Who thought healthcare can be so affordable. My first choice for my good health! You can also get ₹ 50 if you signup with my referral code ${this.state.referralCode}.`
		}
		return (
			<div className="raiting-popup">
				<div style={{ backgroundColor: '#fff', borderRadius: 5, position: 'relative' }} >
					<div className="typ-close" onClick={this.props.submit}>
						<img src={ASSETS_BASE_URL + '/img/customer-icons/close-black.svg'} />
					</div>
					<div className="home-rating-card" style={{ paddingBottom: 0 }} >
						<div className="thankyou-popup-head">
							<img src={ASSETS_BASE_URL + "/img/dpsmile.png"} />
							<p>Thanks {name}</p>
						</div>
						<p className="thnks-content">Your feedback matters!</p>
						<p className="thnks-content fw-500">REFER &amp; EARN!</p>
						<p className="thanks-sub-content mrb-10">Refer your friends & earn ₹ 200</p>
						{
							ReactShare && ReactShare.FacebookShareButton && (this.props.selectedRating == 4 || this.props.selectedRating == 5) ?
								<div className="social-ico-styling d-flex">
									<div className="facebookIcon-styling" onClick={this.gaTracking.bind(this, 'fb')}>
										<ReactShare.FacebookShareButton
											url="https://docprime.com"
											quote={social_message}
											className="button">
											<ReactShare.FacebookIcon
												size={32}
												round={false} />
										</ReactShare.FacebookShareButton>
										<span>Share referral link</span>
									</div>
									<div className="twitterIcon-styling" onClick={this.gaTracking.bind(this, 'twitter')}>
										<ReactShare.TwitterShareButton
											url="https://docprime.com"
											title={social_message}
											className="button">
											<ReactShare.TwitterIcon
												size={32}
												round={false} />
										</ReactShare.TwitterShareButton>
										<span>Tweet referral link</span>
									</div>
									<div className="emailIcon-styling" onClick={this.gaTracking.bind(this, 'email')}>
										<ReactShare.EmailShareButton
											url="https://docprime.com"
											subject="Refer to earn"
											body={`Save upto 50% on doctor appointments and lab tests. Sign up on docprime.com with my code ${this.state.referralCode} and get ₹ 50. Visit ${CONFIG.API_BASE_URL}/login?referral=${this.state.referralCode}`}
											className="button">
											<ReactShare.EmailIcon
												size={32}
												round={false} />
										</ReactShare.EmailShareButton>
										<span>Email referral link</span>
									</div>
									<div className="whtsappIcon-styling" onClick={this.gaTracking.bind(this, 'whtsapp')}>
										<a className="whtsAppico" href={"whatsapp://send?text=" + social_message}>
											<img src={ASSETS_BASE_URL + "/img/wa-logo.svg"} />
											<span className="refrWhtsIcotcs">Whatsapp referral link</span>
										</a>
									</div>
								</div>
								: ""
						}
						<CopyToClipboard text={this.getLink()} onCopy={() => { SnackBar.show({ pos: 'bottom-center', text: "Referral Link Copied" }); }} >
							<div className="d-flex align-items-center justify-content-center" style={{ cursor: 'pointer' }} >
								<img src={ASSETS_BASE_URL + '/img/customer-icons/copy.svg'} style={{ marginRight: 8, width: 20 }} />
								<span className="text-primary fw-500">Copy referral link</span>
							</div>
						</CopyToClipboard>
					</div>
					<div className="text-center mrt-20" style={{ backgroundColor: 'rgba(247, 134, 49, 0.2)', padding: 10, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, cursor: 'pointer' }}>
						<a href="/referral" className="fw-500 text-primary">How referral works?</a>
					</div>
				</div>
			</div>
		)
	}
}

export default ThankYouPopUp;