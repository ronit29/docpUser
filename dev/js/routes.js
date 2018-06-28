import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";

import SearchCriteria from './containers/opd/SearchCriteria.js'
import LocationSearch from './containers/opd/LocationSearch.js'
import SearchResults from './containers/opd/SearchResults.js'
import DoctorProfile from './containers/opd/DoctorProfile.js'
import AppointmentSlot from './containers/opd/AppointmentSlot.js'
import PatientDetails from './containers/opd/PatientDetails.js'
import Booking_OPD from './containers/opd/Booking.js'

import UserProfile from './containers/commons/UserProfile.js'
import UserSignup from './containers/commons/UserSignup'
import UserLogin from './containers/commons/UserLogin'
import Notifications from './containers/commons/Notifications'
import DoctorChat from './containers/commons/Chat.js'
import Home from './containers/commons/Home'
import Wallet from './containers/commons/Wallet'
import NotFound from './containers/commons/404'

import Booking_LAB from './containers/diagnosis/Booking.js'
import DX_SearchCriteria from './containers/diagnosis/SearchCriteria.js'
import DX_SearchResults from './containers/diagnosis/SearchResults.js'
import Lab from './containers/diagnosis/Lab.js'
import DX_BookingSummary from './containers/diagnosis/BookingSummary.js'
import TestSelector from './containers/diagnosis/TestSelector'
import AppointmentSlot_Lab from './containers/diagnosis/AppointmentSlot.js'


const routes = [

    { path: '/', exact: true, component: Home },
    { path: '/user', component: UserProfile },
    { path: '/locationsearch', exact: true, component: LocationSearch },
    { path: '/chat', exact: true, component: DoctorChat },
    { path: '/notifications', exact: true, component: Notifications },
    { path: '/login', exact: true, component: UserLogin },
    { path: '/signup', exact: true, component: UserSignup },
    { path: '/addprofile', exact: true, component: UserSignup },
    { path: '/wallet', exact: true, component: Wallet },

    { path: '/opd', exact: true, component: SearchCriteria },
    { path: '/opd/searchresults', exact: true, component: SearchResults },
    { path: '/opd/doctor/:id', exact: true, component: DoctorProfile },
    { path: '/opd/doctor/:id/:clinicId/book', exact: true, component: AppointmentSlot },
    { path: '/opd/doctor/:id/:clinicId/bookdetails', exact: true, private: true, component: PatientDetails },
    { path: '/opd/appointment/:refId', exact: true, component: Booking_OPD },


    { path: '/dx', exact: true, component: DX_SearchCriteria },
    { path: '/dx/searchresults', exact: true, component: DX_SearchResults },
    { path: '/lab/:id', exact: true, component: Lab },
    { path: '/lab/:id/tests', exact: true, component: TestSelector },
    { path: '/lab/:id/timeslots', exact: true, component: AppointmentSlot_Lab },
    { path: '/lab/:id/book', exact: true, component: DX_BookingSummary },
    { path: '/lab/appointment/:refId', exact: true, component: Booking_LAB },

    { path: '*', component: NotFound },
]

class RouterConfig extends Component {

    static ROUTES = routes

    render() {
        return (
            <div>
                <Route
                    render={
                        ({ location }) => {
                            return (
                                <TransitionGroup>
                                    <CSSTransition
                                        key={location.pathname}
                                        classNames="fade"
                                        timeout={{ enter: 300, exit: 0 }}
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

