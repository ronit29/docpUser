import React from 'react';
const queryString = require('query-string');

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'

class ReferralView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

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
                                                <div className="social-icon-referral">
                                                    <ul className="text-center">
                                                        <li><img src={ASSETS_BASE_URL + "/img/whatsapp-icon.png"} alt="whatsapp" /></li>
                                                        <li><img src={ASSETS_BASE_URL + "/img/email-icon.png"} alt="email" /></li>
                                                        <li><img src={ASSETS_BASE_URL + "/img/chat-icon.png"} alt="chat" /></li>
                                                        <li><img src={ASSETS_BASE_URL + "/img/facebook-icon.png"} alt="facebook" /></li>
                                                    </ul>
                                                </div>
                                                <a href="javascript:void(0);" className="btn-share"><img src={ASSETS_BASE_URL + "/img/share-icon.png"} alt="share" /> Share Refral Link</a>
                                                <a href="javascript:void(0);" className="take-care">*T&amp;C Apply</a>
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
