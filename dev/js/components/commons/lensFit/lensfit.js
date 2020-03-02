import React from 'react';

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import CONFIG from '../../../config'
import HelmetTags from '../../commons/HelmetTags'
import Footer from '../Home/footer'
import GTM from '../../../helpers/gtm'
import InitialsPicture from '../initialsPicture';
import STORAGE from '../../../helpers/storage';
// import CommentBox from './ArticleCommentBox.js'
import SnackBar from 'node-snackbar'
// import Reply from './Reply.js'
import BannerCarousel from '../Home/bannerCarousel';
import ArticleAuthor from '../articleAuthor/articleAuthor';
import LocationElements from '../../../containers/commons/locationElements'
import CommonSearch from '../../../containers/commons/CommonSearch.js'
import FixedMobileFooter from '../Home/FixedMobileFooter'
const queryString = require('query-string');
import Disclaimer from '../../commons/Home/staticDisclaimer.js'
// import FooterTestSpecializationWidgets from './FooterTestSpecializationWidgets.js'

// import RelatedArticles from './RelatedArticles'

class Lensfit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
    }

    render() {
        const parsed = queryString.parse(this.props.location.search)
        let backUrl
            if(parsed && parsed.callbackurl){
                backUrl = parsed.callbackurl
                if(parsed.hospital_id){
                    backUrl += '&hospital_id='+parsed.hospital_id+'&isLensfitSpecific=true'
                }
                if(parsed.lab_id){
                    backUrl += '&lab_id='+parsed.lab_id+'&isLensfitSpecific=true'
                }
            }

        return (
            <div className="profile-body-wrap" style={{ paddingBottom: 54 }}>
                <ProfileHeader />
                <section className="container article-container font-analyze">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-7 col-lg-8 center-column">
                            <div className="container-fluid article-column mb-3">
                                <img className="lnsfit-doc" src={ASSETS_BASE_URL + "/img/lensico.png"} />
                                <h1 className="lansfit-tp-hdng">
                                    “FREE PAIR OF EYE GLASSES <br></br>
                                    (Frame + Lens)<br></br>
                                    OR SUNGLASSES worth ₹720 ”
                                </h1>

                            </div>
                            <div className="container-fluid article-column mb-3 lns-lst-cont">
                                <p className="lns-avl-ofr">How to avail the offer: </p>
                                <div className="lsn-stps-container">
                                    <div className="lns-steps-para"><span>Step 1.</span> <p>Once the appointment is completed, you will get lensfit unique code through message and email</p> </div>
                                    <div className="lns-steps-para"><span>Step 2.</span> <p>visit  <a href="https://www.lensfit.com/collections/docprime" target="_blank">https://www.lensfit.com/collections/docprime </a>to redeem the offer. All products on this link will be 100% OFF with delivery charge of ₹299 + GST </p></div>
                                </div>
                                <div className="lns-offr-apl-cont">
                                    <p>*Offer only applicable on completed OPD and lab bookings</p>
                                    <p>*Coupon is not transferable or redeemable for cash</p>
                                    {/* <p>*Coupon code is valid till 31st December 2019 and can be used only once</p> */}
                                    {/*<p>*Delivery charge of ₹299 + GST</p>*/}
                                </div>
                            </div>
                        </div>
                        <RightBar colClass="col-lg-4" msgTemplate="gold_general_template"/>
                    </div>
                </section>
                <Disclaimer />
                <button className="lenfit-backbtn" onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                this.props.history.push('/offers')
                                }}>
                Back</button>
            </div>
        );
    }
}

export default Lensfit