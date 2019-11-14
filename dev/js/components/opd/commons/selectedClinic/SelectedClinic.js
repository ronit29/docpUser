import React from 'react';
import InitialsPicture from '../../../commons/initialsPicture'
const queryString = require('query-string');

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
        let address
        if (hospitals && hospitals.length) {
            hospitals.map((hospital, i) => {
                if ((hospital.hospital_id || hospital.id) == this.props.selectedClinic) {
                    hospitalName = hospital.hospital_name || hospital.name
                    address = hospital.address
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
        let selected_user_covered_under_insurance = false
        if(this.props.profiles && Object.keys(this.props.profiles).length >0 && this.props.profiles[this.props.selectedProfile]){
            selected_user_covered_under_insurance = this.props.profiles[this.props.selectedProfile].is_insured
        }
        var parsed = null
        if(this.props.location && this.props.location.search) {
            parsed = queryString.parse(this.props.location.search)    
        }
        if(parsed && parsed.cod_to_prepaid=='true'){
            show_clinic = 0
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
                        {/*<span className="clinic-name text-sm">{hospitalName}</span>*/}
                        <span className="clinic-name text-xs"> {address}</span>
                    {hospitals && hospitals.length > 1 && show_clinic >0?        
                        <span className={`nw-clinicMore mt-0 ${!this.state.showMoreClinic?'':'arrow-rev'}`} onClick={this.toggleMoreClinic.bind(this,!this.state.showMoreClinic)}>+ {hospitals.length-1} more Clinics <img src={ASSETS_BASE_URL + '/img/right-sc.svg'} /></span>
                    :''}
                    </div>
                </div>
                {
                    hospitals && hospitals.length > 1 && !(parsed && parsed.cod_to_prepaid=='true')?
                    <div className={`clinicRadioContainer ${this.state.showMoreClinic?'':'d-none'}`}>
                        {hospitals.map((hospital, i) => {
                        return hospital.enabled_for_online_booking?
                            <div className="dtl-radio" key={i}>
                                <label className="container-radio m-0" onClick={() => { this.props.selectClinic(hospital.hospital_id) }}>
                                    <div className="clinic-names-nw">
                                        <p className="clnc-name">{hospital.hospital_name}</p>
                                        <p className="clnc-pricing-cont">
                                            {
                                                hospital.insurance && hospital.insurance.is_insurance_covered && hospital.insurance.is_user_insured && parseInt(hospital.discounted_price) <=hospital.insurance.insurance_threshold_amount && selected_user_covered_under_insurance?
                                                <span className="clinc-rd-price">₹ {0}</span>
                                                :hospital.enabled_for_cod && !hospital.enabled_for_prepaid?hospital.cod_deal_price
                                                    ?<span className="clinc-rd-price">₹ {hospital.cod_deal_price}
                                                        {
                                                            parseInt(hospital.cod_deal_price) == parseInt(hospital.mrp)
                                                                ? ''
                                                                : <span className="clinc-rd-price-cut">₹ {hospital.mrp}
                                                                </span>
                                                        }
                                                    </span>
                                                    :<span className="clinc-rd-price">₹ {hospital.mrp}</span>
                                                :hospital.enabled_for_online_booking ?
                                                <span className="clinc-rd-price">₹ {hospital.discounted_price}
                                                        {
                                                            parseInt(hospital.discounted_price) == parseInt(hospital.mrp)
                                                                ? ''
                                                                : 
                                                                <React.Fragment>
                                                                <span className="clinc-rd-price-cut">₹ {hospital.mrp}
                                                                </span>
                                                                <span className="clnc-includecpn">(includes Coupon)</span>
                                                                </React.Fragment>
                                                        }
                                                </span>
                                                : hospital.mrp && hospital.mrp != 0 ?
                                                <span className="clinc-rd-price">₹ {hospital.mrp}</span> : ''
                                            }
                                        </p>
                                    </div>
                                    <p className={`clck-loc ${hospital.insurance && hospital.insurance.is_insurance_covered && hospital.insurance.is_user_insured && parseInt(hospital.discounted_price) <=hospital.insurance.insurance_threshold_amount && selected_user_covered_under_insurance?'p-0':''}`} >{hospital.address} 
                                        {
                                         hospital.insurance && hospital.insurance.is_insurance_covered && hospital.insurance.is_user_insured && parseInt(hospital.discounted_price) <=hospital.insurance.insurance_threshold_amount && selected_user_covered_under_insurance?
                                            <span>Covered under insurance</span>
                                            :''
                                        }
                                    </p>
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
                {
                    parsed && parsed.cod_to_prepaid=='true' && 

                    hospitals.filter(hospital=>hospital.id == this.props.selectedClinic).map((hospital)=>{

                        return <p className="clnc-name">{hospital.hospital_name}</p>
                    })
                }
            </div>
        );
    }
}


export default SelectedClinic
