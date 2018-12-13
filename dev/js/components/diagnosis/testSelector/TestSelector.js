import React from 'react';
import Loader from '../../commons/Loader'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import GTM from '../../../helpers/gtm.js'
import InfiniteScroll from 'react-infinite-scroller';

class TestSelectorView extends React.Component {
    constructor(props) {
        super(props)
        this.hideResultIndicator = this.hideResultIndicator.bind(this);
        this.state = {
            hasMore: false,
            selectedLab: this.props.match.params.id,
            searchResults: [],
            searchString: '',
            moreResultIndicator: true,
            page: 1
        }
    }

    componentDidMount() {
        let testIds = this.props.lab_test_data[this.state.selectedLab] || []
        testIds = testIds.map(x => x.id)

        this.props.getLabById(this.state.selectedLab, testIds)
        this.getSearchList("")

        if (window) {
            window.scrollTo(0, 0)
        }

        window.addEventListener('scroll', this.hideResultIndicator);

        setTimeout(() => {
            this.setState({ hasMore: true })
        }, 0)
    }

    hideResultIndicator = () => {
        window.scrollY > 10 ? this.setState({ moreResultIndicator: false }) : ""
    }

    toggleTest(test_to_toggle) {
        let test = Object.assign({}, test_to_toggle.test)
        test.mrp = test_to_toggle.mrp
        test.deal_price = test_to_toggle.deal_price
        test.extra_test = true
        test.lab_id = this.state.selectedLab

        this.props.toggleDiagnosisCriteria('test', test)
    }

    inputHandler(e) {
        this.setState({ searchString: e.target.value, hasMore: true, page: 1, searchResults: [] }, () => {
            this.getSearchList(this.state.searchString)
        })
        if (window) {
            window.scrollTo(0, 0)
        }

    }

    getSearchList(search_string, page_no = 1, cb) {
        this.props.getLabTests(this.state.selectedLab, search_string, (searchResults) => {
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
            let results = this.state.searchResults.concat(searchResults)
            this.setState({ loading: false, page: page + 1, searchResults: results, hasMore: searchResults.length >= 19 })
        })

    }


    render() {
        let labData = this.props.LABS[this.state.selectedLab]
        let selectedTests = this.props.lab_test_data[this.state.selectedLab] || []
        let selectedTestIds = selectedTests.map(x => x.id)
        let tests = []
        let testIds = []
        let allTests = this.state.searchResults
        let testVal = {}
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
                    tests.push({ ...criteria, test: criteria, ...testVal })
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
                                        <header className="skin-white fixed horizontal top location-detect-header sticky-header" style={{ top: 79 }}>
                                            <div className="container-fluid">
                                                <div className="row">
                                                    <div className="col-12" style={{ paddingTop: 10, borderBottom: '1px solid #d3d3d3' }}>
                                                        <div className="search-row">
                                                            <div className="adon-group location-detect-field">
                                                                <input type="text" className="form-control input-md search-input no-shadow" placeholder="Search Test" onChange={this.inputHandler.bind(this)} />
                                                                <span className="ct-img ct-img-sm map-marker-blue"><img src={ASSETS_BASE_URL + "/img/customer-icons/search-icon.svg"} className="img-fluid" /></span>
                                                            </div>
                                                            <div className="detect-my-locaiton rmv-pointer">
                                                                <span className="ct-img ct-img-xs" />
                                                                {
                                                                    selectedTestIds.length > 1 ? `${selectedTestIds.length} Items Selected` : `${selectedTestIds.length} Item Selected`
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </header>

                                        <section className="wrap" style={{ paddingTop: 0 }}>
                                            <div className="widget-panel">
                                                <div className="panel-content pd-0">
                                                    {/* <div className="detect-my-locaiton rmv-pointer mrt-10" style={{ textAlign: 'left', color: '#000000', paddingLeft: 20 }} >
                                                        {
                                                            this.state.searchString == '' ? tests.map((test, i) => {
                                                                return <li key={i + "srt"}>
                                                                    <label className="ck-bx" style={{ fontWeight: 400, fontSize: 14 }}>
                                                                        {test.test.name}
                                                                        <input type="checkbox" checked={selectedTestIds.indexOf(test.test.id) > -1} onChange={this.toggleTest.bind(this, test)} />
                                                                        <span className="checkmark" />
                                                                    </label>
                                                                    <span className="test-price text-sm">&#8377; {test.deal_price}<span className="test-mrp">&#8377; {test.mrp.split('.')[0]}</span></span>
                                                                </li>
                                                            })
                                                                : ''
                                                        }
                                                    </div> */}
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
                                                                                    <input type="checkbox" checked={selectedTestIds.indexOf(test.test.id) > -1} onChange={this.toggleTest.bind(this, test)} />
                                                                                    <span className="checkmark" />
                                                                                </label>
                                                                                <span className="test-price text-sm">&#8377; {test.deal_price}<span className="test-mrp">&#8377; {test.mrp.split('.')[0]}</span></span>
                                                                            </li>
                                                                        })
                                                                            : ''
                                                                    }
                                                                    {
                                                                        this.state.searchResults.map((test, i) => {
                                                                            return <li key={i + "srt"}>
                                                                                <label className="ck-bx" style={{ fontWeight: 400, fontSize: 14 }}>
                                                                                    {test.test.name}
                                                                                    <input type="checkbox" checked={selectedTestIds.indexOf(test.test.id) > -1} onChange={this.toggleTest.bind(this, test)} />
                                                                                    <span className="checkmark" />
                                                                                </label>
                                                                                <span className="test-price text-sm">&#8377; {test.deal_price}<span className="test-mrp">&#8377; {test.mrp.split('.')[0]}</span></span>
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

                        <RightBar extraClass=" chat-float-btn-2" />
                    </div>
                </section>
            </div>
        );

    }
}

export default TestSelectorView
