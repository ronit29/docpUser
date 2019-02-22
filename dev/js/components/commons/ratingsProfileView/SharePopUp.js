import React from "react";
import GTM from '../../../helpers/gtm.js';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon, EmailShareButton, EmailIcon } from 'react-share';
import { fetchReferralCode } from '../../../actions/index.js';
import STORAGE from "../../../helpers/storage/index.js";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SnackBar from 'node-snackbar';
import CONFIG from "../../../config/index.js";

class SharePopUp extends React.Component {
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

    getWhatsappText(data, url) {
        let msg = data.ratings + ' out of 5 stars\n' + data.compliments + '\n\n"' + data.review + '"\n' + url
        return window.encodeURIComponent(msg);
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
        let url
        if (this.props.details && this.props.details.appointment_type == 2) {
            url = "https://docprime.com/opd/doctor/" + this.props.details.entity_id
        } else {
            url = "https://docprime.com/lab/" + this.props.details.entity_id
        }
        social_message = `${this.props.details.ratings} out of 5 stars 
         ${this.props.details.compliments} 
         
         "${this.props.details.review}"`
        return (
            <div className="raiting-popup">
                <div style={{ backgroundColor: '#fff', borderRadius: 5, position: 'relative' }} >
                    <div className="typ-close" onClick={this.props.submit}>
                        <img src={ASSETS_BASE_URL + '/img/customer-icons/close-black.svg'} />
                    </div>
                    <div className="home-rating-card" style={{ paddingBottom: 0 }} >
                        <p className="thnks-content">Your feedback matters!</p>
                        {/* <p className="thnks-content fw-500">REFER &amp; EARN!</p> */}
                        <p className="thanks-sub-content mrb-10">Please share with your friends</p>
                        {
                            this.props.selectedRating == 4 || this.props.selectedRating == 5 ?
                                <div className="social-ico-styling d-flex">
                                    <div className="facebookIcon-styling" onClick={this.gaTracking.bind(this, 'fb')}>
                                        <FacebookShareButton
                                            url={url}
                                            quote={social_message}
                                            className="button">
                                            <FacebookIcon
                                                size={32}
                                                round={false} />
                                        </FacebookShareButton>
                                        <span>Facebook</span>
                                    </div>
                                    <div className="twitterIcon-styling" onClick={this.gaTracking.bind(this, 'twitter')}>
                                        <TwitterShareButton
                                            url={url}
                                            title={social_message}
                                            className="button">
                                            <TwitterIcon
                                                size={32}
                                                round={false} />
                                        </TwitterShareButton>
                                        <span>Twitter</span>
                                    </div>
                                    <div className="whtsappIcon-styling" onClick={this.gaTracking.bind(this, 'whtsapp')} >
                                        <a className="whtsAppico" href={"whatsapp://send?text=" + this.getWhatsappText(this.props.details, url)}>
                                            <img src={ASSETS_BASE_URL + "/img/wa-logo.svg"} />
                                            <span>Whatsapp</span>
                                        </a>
                                    </div>
                                </div>
                                : ""
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default SharePopUp;