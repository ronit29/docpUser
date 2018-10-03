import React from 'react';
import STORAGE from '../../../helpers/storage'
import CONFIG from '../../../config'

import InitialsPicture from '../../commons/initialsPicture'
import CancelPopup from './cancelPopup'
import GTM from '../../../helpers/gtm.js'
import Loader from '../Loader'
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
            showStaticView:true,
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

        if(this.props.USER && (this.props.USER.chat_static_msg || Object.keys(this.props.USER.chatRoomIds).length>0) ){

            this.setState({showStaticView : false})
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
                                this.setState({ selectedRoom: data.data.rid ,iframeLoading:false})
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
                            this.props.history.go(-1)
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

    }

    componentWillReceiveProps(props){

        if(props.USER && (props.USER.chat_static_msg!="" || Object.keys(props.USER.chatRoomIds).length>0) ){
            let iframe = this.refs.chat_frame
            if(iframe){
                iframe.onload = () => {
                   this.setState({ iframeLoading: false,showStaticView:false })
                }
            }else{
                this.setState({showStaticView:false,iframeLoading:true})
            }
            

        }else{
            this.setState({showStaticView:true,iframeLoading:false})
        }
    }

    dispatchCustomEvent(eventName, data = {}) {
        let event = new Event(eventName)
        let iframe = this.refs.chat_frame
        iframe.dispatchEvent(event)
        iframe.contentWindow.postMessage({ 'event': eventName, data }, '*')
    }

    openDoctorProfile(doctor_id) {
        // this.props.history.push(`/opd/doctor/${doctor_id}`)
    }

    getLocation(latitude, longitude, cb) {
        var latlng = { lat: parseFloat(latitude), lng: parseFloat(longitude) }

        let geocoder = new google.maps.Geocoder
        geocoder.geocode({ 'location': latlng }, (results, status) => {
            if (results && results[0]) {
                this.props.selectLocation(results[0])
                if (cb) cb()
            }
        })
    }

    closeChat() {
        
        this.dispatchCustomEvent.call(this, 'close_frame')
        setTimeout(() => {
            this.props.saveChatStaticMsg('', true)
        }, 2000)
        this.setState({ showCancel: !this.state.showCancel })
        // this.props.history.go(-1)
    }

    toggleCancel(e) {
        e.preventDefault()
        e.stopPropagation()
        this.setState({ showCancel: !this.state.showCancel })
    }

    getDoctorSpecialization(doctor_data) {
        let final_str = ""
        let qualification_str = null
        let { qualifications, general_specialization, practicing_since } = doctor_data
        if (qualifications && qualifications.length) {
            for (let qual of qualifications) {
                let curr_qual = qual.qualification.toString().trim().toLowerCase()
                if (curr_qual == 'mbbs') {
                    qualification_str = 'MBBS | '
                }
            }
        }

        if (qualification_str) {
            final_str = qualification_str

            if (general_specialization && general_specialization.length) {
                final_str += `${general_specialization[0].name}`
            }

            if (practicing_since) {
                let curr_year = (new Date()).getFullYear()
                let expYears = curr_year - parseInt(practicing_since)
                if (expYears >= 5) {
                    final_str += ` | ${expYears} Yr. Experience`
                }
            }
        }

        return final_str

    }

    hideStaticChat(data){
        this.setState({showChatBlock:false})
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

        let iframe_url = `${CONFIG.CHAT_URL}?product=DocPrime&cb=1&token=${this.state.token}&symptoms=${symptoms_uri}&msg=${this.props.USER.chat_static_msg||''}&room=${this.state.roomId}`


        return (

            <div className={this.props.homePage ? "col-md-7 mb-4" : this.props.colClass ? "col-lg-4 col-md-5 mb-4" : "col-md-5 mb-4"}>
                {
                    this.props.homePage ? '' :
                        <div className={"chat-float-btn d-lg-none d-md-none" + (this.props.extraClass || "")} onClick={() => this.setState({ showChatBlock: true, additionClasses: "" })}><img width="80" src={ASSETS_BASE_URL+"/img/customer-icons/floatingicon.png"} /></div>
                }

                <div className={this.state.showChatBlock ? "floating-chat " :""}>
                {this.state.showStaticView
                        ?<ChatStaticView {...this.props} hideStaticChat = {this.hideStaticChat.bind(this)} showChatBlock={this.state.showChatBlock} dataClass={this.state.showChatBlock ? "chatbox-right test-chat " : `${this.props.homePage ? 'chatbox-right' : 'chatbox-right chat-slide-down d-lg-flex mt-21'} ${this.props.homePage ? '' : this.state.additionClasses}`}/>
                        :<div className={this.state.showChatBlock ? "chatbox-right test-chat" : `${this.props.homePage ? 'chatbox-right' : 'chatbox-right chat-slide-down d-lg-flex mt-21'} ${this.props.homePage ? '' : this.state.additionClasses}`}>


                            {/* chat header */}
                            <div className="chat-head">

                                { /*<div className="hd-chat" onClick={() => {
                                    if (doctorData) {
                                        this.openDoctorProfile(doctorData.id)
                                    }
                                }}>
                                    {
                                        doctorData ?
                                            <InitialsPicture name={doctorData.name} has_image={!!doctorData.thumbnail} className="chat-usr-img initialsPicture-cs">
                                                <img src={doctorData.thumbnail} className="chat-usr-img" />
                                            </InitialsPicture> : ""
                                    }
                                    {
                                        doctorData ?
                                            <p>
                                                Dr. {doctorData.name}<br />
                                                <span className="hed-txt-lt">{this.getDoctorSpecialization(doctorData)}</span>
                                            </p> : ""
                                    }
                                

                                </div>

                                */}

                                <div className="hd-chat" style={{flex: 1}}>
                                    <p className="text-left header-text-chat" style={{color: '#ef5350'}}>
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
                                    STORAGE.isAgent() || this.state.hideIframe ? "" : <iframe className={this.props.homePage ? `chat-iframe ${this.state.iframeLoading?'d-none':''}` : `chat-iframe-inner float-chat-height ${this.state.iframeLoading?'d-none':''}`} src={iframe_url} ref="chat_frame"></iframe>
                                }
                                {
                                    this.state.iframeLoading ?
                                        <div className="loaderCircular chat-loader-center" >
                                            <div className="dp-loader"></div>
                                        </div>
                                        : ""
                                }
                            </div>
                            {/* chat Body */}
                            <div className="chat-footer">
                                {/* <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text chat-attachd-btn">
                                            <img src="/assets/images/attch.png" />
                                        </span>
                                    </div>
                                    <textarea className="form-control chat-text-area" placeholder="Write your message here" aria-label="With textarea" defaultValue={""} />
                                    <button className="send-msg-btn">
                                        <img src="/assets/images/send-msg-btn.png" />
                                    </button>
                                </div> */}
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
