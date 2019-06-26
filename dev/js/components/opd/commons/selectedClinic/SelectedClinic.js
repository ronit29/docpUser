import React from 'react';
import InitialsPicture from '../../../commons/initialsPicture'

class SelectedClinic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showMoreClinic:false
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

    toggleMoreClinic(val){
        this.setState({showMoreClinic:val})
    }

    render() {
        let { name, hospitals, thumbnail, display_name, url, id } = this.props.selectedDoctor
        let hospitalName = ""
        let hospital_id = ''
        let show_clinic =0
        if (hospitals && hospitals.length) {
            hospitals.map((hospital, i) => {
                if ((hospital.hospital_id || hospital.id) == this.props.selectedClinic) {
                    hospitalName = hospital.hospital_name || hospital.name
                    if (i == 0) {
                        hospital_id = hospital.hospital_id
                    }
                }else {
                    if(hospital.enabled_for_online_booking){
                        show_clinic++
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
                    {hospitals && hospitals.length > 1 && show_clinic >0?        
                        <span className="nw-clinicMore" onClick={this.toggleMoreClinic.bind(this,!this.state.showMoreClinic)}>+ {hospitals.length-1} more Clinics <img src={ASSETS_BASE_URL + '/img/right-sc.svg'} /></span>
                    :''}
                    </div>
                </div>
                {
                    hospitals && hospitals.length > 1?
                    <div className={`clinicRadioContainer ${this.state.showMoreClinic?'':'d-none'}`}>
                        {hospitals.map((hospital, i) => {
                        return hospital.enabled_for_online_booking?
                            <div className="dtl-radio" key={i}>
                                <label className="container-radio m-0" onClick={() => { this.props.selectClinic(hospital.hospital_id) }}>
                                    <div className="clinic-names-nw">
                                        <p className="clnc-name">{hospital.hospital_name}</p>
                                        <p className="clnc-pricing-cont">
                                            {
                                                hospital.insurance && hospital.insurance.is_insurance_covered && hospital.insurance.is_user_insured && parseInt(hospital.discounted_price) <=hospital.insurance.insurance_threshold_amount?
                                                <span className="clinc-rd-price">₹ {0}</span>
                                                :hospital.enabled_for_cod && !hospital.enabled_for_prepaid?hospital.cod_deal_price
                                                    ?<span className="clinc-rd-price">₹ {hospital.cod_deal_price}
                                                        {
                                                            parseInt(hospital.cod_deal_price) == parseInt(hospital.mrp)
                                                                ? ''
                                                                : <span className="clinc-rd-price-cut">₹ {hospital.mrp}</span>
                                                        }
                                                    </span>
                                                    :<span className="clinc-rd-price">₹ {hospital.mrp}</span>
                                                :hospital.enabled_for_online_booking ?
                                                <span className="clinc-rd-price">₹ {hospital.discounted_price}
                                                        {
                                                            parseInt(hospital.discounted_price) == parseInt(hospital.mrp)
                                                                ? ''
                                                                : <span className="clinc-rd-price-cut">₹ {hospital.mrp}</span>
                                                        }
                                                </span>
                                                : hospital.mrp && hospital.mrp != 0 ?
                                                <span className="clinc-rd-price">₹ {hospital.mrp}</span> : ''
                                            }
                                        </p>
                                    </div>
                                    <p className="clck-loc">{hospital.address}</p>
                                    {
                                        this.props.selectedClinic == hospital.hospital_id ? <input type="radio" checked name="radio" /> : <input type="radio" name="radio" />
                                    }
                                    <span className="doc-checkmark"></span>
                                </label>
                            </div>
                            :''
                        })}                        
                    </div>
                    :''
                }
            </div>
        );
    }
}


export default SelectedClinic
