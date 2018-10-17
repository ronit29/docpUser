import React from 'react';
import { connect } from 'react-redux';
import InitialsPicture from '../../../commons/initialsPicture'
import GTM from '../../../../helpers/gtm.js'

class DoctorProfileCard extends React.Component {
    constructor(props) {
        super(props)
    }

    cardClick(id, url, e) {

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

        let { id, experience_years, gender, hospitals, hospital_count, name, distance, qualifications, thumbnail, experiences, mrp, deal_price, general_specialization, is_live, display_name, url } = this.props.details

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


        if (hospitals && hospitals.length) {
            return (
                <a href={url ? `/${url}` : `/opd/doctor/${id}`} className="dp-dr-search-card-link mrb-20" onClick={this.cardClick.bind(this, id, url)}>
            
                     <div className="dp-dr-search-card">
                        <div className="dp-dr-search-card-div">

                            <div className="fltr-lctn-dtls">
                                <p>
                                    <img className="fltr-loc-ico" width="12px" height="18px" src={ASSETS_BASE_URL + "/img/customer-icons/map-marker-blue.svg"} />
                                    <span className="fltr-loc-txt">{hospital.short_address}</span> | <span>{Distance} Km</span>
                                </p>
                            </div>


                            <div className="dp-dr-search-card-content clearfix">

                                <div className="dp-dr-search-card-img">
                                    <InitialsPicture name={name} has_image={!!thumbnail} className="initialsPicture-ds"><img className="img-fluid img-round" src={thumbnail} /></InitialsPicture>
                                </div>

                                <div className="dp-dr-search-card-details">
                                    <p className="fw-500 dp-dr-exp-details-1" style={{ fontSize: 16 }}>{display_name}</p>
                                    <p className="dp-dr-exp-details-1">{this.getQualificationStr(general_specialization || [])}</p>
                                    {
                                        experience_years ? <p className="fw-500 dp-dr-exp-details-2">{experience_years} Years of Experience</p> : ""
                                    }
                                    <p className="fw-500 dp-dr-exp-details-2">{expStr}</p>
                                </div>
                            </div>
                            <div className="dp-dr-search-card-content-2 clearfix mrt-20">
                                <p className="fw-700 dp-dr-new-price"><span className="dp-dr-old-price">&#8377; {mrp}</span> &#8377; {deal_price}</p>
                            </div>
                            <div className="dp-dr-search-card-content-3 clearfix">
                                {
                                    !deal_price ?
                                        <div className="dp-dr-free-label">
                                            <p>Free Consultation</p>
                                        </div> : ''
                                }
                                <button className="dp-dr-card-btn text-center fw-500">Book Now</button>
                            </div>
                        </div>
                        <div className="dp-dr-search-card-footer mrt-20">
                            <div className="dp-dr-card-footer-div clearfix">
                                <div className="text-left clearfix" style={{ float: 'left' }}>
                                    <img className="dp-dr-card-footer-div-img" style={{ float: 'left' }} src={ASSETS_BASE_URL + "/img/customer-icons/home.svg"} />
                                    <p className="fw-500 dp-dr-card-footer-div-text" style={{ marginLeft: 22 }} >{hospital.hospital_name}
                                        {
                                            hospital_count > 1 ?
                                                <span> &amp; {hospital_count - 1} More </span> : ''
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="dp-dr-card-footer-div clearfix">
                                <div className="text-left clearfix" style={{ float: 'right' }}>
                                    <img className="dp-dr-card-footer-div-img" style={{ float: 'left' }} src={ASSETS_BASE_URL + "/img/customer-icons/clock-black.svg"} />
                                    <p className="fw-500 dp-dr-card-footer-div-text" style={{ marginLeft: 22 }} >{Object.keys(hospital.timings).length > 0 ? hospital.timings[Object.keys(hospital.timings)[0]][0] : ""}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </a>
            );
        } else {
            return ""
        }
    }
}


export default DoctorProfileCard
