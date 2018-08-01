import React from 'react';

import AboutUs from './aboutUs.js'
import ContactUs from './contactUs'
import Privacy from './privacy'
import HowitWorks from './howitWorks'
import Disclaimer from './disclaimer'
import Terms from './terms'

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
                <ProfileHeader />
                <div className="subheader d-none d-lg-block" />

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

                <Footer />

            </div>
        );
    }
}


export default StaticPagesView
