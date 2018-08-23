import React from 'react';
import STORAGE from '../../../helpers/storage'
import CONFIG from '../../../config'

import InitialsPicture from '../../commons/initialsPicture'
import CancelPopup from './cancelPopup'

class ChatPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRoom: null,
            token: "",
            symptoms: [],
            roomId: "",
            showCancel: false
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

        if (window) {
            // handling events sent by iframe
            window.addEventListener('message', function ({ data }) {
                console.log("MESSAGE RECEIVED AT CLIENT SIDE - ", data)
                if (data) {
                    switch (data.event) {
                        case "RoomAgent": {
                            this.setState({ selectedRoom: data.data.rid })
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
                                this.setState({ selectedRoom: data.data.rid })
                            }
                            break
                        }

                        case "Login": {
                            if (data.data["params.token"]) {
                                this.props.loginViaChat(data.data["params.token"])
                            }
                            break
                        }

                        case "Chat_Close": {
                            this.props.history.go(-1)
                            break
                        }
                    }
                }
            }.bind(this))
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
        }

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

        return final_str

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


        return (

            <div className={this.props.homePage ? "col-md-7 mb-4" : "col-md-5 mb-4 chat-hide-mobile"}>
                <div className={this.props.homePage ? "chatbox-right" : "chatbox-right mt-4"}>
                    {/* chat header */}
                    <div className="chat-head">
                        <div className="hd-chat" onClick={() => {
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
                        <div className="cht-head-rqst-btn d-flex">
                            <button onClick={() => { this.dispatchCustomEvent.call(this, 'call') }} src={ASSETS_BASE_URL + "/img/customer-icons/call-white.svg"} className="chat-call-btn"><i className="fa fa-phone" aria-hidden="true" /> <span>Request Call</span></button>
                            <button onClick={this.toggleCancel.bind(this)} src={ASSETS_BASE_URL + "/img/customer-icons/close-white.svg"} className=" cht-stts">×</button>
                        </div>
                    </div>
                    {/* chat header */}
                    {/* chat Body */}
                    <div className="chat-body">
                        <iframe className={this.props.homePage ? "chat-iframe" : "chat-iframe-inner"} src={iframe_url} ref="chat_frame"></iframe>
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
                            <img src="/assets/images/warning-icon.png" />
                            <span>Not for emergencies! In the case of emergency please visit a hospital. </span>
                        </div>
                    </div>

                    {
                        this.state.showCancel ? <CancelPopup toggle={this.toggleCancel.bind(this)} closeChat={this.closeChat.bind(this)} /> : ""
                    }
                </div>
            </div>
        );
    }
}


export default ChatPanel
