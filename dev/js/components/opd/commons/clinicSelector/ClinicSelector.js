import React from 'react';
import { connect } from 'react-redux';
import InitialsPicture from '../../../commons/initialsPicture'
import GTM from '../../../../helpers/gtm.js'

class ClinicSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            numberShown: ""
        }
    }

    selectClinic(clinicId, is_live, rank) {
        if (is_live) {
            let doctorId = this.props.doctorId

            let data = {
                'Category': 'ConsumerApp', 'Action': 'OpdBookNowClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'opd-book-now-clicked', 'selectedId': clinicId || ''
            }
            GTM.sendEvent({ data: data })

            data = {
                'Category': 'ConsumerApp', 'Action': 'OpdBookNowRank', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'opd-book-now-rank', 'rank': rank + 1
            }
            GTM.sendEvent({ data: data })

            this.props.history.push(`/opd/doctor/${doctorId}/${clinicId}/book`)
        }
    }

    showNumber(id, e) {
        e.preventDefault()
        e.stopPropagation()
        this.props.getDoctorNumber(id, (err, data) => {
            if (!err && data.number) {
                this.setState({
                    numberShown: data.number
                })
            }
        })
    }

    render() {

        let { id, name, hospitals, is_live, enabled_for_online_booking } = this.props.details

        let style = {}
        if (hospitals && hospitals.length == 1) {
            style['width'] = '98%'
        }

        return (
            <div className="widget-panel">
                <h4 className="panel-title">Dr. {name} Available at</h4>
                <div className="panel-content clinic-info-panel">
                    <ul className="inline-list Clinic-card-list">
                        {
                            hospitals.map((hospital, i) => {
                                return <li key={i} style={style}>
                                    <div className="widget no-shadow">
                                        <div className="widget-header clearfix">
                                            <h4 className="widget-title text-md fw-700 clinic-selector-name">{hospital.hospital_name}</h4>
                                            <span className="float-right text-md fw-700">&#8377; {hospital.deal_price}</span>
                                        </div>
                                        <div className="widget-content">
                                            <div className="location-details clearfix">
                                                <p className="address">{hospital.address}</p>
                                                <a href={`https://www.google.com/maps/search/?api=1&query=${hospital.lat},${hospital.long}`} style={{ float: 'right', cursor: 'pointer' }} target="_blank">
                                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/map-icon.png"} />
                                                </a>
                                                {/* <div style={{ float: 'right', cursor: 'pointer' }} >

                                                </div> */}
                                            </div>
                                            <div className="timing-details">
                                                {
                                                    Object.keys(hospital.timings).map((timingKey, key) => {
                                                        return <p className="fw-700" key={key}>
                                                            <label className="fw-700 text-md text-primary" style={{ verticalAlign: 'initial' }} >
                                                                {timingKey}
                                                            </label>
                                                            {" " + hospital.timings[timingKey].join(', ')}
                                                        </p>
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="text-center" style={{ marginTop: 12 }}>
                                            {
                                                enabled_for_online_booking ? <button style={{ visibility: (!!is_live ? "visible" : "hidden") }} className="v-btn v-btn-primary btn-sm" onClick={this.selectClinic.bind(this, hospital.hospital_id, !!is_live, i)}>Book Now</button> : <button onClick={this.showNumber.bind(this, id)} className="v-btn v-btn-primary btn-sm">{this.state.numberShown || "Contact"}</button>
                                            }

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
