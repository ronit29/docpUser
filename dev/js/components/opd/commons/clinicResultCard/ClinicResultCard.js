import React from 'react';
import GTM from '../../../../helpers/gtm.js'
import STORAGE from '../../../../helpers/storage';

class ClinicResultCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    cardClick(id, url, e) {
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
            if (url) {
                this.props.history.push(`/${url}`)
            } else {
                this.props.history.push(`/opd/doctor/${id}`)
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

        if (hospitals && hospitals.length) {
            return (

                <div className="filter-card-dl mb-3" onClick={this.cardClick.bind(this, id, url)}>
                    <div className="fltr-crd-top-container" style={{ position: 'relative' }}>
                        {is_license_verified ? <span className="clinic-fltr-rtng">Verified</span> : ''}
                        <div className="fltr-lctn-dtls">
                            <p>
                                <img className="fltr-loc-ico" width="12px" height="18px" src={ASSETS_BASE_URL + "/img/customer-icons/map-marker-blue.svg"} />
                                <span>{Distance} Km</span>
                            </p>
                        </div>
                        <div className="row no-gutters">
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
                                        <div className="mrt-10" style={{ position: 'absolute', bottom: 4 }}>
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
                                        !deal_price ?
                                            <span className="filtr-offer ofr-ribbon free-ofr-ribbon fw-700">Free</span> : ''
                                    }

                                    <p className="fltr-prices">
                                        &#x20B9; {deal_price}
                                        {
                                            mrp != deal_price ? <span className="fltr-cut-price">&#x20B9; {mrp}</span> : ""
                                        }
                                    </p>

                                    {
                                        STORAGE.checkAuth() ?
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
