import React from 'react';
import { connect } from 'react-redux';

import { } from '../../actions/index.js'

import ChatView from '../../components/commons/chat/index.js'


class Chat extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <ChatView {...this.props} />
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

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Chat);
