import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable';

const SearchCriteria = Loadable({
    loader : () => import('./containers/SearchCriteria.js'),
    loading : () => {
        return ''
    }
})

const LocationSearch = Loadable({
    loader : () => import('./containers/LocationSearch.js'),
    loading : () => {
        return ''
    }
})

const SearchResults = Loadable({
    loader : () => import('./containers/SearchResults.js'),
    loading : () => {
        return ''
    }
})

const SearchResultsFilter = Loadable({
    loader : () => import('./containers/SearchResultsFilter.js'),
    loading : () => {
        return ''
    }
})

const DoctorProfile = Loadable({
    loader : () => import('./containers/DoctorProfile.js'),
    loading : () => {
        return ''
    }
})

const ClinicList = Loadable({
    loader : () => import('./containers/ClinicList.js'),
    loading : () => {
        return ''
    }
})

const AppointmentSlot = Loadable({
    loader : () => import('./containers/AppointmentSlot.js'),
    loading : () => {
        return ''
    }
})

const PatientDetails = Loadable({
    loader : () => import('./containers/PatientDetails.js'),
    loading : () => {
        return ''
    }
})

const UserProfile = Loadable({
    loader : () => import('./containers/UserProfile.js'),
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
                        <Route exact path='/searchresults' component={ SearchResults } />
                        <Route exact path='/searchresults/filter' component={ SearchResultsFilter } />
                        <Route exact path='/doctorprofile/:id' component={ DoctorProfile } />
                        <Route exact path='/doctorprofile/:id/cliniclist' component={ ClinicList } />
                        <Route exact path='/doctorprofile/:id/appointmentslot' component={ AppointmentSlot } />
                        <Route exact path='/doctorprofile/:id/patientdetails' component={ PatientDetails } />
                        <Route exact path='/userprofile' component={ UserProfile } />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }

}


export default RouterConfig

