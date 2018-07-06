import React from 'react';
import STORAGE from '../../../helpers/storage'

const IframStyle = {
    width: '100%',
    height: 'calc(100vh - 60px)'
}


class ChatView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token: null
        }
    }

    componentDidMount() {
        STORAGE.getAuthToken().then((token) => {
            this.setState({ token })
        })
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <div className="locationSelector">
                {
                    this.state.token ? <iframe src={`http://chatqa.docprime.com/livechat?product=DocPrime&cb=1&token=${this.state.token}`} style={IframStyle}></iframe> : ""
                }

            </div>
        );
    }
}


export default ChatView
