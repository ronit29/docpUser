import React from 'react';

class TimeSlotSelector extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="timeSlotSelector">
                <h5>Select preffered time slot</h5>

                <div className="dateCar">
                    <div className="scroller">
                        <div className="dateTile">
                            <p className="date">29</p>
                            <p className="day">Thu</p>
                        </div>
                        <div className="dateTile">
                            <p className="date">29</p>
                            <p className="day">Thu</p>
                        </div>
                        <div className="dateTile selected">
                            <p className="date">29</p>
                            <p className="day">Thu</p>
                        </div>
                        <div className="dateTile">
                            <p className="date">29</p>
                            <p className="day">Thu</p>
                        </div>
                    </div>
                </div>

                <div className="timeSlots">
                    <button className="tsBtn selected">Morning Slots</button>
                    <button className="tsBtn">Evening Slots</button>
                    <div className="slots">
                        <span className="slot">09:00</span>
                        <span className="slot">09:00</span>
                        <span className="slot">09:00</span>
                        <span className="selected slot">09:00</span>
                        <span className="slot">09:00</span>
                        <span className="slot">09:00</span>
                        <span className="slot">09:00</span>
                        <span className="slot">09:00</span>
                    </div>
                </div>
            </div>
        );
    }
}


export default TimeSlotSelector
