import React from 'react';
import { connect } from 'react-redux';

import CommonlySearched from '../../commons/commonlySearched/index.js'
import CriteriaSearch from '../../commons/criteriaSearch'
import GTM from '../../../helpers/gtm.js'

class SearchCriteriaView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    searchProceed(lab_name = "") {
        let selectedCriterias = (lab_name && lab_name.length > 0) ? [] : this.props.selectedCriterias
        selectedCriterias = selectedCriterias.map((x) => {
            delete x.icon
            return x
        })

        let url = this.buildURI(selectedCriterias, this.props.selectedLocation, this.props.filterCriteria, lab_name)
        this.props.history.push(url)
    }

    buildURI(selectedCriterias, selectedLocation, filterCriteria, lab_name) {
        let specialization_ids = selectedCriterias
            .filter((x) => {
                return x.type == "test"
            })
            .map((x) => {
                return x.id
            }).join(',')

        let lat = 28.644800
        let long = 77.216721
        let place_id = ""

        if (selectedLocation) {
            place_id = selectedLocation.place_id
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

        let data = {
            'Category': 'ConsumerApp', 'Action': 'ShowLabsClicked', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'show-labs-clicked'
        }
        GTM.sendEvent({ data: data })

        let url = `/lab/searchresults?test_ids=${specialization_ids}&min_distance=${min_distance}&lat=${lat}&long=${long}&min_price=${min_price}&max_price=${max_price}&sort_on=${sort_on}&max_distance=${max_distance}&lab_name=${lab_name}&place_id=${place_id}`

        return url
    }

    render() {

        return (
            <div>
                <CriteriaSearch {...this.props} checkForLoad={this.props.LOADED_SEARCH_CRITERIA_LAB} title="Search for tests or lab" paddingTopClass={true} searchProceed={this.searchProceed.bind(this)}>
                    <section className="opd-search-section">

                        {
                            (this.props.selectedCriterias && this.props.selectedCriterias.length > 0) ? <CommonlySearched
                                heading={`View Selected (${this.props.selectedCriterias.length})`}
                                data={this.props.selectedCriterias}
                                selected={[]}
                                selectedPills={true}
                                toggle={this.props.toggleDiagnosisCriteria.bind(this)}
                            /> : ""
                        }

                        <CommonlySearched
                            heading="Common Test"
                            type="test"
                            data={this.props.common_tests}
                            selected={this.props.selectedCriterias.filter(x => x.type == 'test')}
                            toggle={this.props.toggleDiagnosisCriteria.bind(this)}
                        />

                        {/* <CommonlySearched
                            heading="Common Conditions"
                            type="condition"
                            data={this.props.common_conditions}
                            selected={this.props.selectedCriterias.filter(x => x.type == 'condition')}
                            toggle={this.props.toggleDiagnosisCriteria.bind(this)}
                        /> */}

                        {/* <CommonlySearched
                            heading="Common Labs"
                            type="lab"
                            data={this.props.preferred_labs}
                        /> */}

                        <button onClick={this.searchProceed.bind(this, "")} className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn">Show Labs</button>
                    </section>
                </CriteriaSearch>

            </div>
        );
    }
}

export default SearchCriteriaView
