import React from 'react'
import { chat_utm } from '../../../actions/index'
const queryString = require('query-string');

class ChatStatic extends React.Component {

    constructor(props) {
        super(props)
        const parsed = queryString.parse(this.props.location.search)
        this.state = {
            value: '',
            openBanner: true,
            utm_term: parsed.utm_term || "",
            BasicEnquiry: "",
            utm_loader: !!parsed.utm_term
        }
    }

    componentDidMount() {
        if (this.state.utm_term) {
            chat_utm(this.state.utm_term).then((data) => {
                if (data && data.data && data.data.BasicEnquiry) {
                    this.setState({ BasicEnquiry: data.data.BasicEnquiry, utm_loader: false })
                } else {
                    this.setState({
                        BasicEnquiry: "",
                        utm_term: "",
                        utm_loader: false
                    })
                }
            }).catch((e) => {
                this.setState({
                    BasicEnquiry: "",
                    utm_term: "",
                    utm_loader: false
                })
            })
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
        this.props.startLiveChatWithMessage(this.state.value || this.state.BasicEnquiry)
    }

    checkOpenMobileChat() {
        // handle static page redirects for homepage
        if (this.props.homePage && window.innerWidth < 768 && !this.props.mobilechatview) {
            this.props.history.push('/mobileviewchat')
        } else {
            this.setState({ openBanner: false })
        }
    }

    removeUTM() {
        this.setState({
            utm_term: "",
            BasicEnquiry: ""
        })
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

                {
                    this.state.utm_loader ? <div className="chat-body">
                        <div className="loader-for-chat-div">
                            <div className='loader-for-chat'>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <p className="ldng-text">Connecting to doctor...</p>
                        </div>
                    </div> : <div className="chat-body">
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
                                                            {
                                                                this.state.utm_term ? <p className="chat-text">
                                                                    {`Looks like you need help with ${this.state.BasicEnquiry}
                                                                    Start chat for an instant consultation and absolutely free prescription with our doctors.`}
                                                                    <span className="send-chat-time">{time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                                                                    }</span>
                                                                </p> : <p className="chat-text">
                                                                        Briefly describe the symptom/health concern worrying you the most (e.g. I have a fever) or simply ask any query.
                                                                <span className="send-chat-time">{time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                                                                        }</span>
                                                                    </p>
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </ul>
                                        </div>
                                    </div>



                                    <div className="footer footer_doc">
                                        {
                                            this.state.utm_term ? <div className="utm-chat-footer">
                                                <button className="utm-chat-btn" onClick={this.getIframe.bind(this)}>Start Chat for “Fever”</button>
                                                <span className="utm-sapprater">OR</span>
                                                <p className="utm-clear-chat" onClick={this.removeUTM.bind(this)}>Start chat for any other health concern?</p>
                                            </div> : <div className="chat_footer">
                                                    <div className="write-msg-bx">
                                                        <textarea id="cstbox" onFocus={this.checkOpenMobileChat.bind(this)} className="fc-input" placeholder=" Type your message... " value={this.state.value} onChange={this.inputHandler.bind(this)} onKeyUp={(e) => this.handleKeyUp(e)}></textarea>
                                                    </div>
                                                    <div className="send_icon">
                                                        <a href="javascript:;" className="send-msg-btn" onClick={this.getIframe.bind(this)}>
                                                            <img src={ASSETS_BASE_URL + "/img/send.svg"} className="send-md-icon" />
                                                        </a>
                                                    </div>
                                                </div>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                }


                {
                    this.props.mobilechatview && this.state.openBanner ? <div className="toast-tip-icon">
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