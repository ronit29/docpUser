import React from 'react';
import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'
import Footer from '../Home/footer'
import Loader from '../../commons/Loader'

class PrimeCareSuccessView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chatError: false
        }
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
                                                        <span>Our online consultation timings are from 8:00 AM to 5:00 PM</span>
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
                                                                        <span>{`Memeber can avail this offer ${value.count ==2?'twice':'once'} in a year`}</span>
                                                                        {/*<p className="careAvlP"><img src={ASSETS_BASE_URL + "/img/tec.svg"}/>{value.count} Available</p>*/}
                                                                    </li>
                                                        }
                                                    })
                                                :''
                                            }
                                            
                                        </ul>
                                        <div className="d-flex justify-content-center align-items-center mrb-10" onClick={()=>this.setState({chatError: true}) } >
                                            <button class="cstm-book-btn fw-500" style={{ width: 100, marginTop: 0 }}>Chat now</button>
                                        </div>
                                        {
                                            this.state.chatError?
                                            <div className="info-rtl chat-err mrb-15">
                                                Due to Covida-19 outbreak, our chat services are temporarily suspended. We are sorry for the inconvenience caused
                                            </div>
                                            :''
                                        }
                                        <p className="careThankpara">Thanks for choosing <a onClick={(e) =>this.props.history.push('/')}>docprime.com</a></p>
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
