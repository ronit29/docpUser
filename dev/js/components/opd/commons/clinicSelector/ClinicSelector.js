import React from 'react';
import { connect } from 'react-redux';
import InitialsPicture from '../../../commons/initialsPicture'
import GTM from '../../../../helpers/gtm.js'
import STORAGE from '../../../../helpers/storage'

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

    showNumber(id, hospital_id, e) {
        e.preventDefault()
        e.stopPropagation()

        let data = {
            'Category': 'ConsumerApp', 'Action': 'ShowNoClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'show-no-clicked', 'doctor_id': id, "hospital_id": hospital_id
        }
        GTM.sendEvent({ data: data })

        if (!this.state.numberShown) {
            this.props.getDoctorNumber(id, (err, data) => {
                if (!err && data.number) {
                    this.setState({
                        numberShown: data.number
                    })
                }
            })
        }
    }

    render() {

        let { id, name, hospitals, is_live, enabled_for_online_booking } = this.props.details

        let style = {}
        if (hospitals && hospitals.length == 1) {
            style['width'] = '98%'
        }

        return (
            <div className="widget-panel">
                <h4 className="panel-title mb-rmv">Dr. {name} Available at</h4>
                <div className="panel-content clinic-info-panel">
                    <ul className="inline-list Clinic-card-list rtng-box-shadow">
                        {
                            hospitals.map((hospital, i) => {
                                return <li key={i} style={style}>
                                    <div className="widget no-shadow">
                                        {/* <div className="widget-header pb-rmv clearfix">
                                            <h4 className="widget-title text-md fw-700 clinic-selector-name ratng-clinic-slc-name">{hospital.hospital_name}</h4>
                                            <span className="float-right text-md fw-700 ratng-doc-price">&#8377; {hospital.deal_price}</span>
                                        </div> */}
                                        <div className="widget-header pb-rmv clearfix">
                                            <h4 className="widget-title text-md fw-700 clinic-selector-name ratng-clinic-slc-name">{hospital.hospital_name}</h4>
                                            <span className="float-right text-md fw-700 ratng-doc-price add-on-doc-price">&#8377; {hospital.deal_price} <b className="ratng-doc-oldprice">&#8377; {hospital.mrp}</b>
                                                {
                                                    STORAGE.checkAuth() || hospital.deal_price < 100 ?
                                                        ''
                                                        : <span className="signup-off-doc">+ &#8377; 100 OFF <b>on Signup</b> </span>
                                                }
                                            </span>
                                        </div>
                                        <div className="widget-content pt-two">
                                            <div className="location-details clearfix">
                                                <p className="address">{hospital.address}</p>
                                                <a href={`https://www.google.com/maps/search/?api=1&query=${hospital.lat},${hospital.long}`} style={{ float: 'right', cursor: 'pointer' }} target="_blank">
                                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/map-icon.png"} />
                                                </a>
                                                {/* <div style={{ float: 'right', cursor: 'pointer' }} >

                                                </div> */}
                                            </div>
                                            <div className="timing-details mt-rmv">
                                                <span className="rtng-clnc-time">Timings</span>
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
                                                enabled_for_online_booking ? <button style={{ visibility: (!!is_live ? "visible" : "hidden") }} className="v-btn v-btn-primary btn-sm" onClick={this.selectClinic.bind(this, hospital.hospital_id, !!is_live, i)}>Book Now</button> : <button onClick={this.showNumber.bind(this, id, hospital.hospital_id)} className={this.state.numberShown ? "v-btn v-btn-primary btn-sm btn-number" : "v-btn v-btn-primary btn-sm"}>{this.state.numberShown || "Contact"}</button>
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
