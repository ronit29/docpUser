import React from 'react';
import { connect } from 'react-redux';
import InitialsPicture from '../../../commons/initialsPicture'
import GTM from '../../../../helpers/gtm.js'
import STORAGE from '../../../../helpers/storage';

class DoctorProfileCard extends React.Component {
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

    toggleProcedures(test_to_toggle) {/*
        let test = Object.assign({}, test_to_toggle.test)
        test.mrp = test_to_toggle.mrp
        test.deal_price = test_to_toggle.deal_price
        test.extra_test = true
        test.lab_id = this.state.selectedLab

        this.props.toggleDiagnosisCriteria('test', test)*/
    }

    render() {

        let { id, experience_years, gender, hospitals, hospital_count, name, distance, qualifications, thumbnail, experiences, mrp, deal_price, general_specialization, is_live, display_name, url, enabled_for_online_booking, is_license_verified, is_gold, schema } = this.props.details

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

        if (hospitals && hospitals.length) {
            return (

                <div className="filter-card-dl mb-3" onClick={this.cardClick.bind(this, id, url)}>
                {
                    schema ? <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: schema
                    }} />
                    :""
                }
                {
                    is_gold?
                    <img className="gold-card-img" src={ASSETS_BASE_URL + "/img/gold.svg"}/>
                    :''
                }
                    <div className="fltr-crd-top-container">
                        <div className="fltr-lctn-dtls">
                            <p><img className="fltr-loc-ico" width="12px" height="18px" src={ASSETS_BASE_URL + "/img/customer-icons/map-marker-blue.svg"} />
                                <span className="fltr-loc-txt">{hospital.short_address}</span> | <span>{Distance} Km</span></p>
                        </div>
                        <div className="row no-gutters">
                            <div className="col-8">
                                <div className="fltr-crd-img">
                                    <InitialsPicture name={name} has_image={!!thumbnail} className="initialsPicture-ds fltr-initialPicture-ds"><img className="fltr-usr-image img-round" src={thumbnail} /></InitialsPicture>
                                    {is_license_verified ? <span className="fltr-rtng">Verified</span> : ''}
                                    {/* <span className="fltr-sub-rtng">4.5 <img src="/assets/img/customer-icons/star.svg" /></span> */}
                                </div>
                                <div className="fltr-name-dtls">
                                    <a href={url ? `/${url}` : `/opd/doctor/${id}`}>
                                        <h2 style={{fontSize: "16px"}} className="fltr-dc-name">{display_name}</h2>
                                    </a>
                                    <p>{this.getQualificationStr(general_specialization || [])}</p>
                                    {
                                        experience_years ? <p >{experience_years} Years of Experience</p> : ""
                                    }

                                </div>

                            </div>
                            <div className="col-4">
                                <div className="fltr-bkng-section">
                                    {
                                        discount && discount != 0 ?
                                            <span className="filtr-offer ofr-ribbon fw-700">{discount}% Off</span> : ''
                                    }

                                    {
                                        !deal_price ?
                                            <span className="filtr-offer ofr-ribbon free-ofr-ribbon fw-700" >Free Consultation</span> : ''
                                    }

                                    <p className="fltr-prices">

                                        &#x20B9; {deal_price}
                                        {
                                            mrp != deal_price ? <span className="fltr-cut-price">&#x20B9; {mrp}</span> : ""
                                        }
                                    </p>
                                    {
                                        STORAGE.checkAuth()?
                                        ''
                                        :<div className="signup-off-container">
                                            <span className="signup-off-doc">+ &#8377; 100 OFF <b>on Signup</b> </span>
                                        </div>
                                    }

                                    {
                                        enabled_for_online_booking ? <button className="fltr-bkng-btn">Book Now</button> : <button className="fltr-bkng-btn">Contact</button>
                                    }
                                </div>
                            </div>

                            {
                                hospitals[0] && hospitals[0].procedures && hospitals[0].procedures.length?
                                <div className="widget-content pb-details pb-test">
                                    <h4 className="wc-title text-md fw-700">Price List</h4>

                                    <ul className="list pb-list pb-test-list">
                                        {
                                            hospitals[0].procedures.map((procedure, i) => {

                                                return <li key={i + "st"}>
                                                        <label className="ck-bx">
                                                            {procedure.name}
                                                            <input type="checkbox" checked={true} onChange={this.toggleProcedures.bind(this, procedure)} />
                                                            <span className="checkmark" />
                                                        </label>
                                                        <span className="test-price text-md fw-500"><span className="test-mrp">&#8377; {procedure.mrp}</span>&#8377; {procedure.deal_price}</span>
                                                    </li>
                                            })
                                        }
                                    </ul>
                                    <div className="pb-view text-right">
                                        <a href="javascript:;" className="link-text text-md fw-700">View More & Select Tests</a>
                                    </div>
                                </div>
                                :''
                            }
                        </div>
                    </div>
                    <div className="filtr-card-footer">
                        <div>
                            <img src={ASSETS_BASE_URL + "/img/customer-icons/home.svg"} />
                            <p >{hospital.hospital_name}
                                {
                                    hospital_count > 1 ?
                                        <span> &amp; {hospital_count - 1} More </span> : ''
                                }
                            </p>

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
