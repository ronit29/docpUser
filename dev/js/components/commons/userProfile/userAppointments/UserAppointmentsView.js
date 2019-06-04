import React from 'react';

import AppointmentList from './appointmentList/index.js'
import Loader from '../../Loader'

class UserAppointmentsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showReports: false,
            appointmentReports: []
        }
    }

    componentDidMount() {
        this.props.getProfileAppointments(this.props.USER.selectedProfile)
    }

    componentWillReceiveProps(props) {
        if (this.props.USER.selectedProfile != props.USER.selectedProfile) {
            this.props.getProfileAppointments(props.USER.selectedProfile)
        }
    }

    viewReportClick(reports) {
        this.setState({ showReports: true, appointmentReports: reports })
    }

    hideReports() {
        this.setState({ showReports: false })
    }

    reportClick(src) {
        if (window) {
            window.open(src, '_blank')
        }
    }

    render() {

        let { appointments, selectedProfile } = this.props.USER

        return (
            <div className="widget-content pl-0 pr-0">
                {
                    appointments[selectedProfile] ? <ul className="list online-consultant-list dp-user-list" style={{ marginTop: 15, marginBottom: 70 }}>
                        {
                            (appointments[selectedProfile] && appointments[selectedProfile].length) ?
                                appointments[selectedProfile].map((app, i) => {
                                    return ((app.type == 'lab' && app.lab) || app.type == 'doctor') ?
                                        <AppointmentList key={i} {...this.props} data={app} viewReportClick={this.viewReportClick.bind(this)} />
                                        : ''

                                }) : <div className="text-center pd-20">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/no-appointment.png"} />
                                    <p className="fw-500 text-lg mrt-20">No Appointments !!</p>
                                </div>
                        }
                    </ul> : <Loader />
                }
                {
                    this.state.showReports && this.state.appointmentReports && this.state.appointmentReports.length ?
                        <div className="search-el-popup-overlay cancel-overlay-zindex">
                            <div className="search-el-popup ipd-pop-width">
                                <div className="widget p-12">
                                    <div className="p-relative">
                                        <span className="ipd-pop-cls">
                                            <img src="/assets/img/icons/close.png" onClick={() => this.hideReports()} />
                                        </span>
                                        <p className="ipd-needHelp mb-20" style={{ fontSize: 16 }}>View Report</p>
                                        {
                                            this.state.appointmentReports.map((report, index) => {
                                                return <div key={index} className="d-flex align-items-center cursor-pntr" onClick={() => this.reportClick(report[index])}>
                                                    <div style={{ width: 32, marginRight: 16 }}>
                                                        <img src={ASSETS_BASE_URL + '/img/customer-icons/pdf-icon.png'} style={{ width: '100%' }} />
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <p className="fw-500" style={{ fontSize: 16 }}>{`Report ${index}`}</p>
                                                    </div>
                                                    <div style={{ width: 24, marginLeft: 16 }}>
                                                        <img src={ASSETS_BASE_URL + '/img/customer-icons/download-icon.svg'} style={{ width: '100%' }} />
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div> : ''
                }
            </div>
        );
    }
}


export default UserAppointmentsView
