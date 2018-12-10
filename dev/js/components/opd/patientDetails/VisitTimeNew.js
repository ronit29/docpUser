import React from 'react';

class VisitTimeNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }



    render() {

        let { date, time } = this.props.selectedSlot

        if (date) {
            date = new Date(date).toDateString()
        }

        return (
            <div className={`widget mrb-15 ${this.props.timeError?'rnd-error-nm':''}`}>
                <div className="widget-content pos-relative">
                    <div className="lab-visit-time d-flex jc-spaceb">
                        <h4 className="title"><span><img src={ASSETS_BASE_URL + "/img/watch-date.svg"} className="visit-time-icon" /></span>Select Visit Time</h4>
                        <div className="float-right  mbl-view-formatting text-right">
                            <h4 className="date-time title">{date || ""} {time.text ? "|" : ""} {time.text} {time.text?(time.value>=12?'PM':'AM'):''}</h4>
                            <a href="" onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            this.props.navigateTo('time')
                        }} className="text-primary fw-700 text-sm">{time.text ? "Change" : "Select"} Time</a></div>
                    </div>
                    {
                        this.props.timeError ? <span className="fw-500 time-error nw-error">Required</span> : ''
                    }
                </div>
            </div>
        );
    }
}


export default VisitTimeNew
