import React from 'react';

import EmotiIcon from 'material-ui-icons/AccountCircle';
import HomeIcon from 'material-ui-icons/Home';
import ClockIcon from 'material-ui-icons/AvTimer';
import LocationsIcon from 'material-ui-icons/LocationOn';


class LabProfileCard extends React.Component {
    constructor(props) {
        super(props)
    }

    generateTestsString(tests) {
        return tests.reduce((str, test, i) => {
            if(test.isAvailable) {
                str += test.id;
                if (i + 1 < tests.length) str += ",";
            }
            return str
        }, "")
    }

    cardClick(id, e) {
        let { tests } = this.props.details
        let testsStr = this.generateTestsString(tests)
        this.context.router.history.push(`/lab/${id}/book?tests=${testsStr}`)
    }

    bookNow(id, e) {
        e.stopPropagation()
        let { tests } = this.props.details
        let testsStr = this.generateTestsString(tests)
        this.context.router.history.push(`/lab/${id}/book?tests=${testsStr}`)
    }

    static contextTypes = {
        router: () => null
    }

    getTime(unix_timestamp) {
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        return hours + ':' + minutes.substr(-2)
    }

    getAvailability(nextAvailable) {
        if (nextAvailable[0]) {
            let date = new Date(nextAvailable[0].from).toDateString()
            let timeStart = this.getTime(nextAvailable[0].from)
            let timeEnd = this.getTime(nextAvailable[0].to)
            return {
                date, timeStart, timeEnd
            }

        }

        return { date: '', timeStart: '', timeEnd: '' }
    }

    render() {

        let { id, name, profile_img, nextAvailable, address, price_breakup } = this.props.details

        let timeAvailable = this.getAvailability(nextAvailable)

        return (
            <div className="doctorCard" onClick={this.cardClick.bind(this, id)}>
                <div className="detailsDiv">
                    <div className="subOptionsImage">
                        <img src={profile_img} className="doctorImage" />
                    </div>
                    <div className="subOptionsContent">
                        <span className="name">{name}</span>
                    </div>
                    {
                        !!this.props.hideBookNow ? '' :
                            <div className="subOptionsInteract">
                                <button className="bookNow" onClick={this.bookNow.bind(this, id)}>
                                    Book Rs. {price_breakup.amount}
                                </button>
                            </div>
                    }
                </div>
                {
                    !!this.props.hideBottom ? '' :
                        <div className="bottomOptions">
                            <div className="subOptions">
                                <ClockIcon className="clinicIcon" />
                                <span className="timeEntry">{timeAvailable.date}</span>
                                <span className="timeEntry">{timeAvailable.timeStart} to {timeAvailable.timeEnd}</span>
                            </div>
                            <div className="subOptions">
                                <LocationsIcon className="clinicIcon" />
                                <span className="clinicName">{address}</span>
                            </div>
                        </div>
                }
            </div>
        );
    }
}


export default LabProfileCard
