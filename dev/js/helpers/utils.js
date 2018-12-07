import React from 'react';

export function buildOpenBanner(lab_timing, lab_timing_data = [], next_lab_timing, next_lab_timing_data = null) {
    let is_open_now = false
    let open_next_today = false

    let time_now = new Date().getHours() + 0.5
    for (let ltd of lab_timing_data) {
        if (time_now <= ltd.end && time_now >= ltd.start) {
            is_open_now = true
            return <p style={{ fontSize: 12 }} >{lab_timing}</p>
        }
        if (time_now < ltd.start) {
            open_next_today = ltd.start
            open_next_today = _decimalToTime(open_next_today)
            break
        }
    }

    if (open_next_today) {
        return <p style={{ fontSize: 12 }} >Opens next at {open_next_today}, today</p>
    }

    const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    let next_open = false
    let next_open_today = ""
    if (next_lab_timing_data) {
        let today = new Date()
        let weekDayNumber = today.getDay()
        weekDayNumber = weekDayNumber == 0 ? 6 : weekDayNumber - 1
        for (let i in next_lab_timing_data) {
            next_open = next_lab_timing_data[i][0].start
            next_open = _decimalToTime(next_open)
            if (i - weekDayNumber == 1) {
                next_open_today = 'tomorrow'
            } else {
                next_open_today = WEEK_DAYS[i]
            }
            break
        }
    }
    if (next_open && next_open_today) {
        return <p style={{ fontSize: 12 }} >Opens next at {next_open}, {next_open_today}</p>
    }

    return "Closed"

}


function _decimalToTime(time) {
    time = time.toString()
    let hours = time.split('.')[0]
    let minutes = time.split('.')[1]
    hours = parseInt(hours)
    if (minutes == '5') {
        minutes = ':30'
    } else {
        minutes = ""
    }
    let day_time = "AM"
    if (hours >= 12) {
        day_time = "PM"
    }
    hours = hours % 12
    return `${hours}${minutes} ${day_time}`
}