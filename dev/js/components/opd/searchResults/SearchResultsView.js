import React from 'react';

import DoctorsList from '../searchResults/doctorsList/index.js'
import CriteriaSearch from '../../commons/criteriaSearch'
import TopBar from './topBar'
import CONFIG from '../../../config'
import HelmetTags from '../../commons/HelmetTags'
import NAVIGATE from '../../../helpers/navigate'
import Footer from '../../commons/Home/footer'
import ResultCount from './topBar/result_count.js'
const queryString = require('query-string');

class SearchResultsView extends React.Component {
    constructor(props) {
        super(props)
        let seoData = null
        let footerData = null
        if (this.props.initialServerData) {
            seoData = this.props.initialServerData.seoData
            footerData = this.props.initialServerData.footerData
        }
        this.state = {
            //seoData, 
            footerData,
            seoFriendly: this.props.match.url.includes('-sptcit') || this.props.match.url.includes('-sptlitcit'),
            clinic_card: this.props.location.search.includes('clinic_card') || null,
            showError: false,
            search_id: '',
            setSearchId: false
        }
    }

    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search)
        if (this.props.mergeUrlState) {
            let getSearchId = true
            if (this.props.location.search.includes('search_id')) {

                if (this.props.search_id_data && this.props.search_id_data[parsed.search_id] && this.props.search_id_data[parsed.search_id].data) {

                    getSearchId = false
                    if (this.props.search_id_data[parsed.search_id].data.result && this.props.search_id_data[parsed.search_id].data.result.length && !this.props.fetchNewResults) {

                        this.setState({ search_id: parsed.search_id }, () => {
                            this.props.getSearchIdResults(parsed.search_id, this.props.search_id_data[parsed.search_id])

                        })

                    } else {
                        let filters = {}
                        filters.commonSelectedCriterias = this.props.search_id_data[parsed.search_id].commonSelectedCriterias
                        filters.filterCriteria = this.props.search_id_data[parsed.search_id].filterCriteria
                        this.setState({ search_id: parsed.search_id }, () => {
                            let page = 1
                            if (!this.props.fetchNewResults) {
                                page = parsed.page || 1
                            }
                            this.props.setSearchId(parsed.search_id, filters, page)
                        })
                    }

                }
            }

            if (getSearchId) {
                let filters = {}
                filters.commonSelectedCriterias = this.props.nextSelectedCriterias
                filters.filterCriteria = this.props.nextFilterCriteria
                let search_id = this.generateSearchId()
                if (window) {
                    window.scrollTo(0, 0)
                }
                this.setState({ search_id: search_id }, () => {
                    //Check for insured user
                    if(this.props.is_login_user_insured){
                        filters.filterCriteria = {...filters.filterCriteria}
                        filters.filterCriteria.is_insured = true
                    }
                    let new_url = this.buildURI(this.props)
                    this.props.history.replace(new_url)
                    this.props.setSearchId(search_id, filters, parsed.page || 1)
                })

            }


            if (this.props.fetchNewResults) {
                //this.getDoctorList(this.props)
                if (window) {
                    window.scrollTo(0, 0)
                }
            }
        }

        if (this.state.seoFriendly) {
            //this.props.mergeSelectedCriterias()
            let page = 1
            if(parsed && parsed.page){
                page = parsed.page || 1
            }
            this.props.getFooterData(this.props.match.url.split('/')[1], page).then((footerData) => {
                if (footerData) {
                    this.setState({ footerData: footerData })
                }
            })
        }
        // if (window) {
        //     window.scrollTo(0, 0)
        // }
    }

    componentWillReceiveProps(props) {
        let search_id = ''
        let page = 1
        const parsed = queryString.parse(props.location.search)
        if (props.location.search.includes('search_id')) {
            search_id = parsed.search_id
        }
        if (parsed.page) {
            page = parsed.page || 1
        }

        if (props.mergeUrlState && props.mergeUrlState != this.props.mergeUrlState) {
            let filters = {}
            filters.commonSelectedCriterias = props.commonSelectedCriterias
            filters.filterCriteria = props.filterCriteria
            if (search_id) {
                this.setState({ search_id: search_id }, () => {
                    let new_url = this.buildURI(props)
                    this.props.history.replace(new_url)
                    this.props.setSearchId(search_id, filters, page)
                })
            } else {
                search_id = this.generateSearchId()
                this.setState({ search_id: search_id }, () => {
                    let new_url = this.buildURI(props)
                    this.props.history.replace(new_url)
                    //Check if user insured
                    if(props.is_login_user_insured){
                        filters.filterCriteria = {...filters.filterCriteria}
                        filters.filterCriteria.is_insured = true
                    }

                    this.props.setSearchId(search_id, filters, page)
                })
            }
            if (window) {
                window.scrollTo(0, 0)
            }

        }

        if (props.getNewUrl && props.getNewUrl != this.props.getNewUrl && this.state.search_id) {
            if (props.fetchNewResults && (props.fetchNewResults != this.props.fetchNewResults)) {
                this.getDoctorList(props)
                // if (window) {
                //     window.scrollTo(0, 0)
                // }
            }
            this.buildURI(props)
        } else if (props.fetchNewResults && (props.fetchNewResults != this.props.fetchNewResults && this.state.search_id)) {
            this.setState({ setSearchId: true })
            this.getDoctorList(props)
            // if (window) {
            //     window.scrollTo(0, 0)
            // }
        } else if (props.fetchNewResults && this.state.search_id == search_id && !this.state.setSearchId && this.state.search_id) {
            this.setState({ setSearchId: true })
            this.getDoctorList(props)
            if (window) {
                window.scrollTo(0, 0)
            }
        } else {
            if (props.selectedLocation != this.props.selectedLocation && props.mergeUrlState) {
                let new_url = this.buildURI(props)
                this.props.history.replace(new_url)
            }
        }
    }

    generateSearchId(uid_string) {
        uid_string = 'xxyyxxxx-xxyx-4xxx-yxxx-xxxyyyxxxxxx'
        var dt = new Date().getTime();
        var uuid = uid_string.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search
        const params = new URLSearchParams(paramString)
        return params.get(tag)
    }

    applyFilters(filterState) {
        let search_id_data = Object.assign({}, this.props.search_id_data)
        const parsed = queryString.parse(this.props.location.search)

        if (this.props.search_id_data && this.props.search_id_data[parsed.search_id]) {
            search_id_data[parsed.search_id].filterCriteria = filterState
            search_id_data[parsed.search_id].page = 1
        }
        this.props.mergeOPDState({ filterCriteria: filterState, search_id_data: search_id_data, page: 1 })
        // this.props.setSearchId(this.state.search_id, filterState, false)
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    buildURI(state) {

        let { selectedLocation, commonSelectedCriterias, filterCriteria, locationType, page } = state
        let specializations_ids = commonSelectedCriterias.filter(x => x.type == 'speciality').map(x => x.id)
        let condition_ids = commonSelectedCriterias.filter(x => x.type == 'condition').map(x => x.id)
        let procedures_ids = commonSelectedCriterias.filter(x => x.type == 'procedures').map(x => x.id)
        let category_ids = commonSelectedCriterias.filter(x => x.type == 'procedures_category').map(x => x.id)

        let ipd_ids = commonSelectedCriterias.filter(x => x.type == 'ipd').map(x => x.id)

        let lat = 28.644800
        let long = 77.216721
        let place_id = ""

        if (selectedLocation) {
            place_id = selectedLocation.place_id || ""
            lat = selectedLocation.geometry.location.lat
            long = selectedLocation.geometry.location.lng
            if (typeof lat === 'function') lat = lat()
            if (typeof long === 'function') long = long()

            lat = parseFloat(parseFloat(lat).toFixed(6))
            long = parseFloat(parseFloat(long).toFixed(6))
        }

        let min_fees = filterCriteria.priceRange[0]
        let max_fees = filterCriteria.priceRange[1]
        let min_distance = filterCriteria.distanceRange[0]
        let max_distance = filterCriteria.distanceRange[1]
        let sort_on = filterCriteria.sort_on || ""
        let is_available = filterCriteria.is_available
        let is_female = filterCriteria.is_female
        let hospital_name = filterCriteria.hospital_name || ""
        let doctor_name = filterCriteria.doctor_name || ""
        let hospital_id = filterCriteria.hospital_id || ""
        let is_insured = filterCriteria.is_insured || false

        let url = `${window.location.pathname}?specializations=${specializations_ids}&conditions=${condition_ids}&lat=${lat}&long=${long}&min_fees=${min_fees}&max_fees=${max_fees}&min_distance=${min_distance}&max_distance=${max_distance}&sort_on=${sort_on}&is_available=${is_available}&is_female=${is_female}&doctor_name=${doctor_name || ""}&hospital_name=${hospital_name || ""}&place_id=${place_id}&locationType=${locationType || ""}&procedure_ids=${procedures_ids || ""}&procedure_category_ids=${category_ids || ""}&hospital_id=${hospital_id}&ipd_procedures=${ipd_ids||''}&search_id=${this.state.search_id}&is_insured=${is_insured}`

        if (page > 1) {
            url += `&page=${page}`
        }

        if (this.state.clinic_card) {
            url += `&clinic_card=true`
        }

        return url
    }

    getDoctorList(state = null, page = null, cb = null) {
        let searchUrl = null
        if (this.props.match.url.includes('-sptcit') || this.props.match.url.includes('-sptlitcit')) {
            searchUrl = this.props.match.url.toLowerCase()
        }
        if (page === null) {
            page = this.props.page
        }
        if (!state) {
            state = this.props
        } else if (state.page) {
            page = state.page
        }
        this.props.getDoctors(state, page, false, searchUrl, (...args) => {
            // this.setState({ seoData: args[1] })
            if (cb) {
                cb(...args)
                let new_url = this.buildURI(state)
                this.props.history.replace(new_url)
            } else {
                let new_url = this.buildURI(state)
                this.props.history.replace(new_url)
            }
        }, this.state.clinic_card).catch((e) => {
            this.setState({ showError: true })
        })
    }

    isSelectedLocationNearDelhi() {
        try {
            if (this.props.selectedLocation) {
                let { geometry } = this.props.selectedLocation

                var latitude1 = 28.644800;
                var longitude1 = 77.216721;
                var latitude2 = geometry.location.lat;
                if (typeof geometry.location.lat == 'function') {
                    latitude2 = geometry.location.lat()
                }
                var longitude2 = geometry.location.lng;
                if (typeof geometry.location.lng == 'function') {
                    longitude2 = geometry.location.lng()
                }
                var distance = 0

                if (typeof google != undefined) {
                    var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(latitude1, longitude1), new google.maps.LatLng(latitude2, longitude2));
                }

                return (distance / 1000) < 50
            }
            return true
        } catch (e) {
            return true
        }
    }

    getMetaTagsData(seoData) {
        let title = "Doctor Search"
        if (this.state.seoFriendly) {
            title = ""
        }
        let description = ""
        let schema = {}
        if (seoData) {
            title = seoData.title || ""
            description = seoData.description || ""
            schema = seoData.schema
        }
        if (parseInt(this.props.page) != 1) {
            title = 'Page  ' + this.props.page + ' - ' + title
        }
        return { title, description, schema }
    }

    render() {
        let show_pagination = this.props.doctorList && this.props.doctorList.length > 0
        let url = `${CONFIG.API_BASE_URL}${this.props.location.pathname}`
        url = url.replace(/&page=\d{1,}/, "")
        let page = ""
        let curr_page = parseInt(this.props.page)
        let prev = ""
        if (curr_page > 1) {
            page = `?page=${curr_page}`
            prev = url
            if (curr_page > 2) {
                prev += `?page=${curr_page - 1}`
            }
        }
        let next = ""
        if (this.props.count > curr_page * 20) {
            next = url + `?page=${curr_page + 1}`
        }

        // do not set rel next/prev for non seoFriendly pages
        if (!this.state.seoFriendly) {
            next = ""
            prev = ""
        }
        return (
            <div>
                <div id="map" style={{ display: 'none' }}></div>
                <HelmetTags tagsData={{
                    canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.canonical_url?`/${this.props.canonical_url}`:this.props.match.url}${page}`,
                    title: this.getMetaTagsData(this.props.seoData).title,
                    description: this.getMetaTagsData(this.props.seoData).description,
                    schema: this.getMetaTagsData(this.props.seoData).schema,
                    seoFriendly: this.state.seoFriendly,
                    prev: prev,
                    next: next
                }} />

                <CriteriaSearch {...this.props} checkForLoad={this.props.LOADED_DOCTOR_SEARCH || this.state.showError} title="Search For Disease or Doctor." type="opd" goBack={true} clinic_card={!!this.state.clinic_card} newChatBtn={true} searchDoctors={true}>
                    {
                        this.state.showError ? <div className="norf">No Results Found!!</div> : <div>
                            <TopBar {...this.props} applyFilters={this.applyFilters.bind(this)} seoData={this.props.seoData} clinic_card={!!this.state.clinic_card} seoFriendly={this.state.seoFriendly} />
                            <ResultCount {...this.props} applyFilters={this.applyFilters.bind(this)} seoData={this.props.seoData} clinic_card={!!this.state.clinic_card} seoFriendly={this.state.seoFriendly} />
                            {/* <div style={{ width: '100%', padding: '10px 30px', textAlign: 'center' }}>
                                <img src={ASSETS_BASE_URL + "/img/banners/banner_doc.png"} className="banner-img" />
                            </div> */}
                            <DoctorsList {...this.props} getDoctorList={this.getDoctorList.bind(this)} clinic_card={!!this.state.clinic_card} seoFriendly={this.state.seoFriendly} />

                            {
                                this.state.seoFriendly && show_pagination ? <div className="art-pagination-div">
                                    {
                                        prev ? <a href={prev} >
                                            <div className="art-pagination-btn">
                                                <span className="fw-500">{curr_page - 1}</span>
                                            </div>
                                        </a> : ""
                                    }

                                    <div className="art-pagination-btn">
                                        <span className="fw-500" style={{ color: '#000' }}>{curr_page}</span>
                                    </div>

                                    {
                                        next ? <a href={next} >
                                            <div className="art-pagination-btn">
                                                <span className="fw-500">{curr_page + 1}</span>
                                            </div>
                                        </a> : ""
                                    }

                                </div> : ""
                            }

                        </div>
                    }
                </CriteriaSearch>


                <Footer footerData={this.state.footerData} />
            </div>
        );
    }
}

export default SearchResultsView
