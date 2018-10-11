import React from 'react';
import { connect } from 'react-redux';
import InitialsPicture from '../../../commons/initialsPicture'

class DoctorProfileCard extends React.Component {
    constructor(props) {
        super(props)
    }

    getQualificationStr(qualificationSpecialization) {
        return qualificationSpecialization.reduce((str, curr, i) => {
            str += `${curr.name}`
            if (i < qualificationSpecialization.length - 1) str += `, `;
            return str
        }, "")
    }

    render() {

        let { name, experience_years, qualifications, thumbnail, experiences, general_specialization, display_name } = this.props.details

        let expStr = ""

        if (experiences && experiences.length) {
            expStr += "Ex - "
            experiences.map((exp, i) => {
                expStr += exp.hospital
                if (i < experiences.length - 1) expStr += ', '
            })
        }

        return (
            <div className="widget-header dr-qucik-info">
                <InitialsPicture name={name} has_image={!!thumbnail} className="initialsPicture-dp rating-doc-dp">
                    <img src={thumbnail} className="img-fluid img-round" />
                </InitialsPicture>

                <div className="dr-profile">
                    <h4 className="dr-name rating-dr-name">{display_name}</h4>
                    <div className="rtng-doc-details-star">
                    <span className="fltr-rtng">Polular</span>
                    <span className="fltr-sub-rtng">4.5 <img style={{height:'auto', width:'auto'}} src="/assets/img/customer-icons/star.svg" /></span>
                    </div>
                    <p className="desg">{this.getQualificationStr(general_specialization || [])}</p>
                    {
                        experience_years ? <p className="add-details">{experience_years} Years of Experience</p> : ""
                    }
                    <p className="add-details">{expStr}</p>
                </div>
            </div>
        );
    }
}


export default DoctorProfileCard
