import React from 'react';
import { connect } from 'react-redux';
import InitialsPicture from '../../../commons/initialsPicture'
import GTM from '../../../../helpers/gtm.js'
import STORAGE from '../../../../helpers/storage'

class ClinicSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        let { id, name, hospitals, is_live, enabled_for_online_booking } = this.props.details

        let style = {}
        if (hospitals && hospitals.length == 1) {
            style['width'] = '98%'
        }

        if (!this.props.selectedClinic) {
            if (hospitals && hospitals.length) {
                this.props.selectClinic(hospitals[0].hospital_id, is_live, 0)
            }
        }

        return (
            // <div className="widget-panel">
            //     <h4 className="panel-title mb-rmv">Dr. {name} Available at</h4>
            //     <div className="panel-content clinic-info-panel">
            //         <ul className="inline-list Clinic-card-list rtng-box-shadow">
            //             {
            //                 hospitals.map((hospital, i) => {
            //                     return <li key={i} style={style}>
            //                         <div className="widget no-shadow">
            //                             {/* <div className="widget-header pb-rmv clearfix">
            //                                 <h4 className="widget-title text-md fw-700 clinic-selector-name ratng-clinic-slc-name">{hospital.hospital_name}</h4>
            //                                 <span className="float-right text-md fw-700 ratng-doc-price">&#8377; {hospital.deal_price}</span>
            //                             </div> */}
            //                             <div className="widget-header pb-rmv clearfix">
            //                                 <h4 className="widget-title text-md fw-700 clinic-selector-name ratng-clinic-slc-name">{hospital.hospital_name}</h4>
            //                                 <span className="float-right text-md fw-700 ratng-doc-price add-on-doc-price">&#8377; {hospital.deal_price} <b className="ratng-doc-oldprice">&#8377; {hospital.mrp}</b>
            //                                     {
            //                                         STORAGE.checkAuth() || hospital.deal_price < 100 ?
            //                                             ''
            //                                             : <span className="signup-off-doc">+ &#8377; 100 OFF <b>on Signup</b> </span>
            //                                     }
            //                                 </span>
            //                             </div>
            //                             <div className="widget-content pt-two">
            //                                 <div className="location-details clearfix">
            //                                     <p className="address">{hospital.address}</p>
            //                                     <a href={`https://www.google.com/maps/search/?api=1&query=${hospital.lat},${hospital.long}`} style={{ float: 'right', cursor: 'pointer' }} target="_blank">
            //                                         <img src={ASSETS_BASE_URL + "/img/customer-icons/map-icon.png"} />
            //                                     </a>
            //                                     {/* <div style={{ float: 'right', cursor: 'pointer' }} >

            //                                     </div> */}
            //                                 </div>
            //                                 <div className="timing-details mt-rmv">
            //                                     <span className="rtng-clnc-time">Timings</span>
            //                                     {
            //                                         Object.keys(hospital.timings).map((timingKey, key) => {
            //                                             return <p className="fw-700" key={key}>
            //                                                 <label className="fw-700 text-md text-primary" style={{ verticalAlign: 'initial' }} >
            //                                                     {timingKey}
            //                                                 </label>
            //                                                 {" " + hospital.timings[timingKey].join(', ')}
            //                                             </p>
            //                                         })
            //                                     }
            //                                 </div>
            //                             </div>
            //                             <div className="text-center" style={{ marginTop: 12 }}>
            //                                 {
            //                                     enabled_for_online_booking ? <button style={{ visibility: (!!is_live ? "visible" : "hidden") }} className="v-btn v-btn-primary btn-sm" onClick={this.selectClinic.bind(this, hospital.hospital_id, !!is_live, i)}>Book Now</button> : <button onClick={this.showNumber.bind(this, id, hospital.hospital_id)} className={this.state.numberShown ? "v-btn v-btn-primary btn-sm btn-number" : "v-btn v-btn-primary btn-sm"}>{this.state.numberShown || "Contact"}</button>
            //                                 }

            //                             </div>
            //                         </div>
            //                     </li>
            //                 })
            //             }
            //         </ul>
            //     </div>
            // </div>
            <div className="widget-panel">
                <h4 className="panel-title mb-rmv">Dr. {name} Available at</h4>
                {
                    hospitals.map((hospital, i) => {
                        return <div key={i} className="panel-content pnl-bottom-border">
                            <div className="dtl-radio">
                                <label className="container-radio" onClick={() => { this.props.selectClinic(hospital.hospital_id, !!is_live, i) }}>{hospital.hospital_name}
                                    {
                                        this.props.selectedClinic == hospital.hospital_id ? <input type="radio" checked name="radio" /> : <input type="radio" name="radio" />
                                    }
                                    <span className="doc-checkmark"></span>
                                </label>
                            </div>
                            <div className="dtl-cnslt-fee pb-list">
                                <div className="clearfix">
                                    <span className="test-price txt-ornage">₹ {hospital.deal_price}<span className="test-mrp">₹ {hospital.mrp}</span></span><span className="fw-500 test-name-item">Consultation Fee</span>
                                </div>
                                <div className="clearfix">
                                    {
                                        STORAGE.checkAuth() || hospital.deal_price < 100 ?
                                            ''
                                            : enabled_for_online_booking ?
                                                <span className="signup-off-doc" style={{ float: 'right' }} >+ &#8377; 100 OFF <b>on Signup</b> </span>
                                                : ''
                                    }
                                </div>
                            </div>
                            <div className="address-bg-color">
                                <div className="row">
                                    <div className="col-10">
                                        <div className="add-content">
                                            <span className="add-span">Address:</span>
                                            <p>{hospital.address}</p>
                                        </div>
                                        <div className="add-content">
                                            <span className="add-span">Timings:</span>
                                            <div style={{ flex: 1 }}>
                                                {
                                                    Object.keys(hospital.timings).map((timingKey, key) => {
                                                        return <p key={key}>{timingKey}<span>{" " + hospital.timings[timingKey].join(', ')}</span></p>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <a href={`https://www.google.com/maps/search/?api=1&query=${hospital.lat},${hospital.long}`} style={{ float: 'right', cursor: 'pointer' }} target="_blank">
                                            <img style={{ width: "35px", height: "35px", cursor: 'pointer' }} src={ASSETS_BASE_URL + "/img/customer-icons/map-icon.png"} className="img-fluid" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        );
    }
}

export default ClinicSelector