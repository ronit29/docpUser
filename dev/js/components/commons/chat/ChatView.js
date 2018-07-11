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
            token: null,
            symptoms: []
        }
    }

    componentDidMount() {
        STORAGE.getAuthToken().then((token) => {
            if (this.props.location.state && this.props.location.state.symptoms) {
                this.setState({ token, symptoms: (this.props.location.state.symptoms || []) })
            } else {
                this.setState({ token })
            }
        })
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        let symptoms_uri = this.state.symptoms.reduce((str, curr) => {
            str += `${curr},`
            return str
        }, "")

        if(symptoms_uri){
            symptoms_uri = encodeURIComponent(symptoms_uri)
        }

        return (
            <div className="locationSelector">
                {
                    this.state.token ? <iframe src={`http://chatqa.docprime.com/livechat?product=DocPrime&cb=1&token=${this.state.token}&symptoms=${symptoms_uri}`} style={IframStyle}></iframe> : ""
                }

            </div>
        );
    }
}


export default ChatView
