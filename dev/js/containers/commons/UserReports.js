import React from 'react';
import { connect } from 'react-redux';

import { getUserProfileWithTests } from '../../actions/index.js'

import UserReportsView from '../../components/commons/userReports/index.js'


class UserReports extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <UserReportsView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    const USER = state.USER

    return {
        USER
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfileWithTests : () => dispatch(getUserProfileWithTests())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserReports);
