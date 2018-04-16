import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable';

const SearchCriteria = Loadable({
    loader : () => import('./containers/opd/SearchCriteria.js'),
    loading : () => {
        return ''
    }
})

const LocationSearch = Loadable({
    loader : () => import('./containers/opd/LocationSearch.js'),
    loading : () => {
        return ''
    }
})

const SearchResults = Loadable({
    loader : () => import('./containers/opd/SearchResults.js'),
    loading : () => {
        return ''
    }
})

const SearchResultsFilter = Loadable({
    loader : () => import('./containers/opd/SearchResultsFilter.js'),
    loading : () => {
        return ''
    }
})

const DoctorProfile = Loadable({
    loader : () => import('./containers/opd/DoctorProfile.js'),
    loading : () => {
        return ''
    }
})

const ClinicList = Loadable({
    loader : () => import('./containers/opd/ClinicList.js'),
    loading : () => {
        return ''
    }
})

const AppointmentSlot = Loadable({
    loader : () => import('./containers/opd/AppointmentSlot.js'),
    loading : () => {
        return ''
    }
})

const PatientDetails = Loadable({
    loader : () => import('./containers/opd/PatientDetails.js'),
    loading : () => {
        return ''
    }
})

const UserProfile = Loadable({
    loader : () => import('./containers/opd/UserProfile.js'),
    loading : () => {
        return ''
    }
})

const Payment = Loadable({
    loader : () => import('./containers/opd/Payment.js'),
    loading : () => {
        return ''
    }
})

const Booking = Loadable({
    loader : () => import('./containers/opd/Booking.js'),
    loading : () => {
        return ''
    }
})

const CriteriaSearch = Loadable({
    loader : () => import('./containers/opd/CriteriaSearch.js'),
    loading : () => {
        return ''
    }
})


class RouterConfig extends Component {

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={ SearchCriteria } />
                        <Route exact path='/locationsearch' component={ LocationSearch } />
                        <Route exact path='/criteriasearch' component={ CriteriaSearch } />
                        <Route exact path='/searchresults' component={ SearchResults } />
                        <Route exact path='/searchresults/filter' component={ SearchResultsFilter } />
                        <Route exact path='/doctorprofile/:id' component={ DoctorProfile } />
                        <Route exact path='/doctorprofile/:id/availability' component={ ClinicList } />
                        <Route exact path='/doctorprofile/:id/:clinicId/book' component={ AppointmentSlot } />
                        <Route exact path='/doctorprofile/:id/:clinicId/bookdetails' component={ PatientDetails } />
                        <Route exact path='/userprofile' component={ UserProfile } />
                        <Route exact path='/payment' component={ Payment } />
                        <Route exact path='/booking/:refId' component={ Booking } />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }

}


export default RouterConfig

