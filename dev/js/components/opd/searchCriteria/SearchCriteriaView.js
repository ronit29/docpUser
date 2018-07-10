import React from 'react';
import { connect } from 'react-redux';

import CommonlySearched from '../../commons/commonlySearched/index.js'
import CriteriaSearch from '../../commons/criteriaSearch'

class SearchCriteriaView extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    searchProceed(doctor_name, hospital_name) {
        let searchData = {
            selectedCriterias: this.props.selectedCriterias,
            selectedLocation: this.props.selectedLocation,
        }
        searchData = encodeURIComponent(JSON.stringify(searchData))
        let filterData = encodeURIComponent(JSON.stringify(this.props.filterCriteria))
        this.props.history.push(`/opd/searchresults?search=${searchData}&filter=${filterData}&doctor_name=${doctor_name}`)
    }


    render() {
        return (
            <div>
                <CriteriaSearch {...this.props} checkForLoad={this.props.LOADED_SEARCH_CRITERIA_OPD} title="Search For Disease or Doctor." type="opd" paddingTopClass={true} searchProceed={this.searchProceed.bind(this)}>
                    <section className="">
                        {
                            (this.props.selectedCriterias && this.props.selectedCriterias.length > 0) ? <CommonlySearched
                                heading="Selected Criteria"
                                data={this.props.selectedCriterias}
                                selectedPills={true}
                                selected={[]}
                                toggle={this.props.toggleOPDCriteria.bind(this)}
                            /> : ""
                        }

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

                        <button onClick={this.searchProceed.bind(this, "", "")} className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn">Show Doctors</button>

                    </section>
                </CriteriaSearch>
            </div>
        );
    }
}

export default SearchCriteriaView
