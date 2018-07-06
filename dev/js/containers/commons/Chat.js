import React from 'react';
import { connect } from 'react-redux';

import { } from '../../actions/index.js'

import ChatView from '../../components/commons/chat/index.js'
import STORAGE from '../../helpers/storage'

class Chat extends React.Component {
    constructor(props) {
        super(props)
        if (!STORAGE.checkAuth()) {
            this.props.history.replace(`/login?callback=/chat`)
        }
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
