import React from "react";
import GTM from '../../../helpers/gtm.js'
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share'

class ThankYouPopUp extends React.Component {
constructor(props) {
super(props);
}

gaTracking(btnType,event){
    let actionVal
    let eventVal
    if(btnType == 'fb'){
        actionVal = 'BookingRatingFbShare' 
        eventVal = 'booking-rating-fb-share'
    }else{
        actionVal = 'BookingRatingTwitterShare' 
        eventVal = 'booking-rating-twitter-share'
    }
    let data = {
        'Category': 'ConsumerApp', 'Action': actionVal, 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': event, 
    }
    GTM.sendEvent({ data: data })
}
render() {
let profileData = this.props.profiles[this.props.selectedProfile]
let name = ""
if (profileData && profileData.name) {
name = profileData.name
}
let social_message
let doctor_name
if(this.props.appointmentData && this.props.appointmentData.type == 'doctor'){
    doctor_name = this.props.appointmentData.doctor.name
    social_message = `Used docprime to book Dr. ${doctor_name}. Had an excellent experience. I love how convenient and easy to use it is. On top of it, you get so many discounts. Who thought healthcare can be so affordable. My first choice for my good health!`
}else{
    social_message = `Used docprime to book a lab test. Had an excellent experience. I love how convenient and easy to use it is. On top of it, you get so many discounts. Who thought healthcare can be so affordable. My first choice for my good health!`
}
return (
<div className="raiting-popup">
    <div className="home-rating-card">
        <div className="thankyou-popup-head">
            <img src={ASSETS_BASE_URL + "/img/dpsmile.png"} />
            <p>Thanks {name}</p>
        </div>
        <p className="thnks-content">
            Your feedback matters!
        </p>
        <p className="thanks-sub-content">
            It helps our users find the right healthcare solutions.
        </p>
        {
            this.props.selectedRating == 4 || this.props.selectedRating == 5 ?
            <div className="social-ico-styling d-flex align-items-center">
                <div className="facebookIcon-styling" onClick={this.gaTracking.bind(this,'fb')}>
                    <FacebookShareButton
                    url="https://docprime.com"
                    quote= {social_message}
                    className="button"
                    >
                    <FacebookIcon
                    size={32}
                    round={false} />
                    </FacebookShareButton>
                    <span>Facebook</span>
                </div>
                <div className="twitterIcon-styling" onClick={this.gaTracking.bind(this,'twitter')}>
                    <TwitterShareButton
                    url="https://docprime.com"
                    title={social_message}
                    className="button" >
                    <TwitterIcon
                    size={32}
                    round={false} />
                    </TwitterShareButton>
                    <span>Twitter</span>
                </div>
            </div>
            :""
        }
        <button className="later-btn-style" onClick={this.props.submit}>Later</button>
    </div>
</div>
)
}
}
export default ThankYouPopUp;