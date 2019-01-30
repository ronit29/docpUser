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

    moreExpClick() {
        var elementTop = document.getElementById('experience').getBoundingClientRect().top;
        var elementHeight = document.getElementById('experience').clientHeight;
        var scrollPosition = elementTop - elementHeight;
        window.scrollTo(0, scrollPosition);
    }

    render() {
        let { name, experience_years, qualifications, thumbnail, experiences, general_specialization, display_name, is_license_verified, rating_graph } = this.props.details
        let expStr = ""

        if (experiences && experiences.length) {
            expStr += `EXP - ${experiences[0].hospital}`
            // experiences.map((exp, i) => {
            //     expStr += exp.hospital
            //     if (i < experiences.length - 1) expStr += ', '
            // })
        }

        return (
            <div className="widget-header dr-qucik-info doc-gold-padding">
                <div className="fltr-crd-img text-center">
                    <InitialsPicture name={name} has_image={!!thumbnail} className="initialsPicture-dp">
                        <img src={thumbnail} className="img-fluid img-round" alt={display_name} title={display_name} />
                    </InitialsPicture>
                    {is_license_verified ? <span className="fltr-rtng">Verified</span> : ''}
                    {
                        rating_graph && rating_graph.avg_rating ?
                            <div className="d-flex justify-content-center" style={{ marginTop: 5, alignItems: 'baseline' }} >
                                <span className="text-primary fw-500" style={{ fontSize: 12, marginRight: 4 }} >{parseFloat(rating_graph.avg_rating).toFixed(1)}</span>
                                <img src={ASSETS_BASE_URL + '/img/customer-icons/star.svg'} style={{ width: 10, height: 'auto' }} />
                            </div> : ''
                    }
                </div>

                <div className="dr-profile">
                    <h1 className="dr-name">{display_name}</h1>
                    <h2 className="desg">{this.getQualificationStr(general_specialization || [])}</h2>
                    {
                        experience_years ? <h2 className="add-details">{experience_years} Years of Experience</h2> : ""
                    }
                    {
                        experiences && experiences.length > 1 ?
                            <h2 className="add-details">{expStr} & <span style={{ cursor: 'pointer', color: '#f78631' }} onClick={() => this.moreExpClick()}>{experiences.length - 1} more</span></h2>
                            : experiences ? <h2 className="add-details">{expStr}</h2> : ''
                    }
                    {
                        this.props.details.enabled_for_online_booking == false || this.props.bookingEnabled == false ? <button onClick={this.claimButtonClick.bind(this)} className="fltr-bkng-btn claim-btn mrt-10">Claim this profile</button> : ''
                    }
                </div>
            </div>
        );
    }
}


export default DoctorProfileCard
