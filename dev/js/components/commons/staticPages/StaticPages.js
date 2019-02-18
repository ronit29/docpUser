import React from 'react';

import AboutUs from './aboutUs.js'
import ContactUs from './contactUs'
import Privacy from './privacy'
import HowitWorks from './howitWorks'
import Disclaimer from './disclaimer'
import Terms from './terms'
import Careers from './careers'
import Media from './media'
import Doctorsignup from './doctorsignup'
import CancelPolicy from './cancelPolicy.js'

import Footer from '../../commons/Home/footer'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import Loader from '../../commons/Loader'
import { Route } from 'react-router-dom'

const queryString = require('query-string');




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
        //const parsed = queryString.parse(window.location.search)
        const parsed = queryString.parse(this.props.location.search)

        return (
            <div className="profile-body-wrap">
                {
                    parsed.fromApp?'':<ProfileHeader />
                }
                <div className="sub-header d-none d-lg-block" />

                {/* <div className="d-lg-none">
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
                </div> */}

                <Route exact path={'/about'} render={(props) => {
                    return <AboutUs {...this.props} {...props} fromApp={parsed.fromApp?parsed.fromApp:false}/>
                }} />

                <Route exact path={'/contact'} render={(props) => {
                    return <ContactUs {...this.props} {...props} fromApp={parsed.fromApp?parsed.fromApp:false} />
                }} />

                <Route exact path={'/privacy'} render={(props) => {
                    return <Privacy {...this.props} {...props} />
                }} />

                <Route exact path={'/howitworks'} render={(props) => {
                    return <HowitWorks {...this.props} {...props} />
                }} />

                <Route exact path={'/disclaimer'} render={(props) => {
                    return <Disclaimer {...this.props} {...props} fromApp={parsed.fromApp?parsed.fromApp:false}/>
                }} />

                <Route exact path={'/terms'} render={(props) => {
                    return <Terms {...this.props} {...props} fromApp={parsed.fromApp?parsed.fromApp:false}/>
                }} />

                <Route exact path={'/careers'} render={(props) => {
                    return <Careers {...this.props} {...props} />
                }} />

                <Route exact path={'/media'} render={(props) => {
                    return <Media {...this.props} {...props} />
                }} />

                <Route exact path={'/doctorsignup'} render={(props) => {
                    return <Doctorsignup {...this.props} {...props} />
                }} />

                <Route exact path={'/cancelpolicy'} render={(props) => {
                    return <CancelPolicy {...this.props} {...props} fromApp={parsed.fromApp?parsed.fromApp:false}/>
                }} />

                {
                    parsed.fromApp?'':<Footer />
                }

            </div>
        );
    }
}


export default StaticPagesView
