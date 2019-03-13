import React from 'react';
import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'
import Footer from '../Home/footer'

class PrimeCareBookingView extends React.Component {
    constructor(props) {
        super(props)
    }

    proceed(){
        this.props.history.push('/prime/success')
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
                        </div>
                        <RightBar className="col-md-5 mb-3" />
                    </div>
                </section>
                <button onClick={this.proceed.bind(this)} className="p-3 v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn">Book Now</button>
                <Footer />
            </div>
        );
    }
}


export default PrimeCareBookingView
