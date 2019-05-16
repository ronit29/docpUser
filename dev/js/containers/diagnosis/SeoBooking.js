import React from 'react';
import { connect } from 'react-redux';
import CONFIG from '../../config'

import { getLabById } from '../../actions/index.js'
const queryString = require('query-string');

import DX_BookingSummary from './BookingSummary.js'
import AppointmentSlot from './AppointmentSlot.js'
import TestSelector from './TestSelector.js'

import HelmetTags from '../../components/commons/HelmetTags'

class SeoBooking extends React.Component {
    constructor(props) {
        super(props)

        const parsed = queryString.parse(this.props.location.search)

        let lab_id = this.props.match.params.id || parsed.lab_id

        this.state = {
            selectedLab: lab_id,
            action_page: parsed.action_page,
            seoFriendly: this.props.match.url.includes('-lpp')
        }

    }

    componentWillReceiveProps(props) {
        const parsed = queryString.parse(props.location.search)

        if (this.state.action_page != parsed.action_page) {
            this.setState({ action_page: parsed.action_page })
        }
    }

    static loadData(store, match, queryData) {
        let lab_id = match.params.id || queryData.lab_id

        return store.dispatch(getLabById(lab_id))
    }

    static contextTypes = {
        router: () => null
    }

    getMetaTagsData(seoData) {
        let title = ""
        let description = ""
        if (seoData) {
            title = seoData.title || ""
            description = seoData.description || ""
        }
        return { title, description }
    }

    render() {

        let to_render = <DX_BookingSummary {...this.props} />
        if (this.state.action_page == 'timings') {
            to_render = <AppointmentSlot {...this.props} />
        }
        if (this.state.action_page == 'tests') {
            to_render = <TestSelector {...this.props} />
        }


        let seo_url = ""
        if (this.props.LABS[this.state.selectedLab]) {
            seo_url = this.props.LABS[this.state.selectedLab].lab.url
            if (seo_url) {
                seo_url = "/" + seo_url
            }
        }

        return (
            <div>

                {
                    this.props.LABS && this.props.LABS[this.state.selectedLab] ? <HelmetTags tagsData={{
                        title: this.getMetaTagsData(this.props.LABS[this.state.selectedLab].lab.seo).title,
                        description: this.getMetaTagsData(this.props.LABS[this.state.selectedLab].lab.seo).description,
                        canonicalUrl: `${CONFIG.API_BASE_URL}${seo_url || this.props.match.url}`
                    }} noIndex={false && !this.state.seoFriendly} /> : ""
                }


                {to_render}

            </div>
        )
    }
}

const mapStateToProps = (state) => {

    let LABS = state.LABS

    return {
        LABS
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLabById: (labId, testIds) => dispatch(getLabById(labId, testIds)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SeoBooking);
