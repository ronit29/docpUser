import React from 'react';

import ProfileSlider from '../profileSlider/index.js'
import ProfileData from './profileData/index.js'
import Appointments from './userAppointments'
import Family from './userFamily'
import Loader from '../../commons/Loader'

import { Route } from 'react-router-dom'

class UserProfileView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        let { profiles, selectedProfile } = this.props.USER

        return (
            <div>

                <header className="skin-primary fixed horizontal top">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-2">
                                <div className="back-icon" onClick={() => {
                                    this.props.history.go(-1)
                                }}>
                                    <a>
                                        <img src="/assets/img/icons/back.png" className="img-fluid" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="header-title fw-700 capitalize text-center text-white">My Profile</div>
                            </div>
                            <div className="col-2">
                                <div className="header-title fw-700 capitalize text-center text-white">Edit</div>
                            </div>
                        </div>
                    </div>
                </header>

                <section className="wrap consumer-profile-screen">
                    <div className="container-fluid">
                        <div className="row">
                            {
                                profiles[selectedProfile] ? <div className="col-md-8 offset-md-3">

                                    <ProfileSlider {...this.props} />

                                    <Route exact path={`${this.props.match.url}/`} render={(props) => {
                                        return <ProfileData {...props} {...this.props} />
                                    }} />

                                    <Route exact path={`${this.props.match.url}/appointments`} render={(props) => {
                                        return <Appointments {...props} {...this.props} />
                                    }} />

                                    <Route exact path={`${this.props.match.url}/family`} render={(props) => {
                                        return <Family {...props} {...this.props} />
                                    }} />

                                </div> : ""
                            }
                        </div>
                    </div>
                </section>

                {
                    profiles[selectedProfile] ? "" : <Loader />
                }

            </div>
        );
    }
}


export default UserProfileView
