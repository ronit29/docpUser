import React from 'react';
const MONTHS = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
const WEEK_DAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
import GTM from '../../../helpers/gtm.js'

class VisitTimeNew extends React.Component {
    constructor(props) {
        super(props)
        let is_thyrocare = this.is_thyrocare_lab(props)
        this.state = {
            dateTimeSelectedValue: props.selectedDateFormat ? props.selectedDateFormat : this.getFormattedDate(is_thyrocare ? new Date(this.getDateAfter(1)) : new Date())
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedDateFormat && nextProps.selectedDateFormat != this.state.dateTimeSelectedValue) {
            this.setState({ dateTimeSelectedValue: nextProps.selectedDateFormat })
        }
    }

    selectDate(e) {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'LabDateClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-date-clicked'
        }

        GTM.sendEvent({ data: data })
        if (e.target.value) {
            let date = e.target.value
            this.setState({ dateTimeSelectedValue: date })
            let slot = { time: {} }
            this.props.selectLabTimeSLot(slot, false, date)
        }
    }

    getFormattedDate(date) {
        date = new Date(date)
        var dd = date.getDate();

        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        var today = yyyy + '-' + mm + '-' + dd;
        return today
    }

    getDateAfter(i = 0) {
        return new Date().setDate(new Date().getDate() + i)
    }

    is_thyrocare_lab(props) {
        return props.LABS && props.LABS[props.selectedLab] && props.LABS[props.selectedLab].lab && props.LABS[props.selectedLab].lab.is_thyrocare
    }

    goToTime(){
        if(this.props.selectedSlot && this.props.selectedSlot['all']){
            this.props.navigateTo('time', this.props.is_insurance_applicable, false)
        }else{
            this.props.navigateTo('time', this.props.is_insurance_applicable, true)
        }
    }

    render() {

        let is_thyrocare = this.is_thyrocare_lab(this.props)

        let unique_common_tests = null
        if(this.props.LABS[this.props.selectedLab] && this.props.LABS[this.props.selectedLab].tests && this.props.selectedSlot && this.props.selectedSlot['all'] && this.props.selectedSlot.selectedTestsTimeSlot){
            this.props.LABS[this.props.selectedLab].tests.map((x)=>{
                if(this.props.selectedSlot.selectedTestsTimeSlot[x.test_id]){
                    
                }else{
                    unique_common_tests = true
                }
            })
        }

        return (
            <div className={`widget mrb-15 ${this.props.timeError ? 'rnd-error-nm' : ''}`}>
                <div className="widget-content pos-relative">
                    {
                        this.props.LABS[this.props.selectedLab] && this.props.LABS[this.props.selectedLab].lab && this.props.LABS[this.props.selectedLab].lab.is_thyrocare ?
                           
                            this.props.pincode ?
                                <div className="area-pin" onClick={() => this.props.toggle()}>
                                    Area Pincode - <b>{this.props.pincode}</b>
                                    <a href="javascript:void(0);">Change</a>
                                </div>
                                : <div className="area-pin" onClick={() => this.props.toggle()}>
                                    Add Area Pincode  <b></b>
                                    <a href="javascript:void(0);">Add</a>
                                </div>
                            : ''
                    }
                    <div className="lab-visit-time d-flex jc-spaceb">
                        <h4 className="title d-flex"><span>
                            <img style={{ width: '18px', marginRight: '8px' }} src={ASSETS_BASE_URL + "/img/watch-date.svg"} />
                        </span>Visit Time</h4>
                        {/*<div className="float-right  mbl-view-formatting text-right">
                            <h4 className="date-time mr-10 title">{date || ""} {time.text ? "|" : ""} {time.text} {time.text?(time.value>=12?'PM':'AM'):''}</h4>
                            <a href="" onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            this.props.navigateTo('time',this.props.is_insurance_applicable)
                        }} className="text-primary fw-700 text-sm">{time.text ? "Change" : "Select"} Time</a>
                        
                        </div>*/}
                        {
                            !(this.props.selectedSlot && this.props.selectedSlot.selectedTestsTimeSlot && this.props.LABS[this.props.selectedLab] ) && <a href="" onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                this.props.navigateTo('time', this.props.is_insurance_applicable)
                            }} className="text-primary fw-700 text-sm">Select Time</a>
                        }
                    </div>
                    {
                        this.props.selectedSlot && this.props.selectedSlot.selectedTestsTimeSlot && this.props.LABS[this.props.selectedLab]?
                            <div className="vst-time-cont">
                                <React.Fragment>
                                    {
                                        !unique_common_tests && this.props.selectedSlot['all'] && this.props.selectedSlot['all'].time ?
                                        <div className="vst-content-bl">
                                            <p className="rdo-time-vst">{new Date(this.props.selectedSlot['all'].date).toDateString() || ""} {this.props.selectedSlot['all'].time.text ? "|" : ""} {this.props.selectedSlot['all'].time.text} {this.props.selectedSlot['all'].time.text ? (this.props.selectedSlot['all'].time.value >= 12 ? 'PM' : 'AM') : ''}</p>
                                        </div>
                                        :this.props.LABS[this.props.selectedLab].tests.map((test, key) => {
                                            return <div className="vst-content-bl" key={key}>
                                                <p className="vst-tst-name">{test.test.name}</p>
                                                {
                                                    this.props.selectedSlot.selectedTestsTimeSlot[test.test_id] ?
                                                        <p className="rdo-time-vst">{new Date(this.props.selectedSlot.selectedTestsTimeSlot[test.test_id].date).toDateString() || ""} {this.props.selectedSlot.selectedTestsTimeSlot[test.test_id].time.text ? "|" : ""} {this.props.selectedSlot.selectedTestsTimeSlot[test.test_id].time.text} {this.props.selectedSlot.selectedTestsTimeSlot[test.test_id].time.text ? (this.props.selectedSlot.selectedTestsTimeSlot[test.test_id].time.value >= 12 ? 'PM' : 'AM') : ''}</p>
                                                        : <a href="" onClick={(e) => {
                                                            e.preventDefault()
                                                            e.stopPropagation()
                                                            this.goToTime()
                                                        }} className="text-primary fw-700 text-sm">Select Time</a>
                                                                            }

                                            </div>
                                        })
                                    }
                                </React.Fragment>

                                <a href="" onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    this.props.navigateTo('time', this.props.is_insurance_applicable)
                                }} className="text-primary text-primary d-block fw-700 text-sm text-right fw-700 text-sm">Change Time</a>

                            </div>
                            : '' 
                    }
                    <p className="appmnt-avl">The appointment is subject to confirmation from the Lab. </p>
                </div>
                {/*<div className="widget-content pos-relative">
                    {
                        is_thyrocare?
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
                    <div className="lab-visit-time d-flex jc-spaceb mb-0">
                        <h4 className="title mb-0">
                            <span>
                                <img className="visit-time-icon" src={ASSETS_BASE_URL + '/img/watch-date.svg'} />
                            </span>
                            Select Visit Time
                        </h4>
                    </div>
                    <p className="appmnt-avl">The appointment is subject to confirmation from the Lab. </p>
                    <div className="date-slecet-cont">
                        <div className="nw-inpt-selctr">
                            <span className="nw-pick-hdng">Date:</span>
                            <div className="caln-input-tp">
                                <img className="inp-nw-cal" src={ASSETS_BASE_URL + '/img/calnext.svg'} />
                                <input type="date" name="date" onChange={this.selectDate.bind(this)} value={this.state.dateTimeSelectedValue?this.state.dateTimeSelectedValue:''}  min={this.getFormattedDate( is_thyrocare?new Date(this.getDateAfter(1) ):new Date()) } max={this.getFormattedDate( new Date(this.getDateAfter(23) ))} />
                            </div>
                        </div>
                    </div>
                    <div className="date-slecet-cont">
                        <div className="nw-inpt-selctr">
                            <span className="nw-pick-hdng">Time:</span>
                            <div className="caln-input-tp" onClick={()=>this.props.navigateTo('time',this.props.is_insurance_applicable)}>
                                <img className="inp-nw-cal" src={ASSETS_BASE_URL + '/img/nw-watch.svg'} />
                                <input type="text" disabled={true} name="bday" placeholder="Select" value ={time && time.text?`${time.text} ${time.value >= 12 ? 'PM' : 'AM'}` : ''} />
                                <img className="tm-arw-sgn" src={ASSETS_BASE_URL + '/img/customer-icons/dropdown-arrow.svg'}/>
                            </div>
                        </div>
                    </div>
                </div>*/}
            </div>
        );
    }
}


export default VisitTimeNew
