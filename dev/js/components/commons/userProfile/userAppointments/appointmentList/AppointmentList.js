import React from 'react';

class AppointmentList extends React.Component {
    constructor(props) {
        super(props)
    }

    getTime(unix_timestamp) {
        var date = new Date(unix_timestamp);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        return hours + ':' + minutes.substr(-2)
    }

    render() {

        let { doctor_name, time_slot_end, time_slot_start } = this.props.data

        let date = new Date(time_slot_start)

        return (
            <li>
                <a>
                    <span className="icon icon-md consultant-dp">
                        <img src="/assets/img/customer-icons/user.png" className="img-fluid" />
                    </span>
                    <div className="consultant-details">
                        <h4 className="title app-title">{doctor_name}</h4>
                        <ul className="list">
                            <li><span className="ct-img ct-img-xs"><img src="/assets/img/customer-icons/calander.svg" className="img-fluid" /></span>{date.toDateString()} </li>
                            <li><span className="ct-img ct-img-xs"><img src="/assets/img/customer-icons/clock.svg" className="img-fluid" /></span>{this.getTime(time_slot_start)} to {this.getTime(time_slot_end)}</li>
                        </ul>
                        <div className="view-chat text-right">
                            <button className="v-btn v-btn-primary">View</button>
                        </div>
                    </div>
                </a>
            </li>
        );
    }
}


export default AppointmentList
