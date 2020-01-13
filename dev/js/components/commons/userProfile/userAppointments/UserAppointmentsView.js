import React from 'react';

import AppointmentList from './appointmentList/index.js'
import Loader from '../../Loader'
import GTM from '../../../../helpers/gtm'

class UserAppointmentsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showReports: false,
            appointmentReports: [],
            show_sorted_results: ['all']
        }
    }

    componentDidMount() {
        this.props.getProfileAppointments(this.props.USER.selectedProfile) // get user appointments
    }

    componentWillReceiveProps(props) {
        if (this.props.USER.selectedProfile != props.USER.selectedProfile) {
            this.props.getProfileAppointments(props.USER.selectedProfile) // get user appointments
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

    selectOptions(value, type) {
        let appointments = []
        if(value == 'all') {
            appointments.push('all')
        }else if(value == 'upcoming') {
            appointments = [2,3,4,5]
        }else {
            appointments.push(value)
        }
        let gtmData = {
            'Category': 'ConsumerApp', 'Action': 'AppointmentChipsSelected', 'CustomerID': GTM.getUserId() || '', 'event': 'appointment-chips-selected', 'type': type
        }
        GTM.sendEvent({ data: gtmData })
        this.setState({ show_sorted_results: appointments })

        /*let found = false
        let appointments = []

        if(this.state.show_sorted_results.length==1 && this.state.show_sorted_results.indexOf(value)>-1) {
            
        }else {
            let isAllExist = this.state.show_sorted_results.indexOf('all')
            if(isAllExist==-1 && value=='all'){
                appointments = ['all']
            }else {
                appointments = this.state.show_sorted_results.filter((x)=>{
                    if(isAllExist >-1 && value!='all'){
                        return false
                    }
                    if(x==value){
                        found = true
                        return false
                    }
                    if(value=='all'){
                        return false
                    }
                    return x
                })
                if(!found){
                    appointments.push(value)
                }    
            }
            
            this.setState({ show_sorted_results: appointments })
        }*/
    }


    render() {

        let { appointments, selectedProfile } = this.props.USER
        let appointment_list = appointments[selectedProfile] || []

        if (this.state.show_sorted_results.indexOf('all')==-1) {
            
            if(appointments[selectedProfile] && appointments[selectedProfile].length){
                appointment_list = appointments[selectedProfile].filter((x)=>{
                    
                    if(this.state.show_sorted_results.indexOf(x.status)>-1){
                        return true
                    }
                    return false
                })
            }

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
                        <p className={`${this.state.show_sorted_results.indexOf('all')>-1?'bkselect':''}`} onClick={()=>this.selectOptions('all', 'all')}>All</p>
                        <p className={`${this.state.show_sorted_results.indexOf(2)>-1 || this.state.show_sorted_results.indexOf(3)>-1 || this.state.show_sorted_results.indexOf(4)>-1 || this.state.show_sorted_results.indexOf(5)>-1?'bkselect':''}`} onClick={()=>this.selectOptions('upcoming', 'upcoming')}>Upcoming</p>
                        <p className={`${this.state.show_sorted_results.indexOf(7)>-1?'bkselect':''}`} onClick={()=>this.selectOptions(7, 'Completed')}>Completed</p>
                        <p className={`${this.state.show_sorted_results.indexOf(6)>-1?'bkselect':''}`} onClick={()=>this.selectOptions(6, 'Cancelled')}>Cancelled</p>
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
