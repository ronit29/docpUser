import React from 'react';
import InitialsPicture from '../../../initialsPicture'

const STATUS_MAP = {
    CREATED: 1,
    BOOKED: 2,
    RESCHEDULED_DOCTOR: 3,
    RESCHEDULED_PATIENT: 4,
    ACCEPTED: 5,
    CANCELED: 6,
    COMPLETED: 7,
}

class AppointmentList extends React.Component {
    constructor(props) {
        super(props)
    }

    getTime(unix_timestamp) {
        let date = new Date(unix_timestamp)
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    openAppointment(type, id) {
        if (type == 'doctor') type = 'opd';
        this.props.history.push(`/${type}/appointment/${id}`)
    }

    viewReports(type, id, e) {
        e.stopPropagation()
        e.preventDefault()

        if (type == 'doctor') type = 'opd';
        this.props.history.push(`/user/${type}/reports/${id}`)
    }

    getStatus(status) {
        status = parseInt(status)
        switch (status) {
            case 1: {
                return <span className="appointment-status" style={{ color: `var(--text--primary--color)` }}>Created</span>
            }
            case 2: {
                return <span className="appointment-status" style={{ color: `var(--text--primary--color)` }}>Booked</span>
            }
            case 3: {
                return <span className="appointment-status" style={{ color: `var(--text--primary--color)` }}>Rescheduled</span>
            }
            case 4: {
                return <span className="appointment-status" style={{ color: `var(--text--primary--color)` }}>Rescheduled</span>
            }
            case 5: {
                return <span className="appointment-status" style={{ color: `var(--text--primary--color)` }}>Accepted</span>
            }
            case 6: {
                return <span className="appointment-status" style={{ color: 'red' }}>Cancelled</span>
            }
            case 7: {
                return <span className="appointment-status" style={{ color: 'green' }}>Completed</span>
            }
            default: {
                return <span className="appointment-status" style={{ color: `var(--text--primary--color)` }}>Upcoming</span>
            }
        }
    }

    invoiceClick(invoiceLink) {
        var win = window.open(invoiceLink, '_blank');
        win.focus();
    }

    reportClick(reports) {
        if (reports.length == 1) {
            if (window) {
                window.open(reports[0], '_blank')
            }
        } else {
            this.props.viewReportClick(reports);
        }
    }

    render() {

        let { deal_price, doctor_name, display_name, time_slot_end, time_slot_start, status, type, id, lab_name, lab_test_name, doctor_thumbnail, lab_thumbnail, patient_name, invoices, hospital_name, specialization, vip, payment_mode, discount } = this.props.data

        let date = new Date(time_slot_start)
        let is_vip_applicable = vip.is_vip_member && vip.covered_under_vip
        return (
            <li style={{ position: 'relative', paddingTop: 32, cursor: 'unset' }}>
                <span className="icon consultant-dp">
                    <InitialsPicture name={(doctor_name || lab_name)} has_image={!!(doctor_thumbnail || lab_thumbnail)} className={lab_name ? 'initialsPicture-ls': 'initialsPicture-appointment'} style={{ position: 'relative' }}>
                        <img src={doctor_thumbnail} className={doctor_thumbnail ? 'img-fluid img-round my-appont-img': 'd-none'} />
                        <img src={lab_thumbnail} className={lab_thumbnail ? 'fltr-usr-image-lab': 'd-none'}/>
                        {type == 'doctor' ? <img src={ASSETS_BASE_URL + "/img/customer-icons/stethoscope.svg"} className="appointment-icon" /> : <img src={ASSETS_BASE_URL + "/img/customer-icons/beaker.svg"} className="appointment-icon" />}
                    </InitialsPicture>
                </span>
                <div className="consultant-details" style={{ cursor: 'pointer' }} onClick={this.openAppointment.bind(this, type, id)}>
                    <h4 className="title app-title vip-ico-hdng">{display_name || lab_name}
                    {
                        is_vip_applicable?
                        <img className="vip-main-ico img-fluid" src={ASSETS_BASE_URL + '/img/viplog.png'} />
                        :''
                    }
                    </h4>
                    <ul className="list">
                        {
                            specialization && specialization.length ?
                                <li className="appointment-specialization">
                                    {
                                        specialization.map((speciality, index) => {
                                            if (index < 3) {
                                                return <span className="apnt-hsp-name" key={index}>{speciality} {(index < specialization.length - 1) && (index != 2) ? '| ' : ''}</span>
                                            }
                                        })
                                    }
                                </li> : ''
                        }
                        {
                            hospital_name ?
                                <li style={{ marginBottom: 4 }} className="apnt-hsp-name">{hospital_name}</li>
                                : ''
                        }
                        {
                            lab_test_name && lab_test_name.length ?
                                <li style={{ marginBottom: 4 }} className="apnt-hsp-name">{lab_test_name[0].test_name} {lab_test_name.length > 1 ? `& ${lab_test_name.length - 1} more` : ''}</li>
                                : ''
                        }
                        <li style={{ marginBottom: 5 }} ><span className="ct-img ct-img-xs text-right"><img style={{ width: '15px' }} src={ASSETS_BASE_URL + "/img/new-cal.svg"} className="img-fluid" /></span>{date.toDateString()} | <span className="ct-img ct-img-xs text-right"><img style={{ width: '15px' }} src={ASSETS_BASE_URL + "/img/watch-date.svg"} className="img-fluid" /></span>{this.getTime(time_slot_start)}</li>
                        {/* <li style={{ marginBottom: 5 }} ></li> */}
                        <li style={{ marginBottom: 5 }} ><span className="ct-img ct-img-xs text-right"><img src={ASSETS_BASE_URL + "/img/nw-usr.svg"} className="img-fluid" style={{ width: 15, marginTop: -4 }} /></span>{patient_name}</li>
                    </ul>
                    {/* <div className="view-chat text-right">
                            {
                                (status == 7 && type == 'doctor') ? <button onClick={this.viewReports.bind(this, type, id)} className="v-btn v-btn-primary">View Prescription</button> : ""
                            }

                            {
                                (status == 7 && type == 'lab') ? <button onClick={this.viewReports.bind(this, type, id)} className="v-btn v-btn-primary">View Report</button> : ""
                            }
                        </div> */}
                </div>
                <span className="arrow-custom-right" style={{ cursor: 'pointer' }} onClick={this.openAppointment.bind(this, type, id)}><img src={ASSETS_BASE_URL + "/img/customer-icons/arrow-forward-right.svg"} /></span>
                {this.getStatus(status)}
                {
                    id ?
                        <span className="fw-500" style={{ position: 'absolute', top: 4, left: 8, fontSize: 12 }}>{`Booking id : ${id}`}</span> : ''
                }
                {
                    deal_price && !is_vip_applicable?
                        <span className="fw-500" style={{ position: 'absolute', top: 20, right: 8, fontSize: 12, color: '#f78631' }}>&#8377; {parseInt(deal_price)- (discount?parseInt(discount):0)}</span> : ''
                }
                {
                    invoices && invoices.length === 1 && (!this.props.data.reports || !this.props.data.reports.length) ?
                        <div className="mrt-20" style={{ padding: '0 30px' }} onClick={() => this.invoiceClick(invoices[0])}>
                            <div className="invoice-div">
                                <img src={ASSETS_BASE_URL + '/img/customer-icons/invoice.svg'} />
                                <div>
                                    <p className="text-primary fw-500">Download Payment Receipt</p>
                                </div>
                            </div>
                        </div> : ''
                }
                {
                    invoices && invoices.length && this.props.data.reports && this.props.data.reports.length ?
                        <div className="mrt-20 multiple-invoice-div">
                            <div className="multiple-invoice">
                                <div className="invoice-div" onClick={() => this.invoiceClick(invoices[0])}>
                                    <img src={ASSETS_BASE_URL + '/img/customer-icons/invoice.svg'} />
                                    <div>
                                        <p className="text-primary fw-500">Download</p>
                                        <p className="text-primary fw-500">Payment Receipt</p>
                                    </div>
                                </div>
                                <div className="invoice-div" onClick={() => this.reportClick(this.props.data.reports)}>
                                    <img src={ASSETS_BASE_URL + '/img/customer-icons/report.svg'} />
                                    <div>
                                        <p className="text-primary fw-500">View</p>
                                        <p className="text-primary fw-500">Report</p>
                                    </div>
                                </div>
                            </div>
                        </div> : ''
                }
                {/*
                    payment_mode && 
                    <div className="d-flex align-item-center jc-spaceb shopping-card-details-list fw-500">
                        <span>Payment mode</span>
                        <span>{payment_mode}</span>
                    </div>*/
                }
            </li>
        );
    }
}

export default AppointmentList