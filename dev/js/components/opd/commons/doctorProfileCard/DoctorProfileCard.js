import React from 'react';
import { connect } from 'react-redux';

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

        let { name, experience_years, qualifications } = this.props.details

        return (
            <div className="widget-header dr-qucik-info">
                <img src="/assets/img/customer-icons/user.png" className="img-fluid" />
                <div className="dr-profile">
                    <h4 className="dr-name">{name}</h4>
                    <p className="desg">{this.getQualificationStr(qualifications)}</p>
                    <p className="add-details">{experience_years} Years of Experince</p>
                    <p className="add-details">Ex - AIIMS, Ex- Fortis</p>
                </div>
            </div>
        );
    }
}


export default DoctorProfileCard
