import React from 'react';
const queryString = require('query-string');

import CONFIG from '../../../config'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SnackBar from 'node-snackbar'
import STORAGE from '../../../helpers/storage'
import Disclaimer from '../../commons/Home/staticDisclaimer.js'
import Loader from '../Loader';


class ReferralView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            referralCode: null,
            whatsapp_text:null,
            referral_amt:null
        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }

        if (STORAGE.checkAuth()) {
            this.props.fetchReferralCode().then((res) => {
                if (res && res.code) {
                    this.setState({ referralCode: res.code, whatsapp_text:res.whatsapp_text, referral_amt:res.referral_amt })
                }
            }).catch((e) => {

            })
        }

    }

    getLink() {
        return `${CONFIG.API_BASE_URL}/login?referral=${this.state.referralCode}`
    }

    getShareText() {
        return this.state.whatsapp_text
        // return `Save upto 50% on doctor appointments and lab tests. Sign up on docprime.com with my code ${this.state.referralCode} and get Rs 50 `
    }

    getFullText() {
        return this.getShareText() + " " + this.getLink()
    }

    share() {
        if (navigator.share && this.state.referralCode) {
            navigator.share({
                title: 'DocPrime Referral Code',
                text: this.getShareText(),
                url: this.getLink(),
            }).then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        }
    }

    render() {
        return (
            <div className="profile-body-wrap lgn-ovrflow">
                <ProfileHeader />
                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="widget mrng-top-12 mrb-15">
                                            <div className="widget-content">
                                                <h4 className="ref-heading">Refer and Earn</h4>
                                                <div className="multi-step-for-earn">
                                                    <div className="steps">
                                                        <div className="img-step">
                                                            <img src={ASSETS_BASE_URL + "/img/step-1.png"} alt="img" className="img-1" />
                                                            <div className="badge badge-refer">1</div>
                                                        </div>
                                                        <div className="text-step">
                                                            Invite your friends on <br /> docprime.com
                                                        </div>
                                                    </div>
                                                    <div className="steps step-2">
                                                        <div className="text-step text-step-2">
                                                            Your friends get <img src={ASSETS_BASE_URL + "/img/rupee-icon.svg"} alt="rupee-icon" className="icon-rupee" /> {this.props.refer_amount} on <br /> Signup
                                                            <div className="badge badge-refer">2</div>
                                                        </div>

                                                        <div className="img-step">
                                                            <img src={ASSETS_BASE_URL + "/img/step-2.png"} alt="img" className="" />
                                                        </div>
                                                    </div>
                                                    <div className="steps">
                                                        <div className="img-step">
                                                            <img src={ASSETS_BASE_URL + "/img/step-3.png"} alt="img" className="img-3" />
                                                            <div className="badge badge-refer">3</div>
                                                        </div>

                                                        <div className="text-step">
                                                            You get <img src={ASSETS_BASE_URL + "/img/rupee-icon.svg"} alt="rupee-icon" className="icon-rupee" /> {this.props.refer_amount} on completion of your friend’s first appointment or on Gold Membership purchase
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    STORAGE.checkAuth() ? <div>
                                                            <CopyToClipboard text={this.getLink()} onCopy={() => { SnackBar.show({ pos: 'bottom-center', text: "Referral Link Copied" }); }}>
                                                                <h4 className="inviteCodeShare">
                                                                <span>{this.state.referralCode}</span>
                                                                <span className="refr-sub-cpy">
                                                                    <img className="img-fluid" src={ASSETS_BASE_URL + '/img/copy.svg'}/>
                                                                   Tap to copy
                                                                   </span>
                                                                </h4>
                                                            </CopyToClipboard>

                                                        {/*<div className="social-icon-referral">
                                                            {
                                                                this.state.referralCode ? <ul className="text-center">
                                                                    <li><a href={"whatsapp://send?text=" + this.getFullText()}><img src={ASSETS_BASE_URL + "/img/whatsapp-icon.png"} alt="whatsapp" /></a></li>
                                                                    <li><a href={`mailto:?subject=DocPrime Refer&body=${this.getFullText()}`}><img src={ASSETS_BASE_URL + "/img/email-icon.png"} alt="email" /></a></li>
                                                                    <li><a href={`sms:?&body=${this.getLink()}`}><img src={ASSETS_BASE_URL + "/img/chat-icon.png"} alt="chat" /></a></li>
                                                                    <li>
                                                                        <a id="fb-share" type="icon_link" onClick={() => { window.open(`http://www.facebook.com/sharer.php?s=100&p[title]=DocPrime Refer&p[summary]=${this.getShareText()}&p[url]=${this.getLink()}','sharer','toolbar=0,status=0,width=580,height=325`) }} href="javascript: void(0)"><img src={ASSETS_BASE_URL + "/img/facebook-icon.png"} alt="facebook" /></a>
                                                                    </li>
                                                                </ul> : ""
                                                            }
                                                        </div>*/}
                                                        {
                                                            /*navigator && navigator.share ? <a onClick={this.share.bind(this)} href="javascript:void(0);" className="btn-share"><img src={ASSETS_BASE_URL + "/img/share-icon.png"} alt="share" /> Share Referral Link</a> : <CopyToClipboard text={this.getLink()}
                                                                onCopy={() => { SnackBar.show({ pos: 'bottom-center', text: "Referral Link Copied" }); }}>
                                                                <span style={{ cursor: 'pointer' }}>
                                                                    <a onClick={this.share.bind(this)} href="javascript:void(0);" className="btn-share"><img src={ASSETS_BASE_URL + "/img/share-icon.png"} alt="share" /> Share Referral Link</a>
                                                                </span>
                                                            </CopyToClipboard>*/
                                                        }
                                                        {
                                                            this.state.referralCode ? 
                                                                <a className="text-center ref-whtsp" href={"whatsapp://send?text=" + this.getFullText()}><img src={ASSETS_BASE_URL + "/img/wa-logo.svg"} alt="whatsapp" />Share on Whatsapp</a>
                                                            :''
                                                        }
                                                    </div> : <a style={{ marginTop: 10 }} onClick={() => {
                                                        this.props.history.push('/login')
                                                    }} href="javascript:void(0);" className="btn-share">Login to see your invite code</a>
                                                }

                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <RightBar noChatButton={true} />
                    </div>
                </section>
                <Disclaimer />
            </div>
        );
    }
}

export default ReferralView
