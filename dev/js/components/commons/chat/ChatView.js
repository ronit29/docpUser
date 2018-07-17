import React from 'react';
import STORAGE from '../../../helpers/storage'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'

class ChatView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token: "",
            symptoms: []
        }
    }

    componentDidMount() {
        STORAGE.getAuthToken().then((token) => {
            token = token || ""
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

    dispatchCustomEvent(eventName) {
        let event = new Event(eventName)
        let iframe = this.refs.chat_frame
        iframe.dispatchEvent(event)
    }

    render() {

        let symptoms_uri = this.state.symptoms.reduce((str, curr) => {
            str += `${curr},`
            return str
        }, "")

        if (symptoms_uri) {
            symptoms_uri = encodeURIComponent(symptoms_uri)
        }

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container parent-section book-appointment-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-0 center-column">

                            <header className="wallet-header sticky-header chat-header">
                                <div className="container-fluid header-container">
                                    <div className="row header-row">
                                        <div className="col-2 col-sm-1">
                                            <img src="/assets/img/customer-icons/back-white.png" className="back-icon-orange" onClick={() => {
                                                this.props.history.go(-1)
                                            }} />
                                        </div>
                                        <div className="col-6 col-sm-7 chat-header-profile">
                                            <div className="chat-profile-icon">
                                                <img src="/assets/img/customer-icons/dummy-profile-sq.jpg" />
                                            </div>
                                            <div className="chat-profile-desc-div">
                                                <p className="chat-profile-name fw-500">Stephny Ray</p>
                                                <p className="chat-profile-desc">Health Assistant</p>
                                            </div>
                                        </div>
                                        <div className="col-2 chat-icons chat-call-icon" onClick={() => {
                                            this.dispatchCustomEvent.call(this, 'call')
                                        }}>
                                            <img src="/assets/img/customer-icons/call-white.svg" />
                                        </div>
                                        <div className="col-2 chat-icons" onClick={() => {
                                            this.dispatchCustomEvent.call(this, 'close_frame')
                                        }}>
                                            <img src="/assets/img/customer-icons/close-white.svg" />
                                        </div>
                                    </div>
                                </div>
                            </header>
                            <div className="container-fluid chat-container">
                                <iframe className="chat-iframe" src={`https://chatqa.docprime.com/livechat?product=DocPrime&cb=1&token=${this.state.token}&symptoms=${symptoms_uri}`} ref="chat_frame"></iframe>
                            </div>
                        </div>
                        <RightBar />
                    </div>
                </section>
            </div>
        );
    }
}


export default ChatView
