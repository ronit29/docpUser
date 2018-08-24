import React from 'react';

import AboutUs from './aboutUs.js'
import ContactUs from './contactUs'
import Privacy from './privacy'
import HowitWorks from './howitWorks'
import Disclaimer from './disclaimer'
import Terms from './terms'
import Careers from './careers'
import Media from './media'

import Footer from '../../commons/Home/footer'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import Loader from '../../commons/Loader'
import { Route } from 'react-router-dom'



class StaticPagesView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    render() {

        return (
            <div className="profile-body-wrap">
                <ProfileHeader homePage={true} />
                <div className="sub-header d-none d-lg-block" />

                <div className="d-lg-none">
                    <header className="wallet-header sticky-header chat-header" style={{ height: 50 }} >
                        <div className="container-fluid header-container">
                            <div className="row header-row">
                                <div className="col-2">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/left-arrow.svg"} className="back-icon-orange" onClick={() => {
                                        this.props.history.go(-1)
                                    }} />
                                </div>
                                <div className="col-8 logo-col text-center">
                                    <img src="/assets/img/doc-prime-logo.png" style={{ width: 60 }} onClick={() => {
                                        this.props.history.push('/')
                                    }} />
                                </div>
                            </div>
                        </div>
                    </header>
                </div>

                <Route exact path={'/about'} render={(props) => {
                    return <AboutUs {...this.props} {...props} />
                }} />

                <Route exact path={'/contact'} render={(props) => {
                    return <ContactUs {...this.props} {...props} />
                }} />

                <Route exact path={'/privacy'} render={(props) => {
                    return <Privacy {...this.props} {...props} />
                }} />

                <Route exact path={'/howitworks'} render={(props) => {
                    return <HowitWorks {...this.props} {...props} />
                }} />

                <Route exact path={'/disclaimer'} render={(props) => {
                    return <Disclaimer {...this.props} {...props} />
                }} />

                <Route exact path={'/terms'} render={(props) => {
                    return <Terms {...this.props} {...props} />
                }} />

                <Route exact path={'/careers'} render={(props) => {
                    return <Careers {...this.props} {...props} />
                }} />

                <Route exact path={'/media'} render={(props) => {
                    return <Media {...this.props} {...props} />
                }} />

                <Footer />

            </div>
        );
    }
}


export default StaticPagesView
