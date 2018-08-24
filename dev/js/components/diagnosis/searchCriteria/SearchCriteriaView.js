import React from 'react';
import { connect } from 'react-redux';

import CommonlySearched from '../../commons/commonlySearched/index.js'
import CriteriaSearch from '../../commons/criteriaSearch'

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
        let searchData = {
            selectedCriterias: selectedCriterias,
            selectedLocation: this.props.selectedLocation,
        }
        searchData = encodeURIComponent(JSON.stringify(searchData))
        let filterData = encodeURIComponent(JSON.stringify(this.props.filterCriteria))
        this.props.history.push(`/lab/searchresults?search=${searchData}&filter=${filterData}&lab_name=${lab_name}`, {
            scrollTop: true
        })
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

                        <button onClick={this.searchProceed.bind(this, "")} className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn">Show Labs</button>
                    </section>
                </CriteriaSearch>

            </div>
        );
    }
}

export default SearchCriteriaView
