import React from 'react';

const IframStyle = {
    width: '100%',
    height: 'calc(100vh - 60px)'
}


class ChatView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <div className="locationSelector">
                <iframe src="http://chatbot.policybazaar.com/livechat" style={IframStyle}></iframe>
            </div>
        );
    }
}


export default ChatView
