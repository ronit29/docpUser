import React from 'react';
import { connect } from 'react-redux';
import InitialsPicture from '../../../commons/initialsPicture'
import GTM from '../../../../helpers/gtm.js'
import STORAGE from '../../../../helpers/storage'
import ProcedurePopup from '../profilePopUp.js'
import { hostname } from 'os';

class ClinicSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            numberShown: ""
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

    toggle(which) {
        this.setState({ [which]: !this.state[which] })
    }

    procedurePopUp(hospital_id) {
        this.setState({ vieMoreProcedures: true, selectedId: hospital_id })
    }

    goToHospitalPage(hospital, e) {
        e.preventDefault()
        e.stopPropagation()
        if(hospital.url) {
            this.props.history.push(`/${hospital.url}`)
        }else {
            this.props.history.push(`/ipd/hospital/${hospital.hospital_id}`)
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
                this.props.selectClinic(hospitals[0].hospital_id, hospitals[0].enabled_for_online_booking, 0, hospitals[0].discounted_price || 0, hospitals[0].show_contact)
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
                <h2 className="panel-title mb-rmv">Dr. {name} Available at</h2>
                {
                    hospitals.map((hospital, i) => {
                        let vip_discounted_price = 0
                        vip_discounted_price = hospital.discounted_price - (hospital.vip.vip_gold_price + hospital.vip.vip_convenience_amount)
                        return <div key={i} className="panel-content pnl-bottom-border">
                            <div className="dtl-radio">
                                <label className="container-radio" onClick={() => { this.props.selectClinic(hospital.hospital_id, hospital.enabled_for_online_booking, i, hospital.discounted_price, hospital.show_contact) }}><h3 className="fw-500 hosptl-vq-mr" style={{fontSize: 'inherit' }} >{hospital.hospital_name} </h3>
                                    {
                                        this.props.selectedClinic == hospital.hospital_id ? <input type="radio" checked name="radio" /> : <input type="radio" name="radio" />
                                    }
                                    <a href={hospital.url?`/${hospital.url}`:`/ipd/hospital/${hospital.hospital_id}`} onClick={this.goToHospitalPage.bind(this, hospital)}><span className="vw-hsptl-di" >(View Hospital)</span></a>
                                    <span className="doc-checkmark"></span>
                                </label>
                            </div>
                            {
                                false && this.props.selectedClinic == hospital.hospital_id && this.props.selectedDoctorProcedure[id] && this.props.selectedDoctorProcedure[id][hospital.hospital_id] && this.props.selectedDoctorProcedure[id][hospital.hospital_id].categories
                                    ? ''
                                    : <div className="dtl-cnslt-fee pb-list cnslt-fee-style mb-0">
                                        <div className="clearfix">
                                            {
                                                hospital.insurance && hospital.insurance.is_insurance_covered && hospital.insurance.is_user_insured && parseInt(hospital.discounted_price) <=hospital.insurance.insurance_threshold_amount?
                                                <span className="test-price txt-ornage">₹ {0}</span>
                                                :(hospital.vip.is_gold_member || hospital.vip.is_vip_member) && hospital.vip.cover_under_vip ? 
                                                    <React.Fragment>
                                                    <div className="text-right">
                                                        <img className="gld-cd-icon" src={ASSETS_BASE_URL + '/img/gold-sm.png'}/>
                                                    </div>
                                                    <p className="cst-doc-price">₹ {hospital.vip.vip_amount+hospital.vip.vip_convenience_amount} <span className="cstm-doc-cut-price">₹ {hospital.mrp} </span></p>
                                                    </React.Fragment>
                                                /*:hospital.vip.is_gold_member?
                                                    <span className="test-price txt-ornage">₹ {hospital.vip.vip_amount + hospital.vip.vip_convenience_amount}
                                                        <span className="test-mrp">₹ {hospital.mrp}</span>
                                                    </span>
                                                :hospital.vip.is_vip_member?
                                                    <span className="test-price txt-ornage">₹ {hospital.vip.vip_amount}
                                                        <span className="test-mrp">₹ {hospital.mrp}</span>
                                                    </span>*/
                                                :hospital.enabled_for_cod && !hospital.enabled_for_prepaid
                                                ?hospital.cod_deal_price
                                                    ?<span className="test-price txt-ornage">₹ {hospital.cod_deal_price}
                                                        {
                                                            parseInt(hospital.cod_deal_price) == parseInt(hospital.mrp)
                                                                ? ''
                                                                : <span className="test-mrp">₹ {hospital.mrp}</span>
                                                        }
                                                    </span>
                                                    :<span className="test-price txt-ornage">₹ {hospital.mrp}</span>

                                                :hospital.enabled_for_online_booking ?
                                                    <span className="test-price txt-ornage">₹ {hospital.discounted_price}
                                                        {
                                                            parseInt(hospital.discounted_price) == parseInt(hospital.mrp)
                                                                ? ''
                                                                : <span className="test-mrp">₹ {hospital.mrp}</span>
                                                        }
                                                    </span>
                                                    : hospital.mrp && hospital.mrp != 0 ?
                                                        <span className="test-price txt-ornage">₹ {hospital.mrp}</span> : ''
                                            }
                                            <span className="fw-500 test-name-item">Consultation Fee</span>
                                        </div>
                                    </div>
                                    
                            } 
                            

                            {!hospital.insurance.is_user_insured && !hospital.vip.is_vip_member && !hospital.vip.is_gold_member && hospital.vip.is_enable_for_vip && hospital.discounted_price>(hospital.vip.vip_convenience_amount||0 + hospital.vip.vip_gold_price||0) ?
                                <div className="d-flex align-items-center justify-content-end goldCard gold-price-card-addon-clinicSelector" onClick={(e) => {
                                    e.stopPropagation();
                                    this.props.clearVipSelectedPlan()
                                    let analyticData = {
                                        'Category': 'ConsumerApp', 'Action': 'OpdProfileVipGoldClick', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'opd-profile-vip-gold-click',
                                    }
                                    GTM.sendEvent({ data: analyticData })
                                    this.props.history.push('/vip-gold-details?is_gold=true&source=opd-profile-vip-gold-click&lead_source=Docprime')
                                }}>
                                    <p className="gld-p-rc">For</p>
                                     <img className="gld-cd-icon" src={ASSETS_BASE_URL + '/img/gold-sm.png'}/> <p className="gld-p-rc">Members</p> <span className="gld-rate-lf">₹ {hospital.vip.vip_gold_price+ hospital.vip.vip_convenience_amount}</span><img style={{transform: 'rotate(-90deg)',width: '10px', margin:'0px 10px 0px 0px'}} src={ASSETS_BASE_URL + '/img/customer-icons/dropdown-arrow.svg'}/>
                                </div>
                            :''
                            }
                            {
                                hospital.insurance && hospital.insurance.is_insurance_covered && hospital.insurance.is_user_insured && 
                                parseInt(hospital.discounted_price) <= hospital.insurance.insurance_threshold_amount ? '' 
                                :hospital.enabled_for_cod && !hospital.enabled_for_prepaid
                                ?hospital.cod_deal_price && hospital.cod_deal_price !== hospital.mrp
                                    ?<p className="cstm-cpn">{parseInt(((hospital.mrp - hospital.cod_deal_price) / hospital.mrp) * 100)}% Off
                                        <span><br />(includes Coupon)</span>
                                    </p>
                                    :''
                                :hospital.enabled_for_online_booking && hospital.discounted_price < hospital.mrp ?
                                    <p className="cstm-cpn">{parseInt(((hospital.mrp - hospital.discounted_price) / hospital.mrp) * 100)}% Off
                                        {
                                            hospital.agreed_price != hospital.discounted_price ?
                                                <span><br />(includes Coupon)</span> : ''
                                        }
                                    </p> : ''
                            }

                            {
                                hospital.insurance && hospital.insurance.is_insurance_covered && hospital.insurance.is_user_insured && parseInt(hospital.discounted_price) <=hospital.insurance.insurance_threshold_amount?
                                <div className="ins-val-bx-opd">Covered Under Insurance</div>
                                : ''
                            }
                            {/*
                                <div className="dtl-cnslt-fee pb-list">
                                    <div className="clearfix">
                                        {
                                            STORAGE.checkAuth() || hospital.discounted_price < 100 || (false && this.props.selectedClinic == hospital.hospital_id && this.props.selectedDoctorProcedure[id] && this.props.selectedDoctorProcedure[id][hospital.hospital_id] && this.props.selectedDoctorProcedure[id][hospital.hospital_id].categories) ?
                                                ''
                                                : enabled_for_online_booking ?
                                                    <span className="signup-off-doc" style={{ float: 'right' }} >+ &#8377; 100 OFF <b>on Signup</b> </span>
                                                    : ''
                                        }
                                    </div>
                                </div>
                            */}
                            <div className="address-bg-color">
                                <div className="row no-gutters">
                                    <div className="col-10">
                                        <div className="add-content">
                                            <span className="add-span">Address:</span>
                                            <h4 className="fw-500" style={{ fontSize: 14 }}>{hospital.address}</h4>
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
                                    <div className="col-2">
                                        <a href={`https://www.google.com/maps/search/?api=1&query=${hospital.lat},${hospital.long}`} style={{ float: 'right', cursor: 'pointer' }} target="_blank">
                                            <img style={{ width: "35px", height: "35px", cursor: 'pointer' }} src={ASSETS_BASE_URL + "/img/customer-icons/map-icon.png"} className="img-fluid" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {
                                false && this.props.selectedClinic != hospital.hospital_id && (this.props.selectedDoctorProcedure[id] && this.props.selectedDoctorProcedure[id][hospital.hospital_id]) && (this.props.selectedDoctorProcedure[id][hospital.hospital_id].selectedProcedures > 0 || this.props.selectedDoctorProcedure[id][hospital.hospital_id].unselectedProcedures > 0)
                                    ? <p>Treatments Available {`(${this.props.selectedDoctorProcedure[id][hospital.hospital_id].unselectedProcedures + this.props.selectedDoctorProcedure[id][hospital.hospital_id].selectedProcedures})`}</p>
                                    : ''
                            }

                            {
                                false && this.props.is_procedure ?
                                    this.props.selectedDoctorProcedure[id] && this.props.selectedDoctorProcedure[id][hospital.hospital_id] && this.props.selectedDoctorProcedure[id][hospital.hospital_id].selectedProcedures >= 0
                                        ? ''
                                        : <p className="select-bnr-dsn">Selected treatment not available</p>
                                    : ''
                            }

                            {
                                false && this.props.selectedClinic == hospital.hospital_id && this.props.selectedDoctorProcedure[id] && this.props.selectedDoctorProcedure[id][hospital.hospital_id] && this.props.selectedDoctorProcedure[id][hospital.hospital_id].categories ?
                                    <div className="procedure-checkboxes remove-bg-color">
                                        <div className="dtl-cnslt-fee pb-list ofr-mrngbtm">

                                            <div className="clearfix">
                                                {
                                                    STORAGE.checkAuth() || hospital.discounted_price < 100 ?
                                                        ''
                                                        : <span className="signup-off-doc" style={{ float: 'right' }} >+ &#8377; 100 OFF <b>on Signup</b> </span>
                                                }
                                            </div>
                                        </div>
                                        <div className="dtl-cnslt-fee pb-list cnslt-fee-style">
                                            <div className="clearfix">
                                                {
                                                    hospital.enabled_for_online_booking ?
                                                        <span className="test-price txt-ornage">₹ {hospital.discounted_price}
                                                            {
                                                                parseInt(hospital.discounted_price) == parseInt(hospital.mrp)
                                                                    ? ''
                                                                    : <span className="test-mrp">₹ {hospital.mrp}</span>
                                                            }
                                                        </span>
                                                        : hospital.mrp && hospital.mrp != 0 ?
                                                            <span className="test-price txt-ornage">₹ {hospital.mrp}</span> : ''
                                                }
                                                <span className="fw-500 test-name-item">Consultation Fee</span>
                                            </div>
                                        </div>

                                        <h4 style={{ fontSize: '14px' }} className="procedure-out-heading-font">Treatment(s) selected:
                                         {/* <span>{this.props.selectedDoctorProcedure[id][hospital.hospital_id].categories_name.join('|')}</span> */}
                                        </h4>
                                        <div className="insurance-checkboxes">
                                            <ul className="procedure-list">
                                                {
                                                    Object.values(this.props.selectedDoctorProcedure[id][hospital.hospital_id].categories).map((procedure) => {

                                                        return procedure.filter(x => x.is_selected).map((category, i) => {

                                                            return <li key={i}>
                                                                <label className="procedure-check ck-bx" htmlFor={`${category.procedure_id}_hos${category.hospital_id}`}>{category.procedure_name}
                                                                    <input type="checkbox" checked={true} id={`${category.procedure_id}_hos${category.hospital_id}`} name="fruit-1" value="" hospital={hospital.hospital_id} onChange={this.procedurePopUp.bind(this, category.hospital_id)} />
                                                                    <span className="checkmark">
                                                                    </span>
                                                                </label>
                                                                {/* <div>
                                                                    <input type="checkbox" checked={true} className="ins-chk-bx" id={`${category.procedure_id}_hos${category.hospital_id}`} name="fruit-1" value="" hospital={hospital.hospital_id} onChange={this.procedurePopUp.bind(this, category.hospital_id)} /><label htmlFor={`${category.procedure_id}_hos${category.hospital_id}`}>{category.procedure_name}</label>
                                                                </div> */}
                                                                {
                                                                    hospital.enabled_for_online_booking ?
                                                                        <p className="pr-prices">₹ {category.discounted_price}<span className="pr-cut-price">₹ {category.mrp}</span></p>
                                                                        :
                                                                        <p className="pr-prices">₹ {category.mrp}</p>
                                                                }
                                                            </li>

                                                        })

                                                    })
                                                }
                                                {
                                                    this.props.selectedClinic == hospital.hospital_id && this.props.selectedDoctorProcedure[id][hospital.hospital_id].selectedProcedures + this.props.selectedDoctorProcedure[id][hospital.hospital_id].unselectedProcedures > 1
                                                        ? this.state.vieMoreProcedures
                                                            ? <ProcedurePopup toggle={this.toggle.bind(this, 'vieMoreProcedures')} hospital_id={this.state.selectedId} doctor_id={id}  {...this.props} data={this.props.selectedDoctorProcedure[id][this.state.selectedId].categories} hospitalEnable={hospital.enabled_for_online_booking} />
                                                            : this.props.selectedDoctorProcedure[id][hospital.hospital_id].selectedProcedures + this.props.selectedDoctorProcedure[id][hospital.hospital_id].unselectedProcedures != this.props.selectedDoctorProcedure[id][hospital.hospital_id].selectedProcedures ? <button className="pr-plus-add-btn" onClick={this.procedurePopUp.bind(this, hospital.hospital_id)}>
                                                                + {this.props.selectedDoctorProcedure[id][hospital.hospital_id].unselectedProcedures} more
                                            </button> : ''
                                                        : ''
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    : ''
                            }

                        </div>

                    })
                }
            </div>
        );
    }
}

export default ClinicSelector