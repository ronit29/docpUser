import React from 'react';
import { connect } from 'react-redux';

import { } from '../actions/index.js'

import UserProfileView from '../components/userProfile/index.js'


class UserProfile extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <UserProfileView />
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


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
