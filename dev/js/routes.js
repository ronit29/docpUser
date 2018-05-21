import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { TransitionGroup, CSSTransition } from "react-transition-group";

import SearchCriteria from './containers/opd/SearchCriteria.js'
import LocationSearch from './containers/opd/LocationSearch.js'
import SearchResults from './containers/opd/SearchResults.js'
import SearchResultsFilter from './containers/opd/SearchResultsFilter.js'
import DoctorProfile from './containers/opd/DoctorProfile.js'
import ClinicList from './containers/opd/ClinicList.js'
import AppointmentSlot from './containers/opd/AppointmentSlot.js'
import PatientDetails from './containers/opd/PatientDetails.js'

import UserProfile from './containers/commons/UserProfile.js'
import UserAppointments from './containers/commons/UserAppointments.js'
import UserReports from './containers/commons/UserReports.js'
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


const routes = [

    { path: '/', exact: true, component: SearchCriteria },
    { path: '/locationsearch', exact: true, component: LocationSearch },
    { path: '/criteriasearch', exact: true, component: CriteriaSearch },
    { path: '/searchresults', exact: true, component: SearchResults },
    { path: '/searchresults/filter', exact: true, component: SearchResultsFilter },
    { path: '/doctorprofile/:id', exact: true, component: DoctorProfile },
    { path: '/doctorprofile/:id/availability', exact: true, component: ClinicList },
    { path: '/doctorprofile/:id/:clinicId/book', exact: true, component: AppointmentSlot },
    { path: '/doctorprofile/:id/:clinicId/bookdetails', exact: true, component: PatientDetails },
    
    { path: '/user/signup', exact: true, component: UserSignup },
    { path: '/user', exact: true, component: UserProfile },
    { path: '/user/:id', exact: true, component: UserProfile },
    { path: '/user/:id/appointments', exact: true, component: UserAppointments },
    { path: '/user/:id/reports', exact: true, component: UserReports },
    { path: '/chat', exact: true, component: DoctorChat },
    { path: '/payment', exact: true, component: Payment },
    { path: '/booking/:refId', exact: true, component: Booking },

    { path: '/dx', exact: true, component: DX_SearchCriteria },
    { path: '/dx/searchresults', exact: true, component: DX_SearchResults },
    { path: '/lab/:id', exact: true, component: Lab },
    { path: '/lab/:id/tests', exact: true, component: TestSelector },
    { path: '/lab/:id/book', exact: true, component: DX_BookingSummary },

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

