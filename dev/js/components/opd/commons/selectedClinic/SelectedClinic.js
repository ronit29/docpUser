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

    profileClick(id, url, hospital_id) {
        if (this.props.history) {
            if (url) {
                this.props.history.push(`/${url}?hospital_id=${hospital_id}&hide_search_data=true`)

            } else {
                this.props.history.push(`/opd/doctor/${id}?hospital_id=${hospital_id}&hide_search_data=true`)
            }
        }
    }

    render() {

        let { name, hospitals, thumbnail, display_name, url, id } = this.props.selectedDoctor
        let hospitalName = ""
        let hospital_id = ''

        if (hospitals && hospitals.length) {
            hospitals.map((hospital, i) => {
                if ((hospital.hospital_id || hospital.id) == this.props.selectedClinic) {
                    hospitalName = hospital.hospital_name || hospital.name
                    if (i == 0) {
                        hospital_id = hospital.hospital_id
                    }
                }
            })
        }

        return (
            <div className="widget mrb-15 mrng-top-12">
                <div className="widget-header dr-qucik-info">
                    <div onClick={() => this.profileClick(id, url, hospital_id)} style={{cursor:'pointer'}}>
                        <InitialsPicture name={name} has_image={!!thumbnail} className="initialsPicture-dp docCardIntPic">
                            <img src={thumbnail} style={{width:'60px', height:'60px'}} className="img-fluid img-round"/>
                        </InitialsPicture>
                    </div>
                    <div className="dr-profile">
                        <h1 className="dr-name">{display_name}<span className="nwDocViewPrf" onClick={() => this.profileClick(id, url, hospital_id)}>(View Profile)</span></h1>
                        <p className="clinic-name text-sm">{hospitalName}</p>
                    </div>
                </div>
            </div>
        );
    }
}


export default SelectedClinic
