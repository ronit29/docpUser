import React from 'react';
import { connect } from 'react-redux';
import InitialsPicture from '../../../commons/initialsPicture'

class DoctorProfileCard extends React.Component {
    constructor(props) {
        super(props)
    }

    cardClick(id, e) {
        this.props.history.push(`/opd/doctor/${id}`)
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

        let { id, experience_years, gender, hospitals, hospital_count, name, qualifications, thumbnail, experiences, mrp, deal_price, general_specialization, is_live } = this.props.details

        let hospital = hospitals[0]
        let expStr = ""

        if (experiences && experiences.length) {
            expStr += "Ex - "
            experiences.map((exp, i) => {
                expStr += exp.hospital
                if (i < experiences.length - 1) expStr += ', ';
            })
        }

        return (
            <div className="widget card search-dr-list" onClick={this.cardClick.bind(this, id)}>
                <div className="widget-header dr-info">
                    <div className="alpha dr-name">
                        <InitialsPicture name={name} has_image={!!thumbnail} className="initialsPicture-ds">
                            <img src={thumbnail} className="img-fluid img-round" style={{ height: 65, width: 65, marginRight: 12 }} />
                        </InitialsPicture>
                        <div className="dr-exp-details" style={{ flex: 1 }}>
                            <p className="fw-500">{name}</p>
                            <p className="dr-desg text-md">{this.getQualificationStr(general_specialization || [])}</p>
                            {
                                experience_years ? <p className="text-sm fw-500 text-light">{experience_years} Years of Experience</p> : ""
                            }
                            <p className="text-light dr-desg">{expStr}</p>
                        </div>
                    </div>
                    <div className="rating-address beta">
                        <p><span className="ct-img ct-img-xs"><img src={ASSETS_BASE_URL + "/img/customer-icons/map-marker-blue.svg"} className="img-fluid" /></span>{hospital.address}</p>
                    </div>
                </div>
                <div className="widget-content" style={{ marginBottom: 8 }} >
                    {/* <div className="dr-exp-details">
                        <p className="dr-desg text-md">{this.getQualificationStr(general_specialization || [])}</p>
                        {
                            experience_years ? <p className="text-sm fw-500 text-light">{experience_years} Years of Experience</p> : ""
                        }
                        <p className="text-light dr-desg">{expStr}</p>
                    </div> */}
                    <div className="dr-card-book text-right">
                        <div className="pricing">
                            <p className="text-primary fw-700 new-price"><span className="old-price">&#8377; {mrp}</span> &#8377; {deal_price}</p>
                        </div>
                        {
                            !!is_live ? <button className="v-btn v-btn-primary btn-sm mrt-10">Book Now</button> : ""
                        }
                    </div>
                </div>
                <div className="widget-footer card-footer" style={{ borderRadius: 0 }} >
                    <div className="row dr-result-card-row">
                        <div className="col-6 col-sm-7">
                            <img src={ASSETS_BASE_URL + "/img/customer-icons/home.svg"} className="img-fluid" />
                            <p className="Clinc-name">{hospital.hospital_name}
                                {
                                    hospital_count > 1 ?
                                        <span> &amp; {hospital_count - 1} More </span> : ''
                                }
                            </p>
                        </div>
                        <div className="col-6 col-sm-5 time-availability-div">
                            <img src={ASSETS_BASE_URL + "/img/customer-icons/clock-black.svg"} className="img-fluid" />
                            <p className="time-availability">
                                {Object.keys(hospital.timings).length > 0 ? hospital.timings[Object.keys(hospital.timings)[0]][0] : ""}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default DoctorProfileCard
