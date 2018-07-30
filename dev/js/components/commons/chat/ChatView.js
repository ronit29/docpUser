import React from 'react';
import STORAGE from '../../../helpers/storage'

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
                            this.props.getChatDoctorById(data.data.employeeId, data.data.rid, (data) => {
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
                            this.props.history.push(`/dx/searchresults?search=${searchData}&filter=${filterData}`)
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
        this.props.history.push(`/opd/doctor/${doctor_id}`)
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

        let iframe_url = `https://chatqa.docprime.com/livechat?product=DocPrime&cb=1&token=${this.state.token}&symptoms=${symptoms_uri}&roomId=${this.state.roomId}`



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
                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/back-white.png"} className="back-icon-orange" onClick={() => {
                                                this.props.history.go(-1)
                                            }} />
                                        </div>

                                        <div className="col-6 col-sm-7 chat-header-profile" onClick={() => {
                                            if (doctorData) {
                                                this.openDoctorProfile(doctorData.id)
                                            }
                                        }} style={{ cursor: 'pointer' }}>
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
                                                        <p className="chat-profile-name fw-500">{doctorData.name}</p>
                                                        <p className="chat-profile-desc">Health Assistant</p>
                                                    </div> : ""
                                            }

                                        </div>

                                        <div className="col-2 chat-icons chat-call-icon" onClick={() => {
                                            this.dispatchCustomEvent.call(this, 'call')
                                        }}>
                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/call-white.svg"} />
                                        </div>

                                        <div className="col-2 chat-icons" onClick={this.toggleCancel.bind(this)}>
                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/close-white.svg"} />
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
