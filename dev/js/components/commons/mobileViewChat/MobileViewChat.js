import React from 'react';
import ChatPanel from '../ChatPanel'

class MobileChatView extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ChatPanel {...this.props} mobilechatview={true} />
        );
    }
}

export default MobileChatView