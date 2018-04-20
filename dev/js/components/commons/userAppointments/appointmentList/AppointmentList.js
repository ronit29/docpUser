import React from 'react';
import RightArrowIcon from 'material-ui-icons/KeyboardArrowRight';

class AppointmentList extends React.Component {
    constructor(props) {
        super(props)
    }

    getTime(unix_timestamp) {
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        return hours + ':' + minutes.substr(-2)
    }

    render() {

        let { doctorName, slot } = this.props.data
        slot = slot || {
            start: 0,
            end: 0
        }
        let date = new Date(slot.start).toDateString()

        return (
            <div className="appointment">
                <div className="name">

                </div>
                <div className="details">
                    <p>
                        {doctorName}
                    </p>
                    <p>
                        {date}
                    </p>
                    <p>
                        {this.getTime(slot.start) + " to " + this.getTime(slot.end)}
                    </p>
                </div>
                <div className="book">
                    <span className="text">View Confirmation</span>
                    <RightArrowIcon className="bookIcon" />
                </div>
            </div>
        );
    }
}


export default AppointmentList
