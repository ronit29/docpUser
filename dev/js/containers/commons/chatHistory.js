import React from 'react';
import { connect } from 'react-redux';

import { fetchChatHistory } from '../../actions/index.js'

import ChatHistoryView from '../../components/commons/chatHistory/index.js'
import STORAGE from '../../helpers/storage'

class ChatHistory extends React.Component {
    constructor(props) {
        super(props)
        if (!STORAGE.checkAuth()) {
            this.props.history.replace(`/login?callback=/chathistory`)
        }
    }

    componentDidMount() {
        if (STORAGE.checkAuth()) {
           // this.props.fetchChatHistory()
        }
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <ChatHistoryView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    let { chatHistory } = state.USER

    return {
        chatHistory
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchChatHistory: (cb) => dispatch(fetchChatHistory(cb))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatHistory);
