import React from 'react';

import ProfileSlider from '../commons/profileSlider/index.js'

class UserProfileView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="userProfile">
                <ProfileSlider />
                <div className="userDeail">
                    <p>Brijesh Kumar</p>
                    <p>33 Years</p>
                    <p>Male</p>
                    <p>9910877178</p>
                </div>
                <div className="profileBtns">
                    <button>Profile Not Verified</button>
                    <button>No OPD Insurance</button>
                    <button>Online Consultations</button>
                    <button>OPD Visits</button>
                    <button>Medical History</button>
                    <button>Test Reports</button>
                </div>
            </div>
        );
    }
}


export default UserProfileView
