import React from 'react';

import AppointmentList from './appointmentList/index.js'
import Loader from '../../Loader'

class UserAppointmentsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showReports: false,
            appointmentReports: [],
            show_sorted_results: ''
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

    toggleSortOrder() {

        this.setState({ show_sorted_results: !this.state.show_sorted_results })
    }

    selectOptions(type, value) {
        this.setState({ [type]: parseInt(value) ? parseInt(value) : value })
    }


    render() {

        let { appointments, selectedProfile } = this.props.USER
        let appointment_list = appointments[selectedProfile] || []
        if (this.state.show_sorted_results) {
            appointment_list = appointments[selectedProfile] && appointments[selectedProfile].length ? appointments[selectedProfile].filter(x => x.status == this.state.show_sorted_results) : []
        }

        return (
            <div className="widget-content pl-0 pr-0">
                {/* <div className="apt-sorting">
                    <label>View by:</label>
                    <select onChange={ (e)=> this.selectOptions('show_sorted_results', e.target.value)}>
                        <option value="" selected>All Appointments</option>
                        <option value="1">Created</option>
                        <option value="2">Booked</option>
                        <option value="3">Rescheduled</option>
                        <option value="5">Accepted</option>
                        <option value="6">Cancelled</option>
                        <option value="7">Completed</option>
                    </select>
                </div> */}
                <div className="booking-filter-container">
                    <div className="bkn-chips-container">
                        <p className="bkselect">All Appointments</p>
                        <p value="1">Created</p>
                        <p value="2">Booked</p>
                        <p value="3">Rescheduled</p>
                        <p value="5">Accepted</p>
                        <p value="6">Cancelled</p>
                        <p value="7">Completed</p>
                    </div>
                </div>
                {/* <div className="tg-list-item">
                    <p>Sort by Appointment Status</p>
                    <input className="tgl tgl-ios" id="lab_insurance" type="checkbox" checked={this.state.show_sorted_results} onChange={this.toggleSortOrder.bind(this)} />
                    <label className="tgl-btn" htmlFor="lab_insurance"></label>
                </div> */}
                {
                    appointment_list ? <ul className="list online-consultant-list dp-user-list" style={{ marginTop: 15, marginBottom: 70 }}>
                        {
                            (appointment_list && appointment_list.length) ?
                                appointment_list.map((app, i) => {
                                    return ((app.type == 'lab' && app.lab) || app.type == 'doctor') ?
                                        <AppointmentList key={i} {...this.props} data={app} viewReportClick={this.viewReportClick.bind(this)} />
                                        : ''
                                }) :
                                <div className="text-center pd-20">
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
                                                return <div key={index} className="d-flex align-items-center cursor-pntr mb-10" onClick={() => this.reportClick(report)}>
                                                    <div style={{ width: 32, marginRight: 16 }}>
                                                        <img src={ASSETS_BASE_URL + '/img/customer-icons/pdf-icon.png'} style={{ width: '100%' }} />
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <p className="fw-500" style={{ fontSize: 16 }}>{`Report ${index + 1}`}</p>
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
