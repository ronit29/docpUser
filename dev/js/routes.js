import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import TopBar from './containers/opd/TopBar.js'
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
import Payment from './containers/opd/Payment.js'
import Booking from './containers/opd/Booking.js'
import CriteriaSearch from './containers/opd/CriteriaSearch.js'
import DX_SearchCriteria from './containers/diagnosis/SearchCriteria.js'
import DX_CriteriaSearch from './containers/diagnosis/CriteriaSearch.js'
import DX_SearchResults from './containers/diagnosis/SearchResults.js'
import LabSlots from './containers/diagnosis/LabSlots.js'
import DX_PatientDetails from './containers/diagnosis/PatientDetails.js'
import DX_BookingSummary from './containers/diagnosis/BookingSummary.js'
import DoctorChat from './containers/commons/Chat.js'


const routes = [

    { path: '/', exact:true, component: SearchCriteria },
    { path: '/locationsearch', exact:true, component: LocationSearch },
    { path: '/criteriasearch', exact:true, component: CriteriaSearch },
    { path: '/searchresults', exact:true, component: SearchResults },
    { path: '/searchresults/filter', exact:true, component: SearchResultsFilter },
    { path: '/doctorprofile/:id', exact:true, component: DoctorProfile },
    { path: '/doctorprofile/:id/availability', exact:true, component: ClinicList },
    { path: '/doctorprofile/:id/:clinicId/book', exact:true, component: AppointmentSlot },
    { path: '/doctorprofile/:id/:clinicId/bookdetails', exact:true, component: PatientDetails },
    { path: '/user', exact:true, component: UserProfile },
    { path: '/user/:id', exact:true, component: UserProfile },
    { path: '/user/:id/appointments', exact:true, component: UserAppointments },
    { path: '/user/:id/reports', exact:true, component: UserReports },
    { path: '/chat', exact:true, component: DoctorChat },
    { path: '/payment', exact:true, component: Payment },
    { path: '/booking/:refId', exact:true, component: Booking },
    { path: '/dx', exact:true, component: DX_SearchCriteria },
    { path: '/dx/criteriasearch', exact:true, component: DX_CriteriaSearch },
    { path: '/dx/searchresults', exact:true, component: DX_SearchResults },
    { path: '/lab/:id/book', exact:true, component: LabSlots },
    { path: '/lab/:id/bookdetails', exact:true, component: DX_PatientDetails },
    { path: '/lab/booking/summary/:id', exact:true, component: DX_BookingSummary },

]

class RouterConfig extends Component {

    static ROUTES = routes

    render() {
        return (
            <div>
                <TopBar />
                <Switch>
                    {routes.map((route,i) => (
                        <Route {...route} key={i}/>
                    ))}
                </Switch>
            </div>
        )
    }

}


export default RouterConfig

