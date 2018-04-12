import React from 'react';

import { getTime, getDayName } from '../../../utils/dateTimeUtils.js'

class TimeSlotSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDay: 0,
            selectedInterval: 0,
            selectedTimeSlot: 0

        }
    }
    componentWillMount() {
        let timeSlots = this.props.timeSlots;

        this.setDefaultSelected(timeSlots);

    }
    setDefaultSelected(timeSlots) {
        let days = timeSlots.dates;
        let defaultDayIndex = this.getFirstAvailableDay(days);
        if (defaultDayIndex || defaultDayIndex === 0) {
            this.setState({ selectedDay: defaultDayIndex });
            var defautInterwalIndex = this.getFirstAvailableInterwal(days[defaultDayIndex].intervals);
        }
        if (defautInterwalIndex || defautInterwalIndex === 0) {
            this.setState({ selectedInterval: defautInterwalIndex });
            var defaultTimeSlotIndex = this.getFirstAvailableTimeSlot(days[defaultDayIndex].intervals[defautInterwalIndex].timeSlots);

        }
        if (defaultTimeSlotIndex || defaultTimeSlotIndex === 0) {
            this.setState({ selectedTimeSlot: defaultTimeSlotIndex });
        }

    }

    getFirstAvailableInterwal(intervals) {

        for (let interwalIndex in intervals) {
            let interwal = intervals[interwalIndex];
            if (interwal && interwal.isAvailable) {
                return parseInt(interwalIndex);
            }
        }
        return 0;
    }

    getFirstAvailableTimeSlot(timeSlots) {

        for (let timeSlotIndex in timeSlots) {
            let timeSlot = timeSlots[timeSlotIndex];
            if (timeSlot && timeSlot.isAvailable) {
                return parseInt(timeSlotIndex);
            }
        }
        return 0;
    }

    getFirstAvailableDay(days) {

        for (let dayIndex in days) {
            let day = days[dayIndex];
            if (day && day.isAvailable) {
                return parseInt(dayIndex);
            }
        }
        return 0;
    }
    onDateClick(date, selectedIndex, index) {

        if (selectedIndex !== index&&date.isAvailable) {
            var availableInterwal = this.getFirstAvailableInterwal(date.intervals)
            if (availableInterwal || availableInterwal === 0) {
                let timeSlots = date.intervals[availableInterwal].timeSlots;
                var availableTimeSlot = this.getFirstAvailableTimeSlot(timeSlots);
            }

            this.setState({ selectedDay: index, selectedInterval: availableInterwal, selectedTimeSlot: availableTimeSlot });
        }
    }
    onIntervalClick(interwal, selectedIndex, index) {



        if (selectedIndex !== index&&interwal.isAvailable) {
            let timeSlots = interwal.timeSlots;
            var availableTimeSlot = this.getFirstAvailableTimeSlot(timeSlots);


            this.setState({ selectedInterval: index, selectedTimeSlot: availableTimeSlot });
        }

    }
    onTimeSlotClick(timeSlot, selectedIndex, index) {

        if (selectedIndex !== index&&timeSlot.isAvailable) {
            this.setState({ selectedTimeSlot: index });
        }
    }
 
    render() {

        let { dates } = this.props.timeSlots

        let intervals = []
        let timeSlots = []
        let dateList = []


        dateList= dates.map((date, i) => {
            let dayDate = new Date(date.date).getDate()
            let dayName = getDayName(date.date);
            let selected = this.state.selectedDay == i
            return <div key={i} onClick={this.onDateClick.bind(this, date, this.state.selectedDay, i)} className={date.isAvailable?(selected ? "dateTile selected" : "dateTile"):"dateTile disabled" }>
                <p className="date">{dayDate}</p>
                <p className="day">{dayName}</p>
            </div>
        })
        intervals = dates[this.state.selectedDay].intervals.map((interval, i) => {
            debugger
            let selected = this.state.selectedInterval == i
            return <button key={i} onClick={this.onIntervalClick.bind(this, interval, this.state.selectedInterval, i)} className={interval.isAvailable?(selected ? "tsBtn selected" : "tsBtn") : "tsBtn disabled" }>{interval.name}</button>
        })

        timeSlots = dates[this.state.selectedDay].intervals[this.state.selectedInterval].timeSlots.map((slot, i) => {
            let selected = this.state.selectedTimeSlot == i
            return <span key={i} onClick={this.onTimeSlotClick.bind(this, slot, this.state.selectedTimeSlot, i)} className={slot.isAvailable?(selected ? "slot selected" : "slot"):"slot disabled"}>{getTime(slot.start)}</span>
        })


        return (
            <div className="timeSlotSelector">
                <h5>Select preffered time slot</h5>

                <div className="dateCar">
                    <div className="scroller">
                        {dateList}
                    </div>
                </div>

                <div className="timeSlots">
                    {intervals}
                    <div className="slots">
                        {timeSlots}
                    </div>
                </div>
            </div>
        );
    }
}


export default TimeSlotSelector
