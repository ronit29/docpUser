import React from 'react';
import { connect } from 'react-redux';
import CONFIG from '../../config'

import { getDoctorById, getDoctorByUrl } from '../../actions/index.js'
const queryString = require('query-string');

import AppointmentSlot from '../../containers/opd/AppointmentSlot'
import PatientDetails from '../../containers/opd/PatientDetails'
import HelmetTags from '../../components/commons/HelmetTags'

class SeoBooking extends React.Component {
    constructor(props) {
        super(props)

        const parsed = queryString.parse(this.props.location.search)

        let doctor_id = this.props.match.params.id || parsed.doctor_id || this.get_doctor_id_by_url(this.props.match.url)
        let hospital_id = this.props.match.params.clinicId || parsed.hospital_id || ""

        this.state = {
            selectedDoctor: doctor_id,
            selectedClinic: hospital_id,
            action_page: parsed.action_page,
            seoFriendly: this.props.match.url.includes('-dpp')
        }

    }

    get_doctor_id_by_url(url) {
        for (let d_id in this.props.DOCTORS) {
            if (this.props.DOCTORS[d_id].url && url.includes(this.props.DOCTORS[d_id].url)) {
                return d_id
            }
        }
        return null
    }

    static loadData(store, match, queryData) {
        let doctor_id_from_url = match.params.id || queryData.doctor_id
        let hospital_id_from_url = match.params.clinicId || queryData.hospital_id || ""

        if (doctor_id_from_url) {
            return store.dispatch(getDoctorById(doctor_id_from_url, hospital_id_from_url, queryData.procedure_ids || [], queryData.category_ids || []))
        } else {
            let url = match.url
            if (url) {
                url = url.split("/")[1]
            }
            return new Promise((resolve, reject) => {
                store.dispatch(getDoctorByUrl(url, hospital_id_from_url, queryData.procedure_ids || [], queryData.category_ids || [], (doctor_id, url) => {
                    if (doctor_id) {
                        resolve({ doctor_id })
                    } else {
                        reject({
                            url: url
                        })
                    }
                }))
            })
        }

    }

    componentWillReceiveProps(props) {
        const parsed = queryString.parse(props.location.search)

        if (this.state.action_page != parsed.action_page) {
            this.setState({ action_page: parsed.action_page })
        }
    }

    componentDidMount() {
        if (!this.state.selectedDoctor && this.state.seoFriendly) {
            let url = this.props.match.url
            if (url) {
                url = url.split("/")[1]
            }
            this.props.getDoctorByUrl(url, this.state.selectedClinic, [], [], (doctor_id) => {
                if (doctor_id) {
                    this.setState({ selectedDoctor: doctor_id })
                }
            })
        }
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
                    this.state.action_page == 'timings' ? <AppointmentSlot {...this.props} selectedDoctor={this.state.selectedDoctor} selectedClinic={this.state.selectedClinic} /> : <PatientDetails {...this.props} selectedDoctor={this.state.selectedDoctor} selectedClinic={this.state.selectedClinic} />
                }

            </div>
        )
    }
}

const mapStateToProps = (state, passedProps) => {
    /**
     * initialServerData is server rendered async data required build html on server. 
     */
    let initialServerData = null
    let { staticContext } = passedProps
    if (staticContext && staticContext.data) {
        initialServerData = staticContext.data
    }

    let DOCTORS = state.DOCTOR_PROFILES

    return {
        DOCTORS, initialServerData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorById: (doctorId, clinicId, procedure_ids, category_ids) => dispatch(getDoctorById(doctorId, clinicId, procedure_ids, category_ids)),
        getDoctorByUrl: (doctr_url, hospitalId, procedure_ids, category_ids, cb) => dispatch(getDoctorByUrl(doctr_url, hospitalId, procedure_ids, category_ids, cb))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SeoBooking);
