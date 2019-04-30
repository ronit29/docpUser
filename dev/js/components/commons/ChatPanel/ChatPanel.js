import React from 'react';
import STORAGE from '../../../helpers/storage'
import CONFIG from '../../../config'

import InitialsPicture from '../../commons/initialsPicture'
import CancelPopup from './cancelPopup'
import GTM from '../../../helpers/gtm.js'
import ChatStaticView from './ChatStaticView'
import RelatedArticles from '../article/RelatedArticles'
import RecentArticles from '../article/RecentArticles'
import BannerCarousel from '../Home/bannerCarousel';
const queryString = require('query-string');

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
            initialMessage: "",
            callTimeout: false
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

            if (this.props.mobilechatview) {
                this.setState({ showChatBlock: true });
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

        if (typeof window == "object") {
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
                                    'Category': 'Chat', 'Action': 'L1DoctorAssigned', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'l1-doctor-assigned', 'RoomId': eventData.data.rid, 'DoctorId': eventData.data.employeeId, "url": window.location.pathname
                                }
                                GTM.sendEvent({ data: analyticData })

                            } else if (eventData.data.agentType == 'Type 2') {

                                analyticData = {
                                    'Category': 'Chat', 'Action': 'L2DoctorAssigned', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'l2-doctor-assigned', 'RoomId': eventData.data.rid, 'DoctorId': eventData.data.employeeId, "url": window.location.pathname
                                }
                                GTM.sendEvent({ data: analyticData })

                            } else if (eventData.data.agentType == 'Type 3') {

                                analyticData = {
                                    'Category': 'Chat', 'Action': 'L3DoctorAssigned', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'l3-doctor-assigned', 'RoomId': eventData.data.rid, 'DoctorId': eventData.data.employeeId, "url": window.location.pathname
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
                                let analyticData = {
                                    'Category': 'Chat', 'Action': 'ChatInitialization', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'chat-initialization', 'RoomId': data.data.rid, "url": window.location.pathname
                                }
                                GTM.sendEvent({ data: analyticData })

                                this.props.setChatRoomId(data.data.rid)
                                this.setState({ selectedRoom: data.data.rid, iframeLoading: false })
                            }
                            break
                        }

                        case "Login": {
                            if (data.data["params.token"]) {
                                let analyticData = {
                                    'Category': 'Chat', 'Action': 'UserRegisteredviaChat', 'CustomerID': '', 'leadid': 0, 'event': 'user-registered-via-chat', 'RoomId': eventData.data.rid || '', "url": window.location.pathname
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
                            this.props.unSetCommonUtmTags('chat')
                            // this.props.history.go(-1)
                            break
                        }

                        case "prescription_report": {
                            let analyticData = {
                                'Category': 'Chat', 'Action': 'PrescriptionGenerated', 'CustomerID': '', 'leadid': 0, 'event': 'prescription-generated', 'RoomId': eventData.rid || '', "url": window.location.pathname
                            }
                            GTM.sendEvent({ data: analyticData })
                        }
                    }

                    /**
                     * redirecting chat to new page for mobile users on homepage and on focus
                     * TODO : review this
                     */
                    if (data.message && data.message == 'focus') {
                        let iframe = this.refs.chat_frame
                        // iframe.scrollTop = iframe.scrollHeight
                        if (this.props.homePage && window.innerWidth < 768 && !this.props.history.location.pathname.includes('mobileviewchat')) {
                            this.props.history.push('/mobileviewchat')
                        }
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
        this.props.unSetCommonUtmTags('chat')
    }

    toggleCancel(e) {
        e.preventDefault()
        e.stopPropagation()
        this.setState({ showCancel: !this.state.showCancel })
    }

    hideStaticChat(data) {
        if (this.props.mobilechatview) {
            this.props.history.go(-1);
        } else {
            this.setState({ showChatBlock: false });
        }
    }

    startLiveChatWithMessage(message) {
        this.setState({ initialMessage: message }, () => {
            this.props.startLiveChat()
        })
    }

    closeChatClick() {
        if (this.props.mobilechatview) {
            this.props.history.go(-1);
        } else {
            this.setState({ showChatBlock: false });
        }
    }

    chatBtnClick() {
        if (this.props.articleData) {
            this.setState({ showChatBlock: true, additionClasses: "" });
        } else if (this.props.newChatBtn) {
            this.props.history.push('/mobileviewchat?botagent=true&force_start=true');
            let data = {
                'Category': 'Chat', 'Action': 'getHelpBtnClick', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'chat-button-clicked', "url": window.location.pathname
            }
            GTM.sendEvent({ data: data })
        } else if (this.props.newChatBtnAds && this.props.bookingsGA) {
            this.props.history.push('/mobileviewchat?botagent=true&force_start=true');
            let data = {
                'Category': 'Chat', 'Action': 'getHelpBtnClick', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'chat-button-clicked', "url": window.location.pathname
            }
            GTM.sendEvent({ data: data })
        }
    }

    newChatBtnClick() {
        if (this.props.type && (this.props.type == 'opd' || this.props.type == 'lab')) {
            this.props.history.push('/mobileviewchat?botagent=true&force_start=true');
            let data = {
                'Category': 'Chat', 'Action': 'needHelpBtnClicked', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'need-help-btn-clicked', "PageType": this.props.type, "url": window.location.pathname
            }
            GTM.sendEvent({ data: data })
        }
        else {
            this.setState({ showChatBlock: true, additionClasses: "" });
        }
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

        let parsedHref = ''
        if (typeof window == "object") {
            parsedHref = queryString.parse(window.location.search);
        }

        let iframe_url = `${CONFIG.CHAT_URL}?product=DocPrime&cb=1&token=${this.state.token}&symptoms=${symptoms_uri}&room=${this.state.roomId}&from_app=${parsedHref.from_app || false}&device_id=${parsedHref.device_id || ''}`

        if (this.state.initialMessage && !this.state.showStaticView) {
            iframe_url += `&msg=${this.state.initialMessage}`
        }

        let botAgent = false
        if (this.props.location.search.includes('botagent')) {
            botAgent = true
            if (this.props.type && this.props.type == 'opd') {
                iframe_url += `&botagent=DocPrimeSOT&source=doctorlistingchatnow`
            } else if (this.props.newChatBtnAds) {
                iframe_url += `&botagent=DocPrimeSOT&source=leadformchatnow`
            } else {
                iframe_url += `&botagent=DocPrimeSOT&source=lablistingchatnow`
            }
        }

        if (this.props.USER && this.props.USER.common_utm_tags && this.props.USER.common_utm_tags.length) {
            let religareTag = this.props.USER.common_utm_tags.filter(x => x.type == 'chat' && x.utm_source == 'religare')

            if (religareTag.length) {
                iframe_url += `&source=religare&visitid=${religareTag[0].visitorId}`
            }
        }
        let chatBtnContent1 = ''
        let chatBtnContent2 = ''
        if (this.props.articleData && this.props.articleData.title) {
            chatBtnContent1 = 'Chat now with doctor'
            chatBtnContent2 = 'about ' + this.props.articleData.title.split('|')[0] + ' and related queries'
        } else if (this.props.newChatBtn || this.props.newChatBtnAds) {
            chatBtnContent1 = <span style={{ fontSize: 18 }} ><img style={{ marginRight: 8, width: 24, verticalAlign: 'middle' }} src={ASSETS_BASE_URL + "/img/customer-icons/headphone.svg"} />Get help with your bookings</span>
        }

        let recentArticles = false
        if (this.props.articleData && this.props.articleData.recent_articles) {
            recentArticles = this.props.articleData.recent_articles
        }

        return (
            <div>
                {
                    this.props.homePage || this.props.mobilechatview || this.props.noChatButton || this.props.articleData ? '' :
                        this.props.newChatBtn || this.props.newChatBtnAds ?
                            <section className="chat-article-btn fixed horizontal bottom no-round d-md-none fw-500 text-center" onClick={() => this.chatBtnClick()} >{chatBtnContent1}
                                <span>{chatBtnContent2}</span>
                            </section> : ""
                    // <div className={"chat-float-btn d-lg-none d-md-none" + (this.props.extraClass || "")} onClick={() => this.setState({ showChatBlock: true, additionClasses: "" })}>
                    //     <img width="80" src={ASSETS_BASE_URL + "/img/customer-icons/floatingicon.png"} />
                    // </div>
                    // <div className="new-chat-fixed-btn d-md-none" onClick={() => this.newChatBtnClick()}>
                    //     <img src={ASSETS_BASE_URL + '/img/customer-icons/chat-btn-new.svg'} />
                    // </div>
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
                                        {
                                            this.props.location.search && this.props.location.search.includes('?botagent') ?
                                                <p className="text-left header-text-chat" style={{ color: '#ef5350' }}>
                                                    <span className="hed-txt-lt">Get </span>
                                                    Help with Booking
                                                </p>
                                                :
                                                this.props.chatPage ?
                                                    <h1 className="text-left header-text-chat" style={{ color: '#ef5350' }}>
                                                        <span className="hed-txt-lt">Get a </span>
                                                        Free Online Doctor Consultation!
                                                    </h1>
                                                    :
                                                    <p className="text-left header-text-chat" style={{ color: '#ef5350' }}>
                                                        <span className="hed-txt-lt">Get a </span>
                                                        Free Online Doctor Consultation!
                                                    </p>
                                        }
                                    </div>

                                    <div className="cht-head-rqst-btn" style={this.props.homePage ? { width: 64 } : { width: 98 }} >
                                        {
                                            this.state.selectedRoom ? <span className="mr-2" onClick={() => {
                                                let data = {
                                                    'Category': 'Chat', 'Action': 'CallBackRequested', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'callback-requested', 'RoomId': this.state.selectedRoom
                                                }
                                                GTM.sendEvent({ data: data })
                                                if (!this.state.callTimeout) {
                                                    this.dispatchCustomEvent.call(this, 'call')
                                                    this.setState({ callTimeout: true })
                                                    setTimeout(() => {
                                                        this.setState({ callTimeout: false })
                                                    }, 10000)
                                                }
                                            }}>
                                                {/*<img style={{ width: 26 }} src="/assets/img/customer-icons/chat-call.svg" title="get a callback from doctor" />*/}

                                            </span> : ""
                                        }


                                        {
                                            this.state.showChatBlock
                                                ? <span onClick={() => this.closeChatClick()}><img className="close-chat" style={{ width: 26 }} src={ASSETS_BASE_URL + "/img/chatminimize.svg"} /></span>
                                                : ''
                                        }
                                        <span className="ml-2" onClick={this.toggleCancel.bind(this)}>
                                            <img style={{ width: 26 }} src={ASSETS_BASE_URL + "/img/chatclose.svg"} title="start a new chat" />

                                        </span>
                                    </div>
                                </div>
                                {/* chat header */}
                                {/* chat Body */}
                                <div className="chat-body">
                                    {
                                        STORAGE.isAgent() || this.state.hideIframe ? "" : <iframe className={this.props.homePage ? `chat-iframe ${this.state.iframeLoading ? 'd-none' : ''}` : `chat-iframe-inner float-chat-height ${this.state.iframeLoading ? 'd-none' : ''}`} src={iframe_url} allow="microphone;camera" ref="chat_frame"></iframe>
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
                                                <p className="ldng-text">Connecting to the doctor...</p>
                                            </div>
                                            : ""
                                    }
                                </div>
                                {/* chat Body */}
                                {
                                    this.state.showCancel ? <CancelPopup toggle={this.toggleCancel.bind(this)} closeChat={this.closeChat.bind(this)} /> : ""
                                }
                            </div>
                    }
                </div>

                <div className={this.props.homePage ? `chat-footer mt-21` : `chat-footer mt-21 d-none d-md-block`}>
                    <div className="wrng-mssg">
                        <img style={{ height: 24, width: 24 }} src={ASSETS_BASE_URL + "/images/warning-icon.png"} />
                        <span>
                            Not for emergencies! In the case of emergency please visit a hospital. Chat is only applicable to Indian citizens currently residing in India.</span>
                    </div>
                </div>

                {
                    this.props.articleData ?
                        <div className="related-articles-div">
                            {
                                this.props.articleData.linked.length ?
                                    <div className="related-article-sub">
                                        {
                                            this.props.articleData.linked.map((linkedArticle, i) => {
                                                return <RelatedArticles key={i} linkedArticle={linkedArticle} {...this.props} />
                                            })
                                        }
                                    </div> : ''
                            }
                            {
                                recentArticles && recentArticles.items && recentArticles.items.length ?
                                    <RecentArticles recentArticlesItems={recentArticles.items} recentArticleTitle={recentArticles.title} /> : ''
                            }
                        </div> : ''
                }
                {
                    this.props.homePage && !this.props.chatPage && this.props.offerList && this.props.offerList.filter(x => x.slider_location === 'home_page').length ?
                        <BannerCarousel {...this.props} sliderLocation="home_page" /> : ''
                }
                {
                    this.props.chatPage && this.props.offerList && this.props.offerList.filter(x => x.slider_location === 'online_consultation').length ?
                        <div className="mrt-20">
                            <BannerCarousel {...this.props} sliderLocation="online_consultation" />
                        </div> : ''
                }
            </div>
        );
    }
}


export default ChatPanel
