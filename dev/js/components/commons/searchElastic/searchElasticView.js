import React from 'react'

import CommonlySearched from '../../commons/commonlySearched/index.js'
import CriteriaElasticSearch from '../../commons/criteriaElasticSearch'
import GTM from '../../../helpers/gtm.js'
const queryString = require('query-string');


class SearchElasticView extends React.Component{
	constructor(props) {
        super(props)
        this.state = {}
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

    searchProceedOPD(doctor_name = "", hospital_name = "",hospital_id: "") {
        // handle doctor name, hospital name
        this.props.mergeOPDState({
            filterCriteria: {
                ...this.props.dataState.filterCriteria,
                doctor_name, hospital_name, hospital_id
            }
        }, true)

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
            }
        }, true)

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

    setCommonSelectedCriterias(type,criteria){
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

	render(){

        let title=''
        let searchProceed =''
        let showResults =''
        let commonSearched = ''

        if(this.props.selectedSearchType.includes('opd')){
            title="speciality, doctor, hospital, disease."
            searchProceed = this.searchProceedOPD.bind(this)
            showResults = this.showDoctors.bind(this)

            commonSearched = <CommonlySearched
                                    heading="Common Specialities"
                                    type="speciality"
                                    data={this.props.dataState.specializations}
                                    selected={[]/*this.props.selectedCriterias.filter(x => x.type == 'speciality')*/}
                                    toggle={this.setCommonSelectedCriterias.bind(this)}
                                />

        }else if(this.props.selectedSearchType.includes('lab')){
            title="test, lab, health package."
            searchProceed = this.searchProceedLAB.bind(this)
            showResults =  this.showLabs.bind(this)

            commonSearched = <CommonlySearched
                                    heading="Common Test"
                                    type="test"
                                    data={this.props.dataState.common_tests.filter(x => !x.is_package)}
                                    selected={this.props.dataState.selectedCriterias.filter(x => x.type == 'test').filter(x => !x.is_package)}
                                    toggle={this.props.toggleDiagnosisCriteria.bind(this)}
                                />

        }else{
            title="dental treatment, procedures."
            searchProceed = this.searchProceedOPD.bind(this)
            showResults = this.showDoctors.bind(this)

            commonSearched = <CommonlySearched
                                        heading="Common Dental Treatments"
                                        type="procedures"
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

		return(
			<section>
                <div id="map" style={{ display: 'none' }}></div>
                <div className="container-fluid">
                	<CriteriaElasticSearch {...this.props} checkForLoad={true} title={title} type={this.props.selectedSearchType} paddingTopClass={true} searchProceed={searchProceed} showResults = {showResults} focusInput={this.state.focusInput} hideHeaderOnMobile={true}>
                            <section className="opd-search-section mbl-pdng-zero">

                                {
                                    (this.props.selectedSearchType.includes('lab') && this.props.dataState.selectedCriterias && this.props.dataState.selectedCriterias.length > 0) ? <CommonlySearched
                                        heading={`View Selected (${this.props.dataState.selectedCriterias.length})`}
                                        data={this.props.dataState.selectedCriterias}
                                        selected={[]}
                                        selectedPills={true}
                                        toggle={this.props.toggleDiagnosisCriteria.bind(this)}
                                    /> : ""
                                }

                                {commonSearched}

                                {
                                    this.props.selectedSearchType.includes('lab')?
                                        <CommonlySearched
                                        heading="Common Health Packages"
                                        type="test"
                                        data={this.props.dataState.common_package}
                                        selected={this.props.dataState.selectedCriterias.filter(x => x.type == 'test').filter(x => x.is_package)}
                                        toggle={this.props.toggleDiagnosisCriteria.bind(this)}
                                    />:''
                                }

                                {
                                    this.props.selectedSearchType=='lab'?
                                    <button onClick={this.showLabs.bind(this)} className="p-3 v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn">{'Show Labs'}</button>
                                    :''
                                }

                            </section>
                    </CriteriaElasticSearch>

                </div>
            </section>
			)
	}
}

export default SearchElasticView