import React from 'react';
import { connect } from 'react-redux';
import { } from '../../../actions/index.js'

import { withRouter } from 'react-router'

import RightBarView from './RightBar'

class RightBar extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <RightBarView {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RightBar))
