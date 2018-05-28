import React from 'react';

import BasicDetails from './basic'
import MedialDetails from './medical'

class EditProfile extends React.Component {
    constructor(props) {
        super(props)
        let { profiles } = this.props.USER
        this.state = {
            selectedTab: 0,
            profileData: { ...profiles[this.props.match.params.id] }
        }
    }

    getComp() {
        switch (this.state.selectedTab) {
            case 0: {
                return <BasicDetails profileData={this.state.profileData} updateProfile={this.updateProfile.bind(this)} />
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

                <a href="" className="fixed horizontal bottom v-btn v-btn-primary no-round btn-lg text-center">Update Profile</a>
            </div>
        );
    }
}


export default EditProfile
