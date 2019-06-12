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
                    {
                        this.props.LABS[this.props.selectedLab] && this.props.LABS[this.props.selectedLab].lab && this.props.LABS[this.props.selectedLab].lab.is_thyrocare?
                            this.props.pincode?
                            <div className="area-pin" onClick={()=>this.props.toggle()}>
                                Area Pincode - <b>{this.props.pincode}</b>
                                <a href="javascript:void(0);">Change</a> 
                            </div>
                            :<div className="area-pin" onClick={()=>this.props.toggle()}>
                                Add Area Pincode  <b></b>
                                <a href="javascript:void(0);">Add</a> 
                            </div>
                        :''
                    }
                    <div className="lab-visit-time d-flex jc-spaceb">
                        <h4 className="title d-flex"><span>
                            <img style={{ width: '18px', marginRight: '8px' }} src={ASSETS_BASE_URL + "/img/watch-date.svg"} />
                        </span>Visit Time</h4>

                        <div className="float-right  mbl-view-formatting text-right">
                            <h4 className="date-time mr-10 title">{date || ""} {time.text ? "|" : ""} {time.text} {time.text?(time.value>=12?'PM':'AM'):''}</h4>
                            <a href="" onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            this.props.navigateTo('time',this.props.is_insurance_applicable)
                        }} className="text-primary fw-700 text-sm">{time.text ? "Change" : "Select"} Time</a>
                        
                        </div>
                    </div>
                    <p className="appmnt-avl">The appointment is subject to the availability of Lab. </p>
                        {/*
                            this.props.timeError ? <span className="fw-500 time-error nw-error">Required</span> : ''
                        */}
                </div>
            </div>
        );
    }
}


export default VisitTimeNew
