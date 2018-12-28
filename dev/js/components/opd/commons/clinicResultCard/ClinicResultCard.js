import React from 'react';
import GTM from '../../../../helpers/gtm.js'
import STORAGE from '../../../../helpers/storage';
import ProcedurePopup from '../PopUp'

class ClinicResultCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openSelectDoctor: false
        }
    }

    toggleSelectDoctor() {
        this.setState({ openSelectDoctor: !this.state.openSelectDoctor })
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

    getQualificationStr(qualificationSpecialization) {
        return qualificationSpecialization.reduce((str, curr, i) => {
            str += `${curr.name}`
            if (i < qualificationSpecialization.length - 1) str += `, `;
            return str
        }, "")
    }


    render() {
        let { hospital_id, address, hospital_name, doctors, procedure_categories, short_address } = this.props.details
        let specialization = ""
        let { commonSelectedCriterias } = this.props
        if (commonSelectedCriterias && commonSelectedCriterias.length) {
            specialization = commonSelectedCriterias[0].name
        }
        let doctor = (doctors && doctors.length) ? doctors[0] : {}

        if (doctors && doctors.length) {
            let { distance, is_license_verified, deal_price, mrp, general_specialization } = doctor

            distance = (Math.round(distance * 10) / 10).toFixed(1)
            let discount = 0
            if (mrp != 0 && deal_price != 0) {
                discount = 100 - Math.round((deal_price * 100) / mrp)
            }

            let is_procedure = false
            let selectedCount = 0
            let unselectedCount = 0
            let finalProcedureDealPrice = deal_price
            let finalProcedureMrp = mrp
            procedure_categories.map((x) => {
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

                <div class="filter-card-dl mb-3">
                    <div class="fltr-crd-top-container" style={{ position: 'relative' }}>
                        {
                            is_license_verified ? <span class="clinic-fltr-rtng">Verified</span> : ""
                        }
                        <div class="fltr-lctn-dtls">
                            <p>
                                <img class="fltr-loc-ico" width="12px" height="18px" src="/assets/img/customer-icons/map-marker-blue.svg" />
                                <span>{distance} Km</span>
                            </p>
                        </div>
                        <div class="row no-gutters" style={{ cursor: 'pointer' }}>
                            <div class="col-8">
                                <div class="clinic-fltr-name-dtls">
                                    <a href="/dr-rana-saleem-ahmed-dentist-in-sector-44-gurgaon-dpp">
                                        <h5 class="fw-500 clinic-fltr-dc-name text-md mrb-10">{hospital_name}</h5>
                                    </a>
                                    <span class="clinic-fltr-loc-txt mrb-10">{address}</span>
                                    <p class="mrb-10">{specialization}</p>
                                    {/* <p class="" style={{ color: '#008000', fontWeight: '500' }}>Open today</p> */}
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="fltr-bkng-section">
                                    {
                                        discount ? <span class="filtr-offer ofr-ribbon fw-700">{discount}% OFF</span> : ""
                                    }

                                    <p class="fltr-prices">₹ {finalProcedureDealPrice}<span class="fltr-cut-price">₹ {finalProcedureMrp}</span>
                                    </p>
                                    {
                                        doctors && doctors.length == 1 ? <button onClick={this.cardClick.bind(this, doctor.id, doctor.url, hospital_id)} class="fltr-bkng-btn">Book Now</button> : <button onClick={this.toggleSelectDoctor.bind(this)} class="fltr-bkng-btn">Select Doctor</button>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        doctors && doctors.length >= 2 && this.state.openSelectDoctor ? <div class="showBookTestList">
                            <ul>
                                {
                                    doctors.map((d, x) => {
                                        return <li key={x}>
                                            <p class="showBookTestListImg">
                                                Dr. {d.name}</p>
                                            <div className="doc-price-cont">
                                                <p className="doc-price-cutt">₹ {d.deal_price} <span>₹ {d.mrp}</span></p><button style={{ cursor: 'pointer' }} onClick={this.cardClick.bind(this, d.id, d.url, hospital_id)} class="showBookTestListBtn">Book Now</button>
                                            </div>
                                        </li>
                                    })
                                }
                            </ul>
                        </div> : ""
                    }

                    {
                        doctors && doctors.length && this.state.openSelectDoctor ? <div onClick={this.toggleSelectDoctor.bind(this)} class="filtr-card-footer">
                            <div style={{ paddingRight: '8px' }}><p>Hide</p>
                            </div>
                            <div class="text-right acrd-show">
                                <img class="" src="/assets/img/customer-icons/dropdown-arrow.svg" />
                            </div>
                        </div> : ""
                    }

                </div>
            )
        } else {
            return ""
        }
    }
}


export default ClinicResultCard
