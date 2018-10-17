import React from 'react'

class ChatStatic extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '',
            openBanner: true
        }
    }

    inputHandler(e) {
        this.setState({ value: e.target.value })
    }

    handleKeyUp(e) {
        if (e.key === 'Enter') {
            this.props.startLiveChatWithMessage(this.state.value)
        }
    }

    getIframe() {
        this.props.startLiveChatWithMessage(this.state.value)
    }

    checkOpenMobileChat() {
        // handle static page redirects for homepage
        if (this.props.homePage && window.innerWidth < 768 && !this.props.mobilechatview) {
            this.props.history.push('/mobileviewchat')
        } else {
            this.setState({ openBanner: false })
        }
    }

    render() {
        var time = new Date()

        return (

            <div className={this.props.dataClass}>
                <div className="chat-head">
                    <div className="hd-chat" style={{ flex: 1 }}>
                        <p className="text-left header-text-chat" style={{ color: '#ef5350' }}><span className="hed-txt-lt">Get a </span>Free Online Doctor Consultation!</p>
                    </div>
                    <div className="cht-head-rqst-btn" style={{ width: 64 }}>
                        {
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
                                              <span className="send-chat-time">{time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                                                        }</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="kPxSEGEDbtSdmPspq" className="chandrakanta chatsequential" data-username="PBee">
                                            <div className="in-mssgs">
                                                <div className="received-msg HS_font">
                                                    <p className="chat-text">
                                                    Briefly describe the symptom/health concern worrying you the most (e.g. I have a fever) or simply ask any query.
                                              <span className="send-chat-time">{time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                                                        }</span>
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
                                        <textarea id="cstbox" onFocus={this.checkOpenMobileChat.bind(this)} className="fc-input" placeholder=" Type your message... " value={this.state.value} onChange={this.inputHandler.bind(this)} onKeyUp={(e) => this.handleKeyUp(e)}></textarea>
                                    </div>
                                    <div className="send_icon">
                                        <a href="javascript:;" className="send-msg-btn" onClick={this.getIframe.bind(this)}>
                                            <img src={ASSETS_BASE_URL + "/img/send.svg"} className="send-md-icon" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.props.mobilechatview && this.state.openBanner ? <div className="chat-footer toast-tip-icon">
                        <span className="toast-close-btn" onClick={() => {
                            this.setState({ openBanner: false })
                        }}><img src={ASSETS_BASE_URL + "/img/customer-icons/close-white.svg"} /></span>
                        <div className="wrng-mssg">
                            <img style={{ height: 24, width: 24 }} src={ASSETS_BASE_URL + "/images/warning-icon.png"} />
                            <span>Not for emergencies! In the case of emergency please visit a hospital.  Chat is only applicable to Indian citizens currently residing in India.</span>
                        </div>
                    </div> : ""
                }

            </div>

        )
    }
}

export default ChatStatic;