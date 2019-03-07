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
        let elementTop = document.getElementById('experience').getBoundingClientRect().top;
        let elementHeight = document.getElementById('experience').clientHeight;
        let scrollPosition = elementTop - elementHeight;
        window.scrollTo(0, scrollPosition);
    }

    moreQualificationClick() {
        let elementTop = document.getElementById('qualification').getBoundingClientRect().top;
        let elementHeight = document.getElementById('qualification').clientHeight;
        let scrollPosition = elementTop - elementHeight;
        window.scrollTo(0, scrollPosition);
    }

    searchProceedOPD(doc_name = "", hospital_name = "", hospital_id = "") {
        // handle doctor name, hospital name
        let doctor_name = doc_name.toLowerCase()
        let state = {
            filterCriteria: {
                ...this.props.filterCriteria,
                doctor_name, hospital_name, hospital_id
            },
            nextFilterCriteria: {
                ...this.props.filterCriteria,
                doctor_name, hospital_name, hospital_id
            }
        }


        if (doctor_name || hospital_name || hospital_id) {
            state.selectedCriterias = []
            state.commonSelectedCriterias = []
        }

        this.props.mergeOPDState(state, true)

        this.props.history.push({
            pathname: '/opd/searchresults',
            state: { search_back: true }
        })
    }

    render() {
        let { name, experience_years, qualifications, thumbnail, experiences, general_specialization, display_name, is_license_verified, rating_graph } = this.props.details
        let expStr = ""

        // let qualificationStr = ''
        // if (general_specialization && general_specialization.length) {
        //     if (general_specialization.length <= 3) {
        //         for (let i = 0; i < general_specialization.length; i++) {
        //             qualificationStr += general_specialization[i].name;
        //             if (i < general_specialization.length - 1) qualificationStr += `, `;
        //         }
        //     }
        //     else {
        //         for (let i = 0; i < 3; i++) {
        //             qualificationStr += general_specialization[i].name;
        //             if (i < general_specialization.length - 1) qualificationStr += `, `;
        //         }
        //     }
        // }

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
                    {
                        this.props.isSeoFriendly?
                            <p className="diff-suggestion">Looking for a different <span onClick={this.searchProceedOPD.bind(this, name, '', '')}>{name}?</span></p>
                        :''
                    }
                    <h2 className="desg">{this.getQualificationStr(general_specialization || '')}</h2>
                    {/* {
                        general_specialization && general_specialization.length > 3 ?
                            <h2 className="desg">{qualificationStr} & <span style={{ cursor: 'pointer', color: '#f78631' }} onClick={() => this.moreQualificationClick()}>{general_specialization.length - 3} more</span></h2>
                            :
                            <h2 className="desg">{qualificationStr}</h2>
                    } */}
                    {
                        experience_years ? <h2 className="add-details">{experience_years} Years of Experience</h2> : ""
                    }
                    {
                        experiences && experiences.length > 1 ?
                            <h2 className="add-details">{expStr} & <span style={{ cursor: 'pointer', color: '#f78631' }} onClick={() => this.moreExpClick()}>{experiences.length - 1} more</span></h2>
                            : experiences ? <h2 className="add-details">{expStr}</h2> : ''
                    }
                    {
                        this.props.recommendDocs ? <button onClick={this.claimButtonClick.bind(this)} className="fltr-bkng-btn claim-btn mrt-10">Claim this profile</button> : ''
                    }
                </div>

                <div className="notAvldocBtnContainer mrt-10">
                    <button className="notAvldocBtn">Book Now</button>
                    {
                        this.props.recommendDocs ?
                        <p className="notAvlDoc"><span className="fw-700">Not Bookable</span>: See bookable doctors with great discounts below <a onClick={this.props.viewAllDocClick.bind(this,this.props.nearbyDoctors)} className="text-primary fw-600 d-inline-block"> {this.props.nearbyDoctors.count >= 1 && this.props.nearbyDoctors.doctors_url?'(View All)':''}</a></p> : ''
                    }
                </div>
            </div>
        );
    }
}


export default DoctorProfileCard
