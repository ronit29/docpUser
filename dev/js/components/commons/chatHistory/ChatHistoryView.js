import React from 'react';
import STORAGE from '../../../helpers/storage'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import InitialsPicture from '../../commons/initialsPicture'

class ChatView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    openChat(roomId = "") {
        this.props.history.push('/chat', {
            roomId: roomId
        })
    }

    render() {

        let { chatHistory } = this.props
        chatHistory = chatHistory || []

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container parent-section book-appointment-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-0 center-column">

                            <header className="wallet-header sticky-header">
                                <div className="container-fluid header-container">
                                    <div className="row header-row">
                                        <div className="col-2">
                                            <img src={ASSETS_BASE_URL + "/img/icons/back-orange.svg"} className="back-icon-orange" onClick={() => {
                                                this.props.history.go(-1)
                                            }} />
                                        </div>
                                        <div className="col-8 logo-col">
                                            <p className="wallet-title fw-500">Chat History</p>
                                        </div>
                                    </div>
                                </div>
                            </header>

                            <div className="widget">
                                <ul className="list chat-history-list">
                                    {
                                        chatHistory.map((chat, i) => {
                                            let date_f = new Date(chat.date || 0).toDateString()
                                            return <li key={i} onClick={this.openChat.bind(this, chat.room_id)}>
                                                <p className="chat-history-list-label fw-500">Patient Name : <span>{chat.user_name}</span></p>
                                                <p className="chat-history-symptom fw-500">Symptom : {chat.symptoms}</p>
                                                <div className="chat-history-date clearfix mrb-5">
                                                    <img src={ASSETS_BASE_URL + "/img/icons/calendar.svg"} />
                                                    <p className="fw-500">Date : {date_f}</p>
                                                </div>
                                                <div className="chat-history-date clearfix mrb-5">
                                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/stethoscope.svg"} />
                                                    <p className="fw-500">Doctor Name : Dr. {chat.doctor_name}</p>
                                                </div>
                                                <span className="arrow-custom-right"><img src={ASSETS_BASE_URL + "/img/customer-icons/arrow-forward-right.svg"} /></span>
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>

                        </div>
                        <RightBar />
                    </div>
                </section >
            </div >
        );
    }
}


export default ChatView
