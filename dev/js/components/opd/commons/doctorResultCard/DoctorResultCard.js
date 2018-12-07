import React from 'react';
import { connect } from 'react-redux';
import InitialsPicture from '../../../commons/initialsPicture'
import GTM from '../../../../helpers/gtm.js'
import STORAGE from '../../../../helpers/storage';
import ProcedurePopup from '../PopUp'


class DoctorProfileCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMessage: false
        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
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
                if (category_ids.length || procedure_ids.length) {
                    this.props.history.push(`/${url}?hospital_id=${hospital_id}&is_procedure=true&category_ids=${category_ids}&procedure_ids=${procedure_ids}&hide_search_data=true`)
                } else {
                    this.props.history.push(`/${url}?hospital_id=${hospital_id}&hide_search_data=true`)
                }
            } else {
                if (category_ids.length || procedure_ids.length) {
                    this.props.history.push(`/opd/doctor/${id}?hospital_id=${hospital_id}&is_procedure=true&category_ids=${category_ids}&procedure_ids=${procedure_ids}&hide_search_data=true`)
                } else {
                    this.props.history.push(`/opd/doctor/${id}?hospital_id=${hospital_id}&hide_search_data=true`)
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

    claimButtonClick(e) {
        e.stopPropagation();

        let data = {
            'Category': 'ConsumerApp', 'Action': 'ClaimButtomClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'claim-buttom-clicked', 'selectedId': this.props.details.id
        }
        GTM.sendEvent({ data: data })

        this.props.history.push('/doctorsignup');
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
        let { id, experience_years, gender, hospitals, hospital_count, name, distance, qualifications, thumbnail, experiences, mrp, deal_price, general_specialization, is_live, display_name, url, is_license_verified, is_gold, schema } = this.props.details

        let enabled_for_online_booking = true
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

        try {
            if (schema) {
                schema = JSON.stringify(schema)
            }
        } catch (e) {
            schema = ""
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

            enabled_for_online_booking = hospitals[0].enabled_for_online_booking

            return (

                <div className="filter-card-dl mb-3" >
                    {
                        schema ? <script type="application/ld+json" dangerouslySetInnerHTML={{
                            __html: schema
                        }} />
                            : ""
                    }
                    {
                        is_gold ?
                            <img className="gold-card-img" src={ASSETS_BASE_URL + "/img/gold.svg"} />
                            : ''
                    }
                    <div className="fltr-crd-top-container">
                        {
                            this.props.seoFriendly ?
                                <div className="fltr-lctn-dtls" style={{ paddingLeft: 45 }}>
                                    <p><img className="fltr-loc-ico" width="12px" height="18px" src={ASSETS_BASE_URL + "/img/customer-icons/map-marker-blue.svg"} />
                                        <span>{hospital.short_address}</span> {hospital.short_address ? " | " : ""}<span>{Distance} Km</span>
                                    </p>
                                </div>
                                : <div className="fltr-lctn-dtls">
                                    <p><img className="fltr-loc-ico" width="12px" height="18px" src={ASSETS_BASE_URL + "/img/customer-icons/map-marker-blue.svg"} />
                                        <span className="fltr-loc-txt">{hospital.short_address}</span> {hospital.short_address ? " | " : ""}<span>{Distance} Km</span>
                                    </p>
                                </div>
                        }
                        <div className="row no-gutters" style={{ cursor: 'pointer' }} onClick={this.cardClick.bind(this, id, url, hospital.hospital_id || '')}>
                            <div className="col-3" style={{ paddingRight: 4 }}>
                                <div className="fltr-crd-img text-center">
                                    <InitialsPicture name={name} has_image={!!thumbnail} className="initialsPicture-ds fltr-initialPicture-ds"><img className="fltr-usr-image img-round" src={thumbnail} alt={display_name} title={display_name} /></InitialsPicture>
                                    {is_license_verified ? <span className="fltr-rtng">Verified</span> : ''}
                                    {/* <span className="fltr-sub-rtng">4.5 <img src="/assets/img/customer-icons/star.svg" /></span> */}
                                </div>
                                {
                                    enabled_for_online_booking ? '' : <button onClick={(e) => this.claimButtonClick(e)} className="fltr-bkng-btn claim-btn text-center" style={{ marginTop: 10 }}>Claim this profile</button>
                                }
                            </div>
                            <div className="col-9">
                                <div className="row no-gutters">
                                    <div className="col-12">
                                        <a href={url ? `/${url}` : `/opd/doctor/${id}`} onClick={(e) => e.preventDefault()}>
                                            <h2 style={{ fontSize: 16 }} className="fltr-dc-name">{display_name}</h2>
                                        </a>
                                    </div>
                                </div>
                                <div className="row no-gutters">
                                    <div className="col-6 fltr-doc-details">
                                        <h3 className="fw-500">{this.getQualificationStr(general_specialization || [])}</h3>
                                        {
                                            experience_years ? <p className="fw-500">{experience_years} Years of Experience</p> : ""
                                        }
                                    </div>
                                    <div className="col-6">
                                        <div className="fltr-bkng-section">
                                            {
                                                discount && discount != 0 ?
                                                    <span className="filtr-offer ofr-ribbon fw-700">{discount}% Off</span> : ''
                                            }

                                            {
                                                !deal_price && !is_procedure ?
                                                    <span className="filtr-offer ofr-ribbon free-ofr-ribbon fw-700">Free Consultation</span> : ''
                                            }

                                            <p className="fltr-prices" style={{ marginTop: 4 }}>
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
                                                    : enabled_for_online_booking ?
                                                        <div className="signup-off-container">
                                                            <span className="signup-off-doc">+ &#8377; 100 OFF <b>on Signup</b> </span>
                                                        </div>
                                                        : ''
                                            }

                                            {
                                                enabled_for_online_booking ? <button className="fltr-bkng-btn">Book Now</button> : <button className="fltr-cntct-btn">Contact</button>
                                            }
                                        </div>
                                    </div>
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
                    <div className="filtr-card-footer">
                        <div>
                            <img src={ASSETS_BASE_URL + "/img/customer-icons/home.svg"} />
                            <h3 className="mrb-0">{hospital.hospital_name}
                                {
                                    hospital_count > 1 ?
                                        <span> &amp; {hospital_count - 1} More </span> : ''
                                }
                            </h3>

                        </div>
                        <div className="text-right">
                            <img src={ASSETS_BASE_URL + "/img/customer-icons/clock-black.svg"} />
                            <p>
                                <span>{Object.keys(hospital.timings).length > 0 ? hospital.timings[Object.keys(hospital.timings)[0]][0] : ""}</span>
                            </p>
                        </div>
                    </div>
                </div>

            );
        } else {
            return ""
        }
    }
}


export default DoctorProfileCard
