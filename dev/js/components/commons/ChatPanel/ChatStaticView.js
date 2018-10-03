import React from 'react'

class ChatStatic extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }

    inputHandler(e) {
        this.setState({ value: e.target.value })
    }

    handleKeyUp(e) {
        if (e.key === 'Enter') {
            this.props.saveChatStaticMsg(this.state.value)
        }
    }

    getIframe(){
        this.props.saveChatStaticMsg(this.state.value)
    }

    render() {

        return (

            <div className={this.props.dataClass}>
                <div className="chat-head">
                    <div className="hd-chat" style={{ flex: 1 }}>
                        <p className="text-left header-text-chat" style={{ color: '#ef5350' }}><span className="hed-txt-lt">Get a </span>Free Online Doctor Consultation!</p>
                    </div>
                    <div className="cht-head-rqst-btn" style={{ width: 64 }}>

                        {/*<span className="mr-2"><img style={{width:26}} src={ASSETS_BASE_URL + "/img/customer-icons/chat-call.svg"}/></span><span><img style={{width:26}} src={ASSETS_BASE_URL + "/img/customer-icons/chat-rstrt.svg"}/></span>
                   */}{
                            this.props.showChatBlock
                                ? <span className="ml-2" onClick={this.props.hideStaticChat.bind(this)}><img className="close-chat" style={{ width: 26 }} src="/assets/img/customer-icons/cht-cls.svg" /></span>
                                : ''
                        }
                    </div>
                </div>
                <div className="chat-body">
                    <div className="onload-chat">
                        <div className="livechat-room">
                            <div className="chatboat-container chatbot_doc">
                                <div className="wrapper">
                                    <ul>
                                        <div id="heqmH6j9hqhdvpgWu" className="chandrakanta" data-username="PBee">
                                            <div className="in-mssgs">
                                                <div className="received-msg HS_font">
                                                    <p className="chat-text">
                                                        Hi, Welcome to docprime!
                                              <span className="send-chat-time">2:11 PM</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="kPxSEGEDbtSdmPspq" className="chandrakanta chatsequential" data-username="PBee">
                                            <div className="in-mssgs">
                                                <div className="received-msg HS_font">
                                                    <p className="chat-text">
                                                        Please let me know how can I help you today, I will connect you to the right doctor for a free online consultation.
                                              <span className="send-chat-time">2:11 PM</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                            <div className="footer footer_doc">
                                <div className="chat_footer">
                                    <div className="write-msg-bx">
                                        <textarea id="cstbox" className="fc-input" placeholder=" Type your message... " value={this.state.value} onChange={this.inputHandler.bind(this)} onKeyUp={(e) => this.handleKeyUp(e)}></textarea>
                                    </div>
                                    <div className="send_icon">
                                        <a href="javascript:;" className="send-msg-btn" onClick ={this.getIframe.bind(this)}>
                                            <img src={ASSETS_BASE_URL + "/img/send.svg"} className="send-md-icon" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chat-footer">
                    <div className="wrng-mssg">
                        <img style={{ height: 24, width: 24 }} src={ASSETS_BASE_URL + "/images/warning-icon.png"} />
                        <span>Not for emergencies! In the case of emergency please visit a hospital.  Chat is only applicable to Indian citizens currently residing in India.</span>
                    </div>
                </div>
            </div>

        )
    }
}

export default ChatStatic;