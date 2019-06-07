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

    bookNowClicked(id, url, hospital_id, e) {
        //always clear selected time at doctor profile
        let slot = { time: {} }
        this.props.selectOpdTimeSLot(slot, false)

        let data = {
            'Category': 'ConsumerApp', 'Action': 'OpdSearchBookNowClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'opd-book-now-clicked', 'selectedId': id
        }
        GTM.sendEvent({ data: data })

        let { procedure_ids } = this.trackingEventsBookNow(id)
        this.props.saveProfileProcedures('', '', procedure_ids, true)
        if(url){
            this.props.history.push(`/${url}/booking?doctor_id=${id}&hospital_id=${hospital_id}`)
        } else {
            this.props.history.push(`/opd/doctor/${id}/${hospital_id}/bookdetails`)
        }
    }

    trackingEventsBookNow(id) {
        let Distance = ''

        if (this.props.details && this.props.details.distance) {
            Distance = (Math.round(this.props.details.distance * 10) / 10).toFixed(1);
        }

        let data = {
            'Category': 'ConsumerApp', 'Action': 'DoctorSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-selected', 'selectedId': id
        }
        GTM.sendEvent({ data: data });

        let category_ids = this.props.commonSelectedCriterias.filter(x => x.type == 'procedures_category').map(x => x.id).join(',')
        let procedure_ids = this.props.commonSelectedCriterias.filter(x => x.type == 'procedures').map(x => x.id).join(',')
        let condition_ids = this.props.commonSelectedCriterias.filter(x => x.type == 'condition').map(x => x.id).join(',')
        let specialization_ids = this.props.commonSelectedCriterias.filter(x => x.type == 'speciality').map(x => x.id).join(',')
        data = {
            'Category': 'ConsumerApp', 'Action': 'DoctorRankInSearch', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-rank-in-search', 'Rank': this.props.rank + 1, 'DoctorSearchCount': this.props.count, 'specializations': specialization_ids, 'conditions': condition_ids, 'procedures': procedure_ids, 'procedure_category': category_ids, 'Distance': Distance
        }
        GTM.sendEvent({ data: data })

        return ({ category_ids, procedure_ids })

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
            let { discounted_price, distance, is_license_verified, deal_price, mrp, general_specialization, enabled_for_online_booking } = doctor

            distance = (Math.round(distance * 10) / 10).toFixed(1)
            let discount = 0
            if (mrp != 0 && discounted_price != 0) {
                discount = 100 - Math.round((discounted_price * 100) / mrp)
            }

            let is_procedure = false
            let selectedCount = 0
            let unselectedCount = 0
            let finalProcedureDealPrice = discounted_price
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

            if (is_procedure && false) {
                if (finalProcedureMrp != 0 && finalProcedureDealPrice != 0) {
                    discount = 100 - Math.round((finalProcedureDealPrice * 100) / finalProcedureMrp);
                }
            }

            is_procedure = false

            return (

                <div className="filter-card-dl mb-3">
                    <div className="fltr-crd-top-container" style={{ position: 'relative' }}>
                        {
                            is_license_verified ? <span className="clinic-fltr-rtng">Verified</span> : ""
                        }
                        <div className="fltr-lctn-dtls">
                            <p>
                                <img className="fltr-loc-ico" width="12px" height="18px" src={ASSETS_BASE_URL + "/img/new-loc-ico.svg"} />
                                <span>{distance} Km</span>
                            </p>
                        </div>
                        <div className="row no-gutters" style={{ cursor: 'pointer' }} onClick={(e) => {
                            if (doctors && doctors.length == 1) {
                                if (enabled_for_online_booking) {
                                    this.bookNowClicked(doctor.id, doctor.url, hospital_id || '')
                                } else {
                                    this.cardClick(doctor.id, doctor.url, hospital_id, e)
                                }
                            } else {
                                this.toggleSelectDoctor(e)
                            }
                        }}>
                            <div className="col-8">
                                <div className="clinic-fltr-name-dtls">
                                    <a>
                                        <h5 className="fw-500 clinic-fltr-dc-name text-md mrb-10">{hospital_name}</h5>
                                    </a>
                                    <span className="clinic-fltr-loc-txt mrb-10">{address}</span>
                                    <p className="mrb-10">{specialization}</p>
                                    {/* <p className="" style={{ color: '#008000', fontWeight: '500' }}>Open today</p> */}
                                </div>
                                <div className="mrt-20">
                                    {
                                        enabled_for_online_booking && discount ? <p className="fw-500 text-xs" style={{ color: 'red', paddingRight: '2px' }}>*Exclusive discount on clinic rates. Available only on prepaid bookings</p> : ""
                                    }
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="fltr-bkng-section">
                                    {
                                        enabled_for_online_booking && discount ? <span className="filtr-offer ofr-ribbon fw-700">{discount}% OFF</span> : ""
                                    }

                                    {
                                        enabled_for_online_booking?
                                        <p className="fltr-prices">₹ {finalProcedureDealPrice}
                                            {
                                                finalProcedureMrp == finalProcedureDealPrice ? "" : <span className="fltr-cut-price">₹ {finalProcedureMrp}</span>
                                            }
                                        </p>
                                        :<p className="fltr-prices">₹ {finalProcedureMrp}</p>    
                                    }
                                    
                                    <div className="signup-off-container">
                                        {
                                            enabled_for_online_booking && discounted_price != deal_price ? <span className="signup-off-doc-green" style={{ fontSize: 12 }} >Includes coupon discount</span> : ""
                                        }
                                        {
                                            !discounted_price && !is_procedure ?
                                                <span className="filtr-offer ofr-ribbon free-ofr-ribbon fw-700">Free</span> : ''
                                        }
                                    </div>
                                    {
                                        doctors && doctors.length == 1 ? (enabled_for_online_booking ? <button className="fltr-bkng-btn">Book Now</button> : <button className="fltr-cntct-btn" style={{ width: '100%' }}>Contact</button>) : <button className="fltr-bkng-btn">Select Doctor</button>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        doctors && doctors.length >= 2 && this.state.openSelectDoctor ? <div className="showBookTestList">
                            <ul>
                                {
                                    doctors.map((d, x) => {
                                        return <li key={x}>
                                            <p className="showBookTestListImg">
                                                Dr. {d.name}</p>
                                            <div className="doc-price-cont">
                                                {
                                                    !is_procedure ? <p className="doc-price-cutt">₹ {d.discounted_price}
                                                        {
                                                            d.mrp == d.discounted_price ? "" : <span>₹ {d.mrp}</span>
                                                        }
                                                    </p> : ""
                                                }
                                                {
                                                    d.enabled_for_online_booking ? <button style={{ cursor: 'pointer' }} onClick={this.bookNowClicked.bind(this, d.id, d.url, hospital_id || '')} className="showBookTestListBtn">Book Now</button> : <button style={{ cursor: 'pointer' }} onClick={this.cardClick.bind(this, d.id, d.url, hospital_id)} className="showBookTestListBtn contact-small-btn">Contact</button>
                                                }
                                            </div>
                                        </li>
                                    })
                                }
                            </ul>
                        </div> : ""
                    }

                    {
                        doctors && doctors.length && this.state.openSelectDoctor ? <div onClick={this.toggleSelectDoctor.bind(this)} className="filtr-card-footer" style={{ cursor: 'pointer', borderTop: '1px solid #e8e8e8' }}>
                            <div style={{ paddingRight: '8px' }}><p>Hide</p>
                            </div>
                            <div className="text-right acrd-show">
                                <img className="" style={{ margin: '5px' }} src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
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
