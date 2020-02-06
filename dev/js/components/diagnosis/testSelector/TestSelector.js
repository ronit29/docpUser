import React from 'react';
import Loader from '../../commons/Loader'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import GTM from '../../../helpers/gtm.js'
import InfiniteScroll from 'react-infinite-scroller';
const queryString = require('query-string');

class TestSelectorView extends React.Component {
    constructor(props) {
        super(props)

        const parsed = queryString.parse(this.props.location.search)

        let lab_id = this.props.selectedLab

        this.hideResultIndicator = this.hideResultIndicator.bind(this);
        this.state = {
            hasMore: false,
            selectedLab: lab_id,
            searchResults: [],
            searchString: '',
            moreResultIndicator: true,
            page: 1,
            itemSelectedVisible: true
        }
    }

    fetchData(props) {
        if (props.selectedLab) {
            let testIds = props.lab_test_data[props.selectedLab] || []
            testIds = testIds.map(x => x.id)

            props.getLabById(props.selectedLab, testIds)
            this.getSearchList("")

            if (this.inputRef) {
                this.inputRef.focus();
            }

            if (window) {
                window.scrollTo(0, 0)
            }

            window.addEventListener('scroll', this.hideResultIndicator);

            setTimeout(() => {
                this.setState({ hasMore: true })
            }, 0)
        }
    }

    componentWillReceiveProps(props) {
        if (props.selectedLab != this.props.selectedLab) {
            this.fetchData(props)
        }
    }
    
    componentDidMount() {
        this.fetchData(this.props)
    }

    hideResultIndicator = () => {
        window.scrollY > 10 ? this.setState({ moreResultIndicator: false }) : ""
    }

    toggleTest(test_to_toggle) {
        let test = Object.assign({}, test_to_toggle.test)
        test.mrp = test_to_toggle.mrp
        test.deal_price = test_to_toggle.deal_price
        test.extra_test = true
        test.lab_id = this.props.selectedLab

        this.props.toggleDiagnosisCriteria('test', test)
    }

    inputHandler(e) {
        this.setState({ searchString: e.target.value, hasMore: true, page: 1, searchResults: [] }, () => {
            this.getSearchList(this.state.searchString)
        })
        if (window) {
            window.scrollTo(0, 0)
        }
        if (e.target.value) {
            this.setState({ itemSelectedVisible: false })
        } else {
            this.setState({ itemSelectedVisible: true })
        }
    }

    getSearchList(search_string, page_no = 1, cb) {
        this.props.getLabTests(this.props.selectedLab, search_string, (searchResults) => {
            if (searchResults) {
                if (cb) {
                    cb(searchResults)
                } else {
                    this.setState({ searchResults: searchResults })
                }
            }
        }, page_no)
        search_string ? this.setState({ moreResultIndicator: false }) : ""
    }

    loadMore() {
        let page = this.state.page
        this.setState({ hasMore: false, loading: true })

        this.getSearchList(this.state.searchString, page + 1, (searchResults) => {
            searchResults = searchResults || []
            let results = this.state.searchResults.concat(searchResults)
            let dedupe = {}
            results = results.filter((test) => {
                if (!dedupe[test.test.id]) {
                    dedupe[test.test.id] = true
                    return true
                }
                return false
            })
            let more = false
            if (results > this.state.searchResults) {
                more = true
            }
            this.setState({ loading: false, page: page + 1, searchResults: results, hasMore: more })
        })

    }

    testInfo(test_id, url, event) {
        let lab_id = this.props.selectedLab
        let selected_test_ids = this.props.selectedCriterias || []
        selected_test_ids = selected_test_ids.map(x => x.id)
        let lat = 28.644800
        let long = 77.216721
        if (this.props.selectedLocation !== null) {
            lat = this.props.selectedLocation.geometry.location.lat
            long = this.props.selectedLocation.geometry.location.lng

            if (typeof lat === 'function') lat = lat()
            if (typeof long === 'function') long = long()
        }
        if (url && url != '') {
            this.props.history.push('/' + url + '?test_ids=' + test_id + '&lab_id=' + lab_id + '&selected_test_ids=' + selected_test_ids + '&lat=' + lat + '&long=' + long)
        } else {
            this.props.history.push('/search/testinfo?test_ids=' + test_id + '&lab_id=' + lab_id + '&selected_test_ids=' + selected_test_ids + '&lat=' + lat + '&long=' + long)
        }
        event.stopPropagation()
        let data = {
            'Category': 'ConsumerApp', 'Action': 'testInfoClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'test-info-click', 'pageSource': 'lab-test-page'
        }
        GTM.sendEvent({ data: data })
    }
    render() {
        let labData = this.props.LABS[this.props.selectedLab]
        let selectedTests = this.props.lab_test_data[this.props.selectedLab] || []
        let selectedTestIds = selectedTests.map(x => x.id)
        let tests = []
        let testIds = []
        let allTests = this.state.searchResults
        let testVal = {}
        let is_user_insured = false
        let is_user_vip = false
        let is_user_gold_vip = false

        //Check for USER STATUS

        if(this.props.profiles && this.props.profiles[this.props.defaultProfile]){
            is_user_insured = this.props.profiles[this.props.defaultProfile].is_insured
            is_user_vip = this.props.profiles[this.props.defaultProfile].is_vip_member
            is_user_gold_vip = this.props.profiles[this.props.defaultProfile].is_vip_gold_member
        }

        if (labData) {

            selectedTests.map((criteria) => {
                let found = false
                testVal = {}
                for (let test of allTests) {
                    if (test.test.id == criteria.id) {
                        found = true
                        testVal = test
                    }
                }
                if (!found) {
                    testIds.push(criteria.id)
                    //GET insurance Data
                    let test_insured = []
                    let insurance_data = {}
                    if (this.props.currentLabSelectedTests && this.props.currentLabSelectedTests.length) {
                        test_insured = this.props.currentLabSelectedTests.filter((x => x.id == criteria.id))
                        if (test_insured && test_insured.length && test_insured[0].insurance) {
                            insurance_data = test_insured[0].insurance
                        }
                    }
                    tests.push({ ...criteria, test: criteria, ...testVal, ...insurance_data })
                }
            })
            tests = labData && labData.tests ? labData.tests.filter((x => testIds.indexOf(x.test.id) > -1)) : []
        }

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container parent-section test-search-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            {
                                labData ?

                                    <div>
                                        <header className="skin-white fixed horizontal top location-detect-header sticky-header" style={{ top: 44 }}>
                                            <div className="container-fluid">
                                                <div className="row">
                                                    <div className="col-12" style={{ paddingTop: 10, borderBottom: '1px solid #d3d3d3' }}>
                                                        <div className="search-row">
                                                            <div className="adon-group location-detect-field">
                                                                <input type="text" ref={(input) => { this.inputRef = input; }} className="new-srch-doc-lab" placeholder="Search Test" onChange={this.inputHandler.bind(this)} />
                                                                <img className="srch-inp-img" src={ASSETS_BASE_URL + "/img/shape-srch.svg"} style={{ width: 15 }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </header>

                                        <section className="wrap" style={{ paddingTop: 0 }}>
                                            <div className="widget-panel">
                                                <div className="panel-content pd-0">
                                                    <div>
                                                        <p className="label-cpn text-right">Coupon applies at booking summary</p>
                                                    </div>
                                                    <div className="detect-my-locaiton rmv-pointer mrt-10" style={{ textAlign: 'left', color: '#000', paddingLeft: "20px" }}>
                                                        {
                                                            this.state.itemSelectedVisible ?
                                                                selectedTestIds.length > 1 ? `${selectedTestIds.length} Items Selected` : `${selectedTestIds.length} Item Selected` : ''
                                                        }
                                                    </div>
                                                    <ul className="list all-test-list mrt-10" id="lab-tests-list">
                                                        {
                                                            this.state.searchResults.length ?
                                                                <InfiniteScroll
                                                                    pageStart={0}
                                                                    loadMore={this.loadMore.bind(this)}
                                                                    hasMore={this.state.hasMore}
                                                                    useWindow={true}
                                                                >
                                                                    {
                                                                        this.state.searchString == '' ? tests.map((test, i) => {
                                                                            return <li key={i + "srt"}>
                                                                                <label className="ck-bx" style={{ fontWeight: 400, fontSize: 14 }}>
                                                                                    {test.test.name}
                                                                                    {test.test.show_details ?
                                                                                        <span style={{ 'marginLeft': '5px', marginTop: '2px', display: 'inline-block' }} onClick={this.testInfo.bind(this, test.test.id, test.url)}>
                                                                                            <img src="https://cdn.docprime.com/cp/assets/img/icons/Info.svg" style={{width:'15px'}} />
                                                                                        </span> : ''}
                                                                                    <input type="checkbox" checked={selectedTestIds.indexOf(test.test.id) > -1} onChange={this.toggleTest.bind(this, test)} />
                                                                                    <span className="checkmark" />
                                                                                </label>
                                                                                {
                                                                                    test.insurance && test.insurance.is_insurance_covered && test.insurance.is_user_insured || test.included_in_user_plan ?
                                                                                        <div className="test-price text-sm">&#8377; {0}</div>
                                                                                        :
                                                                                        test.deal_price == test.mrp.split('.')[0] ?
                                                                                            <span className="test-price text-sm">&#8377; {test.deal_price}</span>
                                                                                            :
                                                                                            <span className="test-price text-sm">&#8377; {test.deal_price}<span className="test-mrp">&#8377; {test.mrp.split('.')[0]}</span></span>
                                                                                }
                                                                            </li>
                                                                        })
                                                                            : ''
                                                                    }
                                                                    {
                                                                        this.state.searchResults.map((test, i) => {
                                                                            return <li key={i + "srt"}>
                                                                                <label className="ck-bx" style={{ fontWeight: 400, fontSize: 14 }}>
                                                                                    {test.test.name}
                                                                                    {test.test.show_details ?
                                                                                        <span style={{ 'marginLeft': '5px', marginTop: '2px', display: 'inline-block' }} onClick={this.testInfo.bind(this, test.test.id, test.url)}>
                                                                                            <img src="https://cdn.docprime.com/cp/assets/img/icons/Info.svg" style={{width:'15px'}} />
                                                                                        </span> : ''}
                                                                                    <input type="checkbox" checked={selectedTestIds.indexOf(test.test.id) > -1} onChange={this.toggleTest.bind(this, test)} />
                                                                                    <span className="checkmark" />
                                                                                </label>
                                                                                {
                                                                                    test.insurance && test.insurance.is_insurance_covered && test.insurance.is_user_insured || test.included_in_user_plan ?
                                                                                        <div className="test-price text-sm">&#8377; {0}</div>
                                                                                        :(is_user_vip || is_user_gold_vip)
                                                                                          ?( (parseInt(test.vip.vip_gold_price) + parseInt(test.vip.vip_convenience_amount) ) == test.mrp.split('.')[0] ) ?
                                                                                            <span className="test-price text-sm">&#8377; {parseInt(test.vip.vip_gold_price||0) + parseInt(test.vip.vip_convenience_amount||0)}</span>
                                                                                            :<span className="test-price text-sm">&#8377; { parseInt(test.vip.vip_gold_price) + parseInt(test.vip.vip_convenience_amount) }<span className="test-mrp">&#8377; {test.mrp.split('.')[0]}</span></span>
                                                                                          :test.deal_price == test.mrp.split('.')[0] ?
                                                                                            <span className="test-price text-sm">&#8377; {test.deal_price}</span>
                                                                                            :<span className="test-price text-sm">&#8377; {test.deal_price}<span className="test-mrp">&#8377; {test.mrp.split('.')[0]}</span></span>
                                                                                }
                                                                            </li>
                                                                        })
                                                                    }

                                                                </InfiniteScroll>
                                                                : ''
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </section>

                                        <button className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn" onClick={() => {
                                            let data = {
                                                'Category': 'ConsumerApp', 'Action': 'DoneClickedOnAddTestPage', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'done-clicked-add-test-page'
                                            }
                                            GTM.sendEvent({ data: data })
                                            this.props.history.go(-1)
                                        }}>Done</button>
                                    </div> : <Loader />
                            }
                            {/* {
                                this.state.moreResultIndicator ?
                                    <div className="more-test-results-div d-none d-lg-flex">
                                        <span>more</span>
                                        <img src={ASSETS_BASE_URL + "/img/customer-icons/downarrow_white.svg"} />
                                    </div> : ""
                            } */}
                        </div>

                        <RightBar extraClass=" chat-float-btn-2" type="lab" msgTemplate="gold_general_template"/>
                    </div>
                </section>
            </div>
        );

    }
}

export default TestSelectorView
