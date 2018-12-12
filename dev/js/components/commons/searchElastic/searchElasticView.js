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
            window.scrollTo(0, 0)
        }

        const parsed = queryString.parse(this.props.location.search)

        let data = {
            'Category': 'ConsumerApp', 'Action': 'OpenSearchPage', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': `open-search-from-${parsed.from || "default"}`, from: parsed.from
        }

        GTM.sendEvent({ data: data })
    }

    searchProceedOPD(doctor_name = "", hospital_name = "") {
        // handle doctor name, hospital name
        this.props.mergeOPDState({
            filterCriteria: {
                ...this.props.dataState.filterCriteria,
                doctor_name, hospital_name
            }
        }, true)

        let data = {
            'Category': 'ConsumerApp', 'Action': 'ShowDoctorsClicked', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'show-doctors-clicked'
        }
        GTM.sendEvent({ data: data })

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

        /*if (type) {
            this.props.filterSelectedCriteria(type)
        }*/

        if (type == 'opd') {
            this.props.cloneCommonSelectedCriterias(this.props.dataState.selectedCriterias.filter(x => !x.type.includes("procedures")))
        } else {
            this.props.cloneCommonSelectedCriterias(this.props.dataState.selectedCriterias.filter(x => x.type.includes("procedures")))
        }

        this.searchProceedOPD("", "")
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

		return(
			<section>
                <div id="map" style={{ display: 'none' }}></div>
                <div className="container-fluid">
                	<CriteriaElasticSearch {...this.props} checkForLoad={true} title="Search for doctor or disease" type={this.props.selectedSearchType} paddingTopClass={true} searchProceed={this.props.selectedJourney =='opd'?this.searchProceedOPD.bind(this):this.searchProceedLAB.bind(this)} focusInput={this.state.focusInput} hideHeaderOnMobile={true}>
                            <section className="opd-search-section mbl-pdng-zero">

                                {
                                    (this.props.dataState.selectedCriterias.length>0 && this.props.dataState.selectedCriterias.filter(x => !x.type.includes("procedures").length > 0) ) ? <CommonlySearched
                                        heading={`View Selected (${this.props.dataState.selectedCriterias.length})`}
                                        data={ this.props.dataState.selectedCriterias.filter(x => !x.type.includes("procedures") )}
                                        selectedPills={true}
                                        selected={[]}
                                        toggle={this.props.selectedSearchType.includes('opd')?this.props.toggleOPDCriteria.bind(this):this.props.toggleDiagnosisCriteria.bind(this)}
                                    /> : ""
                                }

                                <button onClick={this.props.selectedJourney=='opd'?this.showDoctors.bind(this, 'opd'):this.showLabs.bind(this)} className="p-3 v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn">{this.props.selectedJourney=='opd'?'Show Doctors':'Show Labs'}</button>

                            </section>
                    </CriteriaElasticSearch>

                </div>
            </section>
			)
	}
}

export default SearchElasticView