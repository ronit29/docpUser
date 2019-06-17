import React from 'react';
import { connect } from 'react-redux';
import CONFIG from '../../config'

import { getLabById, getLabByUrl } from '../../actions/index.js'
const queryString = require('query-string');

import DX_BookingSummary from './BookingSummary.js'
import AppointmentSlot from './AppointmentSlot.js'
import TestSelector from './TestSelector.js'

import HelmetTags from '../../components/commons/HelmetTags'

class SeoBooking extends React.Component {
    constructor(props) {
        super(props)

        const parsed = queryString.parse(this.props.location.search)

        let lab_id = this.props.match.params.id || parsed.lab_id || this.get_lab_id_by_url(this.props.match.url)

        this.state = {
            selectedLab: lab_id,
            action_page: parsed.action_page,
            seoFriendly: this.props.match.url.includes('-lpp')
        }

    }

    get_lab_id_by_url(url) {
        for (let l_id in this.props.LABS) {
            if (this.props.LABS[l_id].lab && url.includes(this.props.LABS[l_id].lab.url)) {
                return l_id
            }
        }
        return null
    }

    static loadData(store, match, queryData) {
        let lab_id_from_url = match.params.id || queryData.lab_id

        if (lab_id_from_url) {
            return store.dispatch(getLabById(lab_id_from_url))
        } else {
            let url = match.url
            if (url) {
                url = url.split("/")[1]
            }
            return new Promise((resolve, reject) => {
                store.dispatch(getLabByUrl(url, [], (labId, url) => {
                    if (labId) {
                        resolve({ labId })
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
        if (!this.state.selectedLab && this.state.seoFriendly) {
            let url = this.props.match.url
            if (url) {
                url = url.split("/")[1]
            }
            this.props.getLabByUrl(url, [], (labId) => {
                if (labId) {
                    this.setState({ selectedLab: labId })
                    // let testIds = this.props.lab_test_data[labId] || []
                    // let tests = testIds.map(x => x.id)
                    // this.props.getLabById(labId, tests)
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
        if (seoData) {
            title = seoData.title || ""
            description = seoData.description || ""
        }
        return { title, description }
    }

    render() {

        let to_render = <DX_BookingSummary {...this.props} selectedLab={this.state.selectedLab} />
        if (this.state.action_page == 'timings') {
            to_render = <AppointmentSlot {...this.props} selectedLab={this.state.selectedLab} />
        }
        if (this.state.action_page == 'tests') {
            to_render = <TestSelector {...this.props} selectedLab={this.state.selectedLab} />
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

const mapStateToProps = (state, passedProps) => {
    /**
     * initialServerData is server rendered async data required build html on server. 
     */
    let initialServerData = null
    let { staticContext } = passedProps
    if (staticContext && staticContext.data) {
        initialServerData = staticContext.data
    }

    let LABS = state.LABS

    return {
        LABS, initialServerData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLabById: (labId, testIds) => dispatch(getLabById(labId, testIds)),
        getLabByUrl: (url, testIds, cb) => dispatch(getLabByUrl(url, testIds, cb)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SeoBooking);
