import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import HelmetTags from './components/commons/HelmetTags'

import SearchCriteria from './containers/opd/SearchCriteria.js'
import LocationSearch from './containers/opd/LocationSearch.js'
import SearchResults from './containers/opd/SearchResults.js'
import DoctorProfile from './containers/opd/DoctorProfile.js'
import AppointmentSlot from './containers/opd/AppointmentSlot.js'
import PatientDetails from './containers/opd/PatientDetails.js'
import Booking_OPD from './containers/opd/Booking.js'
import AppointmentReschedule from './containers/opd/AppointmentReschedule.js'

import UserProfile from './containers/commons/UserProfile.js'
import UserSignup from './containers/commons/UserSignup'
import UserLogin from './containers/commons/UserLogin'
import Notifications from './containers/commons/Notifications'
import DoctorChat from './containers/commons/Chat.js'
import Home from './containers/commons/Home'
import Wallet from './containers/commons/Wallet'
import NotFound from './containers/commons/404'
import Article from './containers/commons/article'
import ArticleList from './containers/commons/articleList'
import Payment from './containers/commons/Payment'
import ChatHistory from './containers/commons/chatHistory'
import StaticPages from './containers/commons/StaticPages'

import Booking_LAB from './containers/diagnosis/Booking.js'
import DX_SearchCriteria from './containers/diagnosis/SearchCriteria.js'
import DX_SearchResults from './containers/diagnosis/SearchResults.js'
import Lab from './containers/diagnosis/Lab.js'
import DX_BookingSummary from './containers/diagnosis/BookingSummary.js'
import TestSelector from './containers/diagnosis/TestSelector'
import AppointmentSlot_Lab from './containers/diagnosis/AppointmentSlot.js'

import AgentLogin from './containers/commons/agentLogin.js'
import DirectBooking from './containers/commons/directBooking.js'
import GTM from './helpers/gtm.js'
import CouponSelectNewView from  './containers/commons/CouponsView.js'


/**
 * RENDER_ON_SERVER : true will enable Server-side-rendering  for that route.
 */

const routes = [

    { path: '/', exact: true, component: Home, RENDER_ON_SERVER: true },
    { path: '/user', component: UserProfile },
    { path: '/locationsearch', exact: true, component: LocationSearch },
    { path: '/chat', exact: true, component: DoctorChat },
    { path: '/chathistory', exact: true, component: ChatHistory },
    { path: '/notifications', exact: true, component: Notifications },
    { path: '/login', exact: true, component: UserLogin },
    { path: '/signup', exact: true, component: UserSignup },
    { path: '/addprofile', exact: true, component: UserSignup },
    { path: '/wallet', exact: true, component: Wallet },
    { path: `/*-dsdp`, component: Article, RENDER_ON_SERVER: true },
    { path: `/*-mddp`, component: Article, RENDER_ON_SERVER: true },
    { path: `/all-diseases`, component: ArticleList, RENDER_ON_SERVER: true },
    { path: `/all-medicines`, component: ArticleList, RENDER_ON_SERVER: true },
    { path: '/payment/:id', exact: true, component: Payment },

    { path: '/opd', exact: true, component: SearchCriteria },
    { path: '/opd/searchresults', exact: true, component: SearchResults, RENDER_ON_SERVER: true },
    { path: '/opd/searchresults/location=*', exact: true, component: SearchResults, RENDER_ON_SERVER: false },
    { path: '/*-sptcit', exact: true, component: SearchResults, RENDER_ON_SERVER: true },
    { path: '/*-sptlitcit', exact: true, component: SearchResults, RENDER_ON_SERVER: true },
    { path: '/opd/doctor/:id', exact: true, component: DoctorProfile, RENDER_ON_SERVER: true },
    { path: '/*-dpp', exact: true, component: DoctorProfile, RENDER_ON_SERVER: true },
    { path: '/opd/doctor/:id/:clinicId/book', exact: true, component: AppointmentSlot },
    { path: '/opd/doctor/:id/:clinicId/bookdetails', exact: true, private: true, component: PatientDetails },
    { path: '/coupon', exact: true, private: true, component: CouponSelectNewView },
    { path: '/opd/appointment/:refId', exact: true, component: Booking_OPD },
    { path: '/opd/reschedule/:refId', exact: true, component: AppointmentReschedule },

    { path: '/lab', exact: true, component: DX_SearchCriteria },
    { path: '/lab/searchresults', exact: true, component: DX_SearchResults, RENDER_ON_SERVER: true },
    { path: '/lab/searchresults/location=*', exact: true, component: DX_SearchResults, RENDER_ON_SERVER: false },
    { path: '/*-lbcit', exact: true, component: DX_SearchResults, RENDER_ON_SERVER: true },
    { path: '/*-lblitcit', exact: true, component: DX_SearchResults, RENDER_ON_SERVER: true },
    { path: '/lab/:id', exact: true, component: Lab, RENDER_ON_SERVER: true },
    { path: '/*-lpp', exact: true, component: Lab, RENDER_ON_SERVER: true },
    { path: '/lab/:id/tests', exact: true, component: TestSelector },
    { path: '/lab/:id/timeslots', exact: true, component: AppointmentSlot_Lab },
    { path: '/lab/:id/book', exact: true, component: DX_BookingSummary },
    { path: '/lab/appointment/:refId', exact: true, component: Booking_LAB },

    { path: '/about', exact: true, component: StaticPages, RENDER_ON_SERVER: true },
    { path: '/howitworks', exact: true, component: StaticPages, RENDER_ON_SERVER: true },
    { path: '/privacy', exact: true, component: StaticPages, RENDER_ON_SERVER: true },
    { path: '/disclaimer', exact: true, component: StaticPages, RENDER_ON_SERVER: true },
    { path: '/contact', exact: true, component: StaticPages, RENDER_ON_SERVER: true },
    { path: '/terms', exact: true, component: StaticPages, RENDER_ON_SERVER: true },
    { path: '/careers', exact: true, component: StaticPages, RENDER_ON_SERVER: true },
    { path: '/media', exact: true, component: StaticPages, RENDER_ON_SERVER: true },
    { path: '/doctorsignup', exact: true, component: StaticPages, RENDER_ON_SERVER: true },

    { path: '/agent/login', exact: true, component: AgentLogin },
    { path: '/agent/booking', exact: true, component: DirectBooking },

    { path: '*', component: NotFound },
]

class RouterConfig extends Component {

    static ROUTES = routes


    render() {
        return (
            <div>
                <HelmetTags />
                <Route
                    render={
                        ({ location }) => {
                            return (
                                <TransitionGroup>
                                    <CSSTransition
                                        key={location.pathname}
                                        classNames="fade"
                                        timeout={{ enter: 250, exit: 0 }}
                                        exit={false}
                                    >
                                        <Switch location={location}>
                                            {routes.map((route, i) => (
                                                <Route {...route} key={i} />
                                            ))}
                                        </Switch>
                                    </CSSTransition>
                                </TransitionGroup>
                            )
                        }
                    }
                />

            </div>
        )
    }

}


export default RouterConfig

