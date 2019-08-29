import React from 'react';

import LeftBar from '../../commons/LeftBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import CONFIG from '../../../config'
import HelmetTags from '../../commons/HelmetTags'
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

class VipClub extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
    }

    render() {

        return (


            <div className="profile-body-wrap">
                {/* <ProfileHeader /> */}
                <div className="vipHeaderBar">
                    <div className="vipBackIco">
                        <img src={ASSETS_BASE_URL + "/img/careleft-arrow.svg"} />
                    </div>
                    <div className="vip-logo-cont">
                        <img className="vipLogiImg" src={ASSETS_BASE_URL + "/img/logo-care-white.png"} />
                        <h1>in Just ₹5,000 ₹4,000  </h1>
                        <p>1 year upto 4 members</p>
                    </div>
                </div>
                <section className="container container-top-margin" style={{ marginTop: '' }}>
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 center-column">
                            <div className="container-fluid">
                                <div className="care-new-container">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default VipClub