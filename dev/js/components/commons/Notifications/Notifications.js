import React from 'react';

class NotificationsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    openAppointment(data){
        this.props.history.push(data.content.url)
    }

    render() {

        return (
            <div>
                <header className="skin-primary fixed horizontal top">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-2">
                                <div className="back-icon" onClick={() => {
                                    this.props.history.go(-1)
                                }}>
                                    <a>
                                        <img src="/assets/img/icons/back.png" className="img-fluid" />
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
                </header>

                <section className="wrap notification-page skin-white">
                    <div className="notificatons">
                        <ul className="list notificaton-list">
                            {
                                this.props.notifications.map((note, i) => {
                                    return <li key={i} onClick={this.openAppointment.bind(this,note)}>
                                        <a>
                                            <img src="/assets/img/icons/bell-md.png" className="img-fluid noti-icon" />
                                            <div className="noti-content">
                                                <h4 className="noti-title">{note.content.title}<span className="updated-on">{note.viewed_at ? "" : "New"}</span></h4>
                                                <p>{note.content.body}</p>
                                            </div>
                                        </a>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </section>

            </div>
        );
    }
}


export default NotificationsView
