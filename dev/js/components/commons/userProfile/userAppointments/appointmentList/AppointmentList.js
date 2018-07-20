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
            case 2: {
                return <span className="appointment-status" style={{ color: '#f78631' }}>Upcoming</span>
            }
            case 5: {
                return <span className="appointment-status" style={{ color: '#f78631' }}>Upcoming</span>
            }
            case 7: {
                return <span className="appointment-status" style={{ color: 'green' }}>Complete</span>
            }
            case 6: {
                return <span className="appointment-status" style={{ color: 'red' }}>Cancelled</span>
            }
            default: {
                return <span className="appointment-status" style={{ color: '#f78631' }}>Upcoming</span>
            }
        }
    }

    render() {

        let { doctor_name, time_slot_end, time_slot_start, status, type, id, lab_name, doctor_thumbnail, lab_thumbnail, patient_name } = this.props.data

        let date = new Date(time_slot_start)

        return (
            <li onClick={this.openAppointment.bind(this, type, id)} style={{ position: 'relative', paddingTop: 25 }}>
                <a>
                    <span className="icon consultant-dp">
                        <InitialsPicture name={(doctor_name || lab_name)} has_image={!!(doctor_thumbnail || lab_thumbnail)} className="initialsPicture-appointment">
                            <img src={doctor_thumbnail || lab_thumbnail} className="img-fluid img-round" />
                        </InitialsPicture>
                        {type == 'doctor' ? <img src="/assets/img/customer-icons/stethoscope.svg" className="appointment-icon" /> : <img src="/assets/img/customer-icons/beaker.svg" className="appointment-icon" />}
                    </span>
                    <div className="consultant-details">
                        <h4 className="title app-title" style={{marginBottom: 8}} >{doctor_name || lab_name}</h4>
                        <ul className="list">
                            <li style={{marginBottom: 8}} ><span className="ct-img ct-img-xs"><img src="/assets/img/icons/calendar.svg" className="img-fluid" /></span>{date.toDateString()} </li>
                            <li style={{marginBottom: 8}} ><span className="ct-img ct-img-xs"><img src="/assets/img/customer-icons/clock.svg" className="img-fluid" /></span>{this.getTime(time_slot_start)}</li>
                            <li style={{marginBottom: 8}} ><span className="ct-img ct-img-xs"><img src="/assets/img/icons/user.svg" className="img-fluid" style={{ width: 14, marginTop: -4 }} /></span>{patient_name}</li>
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
                    <span className="arrow-custom-right"><img src="/assets/img/customer-icons/arrow-forward-right.svg" /></span>
                    {this.getStatus(status)}
                </a>
            </li>
        );
    }
}


export default AppointmentList
