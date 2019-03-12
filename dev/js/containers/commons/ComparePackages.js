import React from 'react'
import LeftBar from '../../components/commons/LeftBar'
import RightBar from '../../components/commons/RightBar'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import Footer from '../../components/commons/Home/footer'


class Compare extends React.Component {

    render() {

        return (
            <div className="profile-body-wrap" style={{ paddingBottom: 54 }}>
                {/* <ProfileHeader /> */}
                <div className="careHeaderBar">
                    <div className="container">
                        <div className="care-logo-container">
                            <img src={ASSETS_BASE_URL + ""} />
                            <img className="careLogiImg" src={ASSETS_BASE_URL + "/img/logo-care-white.png"} />
                        </div>
                    </div>
                </div>
                <div className="careSubHeader">
                    <img className="careSubImg" src={ASSETS_BASE_URL + "/img/subhead.svg"} />
                    <img className="caresubTxt" src={ASSETS_BASE_URL + "/img/subhead.svg"} />
                </div>
                <section className="container article-container">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-7 col-lg-8 center-column">
                        </div>
                        <RightBar colClass="col-lg-4" />
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}

export default Compare