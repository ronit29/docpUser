import React from 'react';
import { connect } from 'react-redux';

import CommonlySearched from '../../commons/commonlySearched/index.js'
import CriteriaSearch from '../../commons/criteriaSearch'

class SearchCriteriaView extends React.Component {
    constructor(props) {
        super(props)
    }

    searchProceed() {
        let searchData = {
            selectedCriterias: this.props.selectedCriterias,
            selectedLocation: this.props.selectedLocation,
        }
        searchData = encodeURIComponent(JSON.stringify(searchData))
        let filterData = encodeURIComponent(JSON.stringify(this.props.filterCriteria))
        this.props.history.push(`/opd/searchresults?search=${searchData}&filter=${filterData}`)
    }


    render() {
        return (
            <div>
                <CriteriaSearch {...this.props} checkForLoad={this.props.LOADED_SEARCH_CRITERIA_OPD} title="Search For Disease or Doctor." type="opd" paddingTopClass={true}>
                    <section className="">

                        <CommonlySearched
                            heading="Selected Criteria"
                            data={this.props.selectedCriterias}
                            selectedPills={true}
                            selected={[]}
                            toggle={this.props.toggleOPDCriteria.bind(this)}
                        />

                        <CommonlySearched
                            heading="Common Conditions"
                            type="condition"
                            data={this.props.conditions}
                            selected={this.props.selectedCriterias.filter(x => x.type == 'condition')}
                            toggle={this.props.toggleOPDCriteria.bind(this)}
                        />

                        <CommonlySearched
                            heading="Common Specialities"
                            type="speciality"
                            data={this.props.specializations}
                            selected={this.props.selectedCriterias.filter(x => x.type == 'speciality')}
                            toggle={this.props.toggleOPDCriteria.bind(this)}
                        />

                    </section>
                </CriteriaSearch>

                <button onClick={this.searchProceed.bind(this)} className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg">Show Doctors</button>

            </div>
        );
    }
}

export default SearchCriteriaView
