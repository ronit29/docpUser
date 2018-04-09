import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable';

const SearchCriteria = Loadable({
    loader : () => import('./containers/searchCriteria.js'),
    loading : () => {
        return ''
    }
})

const LocationSearch = Loadable({
    loader : () => import('./containers/locationSearch.js'),
    loading : () => {
        return ''
    }
})

const SearchResults = Loadable({
    loader : () => import('./containers/searchResults.js'),
    loading : () => {
        return ''
    }
})

const SearchResultsFilter = Loadable({
    loader : () => import('./containers/searchResultsFilter.js'),
    loading : () => {
        return ''
    }
})

const DoctorProfile = Loadable({
    loader : () => import('./containers/doctorProfile.js'),
    loading : () => {
        return ''
    }
})

const ClinicList = Loadable({
    loader : () => import('./containers/clinicList.js'),
    loading : () => {
        return ''
    }
})

const AppointmentSlot = Loadable({
    loader : () => import('./containers/appointmentSlot.js'),
    loading : () => {
        return ''
    }
})

const PatientDetails = Loadable({
    loader : () => import('./containers/patientDetails.js'),
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
                        <Route exact path='/doctorprofile' component={ DoctorProfile } />
                        <Route exact path='/doctorprofile/cliniclist' component={ ClinicList } />
                        <Route exact path='/doctorprofile/appointmentslot' component={ AppointmentSlot } />
                        <Route exact path='/doctorprofile/patientdetails' component={ PatientDetails } />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }

}


export default RouterConfig

