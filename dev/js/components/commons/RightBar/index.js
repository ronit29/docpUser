import React from 'react';
import { connect } from 'react-redux';
import { getUpcomingAppointments } from '../../../actions/index.js'

import { withRouter } from 'react-router'
import STORAGE from '../../../helpers/storage'

import RightBarView from './RightBar'

class RightBar extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        if (STORAGE.checkAuth()) {
            this.props.getUpcomingAppointments()
        }
    }

    render() {

        return (
            <RightBarView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    let { profiles, selectedProfile, userUpcomingAppointments } = state.USER
    return {
        profiles, selectedProfile, userUpcomingAppointments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUpcomingAppointments: () => dispatch(getUpcomingAppointments())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RightBar))
