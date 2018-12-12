import React from 'react';
import { connect } from 'react-redux';
import InitialsPicture from '../../../commons/initialsPicture'
import GTM from '../../../../helpers/gtm.js'

class DoctorProfileCard extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    getQualificationStr(qualificationSpecialization) {
        return qualificationSpecialization.reduce((str, curr, i) => {
            str += `${curr.name}`
            if (i < qualificationSpecialization.length - 1) str += `, `;
            return str
        }, "")
    }

    claimButtonClick(e) {
        e.stopPropagation();

        let data = {
            'Category': 'ConsumerApp', 'Action': 'ClaimButtomClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'claim-buttom-clicked', 'selectedId': this.props.details.id
        }
        GTM.sendEvent({ data: data })

        this.props.history.push('/doctorsignup');
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
                <div className="fltr-crd-img text-center">
                    <InitialsPicture name={name} has_image={!!thumbnail} className="initialsPicture-dp">
                        <img src={thumbnail} className="img-fluid img-round" alt={display_name} title={display_name} />
                    </InitialsPicture>
                    {is_license_verified ? <span className="fltr-rtng">Verified</span> : ''}
                </div>

                <div className="dr-profile">
                    <h1 className="dr-name">{display_name}</h1>
                    <h2 className="desg">{this.getQualificationStr(general_specialization || [])}</h2>
                    {
                        experience_years ? <h2 className="add-details">{experience_years} Years of Experience</h2> : ""
                    }
                    <h2 className="add-details">{expStr}</h2>
                    {
                        this.props.details.enabled_for_online_booking==false || this.props.bookingEnabled==false ?  <button onClick={this.claimButtonClick.bind(this)} className="fltr-bkng-btn claim-btn mrt-10">Claim this profile</button> : ''
                    }
                </div>
            </div>
        );
    }
}


export default DoctorProfileCard
