import React from 'react'
import ProfileHeader from '../DesktopProfileHeader'
import ChatPanel from '../ChatPanel'
import LocationElements from '../../../containers/commons/locationElements'
import GTM from '../../../helpers/gtm.js'
import LocationPopup from '../../../containers/commons/locationPopup'
import LabProfileCard from '../../diagnosis/commons/labProfileCard/LabProfileCard.js'
const queryString = require('query-string');


class SearchTestView extends React.Component {
    constructor(props) {
        super(props)

        const parsed = queryString.parse(this.props.location.search)

        this.state = {
            tabsValue: [],
            lastSource: '',
            allFrequentlyTest: [],
            lab_id: '',
            frequently_heading: '',
            disableAddTest: [],
            search_id: '',
            searchCities: [],
            showLocationPopup: true,
            showPopupContainer: true,
            overlayVisible: true,
            isSeo: !this.props.location.pathname.includes("search/testinfo")
        }
    }

    ButtonHandler(field, event) {
        let tabs = [].concat(this.state.tabsValue)
        let self = this
        let found = false
        tabs = tabs.filter((x) => {
            if (x == field) {
                found = true
                return false
            }
            return true
        })
        if (!found) {
            tabs.push(field)
        }

        self.setState({ tabsValue: tabs })
    }

    componentDidMount() {
        var url_string = window.location.href
        var url = new URL(url_string);
        var test_id = url.searchParams.get("test_ids")
        let searchById = url_string.includes("search/testinfo")
        var selected_test_ids = url.searchParams.get("selected_test_ids") ? url.searchParams.get("selected_test_ids") : ''
        let last_page = url.searchParams.get("from")
        let search_id = url.searchParams.get("search_id")
        let lab_id = ''
        lab_id = url.searchParams.get("lab_id")
        let test_id_val = []
        let allTest = []
        let all_test_id = []
        let ferq_heading
        let url_test_ids = selected_test_ids.split(',')
        let test_url = ""
        {
            Object.entries(url_test_ids).map(function ([key, value]) {
                all_test_id.push(parseInt(value))
            })
        }
        this.setState({ lastSource: last_page, search_id: search_id })

        if (!test_id && searchById) {
            //  TODO - default
            return
        }

        if (!searchById) {
            test_url = this.props.match.url
            test_url = test_url.split("/")[1]
            test_id = ''
        }

        this.props.searchTestData(test_id, test_url, lab_id, this.props)
    }


    closeTestInfo() {
        if (this.state.lastSource == 'search') {
            this.props.history.push('/search')
        } else {
            window.history.back()
        }
    }

    frequentlyAddTest(field, name, show_details, event) {
        let self = this
        let url_string = window.location.href
        let url = new URL(url_string);
        let lab_id = ''
        lab_id = url.searchParams.get("lab_id")
        let test = {}
        let added_test = [].concat(this.state.disableAddTest)
        added_test.push(field)
        self.setState({ disableAddTest: added_test })
        if (lab_id != null) {
            test.lab_id = this.state.lab_id
            test.extra_test = true
            test.type = 'test'
            test.name = name
            test.id = field
            test.show_details = show_details
        } else {
            test.type = 'test'
            test.name = name
            test.id = field
            test.show_details = show_details
        }
        test.hide_price = false

        if (this.state.search_id !== null) {
            let newTestData = {}
            newTestData.type = 'test'
            newTestData.name = ''
            newTestData.id = field
            newTestData.show_details = show_details
            let newSearchIdData = []
            newSearchIdData = this.props.search_id_data[this.state.search_id].commonSelectedCriterias
            newSearchIdData.push(newTestData)
            let filters = {}
            filters.commonSelectedCriterias = newSearchIdData
            filters.filterCriteria = this.props.search_id_data[this.state.search_id].filterCriteria
            self.props.setLabSearchId(this.state.search_id, filters, true)
        }
        if (this.state.lastSource == 'search' || !this.state.search_id) {
            self.props.toggleDiagnosisCriteria('test', test, false)
        }
    }

    goToLocation() {
        this.setState({
            searchCities: []
        })
        let location_url = '/locationsearch'
        let data = {
            'Category': 'ChangeLocationDoctorResultsPopUp', 'Action': 'change-location-doctor-results-PopUp', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'change-location-doctor-results-PopUp', 'url': window.location.pathname
        }
        GTM.sendEvent({ data: data })
        this.props.history.push(location_url)
    }

    searchProceedLAB(lab_name = "") {
        // handle doctor name, hospital name
        this.props.mergeLABState({
            filterCriteria: {
                ...this.props.filterCriteria,
                lab_name
            },
            nextFilterCriteria: {
                ...this.props.filterCriteria,
                lab_name
            },
            currentSearchedCriterias: this.props.selectedCriterias,
            nextSelectedCriterias: this.props.selectedCriterias
        }, true)


        this.props.history.push({
            pathname: '/lab/searchresults',
            state: { search_back: true }
        })
    }

    render() {
        const parsed = queryString.parse(this.props.location.search)
        var selected_test_ids = parsed.selected_test_ids ? parsed.selected_test_ids : ''
        let url_test_ids = selected_test_ids.split(',')
        let disableAddTest = [].concat(this.state.disableAddTest)
        {
            Object.entries(url_test_ids).map(function ([key, value]) {
                disableAddTest.push(parseInt(value))
            })
        }
        let locationName = ""
        if (this.props.selectedLocation && this.props.selectedLocation.formatted_address) {
            locationName = this.props.selectedLocation.formatted_address
        }

        if (this.props.seoData && this.props.seoData.location) {
            locationName = this.props.seoData.location
        }

        let SearchedCritera
        if (this.props.searchTestInfoData && this.props.searchTestInfoData.length > 0) {

            let showInfo = true
            if (this.props.location.pathname.includes("search/testinfo")) {
                if (this.props.searchTestInfoData[0].id != parsed.test_ids) {
                    showInfo = false
                }
            } else {
                if (!this.props.location.pathname.includes(this.props.searchTestInfoData[0].url)) {
                    showInfo = false
                }
            }

            let { labs } = this.props.searchTestInfoData[0]
            if (labs && labs.tests) {
                SearchedCritera = labs.tests[0].name
            }
            let self = this
            let about_test = this.props.searchTestInfoData[0].about_test
            let why_get_tested = this.props.searchTestInfoData[0].why_get_tested
            let test_may_include = this.props.searchTestInfoData[0].test_may_include
            let preparations = this.props.searchTestInfoData[0].preparations
            let faqs = this.props.searchTestInfoData[0].faqs
            let resp_test_id = this.props.searchTestInfoData[0].id
            return (
                <div>
                    <section className="fade-enter-done">
                        <div className="container-fluid">
                            <div className="profile-body-wrap">
                                {
                                    this.props.hideHeaderOnMobile ? <div className="hide-762"><ProfileHeader showSearch={true} /></div> : <ProfileHeader showSearch={true} />
                                }
                                <section className={"container parent-section book-appointment-section" + (this.props.hideHeaderOnMobile ? " mp0" : "")}>
                                    <div className="row main-row parent-section-row">
                                        {
                                            showInfo ? <div className="col-12 col-md-7 col-lg-7 center-column">
                                                <div className="row mrb-20 bottomMargin">
                                                    <div className="col-12">
                                                        <h3 className="testInfoHeadTitle mrng-top-12"><img style={{ width: '20px' }} src={ASSETS_BASE_URL + "/img/icons/back-arrow.png"} className="img-fluid" onClick={this.closeTestInfo.bind(this)} />{this.props.searchTestInfoData[0].name} </h3>
                                                        <div className="widget mrb-15 mrng-top-12">
                                                            <div className="test-info-continer-block border-radius">
                                                                {this.props.searchTestInfoData[0].show_details ?
                                                                    <div className="test-info-acrd-head-main" id={resp_test_id}>
                                                                        <div className={`tst-main-acrd-data ${self.state.tabsValue.indexOf('test_' + resp_test_id) > -1 ? 'hide' : ''}`}>
                                                                            {about_test.value != "" ?
                                                                                <div className="test-sub-accordion">
                                                                                    <button className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'about_test_' + resp_test_id)}>{about_test.title} <span className={self.state.tabsValue.indexOf('about_test_' + resp_test_id) > -1 ? 'acrd-arw-rotate' : 'acrd-show'}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                                    <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('about_test_' + resp_test_id) > -1 ? 'hide' : ''}`}>
                                                                                        <div dangerouslySetInnerHTML={{ __html: about_test.value }}></div>
                                                                                    </div>
                                                                                </div>
                                                                                : ''
                                                                            }
                                                                            {why_get_tested.value != "" ?
                                                                                <div className="test-sub-accordion">
                                                                                    <button className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'why_get_tested_' + resp_test_id)}>{why_get_tested.title} <span className={self.state.tabsValue.indexOf('why_get_tested_' + resp_test_id) > -1 ? 'acrd-arw-rotate' : 'acrd-show'}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                                    <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('why_get_tested_' + resp_test_id) > -1 ? 'hide' : ''}`}>
                                                                                        <div dangerouslySetInnerHTML={{ __html: why_get_tested.value }}></div>
                                                                                    </div>
                                                                                </div>
                                                                                : ''
                                                                            }
                                                                            {test_may_include.value.length > 0 ?
                                                                                <div className="test-sub-accordion">
                                                                                    <button className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'test_include_' + resp_test_id)}>{test_may_include.title} <span className={self.state.tabsValue.indexOf('test_include_' + resp_test_id) > -1 ? 'acrd-arw-rotate' : 'acrd-show'}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                                    <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('test_include_' + resp_test_id) > -1 ? 'hide' : ''}`}>
                                                                                        <ul>
                                                                                            {Object.entries(test_may_include.value).map(function ([k, test_include]) {
                                                                                                return <li key={k}>{test_include}</li>
                                                                                            })}
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                                : ''
                                                                            }
                                                                            {preparations.value != '' ?
                                                                                <div className="test-sub-accordion">
                                                                                    <button className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'test_preparations_' + resp_test_id)}>{preparations.title}<span className={self.state.tabsValue.indexOf('test_preparations_' + resp_test_id) > -1 ? 'acrd-arw-rotate' : 'acrd-show'}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                                    <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('test_preparations_' + resp_test_id) > -1 ? 'hide' : ''}`}>
                                                                                        <div dangerouslySetInnerHTML={{ __html: preparations.value }}>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                : ''
                                                                            }
                                                                            {faqs.length > 0 ?
                                                                                <div className="test-sub-accordion">
                                                                                    <button className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'test_faq_' + resp_test_id)}>{faqs[0].title} <span className={self.state.tabsValue.indexOf('test_faq_' + resp_test_id) > -1 ? 'acrd-arw-rotate' : 'acrd-show'}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                                    <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('test_faq_' + resp_test_id) > -1 ? 'hide' : ''}`}>
                                                                                        {faqs.length > 0 ? Object.entries(faqs).map(function ([k, faq]) {
                                                                                            return <div key={k}>
                                                                                                <p>Q.{faq.value.test_question}</p>
                                                                                                <p>{faq.value.test_answer}</p>
                                                                                            </div>
                                                                                        }) : ''
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                                : ''
                                                                            }
                                                                        </div>
                                                                    </div> : ''
                                                                }
                                                            </div>
                                                        </div>
                                                        {this.state.isSeo
                                                            ? <div>
                                                                <div className="filter-title"
                                                                    style={{ height: 'auto', marginBottom: '10px' }}>

                                                                    {/*this.props.packagesList?this.props.packagesList.count:''*/}
                                                                    {labs.count} Results found for
                                                            <h1 className="search-result-heading">
                                                                        <span className="fw-700"> {SearchedCritera}</span>
                                                                    </h1>
                                                                    <span className="search-result-span" onClick={this.goToLocation.bind(this)}>

                                                                        {
                                                                            this.state.showLocationPopup && false ? ''
                                                                                : locationName ? <span className="location-edit" style={{ color: '#f6843a', cursor: 'pointer' }}>{` in ${locationName}`}</span> : ''
                                                                        }
                                                                        <img style={{ width: 15, height: 15, marginLeft: 7, cursor: 'pointer' }} src={ASSETS_BASE_URL + "/img/customer-icons/edit.svg"} />
                                                                    </span>
                                                                </div>

                                                                {
                                                                    labs.result.length > 0 ?
                                                                        Object.entries(labs.result).map(function ([k, lab]) {
                                                                            return <div key={k}>
                                                                                <LabProfileCard {...self.props} details={lab} key={k} rank={k} noClearTest={true} isTestInfo={true} />
                                                                            </div>
                                                                        }) : ''
                                                                }
                                                                <div>
                                                                    <a className="viewAllLab" onClick={this.searchProceedLAB.bind(this, '')}> View all labs</a>
                                                                </div>
                                                            </div> : ''}

                                                        {
                                                            this.props.searchTestInfoData[0].frequently_booked_together && this.props.searchTestInfoData[0].frequently_booked_together.value.length > 0 ?
                                                                <div className="widget mrb-15 mrng-top-12">
                                                                    <div className="widget-content">
                                                                        <h5 className="test-duo-heding"> {this.props.searchTestInfoData[0].frequently_booked_together.title}</h5>
                                                                        <ul className="test-duo-listing">
                                                                            {Object.entries(this.props.searchTestInfoData[0].frequently_booked_together.value).map(function ([k, frequently]) {
                                                                                return <li key={k}><p>{frequently.lab_test}</p>
                                                                                    <button className={disableAddTest.indexOf(frequently.id) > -1 ? 'disable-btn' : ''} id={frequently.id} onClick={self.frequentlyAddTest.bind(self, frequently.id, frequently.lab_test, frequently.show_details)} disabled={disableAddTest.indexOf(frequently.id) > -1 ? true : ''}>{disableAddTest.indexOf(frequently.id) > -1 ? 'Test Added' : 'Add Test'}</button>
                                                                                </li>
                                                                            })}
                                                                        </ul>

                                                                    </div>
                                                                </div>
                                                                : ''
                                                        }
                                                    </div>
                                                </div>
                                                {this.state.isSeo ?
                                                    <button onClick={this.searchProceedLAB.bind(this, '')} className="p-3 v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn">Book Now
                                                <span className="text-xs selected-option static-btn book-right-align-text" style={{ verticalAlign: 2, marginRight: 8 }}> {`(${disableAddTest.length} Selected)`}</span>
                                                    </button>
                                                    : ''}
                                            </div> : <div className="col-12 col-md-7 col-lg-7 center-column"></div>
                                        }
                                        <ChatPanel noChatButton={true} />
                                    </div>
                                </section>
                            </div>
                        </div>
                    </section>
                </div>
            )
        } else {
            return (<div>

            </div>)
        }
    }
}
export default SearchTestView