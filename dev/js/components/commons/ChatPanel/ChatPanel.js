import React from 'react';
import STORAGE from '../../../helpers/storage'
import CONFIG from '../../../config'

import InitialsPicture from '../../commons/initialsPicture'
import CancelPopup from './cancelPopup'
import GTM from '../../../helpers/gtm.js'
import ChatStaticView from './ChatStaticView'

class ChatPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRoom: null,
            token: "",
            symptoms: [],
            roomId: "",
            showCancel: false,
            showChatBlock: false,
            additionClasses: ' chat-load-mobile',
            hideIframe: true,
            iframeLoading: true,
            showStaticView: true,
            initialMessage: ""
        }
    }

    componentDidMount() {
        STORAGE.getAuthToken().then((token) => {
            token = token || ""
            if (this.props.location.state) {
                this.setState({ token, symptoms: (this.props.location.state.symptoms || []), roomId: (this.props.location.state.roomId || "") })
            } else {
                this.setState({ token })
            }
        })

        /**
         * Check for static message and hide/show iframe with loader accordingly.
         */
        if (this.props.USER && this.props.USER.liveChatStarted) {
            this.setState({ showStaticView: false, iframeLoading: true }, () => {
                this.setState({ hideIframe: false }, () => {
                    let iframe = this.refs.chat_frame
                    if (iframe) {
                        iframe.onload = () => {
                            this.setState({ iframeLoading: false })
                        }
                    } else {
                        this.setState({ iframeLoading: false })
                    }
                })
            })
        }

        if (window) {
            // handling events sent by iframe
            window.addEventListener('message', function ({ data }) {
                let eventData = data;
                if (data) {
                    switch (data.event) {
                        case "RoomAgent": {
                            this.setState({ selectedRoom: data.data.rid })

                            let analyticData;

                            if (eventData.data.agentType == 'Type 1') {

                                analyticData = {
                                    'Category': 'Chat', 'Action': 'L1DoctorAssigned', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'l1-doctor-assigned', 'RoomId': eventData.data.rid, 'DoctorId': eventData.data.employeeId
                                }
                                GTM.sendEvent({ data: analyticData })

                            } else if (eventData.data.agentType == 'Type 2') {

                                analyticData = {
                                    'Category': 'Chat', 'Action': 'L2DoctorAssigned', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'l2-doctor-assigned', 'RoomId': eventData.data.rid, 'DoctorId': eventData.data.employeeId
                                }
                                GTM.sendEvent({ data: analyticData })

                            } else if (eventData.data.agentType == 'Type 3') {

                                analyticData = {
                                    'Category': 'Chat', 'Action': 'L3DoctorAssigned', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'l3-doctor-assigned', 'RoomId': eventData.data.rid, 'DoctorId': eventData.data.employeeId
                                }
                                GTM.sendEvent({ data: analyticData })

                            }

                            this.props.getChatDoctorById(data.data.manager, data.data.rid, (data) => {
                                this.dispatchCustomEvent('profile_assigned', {
                                    profileId: data.id
                                })

                            })
                            break
                        }

                        case "doctor_search": {
                            let searchData = {
                                selectedCriterias: this.props.doctor_search_data.selectedCriterias,
                                selectedLocation: this.props.doctor_search_data.selectedLocation,
                            }
                            searchData = encodeURIComponent(JSON.stringify(searchData))
                            let filterData = encodeURIComponent(JSON.stringify(this.props.doctor_search_data.filterCriteria))
                            this.props.history.push(`/opd/searchresults?search=${searchData}&filter=${filterData}&doctor_name=${""}&hospital_name=${""}`)
                            break
                        }

                        case "lab_search": {
                            let searchData = {
                                selectedCriterias: this.props.lab_search_data.selectedCriterias,
                                selectedLocation: this.props.lab_search_data.selectedLocation,
                            }
                            searchData = encodeURIComponent(JSON.stringify(searchData))
                            let filterData = encodeURIComponent(JSON.stringify(this.props.lab_search_data.filterCriteria))
                            this.props.history.push(`/lab/searchresults?search=${searchData}&filter=${filterData}`)
                            break
                        }

                        case "chat_loaded": {
                            if (data.data.rid) {
                                // save current room
                                this.props.setChatRoomId(data.data.rid)
                                this.setState({ selectedRoom: data.data.rid, iframeLoading: false })
                            }
                            break
                        }

                        case "Login": {
                            if (data.data["params.token"]) {
                                let analyticData = {
                                    'Category': 'Chat', 'Action': 'UserRegisteredviaChat', 'CustomerID': '', 'leadid': 0, 'event': 'user-registered-via-chat', 'RoomId': eventData.data.rid || ''
                                }
                                GTM.sendEvent({ data: analyticData })
                                this.props.loginViaChat(data.data["params.token"])
                            }
                            break
                        }

                        case "Chat_Close": {
                            // this.props.startLiveChat(false, this.state.selectedLocation)
                            this.setState({ initialMessage: "", selectedRoom: null, })
                            this.props.setChatRoomId(null)
                            // this.props.history.go(-1)
                            break
                        }

                        case "prescription_report": {
                            let analyticData = {
                                'Category': 'Chat', 'Action': 'PrescriptionGenerated', 'CustomerID': '', 'leadid': 0, 'event': 'prescription-generated', 'RoomId': eventData.rid || ''
                            }
                            GTM.sendEvent({ data: analyticData })
                        }
                    }

                    if (data.message && data.message == 'focus') {
                        let iframe = this.refs.chat_frame
                        iframe.scrollTop = iframe.scrollHeight
                        // window.scrollTo(0, iframe.scrollHeight)
                        // debugger
                    }
                }
            }.bind(this))
        }

    }

    componentWillReceiveProps(props) {
        if (props.USER && props.USER.liveChatStarted && props.USER.liveChatStarted != this.props.USER.liveChatStarted) {
            this.setState({ showStaticView: false, iframeLoading: true }, () => {
                this.setState({ hideIframe: false }, () => {
                    let iframe = this.refs.chat_frame
                    if (iframe) {
                        iframe.onload = () => {
                            this.setState({ iframeLoading: false })
                        }
                    } else {
                        this.setState({ iframeLoading: false })
                    }
                })
            })
        } else {
            if (props.USER && !props.USER.liveChatStarted) {
                this.setState({ showStaticView: true, iframeLoading: false })
            }
        }

    }

    dispatchCustomEvent(eventName, data = {}) {
        let event = new Event(eventName)
        let iframe = this.refs.chat_frame
        iframe.dispatchEvent(event)
        iframe.contentWindow.postMessage({ 'event': eventName, data }, '*')
    }

    closeChat() {
        STORAGE.getAuthToken().then((token) => {
            token = token || ""
            this.setState({ token, initialMessage: "", selectedRoom: null })
        })
        this.dispatchCustomEvent.call(this, 'close_frame')
        this.setState({ showCancel: !this.state.showCancel })
        this.props.setChatRoomId(null)
    }

    toggleCancel(e) {
        e.preventDefault()
        e.stopPropagation()
        this.setState({ showCancel: !this.state.showCancel })
    }

    hideStaticChat(data) {
        this.setState({ showChatBlock: false })
    }

    startLiveChatWithMessage(message) {
        this.setState({ initialMessage: message }, () => {
            this.props.startLiveChat()
        })
    }

    render() {
        let doctorData = null
        if (this.props.USER.chatRoomIds[this.state.selectedRoom]) {
            if (this.props.USER.chatDoctors[this.props.USER.chatRoomIds[this.state.selectedRoom]]) {
                doctorData = this.props.USER.chatDoctors[this.props.USER.chatRoomIds[this.state.selectedRoom]]
            }
        }
        let symptoms_uri = this.state.symptoms.reduce((str, curr) => {
            str += `${curr},`
            return str
        }, "")

        if (symptoms_uri) {
            symptoms_uri = encodeURIComponent(symptoms_uri)
        }

        let iframe_url = `${CONFIG.CHAT_URL}?product=DocPrime&cb=1&token=${this.state.token}&symptoms=${symptoms_uri}&room=${this.state.roomId}`

        if (this.state.initialMessage && !this.state.showStaticView) {
            iframe_url += `&msg=${this.state.initialMessage}`
        }

        return (

            <div className={this.props.homePage ? "col-md-7 mb-4" : this.props.colClass ? "col-lg-4 col-md-5 mb-4" : "col-md-5 mb-4"}>
                {
                    this.props.homePage ? '' :
                        <div className={"chat-float-btn d-lg-none d-md-none" + (this.props.extraClass || "")} onClick={() => this.setState({ showChatBlock: true, additionClasses: "" })}><img width="80" src={ASSETS_BASE_URL + "/img/customer-icons/floatingicon.png"} /></div>
                }

                <div className={this.state.showChatBlock ? "floating-chat " : ""}>
                    {
                        this.state.showStaticView ?
                            <ChatStaticView {...this.props} startLiveChatWithMessage={this.startLiveChatWithMessage.bind(this)} hideStaticChat={this.hideStaticChat.bind(this)} showChatBlock={this.state.showChatBlock} dataClass={this.state.showChatBlock ? "chatbox-right test-chat " : `${this.props.homePage ? 'chatbox-right' : 'chatbox-right chat-slide-down d-lg-flex mt-21'} ${this.props.homePage ? '' : this.state.additionClasses}`} />
                            :
                            <div className={this.state.showChatBlock ? "chatbox-right test-chat" : `${this.props.homePage ? 'chatbox-right' : 'chatbox-right chat-slide-down d-lg-flex mt-21'} ${this.props.homePage ? '' : this.state.additionClasses}`}>

                                {/* chat header */}
                                <div className="chat-head">

                                    <div className="hd-chat" style={{ flex: 1 }}>
                                        <p className="text-left header-text-chat" style={{ color: '#ef5350' }}>
                                            <span className="hed-txt-lt">Get a </span>
                                            Free Online Doctor Consultation!
                                    </p>
                                    </div>

                                    <div className="cht-head-rqst-btn" style={this.props.homePage ? { width: 64 } : { width: 98 }} >
                                        <span className="mr-2" onClick={() => {
                                            let data = {
                                                'Category': 'Chat', 'Action': 'CallBackRequested', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'callback-requested', 'RoomId': this.state.selectedRoom
                                            }
                                            GTM.sendEvent({ data: data })

                                            this.dispatchCustomEvent.call(this, 'call')
                                        }}>
                                            <img style={{ width: 26 }} src="/assets/img/customer-icons/chat-call.svg" />

                                        </span>
                                        <span onClick={this.toggleCancel.bind(this)}>
                                            <img style={{ width: 26 }} src="/assets/img/customer-icons/chat-rstrt.svg" />

                                        </span>
                                        {
                                            this.state.showChatBlock
                                                ? <span className="ml-2" onClick={() => this.setState({ showChatBlock: false })}><img className="close-chat" style={{ width: 26 }} src="/assets/img/customer-icons/cht-cls.svg" /></span>
                                                : ''
                                        }
                                    </div>
                                </div>
                                {/* chat header */}
                                {/* chat Body */}
                                <div className="chat-body">
                                    {
                                        STORAGE.isAgent() || this.state.hideIframe ? "" : <iframe className={this.props.homePage ? `chat-iframe ${this.state.iframeLoading ? 'd-none' : ''}` : `chat-iframe-inner float-chat-height ${this.state.iframeLoading ? 'd-none' : ''}`} src={iframe_url} ref="chat_frame"></iframe>
                                    }
                                    {
                                        this.state.iframeLoading ?
                                            <div className="loader-for-chat-div">
                                                <div className='loader-for-chat'>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                                <p className="ldng-text">Connecting to best doctor...</p>
                                            </div>
                                            : ""
                                    }
                                </div>
                                {/* chat Body */}
                                <div className="chat-footer">
                                    <div className="wrng-mssg">
                                        <img style={{ height: 24, width: 24 }} sth src="/assets/images/warning-icon.png" />
                                        <span>
                                            Not for emergencies! In the case of emergency please visit a hospital.  Chat is only applicable to Indian citizens currently residing in India.
                                    </span>
                                    </div>
                                </div>

                                {
                                    this.state.showCancel ? <CancelPopup toggle={this.toggleCancel.bind(this)} closeChat={this.closeChat.bind(this)} /> : ""
                                }
                            </div>
                    }
                </div>
            </div>
        );
    }
}


export default ChatPanel
