import React from 'react';
import { connect } from 'react-redux';
import CONFIG from '../../config'

import { getDoctorById, getTimeSlots, selectOpdTimeSLot } from '../../actions/index.js'
const queryString = require('query-string');

import AppointmentSlot from '../../containers/opd/AppointmentSlot'
import PatientDetails from '../../containers/opd/PatientDetails'
import HelmetTags from '../../components/commons/HelmetTags'

class SeoBooking extends React.Component {
    constructor(props) {
        super(props)

        const parsed = queryString.parse(this.props.location.search)

        let doctor_id = this.props.match.params.id || parsed.doctor_id
        let hospital_id = this.props.match.params.clinicId || parsed.hospital_id

        this.state = {
            selectedDoctor: doctor_id,
            selectedClinic: hospital_id,
            action_page: parsed.action_page,
            seoFriendly: this.props.match.url.includes('-dpp')
        }

    }

    componentWillReceiveProps(props) {
        const parsed = queryString.parse(props.location.search)

        if (this.state.action_page != parsed.action_page) {
            this.setState({ action_page: parsed.action_page })
        }
    }

    static loadData(store, match, queryData) {
        let doctor_id = match.params.id || queryData.doctor_id
        let hospital_id = match.params.clinicId || queryData.hospital_id

        return store.dispatch(getDoctorById(doctor_id, hospital_id))
    }

    static contextTypes = {
        router: () => null
    }

    getMetaTagsData(seoData) {
        let title = ""
        let description = ""
        let schema = {}
        if (seoData) {
            title = seoData.title || ""
            description = seoData.description || ""
            schema = seoData.schema
        }
        return { title, description, schema }
    }

    render() {

        let seo_url = ""

        if (this.props.DOCTORS[this.state.selectedDoctor]) {
            seo_url = this.props.DOCTORS[this.state.selectedDoctor].url || ""
            if (seo_url) {
                seo_url = "/" + seo_url
            }
        }

        return (
            <div>

                {
                    this.props.DOCTORS && this.props.DOCTORS[this.state.selectedDoctor] ? <HelmetTags tagsData={{
                        title: this.getMetaTagsData(this.props.DOCTORS[this.state.selectedDoctor].seo).title,
                        description: this.getMetaTagsData(this.props.DOCTORS[this.state.selectedDoctor].seo).description,
                        canonicalUrl: `${CONFIG.API_BASE_URL}${seo_url || this.props.match.url}`,
                        schema: this.getMetaTagsData(this.props.DOCTORS[this.state.selectedDoctor].seo).schema
                    }} noIndex={false && !this.state.seoFriendly} /> : ""
                }


                {
                    this.state.action_page == 'timings' ? <AppointmentSlot {...this.props} /> : <PatientDetails {...this.props} />
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {

    let DOCTORS = state.DOCTOR_PROFILES

    return {
        DOCTORS
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorById: (doctorId, clinicId, procedure_ids, category_ids) => dispatch(getDoctorById(doctorId, clinicId, procedure_ids, category_ids))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SeoBooking);
