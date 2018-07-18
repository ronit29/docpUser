import React from 'react';
import { connect } from 'react-redux';
import InitialsPicture from '../../../commons/initialsPicture'

class DoctorProfileCard extends React.Component {
    constructor(props) {
        super(props)
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

        let { name, experience_years, qualifications, thumbnail, experiences } = this.props.details

        let expStr = ""

        if (experiences && experiences.length) {
            expStr += "Ex - "
            experiences.map((exp) => {
                expStr += exp.hospital
                expStr += ', '
            })
        }

        return (
            <div className="widget-header dr-qucik-info">
                <InitialsPicture name={name} has_image={!!thumbnail} className="initialsPicture-dp">
                    <img src={thumbnail} className="img-fluid img-round" />
                </InitialsPicture>

                <div className="dr-profile">
                    <h4 className="dr-name">{name}</h4>
                </div>
                <div style={{display: 'block', width: '100%', marginTop: 10}}>
                    <p className="desg">{this.getQualificationStr(qualifications)}</p>
                    <p className="add-details">{experience_years} Years of Experince</p>
                    <p className="add-details">{expStr}</p>
                </div>
            </div>
        );
    }
}


export default DoctorProfileCard
