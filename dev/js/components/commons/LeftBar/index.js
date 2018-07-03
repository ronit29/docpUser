import React from 'react';
import { connect } from 'react-redux';
import { } from '../../../actions/index.js'

import { withRouter } from 'react-router'

import LeftBarView from './LeftBar'

class LeftBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <LeftBarView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    let { profiles, selectedProfile } = state.USER
    return {
        profiles, selectedProfile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LeftBar))
