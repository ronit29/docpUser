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

    componentDidMount(){

        let hospital = (this.props.details.hospitals && this.props.details.hospitals.length) ? this.props.details.hospitals[0] : {}
        let selected_procedures = []
        let foundNew = false
        /*if(hospital){
            hospital.procedure_categories.map((category) => {
                category.procedures.filter( x=>x.is_selected ).map((procedure) => {
                    selected_procedures.push(procedure)
                    let criteria = {
                        id: procedure.procedure.id,
                        name: procedure.procedure.name
                    }

                    this.props.getCommonProcedures('procedures', criteria, true)
                    foundNew = true
                })
            })
        }*/
    }


    cardClick(id, url, hospital_id, e) {
        e.stopPropagation()
        let data = {
            'Category': 'ConsumerApp', 'Action': 'DoctorSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-selected', 'selectedId': id
        }
        GTM.sendEvent({ data: data })

        data = {
            'Category': 'ConsumerApp', 'Action': 'DoctorRankInSearch', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-rank-in-search', 'Rank': this.props.rank + 1
        }
        GTM.sendEvent({ data: data })

        if (e.ctrlKey || e.metaKey) {

        } else {
            e.preventDefault();
            if (url) {
                this.props.history.push(`/${url}?hospital_id=${hospital_id}`)
            } else {
                this.props.history.push(`/opd/doctor/${id}?hospital_id=${hospital_id}`)
            }
        }
    }

    bookNow(id, e) {
        e.stopPropagation()
        // this.props.history.push(`/doctorprofile/${id}/availability`)
    }

    getQualificationStr(qualificationSpecialization) {
        return qualificationSpecialization.reduce((str, curr, i) => {
            str += `${curr.name}`
            if (i < qualificationSpecialization.length - 1) str += `, `;
            return str
        }, "")
    }

    toggleProcedures(procedure_to_toggle, hospitalId, forceData = false, searchData = false) {/*
        let test = Object.assign({}, test_to_toggle.test)
        test.mrp = test_to_toggle.mrp
        test.deal_price = test_to_toggle.deal_price
        test.extra_test = true
        test.lab_id = this.state.selectedLab

        this.props.toggleDiagnosisCriteria('test', test)*/
        if(searchData){
            this.props.mergeOPDState('')
        }else{

            this.props.toggleProceduresCriteria(procedure_to_toggle, this.props.details.id, hospitalId, forceData)   

        }
        
    }

    getSearchedProcedures(procedure){
     /*   let selectedCount = this.props.opd_procedure[this.props.details.id]?this.props.opd_procedure[this.props.details.id].selected:0
        if(selectedCount<=1){
            this.setState({errorMessage:true})
            return null
        }
        let criteria = {
            id: procedure.procedure.id,
            name: procedure.procedure.name
        }
        this.props.getCommonProcedures('procedures', criteria)
        this.props.mergeOPDState('')
    */}

    toggle(which, fetchResults, procedure_ids) {

        this.setState({ [which]: !this.state[which] })
        if(fetchResults){
            if(procedure_ids.length){
                this.props.saveCommonProcedures(procedure_ids)
                this.props.mergeOPDState('')
            }else{
                
            }
            //this.props.getCommonProcedures('procedures', criteria, true)
        }
        
    }

    render() {

        let { id, experience_years, gender, hospitals, hospital_count, name, distance, qualifications, thumbnail, experiences, mrp, deal_price, general_specialization, is_live, display_name, url, enabled_for_online_booking, is_license_verified, is_gold, schema } = this.props.details

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
        if (mrp != 0 && deal_price != 0) {
            var discount = 100 - Math.round((deal_price * 100) / mrp);
        }

        try {
            if (schema) {
                schema = JSON.stringify(schema)
            }
        } catch (e) {
            schema = ""
        }

        if (hospitals && hospitals.length) {
            let selectedCount = 0
            let unselectedCount = 0
            hospitals[0].procedure_categories.map((x)=>{

                selectedCount+=x.procedures.filter(x=>x.is_selected).length
                unselectedCount+=x.procedures.filter(x=>!x.is_selected).length
            })


            let procedure_ids = this.props.commonProcedurers.map(x=>x.id)

            return (

                <div className="filter-card-dl mb-3" >
                {
                    schema ? <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: schema
                    }} />
                    :""
                }
                {
                    is_gold?
                    <img className="gold-card-img" src={ASSETS_BASE_URL + "/img/gold.svg"}/>
                    :''
                }
                    <div className="fltr-crd-top-container">
                        <div className="fltr-lctn-dtls">
                            <p><img className="fltr-loc-ico" width="12px" height="18px" src={ASSETS_BASE_URL + "/img/customer-icons/map-marker-blue.svg"} />
                                <span className="fltr-loc-txt">{hospital.short_address}</span> | <span>{Distance} Km</span></p>
                        </div>
                        <div className="row no-gutters">
                            <div className="col-8">
                                <div className="fltr-crd-img">
                                    <InitialsPicture name={name} has_image={!!thumbnail} className="initialsPicture-ds fltr-initialPicture-ds"><img className="fltr-usr-image img-round" src={thumbnail} /></InitialsPicture>
                                    {is_license_verified ? <span className="fltr-rtng">Verified</span> : ''}
                                    {/* <span className="fltr-sub-rtng">4.5 <img src="/assets/img/customer-icons/star.svg" /></span> */}
                                </div>
                                <div className="fltr-name-dtls">
                                    <a href={url ? `/${url}` : `/opd/doctor/${id}`}>
                                        <h2 style={{fontSize: "16px"}} className="fltr-dc-name">{display_name}</h2>
                                    </a>
                                    <p>{this.getQualificationStr(general_specialization || [])}</p>
                                    {
                                        experience_years ? <p >{experience_years} Years of Experience</p> : ""
                                    }

                                </div>

                            </div>
                            <div className="col-4">
                                <div className="fltr-bkng-section">
                                    {
                                        discount && discount != 0 ?
                                            <span className="filtr-offer ofr-ribbon fw-700">{discount}% Off</span> : ''
                                    }

                                    {
                                        !deal_price ?
                                            <span className="filtr-offer ofr-ribbon free-ofr-ribbon fw-700" >Free Consultation</span> : ''
                                    }

                                    <p className="fltr-prices">

                                        &#x20B9; {deal_price}
                                        {
                                            mrp != deal_price ? <span className="fltr-cut-price">&#x20B9; {mrp}</span> : ""
                                        }
                                    </p>
                                    {
                                        STORAGE.checkAuth() || deal_price < 100 ?
                                        ''
                                        :<div className="signup-off-container">
                                            <span className="signup-off-doc">+ &#8377; 100 OFF <b>on Signup</b> </span>
                                        </div>
                                    }

                                    {
                                        enabled_for_online_booking ? <button className="fltr-bkng-btn" onClick={this.cardClick.bind(this, id, url, hospital.hospital_id)}>Book Now</button> : <button className="fltr-bkng-btn">Contact</button>
                                    }
                                </div>
                            </div>
                        </div>

                        {
                            hospitals[0] && hospitals[0].procedure_categories && hospitals[0].procedure_categories.length?
                            <div className="procedure-checkboxes">
                                <h4>Treatment in <span>{hospitals[0].procedure_categories.map(x=>x.name).join('|')} <img src={ASSETS_BASE_URL + "/img/icons/info.svg"} /></span></h4>
                                <div className="insurance-checkboxes">
                                    <ul className="procedure-list">
                                    {
                                        hospitals[0].procedure_categories.map((category) =>{


                                            return category.procedures.filter(x=>x.is_selected).map((procedure, i) => {

                                                return <li key={i}>
                                                        <div>
                                                            <input type="checkbox" checked={true} className="ins-chk-bx" id={procedure.procedure.id} name="fruit-1" value="" onChange = {()=>this.setState({vieMoreProcedures: true})}/*{this.getSearchedProcedures.bind(this, procedure)}*//><label htmlFor={procedure.procedure.id}>{procedure.procedure.name}</label>
                                                        </div>
                                                        <p className="pr-prices">₹ {procedure.deal_price}<span className="pr-cut-price">₹ {procedure.mrp}</span></p>
                                                    </li>

                                            })
                                        })
                                    }
                                    {
                                        this.state.errorMessage?
                                        <p>Please Select at least one Procedure</p>
                                        :''
                                    }
                                    {
                                        unselectedCount + selectedCount >= 1
                                        ?this.state.vieMoreProcedures
                                            ?<ProcedurePopup toggle={this.toggle.bind(this, 'vieMoreProcedures')} toggleData ={this.toggleProcedures.bind(this)} details = {this.props} doctor_id = {this.props.details.id} getCommonProcedures = {this.props.getCommonProcedures} data={hospitals[0]} />
                                            :unselectedCount + selectedCount!= selectedCount?<button className="pr-plus-add-btn" onClick={()=>this.setState({vieMoreProcedures: true})}>
                                            + {unselectedCount} more
                                            </button>:''
                                        :''
                                    }
                                    </ul>
                                </div>
                            </div>
                            :''
                        }

                    </div>
                    <div className="filtr-card-footer">
                        <div>
                            <img src={ASSETS_BASE_URL + "/img/customer-icons/home.svg"} />
                            <p >{hospital.hospital_name}
                                {
                                    hospital_count > 1 ?
                                        <span> &amp; {hospital_count - 1} More </span> : ''
                                }
                            </p>

                        </div>
                        <div className="text-right">
                            <img src={ASSETS_BASE_URL + "/img/customer-icons/clock-black.svg"} />
                            <p>
                                <span>{Object.keys(hospital.timings).length > 0 ? hospital.timings[Object.keys(hospital.timings)[0]][0] : ""}</span>
                            </p>
                        </div>
                    </div>
                </div>

            );
        } else {
            return ""
        }
    }
}


export default DoctorProfileCard
