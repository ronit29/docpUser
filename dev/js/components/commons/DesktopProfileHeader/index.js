import React from 'react';
import { connect } from 'react-redux';
import { } from '../../../actions/index.js'

import { withRouter } from 'react-router'

import DesktopProfileHeaderView from './DesktopProfileHeader'

class DesktopProfileHeader extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <DesktopProfileHeaderView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DesktopProfileHeader))
