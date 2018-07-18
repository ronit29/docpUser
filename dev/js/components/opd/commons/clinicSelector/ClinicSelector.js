import React from 'react';
import { connect } from 'react-redux';
import InitialsPicture from '../../../commons/initialsPicture'

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
                                            <h4 className="widget-title text-md fw-700 clinic-selector-name">{hospital.hospital_name}</h4>
                                            <span className="float-right text-md fw-700">Rs {hospital.fees}</span>
                                            <div style={{clear: 'both'}}></div>
                                        </div>
                                        <div className="widget-content">
                                            <div className="location-details">
                                                <p className="address">{hospital.address}</p>
                                                <div style={{float: 'right'}} >
                                                    <img src="/assets/img/customer-icons/map-icon.png" />
                                                </div>
                                                <div style={{clear: 'both'}}></div>
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
                                        <div className="text-center" style={{ marginTop: 12 }}>
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
