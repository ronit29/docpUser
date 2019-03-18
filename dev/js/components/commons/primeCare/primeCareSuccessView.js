import React from 'react';
import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'
import Footer from '../Home/footer'
import Loader from '../../commons/Loader'

class PrimeCareSuccessView extends React.Component {
    constructor(props) {
        super(props)
    }

    getDate(unix_date){
        let date = new Date(unix_date)
        let newDate= date.toDateString()
        return newDate
    }

    render() {
        let self = this
        if(this.props.data){
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
                                        <p className="careDecparadate">{this.getDate(this.props.data.created_at)} - {this.getDate(this.props.data.expire_at)}</p>
                                    </div>
                                </div>
                                <div className="careThankyouContainer">
                                    <div className="careThankyouContainerCard">
                                        <ul className="UlcareListingWithSide mt-rmv">
                                            {
                                                this.props.data && this.props.data.unlimited_online_consultation?
                                                    <li className="careListiLi"><p className="careListin">Free Unlimited Online Consultation </p>
                                                        <span>Anytime, Anywhere!</span>
                                                    </li>
                                                :''
                                            }

                                            {
                                                this.props.data && this.props.data.priority_queue?
                                                    <li className="careListiLi"><p className="careListin">Priority Queue </p>
                                                        <span>No waiting time!</span>
                                                    </li>
                                                :''
                                            }

                                            {
                                                this.props.data?
                                                    Object.entries(this.props.data.features).map(function ([key, value]) {
                                                        if(value.count != null){
                                                            return <li key={value.id} className="careListiLi">
                                                                        <p className="careListin">{value.name} </p>
                                                                    </li>
                                                        }
                                                    })
                                                :''
                                            }
                                            
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
            )
        }else{
            return (
                <div className="profile-body-wrap" style={{ paddingBottom: 54 }}>
                    <ProfileHeader />
                    <section className="container container-top-margin">
                    </section>
                    <Loader />
                </div>
                )
        }
    }
}


export default PrimeCareSuccessView
