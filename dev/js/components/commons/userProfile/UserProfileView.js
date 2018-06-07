import React from 'react';

import ProfileSlider from '../profileSlider/index.js'
import ProfileData from './profileData/index.js'
import Appointments from './userAppointments'
import Family from './userFamily'
import EditProfile from './editProfile'
import Address from './userAddress'
import AddressForm from './userAddress/add'
import Reports from './userReports'

import Loader from '../../commons/Loader'

import { Route } from 'react-router-dom'

const Section_Component = ({ children }) => {
    return <section className="wrap consumer-profile-screen">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8 offset-md-3">
                    {children}
                </div>
            </div>
        </div>
    </section>
}

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
                            </div>
                        </div>
                    </div>
                </header>

                {
                    profiles[selectedProfile] ?
                        <div>

                            <Route exact path={`${this.props.match.url}/`} render={(props) => {
                                return <Section_Component>
                                    <ProfileSlider {...this.props} />
                                    <ProfileData  {...this.props} {...props} />
                                </Section_Component>
                            }} />

                            <Route exact path={`${this.props.match.url}/appointments`} render={(props) => {
                                return <Section_Component>
                                    <ProfileSlider {...this.props} />
                                    <Appointments  {...this.props} {...props} />
                                </Section_Component>
                            }} />

                            <Route exact path={`${this.props.match.url}/family`} render={(props) => {
                                return <Section_Component>
                                    <Family  {...this.props} {...props} />
                                </Section_Component>
                            }} />

                            <Route exact path={`${this.props.match.url}/address`} render={(props) => {
                                return <Section_Component>
                                    <Address  {...this.props} {...props} />
                                </Section_Component>
                            }} />

                            <Route exact path={`${this.props.match.url}/address/add`} render={(props) => {
                                return <AddressForm {...this.props} {...props} />
                            }} />

                            <Route exact path={`${this.props.match.url}/address/edit/:id`} render={(props) => {
                                return <AddressForm {...this.props} {...props} edit={true}/>
                            }} />

                            <Route exact path={`${this.props.match.url}/edit/:id`} render={(props) => {
                                return <EditProfile {...this.props} {...props} />
                            }} />

                            <Route exact path={`${this.props.match.url}/:type/reports/:id`} render={(props) => {
                                return <Reports {...this.props} {...props} />
                            }} />

                        </div> : ""
                }

                {
                    profiles[selectedProfile] ? "" : <Loader />
                }

            </div >
        );
    }
}


export default UserProfileView
