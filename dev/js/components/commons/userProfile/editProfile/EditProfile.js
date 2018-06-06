import React from 'react';

import BasicDetails from './basic'
import MedialDetails from './medical'
import Loader from '../../Loader'

class EditProfile extends React.Component {
    constructor(props) {
        super(props)
        let { profiles } = this.props.USER
        this.state = {
            selectedTab: 0,
            profileData: { ...profiles[this.props.match.params.id] },
            loading: false
        }
    }

    manageAddress() {
        this.props.history.push('/user/address')
    }

    getComp() {
        if (this.state.loading) {
            return <Loader />
        }

        switch (this.state.selectedTab) {
            case 0: {
                return <BasicDetails manageAddress={this.manageAddress.bind(this)} profileData={this.state.profileData} updateProfile={this.updateProfile.bind(this)} />
            }
            case 1: {
                return <MedialDetails />
            }
        }
    }

    updateProfile(key, value) {
        this.state.profileData[key] = value
        this.setState({ profileData: this.state.profileData })
    }

    proceedUpdate(e) {
        e.stopPropagation()
        e.preventDefault()

        this.setState({ loading: true })
        this.props.editUserProfile(this.state.profileData, (err, data) => {
            this.setState({ loading: false })
            this.props.history.go(-1)
        })
    }

    render() {

        return (
            <div>
                <section className="consumer-profile-update">
                    <div className="nav-tab">
                        <ul className="inline-list tab-items">
                            <li onClick={() => {
                                this.setState({ selectedTab: 0 })
                            }} className={this.state.selectedTab === 0 ? "active" : ""}><a className="link-text text-xs uppercase">Basic Profile</a></li>
                            <li onClick={() => {
                                this.setState({ selectedTab: 1 })
                            }} className={this.state.selectedTab === 1 ? "active" : ""}><a className="link-text text-xs uppercase">Medical</a></li>
                        </ul>
                    </div>
                </section>

                {this.getComp()}

                <a href="#" onClick={this.proceedUpdate.bind(this)} className="fixed horizontal bottom v-btn v-btn-primary no-round btn-lg text-center">Update Profile</a>
            </div>
        );
    }
}


export default EditProfile
