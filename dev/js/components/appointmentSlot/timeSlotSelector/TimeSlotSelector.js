import React from 'react';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class TimeSlotSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDay: 0,
            selectedInterval: 0
        }
    }

    getTime(unix_timestamp) {
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        return hours + ':' + minutes.substr(-2)
    }

    render() {

        let { dates } = this.props.timeSlots
        let intervals = []
        let timeSlots = []
        let dateList = []

        dateList = dates.map((date ,i) => {
            let dayDate = new Date(date.date).getDate()
            let dayName = days[new Date(date.date).getDay()]
            let selected = this.state.selectedDay == i

            return <div key={i} className={ selected ? "dateTile selected" : "dateTile" }>
                <p className="date">{dayDate}</p>
                <p className="day">{dayName}</p>
            </div>
        })

        intervals = dates[this.state.selectedDay].intervals.map((interval,i) => {
            let selected = this.state.selectedDay == i
            return <button key={i} className={ selected ? "tsBtn selected" : "tsBtn"}>Morning Slots</button>
        })

        timeSlots = dates[this.state.selectedDay].intervals[this.state.selectedInterval].timeSlots.map((slot,i) => {
            return <span key={i} className="slot">{this.getTime(slot.start)}</span>
        })


        return (
            <div className="timeSlotSelector">
                <h5>Select preffered time slot</h5>

                <div className="dateCar">
                    <div className="scroller">
                        { dateList }
                    </div>
                </div>

                <div className="timeSlots">
                    { intervals }
                    <div className="slots">
                        { timeSlots }
                    </div>
                </div>
            </div>
        );
    }
}


export default TimeSlotSelector
