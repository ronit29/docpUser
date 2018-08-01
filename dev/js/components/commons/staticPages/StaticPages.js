import React from 'react';

import AboutUs from './aboutUs.js'
import ContactUs from './contactUs'


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

                <Route exact path={`${this.props.match.url}about`} render={(props) => {
                    return <AboutUs {...this.props} {...props} />
                }} />

                <Route exact path={`${this.props.match.url}contact`} render={(props) => {
                    return <ContactUs {...this.props} {...props} />
                }} />

            </div>
        );
    }
}


export default StaticPagesView
