import React from 'react';

import ProfileSlider from '../profileSlider/index.js'
import ReportList from './reportList/index.js'

class UserReportsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getUserProfileWithTests()
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
            // selecting default user
            Object.keys(this.props.USER.profiles).map((profileId) => {
                if (this.props.USER.profiles[profileId].isDefaultUser) {
                    selectedUser = this.props.USER.profiles[profileId]
                }
            })
        }

        return (
            <div className="userProfile">
                {
                    (selectedUser && selectedUser.tests) ? <div>
                        <ProfileSlider
                            profiles={this.props.USER.profiles}
                            subRoute="/reports"
                        />
                        <p className="upcomingapp">Reports</p>
                        {
                            selectedUser.tests.map((test, i) => {
                                return <ReportList
                                    data={test}
                                    key={i}
                                />
                            })

                        }
                    </div> : ""
                }

            </div>
        );
    }
}


export default UserReportsView
