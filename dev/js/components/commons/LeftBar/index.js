import React from 'react';
import { connect } from 'react-redux';
import { getUserProfile } from '../../../actions/index.js'

import { withRouter } from 'react-router'
import STORAGE from '../../../helpers/storage'

import LeftBarView from './LeftBar'

class LeftBar extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        /* Fectch user profile if logged in and user profile is not loaded i.e(public pages) */
        // if (STORAGE.checkAuth()) {
        //     if (!this.props.profiles[this.props.selectedProfile]) {
        //         this.props.getUserProfile()
        //     }
        // }
    }

    render() {

        return (
            ""
            // <LeftBarView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    let { profiles, selectedProfile, defaultProfile } = state.USER
    return {
        profiles, selectedProfile, defaultProfile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: () => dispatch(getUserProfile())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LeftBar))
