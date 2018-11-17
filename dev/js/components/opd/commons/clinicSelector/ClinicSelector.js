import React from 'react';
import { connect } from 'react-redux';
import InitialsPicture from '../../../commons/initialsPicture'
import GTM from '../../../../helpers/gtm.js'
import STORAGE from '../../../../helpers/storage'
import ProcedurePopup from '../profilePopUp.js'

class ClinicSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            numberShown: "",
            errorMsg: false
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

    toggleProcedures(procedure_to_toggle, doctor_id, hospital_id) {
        let selectedProcedureIds = []
        Object.values(this.props.selectedDoctorProcedure[doctor_id][hospital_id].categories).map((procedure) => {

            selectedProcedureIds =  procedure.filter(x=>x.is_selected).map(x=>x.procedure_id)    
        })


        if(selectedProcedureIds.indexOf(procedure_to_toggle.procedure_id) == -1 ){

        }else if(selectedProcedureIds.length<=1){
            this.setState({
                errorMsg: true
            })
            return null
        }

        this.props.toggleProfileProcedures(procedure_to_toggle, doctor_id, hospital_id)
        
    }

    toggle(which) {
        this.setState({ [which]: !this.state[which] , errorMsg: false})
    }

    procedurePopUp(hospital_id){

        this.setState({vieMoreProcedures: true, selectedId: hospital_id, errorMsg: false})
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
                            {  this.props.selectedDoctorProcedure[id] && this.props.selectedDoctorProcedure[id][hospital.hospital_id] && this.props.selectedDoctorProcedure[id][hospital.hospital_id].categories?
                                <div className="clearfix">
                                    <span className="test-price txt-ornage">₹ {hospital.deal_price}<span className="test-mrp">₹ {hospital.mrp}</span></span><span className="fw-500 test-name-item">Consultation Fee</span>
                                    <span className="test-price txt-ornage">₹ {this.props.selectedDoctorProcedure[id][hospital.hospital_id].price.deal_price || 0}<span className="test-mrp">₹ {this.props.selectedDoctorProcedure[id][hospital.hospital_id].price.mrp || 0}</span></span><span className="fw-500 test-name-item">Procedure Fee</span>
                                    <span className="test-price txt-ornage">₹ {hospital.deal_price+ this.props.selectedDoctorProcedure[id][hospital.hospital_id].price.deal_price || 0}<span className="test-mrp">₹ {hospital.mrp+ this.props.selectedDoctorProcedure[id][hospital.hospital_id].price.mrp || 0}</span></span><span className="fw-500 test-name-item">Final Price</span>
                                </div>
                                :<div className="clearfix">
                                    <span className="test-price txt-ornage">₹ {hospital.deal_price}<span className="test-mrp">₹ {hospital.mrp}</span></span><span className="fw-500 test-name-item">Consultation Fee</span>
                                </div>
                            }
                                
                                <div className="clearfix">
                                    {
                                        STORAGE.checkAuth() || hospital.deal_price < 100 ?
                                            ''
                                            : <span className="signup-off-doc" style={{ float: 'right' }} >+ &#8377; 100 OFF <b>on Signup</b> </span>
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
                            {
                            this.props.selectedDoctorProcedure[id] && this.props.selectedDoctorProcedure[id][hospital.hospital_id] && this.props.selectedDoctorProcedure[id][hospital.hospital_id].categories?
                            <div className="procedure-checkboxes">
                                <h4>Procedures in <span>{Object.values(this.props.selectedDoctorProcedure[id][hospital.hospital_id].categories).map((category) =>{
                                   return category.map(x=>x.procedure_name)
                                })} <img src={ASSETS_BASE_URL + "/img/icons/info.svg"} /></span></h4>
                                <div className="insurance-checkboxes">
                                    <ul className="procedure-list">
                                    {
                                        Object.values(this.props.selectedDoctorProcedure[id][hospital.hospital_id].categories).map((procedure) => {

                                           return procedure.filter(x=>x.is_selected).map((category, i) =>{

                                            return <li key={i}>
                                                        <div>
                                                            <input type="checkbox" checked={true} className="ins-chk-bx" id={`${category.procedure_id}_hos${category.hospital_id}`} name="fruit-1" value="" hospital = {hospital.hospital_id} onChange={this.procedurePopUp.bind(this, category.hospital_id )}/><label htmlFor={`${category.procedure_id}_hos${category.hospital_id}`}>{category.procedure_name}</label>
                                                        </div>
                                                        <p className="pr-prices">₹ {category.deal_price}<span className="pr-cut-price">₹ {category.mrp}</span></p>
                                                    </li>

                                            })

                                        }) 
                                    }
                                    {
                                        this.state.errorMsg?
                                        <p>Please Select at least one Procedure</p>
                                        :''
                                    }
                                    {
                                        this.props.selectedDoctorProcedure[id][hospital.hospital_id].selectedProcedures + this.props.selectedDoctorProcedure[id][hospital.hospital_id].unselectedProcedures >1
                                        ?this.state.vieMoreProcedures
                                            ?<ProcedurePopup toggle={this.toggle.bind(this, 'vieMoreProcedures')} hospital_id = {this.state.selectedId} doctor_id = {id}  {...this.props} data = {this.props.selectedDoctorProcedure[id][this.state.selectedId].categories} />
                                            :this.props.selectedDoctorProcedure[id][hospital.hospital_id].selectedProcedures + this.props.selectedDoctorProcedure[id][hospital.hospital_id].unselectedProcedures != this.props.selectedDoctorProcedure[id][hospital.hospital_id].selectedProcedures?<button className="pr-plus-add-btn" onClick={this.procedurePopUp.bind(this, hospital.hospital_id )}>
                                            + {this.props.selectedDoctorProcedure[id][hospital.hospital_id].unselectedProcedures} more
                                            </button>:''
                                        :''
                                    }
                                    </ul>
                                </div>
                            </div>
                            :''
                        }

                        </div>
                        
                    })
                }
            </div>
        );
    }
}

export default ClinicSelector