import React from 'react';
import SnackBar from 'node-snackbar'

class UpComingAppointmentView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            index:0,
            startX:0,
            startY:0,
            distX:0,
            distY:0,
        }
    }

    showAppointment(appointment_type,appointment_id,e){
        if(appointment_type == 'doctor'){
            this.props.history.push(`/opd/appointment/${appointment_id}`)
        }else{
            this.props.history.push(`/lab/appointment/${appointment_id}`)
        }
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

    getDate(unix_date){
        let date = new Date(unix_date)
        let newDate= date.toDateString()
        return newDate
    }

    onTouchStart(event){
        let touchobj = event.changedTouches[0];
        this.state.startX=touchobj.pageX;
        this.state.startY=touchobj.pageY;
        let startTime = new Date().getTime()
    }

    onTouchMove(event){
        let touchobj = event.changedTouches[0];
        this.state.distX = touchobj.pageX - this.state.startX;
        this.state.distY = touchobj.pageY - this.state.startY; 
        if (this.state.startX - touchobj.pageX > 5 || touchobj.pageX - this.state.startX > 5) {
            if (event.preventDefault)
                event.preventDefault();
                event.returnValue = false;
        }
    }

    onTouchEnd(event){
        let startTime = new Date().getTime()
        let touchobj = event.changedTouches[0]
        let totalAppointments = ''
        let curr_index
        this.state.distX = touchobj.pageX - this.state.startX
        this.state.distY = touchobj.pageY - this.state.startY
        let elapsedTime = new Date().getTime() - startTime
        if(elapsedTime<=400){
            if(Math.abs(this.state.distX) >= 50 && Math.abs(this.state.distY) <= 100){
                if(this.state.distX<0){
                    if (this.props.upcoming_appointments) {
                        totalAppointments = this.props.upcoming_appointments.length;
                        curr_index = this.state.index
                        curr_index = curr_index + 1
                        if (curr_index >= totalAppointments) {
                            curr_index = 0
                        }
                        this.setState({ index: curr_index })
                    }
                }else{
                    if (this.props.offerList) {
                        totalAppointments = this.props.upcoming_appointments.length;
                        curr_index = this.state.index
                        curr_index = curr_index - 1
                        if(curr_index < 0){
                            curr_index = totalAppointments -1
                        }
                        this.setState({ index: curr_index })
                    }
                }
            }
        }
    }

    render() {

        if(this.props.upcoming_appointments && this.props.upcoming_appointments.length > 0){
            let appointment = {}
                if (this.props.upcoming_appointments) {
                    appointment = this.props.upcoming_appointments[this.state.index];
                }
            return (
                <div>
                    <div className="card cstm-card aptmnt-card mb-3">
                        <div className="child1" onTouchStart={this.onTouchStart.bind(this)} onTouchMove={this.onTouchMove.bind(this)} onTouchEnd={this.onTouchEnd.bind(this)} onClick={this.showAppointment.bind(this,appointment.type,appointment.id)}>
                            <div className="float-l leftBlock">
                                <div className="float-l">
                                    <img src={ASSETS_BASE_URL + "/images/ic-time-date.png"} alt="" />
                                </div>

                                <div className="float-l">
                                    <div>Appointment for {appointment.patient_name}</div>
                                        <div className="date-time">On {this.getDate(appointment.time_slot_start)}, {this.getTime(appointment.time_slot_start)} </div>
                                    <div> {`with ${appointment.type=="doctor"?'Dr.':''} ${appointment.name}`}</div>
                                </div>
                            </div>
                            <div className="rightBlock">
                                <a href="javascript:void(0);" className="anchr-img" onClick={this.showAppointment.bind(this,appointment.type,appointment.id)}><img src={ASSETS_BASE_URL + "/images/right-arrow.svg"} alt="" /></a>
                            </div>
                        </div>
                        {
                        this.props.upcoming_appointments && this.props.upcoming_appointments.length >1?
                            <div className="carousel-indicators crsl-indicators cr-indicator">
                                {
                                    this.props.upcoming_appointments && this.props.upcoming_appointments.map((appointmentDots, i) => {
                                        return <span key={i} onClick={() => this.setState({ index: i })} className={this.state.index == i ? "active" : ''} ></span>
                                    })
                                }
                            </div>
                        :''
                        }
                    </div>                    
                </div>
            )
        }else{
            return(<div></div>)
        }
    }
}


export default UpComingAppointmentView
