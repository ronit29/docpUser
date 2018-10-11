import React from 'react';

import ProfileSlider from '../profileSlider/index.js'
import ProfileData from './profileData/index.js'
import Appointments from './userAppointments'
import Family from './userFamily'
import EditProfile from './editProfile'
import Address from './userAddress'
import AddressForm from './userAddress/add'
import Reports from './userReports'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import UserPrescription from './userPrescriptions'
import Loader from '../../commons/Loader'

import { Route } from 'react-router-dom'

const Section_Component = ({ children, title, history, logout }) => {
    return <div>
        {/* <header className="skin-primary fixed horizontal top sticky-header">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <div className="back-icon" onClick={() => {
                            history.go(-1)
                        }}>
                            <a>
                                <img src={ASSETS_BASE_URL + "/img/icons/back.png"} className="img-fluid" />
                            </a>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="header-title fw-700 capitalize text-center text-white">{title || "My Profile"}</div>
                    </div>
                    <div className="col-2" onClick={() => {
                        logout()
                    }} style={{ cursor: 'pointer' }}>
                        <p className="fw-500 mobile-logout-text">Logout</p>
                    </div>
                </div>
            </div>
        </header> */}
        <section className="consumer-profile-screen">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    </div>
}

class UserProfileView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    render() {

        let { profiles, selectedProfile } = this.props.USER
        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container parent-section book-appointment-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column">

                            {
                                profiles[selectedProfile] ?
                                    <div>

                                        <Route exact path={`${this.props.match.url}/`} render={(props) => {
                                            return <Section_Component {...this.props} title="My Profile">
                                                {/* <ProfileSlider {...this.props} /> */}
                                                <ProfileData  {...this.props} {...props} />
                                            </Section_Component>
                                        }} />

                                        <Route exact path={`${this.props.match.url}/appointments`} render={(props) => {
                                            return <Section_Component {...this.props} title="My Appointments">
                                                {/* <ProfileSlider {...this.props} /> */}
                                                <Appointments  {...this.props} {...props} />
                                            </Section_Component>
                                        }} />

                                        <Route exact path={`${this.props.match.url}/family`} render={(props) => {
                                            return <Section_Component {...this.props} title="My Family">
                                                <Family  {...this.props} {...props} />
                                            </Section_Component>
                                        }} />

                                        <Route exact path={`${this.props.match.url}/address`} render={(props) => {
                                            return <Section_Component {...this.props} title="Manage Address">
                                                <Address  {...this.props} {...props} />
                                            </Section_Component>
                                        }} />

                                        <Route exact path={`${this.props.match.url}/address/add`} render={(props) => {
                                            return <AddressForm {...this.props} {...props} />
                                        }} />

                                        <Route exact path={`${this.props.match.url}/address/edit/:id`} render={(props) => {
                                            return <AddressForm {...this.props} {...props} edit={true} />
                                        }} />

                                        <Route exact path={`${this.props.match.url}/edit/:id`} render={(props) => {
                                            return <EditProfile {...this.props} {...props} />
                                        }} />

                                        <Route exact path={`${this.props.match.url}/:type/reports/:id`} render={(props) => {
                                            return <Section_Component {...this.props} title={props.match.params.type == 'opd' ? "Prescriptions" : "Lab Reports"}>
                                                <Reports {...this.props} {...props} />
                                            </Section_Component>
                                        }} />

                                        <Route exact path={`${this.props.match.url}/onlinePrescriptions`} render={(props) => {
                                            return <UserPrescription {...this.props} {...props} />
                                        }} />

                                    </div> : ""
                            }

                            {
                                profiles[selectedProfile] ? "" : <Loader />
                            }

                        </div>

                        <RightBar extraClass={(this.props.location.pathname.includes('/family') || this.props.location.pathname.includes('/address')) ? " chat-float-btn-3" : (this.props.location.pathname.includes('/edit') ? " chat-float-btn-2" : "")} />
                    </div>
                </section>
            </div>
        );
    }
}


export default UserProfileView
