import React from 'react';
import { connect } from 'react-redux';

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
            str += `${curr.qualification}`
            if (curr.specialization) {
                str += ` - ${curr.specialization}`
            }
            if (i < qualificationSpecialization.length - 1) str += `, `;
            return str
        }, "")
    }


    render() {

        let { id, experience_years, gender, hospitals, hospital_count, name, qualifications, thumbnail, experiences, fees, discounted_fees } = this.props.details

        let hospital = hospitals[0]
        let expStr = ""

        if (experiences && experiences.length) {
            expStr += "Ex - "
            experiences.map((exp) => {
                expStr += exp.hospital
                expStr += ', '
            })
        }

        return (
            <div className="widget card search-dr-list" onClick={this.cardClick.bind(this, id)}>
                <div className="widget-header dr-info">
                    <div className="rating-address beta">
                        <ul className="inline-list ratting">
                            <li><span className="ct-img ct-img-xs star-icon"><img src="/assets/img/customer-icons/star.svg" className="img-fluid" /></span></li>
                            <li><span className="ct-img ct-img-xs star-icon"><img src="/assets/img/customer-icons/star.svg" className="img-fluid" /></span></li>
                            <li><span className="ct-img ct-img-xs star-icon"><img src="/assets/img/customer-icons/star.svg" className="img-fluid" /></span></li>
                            <li><span className="ct-img ct-img-xs star-icon"><img src="/assets/img/customer-icons/star.svg" className="img-fluid" /></span></li>
                            <li><span className="ct-img ct-img-xs star-icon"><img src="/assets/img/customer-icons/half-star.svg" className="img-fluid" /></span></li>
                        </ul>
                        <p><span className="ct-img ct-img-xs"><img src="/assets/img/customer-icons/map-marker-blue.svg" className="img-fluid" /></span>{hospital.address}</p>
                    </div>
                    <div className="alpha dr-name">
                        <img src={thumbnail} className="img-fluid img-round" style={{ height: 65 }} /> {name}
                    </div>
                </div>
                <div className="widget-content">
                    <div className="beta other-info text-right">
                        <button className="v-btn v-btn-primary btn-sm">Book Now</button>
                        <div className="pricing">
                            <p className="text-primary fw-700 new-price">Rs {discounted_fees} <span className="old-price">Rs {fees}</span></p>
                        </div>
                    </div>
                    <div className="alpha dr-exp-details">
                        <p className="dr-desg text-md">{this.getQualificationStr(qualifications)}</p>
                        <p className="text-sm fw-500 text-light">{experience_years} Years of Experince</p>
                        <p className="text-sm fw-500 text-light">{expStr}</p>
                    </div>
                </div>
                <div className="widget-footer card-footer">
                    <div className="row">
                        <div className="col-6">
                            <p><img src="/assets/img/customer-icons/home.svg" className="img-fluid" /><span className="Clinc-name">{hospital.hospital_name} <br />
                                {
                                    hospital_count > 1 ?
                                        <span> &amp; {hospital_count - 1} More </span> : ''
                                }
                            </span></p>
                        </div>
                        <div className="col-6">
                            <p><img src="/assets/img/customer-icons/clock-black.svg" className="img-fluid" /><span className="time-availability">{Object.keys(hospital.timings).length > 0 ? hospital.timings[Object.keys(hospital.timings)[0]][0] : ""}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default DoctorProfileCard
