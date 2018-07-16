import React from 'react';
import { connect } from 'react-redux';

class ClinicSelector extends React.Component {
    constructor(props) {
        super(props)
    }

    selectClinic(clinicId) {
        let doctorId = this.props.match.params.id
        this.props.history.push(`/opd/doctor/${doctorId}/${clinicId}/book`)
    }

    render() {

        let { name, hospitals } = this.props.details

        return (
            <div className="widget-panel">
                <h4 className="panel-title">Dr. {name} Available at</h4>
                <div className="panel-content clinic-info-panel">
                    <ul className="inline-list Clinic-card-list">
                        {
                            hospitals.map((hospital, i) => {
                                return <li key={i}>
                                    <div className="widget no-shadow">
                                        <div className="widget-header">
                                            <h4 className="widget-title text-md fw-700">{hospital.hospital_name} <span className="float-right">Rs {hospital.fees}</span></h4>
                                        </div>
                                        <div className="widget-content">
                                            <div className="location-details">
                                                <img src={hospital.hospital_thumbnail} className="img-fluid" />
                                                <p className="address">{hospital.address}</p>
                                            </div>
                                            <div className="timing-details">
                                                {
                                                    Object.keys(hospital.timings).map((timingKey, key) => {
                                                        return <p className="fw-700" key={key}>
                                                            <label className="fw-700 text-md text-primary">
                                                                {timingKey}
                                                            </label>
                                                            {" " + hospital.timings[timingKey].join(', ')}
                                                        </p>
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="text-center" style={{marginTop: 25}}>
                                            <button className="v-btn v-btn-primary outline" onClick={this.selectClinic.bind(this, hospital.hospital_id)}>Book Now</button>
                                        </div>
                                    </div>
                                </li>
                            })
                        }

                    </ul>
                </div>
            </div>
        );
    }
}


export default ClinicSelector
