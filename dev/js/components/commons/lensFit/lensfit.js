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
                            <div className="container-fluid article-column">
                            </div>
                        </div>
                        <RightBar colClass="col-lg-4"/>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}

export default Lensfit