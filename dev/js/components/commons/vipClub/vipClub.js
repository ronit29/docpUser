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
                    <div className="careHeaderBar">
                        <div className="container">
                            <div className="care-logo-container">
                                <div>
                                <img className="careBackIco" src={ASSETS_BASE_URL + "/img/careleft-arrow.svg"} onClick={() => this.props.history.push('/')} />
                                </div>
                                <img className="careLogiImg" src={ASSETS_BASE_URL + "/img/logo-care-white.png"} />
                            </div>
                        </div>
                    </div>
                    <div className="careSubHeader">
                        <img className="careSubImg" src={ASSETS_BASE_URL + "/img/shape.png"} />
                        <div className="container">
                            <div className="careTextContSc">
                                <img className="caresubTxt" src={ASSETS_BASE_URL + "/img/careText.png"} />
                                {/* <img className="caresubsmile" src={ASSETS_BASE_URL + "/img/dpsmile.png"} /> */}
                            </div>
                        </div>
                    </div>
                    <section className="container container-top-margin" style={{ marginTop: '120px' }}>
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