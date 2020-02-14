import React from 'react'
import ProfileHeader from '../DesktopProfileHeader'
import ChatPanel from '../ChatPanel'
import LocationElements from '../../../containers/commons/locationElements'
import GTM from '../../../helpers/gtm.js'
import LocationPopup from '../../../containers/commons/locationPopup'
import LabProfileCard from '../../diagnosis/commons/labProfileCard/LabProfileCard.js'
import Loader from '../../commons/Loader'
import HelmetTags from '../../commons/HelmetTags'
import CONFIG from '../../../config'
import ArticleAuthor from '../articleAuthor/articleAuthor';
import TableOfContent from '../article/TableOfContent'
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

    updateTabsValues(value) {
        let tabs = [].concat(this.state.tabsValue)
        if (tabs.indexOf(value) > -1) {
            tabs.splice( tabs.indexOf(value), 1 );
        }
        this.setState({ tabsValue: tabs })
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
        const parsed = queryString.parse(this.props.location.search)
        let no_labs = false
        if (parsed.test_ids) {
            no_labs = true
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

        this.props.searchTestData(test_id, test_url, lab_id, this.props, no_labs) // get selected test/package details
    }


    closeTestInfo() {
        if (this.state.lastSource == 'search') {
            this.props.history.push('/search')
        } else {
            window.history.back()
        }
    }

    frequentlyAddTest(field, name, show_details, event) { 
        // adding more test 
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
            test.lab_id = lab_id
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
        let test = {}
        let found = false
        let selectedCriteria = []
        let nextSelectedCriterias = []
        if (this.props.searchTestInfoData && this.props.searchTestInfoData.length > 0) {
            if(this.props.searchTestInfoData[0].is_package){
                this.props.history.push('/searchpackages')
            }else{
                test.id = this.props.searchTestInfoData[0].id
                test.name = this.props.searchTestInfoData[0].name
                test.show_details = this.props.searchTestInfoData[0].show_details
                test.url = this.props.searchTestInfoData[0].url
                test.type = 'test'
                this.props.clearAllTests()
                nextSelectedCriterias = nextSelectedCriterias.concat(test)
                this.props.toggleDiagnosisCriteria('test', test, false)
                
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
                    currentSearchedCriterias: nextSelectedCriterias,
                    nextSelectedCriterias: nextSelectedCriterias
                }, true)


                this.props.history.push({
                    pathname: '/lab/searchresults',
                    state: { search_back: true }
                })
            }
        }
    }

    proceedBookNow(lab_name = "") {
        //book now 
        let test = {}
        let found = false
        let selectedCriteria = []
        let nextSelectedCriterias = this.props.selectedCriterias
        if (this.props.searchTestInfoData && this.props.searchTestInfoData.length > 0) {
            if(this.props.searchTestInfoData[0].is_package){
                this.props.setPackageId(this.props.searchTestInfoData[0].id, false)
                setTimeout(() => {
                this.props.history.push('/searchpackages')
                }, 100)
            }else{ // for lab only
                test.id = this.props.searchTestInfoData[0].id
                test.name = this.props.searchTestInfoData[0].name
                test.show_details = this.props.searchTestInfoData[0].show_details
                test.url = this.props.searchTestInfoData[0].url
                test.type = 'test'
                selectedCriteria = this.props.selectedCriterias
                selectedCriteria = selectedCriteria.filter((x) => {
                    if (x.id == this.props.searchTestInfoData[0].id) {
                        found = true
                        return false
                    }
                    return true
                })
                if (!found) {
                    nextSelectedCriterias = nextSelectedCriterias.concat(test)
                    this.props.toggleDiagnosisCriteria('test', test, false)
                }
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
                    currentSearchedCriterias: nextSelectedCriterias,
                    nextSelectedCriterias: nextSelectedCriterias
                }, true)


                this.props.history.push({
                    pathname: '/lab/searchresults',
                    state: { search_back: true }
                })
            }
        }
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
            let canonicalUrl = ''
            let title = ''
            let description = ''
            let this_package_will_include = this.props.searchTestInfoData[0].this_package_will_include
            if (this.props.searchTestInfoData[0].seo) {
                canonicalUrl = this.props.searchTestInfoData[0].url
                title = this.props.searchTestInfoData[0].seo.title
                description = this.props.searchTestInfoData[0].seo.description
            }
            let breadcrumbs = this.props.searchTestInfoData[0].breadcrumb
            let author = this.props.searchTestInfoData[0].author || null
            if(parsed.isCategory && parsed.isCategory == 'true' && document.getElementById('package-includes') && this_package_will_include && this_package_will_include.tests && this_package_will_include.tests.length > 0){
                setTimeout(() => {
                    window.scrollTo(0,document.getElementById('package-includes').offsetTop)
                }, 200)
            }
            return (
                <div>
                    <HelmetTags tagsData={{
                        canonicalUrl: `${CONFIG.API_BASE_URL}/${canonicalUrl}`,
                        title: title,
                        description: description,
                    }} />
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
                                                        <h1 className="testInfoHeadTitle mrng-top-12"><img style={{ width: '20px' }} src={ASSETS_BASE_URL + "/img/icons/back-arrow.png"} className="img-fluid" onClick={this.closeTestInfo.bind(this)} />{this.props.searchTestInfoData[0].name} </h1>

                                                        {
                                                            breadcrumbs && breadcrumbs.length ?
                                                                <ul className="mrb-10 mrt-20 breadcrumb-list" style={{ wordBreak: 'break-word' }}>
                                                                    {
                                                                        breadcrumbs.map((breadcrumb, index) => {
                                                                            return <li key={index} className="breadcrumb-list-item">
                                                                                <a href={breadcrumb.url} onClick={(e) => {
                                                                                    e.preventDefault()
                                                                                    this.props.history.push(`${breadcrumb.url}`)
                                                                                }}>
                                                                                    <span className={index !== breadcrumbs.length - 1 ? `fw-500 breadcrumb-title breadcrumb-colored-title` : `fw-500 breadcrumb-title`}>{breadcrumb.title}</span>
                                                                                </a>
                                                                                {
                                                                                    index !== breadcrumbs.length - 1 ?
                                                                                        <span className="breadcrumb-arrow">&gt;</span> : ''
                                                                                }
                                                                            </li>
                                                                        })
                                                                    }
                                                                </ul> : ''
                                                        }

                                                        {
                                                            showInfo && this.props.searchTestInfoData && this.props.searchTestInfoData.length > 0 ?
                                                                <div className="table-of-content-mobile">
                                                                    <TableOfContent searchTestInfoData={this.props.searchTestInfoData[0]} updateTabsValues={this.updateTabsValues.bind(this)} resp_test_id={resp_test_id}/>
                                                                </div> : ''
                                                        }

                                                        <div className="widget mrb-15 mrng-top-12">
                                                            <div className="test-info-continer-block border-radius">
                                                                {this.props.searchTestInfoData[0].show_details ?
                                                                    <div className="test-info-acrd-head-main" id={resp_test_id}>
                                                                        <div className={`tst-main-acrd-data ${self.state.tabsValue.indexOf('test_' + resp_test_id) > -1 ? 'hide' : ''}`}>
                                                                            {about_test.value != "" ?
                                                                                <div className="test-sub-accordion">
                                                                                    <a className="anchor-link" id="about-test"></a>
                                                                                    <h2 className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'about_test_' + resp_test_id)}>{about_test.title} <span className={self.state.tabsValue.indexOf('about_test_' + resp_test_id) > -1 ? 'acrd-arw-rotate' : 'acrd-show'}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></h2>
                                                                                    <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('about_test_' + resp_test_id) > -1 ? 'hide' : ''}`}>
                                                                                        <div dangerouslySetInnerHTML={{ __html: about_test.value }}></div>
                                                                                    </div>
                                                                                </div>
                                                                                : ''
                                                                            }
                                                                            {why_get_tested.value != "" ?
                                                                                <div className="test-sub-accordion">
                                                                                    <a className="anchor-link" id="why-get-tested"></a>
                                                                                    <h2 className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'why_get_tested_' + resp_test_id)}>{why_get_tested.title} <span className={self.state.tabsValue.indexOf('why_get_tested_' + resp_test_id) > -1 ? 'acrd-arw-rotate' : 'acrd-show'}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></h2>
                                                                                    <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('why_get_tested_' + resp_test_id) > -1 ? 'hide' : ''}`}>
                                                                                        <div dangerouslySetInnerHTML={{ __html: why_get_tested.value }}></div>
                                                                                    </div>
                                                                                </div>
                                                                                : ''
                                                                            }
                                                                            {test_may_include.value.length > 0 ?
                                                                                <div className="test-sub-accordion">
                                                                                    <a className="anchor-link" id="test-includes"></a>
                                                                                    <h2 className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'test_include_' + resp_test_id)}>{test_may_include.title} <span className={self.state.tabsValue.indexOf('test_include_' + resp_test_id) > -1 ? 'acrd-arw-rotate' : 'acrd-show'}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></h2>
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

                                                                            {this_package_will_include && this_package_will_include.tests && this_package_will_include.tests.length > 0 ?
                                                                                <div className="test-sub-accordion">
                                                                                    <a className="anchor-link" id="package-includes"></a>
                                                                                    <h2 className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'test_include_' + resp_test_id)}>{this_package_will_include.title} <span className={self.state.tabsValue.indexOf('test_include_' + resp_test_id) > -1 ? 'acrd-arw-rotate' : 'acrd-show'}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></h2>
                                                                                    <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('test_include_' + resp_test_id) > -1 ? 'hide' : ''}`}>
                                                                                        <ul>
                                                                                            {Object.entries(this_package_will_include.tests).map(function ([k, test_include]) {
                                                                                                return <li key={k} id={test_include.id} className="mb-rmv">
                                                                                                    <div>
                                                                                                        <h2 className="tst-sub-acrd-heading padding-btn-adjust" onClick={self.ButtonHandler.bind(self, 'test_include_' + test_include.id)}>{`${test_include.name}  ${test_include.parameters && test_include.parameters.length > 0 ? `(${test_include.parameters.length})`:''}`} {test_include.parameters && test_include.parameters.length > 0 ? <span className={self.state.tabsValue.indexOf('test_include_' + test_include.id) > -1 ? 'acrd-show' : 'acrd-arw-rotate'}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span> : ''}</h2>
                                                                                                    </div>
                                                                                                    {
                                                                                                        test_include.parameters && test_include.parameters.length > 0 ?
                                                                                                            <ul className={self.state.tabsValue.indexOf('test_include_' + test_include.id) == -1 ? 'acrd-sub-content hide' : 'acrd-sub-content'}>
                                                                                                                {Object.entries(test_include.parameters).map(function ([p_k, parameter]) {
                                                                                                                    return <li key={p_k}>{parameter} </li>
                                                                                                                })}
                                                                                                            </ul>
                                                                                                            : ''
                                                                                                    }
                                                                                                </li>
                                                                                            })}
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                                : ''
                                                                            }

                                                                            {preparations.value != '' ?
                                                                                <div className="test-sub-accordion">
                                                                                    <a className="anchor-link" id="test-preparations"></a>
                                                                                    <h2 className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'test_preparations_' + resp_test_id)}>{preparations.title}<span className={self.state.tabsValue.indexOf('test_preparations_' + resp_test_id) > -1 ? 'acrd-arw-rotate' : 'acrd-show'}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></h2>
                                                                                    <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('test_preparations_' + resp_test_id) > -1 ? 'hide' : ''}`}>
                                                                                        <div dangerouslySetInnerHTML={{ __html: preparations.value }}>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                : ''
                                                                            }
                                                                            {faqs.length > 0 ?
                                                                                <div className="test-sub-accordion">
                                                                                    <a className="anchor-link" id="test-faq"></a>
                                                                                    <h2 className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'test_faq_' + resp_test_id)}>{faqs[0].title} <span className={self.state.tabsValue.indexOf('test_faq_' + resp_test_id) > -1 ? 'acrd-arw-rotate' : 'acrd-show'}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></h2>
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
                                                        {!parsed.test_ids
                                                            ? <div>
                                                                <div className="filter-title"
                                                                    style={{ height: 'auto', marginBottom: '10px' }}>

                                                                    {/*this.props.packagesList?this.props.packagesList.count:''*/}
                                                                    {labs && labs.count ? labs.count : '0'} Results found for
                                                                    <h1 className="search-result-heading">
                                                                        <span className="fw-700"> {SearchedCritera}</span>
                                                                    </h1>
                                                                    <span className="search-result-span">
                                                                        {
                                                                            this.state.showLocationPopup && false ? ''
                                                                                : locationName ? <span className="location-edit">{` in ${locationName}`}</span> : ''
                                                                        }
                                                                        <img style={{ width: 15, height: 15, marginLeft: 7, cursor: 'pointer' }} src={ASSETS_BASE_URL + "/img/customer-icons/edit.svg"} onClick={this.goToLocation.bind(this)} />
                                                                    </span>
                                                                </div>

                                                                {
                                                                    labs && labs.result.length > 0 ?
                                                                        Object.entries(labs.result).map(function ([k, lab]) {
                                                                            return <div key={k}>
                                                                                <LabProfileCard {...self.props} details={lab} key={k} rank={k} noClearTest={true} isTestInfo={true} />
                                                                            </div>
                                                                        }) : ''
                                                                }
                                                                {
                                                                    labs && labs.count > 0 ?
                                                                        <div className="mrb-20">
                                                                            <a className="viewAllLab" onClick={this.searchProceedLAB.bind(this, '')}> View all labs</a>
                                                                        </div>
                                                                        : ''
                                                                }
                                                            </div> : ''}

                                                        {
                                                            this.props.searchTestInfoData[0].frequently_booked_together && this.props.searchTestInfoData[0].frequently_booked_together.value.length > 0 ?
                                                                <div className="widget mrb-15 mrng-top-12 mrb-20">
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

                                                        {
                                                            author ?
                                                                <ArticleAuthor
                                                                    name={author.name}
                                                                    profileImage={author.profile_img}
                                                                    url={author.url}
                                                                    id={author.id}
                                                                    speciality={author.speciality[0].name}
                                                                    experience={author.experience}
                                                                    publishedDate={this.props.searchTestInfoData[0].published_date || null}
                                                                    history={this.props.history}
                                                                /> : ''
                                                        }

                                                    </div>
                                                </div>
                                                {!parsed.test_ids ?
                                                    <button onClick={this.proceedBookNow.bind(this, '')} className="p-3 v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn">Book Now
                                                <span className="text-xs selected-option static-btn book-right-align-text" style={{ verticalAlign: 2, marginRight: 8 }}> {`(${disableAddTest.length} Selected)`}</span>
                                                    </button>
                                                    : ''}
                                            </div> : <div className="col-12 col-md-7 col-lg-7 center-column">
                                                    <Loader />
                                                </div>
                                        }
                                        {
                                            showInfo && this.props.searchTestInfoData && this.props.searchTestInfoData.length > 0 ? 
                                            <ChatPanel noChatButton={true} searchTestInfoData={this.props.searchTestInfoData[0]} updateTabsValues={this.updateTabsValues.bind(this)} resp_test_id={resp_test_id} msgTemplate="gold_general_template"/>
                                            : <ChatPanel noChatButton={true} msgTemplate="gold_general_template"/>
                                        }
                                    </div>
                                </section>
                            </div>
                        </div>
                    </section>
                </div>
            )
        } else {
            return (
                <div>
                    <section className="fade-enter-done">
                        <div className="container-fluid">
                            <div className="profile-body-wrap">
                                <ProfileHeader showSearch={true} />
                                <section className="container parent-section book-appointment-section">
                                    <div className="row main-row parent-section-row">
                                        <div className="col-12 col-md-7 col-lg-7 center-column">
                                            <div className="row">
                                                <div className="col-12">
                                                    <p className="fw-500 text-center mrt-10" style={{ fontSize: 18 }}>No Record Found !!</p>
                                                </div>
                                            </div>
                                        </div>
                                        <ChatPanel noChatButton={true} />
                                    </div>
                                </section>
                            </div>
                        </div>
                    </section>
                </div>
            )
        }
    }
}

export default SearchTestView