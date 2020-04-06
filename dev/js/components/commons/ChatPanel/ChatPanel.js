import React from 'react';
import STORAGE from '../../../helpers/storage'
import CONFIG from '../../../config'

import InitialsPicture from '../../commons/initialsPicture'
import CancelPopup from './cancelPopup'
import GTM from '../../../helpers/gtm.js'
import ChatStaticView from './ChatStaticView'
import RelatedArticles from '../article/RelatedArticles'
import RecentArticles from '../article/RecentArticles'
import TableOfContent from '../article/TableOfContent'
import BannerCarousel from '../Home/bannerCarousel';
const queryString = require('query-string');
import ChatRefundReasons from './ChatRefundReasons.js'
import SnackBar from 'node-snackbar'

class ChatPanel extends React.Component {
    constructor(props) {
        super(props)
        let parsedHref = ''
        let is_thyrocare = false
        if (typeof window == "object") {
            parsedHref = queryString.parse(window.location.search)
            is_thyrocare = (parsedHref && parsedHref.utm_source && parsedHref.utm_source.includes('Thyrocare'))
        }
        this.state = {
            selectedRoom: null,
            token: "",
            symptoms: [],
            roomId: "",
            showCancel: false,
            showChatBlock: false,
            additionClasses: ' chat-load-mobile',
            hideIframe: is_thyrocare ? false : true,
            iframeLoading: is_thyrocare ? false : true,
            showStaticView: is_thyrocare ? false : true,
            initialMessage: "",
            callTimeout: false,
            openRefundPopup: false
        }
    }

    componentDidMount() {
        let parsedHref = ''
        if (typeof window == "object") {
            parsedHref = queryString.parse(window.location.search)
        }

        if (this.props.onRefIpd) {
            this.props.onRefIpd(this)
        }
        if (this.props.selectedLocation) {
            this.sendLocationNotification(this.props.selectedLocation)
        }

        STORAGE.getAuthToken().then((token) => {
            //this.sendUserDetails(this.props.USER)
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
        if (this.props.USER && (this.props.USER.liveChatStarted || this.props.USER.ipd_chat && this.props.USER.ipd_chat.showIpdChat)) {
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

                    let iframe1 = this.refs.chat_frame1
                    if (iframe1) {
                        iframe1.onload = () => {
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

                            // this.props.getChatDoctorById(data.data.manager, data.data.rid, (data) => {
                            //     this.dispatchCustomEvent('profile_assigned', {
                            //         profileId: data.id
                            //     })

                            // })
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
                                let extraParams = {}
                                if (typeof window == "object") {
                                    parsedHref = queryString.parse(window.location.search)
                                }
                                if (parsedHref && parsedHref.payment == 'success') {
                                    extraParams.payment = true
                                }
                                this.props.setChatRoomId(data.data.rid, extraParams)
                                if (this.props.selectedLocation) {
                                    this.sendLocationNotification(this.props.selectedLocation)
                                }
                                //Send payment event ,when payment is in url
                                if (parsedHref && parsedHref.payment) {
                                    this.sendPaymentStatusEvent(data.data.rid)
                                }

                                this.sendUserDetails()
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
                            if (parsedHref && parsedHref.payment == 'success') {
                                let buildUrl = this.buildUrl()
                                this.props.history.replace(buildUrl)
                            }
                            this.props.setChatRoomId(null)
                            let that = this
                            setTimeout(() => {
                                that.props.ipdChatView(null)
                            }, 1000)
                            this.props.unSetCommonUtmTags('chat')
                            // this.props.history.go(-1)
                            break
                        }

                        case "prescription_report": {
                            let analyticData = {
                                'Category': 'Chat', 'Action': 'PrescriptionGenerated', 'CustomerID': '', 'leadid': 0, 'event': 'prescription-generated', 'RoomId': eventData.rid || '', "url": window.location.pathname
                            }
                            GTM.sendEvent({ data: analyticData })
                            break;
                        }

                        case 'banner': {

                            if (data.type == 'timer') {
                                let analyticData = {
                                    'Category': 'Chat', 'Action': 'BannerTimerFired', 'CustomerID': '', 'leadid': 0, 'event': 'banner-timer-fired', 'RoomId': eventData.rid || '', "url": window.location.pathname
                                }
                                GTM.sendEvent({ data: analyticData })
                            } else if (data.type == 'transfer') {
                                let analyticData = {
                                    'Category': 'Chat', 'Action': 'BannerTransferFired', 'CustomerID': '', 'leadid': 0, 'event': 'banner-transfer-fired', 'RoomId': eventData.rid || '', "url": window.location.pathname
                                }
                                GTM.sendEvent({ data: analyticData })
                            } else if (data.type == 'preventive') {
                                let analyticData = {
                                    'Category': 'Chat', 'Action': 'PreventiveFired', 'CustomerID': '', 'leadid': 0, 'event': 'preventive-fired', 'RoomId': eventData.rid || '', "url": window.location.pathname
                                }
                                GTM.sendEvent({ data: analyticData })
                            } else if (data.type == 'salesBanner') {
                                let analyticData = {
                                    'Category': 'Chat', 'Action': 'BannerSalesFired', 'CustomerID': '', 'leadid': 0, 'event': 'banner-sales-fired', 'RoomId': eventData.rid || '', "url": window.location.pathname
                                }
                                GTM.sendEvent({ data: analyticData })
                            }
                            break;
                        }

                        case 'bookNow': {


                            let analyticData = {
                                'Category': 'Chat', 'Action': 'BookNowFired', 'CustomerID': '', 'leadid': 0, 'event': 'book-now-fired', 'RoomId': eventData.rid || '', "url": window.location.pathname, 'specialization_url': data.url || '', 'ids': data.ids || '', 'type': data.type || ''
                            }
                            GTM.sendEvent({ data: analyticData })
                            break;
                        }

                        case 'bookNowPharmacy': {
                            let analyticData = {
                                'Category': 'Chat', 'Action': 'BookNowPharmacyFired', 'CustomerID': '', 'leadid': 0, 'event': 'book-now-pharmacy-fired', 'RoomId': eventData.rid || '', "url": window.location.pathname
                            }
                            GTM.sendEvent({ data: analyticData })
                            break;
                        }

                        case 'MobileVerification': {
                            let analyticData = {
                                'Category': 'Chat', 'Action': 'MobileVerificationFired', 'CustomerID': '', 'leadid': 0, 'event': 'mobile-verification-fired', 'RoomId': eventData.rid || '', "url": window.location.pathname
                            }
                            GTM.sendEvent({ data: analyticData })
                            this.props.setChatRoomId(data.data.rid, { showDisabledPayment: true })
                            break;
                        }

                    }

                    /**
                     * redirecting chat to new page for mobile users on homepage and on focus
                     * TODO : review this
                     */
                    if (data.message && data.message == 'focus' && !(this.props.USER && this.props.USER.ipd_chat && this.props.USER.ipd_chat.showIpdChat)) {
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

    sendPaymentStatusEvent(rid) {
        let parsedHref = ''
        if (typeof window == "object") {
            parsedHref = queryString.parse(window.location.search)
        }
        let data = {
            rid: rid,
            payment_status: parsedHref.payment || ''
        }
        this.dispatchCustomEvent('payment', data)
    }

    componentWillUnmount() {
        if (this.props.onRefIpd) {
            this.props.onRefIpd(undefined)
        }
    }

    sendLocationNotification(selectedLocation) {
        let data = {
            location: selectedLocation.geometry.location,
            locality: selectedLocation.locality,
            city: selectedLocation.name,
            address: selectedLocation.formatted_address
        }

        this.dispatchCustomEvent('location', data)
    }

    sendUserDetails() {
        let data = {}
        setTimeout(() => {
            let user = this.props.USER
            if (user && user.profiles && Object.keys(user.profiles).length > 0 && user.profiles[user.selectedProfile]) {

                this.dispatchCustomEvent('user_details', { is_insured: user.profiles[user.selectedProfile].is_insured, name: user.profiles[user.selectedProfile].name })
            } else {
                this.dispatchCustomEvent('user_details', { is_insured: false, name: '' })
            }

        }, 1000)

    }

    componentWillReceiveProps(props) {
        let parsedHref = ''
        if (typeof window == "object") {
            parsedHref = queryString.parse(window.location.search);
        }
        let is_thyrocare = (parsedHref && parsedHref.utm_source && parsedHref.utm_source.includes('Thyrocare')) ? true : false

        if (this.props.selectedLocation != props.selectedLocation && props.selectedLocation) {
            this.sendLocationNotification(props.selectedLocation)
        }

        if ((props.USER && props.USER.liveChatStarted && props.USER.liveChatStarted != this.props.USER.liveChatStarted) || (props.USER && props.USER.ipd_chat && props.USER.ipd_chat.showIpdChat)) {
            //this.sendUserDetails(props.USER)
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

                    let iframe1 = this.refs.chat_frame1
                    if (iframe1) {
                        iframe1.onload = () => {
                            this.setState({ iframeLoading: false })
                        }
                    } else {
                        this.setState({ iframeLoading: false })
                    }
                })
            })
        } else {
            if (props.USER && !props.USER.liveChatStarted) {
                this.setState({ showStaticView: is_thyrocare ? false : true, iframeLoading: false })
            }
        }

    }

    dispatchCustomEvent(eventName, data = {}) {
        let event = new Event(eventName)
        let iframe = this.refs.chat_frame

        if (iframe && iframe.contentWindow) {
            iframe.dispatchEvent(event)
            iframe.contentWindow.postMessage({ 'event': eventName, data }, '*')
        }
        let iframe1 = this.refs.chat_frame1
        if (iframe1 && iframe1.contentWindow) {
            iframe1.dispatchEvent(event)
            iframe1.contentWindow.postMessage({ 'event': eventName, data }, '*')
        }
    }

    closeChat() {
        let parsedHref = ''
        if (typeof window == "object") {
            parsedHref = queryString.parse(window.location.search)
        }

        STORAGE.getAuthToken().then((token) => {
            token = token || ""
            this.setState({ token, initialMessage: "", selectedRoom: null })
        })
        this.dispatchCustomEvent.call(this, 'close_frame')
        this.setState({ showCancel: !this.state.showCancel })
        if (parsedHref && parsedHref.payment == 'success') {
            let buildUrl = this.buildUrl()
            this.props.history.replace(buildUrl)
        }
        this.props.setChatRoomId(null)
        this.props.unSetCommonUtmTags('chat')
        let that = this
        setTimeout(() => {
            that.props.ipdChatView(null)
        }, 1000)

    }

    buildUrl() {
        return window.pathname;
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
        if (this.props.articleData || this.props.searchTestInfoData) {
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

    onIframeLoad(e) {
        try {
            let target = e.target
            if (target) {
                (target.contentWindow || target.contentDocument).location.href;
            }
        } catch (error) {
            console.log('error in rendering chat iframe' + error);
        }
    }
    refundClicked(isEnable) {
        if (isEnable) {
            let data = {
                'Category': 'Chat', 'Action': 'RefundBtnClicked', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'Refund-btn-clicked', "PageType": this.props.type, "url": window.location.pathname
            }
            GTM.sendEvent({ data: data })
            this.toggleRefundPopup()

        } else {
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "No payment exists for this consultation" })
            }, 200)
        }
    }

    toggleRefundPopup() {
        this.setState({ openRefundPopup: !this.state.openRefundPopup })
    }

    submitRefundReasons(reason) {
        let data = {
            roomId: this.state.roomId,
            reason: reason
        }
        this.dispatchCustomEvent('Refund_Fees', data)
        this.props.setPaymentStatus(null)
        let buildUrl = this.buildUrl()
        this.props.history.replace(buildUrl)
        this.toggleRefundPopup()
    }

    sendPageUrl = () => {
        let data = {
            callback: window.location.pathname.substring(1) + window.location.search.replace(/&/g,'*'),
            template: this.props.msgTemplate ? this.props.msgTemplate : 'common'
        }
        this.props.sendAgentWhatsupPageURL(data).then((resp) => {
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Sent Successfully" })
            }, 500)
        }).catch((e) => {
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Try again!" })
            }, 500)
        })
    }

    render() {

        return(
            <React.Fragment>

            </React.Fragment>
        )
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

        let iframe_url = `${CONFIG.CHAT_URL}?cb=1&token=${this.state.token}&symptoms=${symptoms_uri}&room=${this.state.roomId}&from_app=${parsedHref.from_app || false}&device_id=${parsedHref.device_id || ''}`

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
        let is_religare = false
        if (false && this.props.USER && this.props.USER.common_utm_tags && this.props.USER.common_utm_tags.length) {
            let religareTag = this.props.USER.common_utm_tags.filter(x => x.type == 'chat' && x.utm_source == 'religare')

            if (religareTag.length) {
                is_religare = true
                iframe_url += `&source=religare&visitid=${religareTag[0].visitorId}`
            }
        }
        if (parsedHref && parsedHref.utm_source) {

            if (parsedHref.utm_source != 'religare') {
                iframe_url += `&source=${parsedHref.utm_source}`
            }

            if (!is_religare && parsedHref.utm_source.includes('religare')) {
                is_religare = true
                iframe_url += `&source=religare&visitid=${parsedHref.visitid ? parsedHref.visitid : ''}`
            }

        }
        is_religare = is_religare && this.props.mobilechatview
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


        //if(this.props.showHalfScreenChat && this.props.ipdFormParams) {
        if (this.props.USER && this.props.USER.ipd_chat && this.props.USER.ipd_chat.ipdForm && false) {

            let params = JSON.stringify(this.props.USER.ipd_chat.ipdForm)
            iframe_url += `&product=IPD&params=${params}&msg=startchat`
        } else {
            iframe_url += '&product=DocPrime'
        }

        if (parsedHref.booking_id) {
            iframe_url += `&booking_id=${parsedHref.booking_id}`
        }

        if (parsedHref.utm_source && parsedHref.utm_source.includes('Thyrocare')) {
            iframe_url += '&msg=startchat'
        }

        if (parsedHref.payment) {
            iframe_url += `&payment=${parsedHref.payment}`
        }

        if (parsedHref.order_id) {
            iframe_url += `&order_id=${parsedHref.order_id}`
        }

        let payment_disable = parsedHref && parsedHref.utm_campaign && parsedHref.utm_campaign.includes('AdDocChat') ? parsedHref.utm_campaign.includes('AdDocChat') : null

        if (parsedHref.utm_campaign) {
            iframe_url += `&utm_campaign=${parsedHref.utm_campaign}`
        }

        if (payment_disable) {
            iframe_url += `&testing_mode=a`
        } else {
            iframe_url += `&testing_mode=b`
        }

        if (parsedHref && parsedHref.consultation_id) {
            iframe_url += `&consultation_id=${parsedHref.consultation_id}`
        }

        let is_payment_for_current_room = null
        let show_disabled_refund_button = null
        if (this.props.USER && this.props.USER.currentRoomId) {

            if (this.props.USER.chatPaymentStatus == this.props.USER.currentRoomId) {
                is_payment_for_current_room = true;
            }

            if (this.props.USER.mobileVerificationDone == this.props.USER.currentRoomId) {
                show_disabled_refund_button = true
            }
        }

        if (this.props.showHalfScreenChat && !this.props.showDesktopIpd) {
            return (
                <div className="chat-body">
                    {
                        STORAGE.isAgent() || this.state.hideIframe ? "" : <iframe className={this.props.homePage ? `chat-iframe ${this.state.iframeLoading ? 'd-none' : ''}` : `chat-iframe-inner float-chat-height ${this.state.iframeLoading ? 'd-none' : ''}`} src={iframe_url} allow="microphone;camera" ref="chat_frame1"></iframe>
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
            )
        } else {
            return (
                <React.Fragment>
                    {
                        this.state.showCancel ? <CancelPopup homePage={this.props.homePage} toggle={this.toggleCancel.bind(this)} closeChat={this.closeChat.bind(this)} /> : ""
                    }
                    <div className="fixed-chatbox">
                        {
                            this.props.homePage && false?
                                <div className="banner-cont-height home-page-banner-div mr-0 banner-md-margn home-bnnr-mrgn">
                                    <div className="hidderBanner banner-carousel-div">
                                        <div className="divHeight m-0" style={{ marginBottom: "5px!important" }}></div>
                                    </div>
                                    {
                                        !!!this.props.chatPage && this.props.offerList && this.props.offerList.filter(x => x.slider_location === 'home_page').length ?
                                            <div className="home-banner-pos">
                                                <BannerCarousel {...this.props} sliderLocation="home_page" />
                                            </div>
                                            : ''
                                    }
                                </div>
                                : ''
                        }
                        {
                            false && this.props.chatPage && this.props.offerList && this.props.offerList.filter(x => x.slider_location === 'online_consultation').length ?
                                <BannerCarousel {...this.props} sliderLocation="online_consultation" chatPage={this.props.chatPage} /> : ''
                        }
                        {
                            this.state.openRefundPopup &&
                            <ChatRefundReasons submitRefund={this.submitRefundReasons.bind(this)} toggleRefund={() => this.toggleRefundPopup()} />

                        }
                        {
                            this.props.homePage || this.props.mobilechatview || this.props.noChatButton || this.props.articleData || this.props.searchTestInfoData ? '' :
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
                        {
                            this.props.searchTestInfoData && this.props.updateTabsValues && this.props.resp_test_id ?
                                <div className="table-of-content-desktop mt-21">
                                    <TableOfContent searchTestInfoData={this.props.searchTestInfoData} updateTabsValues={this.props.updateTabsValues} resp_test_id={this.props.resp_test_id} />
                                </div> : ''
                        }
                        <div className={`${this.state.showChatBlock ? "floating-chat " : ""} ${is_religare ? ' chat-rlgr-view' : ''}`}>
                            {
                                this.state.showStaticView ?
                                    <ChatStaticView {...this.props} startLiveChatWithMessage={this.startLiveChatWithMessage.bind(this)} hideStaticChat={this.hideStaticChat.bind(this)} showChatBlock={this.state.showChatBlock} dataClass={this.state.showChatBlock ? "chatbox-right test-chat " : `${this.props.homePage ? 'chatbox-right' : 'chatbox-right chat-slide-down d-lg-flex mt-21'} ${this.props.homePage ? '' : this.state.additionClasses}`} is_religare={is_religare} sendPageUrl={this.sendPageUrl}/>
                                    :
                                    <div className={this.state.showChatBlock ? "chatbox-right test-chat" : `${this.props.homePage ? 'chatbox-right' : 'chatbox-right chat-slide-down d-lg-flex mt-21'} ${this.props.homePage ? '' : this.state.additionClasses}`}>

                                        {/* chat header */}
                                        <div className="chat-head">

                                            <div className="hd-chat" style={{ flex: 1 }}>
                                                {
                                                    this.props.location.search && this.props.location.search.includes('?botagent') ?
                                                        <p className="text-left header-text-chat">
                                                            <span className="hed-txt-lt">Get </span>
                                                            Help with Booking
                                                    </p>
                                                        :
                                                        this.props.chatPage ?
                                                            <h1 className="text-left header-text-chat">
                                                                {/* <span className="hed-txt-lt">Get a </span> */}
                                                                Online Doctor Consultation!
                                                        </h1>
                                                            :
                                                            <p className="text-left header-text-chat">
                                                                {/* <span className="hed-txt-lt">Get a </span> */}
                                                                Online Doctor Consultation!
                                                        </p>
                                                }
                                            </div>
                                            <div className="cht-head-rqst-btn refund-chat" style={this.props.homePage ? {} : {}} >
                                                {
                                                    !is_religare && show_disabled_refund_button && <p className={`cht-need-btn cursor-pntr mr-2 ${is_payment_for_current_room ? '' : 'disable-all'}`} onClick={() => { this.refundClicked(is_payment_for_current_room) }}>
                                                        <img src={ASSETS_BASE_URL + '/img/chat-rfnd.png'} style={{ width: 28 }} /> </p>
                                                }
                                                {
                                                    /*this.state.selectedRoom ? <span className="mr-2" onClick={() => {
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
                                                        <img style={{ width: 26 }} src="/assets/img/customer-icons/chat-call.svg" title="get a callback from doctor" />
    
                                                    </span> : ""*/
                                                }

                                                {
                                                    is_religare ?
                                                        <span onClick={this.toggleCancel.bind(this)}>
                                                            <img style={{ width: 26 }} src={ASSETS_BASE_URL + "/img/rel_chatclose.svg"} title="start a new chat" />

                                                        </span>
                                                        : <span onClick={this.toggleCancel.bind(this)}>
                                                            <img style={{ width: 26 }} src={ASSETS_BASE_URL + "/img/chatclose.svg"} title="start a new chat" />

                                                        </span>
                                                }


                                                {
                                                    this.state.showChatBlock
                                                        ? is_religare ?
                                                            <span className="ml-2" onClick={() => this.closeChatClick()}><img className="close-chat" style={{ width: 26 }} src={ASSETS_BASE_URL + "/img/rel_chatminimize.svg"} /></span>
                                                            : <span className="ml-2" onClick={() => this.closeChatClick()}><img className="close-chat" style={{ width: 26 }} src={ASSETS_BASE_URL + "/img/chatminimize.svg"} /></span>
                                                        : ''
                                                }
                                            </div>
                                        </div>
                                        {/* chat header */}
                                        {/* chat Body */}
                                        <div className="chat-body">
                                            {
                                                STORAGE.isAgent() || this.state.hideIframe ? "" : <iframe className={this.props.homePage ? `chat-iframe ${this.state.iframeLoading ? 'd-none' : ''}` : `chat-iframe-inner float-chat-height ${this.state.iframeLoading ? 'd-none' : ''}`} src={iframe_url} allow="microphone;camera" ref="chat_frame" onLoad={(e) => this.onIframeLoad(e)} onError={(e) => this.onIframeLoad(e)} ></iframe>
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
                                        
                                    </div>
                            }
                        </div>

                        {/* <div className={this.props.homePage ? `chat-footer mt-21` : `chat-footer mt-21 d-none d-md-block`}>
                        <div className="wrng-mssg">
                            <img style={{ height: 24, width: 24 }} src={ASSETS_BASE_URL + "/images/warning-icon.png"} />
                            <span>
                                Not for emergencies! In the case of emergency please visit a hospital. Chat is only applicable to Indian citizens currently residing in India.</span>
                        </div>
                    </div> */}

                        {
                            // this.props.articleData ?
                            //     <div className="related-articles-div">
                            //         {
                            //             this.props.articleData.linked.length ?
                            //                 <div className="related-article-sub">
                            //                     {
                            //                         this.props.articleData.linked.map((linkedArticle, i) => {
                            //                             return <RelatedArticles key={i} linkedArticle={linkedArticle} {...this.props} />
                            //                         })
                            //                     }
                            //                 </div> : ''
                            //         }
                            //         {
                            //             recentArticles && recentArticles.items && recentArticles.items.length ?
                            //                 <RecentArticles recentArticlesItems={recentArticles.items} recentArticleTitle={recentArticles.title} /> : ''
                            //         }
                            //     </div> : ''
                        }
                        {
                            STORAGE.isAgent() && !this.props.homePage && this.props.msgTemplate?
                            <button onClick={this.sendPageUrl} className="whtsappPages"><img src={ASSETS_BASE_URL + '/img/wa-logo.svg'} />Send on Whatsapp</button>
                            :''
                        }
                    </div>
                </React.Fragment>
            );
        }

    }
}


export default ChatPanel
