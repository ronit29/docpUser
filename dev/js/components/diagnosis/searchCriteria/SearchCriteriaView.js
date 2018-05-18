import React from 'react';
import { connect } from 'react-redux';

import CommonlySearched from '../commons/commonlySearched/index.js'
import CriteriaSearch from '../criteriaSearch'

class SearchCriteriaView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    searchProceed() {
        let searchData = {
            selectedCriterias : this.props.selectedCriterias,
            selectedLocation : this.props.selectedLocation,
        }
        searchData = encodeURIComponent(JSON.stringify(searchData))
        let filterData = encodeURIComponent(JSON.stringify(this.props.filterCriteria))
        this.props.history.push(`/dx/searchresults?search=${searchData}&filter=${filterData}`)
    }

    render() {

        return (
            <div>

                <CriteriaSearch {...this.props}>
                    <section className="wrap wrap-100">

                        <CommonlySearched
                            heading="Selected Criteria"
                            data={this.props.selectedCriterias}
                            selected={[]}
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
                            type="lab"
                            data={this.props.common_conditions}
                            selected={this.props.selectedCriterias.filter(x => x.type == 'lab')}
                            toggle={this.props.toggleDiagnosisCriteria.bind(this)}
                        />

                        <CommonlySearched
                            heading="Common Labs"
                            type="lab"
                            data={this.props.preferred_labs}
                        />
                    </section>
                </CriteriaSearch>



                <button onClick={this.searchProceed.bind(this)} className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg">Show Labs</button>


            </div>
        );
    }
}

export default SearchCriteriaView
