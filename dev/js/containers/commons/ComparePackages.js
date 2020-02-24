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
                            <img className="careBackIco" src={ASSETS_BASE_URL + "/img/careleft-arrow.svg"} />
                            <img className="careLogiImg" src={ASSETS_BASE_URL + "/img/logo-care-white.png"} />
                        </div>
                    </div>
                </div>
                <div className="careSubHeader">
                    <img className="careSubImg" src={ASSETS_BASE_URL + "/img/shape.png"} />
                    <div className="container">
                        <div className="careTextContSc">
                            <img className="caresubTxt" src={ASSETS_BASE_URL + "/img/careText.png"} />
                            <img className="caresubsmile" src={ASSETS_BASE_URL + "/img/dpsmile.png"} />
                        </div>
                    </div>
                </div>
                <section className="container container-top-margin" style={{ marginTop: '120px' }}>
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            <div className="container-fluid">
                                <div className="careMainContainer mrb-15">
                                    <h5 className="carePlanHeading">Choose a plan that’s right for your loved ones.</h5>
                                    <div className="row no-gutters">
                                        <div className="col-4">
                                            <p className="carePlans">Silver</p>
                                            <div className="careComparePanel">
                                                <p className="carePlanPrice">₹ 499/Yr.</p>
                                                <p className="carePlanPriceCut">999/Yr.</p>
                                                <div className="btn-bgwhite"><button>Buy Now</button></div>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <p className="carePlans">Gold</p>
                                            <div className="careComparePanel">
                                                <p className="carePlanPrice care-leftrightborder">₹ 499/Yr.</p>
                                                <p className="carePlanPriceCut">999/Yr.</p>
                                                <div className="btn-bgwhite"><button>Buy Now</button></div>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <p className="carePlans">Premium</p>
                                            <div className="careComparePanel">
                                                <p className="carePlanPrice">₹ 499/Yr.</p>
                                                <p className="carePlanPriceCut">999/Yr.</p>
                                                <div className="btn-bgwhite"><button>Buy Now</button></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="careCheckContainers">
                                        <h4 className="carechkHeading">Free Unlimited Online Consultation </h4>
                                        <p className="carechksubHeading">Anytime, Anywhere!</p>
                                        <div className="checkCrdcont">
                                            <div className="checkCrdimgcont no-gutters row">
                                                <div className="col-4"> <img className="checkcrdImg" src={ASSETS_BASE_URL + "/img/checkedgreen.svg"} /></div>
                                                <div className="col-4 care-leftrightborder"> <img className="checkcrdImg" src={ASSETS_BASE_URL + "/img/checkedgreen.svg"} /></div>
                                                <div className="col-4"> <img className="crosscheckcrdImg" src={ASSETS_BASE_URL + "/img/wrongcopy.svg"} /></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="careCheckContainers">
                                        <h4 className="carechkHeading">Free Unlimited Online Consultation </h4>
                                        <p className="carechksubHeading">Anytime, Anywhere!</p>
                                        <div className="checkCrdcont">
                                            <div className="checkCrdimgcont no-gutters row">
                                                <div className="col-4"> <img className="checkcrdImg" src={ASSETS_BASE_URL + "/img/checkedgreen.svg"} /></div>
                                                <div className="col-4 care-leftrightborder"> <img className="checkcrdImg" src={ASSETS_BASE_URL + "/img/checkedgreen.svg"} /></div>
                                                <div className="col-4"> <img className="crosscheckcrdImg" src={ASSETS_BASE_URL + "/img/wrongcopy.svg"} /></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="careCheckContainers">
                                        <h4 className="carechkHeading">Free Unlimited Online Consultation </h4>
                                        <p className="carechksubHeading">Anytime, Anywhere!</p>
                                        <div className="checkCrdcont">
                                            <div className="checkCrdimgcont no-gutters row" style={{ borderBottom: 'none' }}>
                                                <div className="col-4"> <img className="crosscheckcrdImg" src={ASSETS_BASE_URL + "/img/wrongcopy.svg"} /></div>
                                                <div className="col-4"> <span className="careTestYear"> 1 Test/Yr.</span></div>
                                                <div className="col-4"> <span className="careTestYear"> 2 Test/Yr.</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="widget mr-60">
                                    <div className="widget-content">
                                        <div className="careMemberContainer">
                                            <div className="careMembrLogo">
                                                <img src={ASSETS_BASE_URL + "/img/logoornage.png"} />
                                            </div>
                                            <div className="careMembrtxt">
                                                <h5>Docprime Care </h5>
                                                <p>membership</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <p className="carePara"><img src={ASSETS_BASE_URL + "/img/memsecur.png"} />Valid for :</p>
                                            </div>
                                            <div className="col-6 text-right">
                                                <p className="careSUbpara">1 year</p>
                                            </div>
                                            <div className="col-6">
                                                <p className="carePara"><img src={ASSETS_BASE_URL + "/img/memuser.png"} />Member Name :</p>
                                            </div>
                                            <div className="col-6 text-right">
                                                <p className="careSUbpara">Tarun Sehgal</p>
                                            </div>
                                            <div className="col-6">
                                                <p className="carePara"><img src={ASSETS_BASE_URL + "/img/memcall.png"} />Mobile no: </p>
                                            </div>
                                            <div className="col-6 text-right">
                                                <p className="careSUbpara">9990641820</p>
                                            </div>
                                        </div>
                                        <div className="careListingWithSideline">
                                            <ul className="UlcareListingWithSide">
                                                <li className="careListiLi"><p className="careListin">Free Unlimited Online Consultation </p>
                                                    <span>Anytime, Anywhere!</span>
                                                </li>
                                                <li className="careListiLi"><p className="careListin">Free Unlimited Online Consultation </p>
                                                    <span>Anytime, Anywhere!</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
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
                        <RightBar className="col-md-5 mb-3" msgTemplate="gold_general_template"/>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}

export default Compare