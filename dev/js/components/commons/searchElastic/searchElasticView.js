import React from 'react'

import CommonlySearched from '../../commons/commonlySearched/index.js'
import CriteriaElasticSearch from '../../commons/criteriaElasticSearch'
import GTM from '../../../helpers/gtm.js'
import FixedMobileFooter from '../Home/FixedMobileFooter.js';
const queryString = require('query-string');


class SearchElasticView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTestType: {},
            searchString:''
        }
    }

    componentDidMount() {
        if (window) {
            window.scroll(0, 0)
        }

        const parsed = queryString.parse(this.props.location.search)

        let data = {
            'Category': 'ConsumerApp', 'Action': 'OpenSearchPage', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': `open-search-from-${parsed.from || "default"}`, from: parsed.from
        }

        GTM.sendEvent({ data: data })
    }

    searchProceedOPD(doctor_name = "", hospital_name = "", hospital_id = "") {
        // handle doctor name, hospital name
        let state = {
            filterCriteria: {
                ...this.props.dataState.filterCriteria,
                doctor_name, hospital_name, hospital_id
            }
        }


        if (doctor_name || hospital_name || hospital_id) {
            state.selectedCriterias = []
            state.commonSelectedCriterias = []
        }

        this.props.mergeOPDState(state, true)

        /*        let data = {
                    'Category': 'ConsumerApp', 'Action': 'ShowDoctorsClicked', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'show-doctors-clicked'
                }
                GTM.sendEvent({ data: data })*/

        this.props.history.push({
            pathname: '/opd/searchresults',
            state: { search_back: true }
        })
    }

    searchProceedLAB(lab_name = "") {
        // handle doctor name, hospital name
        this.props.mergeLABState({
            filterCriteria: {
                ...this.props.dataState.filterCriteria,
                lab_name
            },
            currentSearchedCriterias:this.props.dataState.selectedCriterias,
            nextSelectedCriterias:this.props.dataState.selectedCriterias
        }, true)

        let selectedTestIds = this.props.dataState.selectedCriterias.map(test => test.id)
        let selectedTestsName = this.props.dataState.selectedCriterias.map(test => test.name)
        let data = {
            'Category': 'ConsumerApp', 'Action': 'ShowLabClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'show-lab-clicked', 'SelectedTestIds': selectedTestIds.join(',') || '', 'SelectedTestName': selectedTestsName.join(','), 'TestCount': selectedTestIds.length || 0
        }
        GTM.sendEvent({ data: data })

        this.props.history.push({
            pathname: '/lab/searchresults',
            state: { search_back: true }
        })
    }

    showDoctors(type) {
        if (this.props.locationType == "geo") {
            this.setState({ focusInput: 1 })
            if (window) {
                window.scrollTo(0, 0)
            }
            return null
        }

        this.searchProceedOPD("", "")
    }

    setCommonSelectedCriterias(type, criteria) {
        criteria = Object.assign({}, criteria)
        criteria.type = type
        this.props.cloneCommonSelectedCriterias(criteria)
        this.showDoctors()
    }

    showLabs() {
        if (this.props.locationType == "geo") {
            this.setState({ focusInput: 1 })
            if (window) {
                window.scrollTo(0, 0)
            }
            return null
        }
        this.searchProceedLAB("")
    }

    clickPopUp(type) {
        if (type == 1) {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'YesClickedLabTestPopup', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'yes-clicked-lab-test-popup', 'selected': this.state.currentTestType.name || '', 'selectedId': this.state.currentTestType.id || '', 'searched': this.state.searchString?'autosuggest':'', 'searchString': this.state.searchString
            }
            GTM.sendEvent({ data: data })
            this.props.toggleDiagnosisCriteria('test', this.state.currentTestType, true)
        } else {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'NoClickedLabTestPopup', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'no-clicked-lab-test-popup', 'searched': this.state.searchString?'autosuggest':'', 'searchString': this.state.searchString
            }
        }
        if (document.getElementById('search_results_view')) {
            document.getElementById('search_results_view').scrollIntoView()
        }
        this.setState({ currentTestType: {} })
    }

    toggleLabTests(type, criteria, searchString=""){
        let data = {
                'Category': 'ConsumerApp', 'Action': 'TestSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'test-selected', 'selected': criteria.name || '', 'selectedId': criteria.id || '', 'searched': 'autosuggest', 'searchString': searchString
            }
        GTM.sendEvent({ data: data })

        let selectedTestIds = []
        this.props.dataState.selectedCriterias.map((x) => {
            if (x.test_type) {
                selectedTestIds.push(x.test_type)
            }
        })
        if (selectedTestIds.length && criteria.test_type) {
            if (selectedTestIds.indexOf(criteria.test_type) == -1) {
                this.setState({ currentTestType: criteria, searchString: searchString })
                let data = {
                    'Category': 'ConsumerApp', 'Action': 'PopUpOpenLabTestError', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'popup-open-lab-test-error', 'selected': criteria.name || '', 'selectedId': criteria.id || '', 'searched': 'autosuggest', 'searchString': searchString
                }
                GTM.sendEvent({ data: data })
                return
            }
        }
        if (document.getElementById('search_results_view')) {
            document.getElementById('search_results_view').scrollIntoView()
        }
        
        this.props.toggleDiagnosisCriteria('test', criteria)
    }

    render() {

        let title = ''
        let searchProceed = ''
        let showResults = ''
        let commonSearched = ''

        if (this.props.selectedSearchType.includes('opd')) {
            title = "speciality, doctor, hospital, disease"
            searchProceed = this.searchProceedOPD.bind(this)
            showResults = this.showDoctors.bind(this)

            commonSearched = <CommonlySearched
                heading="Common Specialities"
                type="speciality"
                selectedSearchType = {this.props.selectedSearchType}
                data={this.props.dataState.specializations}
                selected={[]/*this.props.selectedCriterias.filter(x => x.type == 'speciality')*/}
                toggle={this.setCommonSelectedCriterias.bind(this)}
            />

        } else if (this.props.selectedSearchType.includes('lab')) {
            title = "test, lab, health package"
            searchProceed = this.searchProceedLAB.bind(this)
            showResults = this.showLabs.bind(this)

            commonSearched = <CommonlySearched
                heading="Common Test"
                type="test"
                selectedSearchType = {this.props.selectedSearchType}
                data={this.props.dataState.common_tests.filter(x => !x.is_package)}
                selected={this.props.dataState.selectedCriterias.filter(x => x.type == 'test').filter(x => !x.is_package)}
                toggle={this.toggleLabTests.bind(this)}
                selectedCriterias={this.props.dataState.selectedCriterias}
            />

        } else {
            title = "dental treatment, procedures"
            searchProceed = this.searchProceedOPD.bind(this)
            showResults = this.showDoctors.bind(this)

            commonSearched = <CommonlySearched
                heading="Common Dental Treatments"
                type="procedures"
                selectedSearchType = {this.props.selectedSearchType}
                data={this.props.dataState.procedures}
                selected={[]/*this.props.selectedCriterias.filter(x => x.type == 'procedures_category')*/}
                toggle={this.setCommonSelectedCriterias.bind(this)}
            />



            /*<CommonlySearched
                        heading="Common Dental Treatments"
                        type="procedures_category"
                        data={this.props.dataState.procedure_categories}
                        selected={[]}
                        toggle={this.setCommonSelectedCriterias.bind(this)}
                    />*/
        }

        return (
            <section>
                <div id="map" style={{ display: 'none' }}></div>
                <div className="container-fluid">
                    <CriteriaElasticSearch {...this.props} checkForLoad={true} title={title} type={this.props.selectedSearchType} paddingTopClass={true} searchProceed={searchProceed} showResults={showResults} focusInput={this.state.focusInput} hideHeaderOnMobile={true} toggleLabTests={this.toggleLabTests.bind(this)} searchElasticView={true}>
                        <section className="opd-search-section mbl-pdng-zero">

                            {
                                (this.props.selectedSearchType.includes('lab') && this.props.dataState.selectedCriterias && this.props.dataState.selectedCriterias.length > 0) ? <CommonlySearched {...this.props}
                                    heading={`View Selected (${this.props.dataState.selectedCriterias.length})`}
                                    data={this.props.dataState.selectedCriterias}
                                    selectedSearchType = {this.props.selectedSearchType}
                                    selected={[]}
                                    selectedPills={true}
                                    toggle={this.props.toggleDiagnosisCriteria.bind(this)}
                                /> : ""
                            }

                            {commonSearched}

                            {
                                this.props.selectedSearchType.includes('lab') ?
                                    <CommonlySearched {...this.props}
                                        heading="Common Health Packages"
                                        type="test"
                                        data={this.props.dataState.common_package}
                                        selectedSearchType = {this.props.selectedSearchType}
                                        selected={this.props.dataState.selectedCriterias.filter(x => x.type == 'test').filter(x => x.is_package)}
                                        toggle={this.props.toggleDiagnosisCriteria.bind(this)}
                                    /> : ''
                            }

                            {
                                this.props.selectedSearchType == 'lab' ?
                                    <button onClick={this.showLabs.bind(this)} className="p-3 v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn">Show Labs</button>
                                    : ''
                            }

                            {
                                Object.values(this.state.currentTestType).length ?
                                    <div className="search-el-popup-overlay " >
                                        <div className="search-el-popup">
                                            <div className="widget">
                                                <div className="widget-content padiing-srch-el">
                                                    <p className="srch-el-conent">
                                                        {`Pathology and Radiology tests (lab visit
                                                    required) cannot be booked together. Do you want to search ${this.state.currentTestType.name}  test instead ?`}</p>
                                                    <div className="search-el-btn-container">
                                                        <button onClick={this.clickPopUp.bind(this, 1)}>Yes</button>
                                                        <span className="src-el-btn-border"></span>
                                                        <button onClick={this.clickPopUp.bind(this, 2)}>No</button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    : ''
                            }

                        </section>
                    </CriteriaElasticSearch>

                </div>
                {
                    this.props.selectedSearchType === 'opd' || this.props.selectedSearchType === 'procedures' ?
                        <FixedMobileFooter {...this.props} /> : ''
                }
            </section>
        )
    }
}

export default SearchElasticView