import React from 'react';

export default ({ id, type, patient_name, doctor_name, time_slot_start, lab_name, openAppointment }) => {
    let app_time = new Date(time_slot_start).toLocaleDateString()
    let name = `Dr. ${doctor_name}`
    if (lab_name) {
        name = `Lab ${lab_name}`
    }
    return <a href="javascript:;">
        <div className="right-div-widget" style={{ marginBottom: 10 }} onClick={() => {
            let app_type = type == 'doctor' ? 'opd' : 'lab'
            openAppointment(app_type, id)
        }}>
            <div className="appointment-head-div">
                <img src={ASSETS_BASE_URL + "/img/customer-icons/appointment.svg"} className="appointment-img" />
                <span className="appointment-head">Upcoming Appointment</span>
            </div>
            <div className="appointment-details-div">
                <p>Appointment for {patient_name}</p>
                <p className="appointment-date">On {app_time.toString()}</p>
                <p className="appointment-doc">With {name}</p>
            </div>
        </div>
    </a>
}