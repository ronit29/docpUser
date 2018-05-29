import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";

import SearchCriteria from './containers/opd/SearchCriteria.js'
import LocationSearch from './containers/opd/LocationSearch.js'
import SearchResults from './containers/opd/SearchResults.js'
import SearchResultsFilter from './containers/opd/SearchResultsFilter.js'
import DoctorProfile from './containers/opd/DoctorProfile.js'

import AppointmentSlot from './containers/opd/AppointmentSlot.js'
import PatientDetails from './containers/opd/PatientDetails.js'

import UserProfile from './containers/commons/UserProfile.js'
import UserSignup from './containers/commons/UserSignup'

import Payment from './containers/opd/Payment.js'
import Booking from './containers/opd/Booking.js'
import CriteriaSearch from './containers/opd/CriteriaSearch.js'
import DX_SearchCriteria from './containers/diagnosis/SearchCriteria.js'
import DX_SearchResults from './containers/diagnosis/SearchResults.js'
import Lab from './containers/diagnosis/Lab.js'
import DX_PatientDetails from './containers/diagnosis/PatientDetails.js'
import DX_BookingSummary from './containers/diagnosis/BookingSummary.js'
import DoctorChat from './containers/commons/Chat.js'
import TestSelector from './containers/diagnosis/TestSelector'
import AppointmentSlot_Lab from './containers/diagnosis/AppointmentSlot.js'
import UserLogin from './containers/commons/UserLogin'

import Home from './containers/commons/Home'

const routes = [

    { path: '/', exact: true, component: Home },

    { path: '/opd', exact: true, component: SearchCriteria },
    { path: '/locationsearch', exact: true, component: LocationSearch },
    { path: '/opd/searchresults', exact: true, component: SearchResults },
    { path: '/opd/doctor/:id', exact: true, component: DoctorProfile },
    { path: '/opd/doctor/:id/:clinicId/book', exact: true, component: AppointmentSlot },
    { path: '/opd/doctor/:id/:clinicId/bookdetails', exact: true, private: true, component: PatientDetails },

    { path: '/user', component: UserProfile },

    { path: '/chat', exact: true, component: DoctorChat },
    { path: '/payment', exact: true, component: Payment },
    { path: '/booking/:refId', exact: true, component: Booking },

    { path: '/login', exact: true, component: UserLogin },
    { path: '/signup', exact: true, component: UserSignup },
    { path: '/addprofile', exact: true, component: UserSignup },

    { path: '/dx', exact: true, component: DX_SearchCriteria },
    { path: '/dx/searchresults', exact: true, component: DX_SearchResults },
    { path: '/lab/:id', exact: true, component: Lab },
    { path: '/lab/:id/tests', exact: true, component: TestSelector },
    { path: '/lab/:id/book', exact: true, component: DX_BookingSummary },

    { path: '/lab/:id/timeslots', exact: true, component: AppointmentSlot_Lab },

    { path: '/lab/booking/summary/:id', exact: true, component: DX_BookingSummary },

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

