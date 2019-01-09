import React from 'react';
const queryString = require('query-string');

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'

class ReferralView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {

        return (
            <div className="profile-body-wrap lgn-ovrflow">
                <ProfileHeader />
                <section className="container parent-section book-appointment-section-login">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <RightBar />
                    </div>
                </section>
            </div>
        );
    }
}

export default ReferralView
