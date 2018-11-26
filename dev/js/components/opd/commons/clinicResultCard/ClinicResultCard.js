import React from 'react';
import GTM from '../../../../helpers/gtm.js'
import STORAGE from '../../../../helpers/storage';
import ProcedurePopup from '../PopUp'

class ClinicResultCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    cardClick(id, url, hospital_id, e) {
        e.stopPropagation()
        let data = {
            'Category': 'ConsumerApp', 'Action': 'DoctorSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-selected', 'selectedId': id
        }
        GTM.sendEvent({ data: data })

        data = {
            'Category': 'ConsumerApp', 'Action': 'DoctorRankInSearch', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-rank-in-search', 'Rank': this.props.rank + 1
        }
        GTM.sendEvent({ data: data })

        if (e.ctrlKey || e.metaKey) {

        } else {
            e.preventDefault();

            let category_ids = this.props.commonSelectedCriterias.filter(x => x.type == 'procedures_category').map(x => x.id)
            let procedure_ids = this.props.commonSelectedCriterias.filter(x => x.type == 'procedures').map(x => x.id)


            if (url) {
                //this.props.history.push(`/${url}`)
                if (category_ids.length || procedure_ids.length) {
                    this.props.history.push(`/${url}?hospital_id=${hospital_id}&is_procedure=true&category_ids=${category_ids}&procedure_ids=${procedure_ids}`)
                } else {
                    this.props.history.push(`/${url}?hospital_id=${hospital_id}`)
                }
            } else {
                //this.props.history.push(`/opd/doctor/${id}`)
                if (category_ids.length || procedure_ids.length) {
                    this.props.history.push(`/opd/doctor/${id}?hospital_id=${hospital_id}&is_procedure=true&category_ids=${category_ids}&procedure_ids=${procedure_ids}`)
                } else {
                    this.props.history.push(`/opd/doctor/${id}?hospital_id=${hospital_id}`)
                }
            }
        }
    }

    bookNow(id, e) {
        e.stopPropagation()
        // this.props.history.push(`/doctorprofile/${id}/availability`)
    }

    getQualificationStr(qualificationSpecialization) {
        return qualificationSpecialization.reduce((str, curr, i) => {
            str += `${curr.name}`
            if (i < qualificationSpecialization.length - 1) str += `, `;
            return str
        }, "")
    }

    toggle(which, fetchResults = false, procedure_ids = []) {

        this.setState({ [which]: !this.state[which] })
        if (fetchResults) {
            if (procedure_ids.length) {
                this.props.saveCommonProcedures(procedure_ids)
                this.props.mergeOPDState('')
                this.props.resetProcedureURl()
            }
        }
    }

    render() {

        let { id, experience_years, gender, hospitals, hospital_count, name, distance, qualifications, thumbnail, experiences, mrp, deal_price, general_specialization, is_live, display_name, url, enabled_for_online_booking, is_license_verified } = this.props.details

        let hospital = (hospitals && hospitals.length) ? hospitals[0] : {}
        let expStr = ""

        if (experiences && experiences.length) {
            expStr += "EXP - "
            experiences.map((exp, i) => {
                expStr += exp.hospital
                if (i < experiences.length - 1) expStr += ', ';
            })
        }

        var Distance = (Math.round(distance * 10) / 10).toFixed(1);
        if (mrp != 0 && deal_price != 0) {
            var discount = 100 - Math.round((deal_price * 100) / mrp);
        }

        let is_procedure = false
        if (hospitals && hospitals.length) {
            let selectedCount = 0
            let unselectedCount = 0
            let finalProcedureDealPrice = deal_price
            let finalProcedureMrp = mrp
            hospitals[0].procedure_categories.map((x) => {
                is_procedure = true
                x.procedures.filter(x => x.is_selected).map((x) => {
                    finalProcedureDealPrice += x.deal_price
                    finalProcedureMrp += x.mrp
                    selectedCount++
                })

                unselectedCount += x.procedures.filter(x => !x.is_selected).length
            })

            if (is_procedure) {
                if (finalProcedureMrp != 0 && finalProcedureDealPrice != 0) {
                    discount = 100 - Math.round((finalProcedureDealPrice * 100) / finalProcedureMrp);
                }
            }
            return (

                <div className="filter-card-dl mb-3">
                    <div className="fltr-crd-top-container" style={{ position: 'relative' }}>
                        {is_license_verified ? <span className="clinic-fltr-rtng">Verified</span> : ''}
                        <div className="fltr-lctn-dtls">
                            <p>
                                <img className="fltr-loc-ico" width="12px" height="18px" src={ASSETS_BASE_URL + "/img/customer-icons/map-marker-blue.svg"} />
                                <span>{Distance} Km</span>
                            </p>
                        </div>
                        <div className="row no-gutters" style={{cursor:'pointer'}} onClick={this.cardClick.bind(this, id, url, hospital.hospital_id || '')}>
                            <div className="col-8">
                                <div className="clinic-fltr-name-dtls">
                                    <a href={url ? `/${url}` : `/opd/doctor/${id}`}>
                                        <h5 className="fw-500 clinic-fltr-dc-name text-md mrb-10">{hospital.hospital_name}</h5>
                                    </a>
                                    <span className="clinic-fltr-loc-txt mrb-10">{hospital.short_address}</span>
                                    <p className="mrb-10">{this.getQualificationStr(general_specialization || [])}</p>
                                    {/* <p className="fw-500 clinic-status mrb-10">Open Today</p> */}
                                </div>
                                {
                                    discount && discount != 0 && deal_price && !!!STORAGE.checkAuth() ?
                                        <div className="mrt-20">
                                            <p className="fw-500 text-xs" style={{ color: 'red' }}>*Exclusive discount. Available only on prepaid bookings</p>
                                        </div> : ''
                                }
                            </div>
                            <div className="col-4">
                                <div className="fltr-bkng-section">
                                    {
                                        discount && discount != 0 ?
                                            <span className="filtr-offer ofr-ribbon fw-700">{discount}% Off
                                                {
                                                    discount && discount != 0 && deal_price && !!!STORAGE.checkAuth() ?
                                                        <span>*</span> : ''

                                                }
                                            </span> : ''
                                    }

                                    {
                                        !deal_price && !is_procedure?
                                            <span className="filtr-offer ofr-ribbon free-ofr-ribbon fw-700">Free</span> : ''
                                    }

                                    <p className="fltr-prices">
                                        &#x20B9; {is_procedure ? finalProcedureDealPrice : deal_price}
                                        {
                                            is_procedure
                                                ? finalProcedureMrp != finalProcedureDealPrice ? <span className="fltr-cut-price">&#x20B9; {finalProcedureMrp}</span> : ""
                                            : mrp != deal_price ? <span className="fltr-cut-price">&#x20B9; {mrp}</span> : ""
                                        }
                                    </p>

                                    {
                                        STORAGE.checkAuth() || deal_price < 100 ?
                                            ''
                                            : <div className="signup-off-container">
                                                <span className="signup-off-doc">+ &#8377; 100 OFF <b>on Signup</b> </span>
                                            </div>
                                    }

                                    {
                                        enabled_for_online_booking ? <button className="fltr-bkng-btn">Book Now</button> : <button className="fltr-bkng-btn">Contact</button>
                                    }
                                </div>
                            </div>
                        </div>

                        {
                            hospitals[0] && hospitals[0].procedure_categories && hospitals[0].procedure_categories.length ?
                                <div className="procedure-checkboxes">
                                    <div className="dtl-cnslt-fee pb-list cnslt-fee-style">
                                        <div className="clearfix">
                                            <span className="test-price txt-ornage">₹ {deal_price}<span className="test-mrp">₹ {mrp}</span></span><span className="fw-500 test-name-item">Consultation Fee</span>
                                        </div>
                                    </div>
                                    <h4 style={{ fontSize: '14px' }} className="procedure-out-heading-font">Treatment(s) <span>{this.props.selectedCriterias.filter(x => x.type == 'procedures_category').length > 0 ? ` in ${this.props.selectedCriterias.filter(x => x.type == 'procedures_category').map(x => x.name).join(' | ')}` : 'Selected'} </span></h4>
                                    <div className="insurance-checkboxes">
                                        <ul className="procedure-list">
                                            {
                                                hospitals[0].procedure_categories.map((category) => {


                                                    return category.procedures.filter(x => x.is_selected).map((procedure, i) => {

                                                        return <li key={i}>
                                                            <label className="procedure-check ck-bx" htmlFor={`${procedure.procedure.id}_doc_${id}`}>{procedure.procedure.name}
                                                                <input type="checkbox" checked={true} className="proce-input" id={`${procedure.procedure.id}_doc_${id}`} name="fruit-1" value="" onChange={() => this.setState({ vieMoreProcedures: true })} />
                                                                <span className="checkmark">
                                                                </span>
                                                            </label>
                                                            {/* <div>
                                                                <input type="checkbox" checked={true} className="ins-chk-bx" id={procedure.procedure.id} name="fruit-1" value="" onChange={() => this.setState({ vieMoreProcedures: true })} />
                                                                <label htmlFor={procedure.procedure.id}>{procedure.procedure.name}</label>
                                                            </div> */}
                                                            <p className="pr-prices">₹ {procedure.deal_price}<span className="pr-cut-price">₹ {procedure.mrp}</span></p>
                                                        </li>

                                                    })
                                                })
                                            }
                                            {
                                                this.state.errorMessage ?
                                                    <p>Please Select at least one Procedure</p>
                                                    : ''
                                            }
                                            {
                                                unselectedCount + selectedCount >= 1
                                                    ? this.state.vieMoreProcedures
                                                        ? <ProcedurePopup toggle={this.toggle.bind(this, 'vieMoreProcedures')} details={this.props} doctor_id={this.props.details.id} data={hospitals[0]} />
                                                        : unselectedCount + selectedCount != selectedCount ? <button className="pr-plus-add-btn" onClick={() => this.setState({ vieMoreProcedures: true })}>
                                                            + {unselectedCount} more
                                            </button> : ''
                                                    : ''
                                            }
                                        </ul>
                                    </div>
                                </div>
                                : ''
                        }
                    </div>
                    {/* <div className="filtr-card-footer">
                        <div>
                            <img src={ASSETS_BASE_URL + "/img/customer-icons/doctor.svg"} style={{width: 19}} />
                            <div style={{ display: 'inline-block' }}>
                                <p style={{ display: 'block' }}>{display_name}</p>
                                {
                                    experience_years ? <p style={{ display: 'block' }}>{experience_years} Years of Experience</p> : ""
                                }
                            </div>
                        </div>
                        <div className="text-right">
                            <img src={ASSETS_BASE_URL + "/img/customer-icons/clock-black.svg"} />
                            <p>
                                <span>{Object.keys(hospital.timings).length > 0 ? hospital.timings[Object.keys(hospital.timings)[0]][0] : ""}</span>
                            </p>
                        </div>
                    </div> */}
                </div>
            );
        } else {
            return ""
        }
    }
}


export default ClinicResultCard
