import React from 'react';
const queryString = require('query-string');

import CONFIG from '../../../config'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SnackBar from 'node-snackbar'
import STORAGE from '../../../helpers/storage'


class ReferralView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            referralCode: null
        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }

        if (STORAGE.checkAuth()) {
            this.props.fetchReferralCode().then((res) => {
                if (res && res.code) {
                    this.setState({ referralCode: res.code })
                }
            }).catch((e) => {

            })
        }

    }

    getLink() {
        return `${CONFIG.API_BASE_URL}/login?referral=${this.state.referralCode}`
    }

    getShareText() {
        return `Save upto 50% on doctor appointments and lab tests. Sign up on docprime.com with my code {this.state.referralCode} and get Rs 50 - Referral Link`
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
                                                            <img src={ASSETS_BASE_URL + "/img/step-1.png"} alt="img" className="" />
                                                            <div className="badge badge-refer">1</div>
                                                        </div>
                                                        <div className="text-step">
                                                            Invite your friend on <br /> docprime.com
                                                        </div>
                                                    </div>
                                                    <div className="steps step-2">
                                                        <div className="text-step text-step-2">
                                                            Your friend gets <img src={ASSETS_BASE_URL + "/img/rupee-icon.svg"} alt="rupee-icon" className="icon-rupee" /> 50 on <br /> Signup in docprime wallet
                                                            <div className="badge badge-refer">2</div>
                                                        </div>

                                                        <div className="img-step">
                                                            <img src={ASSETS_BASE_URL + "/img/step-2.png"} alt="img" className="" />
                                                        </div>
                                                    </div>
                                                    <div className="steps">
                                                        <div className="img-step">
                                                            <img src={ASSETS_BASE_URL + "/img/step-3.png"} alt="img" className="" />
                                                            <div className="badge badge-refer">3</div>
                                                        </div>

                                                        <div className="text-step">
                                                            You get <img src={ASSETS_BASE_URL + "/img/rupee-icon.svg"} alt="rupee-icon" className="icon-rupee" /> 50 on completion of <br /> your friends first appointment <br /> in docprime wallet
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    STORAGE.checkAuth() ? <div>
                                                        <h4 className="inviteCodeShare" style={{ margin: '10px 0px' }}>Share your invite code<span>{this.state.referralCode}</span></h4>

                                                        <div className="social-icon-referral">
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
                                                        </div>
                                                        {
                                                            navigator && navigator.share ? <a onClick={this.share.bind(this)} href="javascript:void(0);" className="btn-share"><img src={ASSETS_BASE_URL + "/img/share-icon.png"} alt="share" /> Share Referral Link</a> : <CopyToClipboard text={this.getLink()}
                                                                onCopy={() => { SnackBar.show({ pos: 'bottom-center', text: "Url Copied" }); }}>
                                                                <span style={{ cursor: 'pointer' }}>
                                                                    <a onClick={this.share.bind(this)} href="javascript:void(0);" className="btn-share"><img src={ASSETS_BASE_URL + "/img/share-icon.png"} alt="share" /> Share Referral Link</a>
                                                                </span>
                                                            </CopyToClipboard>
                                                        }
                                                    </div> : <a style={{ marginTop: 10 }} onClick={() => {
                                                        this.props.history.push('/login')
                                                    }} href="javascript:void(0);" className="btn-share">Login to see you invite code</a>
                                                }

                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <RightBar />
                    </div>
                </section>
            </div>
        );
    }
}

export default ReferralView
