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
            <div className="dp-dr-search-card mrb-10" onClick={this.cardClick.bind(this, id)}>
                <div className="dp-dr-search-card-div">
                    <div className="dp-dr-search-card-address clearfix">
                        <img src={ASSETS_BASE_URL + "/img/customer-icons/map-marker-blue.svg"} className="dp-dr-search-loc-icon" />
                        <p>{hospital.address}</p>
                    </div>
                    <div className="dp-dr-search-card-content clearfix">

                        <div className="dp-dr-search-card-img">
                            <InitialsPicture name={name} has_image={!!thumbnail} className="initialsPicture-ds"><img className="img-fluid img-round" src={thumbnail} /></InitialsPicture>
                        </div>

                        <div className="dp-dr-search-card-details">
                            <p className="fw-500 dp-dr-exp-details-1">{name}</p>
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
        );
    }
}


export default DoctorProfileCard
