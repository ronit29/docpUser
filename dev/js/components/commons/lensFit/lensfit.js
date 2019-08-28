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

        return (
            <div className="profile-body-wrap" style={{ paddingBottom: 54 }}>
                <ProfileHeader />
                <section className="container article-container">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-7 col-lg-8 center-column">
                            <div className="container-fluid article-column mb-3">
                                <img src="" />
                                <h1 className="lansfit-tp-hdng">
                                    “FREE PAIR OF EYE GLASSES <br></br>
                                    (Frame + Lens)<br></br>
                                    OR SUNGLASSES”
                                </h1>

                            </div>
                            <div className="container-fluid article-column mb-3 lns-lst-cont">
                                <p className="lns-avl-ofr">How to avail the offer: </p>
                                <div className="lsn-stps-container">
                                    <p className="lns-steps-para"><span>Step 1.</span> Once the appointment is completed, user will get lensfit unique code through message and email </p>
                                    <p className="lns-steps-para"><span>Step 2.</span> Step 2.   visit  <a src="https://www.lensfit.com/collections/docprime ">https://www.lensfit.com/collections/docprime </a>to redeem the offer. All products on this link will be 100% OFF</p>
                                </div>
                                <div className="lns-offr-apl-cont">
                                    <p>*Offer only applicable on completed OPD and lab bookings</p>
                                    <p>*Coupon is not transferable or redeemable for cash</p>
                                    <p>*Coupon code is valid till 31st December 2019 and can be used only once</p>
                                    <p>*Delivery and Processing charge of ₹299 + GST</p>
                                </div>
                            </div>
                        </div>
                        <RightBar colClass="col-lg-4" />
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}

export default Lensfit