import React from 'react';
import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'
import Footer from '../Home/footer'

class PrimeCareView extends React.Component {
    constructor(props) {
        super(props)
    }

    buyNow(){
        console.log('buynow')
        this.props.history.push('/prime/booking')
    }

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
                    <img className="careSubImg" src={ASSETS_BASE_URL + "/img/subhead.svg"} />
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
                                                <div className="btn-bgwhite"><button onClick={this.buyNow.bind(this)}>Buy Now</button></div>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <p className="carePlans">Gold</p>
                                            <div className="careComparePanel">
                                                <p className="carePlanPrice care-leftrightborder">₹ 499/Yr.</p>
                                                <p className="carePlanPriceCut">999/Yr.</p>
                                                <div className="btn-bgwhite"><button onClick={this.buyNow.bind(this)}>Buy Now</button></div>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <p className="carePlans">Premium</p>
                                            <div className="careComparePanel">
                                                <p className="carePlanPrice">₹ 499/Yr.</p>
                                                <p className="carePlanPriceCut">999/Yr.</p>
                                                <div className="btn-bgwhite"><button onClick={this.buyNow.bind(this)}>Buy Now</button></div>
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


export default PrimeCareView
