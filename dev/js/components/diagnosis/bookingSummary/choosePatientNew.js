import React from 'react';

class ChoosePatientNewView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        return (
            <div className="widget mrb-15">
                <div className="widget-content">
                    <div className="lab-visit-time d-flex jc-spaceb">
                        <h4 className="title"><span>
                            <img style={{ width: '18px', marginRight: '8px' }} src={ASSETS_BASE_URL + "/img/icons/user.svg"} />
                        </span>Patient</h4>
                        <div className="float-right  mbl-view-formatting text-right">
                            <h4 className="date-time  title">{this.props.patient ? this.props.patient.name : "No Selected Patient"}</h4>
                            <a href="" onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                this.props.navigateTo('patient')
                            }} className="text-primary fw-700 text-sm">{this.props.patient ? "Change" : "Select"}</a>
                        </div>
                    </div>
                </div>
            </div>
            /*
            <div className="lab-visit-time d-flex jc-spaceb">
                <h4 className="title"><span><img src={ASSETS_BASE_URL + "/img/icons/user.svg"} className="visit-time-icon" style={{ width: 14, marginRight: 8 }} /></span>Patient</h4>
                <div className="float-right d-flex">
                    <h4 className="date-time mr-10 title">{this.props.patient ? this.props.patient.name : "No Selected Patient"}</h4>
                    <a href="#" onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        this.props.navigateTo('patient')
                    }} className="text-primary fw-700 text-sm">{this.props.patient ? "Change" : "Select"}</a>
                </div>
            </div>*/
        );
    }
}


export default ChoosePatientNewView
