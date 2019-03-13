import React from 'react';
import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'
import Footer from '../Home/footer'

class PrimeCareSuccessView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="profile-body-wrap" style={{ paddingBottom: 54 }}>
                <ProfileHeader />
                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            <div className="container-fluid">
                            </div>
                            <div className="careFinalscreenContainer">
                                <div className="careDocwithBg">
                                    <div className="careDocwithBglogo">
                                        <img className="careLogiImg" src={ASSETS_BASE_URL + "/img/logo-care-white.png"} />
                                    </div>
                                    <p className="careDecparacong">Congratulations!</p>
                                    <p className="careDecparasub">Your Docprime care membership is active</p>
                                    <p className="careDecparadate">10 Oct 2018 - 11 Oct 2018</p>
                                </div>
                            </div>
                            <div className="careThankyouContainer">
                                <div className="careThankyouContainerCard">
                                    <ul className="UlcareListingWithSide mt-rmv">
                                        <li className="careListiLi"><p className="careListin">Free Unlimited Online Consultation </p>
                                            <span>Anytime, Anywhere!</span>
                                        </li>
                                        <li className="careListiLi"><p className="careListin">Free Unlimited Online Consultation </p>
                                            <span>Anytime, Anywhere!</span>
                                        </li>
                                        <li className="careListiLi"><p className="careListin">Free Unlimited Online Consultation </p>
                                            <span>Anytime, Anywhere!</span>
                                        </li>
                                    </ul>
                                    <p className="careThankpara">Thanks for choosing <a>docprime.com</a></p>
                                </div>
                            </div>
                        </div>
                        <RightBar className="col-md-5 mb-3" />
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}


export default PrimeCareSuccessView
