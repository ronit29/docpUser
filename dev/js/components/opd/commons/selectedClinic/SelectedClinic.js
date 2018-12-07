import React from 'react';
import InitialsPicture from '../../../commons/initialsPicture'

class SelectedClinic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    getQualificationStr(qualificationSpecialization) {
        return qualificationSpecialization.reduce((str, curr, i) => {
            str += `${curr.name}`
            if (i < qualificationSpecialization.length - 1) str += `, `;
            return str
        }, "")
    }

    render() {

        let { name, qualifications, hospitals, thumbnail, general_specialization, display_name } = this.props.selectedDoctor
        let hospitalName = ""

        if (hospitals && hospitals.length) {
            hospitals.map((hospital) => {
                if (hospital.hospital_id == this.props.selectedClinic) {
                    hospitalName = hospital.hospital_name
                }
            })
        }

        return (
            <div className="widget mrb-15 mrng-top-12">
                <div className="widget-header dr-qucik-info">
                    <div>
                        <InitialsPicture name={name} has_image={!!thumbnail} className="initialsPicture-dp">
                            <img src={thumbnail} className="img-fluid img-round" />
                        </InitialsPicture>
                    </div>
                    <div className="dr-profile mrt-10">
                        <h1 className="dr-name">{display_name}</h1>
                        <p className="clinic-name text-sm">{hospitalName}</p>
                    </div>
                </div>
            </div>
        );
    }
}


export default SelectedClinic
