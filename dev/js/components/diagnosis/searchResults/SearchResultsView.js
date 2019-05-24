import React from 'react';

import LabsList from '../searchResults/labsList/index.js'
import CriteriaSearch from '../../commons/criteriaSearch'
import TopBar from './topBar'
import NAVIGATE from '../../../helpers/navigate/index.js';
import CONFIG from '../../../config'
import HelmetTags from '../../commons/HelmetTags'
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
            // seoData, 
            footerData,
            seoFriendly: this.props.match.url.includes('-lbcit') || this.props.match.url.includes('-lblitcit'),
            lab_card: this.props.location.search.includes('lab_card') || null,
            showError: false,
            showChatWithus: false,
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
                        this.props.getLabSearchIdResults(parsed.search_id, this.props.search_id_data[parsed.search_id])
                        this.setState({ search_id: parsed.search_id })
                    } else {

                        let filters = {}
                        filters.commonSelectedCriterias = this.props.search_id_data[parsed.search_id].commonSelectedCriterias
                        filters.filterCriteria = this.props.search_id_data[parsed.search_id].filterCriteria
                        this.setState({ search_id: parsed.search_id }, () => {
                            /*let new_url = this.buildURI(this.props)
                            this.props.history.replace(new_url)*/
                            let page = 1
                            if (!this.props.fetchNewResults) {
                                page = parsed.page
                            }
                            this.props.setLabSearchId(parsed.search_id, filters, page || 1)
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

                    //Check if user insured
                    if (this.props.is_login_user_insured && this.props.insurance_status == 1) {
                        filters.filterCriteria = { ...filters.filterCriteria }
                        filters.filterCriteria.is_insured = true
                    }

                    let new_url = this.buildURI(this.props)
                    this.props.history.replace(new_url)
                    this.props.setLabSearchId(search_id, filters, parsed.page || 1)
                })
            }

            if (this.props.fetchNewResults) {
                //this.getLabList(this.props)
                if (window) {
                    window.scrollTo(0, 0)
                }
            }
        }
        if (this.state.seoFriendly) {
            this.props.getFooterData(this.props.match.url.split('/')[1]).then((footerData) => {
                if (footerData) {
                    this.setState({ footerData: footerData })
                }
            })
        }

        this.setState({ showChatWithus: true })
    }

    componentWillReceiveProps(props) {
        let search_id = ''
        let page = 1
        const parsed = queryString.parse(props.location.search)
        if (props.location.search.includes('search_id')) {
            search_id = parsed.search_id
        } else if (this.state.search_id) {
            search_id = this.state.search_id
        }
        if (parsed.page) {
            page = parsed.page || 1
        }

        if (props.mergeUrlState && props.mergeUrlState != this.props.mergeUrlState) {
            let filters = {}
            filters.commonSelectedCriterias = props.currentSearchedCriterias
            filters.filterCriteria = props.filterCriteria
            if (search_id) {
                this.setState({ search_id: search_id }, () => {
                    let new_url = this.buildURI(props)
                    this.props.history.replace(new_url)
                    this.props.setLabSearchId(search_id, filters, page)
                })
            } else {
                search_id = this.generateSearchId()
                this.setState({ search_id: search_id }, () => {

                    //Check if user insured
                    if (props.is_login_user_insured && props.insurance_status == 1) {
                        filters.filterCriteria = { ...filters.filterCriteria }
                        filters.filterCriteria.is_insured = true
                    }

                    let new_url = this.buildURI(props)
                    this.props.history.replace(new_url)
                    this.props.setLabSearchId(search_id, filters, page)
                })
            }

            if (window) {
                window.scrollTo(0, 0)
            }

        }
        if (props.fetchNewResults && (props.fetchNewResults != this.props.fetchNewResults) && this.state.search_id) {
            this.setState({ setSearchId: true })
            this.getLabList(props)
            // if (window) {
            //     window.scrollTo(0, 0)
            // }
        } else if (props.fetchNewResults && this.state.search_id == search_id && !this.state.setSearchId && this.state.search_id) {
            this.setState({ setSearchId: true })
            this.getLabList(props)
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

    getLabList(state = null, page = null, cb = null) {
        let searchUrl = null
        if (this.props.match.url.includes('-lbcit') || this.props.match.url.includes('-lblitcit')) {
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
        this.props.getLabs(state, page, false, searchUrl, (...args) => {
            // this.setState({ seoData: args[1] })
            if (cb) {
                cb(...args)
            } else {
                let new_url = this.buildURI(state)
                this.props.history.replace(new_url)
            }
        }).catch((e) => {
            this.setState({ showError: true })
        })
    }

    applyFilters(filterState) {
        // clear LANDING_PAGE to enable loader
        if (typeof window == 'object') {
            window.ON_LANDING_PAGE = false
        }


        let search_id_data = Object.assign({}, this.props.search_id_data)
        const parsed = queryString.parse(this.props.location.search)

        if (this.props.search_id_data && this.state.search_id && this.props.search_id_data[this.state.search_id]) {
            search_id_data[this.state.search_id].filterCriteria = filterState
            search_id_data[this.state.search_id].page = 1
        }
        this.props.mergeLABState({ filterCriteria: filterState, search_id_data: search_id_data, page: 1 })
        //this.props.setLabSearchId(this.state.search_id, filterState, false)
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    buildURI(state) {
        let { selectedLocation, currentSearchedCriterias, filterCriteria, locationType, page } = state
        let testIds = currentSearchedCriterias.filter(x => x.type == 'test').map(x => x.id)

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

        let min_distance = filterCriteria.distanceRange[0]
        let max_distance = filterCriteria.distanceRange[1]
        let min_price = filterCriteria.priceRange[0]
        let max_price = filterCriteria.priceRange[1]
        let sort_on = filterCriteria.sort_on || ""
        let lab_name = filterCriteria.lab_name || ""
        let network_id = filterCriteria.network_id || ""
        let is_insured = filterCriteria.is_insured || false


        let url = ''
        //Check if any filter applied 
        let is_filter_applied = false

        if (parseInt(min_price) != 0) {
            is_filter_applied = true
        }

        if (parseInt(max_price) != 20000) {
            is_filter_applied = true
        }

        if (parseInt(min_distance) != 0) {
            is_filter_applied = true
        }

        if (parseInt(max_distance) != 15) {
            is_filter_applied = true
        }

        if (sort_on) {
            is_filter_applied = true
        }

        if (lab_name) {
            is_filter_applied = true
        }

        if (network_id) {
            is_filter_applied = true
        }

        let is_params_exist = false

        if (is_filter_applied || !this.state.seoFriendly) {

            url = `${window.location.pathname}?test_ids=${testIds || ""}&min_distance=${min_distance}&lat=${lat}&long=${long}&min_price=${min_price}&max_price=${max_price}&sort_on=${sort_on}&max_distance=${max_distance}&lab_name=${lab_name}&place_id=${place_id}&locationType=${locationType || ""}&network_id=${network_id}&search_id=${this.state.search_id}&is_insured=${is_insured}`
            is_params_exist = true

        } else if (this.state.seoFriendly) {
            url = `${window.location.pathname}`
        }

        if (this.state.lab_card) {
            url += `${is_params_exist ? '&' : '?'}lab_card=true`
            is_params_exist = true
        }

        if (page > 1) {
            url += `${is_params_exist ? '&' : '?'}page=${page}`
        }

        return url
    }

    getMetaTagsData(seoData) {
        let title = "Lab Search"
        if (this.state.seoFriendly) {
            title = ""
        }
        let description = ""
        if (seoData) {
            title = seoData.title || ""
            description = seoData.description || ""
        }
        return { title, description }
    }

    render() {
        let show_pagination = this.props.labList && this.props.labList.length > 0
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

        // check if this was the landing page
        let landing_page = false
        if (typeof window == 'object' && window.ON_LANDING_PAGE) {
            landing_page = true
        }

        return (
            <div>
                <div id="map" style={{ display: 'none' }}></div>
                <HelmetTags tagsData={{
                    canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.match.url}${page}`,
                    title: this.getMetaTagsData(this.props.seoData).title,
                    description: this.getMetaTagsData(this.props.seoData).description,
                    prev: prev,
                    next: next
                }} noIndex={!this.state.seoFriendly} />

                <CriteriaSearch {...this.props} checkForLoad={landing_page || this.props.LOADED_LABS_SEARCH || this.state.showError} title="Search for Test and Labs." goBack={true} lab_card={!!this.state.lab_card} newChatBtn={true} searchLabs={true}>
                    {
                        this.state.showError ? <div className="norf">No Results Found!!</div> : <div>
                            <TopBar {...this.props} applyFilters={this.applyFilters.bind(this)} seoData={this.props.seoData} lab_card={!!this.state.lab_card} seoFriendly={this.state.seoFriendly} />
                            <ResultCount {...this.props} applyFilters={this.applyFilters.bind(this)} seoData={this.props.seoData} lab_card={!!this.state.lab_card} seoFriendly={this.state.seoFriendly} />
                            {/*
                        <div style={{ width: '100%', padding: '10px 30px', textAlign: 'center' }}>
                            <img src={ASSETS_BASE_URL + "/img/banners/banner_lab.png"} className="banner-img" />
                        </div>
                        */}
                            {/* {
                                this.state.showChatWithus ? <div className="container-fluid d-md-none">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="mrt-10 mrb-10 article-chat-div">
                                                <p className="fw-500">Need help with booking?</p>
                                                <button onClick={() => this.props.history.push('/mobileviewchat?botagent=true&force_start=true')} >Chat with us</button>
                                            </div>
                                        </div>
                                    </div>
                                </div> : ""
                            } */}

                            <LabsList {...this.props} getLabList={this.getLabList.bind(this)} lab_card={!!this.state.lab_card} />

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
