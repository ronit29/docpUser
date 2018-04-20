import React from 'react';

import ProfileSlider from '../profileSlider/index.js'
import ProfileData from './profileData/index.js'

class UserProfileView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    
    componentDidMount() {
        this.props.getUserProfile()
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        let selectedUser = null
        let userProfileId = this.props.match.params.id

        if (this.props.USER.profiles[userProfileId]) {
            selectedUser = this.props.USER.profiles[userProfileId]
        } else {
            Object.keys(this.props.USER.profiles).map((profileId) => {
                if (this.props.USER.profiles[profileId].isDefaultUser) {
                    selectedUser = this.props.USER.profiles[profileId]
                }
            })
        }
        
        return (
            <div className="userProfile">
                {
                    selectedUser ? <div>
                        <ProfileSlider 
                            profiles={this.props.USER.profiles}
                            subRoute=""
                        />
                        <ProfileData 
                            profileData={selectedUser}
                        />
                    </div> : ""
                }

            </div>
        );
    }
}


export default UserProfileView
