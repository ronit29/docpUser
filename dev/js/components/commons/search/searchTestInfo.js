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
            search_id:'',
            searchCities:[],
            showLocationPopup: true,
            showPopupContainer: true,
            overlayVisible:true,
            lab_card: this.props.location.search.includes('lab_card') || null,
            isSeo:parsed.isSeo?false:true
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
        let searchById = url.searchParams.get("searchById")
        var selected_test_ids = url.searchParams.get("selected_test_ids")
        let last_page = url.searchParams.get("from")
        let search_id = url.searchParams.get("search_id")
        let lab_id = ''
        lab_id = url.searchParams.get("lab_id")
        let test_id_val = []
        let allTest = []
        let all_test_id = []
        let ferq_heading
        let url_test_ids = selected_test_ids.split(',')
        let test_url
        {
            Object.entries(url_test_ids).map(function ([key, value]) {
                all_test_id.push(parseInt(value))
            })
        }
        this.setState({ lastSource: last_page, search_id:search_id })
        if (test_id != null) {
            if(searchById){
                test_url = ''
            }else{
                test_url = this.props.match.url
                test_id = ''
                if (test_url) {
                    test_url = test_url.split("/")[1]
                }
            }
            this.props.searchTestData(test_id,test_url, lab_id, (resp) => {
                {
                    Object.entries(resp).map(function ([key, value]) {
                        let testIds = allTest.map(x => x.id)
                        if (testIds.indexOf(value.frequently_booked_together.value.id) == -1) {
                            allTest = allTest.concat(value.frequently_booked_together.value)
                        }
                        if (resp.length > 0) {
                            ferq_heading = value.frequently_booked_together.title
                            all_test_id.concat(value.id)
                            let why_get_tested, test_include, test_preparations, test_faq, selected_test_id
                            why_get_tested = "why_get_tested_" + value.id
                            test_include = "test_include_" + value.id
                            test_preparations = "test_preparations_" + value.id
                            test_faq = "test_faq_" + value.id
                            test_id_val.push(why_get_tested)
                            test_id_val.push(test_include)
                            test_id_val.push(test_preparations)
                            test_id_val.push(test_faq)
                            if (key != 0) {
                                selected_test_id = 'test_' + value.id
                                test_id_val.push(selected_test_id)
                            }
                        }
                    })
                }
                this.setState({ tabsValue: test_id_val, allFrequentlyTest: allTest, lab_id: lab_id, frequently_heading: ferq_heading, disableAddTest: all_test_id })
            })
        }
        // if (this.props.seoData && this.props.seoData.location) {
        //     this.setState({ showLocationPopup: false })
        // } else {
        //     if (this.props.locationType.includes("geo")) {
        //         this.setState({ showLocationPopup: true, overlayVisible: true })
        //     }
        // }
    }
    // componentWillReceiveProps(props) {
    //     this.setState({ ...props.filterCriteria })
    //     if (props.locationType && !props.locationType.includes("geo")) {
    //         this.setState({ showLocationPopup: false })
    //     } else {
    //         if (props.seoData && props.seoData.location) {
    //             this.setState({ showLocationPopup: false })
    //         } else {
    //             if (props.selectedLocation != this.props.selectedLocation) {
    //                 this.setState({ showLocationPopup: true, overlayVisible: true })
    //             }
    //         }
    //     }
    // }
    closeTestInfo() {
        if (this.state.lastSource == 'search') {
            this.props.history.push('/search')
        } else {
            window.history.back()
        }
    }
    frequentlyAddTest(field, name, show_details, event) {
        let self = this
        let test = {}
        let added_test = [].concat(this.state.disableAddTest)
        added_test.push(field)
        self.setState({ disableAddTest: added_test })
        if (this.state.lab_id != null) {
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
        if(this.state.search_id !== null){
        let newTestData = {}
            newTestData.type= 'test'
            newTestData.name= ''
            newTestData.id = field
            newTestData.show_details = show_details
        let newSearchIdData=[]
        newSearchIdData= this.props.search_id_data[this.state.search_id].commonSelectedCriterias
        newSearchIdData.push(newTestData)
        let filters = {}
            filters.commonSelectedCriterias = newSearchIdData
            filters.filterCriteria = this.props.search_id_data[this.state.search_id].filterCriteria
        self.props.setLabSearchId(this.state.search_id, filters, true)  
        }
        self.props.toggleDiagnosisCriteria('test', test, false)
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

    // hideLocationPopup() {
    //     this.setState({ showLocationPopup: false });
    // }

    // popupContainer() {
    //     this.setState({ showPopupContainer: false, showLocationPopup: false });
    // }

    // overlayClick() {
    //     this.setState({ overlayVisible: false, searchCities: [] });
    // }

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
            currentSearchedCriterias:this.props.selectedCriterias,
            nextSelectedCriterias:this.props.selectedCriterias
        }, true)

        // let selectedTestIds = this.props.selectedCriterias.map(test => test.id)
        // let selectedTestsName = this.props.selectedCriterias.map(test => test.name)
        // let data = {
        //     'Category': 'ConsumerApp', 'Action': 'ShowLabClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'show-lab-clicked', 'SelectedTestIds': selectedTestIds.join(',') || '', 'SelectedTestName': selectedTestsName.join(','), 'TestCount': selectedTestIds.length || 0
        // }
        // GTM.sendEvent({ data: data })

        this.props.history.push({
            pathname: '/lab/searchresults',
            state: { search_back: true }
        })
    }

    render() {
        // console.log(this.props)
        let locationName = ""
        if (this.props.selectedLocation && this.props.selectedLocation.formatted_address) {
            locationName = this.props.selectedLocation.formatted_address
        }
        if (this.props.seoData && this.props.seoData.location) {
            locationName = this.props.seoData.location
        }
        if (this.props.searchTestInfoData && this.props.searchTestInfoData.length > 0) {
            let {labs} = this.props.searchTestInfoData[0]
            let self = this
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
                                        <div className="col-12 col-md-7 col-lg-7 center-column">
                                            <div className="row mrb-20">
                                                <div className="col-12">
                                                    <h3 className="test-main-heding-h3 mrng-top-12">Test Information <img src={ASSETS_BASE_URL + "/img/customer-icons/rt-close.svg"} className="img-fluid" onClick={this.closeTestInfo.bind(this)} /></h3>
                                                    <div className="widget mrb-15 mrng-top-12">
                                                        <div className="test-info-continer-block">
                                                            {Object.entries(this.props.searchTestInfoData).map(function ([key, value]) {
                                                                return value.show_details ?
                                                                    <div className="test-info-acrd-head-main" id={value.id} key={key}>
                                                                        <button className="test-top-main-haeding" onClick={self.ButtonHandler.bind(self, 'test_' + value.id)}>{value.name}<span className={self.state.tabsValue.indexOf('test_' + value.id) > -1 ? 'acrd-arw-rotate' : 'acrd-show'}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                        <div className={`tst-main-acrd-data ${self.state.tabsValue.indexOf('test_' + value.id) > -1 ? 'hide' : ''}`}>
                                                                            {value.about_test.value != "" ?
                                                                                <div className="test-sub-accordion">
                                                                                    <button className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'about_test_' + value.id)}>{value.about_test.title} <span className={self.state.tabsValue.indexOf('about_test_' + value.id) > -1 ? 'acrd-arw-rotate' : 'acrd-show'}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                                    <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('about_test_' + value.id) > -1 ? 'hide' : ''}`}>
                                                                                        <div dangerouslySetInnerHTML={{ __html: value.about_test.value }}></div>
                                                                                    </div>
                                                                                </div>
                                                                                : ''
                                                                            }
                                                                            {value.why_get_tested.value != "" ?
                                                                                <div className="test-sub-accordion">
                                                                                    <button className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'why_get_tested_' + value.id)}>{value.why_get_tested.title} <span className={self.state.tabsValue.indexOf('why_get_tested_' + value.id) > -1 ? 'acrd-arw-rotate' : 'acrd-show'}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                                    <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('why_get_tested_' + value.id) > -1 ? 'hide' : ''}`}>
                                                                                        <div dangerouslySetInnerHTML={{ __html: value.why_get_tested.value }}></div>
                                                                                    </div>
                                                                                </div>
                                                                                : ''
                                                                            }
                                                                            {value.test_may_include.value.length > 0 ?
                                                                                <div className="test-sub-accordion">
                                                                                    <button className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'test_include_' + value.id)}>{value.test_may_include.title} <span className={self.state.tabsValue.indexOf('test_include_' + value.id) > -1 ? 'acrd-arw-rotate' : 'acrd-show'}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                                    <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('test_include_' + value.id) > -1 ? 'hide' : ''}`}>
                                                                                        <ul>
                                                                                            {Object.entries(value.test_may_include.value).map(function ([k, test_include]) {
                                                                                                return <li key={k}>{test_include}</li>
                                                                                            })}
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                                : ''
                                                                            }
                                                                            {value.preparations.value != '' ?
                                                                                <div className="test-sub-accordion">
                                                                                    <button className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'test_preparations_' + value.id)}>{value.preparations.title}<span className={self.state.tabsValue.indexOf('test_preparations_' + value.id) > -1 ? 'acrd-arw-rotate' : 'acrd-show'}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                                    <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('test_preparations_' + value.id) > -1 ? 'hide' : ''}`}>
                                                                                        <div dangerouslySetInnerHTML={{ __html: value.preparations.value }}>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                : ''
                                                                            }
                                                                            {value.faqs.length > 0 ?
                                                                                <div className="test-sub-accordion">
                                                                                    <button className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'test_faq_' + value.id)}>{value.faqs[0].title} <span className={self.state.tabsValue.indexOf('test_faq_' + value.id) > -1 ? 'acrd-arw-rotate' : 'acrd-show'}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                                    <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('test_faq_' + value.id) > -1 ? 'hide' : ''}`}>
                                                                                        {value.faqs.length > 0 ? Object.entries(value.faqs).map(function ([k, faq]) {
                                                                                            return <div>
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
                                                            })}
                                                        </div>
                                                    </div>
                                                    {this.state.isSeo
                                                    ?<div>
                                                        <div className="filter-title" 
                                                        style={{height:'auto',marginBottom:'10px'}}>
                                                
                                                            {/*this.props.packagesList?this.props.packagesList.count:''*/}  5 Results found for 
                                                            <h1 className="search-result-heading">
                                                            <span className="fw-700"> CBC</span>
                                                            </h1>
                                                            <span className="search-result-span" onClick={this.goToLocation.bind(this)}>

                                                                {
                                                                    this.state.showLocationPopup && false ? ''
                                                                        : locationName ? <span className="location-edit" style={{ color: '#f6843a', cursor: 'pointer' }}>{` in ${locationName}`}</span> : ''
                                                                }
                                                                <img style={{ width: 15, height: 15, marginLeft: 7, cursor: 'pointer' }} src={ASSETS_BASE_URL + "/img/customer-icons/edit.svg"} />
                                                            </span>
                                                        </div>
                                                        {/*{
                                                            this.state.showLocationPopup ?
                                                                this.state.lab_card && this.state.showPopupContainer ?
                                                                    <LocationPopup {...this.props} onRef={ref => (this.child = ref)} resultType='list' isTopbar={true} hideLocationPopup={() => this.hideLocationPopup()} locationName={locationName} criteriaString={criteriaStr} popupContainer={() => this.popupContainer()} />
                                                                    : <LocationElements {...this.props} onRef={ref => (this.child = ref)} resultType='list' isTopbar={true} hideLocationPopup={() => this.hideLocationPopup()} locationName={locationName} />
                                                                : ''
                                                        }

                                                        {
                                                            this.state.showLocationPopup && this.state.overlayVisible && !this.state.lab_card ?
                                                                <div className="locationPopup-overlay" onClick={() => this.overlayClick()} ></div> : ''
                                                        }

                                                        {
                                                            this.state.showLocationPopup && this.state.lab_card && this.state.showPopupContainer ?
                                                                <div className="popupContainer-overlay"></div>
                                                                : ''
                                                        }*/}
                                                        {
                                                            labs.result.length>0?
                                                            Object.entries(labs.result).map(function ([k, lab]) {
                                                                return <div key={k}>
                                                                <LabProfileCard {...self.props} details={lab} key={k} rank={k} noClearTest={true}/>
                                                                </div>
                                                            }):''
                                                        }
                                                        <div>
                                                        <a className="viewAllLab" onClick={this.searchProceedLAB.bind(this)}> View all labs</a>
                                                        </div>
                                                    </div>:''}
                                                    {
                                                        this.state.allFrequentlyTest.length > 0 ?
                                                            <div className="widget mrb-15 mrng-top-12">
                                                                <div className="widget-content">
                                                                    <h5 className="test-duo-heding"> {this.state.frequently_heading}</h5>
                                                                    <ul className="test-duo-listing">
                                                                        {Object.entries(this.state.allFrequentlyTest).map(function ([k, frequently]) {
                                                                            return <li key={k}><p>{frequently.lab_test}</p>
                                                                                <button className={self.state.disableAddTest.indexOf(frequently.id) > -1 ? 'disable-btn' : ''} id={frequently.id} onClick={self.frequentlyAddTest.bind(self, frequently.id, frequently.lab_test,frequently.show_details)} disabled={self.state.disableAddTest.indexOf(frequently.id) > -1 ? true : ''}>{self.state.disableAddTest.indexOf(frequently.id) > -1 ? 'Test Added' : 'Add Test'}</button>
                                                                            </li>
                                                                        })}
                                                                    </ul>

                                                                </div>
                                                            </div>
                                                            : ''
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <ChatPanel />
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