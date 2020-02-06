import React from 'react';

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import Disclaimer from '../../commons/Home/staticDisclaimer.js'

class NotificationsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    openAppointment(data) {
        this.props.markNotificationsAsRead(data.id, () => {

        })
        this.props.history.push(data.content.url)
    }

    render() {

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            {/* <header className="skin-primary fixed horizontal top sticky-header">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-2">
                                            <div className="back-icon" onClick={() => {
                                                this.props.history.go(-1)
                                            }}>
                                                <a>
                                                    <img src={ASSETS_BASE_URL + "/img/icons/back.png"} className="img-fluid" />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <div className="header-title fw-700 capitalize text-center text-white">Notifications</div>
                                        </div>
                                        <div className="col-2">
                                        </div>
                                    </div>
                                </div>
                            </header> */}

                            <section className="notification-page skin-white new-profile-header-margin">
                                <div className="notificatons">
                                    {
                                        (this.props.notifications && this.props.notifications.length == 0) ? <div className="text-center pd-20">
                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/no-notification.png"} />
                                            <p className="fw-500 text-lg mrt-20">No Notifications !!</p>
                                        </div> : ""
                                    }
                                    <ul className="list notificaton-list dp-user-list">
                                        {
                                            this.props.notifications.map((note, i) => {
                                                return <li key={i} onClick={this.openAppointment.bind(this, note)}>
                                                    <a>
                                                        <img src={ASSETS_BASE_URL + "/img/icons/bell-md.png"} className="img-fluid noti-icon" />
                                                        <div className="noti-content">
                                                            <h4 className={note.read_at ? "noti-title" : "noti-title newappointmenth4"}>{note.content.title}<span className="updated-on">{note.viewed_at ? "" : "New"}</span></h4>
                                                            <p className={note.read_at ? "" : "newappointment"}>{note.content.body}</p>
                                                        </div>
                                                    </a>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </section>

                        </div>

                        <RightBar noChatButton={true} />
                    </div>
                </section>
                <Disclaimer />
            </div>
        );
    }
}


export default NotificationsView
