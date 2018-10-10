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
            <div className="widget mrt-10 ct-profile skin-white" style={this.props.boxShadowHide ? { boxShadow: 'none' } : { boxShadow: '' }}>
                <div className="widget-header dr-qucik-info">
                    <InitialsPicture name={name} has_image={!!thumbnail} className="initialsPicture-dp">
                        <img src={thumbnail} className="img-fluid img-round" />
                    </InitialsPicture>

                    <div className="dr-profile">
                        <h4 className="dr-name">{display_name}</h4>
                        <p className="desg">{this.getQualificationStr(general_specialization) || []}</p>
                        {this.props.boxShadowHide ? '' : <h4 className="clinic-name mrt-10 text-sm">{hospitalName}</h4>}
                    </div>
                </div>
            </div>
        );
    }
}


export default SelectedClinic
