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
                    <div onClick={() => this.profileClick(id, url, hospital_id)} style={{ cursor: 'pointer' }}>
                        <InitialsPicture name={name} has_image={!!thumbnail} className="initialsPicture-dp docCardIntPic">
                            <img src={thumbnail} style={{ width: '60px', height: '60px' }} className="img-fluid img-round" />
                        </InitialsPicture>
                    </div>
                    <div className="dr-profile">
                        <h1 className="dr-name">{display_name}<span className="nwDocViewPrf" onClick={() => this.profileClick(id, url, hospital_id)}>(View Profile)</span></h1>
                        <span className="clinic-name text-sm">{hospitalName}</span>
                        <span className="nw-clinicMore">+ 2 more Clinics <img src={ASSETS_BASE_URL + '/img/right-sc.svg'} /></span>
                    </div>
                </div>
                <div className="clinicRadioContainer">
                    <div className="dtl-radio">
                        <label className="container-radio m-0">
                            <div className="clinic-names-nw">
                                <p className="clnc-name">
                                    Dr. Satish Kumar Gadis Clinic
                                </p>
                                <p className="clnc-pricing-cont"><span className="clinc-rd-price">₹ 599 </span><span className="clinc-rd-price-cut">₹ 699</span></p>
                            </div>
                            <p className="clck-loc">Sector 44, Gurgaon</p>
                            <input type="radio" name="gender" value='o' data-param='gender' checked />
                            <span className="doc-checkmark"></span>
                        </label>
                    </div>
                    <div className="dtl-radio">
                        <label className="container-radio m-0">
                            <div className="clinic-names-nw">
                                <p className="clnc-name">
                                    Dr. Satish Kumar Gadis Clinic
                                </p>
                                <p className="clnc-pricing-cont"><span className="clinc-rd-price">₹ 599 </span><span className="clinc-rd-price-cut">₹ 699</span></p>
                            </div>
                            <p className="clck-loc">Sector 44, Gurgaon</p>
                            <input type="radio" name="gender" value='o' data-param='gender' checked />
                            <span className="doc-checkmark"></span>
                        </label>
                    </div>
                    <div className="dtl-radio">
                        <label className="container-radio m-0">
                            <div className="clinic-names-nw">
                                <p className="clnc-name">
                                    Dr. Satish Kumar Gadis Clinic
                                </p>
                                <p className="clnc-pricing-cont"><span className="clinc-rd-price">₹ 0 </span>
                                </p>
                            </div>
                            <p className="clck-loc">Sector 44, Gurgaon <span>Covered under insurance</span></p>
                            <input type="radio" name="gender" value='o' data-param='gender' checked />
                            <span className="doc-checkmark"></span>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}


export default SelectedClinic
