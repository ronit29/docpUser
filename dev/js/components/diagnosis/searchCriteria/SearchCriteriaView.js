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

    searchProceed() {
        let searchData = {
            selectedCriterias: this.props.selectedCriterias,
            selectedLocation: this.props.selectedLocation,
        }
        searchData = encodeURIComponent(JSON.stringify(searchData))
        let filterData = encodeURIComponent(JSON.stringify(this.props.filterCriteria))
        this.props.history.push(`/dx/searchresults?search=${searchData}&filter=${filterData}`)
    }

    render() {

        return (
            <div>
                <CriteriaSearch {...this.props} checkForLoad={this.props.LOADED_SEARCH_CRITERIA_LAB} title="Search for Test and Labs." paddingTopClass={true}>
                    <section>

                        <CommonlySearched
                            heading="Selected Criteria"
                            data={this.props.selectedCriterias}
                            selected={[]}
                            selectedPills={true}
                            toggle={this.props.toggleDiagnosisCriteria.bind(this)}
                        />

                        <CommonlySearched
                            heading="Common Test"
                            type="test"
                            data={this.props.common_tests}
                            selected={this.props.selectedCriterias.filter(x => x.type == 'test')}
                            toggle={this.props.toggleDiagnosisCriteria.bind(this)}
                        />

                        <CommonlySearched
                            heading="Common Conditions"
                            type="condition"
                            data={this.props.common_conditions}
                            selected={this.props.selectedCriterias.filter(x => x.type == 'condition')}
                            toggle={this.props.toggleDiagnosisCriteria.bind(this)}
                        />

                        {/* <CommonlySearched
                            heading="Common Labs"
                            type="lab"
                            data={this.props.preferred_labs}
                        /> */}

                        <button onClick={this.searchProceed.bind(this)} className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn">Show Labs</button>
                    </section>
                </CriteriaSearch>

            </div>
        );
    }
}

export default SearchCriteriaView
