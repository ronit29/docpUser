import React from 'react';
import Loader from '../../commons/Loader'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'

class TestSelectorView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLab: this.props.match.params.id,
            searchResults: [],
            searchString: ''
        }
    }

    componentDidMount() {
        let tests = this.props.selectedCriterias.filter(x => x.type == "test").map(x => x.id)
        this.props.getLabById(this.state.selectedLab, tests)
        this.getSearchList({ target: { value: "" } })

        if (window) {
            window.scrollTo(0, 0)
        }
    }

    toggleTest(test) {
        test.extra_test = true
        this.props.toggleDiagnosisCriteria('test', test)
    }

    getSearchList(e) {
        var search_string = e.target.value;
        this.setState({ searchString: search_string });
        this.props.getLabTests(this.state.selectedLab, search_string, (searchResults) => {
            this.setState({ searchResults: searchResults });
        })
    }


    render() {
        let labData = this.props.LABS[this.state.selectedLab]
        let tests = []
        let selectedTests = []

        if (this.props.selectedCriterias && this.props.selectedCriterias.length) {
            selectedTests = this.props.selectedCriterias.filter(x => x.type == 'test').map(x => x.id)
        }

        if (labData) {

            this.props.selectedCriterias.map((criteria) => {
                let found = false
                for (let test of labData.tests) {
                    if (test.test.id == criteria.id) {
                        found = true
                    }
                }
                if (!found) {
                    labData.tests.push({ ...criteria, test: criteria })
                }
            })

            let selected_tests = labData.tests.map((test, i) => {
                if (selectedTests.indexOf(test.test.id) > -1) {
                    return <li key={i + "st"}>
                        <label className="ck-bx">
                            {test.test.name}
                            <input type="checkbox" checked={true} onChange={this.toggleTest.bind(this, test.test)} />
                            <span className="checkmark" />
                        </label>
                        <span className="test-price text-md fw-500">{test.deal_price}</span>
                    </li>
                }
            })

            let searched_tests = this.state.searchResults.filter((test) => {
                let not_found = true
                for (let criteria of this.props.selectedCriterias) {
                    if (test.test.id == criteria.id) {
                        not_found = false
                        break
                    }
                }
                return not_found
            }).map((test, i) => {
                return <li key={i + "srt"}>
                    <label className="ck-bx">
                        {test.test.name}
                        <input type="checkbox" checked={selectedTests.indexOf(test.test.id) > -1} onChange={this.toggleTest.bind(this, test.test)} />
                        <span className="checkmark" />
                    </label>
                    <span className="test-price text-md fw-500">{test.deal_price}</span>
                </li>
            })

            tests = [...selected_tests, ...searched_tests]

            if (tests.length == 0) {
                tests = <li>No Data Found</li>
            }

        }

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container parent-section test-search-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-0 center-column">
                            {
                                labData ?

                                    <div>
                                        <header className="skin-white fixed horizontal top location-detect-header sticky-header">
                                            <div className="container-fluid">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="select-location-row text-center">
                                                            <span onClick={() => {
                                                                this.props.history.go(-1)
                                                            }} className="ct-img ct-img-md close"><img src="/assets/img/customer-icons/close-black.svg" className="img-fluid" /></span>
                                                            <h4 className="fw-700 text-md">All Test</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="search-row">
                                                            <div className="adon-group location-detect-field">
                                                                <input type="text" className="form-control input-md search-input no-shadow" placeholder="Search Test" onChange={this.getSearchList.bind(this)} />
                                                                <span className="ct-img ct-img-sm map-marker-blue"><img src="/assets/img/customer-icons/search-icon.svg" className="img-fluid" /></span>
                                                            </div>
                                                            <div className="detect-my-locaiton">
                                                                <span className="ct-img ct-img-xs" />
                                                                {selectedTests.length} Selected Item
                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </header>

                                        <section className="wrap all-test-screen ">
                                            <div className="widget-panel">
                                                <div className="panel-content pd-0">
                                                    <ul className="list all-test-list">
                                                        {tests}
                                                    </ul>
                                                </div>
                                            </div>
                                        </section>

                                        <button className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn" onClick={() => {
                                            this.props.history.go(-1)
                                        }}>Done</button>
                                    </div> : <Loader />
                            }

                        </div>

                        <RightBar />
                    </div>
                </section>
            </div>
        );
    }
}

export default TestSelectorView
