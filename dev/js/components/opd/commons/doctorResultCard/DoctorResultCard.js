import React from 'react';
import { connect } from 'react-redux';
import InitialsPicture from '../../../commons/initialsPicture'
import GTM from '../../../../helpers/gtm.js'
import STORAGE from '../../../../helpers/storage';
import ProcedurePopup from '../PopUp'


class DoctorProfileCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMessage: false
        }
    }

    componentDidMount() {
        // if (window) {
        //     window.scrollTo(0, 0)
        // }
    }

    viewProfileClicked(id, url, hospital_id, e) {
        e.stopPropagation();

        let data = {
            'Category': 'ConsumerApp', 'Action': 'OpdSearchViewProfileClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'opd-search-view-profile-clicked', 'selectedId': id
        }
        GTM.sendEvent({ data: data })

        let { category_ids, procedure_ids } = this.trackingEventsBookNow(id)

        if (e.ctrlKey || e.metaKey) {

        } else {
            e.preventDefault();

            if (url) {
                if (category_ids.length || procedure_ids.length) {
                    this.props.history.push(`/${url}?hospital_id=${hospital_id}&is_procedure=true&category_ids=${category_ids}&procedure_ids=${procedure_ids}&hide_search_data=true`)
                } else {
                    this.props.history.push(`/${url}?hospital_id=${hospital_id}&hide_search_data=true`)
                }
            } else {
                if (category_ids.length || procedure_ids.length) {
                    this.props.history.push(`/opd/doctor/${id}?hospital_id=${hospital_id}&is_procedure=true&category_ids=${category_ids}&procedure_ids=${procedure_ids}&hide_search_data=true`)
                } else {
                    this.props.history.push(`/opd/doctor/${id}?hospital_id=${hospital_id}&hide_search_data=true`)
                }
            }
        }
    }

    bookNowClicked(id, url, hospital_id, e) {
        //always clear selected time at doctor profile
        let slot = { time: {} }
        this.props.selectOpdTimeSLot(slot, false)

        let data = {
            'Category': 'ConsumerApp', 'Action': 'OpdSearchBookNowClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'opd-book-now-clicked', 'selectedId': id
        }
        GTM.sendEvent({ data: data })

        let { procedure_ids } = this.trackingEventsBookNow(id)
        this.props.saveProfileProcedures('', '', procedure_ids, true)
        this.props.history.push(`/opd/doctor/${id}/${hospital_id}/bookdetails`)
    }

    trackingEventsBookNow(id) {
        let Distance = ''

        if (this.props.details && this.props.details.distance) {
            Distance = (Math.round(this.props.details.distance * 10) / 10).toFixed(1);
        }

        let data = {
            'Category': 'ConsumerApp', 'Action': 'DoctorSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-selected', 'selectedId': id
        }
        GTM.sendEvent({ data: data });

        let category_ids = this.props.commonSelectedCriterias.filter(x => x.type == 'procedures_category').map(x => x.id).join(',')
        let procedure_ids = this.props.commonSelectedCriterias.filter(x => x.type == 'procedures').map(x => x.id).join(',')
        let condition_ids = this.props.commonSelectedCriterias.filter(x => x.type == 'condition').map(x => x.id).join(',')
        let specialization_ids = this.props.commonSelectedCriterias.filter(x => x.type == 'speciality').map(x => x.id).join(',')
        data = {
            'Category': 'ConsumerApp', 'Action': 'DoctorRankInSearch', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-rank-in-search', 'Rank': this.props.rank + 1, 'DoctorSearchCount': this.props.count, 'specializations': specialization_ids, 'conditions': condition_ids, 'procedures': procedure_ids, 'procedure_category': category_ids, 'Distance': Distance
        }
        GTM.sendEvent({ data: data })

        return ({ category_ids, procedure_ids })

    }

    bookNow(id, e) {
        e.stopPropagation()
        // this.props.history.push(`/doctorprofile/${id}/availability`)
    }

    getQualificationStr(qualificationSpecialization) {
        if (qualificationSpecialization.length) {
            return qualificationSpecialization[0].name;
        } else {
            return null
        }

        // return qualificationSpecialization.reduce((str, curr, i) => {
        //     str += `${curr.name}`
        //     if (i < qualificationSpecialization.length - 1) str += `, `;
        //     return str
        // }, "")
    }

    claimButtonClick(e) {
        e.stopPropagation();

        let data = {
            'Category': 'ConsumerApp', 'Action': 'ClaimButtomClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'claim-buttom-clicked', 'selectedId': this.props.details.id
        }
        GTM.sendEvent({ data: data })

        this.props.history.push('/doctorsignup');
    }

    toggle(which, fetchResults = false, procedure_ids = []) {

        this.setState({ [which]: !this.state[which] })
        if (fetchResults) {
            if (procedure_ids.length) {
                this.props.saveCommonProcedures(procedure_ids)
                this.props.mergeOPDState('')
                this.props.resetProcedureURl()
            }
        }
    }

    render() {

        let { id, experience_years, gender, hospitals, hospital_count, name, distance, qualifications, thumbnail, experiences, mrp, deal_price, general_specialization, is_live, display_name, url, is_license_verified, is_gold, new_schema, enabled_for_online_booking, discounted_price, parent_url, average_rating } = this.props.details

        let enabled_for_hospital_booking = true
        let hospital = (hospitals && hospitals.length) ? hospitals[0] : {}
        let expStr = ""

        if (experiences && experiences.length) {
            expStr += "EXP - "
            experiences.map((exp, i) => {
                expStr += exp.hospital
                if (i < experiences.length - 1) expStr += ', ';
            })
        }

        var Distance = (Math.round(distance * 10) / 10).toFixed(1);
        if (mrp != 0 && discounted_price != 0) {
            var discount = 100 - Math.round((discounted_price * 100) / mrp);
        }

        try {
            if (new_schema) {
                new_schema = JSON.stringify(new_schema)
            }
        } catch (e) {
            new_schema = ""
        }
        let is_procedure = false
        if (hospitals && hospitals.length) {
            let selectedCount = 0
            let unselectedCount = 0
            let finalProcedureDealPrice = discounted_price
            let finalProcedureMrp = mrp
            hospitals[0].procedure_categories.map((x) => {
                is_procedure = true
                x.procedures.filter(x => x.is_selected).map((x) => {
                    finalProcedureDealPrice += x.deal_price
                    finalProcedureMrp += x.mrp
                    selectedCount++
                })

                unselectedCount += x.procedures.filter(x => !x.is_selected).length
            })

            if (is_procedure) {
                if (finalProcedureMrp != 0 && finalProcedureDealPrice != 0) {
                    discount = 100 - Math.round((finalProcedureDealPrice * 100) / finalProcedureMrp);
                }
            }

            enabled_for_hospital_booking = hospitals[0].enabled_for_online_booking

            console.log('saudsadad')
            console.log(this.props.details)

            let rating = ''
            if (average_rating) {
                rating = (Math.ceil(this.props.ratings * 2)) / 2;
            }

            let ratingArray = []
            for (let i = 0; i < Math.floor(rating); i++) {
                ratingArray.push(<img src={ASSETS_BASE_URL + '/img/customer-icons/rating-star-filled.svg'} className="img-cstm-docrating" />)
            }

            if (rating != Math.floor(rating)) {
                ratingArray.push(<img src={ASSETS_BASE_URL + '/img/customer-icons/halfstar.svg'} className="img-cstm-docrating" />)
            }

            let emptyStars = Math.floor(5 - rating);
            if (emptyStars) {
                for (let i = 0; i < emptyStars; i++) {
                    ratingArray.push(<img src={ASSETS_BASE_URL + '/img/customer-icons/rating-star-empty.svg'} className="img-cstm-docrating" />)
                }
            }

            return (

                // <div className="cstm-docCard mb-3">
                //     <div className="cstm-docCard-content">
                //         <div className="row no-gutters">
                //             <div className="col-8">
                //                 <div className="cstm-doc-details-container">
                //                     <div className="cstm-doc-img-container">
                //                         <div>
                //                             <img style={{ width: '75px' }} src="https://cdn.docprime.com/media/lab/images/90x60/b0dad6f1354821d9af4c5143cc2aeeaa_N5id4Pi.jpg" />
                //                             <div className="cstmLabStar">
                //                                 <img className="img-cstm-docrating" src={ASSETS_BASE_URL + "/img/staryellow.svg"} />
                //                                 <img className="img-cstm-docrating" src={ASSETS_BASE_URL + "/img/staryellow.svg"} />
                //                                 <img className="img-cstm-docrating" src={ASSETS_BASE_URL + "/img/staryellow.svg"} />
                //                                 <img className="img-cstm-docrating" src={ASSETS_BASE_URL + "/img/staryellow.svg"} />
                //                                 <img className="img-cstm-docrating" src={ASSETS_BASE_URL + "/img/staryellow.svg"} />
                //                                 <p>12 Reviews</p>
                //                             </div>
                //                         </div>
                //                     </div>
                //                     <div className="cstm-doc-content-container">
                //                         <h4 className="cstmDocName">Metropolis Healthcare Ltd - Gurgaon</h4>
                //                         <p>Liver Function </p>
                //                         <p><img className="cstmTimeImg" src={ASSETS_BASE_URL + "/img/watch-date.svg"} /> 8:00 AM - 12:00 PM </p>
                //                     </div>
                //                 </div>

                //             </div>
                //             <div className="col-4">
                //                 <p className="cstm-doc-price">Docprime Price</p>
                //                 <p className="cst-doc-price">₹ 300 <span className="cstm-doc-cut-price">₹ 500</span></p>
                //                 <p className="cstm-cpn">50% Off (includes Coupon)</p>
                //                 <button className="cstm-book-btn">Book Now</button>
                //             </div>
                //         </div>
                //     </div>
                //     <div className="cstmCardFooter">
                //         <div className="cstmfooterContent">
                //             <p><img style={{ width: '16px' }} src={ASSETS_BASE_URL + "/img/cstmhome.svg"} />Cloud Nine Health Super Clinic & 2 more </p>
                //             <p className="mb-rmv"><img style={{ width: '10px', marginLeft: '3px' }} src={ASSETS_BASE_URL + "/img/new-loc-ico.svg"} />5818, Near Super Mart I, Aster Avenue DLF Phase IV, Gur </p>
                //         </div>
                //         <div className="cstmDocLoc">
                //             <p className=""><img src={ASSETS_BASE_URL + "/img/cstmdist.svg"} /> 1.5Km</p>
                //         </div>
                //     </div>
                //     <div className="showBookTestListContainer mt-rmv">
                //         <div className="showBookTestList bg-white-main">
                //             <ul>
                //                 <li>
                //                     <p className="showBookTestListImg">
                //                         <img src="/assets/img/new-loc-ico.svg" style={{ marginRight: '8px', width: "12px" }} />Sohna Road Gurgaon | 5 km </p>
                //                     <button className="showBookTestListBtn">Book Now</button>
                //                 </li>
                //             </ul>
                //         </div>
                //         <div className="filtr-card-footer bg-white-main" style={{ cursor: 'pointer', borderTop: '1px solid #e8e8e8' }}>
                //             <div style={{ paddingRight: "8px" }}>
                //                 <p className="appBaseColor" style={{ marginLeft: '0px' }}>Show less</p>
                //             </div>
                //             <div className="text-right" style={{ marginLeft: 'auto' }}>
                //                 <img style={{ margin: '5px' }} className="acrd-show" src="/assets/img/customer-icons/dropdown-arrow.svg" />
                //             </div>
                //         </div>
                //     </div>
                // </div>
                // doctor card design
                <div className="cstm-docCard mb-3">
                    <div className="cstm-docCard-content">
                        <div className="row no-gutters">
                            <div className="col-8">
                                <h4 className="cstmDocName">{display_name}</h4>
                                <div className="cstm-doc-details-container">
                                    <div className="cstm-doc-img-container">
                                        <div>
                                            <InitialsPicture name={name} has_image={!!thumbnail} className="initialsPicture-ds fltr-initialPicture-ds" style={{ width: 52, height: 52 }} >
                                                <img className="img-round" src={thumbnail} alt={display_name} title={display_name} />
                                            </InitialsPicture>
                                            {
                                                is_license_verified && enabled_for_online_booking ?
                                                    <p className="cstm-varify">Verified</p> : ''
                                            }
                                        </div>
                                    </div>
                                    <div className="cstm-doc-content-container">
                                        <p>{this.getQualificationStr(general_specialization || [])}</p>
                                        {
                                            experience_years ?
                                                <p>{experience_years} Years Experience</p> : ''
                                        }
                                        {
                                            hospital && hospital.timings && Object.keys(hospital.timings).length ?
                                                hospital.timings[Object.keys(hospital.timings)[0]].map((time, index) => {
                                                    return <p key={index}>
                                                        <img className="cstmTimeImg" src={ASSETS_BASE_URL + "/img/watch-date.svg"} />
                                                        {time}
                                                    </p>
                                                }) : ''
                                        }
                                    </div>
                                </div>
                                {
                                    rating ?
                                        <div className="cstm-doc-rtng">
                                            {ratingArray}
                                            <span>{rating}</span>
                                        </div> : ''
                                }
                            </div>
                            <div className="col-4">
                                <p className="cstm-doc-price">Docprime Price</p>
                                {
                                    discounted_price && discounted_price != mrp ?
                                        <p className="cst-doc-price">₹ {discounted_price} <span className="cstm-doc-cut-price">₹ {mrp} </span></p>
                                        : mrp && mrp != 0 ?
                                            <p className="cst-doc-price">₹ {mrp}</p> : ''
                                }
                                {
                                    deal_price != discounted_price && enabled_for_hospital_booking ?
                                        <p className="cstm-cpn">50% Off (includes Coupon)</p> : ''
                                }
                                {
                                    enabled_for_hospital_booking ?
                                        <button className="cstm-book-btn">Book Now</button>
                                        :
                                        <button className="cstm-book-btn">View Contact</button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="cstmCardFooter">
                        <div className="cstmfooterContent">
                            <p><img style={{ width: '16px' }} src={ASSETS_BASE_URL + "/img/cstmhome.svg"} />{hospital.hospital_name}
                                {
                                    hospital_count > 1 ?
                                        <span> &amp; {hospital_count - 1} More </span> : ''
                                }
                            </p>
                            <p className="mb-rmv">
                                <img style={{ width: '10px', marginLeft: '3px' }} src={ASSETS_BASE_URL + "/img/new-loc-ico.svg"} />
                                {hospital.short_address}
                            </p>
                        </div>
                        <div className="cstmDocLoc">
                            <p className=""><img src={ASSETS_BASE_URL + "/img/cstmdist.svg"} /> {Distance}Km</p>
                        </div>
                    </div>
                </div>
                // doctor card design



                // <div className="filter-card-dl mb-3" >
                //     {
                //         new_schema ? <script type="application/ld+json" dangerouslySetInnerHTML={{
                //             __html: new_schema
                //         }} />
                //             : ""
                //     }
                //     {
                //         is_gold ?
                //             <img className="gold-card-img" src={ASSETS_BASE_URL + "/img/gold.svg"} />
                //             : ''
                //     }
                //     <div className="fltr-crd-top-container">
                //         {
                //             this.props.seoFriendly ?
                //                 <div className="fltr-lctn-dtls" style={{ paddingLeft: 45 }}>
                //                     {
                //                         parent_url && parent_url.length ?
                //                             <a href={parent_url} onClick={
                //                                 (e) => {
                //                                     e.preventDefault()
                //                                     this.props.history.push(`/${parent_url}`)
                //                                 }
                //                             }>
                //                                 <p>
                //                                     <img className="fltr-loc-ico" width="12px" height="18px" src={ASSETS_BASE_URL + "/img/customer-icons/map-marker-blue.svg"} />
                //                                     <span>{hospital.short_address}</span> {hospital.short_address ? " | " : ""}<span>{Distance} Km</span>
                //                                 </p>
                //                             </a>
                //                             :
                //                             <p>
                //                                 <img className="fltr-loc-ico" width="12px" height="18px" src={ASSETS_BASE_URL + "/img/customer-icons/map-marker-blue.svg"} />
                //                                 <span>{hospital.short_address}</span> {hospital.short_address ? " | " : ""}<span>{Distance} Km</span>
                //                             </p>
                //                     }
                //                 </div>
                //                 : <div className="fltr-lctn-dtls">
                //                     {
                //                         parent_url && parent_url.length ?
                //                             <a href={parent_url} onClick={
                //                                 (e) => {
                //                                     e.preventDefault()
                //                                     this.props.history.push(`/${parent_url}`)
                //                                 }
                //                             }>
                //                                 <p>
                //                                     <img className="fltr-loc-ico" width="12px" height="18px" src={ASSETS_BASE_URL + "/img/customer-icons/map-marker-blue.svg"} />
                //                                     <span className="fltr-loc-txt">{hospital.short_address}</span> {hospital.short_address ? " | " : ""}<span>{Distance} Km</span>
                //                                 </p>
                //                             </a>
                //                             :
                //                             <p>
                //                                 <img className="fltr-loc-ico" width="12px" height="18px" src={ASSETS_BASE_URL + "/img/customer-icons/map-marker-blue.svg"} />
                //                                 <span className="fltr-loc-txt">{hospital.short_address}</span> {hospital.short_address ? " | " : ""}<span>{Distance} Km</span>
                //                             </p>
                //                     }
                //                 </div>
                //         }
                //         <div className="row no-gutters" >
                //             <div className="col-12 mrt-10">
                //                 <a href={url ? `/${url}` : `/opd/doctor/${id}`} onClick={this.viewProfileClicked.bind(this, id, url, hospital.hospital_id || '')} title={display_name}>
                //                     <h2 style={{ fontSize: 16, paddingLeft: 8, paddingRight: 50 }} className="lab-fltr-dc-name fw-500">{display_name}</h2>
                //                 </a>
                //                 {
                //                     enabled_for_hospital_booking && discount && discount != 0 ?
                //                         <span className="filtr-offer ofr-ribbon fw-700">{discount}% Off</span> : ''
                //                 }
                //                 {
                //                     !discounted_price && !is_procedure && enabled_for_hospital_booking ?
                //                         <span className="filtr-offer ofr-ribbon free-ofr-ribbon fw-700">Free Consultation</span> : ''
                //                 }
                //             </div>
                //             <div className="col-7 mrt-10">
                //                 <div className="img-nd-dtls" style={{ alignItems: 'flex-start' }} >
                //                     <div className="fltr-crd-img text-center" style={{ width: 60 }} >
                //                         <InitialsPicture name={name} has_image={!!thumbnail} className="initialsPicture-ds fltr-initialPicture-ds"><img className="fltr-usr-image img-round" src={thumbnail} alt={display_name} title={display_name} /></InitialsPicture>
                //                         {is_license_verified && enabled_for_online_booking ? <span className="fltr-rtng">Verified</span> : ''}
                //                         {/* <span className="fltr-sub-rtng">4.5 <img src="/assets/img/customer-icons/star.svg" /></span> */}
                //                         {
                //                             enabled_for_online_booking ? '' : <button onClick={(e) => this.claimButtonClick(e)} className="fltr-bkng-btn claim-btn text-center" style={{ marginTop: 10 }}>Claim this profile</button>
                //                         }
                //                     </div>
                //                     <div className="crd-dctr-dtls">
                //                         <h3 className="fw-500">{this.getQualificationStr(general_specialization || [])}</h3>
                //                         {
                //                             this.props.details.qualifications && this.props.details.qualifications.length ?
                //                                 <div style={{ marginTop: 2, height: 16 }}>
                //                                     {
                //                                         this.props.details.qualifications.filter(x => x.qualification.length <= 6).map((qualification, i) => {
                //                                             if (i <= 1) {
                //                                                 return <h3 className="fw-500 inline-head" id={`inline-head-${i}`} key={i}>{qualification.qualification}</h3>
                //                                             }
                //                                         })
                //                                     }
                //                                 </div> : ''
                //                         }
                //                         {
                //                             experience_years ? <h3 className="fw-500">{experience_years} Years of Experience</h3> : ""
                //                         }
                //                     </div>
                //                 </div>
                //             </div>
                //             <div className="col-5 mrt-10 text-right" style={{ paddingLeft: 8 }} >
                //                 {
                //                     enabled_for_hospital_booking ?
                //                         <p className="fltr-prices" style={{ marginTop: 4 }}>
                //                             &#x20B9; {is_procedure ? finalProcedureDealPrice : discounted_price}
                //                             {
                //                                 is_procedure
                //                                     ? finalProcedureMrp != finalProcedureDealPrice ? <span className="fltr-cut-price">&#x20B9; {finalProcedureMrp}</span> : ""
                //                                     : mrp != discounted_price ? <span className="fltr-cut-price">&#x20B9; {mrp}</span> : ""
                //                             }
                //                         </p>
                //                         : is_procedure ?
                //                             <p className="fltr-prices" style={{ marginTop: 4 }}>
                //                                 &#x20B9;{finalProcedureMrp}
                //                             </p>
                //                             : mrp && mrp != 0 ?
                //                                 <p className="fltr-prices" style={{ marginTop: 4 }}>
                //                                     &#x20B9;{mrp}
                //                                 </p> : ''
                //                 }

                //                 {/* code for new pricing UI (exclusive docprime price) */}
                //                 {/* {
                //                     enabled_for_hospital_booking ?
                //                         <div className="dp-price-dtls-div mrb-10">
                //                             {
                //                                 is_procedure
                //                                     ? finalProcedureMrp != finalProcedureDealPrice ?
                //                                         <p className="fw-500 dp-price">Doctor fee : &#x20B9; {finalProcedureMrp}</p> : ''
                //                                     : mrp != discounted_price ? <p className="fw-500 dp-price">Doctor fee : &#x20B9; {mrp}</p> : ''
                //                             }
                //                             <p className="fw-500 exclsv-price">Docprime fee : &#x20B9; {is_procedure ? finalProcedureDealPrice : discounted_price}</p>
                //                         </div>
                //                         :
                //                         is_procedure ?
                //                             <div className="dp-price-dtls-div mrb-10">
                //                                 <p className="fw-500 dp-price">Doctor fee : &#x20B9; {finalProcedureMrp}</p>
                //                             </div>
                //                             : mrp ?
                //                                 <div className="dp-price-dtls-div mrb-10">
                //                                     <p className="fw-500 dp-price">Doctor fee : &#x20B9; {mrp}</p>
                //                                 </div> : ''
                //                 } */}

                //                 {
                //                     deal_price != discounted_price && enabled_for_hospital_booking ? <div className="signup-off-container">
                //                         <span className="signup-off-doc-green" style={{ fontSize: 12 }} >Includes coupon discount</span>
                //                     </div> : ''
                //                 }
                //             </div>
                //             <div className="col-12 mrt-10">
                //                 {
                //                     enabled_for_hospital_booking ?
                //                         <div className="row">
                //                             <div className="col-6">
                //                                 <a href={url} onClick={(e) => e.preventDefault()}>
                //                                     <button className="fltr-cntct-btn btn-pdng" onClick={this.viewProfileClicked.bind(this, id, url, hospital.hospital_id || '')}>View Profile</button>
                //                                 </a>
                //                             </div>
                //                             <div className="col-6">
                //                                 <button onClick={this.bookNowClicked.bind(this, id, url, hospital.hospital_id || '')} className="fltr-bkng-btn btn-pdng" >Book Now</button>
                //                             </div>
                //                         </div>
                //                         : <div className="row">
                //                             <div className="col-6"></div>
                //                             <div className="col-6">
                //                                 <button onClick={this.viewProfileClicked.bind(this, id, url, hospital.hospital_id || '')} className="fltr-cntct-btn btn-pdng" >Contact
                //                             </button>
                //                             </div>
                //                         </div>
                //                 }
                //             </div>
                //         </div>
                //         {
                //             hospitals[0] && hospitals[0].procedure_categories && hospitals[0].procedure_categories.length ?
                //                 <div className="procedure-checkboxes">
                //                     <div className="dtl-cnslt-fee pb-list cnslt-fee-style">
                //                         <div className="clearfix">
                //                             {
                //                                 enabled_for_hospital_booking ?
                //                                     <span className="test-price txt-ornage">₹ {discounted_price}<span className="test-mrp">₹ {mrp}</span></span>
                //                                     :
                //                                     <span className="test-price txt-ornage">₹ {mrp}</span>
                //                             }
                //                             <span className="fw-500 test-name-item">Consultation Fee</span>
                //                         </div>
                //                     </div>
                //                     <h4 style={{ fontSize: '14px' }} className="procedure-out-heading-font">Treatment(s) <span>{this.props.selectedCriterias.filter(x => x.type == 'procedures_category').length > 0 ? ` in ${this.props.selectedCriterias.filter(x => x.type == 'procedures_category').map(x => x.name).join(' | ')}` : 'Selected'} </span></h4>
                //                     <div className="insurance-checkboxes">
                //                         <ul className="procedure-list">
                //                             {
                //                                 hospitals[0].procedure_categories.map((category) => {
                //                                     return category.procedures.filter(x => x.is_selected).map((procedure, i) => {
                //                                         return <li key={i}>
                //                                             <label className="procedure-check ck-bx" htmlFor={`${procedure.procedure.id}_doc_${id}`}>{procedure.procedure.name}
                //                                                 <input type="checkbox" checked={true} className="proce-input" id={`${procedure.procedure.id}_doc_${id}`} name="fruit-1" value="" onChange={() => this.setState({ vieMoreProcedures: true })} />
                //                                                 <span className="checkmark">
                //                                                 </span>
                //                                             </label>
                //                                             {/* <div>
                //                                                 <input type="checkbox" checked={true} className="ins-chk-bx" id={procedure.procedure.id} name="fruit-1" value="" onChange={() => this.setState({ vieMoreProcedures: true })} />
                //                                                 <label htmlFor={procedure.procedure.id}>{procedure.procedure.name}</label>
                //                                             </div> */}
                //                                             {
                //                                                 enabled_for_hospital_booking ?
                //                                                     <p className="pr-prices">₹ {procedure.deal_price}<span className="pr-cut-price">₹ {procedure.mrp}</span></p>
                //                                                     :
                //                                                     <p className="pr-prices">₹ {procedure.mrp}</p>
                //                                             }
                //                                         </li>
                //                                     })
                //                                 })
                //                             }
                //                             {
                //                                 this.state.errorMessage ?
                //                                     <p>Please Select at least one Procedure</p>
                //                                     : ''
                //                             }
                //                             {
                //                                 unselectedCount + selectedCount >= 1
                //                                     ? this.state.vieMoreProcedures
                //                                         ? <ProcedurePopup toggle={this.toggle.bind(this, 'vieMoreProcedures')} details={this.props} doctor_id={this.props.details.id} data={hospitals[0]} hospitalEnable={enabled_for_hospital_booking} />
                //                                         : unselectedCount + selectedCount != selectedCount ? <button className="pr-plus-add-btn" onClick={() => this.setState({ vieMoreProcedures: true })}>
                //                                             + {unselectedCount} more
                //                             </button> : ''
                //                                     : ''
                //                             }
                //                         </ul>
                //                     </div>
                //                 </div>
                //                 : ''
                //         }
                //     </div>
                //     <div className="filtr-card-footer">
                //         <div>
                //             <img src={ASSETS_BASE_URL + "/img/customer-icons/home.svg"} />
                //             <h3 className="mrb-0">{hospital.hospital_name}
                //                 {
                //                     hospital_count > 1 ?
                //                         <span> &amp; {hospital_count - 1} More </span> : ''
                //                 }
                //             </h3>
                //         </div>
                //         <div className="text-right">
                //             <img src={ASSETS_BASE_URL + "/img/customer-icons/clock-black.svg"} />
                //             <p>
                //                 <span>{Object.keys(hospital.timings).length > 0 ? hospital.timings[Object.keys(hospital.timings)[0]][0] : ""}</span>
                //             </p>
                //         </div>
                //     </div>
                // </div>
            );
        } else {
            return ""
        }
    }
}


export default DoctorProfileCard
