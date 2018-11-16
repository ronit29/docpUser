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

        let { name, experience_years, qualifications, thumbnail, experiences, general_specialization, display_name, is_license_verified } = this.props.details

        let expStr = ""

        if (experiences && experiences.length) {
            expStr += "EXP - "
            experiences.map((exp, i) => {
                expStr += exp.hospital
                if (i < experiences.length - 1) expStr += ', '
            })
        }

        return (
            <div className="widget-header dr-qucik-info doc-gold-padding">
                <div className="fltr-crd-img">
                    <InitialsPicture name={name} has_image={!!thumbnail} className="initialsPicture-dp">
                        <img src={thumbnail} className="img-fluid img-round" />
                    </InitialsPicture>
                    {is_license_verified ? <span className="fltr-rtng">Verified</span> : ''}
                </div>

                <div className="dr-profile">
                    <h1 className="dr-name">{display_name}</h1>
                    <p className="desg">{this.getQualificationStr(general_specialization || [])}</p>
                    {
                        experience_years ? <p className="add-details">{experience_years} Years of Experience</p> : ""
                    }
                    <p className="add-details">{expStr}</p>
                    <button className="fltr-bkng-btn claim-btn">Claim this profile</button>
                </div>
            </div>
        );
    }
}


export default DoctorProfileCard
