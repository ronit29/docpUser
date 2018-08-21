import React from 'react';
import STORAGE from '../../../helpers/storage'
import CONFIG from '../../../config'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import InitialsPicture from '../../commons/initialsPicture'
import CancelPopup from './cancelPopup'

class ChatView extends React.Component {
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
        this.props.history.go(-1)
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
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container parent-section book-appointment-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-7 col-lg-7 center-column">

                            <header className="wallet-header sticky-header chat-header">
                                <div className="container-fluid header-container">
                                    <div className="row header-row">
                                        <div className="col-2 col-sm-1" style={{ maxWidth: 55 }} >
                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/left-arrow.svg"} className="back-icon-orange" onClick={() => {
                                                this.props.history.go(-1)
                                            }} />
                                        </div>

                                        <div className="col-7 col-sm-8 chat-header-profile" onClick={() => {
                                            if (doctorData) {
                                                this.openDoctorProfile(doctorData.id)
                                            }
                                        }}>
                                            {
                                                doctorData ?
                                                    <div className="chat-profile-icon">
                                                        <InitialsPicture name={doctorData.name} has_image={!!doctorData.thumbnail} className="chat-profile-icon initialsPicture-cs">
                                                            <img src={doctorData.thumbnail} className="chat-profile-icon initialsPicture-cs" />
                                                        </InitialsPicture>
                                                    </div> : ""
                                            }
                                            {
                                                doctorData ?
                                                    <div className="chat-profile-desc-div">
                                                        <p className="chat-profile-name fw-500">Dr. {doctorData.name}</p>
                                                        <p className="chat-profile-desc">{this.getDoctorSpecialization(doctorData)}</p>
                                                    </div> : ""
                                            }
                                            <p style={{ color: 'white' }}>{this.state.selectedRoom}</p>
                                        </div>

                                        <div className="col-3 col-sm-3 chat-icons">
                                            <img onClick={() => { this.dispatchCustomEvent.call(this, 'call') }} src={ASSETS_BASE_URL + "/img/customer-icons/call-white.svg"} />
                                            <img onClick={this.toggleCancel.bind(this)} src={ASSETS_BASE_URL + "/img/customer-icons/close-white.svg"} />
                                        </div>
                                    </div>
                                </div>
                            </header>
                            <div className="container-fluid chat-container">
                                <iframe className="chat-iframe" src={iframe_url} ref="chat_frame"></iframe>
                            </div>
                            {
                                this.state.showCancel ? <CancelPopup toggle={this.toggleCancel.bind(this)} closeChat={this.closeChat.bind(this)} /> : ""
                            }
                        </div>
                        <RightBar />
                    </div>
                </section >
            </div >
        );
    }
}


export default ChatView
